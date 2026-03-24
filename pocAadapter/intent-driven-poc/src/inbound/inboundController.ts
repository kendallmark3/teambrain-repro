import { Request, Response } from "express";
import { processEvent } from "../core/coreService";
import { InboundEventSchema } from "./inboundSchema";

/**
 * handleRequest — the inbound REST adapter.
 * Validates the raw HTTP body with Zod, transforms it into a CanonicalEvent,
 * then delegates to the core. Keeps the HTTP layer completely separate from
 * business logic — the core never sees a Request or Response object.
 */
export const handleRequest = (req: Request, res: Response): void => {
  const result = InboundEventSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: "Invalid payload", details: result.error.flatten() });
    return;
  }

  const canonicalEvent = {
    eventType: result.data.eventType,
    payload: result.data.payload,
    timestamp: Date.now(),
  };

  processEvent(canonicalEvent);

  res.status(202).json({ status: "accepted", eventType: canonicalEvent.eventType });
};
