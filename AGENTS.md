# Base44 Dev Environment

## Project Overview
FastAPI + React (CRACO/CRA) + MongoDB + shadcn/ui project. The frontend is a
frontend-only build using mock data — it does not call the backend API.

## Architecture
- **Frontend** (`frontend/`): React 19 + Create React App (react-scripts 5) overridden
  with CRACO 7. Uses Tailwind CSS + shadcn/ui components. Package manager: yarn 1.x.
  Dev server: `craco start` on port 3000.
- **Backend** (`backend/`): FastAPI + MongoDB (motor). Single file `server.py`.
  Dev server: `uvicorn server:app --reload` on port 8001.
- **Database**: MongoDB 7 (compose service `mongo`).

## Startup
```
docker compose -f docker-compose.base44.yml up -d --build
```
All three services (mongo, backend, frontend) start together. The frontend
installs yarn dependencies on first boot (~60s); the backend installs pip
dependencies on each boot (~45s).

## Key Fixes Applied
1. **`emergentintegrations==0.2.0`** removed from `backend/requirements.txt` —
   this is an emergent.sh-internal package not available on public PyPI. The
   backend (`server.py`) does not import it.
2. **`allowedHosts: "all"`** added to `makeDevServerV5Compatible()` in
   `frontend/craco.config.js` — required for the webpack-dev-server to accept
   the preview's external hostname.
3. **`DISABLE_EMERGENT_OVERLAY=true`** set in compose — prevents loading the
   emergent overlay at runtime (the package installs but the overlay is not
   needed in this environment).

## Environment Variables
- Backend: `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS` — all set inline in
  `docker-compose.base44.yml` (local infra credentials, not secrets).
- No external secrets required.

## Verification
- Frontend: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000` → 200
- Backend: `curl -s http://localhost:8001/api/` → `{"message":"Hello World"}`
- All services: `docker compose -f docker-compose.base44.yml ps` → all healthy
