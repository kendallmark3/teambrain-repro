import express from "express";
import path from "path";
import { handleRequest } from "./inbound/inboundController";
import { initOutbound } from "./outbound/outboundAdapter";
import { eventStore, droppedStore, logStore, routingRules } from "./persistence/inMemoryStore";

const app = express();
app.use(express.json());

/** Serve the browser UI from src/public/ */
app.use(express.static(path.join(__dirname, "public")));

/** Register outbound adapter handlers before any requests arrive */
initOutbound();

/** POST /event — inbound adapter entry point */
app.post("/event", handleRequest);

/**
 * GET /events — exposes successfully routed events for the browser UI.
 * In production this would be a paginated DB query.
 */
app.get("/events", (_req, res) => {
  res.json(eventStore);
});

/**
 * GET /events/dropped — exposes events the core could not route.
 * Intent-driven systems must make failure states observable, not silently discard them.
 * In production this maps to a DLQ query.
 */
app.get("/events/dropped", (_req, res) => {
  res.json(droppedStore);
});

/**
 * GET /log — exposes the inbound call log for the browser UI.
 * Every POST /event appends one entry (routed, dropped, or rejected).
 * Makes every inbound call observable without tailing server logs.
 */
app.get("/log", (_req, res) => {
  res.json(logStore);
});

/**
 * GET /routing-rules — exposes the current routing table.
 * In intent-driven architecture, intent must be inspectable from outside the hub.
 * Callers can verify what the system will do with a given eventType before sending.
 */
app.get("/routing-rules", (_req, res) => {
  res.json(routingRules);
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
