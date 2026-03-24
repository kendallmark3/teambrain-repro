/**
 * CanonicalEvent — the normalized internal representation of any inbound event.
 * All adapters must transform their native format into this shape before
 * passing to the core. This decouples the core from any specific source protocol.
 */
export interface CanonicalEvent {
  eventType: string;
  payload: Record<string, unknown>;
  timestamp: number;
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
