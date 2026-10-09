"""Outbound email notifications for contact form submissions (Resend)."""
import html
import logging
import os
from typing import Optional, Tuple

import httpx

logger = logging.getLogger(__name__)

RESEND_API_URL = "https://api.resend.com/emails"


def _row(label: str, value: str) -> str:
    if not value:
        return ""
    return (
        f'<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">{html.escape(label)}</td>'
        f'<td style="padding:6px 0">{html.escape(value)}</td></tr>'
    )


def _build_html(payload: dict) -> str:
    rows = (
        _row("Name", payload.get("name", ""))
        + _row("Email", payload.get("email", ""))
        + _row("Phone", payload.get("phone", ""))
        + _row("Interested in", payload.get("interest", ""))
    )
    return (
        "<div style=\"font-family:Arial,sans-serif;font-size:14px;color:#333\">"
        "<h2 style=\"color:#6e1423\">New contact form submission</h2>"
        f"<table style=\"border-collapse:collapse\">{rows}</table>"
        "<p style=\"margin-top:16px;font-weight:600\">Message</p>"
        f"<p style=\"white-space:pre-wrap\">{html.escape(payload.get('message', ''))}</p>"
        "<p style=\"margin-top:16px;color:#888;font-size:12px\">"
        "Reply to this email to respond directly to the sender.</p>"
        "</div>"
    )


async def send_contact_notification(payload: dict) -> Tuple[bool, Optional[str]]:
    """Send the inquiry to the configured inbox. Returns (sent, error_message)."""
    api_key = (os.environ.get("RESEND_API_KEY") or "").strip()
    to_email = (os.environ.get("CONTACT_TO_EMAIL") or "").strip()
    from_email = (os.environ.get("CONTACT_FROM_EMAIL") or "").strip()

    if not api_key:
        return False, "RESEND_API_KEY is not configured"
    if not to_email or not from_email:
        return False, "CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not configured"

    body = {
        "from": from_email,
        "to": [to_email],
        "reply_to": payload.get("email", ""),
        "subject": f"New contact inquiry from {payload.get('name') or 'website visitor'}",
        "html": _build_html(payload),
    }

    try:
        async with httpx.AsyncClient(timeout=15) as client:
            resp = await client.post(
                RESEND_API_URL,
                json=body,
                headers={"Authorization": f"Bearer {api_key}"},
            )
    except Exception as exc:  # network / timeout
        logger.warning("Resend request failed: %s", exc)
        return False, f"Resend request failed: {exc}"

    if resp.status_code >= 300:
        detail = resp.text[:300]
        logger.warning("Resend returned %s: %s", resp.status_code, detail)
        return False, f"Resend error {resp.status_code}: {detail}"

    return True, None
