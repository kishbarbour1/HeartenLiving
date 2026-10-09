/**
 * Hearten Transitional Living — contact form logic.
 *
 * Shared by the Base44 backend function (`entry.ts`) and the local Deno dev
 * server (`base44/dev-server.ts`). Runs on Deno (Base44's backend runtime).
 *
 * Security: input validation, honeypot, per-IP rate limiting. No secrets are
 * logged. Email credentials come from Base44 Secrets via `Deno.env.get()`.
 */

export interface ContactInput {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  interest?: unknown;
  message?: unknown;
  website?: unknown; // honeypot — real users never fill this in
}

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

// ---------------------------------------------------------------------------
// Spam protection
// ---------------------------------------------------------------------------

const RATE_LIMIT_MAX = 5; // submissions per window
const RATE_LIMIT_WINDOW = 600_000; // 10 minutes (ms)
const _rateBuckets = new Map<string, number[]>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (_rateBuckets.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (hits.length >= RATE_LIMIT_MAX) {
    _rateBuckets.set(ip, hits);
    return true;
  }
  hits.push(now);
  _rateBuckets.set(ip, hits);
  return false;
}

export function isHoneypotTripped(body: ContactInput): boolean {
  return Boolean(body.website && String(body.website).trim());
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function validate(body: ContactInput): { errors: string[]; data: ContactData } {
  const errors: string[] = [];
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const phone = String(body.phone ?? "").trim().slice(0, 50);
  const interest = String(body.interest ?? "").trim().slice(0, 100);

  if (!name) errors.push("Name is required.");
  if (name.length > 200) errors.push("Name is too long.");
  if (!email) errors.push("Email is required.");
  if (email.length > 320) errors.push("Email is too long.");
  if (email && !EMAIL_RE.test(email)) errors.push("Invalid email address.");
  if (!message) errors.push("Message is required.");
  if (message.length > 5000) errors.push("Message is too long.");

  return { errors, data: { name, email, phone, interest, message } };
}

// ---------------------------------------------------------------------------
// Email body
// ---------------------------------------------------------------------------

const INTEREST_LABELS: Record<string, string> = {
  housing: "Applying for housing",
  referral: "Making a referral",
  volunteer: "Volunteering / Mentoring",
  partner: "Community partnership",
  other: "Other",
};

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildEmail(data: ContactData): { subject: string; text: string; html: string } {
  const interest = INTEREST_LABELS[data.interest] || data.interest || "Not specified";
  const submitted = new Date().toISOString();

  const subject = `New contact inquiry from ${data.name || "website visitor"}`;

  const text =
    "New contact form submission\n\n" +
    `Name: ${data.name}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone || "Not provided"}\n` +
    `Interested in: ${interest}\n` +
    `Submitted: ${submitted}\n\n` +
    `Message:\n${data.message}\n`;

  const html =
    '<div style="font-family:Arial,sans-serif;font-size:14px;color:#333">' +
    '<h2 style="color:#6e1423">New contact form submission</h2>' +
    '<table style="border-collapse:collapse">' +
    `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">Name</td><td style="padding:6px 0">${escapeHtml(data.name)}</td></tr>` +
    `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">Email</td><td style="padding:6px 0">${escapeHtml(data.email)}</td></tr>` +
    `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">Phone</td><td style="padding:6px 0">${escapeHtml(data.phone || "Not provided")}</td></tr>` +
    `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">Interested in</td><td style="padding:6px 0">${escapeHtml(interest)}</td></tr>` +
    `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">Submitted</td><td style="padding:6px 0">${escapeHtml(submitted)}</td></tr>` +
    "</table>" +
    '<p style="margin-top:16px;font-weight:600">Message</p>' +
    `<p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>` +
    '<p style="margin-top:16px;color:#888;font-size:12px">Reply to this email to respond directly to the sender.</p>' +
    "</div>";

  return { subject, text, html };
}

// ---------------------------------------------------------------------------
// Email delivery
// ---------------------------------------------------------------------------

export interface EmailResult {
  sent: boolean;
  error: string | null;
  via: string;
}

/**
 * Send the notification.
 *  1. Base44's built-in SendEmail integration — the platform-supported email
 *     API (no SMTP egress needed).
 *  2. Fallback: Google Workspace SMTP via nodemailer, used when SendEmail is
 *     unavailable (e.g. the local dev server) and SMTP secrets are present.
 */
async function sendNotification(base44: any, data: ContactData): Promise<EmailResult> {
  const toEmail = Deno.env.get("CONTACT_TO_EMAIL") || "info@heartenhome.org";
  const { subject, text, html } = buildEmail(data);

  // 1) Base44 SendEmail integration
  if (base44?.asServiceRole?.integrations?.Core?.SendEmail) {
    try {
      await base44.asServiceRole.integrations.Core.SendEmail({ to: toEmail, subject, body: html });
      return { sent: true, error: null, via: "base44_sendemail" };
    } catch (err) {
      const primary = err instanceof Error ? err.message : String(err);
      const smtp = await sendViaSMTP(data, toEmail, subject, text, html);
      return smtp.sent
        ? { sent: true, error: null, via: "smtp" }
        : { sent: false, error: `SendEmail failed (${primary}); SMTP failed (${smtp.error})`, via: "none" };
    }
  }

  // 2) SMTP fallback only
  const smtp = await sendViaSMTP(data, toEmail, subject, text, html);
  return smtp.sent
    ? { sent: true, error: null, via: "smtp" }
    : { sent: false, error: smtp.error, via: "none" };
}

async function sendViaSMTP(
  data: ContactData,
  toEmail: string,
  subject: string,
  text: string,
  html: string,
): Promise<{ sent: boolean; error: string | null }> {
  const username = (Deno.env.get("SMTP_USERNAME") || "").trim();
  const password = (Deno.env.get("SMTP_APP_PASSWORD") || "").trim();
  if (!username || !password) {
    return { sent: false, error: "SMTP credentials are not configured" };
  }
  const fromEmail = (Deno.env.get("CONTACT_FROM_EMAIL") || username).trim();
  const host = (Deno.env.get("SMTP_HOST") || "smtp.gmail.com").trim();
  const port = parseInt(Deno.env.get("SMTP_PORT") || "587", 10);

  try {
    const nodemailer = (await import("npm:nodemailer@6")).default;
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user: username, pass: password },
    });
    await transporter.sendMail({ from: fromEmail, to: toEmail, replyTo: data.email, subject, text, html });
    return { sent: true, error: null };
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ---------------------------------------------------------------------------
// Request handler (framework-agnostic, used by entry.ts and the dev server)
// ---------------------------------------------------------------------------

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function handleContact(req: Request, base44: any): Promise<Response> {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (req.method !== "POST") {
    return Response.json({ detail: "Method not allowed" }, { status: 405, headers: CORS_HEADERS });
  }

  let body: ContactInput;
  try {
    body = await req.json();
  } catch {
    return Response.json({ detail: "Invalid JSON body." }, { status: 400, headers: CORS_HEADERS });
  }

  if (isHoneypotTripped(body)) {
    return Response.json({ detail: "Submission rejected." }, { status: 400, headers: CORS_HEADERS });
  }

  const ip =
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { detail: "Too many submissions. Please try again later." },
      { status: 429, headers: CORS_HEADERS },
    );
  }

  const { errors, data } = validate(body);
  if (errors.length) {
    return Response.json({ detail: errors.join(" ") }, { status: 400, headers: CORS_HEADERS });
  }

  const id = crypto.randomUUID();

  // 1) Persist first — an inquiry is never lost even if email delivery fails.
  //    Best-effort: the ContactMessage entity may not be created yet.
  let persisted = false;
  try {
    await base44.asServiceRole.entities.ContactMessage.create({
      id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      interest: data.interest,
      message: data.message,
      created_at: new Date().toISOString(),
      email_status: "pending",
    });
    persisted = true;
  } catch {
    // Entity not configured yet — email remains the critical path.
  }

  // 2) Notify.
  const { sent, error } = await sendNotification(base44, data);

  if (persisted) {
    try {
      await base44.asServiceRole.entities.ContactMessage.update(id, {
        email_status: sent ? "sent" : "failed",
        email_error: error,
      });
    } catch {
      // Status update is best-effort.
    }
  }

  return Response.json(
    { ok: true, id, email_status: sent ? "sent" : "failed", email_error: error },
    { headers: CORS_HEADERS },
  );
}
