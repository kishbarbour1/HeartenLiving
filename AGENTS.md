# Base44 Dev Environment

## Stack
- **Frontend**: React 19 + CRACO (Create React App) + Tailwind CSS + shadcn/ui. Uses yarn. Dev server on port 3000. Frontend uses mock data only (`src/data/mock.js`) — no backend API calls except the contact form.
- **Contact API**: A **Deno** backend function (`base44/functions/contact/`). This is the runtime Base44 uses for backend functions. Locally, `base44/dev-server.ts` runs the same handler on Deno (port 8000, internal only).
- **No database in the repo** — submissions are stored in the Base44 `ContactMessage` entity (builder-side) and delivered by email.

## Running
```
docker compose -f docker-compose.base44.yml up -d
```
Frontend serves on host port 3000. The contact API is internal-only.

## Key Details
- No lockfile exists; `yarn install` generates one on first run (~47s).
- The `api` service uses the `denoland/deno` image; Deno downloads `npm:` dependencies (`@base44/sdk`, `nodemailer`) on first run.
- `DANGEROUSLY_DISABLE_HOST_CHECK=true` is required for the CRA dev server to accept the preview's external hostname.
- `DISABLE_EMERGENT_OVERLAY=true` disables the emergent.sh overlay (not needed in this environment).

## Contact function (`base44/functions/contact/`)
- `entry.ts` — Base44 function entry: `createClientFromRequest(req)` then `handleContact(req, base44)`. Deployed to Base44 (Deno).
- `core.ts` — shared logic: validation, honeypot, per-IP rate limit, email body, delivery. Runs on Deno; used by both `entry.ts` and the local dev server.
- `base44/dev-server.ts` — local Deno server (NOT deployed). Mocks the Base44 SDK: entity writes are logged and `SendEmail` is unavailable, which exercises the SMTP fallback so local testing proves the email path runs on Deno.
- **Spam protection**: honeypot (`website` field) + in-memory per-IP rate limit (5 per 10 min) + server-side validation (name/email/message required, email regex).
- **Email delivery** (`core.ts`): Base44's built-in **SendEmail** integration first (the platform-supported email API); if unavailable, falls back to **Google Workspace SMTP** (`smtp.gmail.com:587` STARTTLS via `npm:nodemailer@6`). Config: `CONTACT_TO_EMAIL=info@heartenhome.org`, `CONTACT_FROM_EMAIL=ksykes@heartenhome.org`; secrets `SMTP_USERNAME` / `SMTP_APP_PASSWORD` via `/run/base44/app.env`.
- **Persistence**: writes a `ContactMessage` record via `base44.asServiceRole.entities.ContactMessage.create()` (best-effort — the entity must be created builder-side). Response: `{ ok, id, email_status, email_error }`.
- **Verify (local, Deno runtime)**:
  - `docker compose -f docker-compose.base44.yml exec -T api deno check base44/functions/contact/entry.ts` → exit 0
  - `curl -X POST http://localhost:3000/api/contact -H 'Content-Type: application/json' -d '{"name":"T","email":"t@example.com","message":"hi"}'` → `email_status: "sent"` (real delivery to info@ via the SMTP fallback)
  - Honeypot: add `"website":"x"` → HTTP 400 `Submission rejected.`

## Production build
- `cd frontend && yarn build` → outputs to `frontend/build/` (static site).
- `frontend/public/_redirects` (`/* /index.html 200`) provides SPA routing for static hosts.
- Set `REACT_APP_CONTACT_ENDPOINT` in `frontend/.env.production` to the deployed function URL, e.g. `https://<your-app-domain>/functions/contact`, before building.
- See `DEPLOYMENT.md` for the full deployment guide.

## What was removed (production prep)
- FastAPI backend (`backend/server.py`) and MongoDB — replaced by the Deno function
- Node CommonJS contact function (`functions/`) — replaced by `base44/functions/contact/` (Deno)
- emergent.sh / PostHog scripts — removed from `public/index.html`
