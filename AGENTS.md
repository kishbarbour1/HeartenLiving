# Base44 Dev Environment

## Stack
- **Frontend**: React 19 + CRACO (Create React App) + Tailwind CSS + shadcn/ui. Uses yarn. Dev server on port 3000. Frontend uses mock data only (`src/data/mock.js`) — no backend API calls except the contact form.
- **Contact API**: Node.js serverless function (`functions/contact.js`) served by a lightweight Express dev server (`functions/dev-server.js`) on port 8000 (internal only, not exposed to host). Replaces the former FastAPI/MongoDB backend.
- **No database** — the function delivers inquiries by email only. No MongoDB.

## Running
```
docker compose -f docker-compose.base44.yml up -d
```
Frontend serves on host port 3000. The API function is internal-only.

## Key Details
- No lockfile exists; `yarn install` generates one on first run (~47s).
- The API function installs `express` + `nodemailer` via `npm install --omit=dev` on startup.
- `DANGEROUSLY_DISABLE_HOST_CHECK=true` is required for the CRA dev server to accept the preview's external hostname.
- `DISABLE_EMERGENT_OVERLAY=true` disables the emergent.sh overlay (not needed in this environment).
- Secrets: `SMTP_USERNAME` and `SMTP_APP_PASSWORD` (Google Workspace SMTP). No other external secrets required.

## Healthchecks
- Frontend: `fetch('http://localhost:3000')` via node
- API: `fetch('http://localhost:8000/api')` via node

## Contact form
- The Contact page (`frontend/src/pages/Contact.jsx`) POSTs to `${REACT_APP_API_URL}/api/contact`. In dev, `REACT_APP_API_URL` is unset so the request goes to `/api/contact` same-origin, proxied to the API function via CRA's `"proxy": "http://api:8000"` in `frontend/package.json`.
- `POST /api/contact` (`functions/contact.js`) validates input (name, email, message required; email format checked), applies a honeypot (`website` field) + in-memory per-IP rate limit (5 per 10 min), then emails over **Google Workspace SMTP** (`smtp.gmail.com:587` STARTTLS via `nodemailer`). Response: `{ ok, id, email_status, email_error }`; `email_status` is `sent` or `failed`.
- Email config: non-secret defaults in `env.base44.defaults` (`CONTACT_TO_EMAIL=info@heartenhome.org`, `CONTACT_FROM_EMAIL=ksykes@heartenhome.org`, `SMTP_HOST`, `SMTP_PORT`); secrets via `/run/base44/app.env` (`SMTP_USERNAME`, `SMTP_APP_PASSWORD`). Credentials are never logged or committed. `CONTACT_FROM_EMAIL` must match the authenticated Google account (or one of its aliases), or Gmail rejects the message.
- Verify: `curl -X POST http://localhost:3000/api/contact -H 'Content-Type: application/json' -d '{"name":"T","email":"t@example.com","message":"hi"}'` → `email_status: "sent"` (real delivery to info@). Without credentials it returns `failed` with `SMTP credentials are not configured`.
- Outbound SMTP is reachable from this sandbox. Many production hosts block outbound SMTP ports — if the deploy target does, switch to the Gmail API over HTTPS.

## Production build
- `cd frontend && yarn build` → outputs to `frontend/build/` (static site).
- `frontend/public/_redirects` (`/* /index.html 200`) provides SPA routing for static hosts.
- Set `REACT_APP_API_URL` in `frontend/.env.production` to the deployed Base44 Function's base URL before building.
- See `DEPLOYMENT.md` for the full deployment guide.

## What was removed (production prep)
- FastAPI backend (`backend/server.py`) — replaced by `functions/contact.js`
- MongoDB — no longer needed
- emergent.sh / PostHog scripts — removed from `public/index.html`
