# Base44 Dev Environment

## Stack
- **Frontend**: React 19 + CRACO (Create React App) + Tailwind CSS + shadcn/ui. Uses yarn. Dev server on port 3000. Frontend uses mock data only (`src/data/mock.js`) — no backend API calls.
- **Backend**: FastAPI + MongoDB (motor). Runs on port 8000 (internal only, not exposed to host). Requires `MONGO_URL` and `DB_NAME` env vars.
- **Database**: MongoDB 7 (compose service).

## Running
```
docker compose -f docker-compose.base44.yml up -d
```
Frontend serves on host port 3000. Backend and MongoDB are internal-only.

## Key Details
- No lockfile exists; `yarn install` generates one on first run (~47s).
- Backend `requirements.txt` includes packages not needed by `server.py` (emergentintegrations, jq, pandas, etc.). The compose installs only the packages server.py imports to avoid install failures.
- `DANGEROUSLY_DISABLE_HOST_CHECK=true` is required for the CRA dev server to accept the preview's external hostname.
- `DISABLE_EMERGENT_OVERLAY=true` disables the emergent.sh overlay (not needed in this environment).
- No external secrets required — all credentials are local infra (MongoDB) wired in compose.

## Healthchecks
- Frontend: `fetch('http://localhost:3000')` via node
- Backend: `python -c "urllib.request.urlopen('http://localhost:8000/api/')"`
- MongoDB: `mongosh --eval "db.adminCommand('ping').ok"`

## Contact form
- The Contact page (`frontend/src/pages/Contact.jsx`) POSTs to `/api/contact`. In dev this is same-origin via CRA's `"proxy": "http://backend:8000"` in `frontend/package.json` (restart the frontend after editing it). For a production build, serve the API behind the same origin or set `REACT_APP_API_URL`.
- `POST /api/contact` (backend `server.py`) validates input, applies a honeypot (`website`) + in-memory per-IP rate limit, saves to the `contact_messages` collection FIRST, then emails over **Google Workspace SMTP** (`backend/notifications.py`: `smtp.gmail.com:587` STARTTLS, stdlib `smtplib` in a worker thread). Response: `{ ok, id, email_status, email_error }`; `email_status` is `sent` or `failed`. The inquiry is preserved even when email fails.
- `POST /api/contact/retry` re-sends notifications for `email_status: "failed"` records; requires header `X-Retry-Token` matching `CONTACT_RETRY_TOKEN`.
- Email config: non-secret defaults in `env.base44.defaults` (`CONTACT_TO_EMAIL=info@heartenhome.org`, `CONTACT_FROM_EMAIL=ksykes@heartenhome.org`, `SMTP_HOST`, `SMTP_PORT`); secrets via `/run/base44/app.env` (`SMTP_USERNAME`, `SMTP_APP_PASSWORD`, optional `CONTACT_RETRY_TOKEN`). Credentials are never logged or committed. `CONTACT_FROM_EMAIL` must match the authenticated Google account (or one of its aliases), or Gmail rejects the message.
- Verify: `curl -X POST http://localhost:3000/api/contact -H 'Content-Type: application/json' -d '{"name":"T","email":"t@example.com","message":"hi"}'` → `email_status: "sent"` (real delivery to info@). Without credentials it returns `failed` with `SMTP credentials are not configured`. Mongo persistence: restart the `mongo` service and confirm `db.contact_messages.countDocuments({})` is unchanged (named volume `mongo_data`).
- Outbound SMTP is reachable from this sandbox (tested `smtp.gmail.com:587/465` and `smtp-relay.gmail.com:587`). Many production hosts block outbound SMTP ports — if the deploy target does, switch to the Gmail API over HTTPS.
