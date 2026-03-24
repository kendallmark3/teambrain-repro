import { z } from "zod";

/**
 * InboundEventSchema — validates the raw HTTP body before it enters the core.
 * Enforcing structure here prevents malformed events from reaching the routing layer,
 * and gives callers a clear contract about what the API expects.
 */
export const InboundEventSchema = z.object({
  eventType: z.string().min(1, "eventType must be a non-empty string"),
  payload: z.record(z.unknown()),
});

export type InboundEvent = z.infer<typeof InboundEventSchema>;
