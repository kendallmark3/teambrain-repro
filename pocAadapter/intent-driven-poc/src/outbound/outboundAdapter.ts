import { subscribe } from "../event/eventBus";

/**
 * initOutbound — registers the fan-out handler on the event bus.
 * Called once at startup. In production each target system would have its own
 * adapter (HTTP client, Kafka producer, etc.) — here we simulate with console logs.
 */
export const initOutbound = (): void => {
  subscribe(({ event, targets }) => {
    targets.forEach((target) => {
      console.log(`[outbound] Sending "${event.eventType}" to ${target}`, event.payload);
    });
  });
};
