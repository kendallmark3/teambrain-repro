import { CanonicalEvent } from "../core/canonicalModel";

/**
 * LogEntry — one record per inbound POST /event call.
 * Captures what arrived, whether it was valid, what routing decision was made,
 * and which targets were resolved. Makes every inbound call observable from the UI.
 * In production this would be a structured log sink (e.g. Datadog, OpenTelemetry).
 */
export interface LogEntry {
  timestamp: number;
  eventType: string | null;
  payload: Record<string, unknown> | null;
  /** "routed" = targets found and published; "dropped" = no targets; "rejected" = failed Zod validation */
  status: "routed" | "dropped" | "rejected";
  targets: string[];
  validationError?: unknown;
}

/**
 * logStore — in-memory inbound call log.
 * Every POST /event appends one entry regardless of outcome.
 * Exposed via GET /log for the browser UI.
 */
export const logStore: LogEntry[] = [];

/**
 * eventStore — simulates a MongoDB collection of successfully routed events.
 * In production this would be replaced by a real DB write.
 * Kept module-level so all tests and requests share the same instance.
 */
export const eventStore: CanonicalEvent[] = [];

/**
 * droppedStore — persists events the core could not route (no matching targets).
 * In intent-driven architecture the system must own its failure states;
 * silently discarding unrouted events (hub-and-spoke pattern) breaks auditability.
 * In production this would be a DLQ (e.g. a dead-letter Kafka topic or DB collection).
 */
export const droppedStore: CanonicalEvent[] = [];

/**
 * routingRules — simulates a Mongo routing-rules collection.
 * Maps an eventType string to the list of downstream system names that should receive it.
 * In production these rules would be fetched from the DB and cached.
 */
export const routingRules: Record<string, string[]> = {
  ProductOrderCreate: ["Salesforce", "ServiceNow"],
  InventoryUpdate: ["InventorySystem"],
};
