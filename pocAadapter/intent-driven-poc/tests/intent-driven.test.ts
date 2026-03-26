/**
 * intent-driven.test.ts
 *
 * Tests derived from the article findings on intent-driven engineering vs hub-and-spoke.
 * Each test validates a specific ownership/observability gap that hub-and-spoke patterns
 * fail to address:
 *
 * 1. Dropped events must be persisted — not silently discarded.
 * 2. Event status must reflect routing outcome — ownership of result is explicit.
 * 3. Source field is preserved — intent can be traced back to its origin.
 * 4. Routing rules are inspectable — intent is queryable from outside the hub.
 * 5. Dropped events are observable via API — failure states are not hidden.
 * 6. EventBus subscriber isolation — module-level state must not leak between tests.
 */

import request from "supertest";
import { app } from "../src/app";
import { eventStore, droppedStore } from "../src/persistence/inMemoryStore";
import { processEvent } from "../src/core/coreService";
import { subscribe, resetSubscribers } from "../src/event/eventBus";

beforeEach(() => {
  eventStore.length = 0;
  droppedStore.length = 0;
  resetSubscribers();
});

// ── 1. Dropped events are persisted, not silently discarded ──────────────────

test("dropped event (no targets) is persisted to droppedStore", () => {
  processEvent({ eventType: "UnknownEvent", payload: { x: 1 }, timestamp: Date.now() });
  expect(droppedStore).toHaveLength(1);
  expect(droppedStore[0].eventType).toBe("UnknownEvent");
});

test("dropped event does not appear in eventStore", () => {
  processEvent({ eventType: "UnknownEvent", payload: {}, timestamp: Date.now() });
  expect(eventStore).toHaveLength(0);
});

// ── 2. Event status reflects routing outcome ─────────────────────────────────

test("routed event has status 'routed'", () => {
  processEvent({ eventType: "ProductOrderCreate", payload: { id: 1 }, timestamp: Date.now() });
  expect(eventStore[0].status).toBe("routed");
});

test("dropped event has status 'dropped'", () => {
  processEvent({ eventType: "NoSuchEvent", payload: {}, timestamp: Date.now() });
  expect(droppedStore[0].status).toBe("dropped");
});

// ── 3. Source field is preserved through the pipeline ────────────────────────

test("source field is preserved on a routed event", () => {
  processEvent({
    eventType: "ProductOrderCreate",
    payload: { id: 42 },
    timestamp: Date.now(),
    source: "OrderManagementSystem",
  });
  expect(eventStore[0].source).toBe("OrderManagementSystem");
});

test("source field is preserved on a dropped event", () => {
  processEvent({
    eventType: "UnknownEvent",
    payload: {},
    timestamp: Date.now(),
    source: "LegacyBillingSystem",
  });
  expect(droppedStore[0].source).toBe("LegacyBillingSystem");
});

// ── 4. Routing rules are inspectable via API ─────────────────────────────────

test("GET /routing-rules returns the full routing table", async () => {
  const res = await request(app).get("/routing-rules");
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("ProductOrderCreate");
  expect(res.body.ProductOrderCreate).toContain("Salesforce");
  expect(res.body.ProductOrderCreate).toContain("ServiceNow");
  expect(res.body).toHaveProperty("InventoryUpdate");
});

// ── 5. Dropped events are observable via API ─────────────────────────────────

test("GET /events/dropped returns dropped events", async () => {
  await request(app)
    .post("/event")
    .send({ eventType: "GhostEvent", payload: { ref: "abc" } });

  const res = await request(app).get("/events/dropped");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].eventType).toBe("GhostEvent");
  expect(res.body[0].status).toBe("dropped");
});

test("GET /events/dropped returns empty when all events are routed", async () => {
  await request(app)
    .post("/event")
    .send({ eventType: "ProductOrderCreate", payload: { id: 1 } });

  const res = await request(app).get("/events/dropped");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(0);
});

// ── 6. EventBus subscriber isolation ─────────────────────────────────────────

test("resetSubscribers prevents handler accumulation across tests", () => {
  const calls: string[] = [];
  subscribe(({ event }) => calls.push(event.eventType));

  processEvent({ eventType: "ProductOrderCreate", payload: {}, timestamp: Date.now() });
  expect(calls).toHaveLength(1);

  // Simulate what happens without reset: re-subscribe without clearing
  subscribe(({ event }) => calls.push(event.eventType));
  processEvent({ eventType: "ProductOrderCreate", payload: {}, timestamp: Date.now() });
  // Two handlers fire — proving accumulation is real without resetSubscribers()
  expect(calls).toHaveLength(3); // 1 from first event + 2 handlers on second event
});

test("after resetSubscribers, no handlers fire", () => {
  const calls: string[] = [];
  subscribe(({ event }) => calls.push(event.eventType));
  resetSubscribers();

  processEvent({ eventType: "ProductOrderCreate", payload: {}, timestamp: Date.now() });
  // The outbound adapter was also cleared, so no handlers at all
  expect(calls).toHaveLength(0);
});
