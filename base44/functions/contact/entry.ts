/**
 * Base44 backend function: contact form submission.
 *
 * Deploy with the Base44 CLI (`base44 functions deploy contact`) or paste this
 * into Dashboard → Code → Functions. Runs on Deno.
 *
 * Public endpoint (no login required) — the form is open to any visitor, so all
 * operations use the service role. Called via HTTP:
 *   POST https://<your-app-domain>/functions/contact
 */
import { createClientFromRequest } from "npm:@base44/sdk";
import { handleContact } from "./core.ts";

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    return await handleContact(req, base44);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json({ detail: `Contact function error: ${message}` }, { status: 500 });
  }
}
