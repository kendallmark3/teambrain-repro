import { CanonicalEvent } from "../core/canonicalModel";

/**
 * eventStore — simulates a MongoDB collection.
 * In production this would be replaced by a real DB write.
 * Kept module-level so all tests and requests share the same instance.
 */
export const eventStore: CanonicalEvent[] = [];

/**
 * routingRules — simulates a Mongo routing-rules collection.
 * Maps an eventType string to the list of downstream system names that should receive it.
 * In production these rules would be fetched from the DB and cached.
 */
export const routingRules: Record<string, string[]> = {
  ProductOrderCreate: ["Salesforce", "ServiceNow"],
  InventoryUpdate: ["InventorySystem"],
};
