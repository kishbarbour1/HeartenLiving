/**
 * Hearten Transitional Living — Contact form serverless function.
 *
 * Replaces the FastAPI/MongoDB backend with a lightweight, dependency-free
 * handler that validates input, applies spam protection, and sends an email
 * notification to info@heartenhome.org via Google Workspace SMTP.
 *
 * Deploy this as a Base44 Function (or any Vercel/Netlify-style serverless
 * platform).  No database is required — the inquiry is delivered by email.
 * To persist submissions, create a "ContactMessage" entity in the Base44
 * builder (schema in DEPLOYMENT.md) and add the entity write marked below.
 */

const nodemailer = require("nodemailer");
const crypto = require("crypto");

// ---------------------------------------------------------------------------
// Spam protection
// ---------------------------------------------------------------------------

// In-memory rate limiting (per cold-start instance).  For a true distributed
// limit, move this to a Base44 entity or Redis once deployed.
const RATE_LIMIT_MAX = 5; // submissions per window
const RATE_LIMIT_WINDOW = 600_000; // 10 minutes (ms)
const _rateBuckets = new Map();

function _isRateLimited(ip) {
  const now = Date.now();
  const hits = (_rateBuckets.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (hits.length >= RATE_LIMIT_MAX) {
    _rateBuckets.set(ip, hits);
    return true;
  }
  hits.push(now);
  _rateBuckets.set(ip, hits);
  return false;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function _validate(body) {
  const errors = [];
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  const phone = String(body.phone || "").trim().slice(0, 50);
  const interest = String(body.interest || "").trim().slice(0, 100);
  const website = String(body.website || "").trim(); // honeypot

  if (!name) errors.push("Name is required.");
  if (name.length > 200) errors.push("Name is too long.");
  if (!email) errors.push("Email is required.");
  if (email.length > 320) errors.push("Email is too long.");
  if (email && !EMAIL_RE.test(email)) errors.push("Invalid email address.");
  if (!message) errors.push("Message is required.");
  if (message.length > 5000) errors.push("Message is too long.");

  return { errors, data: { name, email, message, phone, interest, website } };
}

// ---------------------------------------------------------------------------
// Email
// ---------------------------------------------------------------------------

function _escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const INTEREST_LABELS = {
  housing: "Applying for housing",
  referral: "Making a referral",
  volunteer: "Volunteering / Mentoring",
  partner: "Community partnership",
  other: "Other",
};

function _buildEmail(data) {
  const interest = INTEREST_LABELS[data.interest] || data.interest || "Not specified";
  const submitted = new Date().toISOString();

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
    `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">Name</td><td style="padding:6px 0">${_escapeHtml(data.name)}</td></tr>` +
    `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">Email</td><td style="padding:6px 0">${_escapeHtml(data.email)}</td></tr>` +
    `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">Phone</td><td style="padding:6px 0">${_escapeHtml(data.phone || "Not provided")}</td></tr>` +
    `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">Interested in</td><td style="padding:6px 0">${_escapeHtml(interest)}</td></tr>` +
    `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">Submitted</td><td style="padding:6px 0">${_escapeHtml(submitted)}</td></tr>` +
    "</table>" +
    '<p style="margin-top:16px;font-weight:600">Message</p>' +
    `<p style="white-space:pre-wrap">${_escapeHtml(data.message)}</p>` +
    '<p style="margin-top:16px;color:#888;font-size:12px">Reply to this email to respond directly to the sender.</p>' +
    "</div>";

  return { text, html };
}

async function _sendEmail(data) {
  const username = (process.env.SMTP_USERNAME || "").trim();
  const password = (process.env.SMTP_APP_PASSWORD || "").trim();
  const toEmail = (process.env.CONTACT_TO_EMAIL || "info@heartenhome.org").trim();
  const fromEmail = (process.env.CONTACT_FROM_EMAIL || username).trim();
  const host = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
  const port = parseInt(process.env.SMTP_PORT || "587", 10);

  if (!username || !password) {
    return { sent: false, error: "SMTP credentials are not configured" };
  }
  if (!toEmail) {
    return { sent: false, error: "CONTACT_TO_EMAIL is not configured" };
  }

  const { text, html } = _buildEmail(data);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user: username, pass: password },
  });

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject: `New contact inquiry from ${data.name || "website visitor"}`,
      text,
      html,
    });
    return { sent: true, error: null };
  } catch (err) {
    return { sent: false, error: `SMTP send failed: ${err.message}` };
  }
}

// ---------------------------------------------------------------------------
// Handler  (Vercel / Netlify / Base44-compatible)
// ---------------------------------------------------------------------------

async function handler(req, res) {
  // CORS — allow the static frontend origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ detail: "Method not allowed" });

  const body = req.body || {};

  // Honeypot — a hidden field real users never fill in.
  if (body.website && String(body.website).trim()) {
    return res.status(400).json({ detail: "Submission rejected." });
  }

  // Rate limiting
  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (_isRateLimited(ip)) {
    return res.status(429).json({ detail: "Too many submissions. Please try again later." });
  }

  // Validate
  const { errors, data } = _validate(body);
  if (errors.length) return res.status(400).json({ detail: errors.join(" ") });

  const id = crypto.randomUUID();

  // ── Base44 Entity (optional) ──────────────────────────────────────────
  // After creating a "ContactMessage" entity in the Base44 builder, persist
  // the inquiry here so submissions are never lost even if email fails:
  //
  //   await entities.ContactMessage.create({
  //     id, name: data.name, email: data.email, phone: data.phone,
  //     interest: data.interest, message: data.message,
  //     created_at: new Date().toISOString(),
  //     email_status: "pending",
  //   });
  // ──────────────────────────────────────────────────────────────────────

  // Send email notification
  const { sent, error } = await _sendEmail(data);

  // Update entity email_status here if using the entity above.

  return res.status(200).json({
    ok: true,
    id,
    email_status: sent ? "sent" : "failed",
    email_error: error,
  });
}

module.exports = handler;
module.exports.default = handler;
