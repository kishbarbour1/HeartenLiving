"""Outbound email notifications for contact form submissions (Google Workspace SMTP).

Sends over smtp.gmail.com:587 with STARTTLS, authenticating with an app password.
Credentials are read from the environment (platform secrets) and never logged.
"""
import asyncio
import html
import logging
import os
import smtplib
import ssl
from email.message import EmailMessage
from email.utils import formatdate, make_msgid
from typing import Optional, Tuple

logger = logging.getLogger(__name__)


def _row(label: str, value: str) -> str:
    if not value:
        return ""
    return (
        f'<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">{html.escape(label)}</td>'
        f'<td style="padding:6px 0">{html.escape(value)}</td></tr>'
    )


def _build_bodies(payload: dict) -> Tuple[str, str]:
    rows = (
        _row("Name", payload.get("name", ""))
        + _row("Email", payload.get("email", ""))
        + _row("Phone", payload.get("phone", ""))
        + _row("Interested in", payload.get("interest", ""))
        + _row("Submitted", payload.get("created_at", ""))
    )
    text = (
        "New contact form submission\n\n"
        f"Name: {payload.get('name', '')}\n"
        f"Email: {payload.get('email', '')}\n"
        f"Phone: {payload.get('phone', '')}\n"
        f"Interested in: {payload.get('interest', '')}\n"
        f"Submitted: {payload.get('created_at', '')}\n\n"
        f"Message:\n{payload.get('message', '')}\n"
    )
    html_body = (
        "<div style=\"font-family:Arial,sans-serif;font-size:14px;color:#333\">"
        "<h2 style=\"color:#6e1423\">New contact form submission</h2>"
        f"<table style=\"border-collapse:collapse\">{rows}</table>"
        "<p style=\"margin-top:16px;font-weight:600\">Message</p>"
        f"<p style=\"white-space:pre-wrap\">{html.escape(payload.get('message', ''))}</p>"
        "<p style=\"margin-top:16px;color:#888;font-size:12px\">"
        "Reply to this email to respond directly to the sender.</p>"
        "</div>"
    )
    return text, html_body


def _build_message(payload: dict, from_email: str, to_email: str) -> EmailMessage:
    msg = EmailMessage()
    msg["Subject"] = f"New contact inquiry from {payload.get('name') or 'website visitor'}"
    msg["From"] = from_email
    msg["To"] = to_email
    msg["Reply-To"] = payload.get("email", "")
    msg["Date"] = formatdate(localtime=True)
    msg["Message-ID"] = make_msgid(domain="heartenhome.org")

    text, html_body = _build_bodies(payload)
    msg.set_content(text)
    msg.add_alternative(html_body, subtype="html")
    return msg


def _send_sync(msg: EmailMessage, host: str, port: int, username: str, password: str) -> None:
    context = ssl.create_default_context()
    with smtplib.SMTP(host, port, timeout=20) as server:
        server.ehlo()
        server.starttls(context=context)
        server.ehlo()
        server.login(username, password)
        server.send_message(msg)


async def send_contact_notification(payload: dict) -> Tuple[bool, Optional[str]]:
    """Send the inquiry to the configured inbox. Returns (sent, error_message)."""
    username = (os.environ.get("SMTP_USERNAME") or "").strip()
    password = (os.environ.get("SMTP_APP_PASSWORD") or "").strip()
    to_email = (os.environ.get("CONTACT_TO_EMAIL") or "").strip()
    from_email = (os.environ.get("CONTACT_FROM_EMAIL") or "").strip() or username
    host = (os.environ.get("SMTP_HOST") or "smtp.gmail.com").strip()
    try:
        port = int(os.environ.get("SMTP_PORT") or 587)
    except ValueError:
        port = 587

    if not username or not password:
        return False, "SMTP credentials are not configured"
    if not to_email:
        return False, "CONTACT_TO_EMAIL is not configured"

    msg = _build_message(payload, from_email, to_email)

    try:
        await asyncio.to_thread(_send_sync, msg, host, port, username, password)
    except smtplib.SMTPAuthenticationError:
        return False, "SMTP authentication failed (check SMTP_USERNAME / SMTP_APP_PASSWORD)"
    except Exception as exc:  # network / TLS / SMTP errors — no credentials in message
        logger.warning("SMTP send failed: %s", exc)
        return False, f"SMTP send failed: {exc}"

    return True, None
