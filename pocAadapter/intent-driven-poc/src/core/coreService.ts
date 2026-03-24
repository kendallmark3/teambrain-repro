import { CanonicalEvent } from "./canonicalModel";
import { eventStore } from "../persistence/inMemoryStore";
import { publish } from "../event/eventBus";
import { getTargets } from "./routingService";

/**
 * processEvent — the brain of the integration.
 * Receives a canonical event, persists it, resolves routing targets, then publishes
 * to the event bus for fan-out. This is the only place routing decisions are made,
 * keeping all outbound adapters decoupled from each other and from the inbound layer.
 */
export const processEvent = (event: CanonicalEvent): void => {
  eventStore.push(event);

  const targets = getTargets(event.eventType);

  if (targets.length === 0) {
    console.log(`[core] No routing targets for eventType "${event.eventType}". Dropping.`);
    return;
  }

  publish({ event, targets });
};
