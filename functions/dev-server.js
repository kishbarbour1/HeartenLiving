/**
 * Lightweight Express dev server that serves the contact function locally.
 *
 * In production this is replaced by the Base44 Function runtime (or any
 * serverless platform).  The dev server is only used inside docker-compose
 * so the frontend's CRA proxy can reach /api/contact during development.
 */

const express = require("express");
const cors = require("cors");
const handler = require("./contact");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => res.json({ message: "Hearten API" }));
app.post("/api/contact", (req, res) => handler(req, res));

const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Hearten API dev server listening on 0.0.0.0:${PORT}`);
});
