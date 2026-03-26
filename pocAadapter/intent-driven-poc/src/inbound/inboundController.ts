import { Request, Response } from "express";
import { processEvent } from "../core/coreService";
import { InboundEventSchema } from "./inboundSchema";
import { logStore } from "../persistence/inMemoryStore";

/**
 * handleRequest — the inbound REST adapter.
 * Validates the raw HTTP body with Zod, transforms it into a CanonicalEvent,
 * then delegates to the core. Keeps the HTTP layer completely separate from
 * business logic — the core never sees a Request or Response object.
 *
 * Logging happens here (not in the core) because the inbound layer owns the
 * full call context (HTTP method, raw body, validation result). The core only
 * knows about canonical events, not HTTP concerns.
 */
export const handleRequest = (req: Request, res: Response): void => {
  const result = InboundEventSchema.safeParse(req.body);

  if (!result.success) {
    logStore.push({
      timestamp: Date.now(),
      eventType: typeof req.body?.eventType === "string" ? req.body.eventType : null,
      payload: null,
      status: "rejected",
      targets: [],
      validationError: result.error.flatten(),
    });
    res.status(400).json({ error: "Invalid payload", details: result.error.flatten() });
    return;
  }

  const canonicalEvent = {
    eventType: result.data.eventType,
    payload: result.data.payload,
    timestamp: Date.now(),
  };

  const outcome = processEvent(canonicalEvent);

  logStore.push({
    timestamp: canonicalEvent.timestamp,
    eventType: canonicalEvent.eventType,
    payload: canonicalEvent.payload,
    status: outcome.status,
    targets: outcome.targets,
  });

  res.status(202).json({ status: "accepted", eventType: canonicalEvent.eventType });
};
