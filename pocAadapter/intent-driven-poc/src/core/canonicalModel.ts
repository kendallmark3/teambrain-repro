/**
 * CanonicalEvent — the normalized internal representation of any inbound event.
 * All adapters must transform their native format into this shape before
 * passing to the core. This decouples the core from any specific source protocol.
 *
 * `source` makes ownership explicit: in intent-driven architecture, the originating
 * system declares its intent; the hub must not silently absorb it.
 *
 * `status` captures the routing outcome so the system owns its failure states
 * rather than dropping events silently (hub-and-spoke anti-pattern).
 */
export interface CanonicalEvent {
  eventType: string;
  payload: Record<string, unknown>;
  timestamp: number;
  /** The system or adapter that produced this event. Traceability of intent ownership. */
  source?: string;
  /** Set by the core after routing decision. "routed" = targets found; "dropped" = no targets. */
  status?: "routed" | "dropped";
}

/**
 * RoutingOutcome — returned by processEvent so callers know what the core decided.
 * Keeps the logging concern in the inbound layer without coupling the core to the log store.
 */
export interface RoutingOutcome {
  status: "routed" | "dropped";
  targets: string[];
}

/**
 * RoutedEvent — what the event bus carries after the core makes a routing decision.
 * Keeps the original event together with its resolved targets so outbound adapters
 * have everything they need in a single message.
 */
export interface RoutedEvent {
  event: CanonicalEvent;
  targets: string[];
}
