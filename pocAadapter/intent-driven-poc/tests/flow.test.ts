import request from "supertest";
import { app } from "../src/app";
import { eventStore, logStore } from "../src/persistence/inMemoryStore";

beforeEach(() => {
  eventStore.length = 0;
  logStore.length = 0;
});

test("POST /event returns 202 for valid ProductOrderCreate", async () => {
  const res = await request(app)
    .post("/event")
    .send({ eventType: "ProductOrderCreate", payload: { orderId: 123 } });

  expect(res.status).toBe(202);
  expect(res.body.status).toBe("accepted");
  expect(res.body.eventType).toBe("ProductOrderCreate");
});

test("POST /event returns 202 for unknown eventType (dropped, not errored)", async () => {
  const res = await request(app)
    .post("/event")
    .send({ eventType: "SomeUnknownEvent", payload: {} });

  expect(res.status).toBe(202);
});

test("POST /event returns 400 for missing eventType", async () => {
  const res = await request(app)
    .post("/event")
    .send({ payload: { id: 1 } });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe("Invalid payload");
});

test("POST /event returns 400 for empty eventType string", async () => {
  const res = await request(app)
    .post("/event")
    .send({ eventType: "", payload: {} });

  expect(res.status).toBe(400);
});

test("GET /log records routed call", async () => {
  await request(app)
    .post("/event")
    .send({ eventType: "ProductOrderCreate", payload: { orderId: 1 } });

  const res = await request(app).get("/log");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].status).toBe("routed");
  expect(res.body[0].targets).toEqual(["Salesforce", "ServiceNow"]);
  expect(res.body[0].eventType).toBe("ProductOrderCreate");
});

test("GET /log records dropped call", async () => {
  await request(app)
    .post("/event")
    .send({ eventType: "UnknownEvent", payload: {} });

  const res = await request(app).get("/log");
  expect(res.body[0].status).toBe("dropped");
  expect(res.body[0].targets).toEqual([]);
});

test("GET /log records rejected call on bad payload", async () => {
  await request(app)
    .post("/event")
    .send({ payload: { id: 1 } });

  const res = await request(app).get("/log");
  expect(res.body[0].status).toBe("rejected");
  expect(res.body[0].eventType).toBeNull();
});

test("GET /events returns stored events", async () => {
  await request(app)
    .post("/event")
    .send({ eventType: "InventoryUpdate", payload: { sku: "X1" } });

  const res = await request(app).get("/events");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].eventType).toBe("InventoryUpdate");
});
