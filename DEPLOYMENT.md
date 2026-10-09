# Hearten Transitional Living — Production Deployment Guide

Deploy the Hearten Living website as a static site with a **Deno** backend
function for the contact form, using your Base44 Builder plan.

---

## Architecture Overview

| Layer | Technology | Output |
|-------|-----------|--------|
| **Frontend** | React 19 + CRACO + Tailwind CSS | `frontend/build/` (static files) |
| **Contact API** | **Deno** backend function (`base44/functions/contact/`) | Base44 Function |
| **Email** | Base44 **SendEmail** integration (fallback: Google Workspace SMTP) | Notification to `info@heartenhome.org` |
| **Data** | Base44 `ContactMessage` entity | Inquiry records |
| **Donations** | Zeffy iframe embed | No backend needed |

The former FastAPI/MongoDB backend is gone. The contact form is a single
**Deno/TypeScript** function — the runtime Base44 uses for backend functions.

---

## 1. Create the Base44 Function

Base44 backend functions run on **Deno**. The function lives in
`base44/functions/contact/` (`entry.ts` + `core.ts`).

### Option A — Base44 CLI

```bash
base44 functions deploy contact
```

### Option B — Dashboard

1. Open **Dashboard → Code → Functions** and create a function named `contact`.
2. Paste `entry.ts` and `core.ts` (keep them in the same directory so the
   relative import resolves).

The function is public (no login required) — call it via HTTP:

```
POST https://<your-app-domain>/functions/contact
```

---

## 2. Email Delivery

The function sends notifications to `info@heartenhome.org` in two stages:

1. **Base44 SendEmail integration** (primary — the platform-supported email API).
   No credentials needed. **Note:** to email an address that has not signed up
   as a user of your app, Base44 requires a **paid plan (Builder+) and a verified
   custom domain**. Verify `heartenhome.org` in your Base44 app settings.
2. **Google Workspace SMTP fallback** — used automatically if SendEmail is
   unavailable. Requires the `SMTP_USERNAME` and `SMTP_APP_PASSWORD` secrets
   (already configured in this app) and these non-secret defaults
   (`env.base44.defaults`):

   | Variable | Default |
   |----------|---------|
   | `CONTACT_TO_EMAIL` | `info@heartenhome.org` |
   | `CONTACT_FROM_EMAIL` | `ksykes@heartenhome.org` |
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `587` |

   Set these in the function's environment variables in the Base44 dashboard.
   `CONTACT_FROM_EMAIL` must match the authenticated Google account (or an alias).

> If your plan cannot verify a custom domain and SMTP egress is blocked on the
> Base44 runtime, tell us — the delivery path can be switched to a Gmail API
> connector over HTTPS.

---

## 3. Create the `ContactMessage` Entity (optional but recommended)

Create a **`ContactMessage`** entity in the Base44 builder so every inquiry is
stored (and never lost if email fails). Schema:

| Field | Type | Notes |
|-------|------|-------|
| `id` | Text | UUID (primary key) |
| `name` | Text | Required |
| `email` | Text | Required |
| `phone` | Text | Optional |
| `interest` | Text | Optional |
| `message` | Text (long) | Required |
| `created_at` | DateTime | ISO timestamp |
| `email_status` | Text | `pending` / `sent` / `failed` |
| `email_error` | Text | Optional |

The function already writes to it via `base44.asServiceRole.entities.ContactMessage`.
If the entity does not exist yet, the write is skipped and email still delivers.

---

## 4. Build & Deploy the Frontend

```bash
cd frontend
yarn install
REACT_APP_CONTACT_ENDPOINT=https://<your-app-domain>/functions/contact yarn build
```

Or set `REACT_APP_CONTACT_ENDPOINT` in `frontend/.env.production` (not committed):

```
REACT_APP_CONTACT_ENDPOINT=https://<your-app-domain>/functions/contact
```

Then `yarn build` → static site in `frontend/build/`. It includes:

- All five pages (Home, Services, About, Contact, Donate)
- Hearten branding (burgundy/gold/cream palette, Logo, fonts) — unchanged
- Zeffy donation iframe embed — unchanged
- SPA routing support (`public/_redirects` → `/* /index.html 200`)

### Static hosting

Upload `frontend/build/` to Base44 static hosting (or any static host). The
included `public/_redirects` handles SPA routing on Netlify; for other hosts add
an equivalent rewrite:

**Vercel** (`vercel.json`):
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

**Nginx**:
```nginx
location / { try_files $uri $uri/ /index.html; }
```

---

## 5. Post-Deployment Checklist

- [ ] All five pages load (/, /services, /about, /contact, /donate)
- [ ] Zeffy donation form renders on /donate
- [ ] Contact form submits and email arrives at info@heartenhome.org
- [ ] Honeypot rejects bot submissions (fill hidden "website" field → 400)
- [ ] Rate limiting works (>5 submissions in 10 min → 429)
- [ ] `ContactMessage` records appear in the entity after submissions
- [ ] SPA routing works (navigate to /about and refresh → page loads, not 404)
- [ ] Branding intact (burgundy/gold/cream palette, Logo, fonts)

---

## Spam Protection

1. **Honeypot** — hidden `website` field; if filled → HTTP 400.
2. **Rate limiting** — max 5 submissions per IP per 10 minutes → HTTP 429.
3. **Server-side validation** — name, email, message required; email regex checked.

---

## Local Development

The dev stack runs the **same Deno handler** as production:

```bash
docker compose -f docker-compose.base44.yml up -d
# api service: deno run base44/dev-server.ts  (port 8000)
# frontend:    CRA dev server                  (port 3000, proxies /api → api:8000)
```

Verify the Deno function locally:

```bash
# type-check (TypeScript + npm: imports resolve on Deno)
docker compose -f docker-compose.base44.yml exec -T api \
  deno check base44/functions/contact/entry.ts

# end-to-end (uses the SMTP fallback locally)
curl -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"T","email":"t@example.com","message":"hi"}'
# → {"ok":true,"email_status":"sent",...}
```

---

## Builder-Side Steps (require your Base44 account — cannot be done from the repo)

1. **Deploy the function** — `base44 functions deploy contact` or paste `entry.ts` + `core.ts` into Dashboard → Code → Functions.
2. **Verify the `heartenhome.org` custom domain** in app settings so SendEmail can reach `info@heartenhome.org` (or rely on the SMTP fallback).
3. **Create the `ContactMessage` entity** (schema above).
4. **Set function env vars** — `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `SMTP_HOST`, `SMTP_PORT` (and confirm the `SMTP_USERNAME` / `SMTP_APP_PASSWORD` secrets are present).
5. **Build the frontend** with `REACT_APP_CONTACT_ENDPOINT` set to the deployed function URL.
6. **Configure static hosting** for `frontend/build/` and publish.
7. **DNS cutover** — not done, per your instruction.

---

## What Was Preserved

- All five pages (Home, Services, About, Contact, Donate) — unchanged
- Hearten branding (colors, fonts, logo, copy) — unchanged
- Zeffy donation iframe embed — unchanged
- Honeypot + rate-limiting spam protection — same logic, ported to Deno
