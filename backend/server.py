from fastapi import FastAPI, APIRouter, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List, Optional
import uuid
import time
from datetime import datetime, timezone

from notifications import send_contact_notification


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class ContactMessageCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: str = Field(min_length=1, max_length=200)
    email: str = Field(min_length=3, max_length=320)
    phone: str = Field(default="", max_length=50)
    interest: str = Field(default="", max_length=100)
    message: str = Field(min_length=1, max_length=5000)
    # Honeypot: hidden field real users never fill in.
    website: str = Field(default="", max_length=200)

    @field_validator("name", "email", "message")
    @classmethod
    def _strip(cls, v: str) -> str:
        return v.strip()

    @field_validator("email")
    @classmethod
    def _valid_email(cls, v: str) -> str:
        v = v.strip()
        if not EMAIL_RE.match(v):
            raise ValueError("invalid email address")
        return v


# Simple in-memory rate limit: max submissions per IP within a window.
_RATE_LIMIT_MAX = 5
_RATE_LIMIT_WINDOW = 600  # seconds
_rate_buckets: dict = {}


def _rate_limited(ip: str) -> bool:
    now = time.time()
    hits = [t for t in _rate_buckets.get(ip, []) if now - t < _RATE_LIMIT_WINDOW]
    if len(hits) >= _RATE_LIMIT_MAX:
        _rate_buckets[ip] = hits
        return True
    hits.append(now)
    _rate_buckets[ip] = hits
    return False

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/contact")
async def create_contact_message(input: ContactMessageCreate, request: Request):
    # Spam protection: the honeypot field must be empty.
    if input.website.strip():
        return JSONResponse(status_code=400, content={"detail": "Submission rejected."})

    client_ip = request.client.host if request.client else "unknown"
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        client_ip = forwarded.split(",")[0].strip()

    if _rate_limited(client_ip):
        return JSONResponse(
            status_code=429,
            content={"detail": "Too many submissions. Please try again later."},
        )

    message_id = str(uuid.uuid4())
    doc = {
        "id": message_id,
        "name": input.name,
        "email": input.email,
        "phone": input.phone.strip(),
        "interest": input.interest.strip(),
        "message": input.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "email_status": "pending",
        "email_error": None,
        "ip": client_ip,
        "user_agent": request.headers.get("user-agent", "")[:300],
    }

    # 1) Persist first — an inquiry is never lost even if email delivery fails.
    await db.contact_messages.insert_one(dict(doc))

    # 2) Attempt the notification.
    sent, error = await send_contact_notification(doc)
    doc["email_status"] = "sent" if sent else "failed"
    doc["email_error"] = error
    await db.contact_messages.update_one(
        {"id": message_id},
        {"$set": {"email_status": doc["email_status"], "email_error": error}},
    )

    if not sent:
        logger.warning("Contact %s saved but notification failed: %s", message_id, error)

    return {
        "ok": True,
        "id": message_id,
        "email_status": doc["email_status"],
        "email_error": error,
    }


@api_router.post("/contact/retry")
async def retry_failed_notifications(request: Request):
    """Re-send notifications for inquiries whose email delivery previously failed."""
    token = (os.environ.get("CONTACT_RETRY_TOKEN") or "").strip()
    provided = request.headers.get("x-retry-token", "").strip()
    if not token or provided != token:
        return JSONResponse(status_code=401, content={"detail": "Unauthorized"})

    pending = await db.contact_messages.find({"email_status": "failed"}, {"_id": 0}).to_list(200)
    retried = 0
    sent = 0
    for msg in pending:
        ok, error = await send_contact_notification(msg)
        retried += 1
        if ok:
            sent += 1
            await db.contact_messages.update_one(
                {"id": msg["id"]}, {"$set": {"email_status": "sent", "email_error": None}}
            )
        else:
            await db.contact_messages.update_one(
                {"id": msg["id"]}, {"$set": {"email_error": error}}
            )
    return {"retried": retried, "sent": sent}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()