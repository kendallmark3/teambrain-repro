import express from "express";
import path from "path";
import { handleRequest } from "./inbound/inboundController";
import { initOutbound } from "./outbound/outboundAdapter";
import { eventStore } from "./persistence/inMemoryStore";

const app = express();
app.use(express.json());

/** Serve the browser UI from src/public/ */
app.use(express.static(path.join(__dirname, "public")));

/** Register outbound adapter handlers before any requests arrive */
initOutbound();

/** POST /event — inbound adapter entry point */
app.post("/event", handleRequest);

/**
 * GET /events — exposes the in-memory event store for the browser UI.
 * In production this would be a paginated DB query.
 */
app.get("/events", (_req, res) => {
  res.json(eventStore);
});

export { app };

/** Only start listening when this file is the entry point, not when imported by tests */
if (require.main === module) {
  const PORT = 3002;
  app.listen(PORT, () => {
    console.log(`\n  Intent-Driven POC running at http://localhost:${PORT}\n`);
    console.log("  POST /event   — send a canonical event");
    console.log("  GET  /events  — view stored events");
    console.log("  GET  /        — open browser UI\n");
  });
}
