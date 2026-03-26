import { RoutedEvent } from "../core/canonicalModel";

type Handler = (event: RoutedEvent) => void;

/**
 * subscribers — simulates a Kafka consumer group registry.
 * Each outbound adapter registers a handler here instead of subscribing to a Kafka topic.
 */
const subscribers: Handler[] = [];

/**
 * publish — broadcasts a routed event to all registered handlers.
 * Simulates a Kafka producer publishing to a topic that all consumers receive.
 */
export const publish = (event: RoutedEvent): void => {
  subscribers.forEach((handler) => handler(event));
};

/**
 * subscribe — registers an outbound adapter handler.
 * In production this would be replaced by a Kafka consumer subscription.
 */
export const subscribe = (handler: Handler): void => {
  subscribers.push(handler);
};

/**
 * resetSubscribers — clears all registered handlers.
 * Exists solely for test isolation: the module-level subscribers array persists
 * across test files in Jest's module cache, causing handlers to accumulate and
 * produce duplicate side-effects. Call this in beforeEach when testing bus behaviour.
 */
export const resetSubscribers = (): void => {
  subscribers.length = 0;
};
