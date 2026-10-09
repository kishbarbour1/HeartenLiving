# Hearten Transitional Living — Production Deployment Guide

This guide covers deploying the Hearten Living website as a static site with a
serverless contact-form function, using your Base44 Builder plan.

---

## Architecture Overview

| Layer | Technology | Output |
|-------|-----------|--------|
| **Frontend** | React 19 + CRACO + Tailwind CSS | `frontend/build/` (static files) |
| **Contact API** | Node.js serverless function | Base44 Function |
| **Email** | Google Workspace SMTP | Notification to `info@heartenhome.org` |
| **Donations** | Zeffy iframe embed | No backend needed |

The FastAPI/MongoDB backend has been replaced by a single serverless function
(`functions/contact.js`) that validates input, applies spam protection, and
sends an email notification. No database is required.

---

## 1. Configure Environment Variables

### 1a. Frontend — API endpoint

Create `frontend/.env.production` (not committed — add to `.gitignore` if needed):

```
REACT_APP_API_URL=https://YOUR_FUNCTION_URL
```

Set `REACT_APP_API_URL` to the base URL of your deployed Base44 Function
(see step 3). The contact form POSTs to `${REACT_APP_API_URL}/api/contact`.

In development this variable is unset — the CRA dev server proxies
`/api/*` to the local function server automatically.

### 1b. API function — SMTP credentials

These secrets are already configured in your Base44 dashboard:

| Secret | Description |
|--------|-------------|
| `SMTP_USERNAME` | Google Workspace account (ksykes@heartenhome.org) |
| `SMTP_APP_PASSWORD` | Google Workspace App Password |

Non-secret defaults (in `env.base44.defaults`):

| Variable | Default |
|----------|---------|
| `CONTACT_TO_EMAIL` | `info@heartenhome.org` |
| `CONTACT_FROM_EMAIL` | `ksykes@heartenhome.org` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |

When deploying the function to Base44, set these same environment variables
in the function's configuration.

---

## 2. Build the Frontend

```bash
cd frontend
yarn install          # if node_modules not present
yarn build            # outputs to frontend/build/
```

The production build is a static site in `frontend/build/`. It includes:

- All five pages (Home, Services, About, Contact, Donate)
- Hearten branding (burgundy/gold/cream palette, Logo, fonts)
- Zeffy donation iframe embed
- SPA routing support (`public/_redirects` → `/* /index.html 200`)
- Honeypot spam protection on the contact form

### Verify the build

```bash
ls -la frontend/build/          # confirm index.html, static/, etc.
npx serve frontend/build        # preview locally on http://localhost:3000
```

---

## 3. Deploy the Contact-Form Function

### Option A — Base44 Function (recommended)

1. In the Base44 builder, create a new Function named `contact`.
2. Paste the contents of `functions/contact.js` into the function editor.
3. Add `nodemailer` to the function's dependencies (or use Base44's built-in
   email action if available).
4. Set environment variables:
   - `SMTP_USERNAME` — your Google Workspace account
   - `SMTP_APP_PASSWORD` — your app password
   - `CONTACT_TO_EMAIL` — `info@heartenhome.org`
   - `CONTACT_FROM_EMAIL` — `ksykes@heartenhome.org`
   - `SMTP_HOST` — `smtp.gmail.com`
   - `SMTP_PORT` — `587`
5. Deploy the function and note its URL.
6. Set `REACT_APP_API_URL` in `frontend/.env.production` to the function's
   base URL, then rebuild.

### Option B — Other serverless platforms (Vercel, Netlify, etc.)

The function in `functions/contact.js` is a standard Vercel/Netlify-style
handler (`(req, res) => { ... }`). Deploy it to your platform of choice and
set the same environment variables.

### Optional — Persist submissions with a Base44 Entity

To store every inquiry (not just email it), create a "ContactMessage" entity
in the Base44 builder with this schema:

| Field | Type | Notes |
|-------|------|-------|
| `id` | Text | UUID, primary key |
| `name` | Text | Required |
| `email` | Text | Required |
| `phone` | Text | Optional |
| `interest` | Text | Optional |
| `message` | Text (long) | Required |
| `created_at` | DateTime | Auto |
| `email_status` | Text | `sent` / `failed` |

Then uncomment the entity-write block in `functions/contact.js` (search for
`entities.ContactMessage.create`).

---

## 4. Deploy the Static Site

### Base44 CLI static hosting

```bash
# Build the production bundle
cd frontend && yarn build

# Deploy the static build (build output: frontend/build)
# Use the Base44 CLI to upload frontend/build/ as a static site.
# The _redirects file ensures SPA routing works (all paths → index.html).
```

### Alternative — any static host (Netlify, Vercel, Cloudflare Pages, S3, etc.)

Point the host's build command to `cd frontend && yarn build` and the output
directory to `frontend/build`. The included `public/_redirects` file handles
SPA routing on Netlify; for other hosts, add an equivalent rewrite rule:

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

- [ ] All five pages load correctly (/, /services, /about, /contact, /donate)
- [ ] Zeffy donation form renders on /donate
- [ ] Contact form submits successfully and email arrives at info@heartenhome.org
- [ ] Honeypot field rejects bot submissions (fill the hidden "website" field → 400)
- [ ] Rate limiting works (>5 submissions in 10 min → 429)
- [ ] SPA routing works (navigate to /about and refresh → page loads, not 404)
- [ ] Branding intact (burgundy/gold/cream palette, Logo, fonts)

---

## Spam Protection

The contact form includes three layers of spam protection:

1. **Honeypot** — A hidden `website` field that real users never see. If
   filled, the submission is silently rejected (HTTP 400).
2. **Rate limiting** — Max 5 submissions per IP within 10 minutes (HTTP 429).
3. **Server-side validation** — Name, email, and message are validated
   server-side. Email format is checked with a regex.

---

## What Was Removed

- **FastAPI backend** (`backend/server.py`) — replaced by `functions/contact.js`
- **MongoDB** — no longer needed; the function delivers inquiries by email
- **Python dependencies** — no longer needed
- **emergent.sh / PostHog scripts** — removed from `index.html` for production

## What Was Preserved

- All five pages (Home, Services, About, Contact, Donate) — unchanged
- Hearten branding (colors, fonts, logo, copy) — unchanged
- Zeffy donation iframe embed — unchanged
- SMTP email notifications to info@heartenhome.org — same Gmail credentials
- Honeypot + rate-limiting spam protection — same logic, ported to Node.js
