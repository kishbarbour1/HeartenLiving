/**
 * Local development server for the contact function.
 *
 * Runs the SAME handler as the deployed Base44 function (`functions/contact/core.ts`)
 * on Deno, so local behaviour matches the Base44 runtime. Not deployed to Base44.
 *
 * The Base44 SDK is unavailable locally, so this provides a minimal mock:
 *  - entity writes are logged,
 *  - SendEmail is intentionally unavailable, which exercises the function's
 *    SMTP fallback (Google Workspace) when SMTP secrets are present.
 */
import { handleContact } from "./functions/contact/core.ts";

const mockBase44 = {
  asServiceRole: {
    entities: {
      ContactMessage: {
        create: (data: Record<string, unknown>) => {
          console.log("[dev] ContactMessage.create", JSON.stringify(data));
          return Promise.resolve(data);
        },
        update: (id: string, data: Record<string, unknown>) => {
          console.log("[dev] ContactMessage.update", id, JSON.stringify(data));
          return Promise.resolve({ id, ...data });
        },
      },
    },
    integrations: {
      Core: {
        SendEmail: () => Promise.reject(new Error("SendEmail integration unavailable outside Base44")),
      },
    },
  },
};

const port = Number(Deno.env.get("PORT") || 8000);

Deno.serve({ port, hostname: "0.0.0.0" }, (req) => {
  const url = new URL(req.url);
  if (url.pathname === "/api" && req.method === "GET") {
    return Response.json({ message: "Hearten API" });
  }
  return handleContact(req, mockBase44);
});

console.log(`Hearten contact dev server listening on 0.0.0.0:${port}`);
