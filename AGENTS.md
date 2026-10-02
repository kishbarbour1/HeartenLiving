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
