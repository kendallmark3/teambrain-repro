import { routingRules } from "../persistence/inMemoryStore";

/**
 * getTargets — resolves which downstream systems should receive a given eventType.
 * Encapsulated here so the routing lookup strategy can be swapped (e.g. DB query,
 * rules engine) without touching the core service.
 */
export const getTargets = (eventType: string): string[] => {
  return routingRules[eventType] ?? [];
};
