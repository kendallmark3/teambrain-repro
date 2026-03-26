import { processEvent } from "../src/core/coreService";
import { eventStore, droppedStore } from "../src/persistence/inMemoryStore";

beforeEach(() => {
  eventStore.length = 0;
  droppedStore.length = 0;
});

test("processEvent stores the event in the event store", () => {
  processEvent({ eventType: "ProductOrderCreate", payload: { id: 1 }, timestamp: Date.now() });
  expect(eventStore).toHaveLength(1);
  expect(eventStore[0].eventType).toBe("ProductOrderCreate");
});

test("processEvent routes unknown eventType to droppedStore, not eventStore", () => {
  expect(() =>
    processEvent({ eventType: "UnknownEvent", payload: {}, timestamp: Date.now() })
  ).not.toThrow();
  expect(eventStore).toHaveLength(0);
  expect(droppedStore).toHaveLength(1);
});

test("processEvent stores multiple events in order", () => {
  processEvent({ eventType: "ProductOrderCreate", payload: { id: 1 }, timestamp: 1 });
  processEvent({ eventType: "InventoryUpdate", payload: { sku: "ABC" }, timestamp: 2 });
  expect(eventStore).toHaveLength(2);
  expect(eventStore[1].eventType).toBe("InventoryUpdate");
});
