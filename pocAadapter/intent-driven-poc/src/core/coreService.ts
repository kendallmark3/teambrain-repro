import { CanonicalEvent, RoutingOutcome } from "./canonicalModel";
import { eventStore, droppedStore } from "../persistence/inMemoryStore";
import { publish } from "../event/eventBus";
import { getTargets } from "./routingService";

/**
 * processEvent — the brain of the integration.
 * Receives a canonical event, resolves routing targets, stamps the event with its
 * outcome status, then either publishes to the event bus (routed) or persists to
 * the droppedStore (dropped).
 *
 * Returns a RoutingOutcome so the inbound layer can log the decision without
 * the core needing to know anything about the log store.
 *
 * Why explicit status + droppedStore:
 *   Hub-and-spoke systems silently discard unrouted events, making failure invisible.
 *   Intent-driven architecture requires the system to own its failure states —
 *   every event must have a traceable, inspectable outcome.
 */
export const processEvent = (event: CanonicalEvent): RoutingOutcome => {
  const targets = getTargets(event.eventType);

  if (targets.length === 0) {
    const dropped: CanonicalEvent = { ...event, status: "dropped" };
    droppedStore.push(dropped);
    console.log(`[core] No routing targets for eventType "${event.eventType}". Persisted to droppedStore.`);
    return { status: "dropped", targets: [] };
  }

  const routed: CanonicalEvent = { ...event, status: "routed" };
  eventStore.push(routed);
  publish({ event: routed, targets });
  return { status: "routed", targets };
};
