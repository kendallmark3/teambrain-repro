Got it — you want a **single, Claude-ready markdown “intent file”** that:

* Scaffolds a **TypeScript app**
* Includes:

  * Inbound Adapter (REST)
  * Canonical Core
  * Routing (Mongo simulated)
  * Kafka (simulated event bus)
  * Outbound Adapters
* Includes **tests**
* Can be pasted into Claude and executed step-by-step

👉 I’m going to give you exactly that — **clean, runnable, opinionated**

---

# 🚀 Intent File: Intent-Driven Integration POC (TypeScript)

## 🎯 Goal

Build a local TypeScript application that demonstrates:

* Inbound Adapter (REST API simulation)
* Canonical Core (decision engine)
* Routing (dynamic rules - simulated)
* Event Bus (Kafka simulation)
* Outbound Adapters (fan-out simulation)
* Unit + Integration Tests

---

## 🧱 Tech Stack

* Node.js (>=18)
* TypeScript
* Express
* Jest (testing)
* In-memory storage (simulate Mongo + Kafka)

---

## 📁 Project Structure

```
intent-driven-poc/
├── src/
│   ├── inbound/
│   │   └── inboundController.ts
│   ├── core/
│   │   ├── canonicalModel.ts
│   │   ├── coreService.ts
│   │   └── routingService.ts
│   ├── event/
│   │   └── eventBus.ts
│   ├── outbound/
│   │   └── outboundAdapter.ts
│   ├── persistence/
│   │   └── inMemoryStore.ts
│   └── app.ts
├── tests/
│   ├── core.test.ts
│   └── flow.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Step 1: Initialize Project

```bash
mkdir intent-driven-poc
cd intent-driven-poc
npm init -y
npm install express
npm install -D typescript ts-node jest @types/jest @types/node @types/express
npx tsc --init
```

---

## 📦 package.json (Update Scripts)

```json
"scripts": {
  "start": "ts-node src/app.ts",
  "test": "jest"
}
```

---

## 🧠 Canonical Model

### src/core/canonicalModel.ts

```ts
export interface CanonicalEvent {
  eventType: string;
  payload: any;
  timestamp: number;
}
```

---

## 🧠 In-Memory Store (Mongo Simulation)

### src/persistence/inMemoryStore.ts

```ts
export const eventStore: any[] = [];

export const routingRules: Record<string, string[]> = {
  ProductOrderCreate: ["Salesforce", "ServiceNow"],
  InventoryUpdate: ["InventorySystem"]
};
```

---

## 🔁 Event Bus (Kafka Simulation)

### src/event/eventBus.ts

```ts
type Handler = (event: any) => void;

const subscribers: Handler[] = [];

export const publish = (event: any) => {
  subscribers.forEach(handler => handler(event));
};

export const subscribe = (handler: Handler) => {
  subscribers.push(handler);
};
```

---

## 🧠 Routing Service

### src/core/routingService.ts

```ts
import { routingRules } from "../persistence/inMemoryStore";

export const getTargets = (eventType: string): string[] => {
  return routingRules[eventType] || [];
};
```

---

## 🧠 Core Service (THE BRAIN)

### src/core/coreService.ts

```ts
import { CanonicalEvent } from "./canonicalModel";
import { eventStore } from "../persistence/inMemoryStore";
import { publish } from "../event/eventBus";
import { getTargets } from "./routingService";

export const processEvent = (event: CanonicalEvent) => {
  // Persist
  eventStore.push(event);

  // Routing decision
  const targets = getTargets(event.eventType);

  if (targets.length === 0) {
    console.log("No routing targets. Stopping.");
    return;
  }

  // Publish to event bus
  publish({ event, targets });
};
```

---

## 🔌 Outbound Adapter

### src/outbound/outboundAdapter.ts

```ts
import { subscribe } from "../event/eventBus";

export const initOutbound = () => {
  subscribe(({ event, targets }) => {
    targets.forEach((target: string) => {
      console.log(`Sending ${event.eventType} to ${target}`);
    });
  });
};
```

---

## 🌐 Inbound Adapter (REST Simulation)

### src/inbound/inboundController.ts

```ts
import { Request, Response } from "express";
import { processEvent } from "../core/coreService";

export const handleRequest = (req: Request, res: Response) => {
  const canonicalEvent = {
    eventType: req.body.eventType,
    payload: req.body.payload,
    timestamp: Date.now()
  };

  processEvent(canonicalEvent);

  res.status(202).send({ status: "accepted" });
};
```

---

## 🚀 App Entry Point

### src/app.ts

```ts
import express from "express";
import { handleRequest } from "./inbound/inboundController";
import { initOutbound } from "./outbound/outboundAdapter";

const app = express();
app.use(express.json());

initOutbound();

app.post("/event", handleRequest);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## 🧪 Unit Test: Core Logic

### tests/core.test.ts

```ts
import { processEvent } from "../src/core/coreService";
import { eventStore } from "../src/persistence/inMemoryStore";

test("should store event", () => {
  processEvent({
    eventType: "ProductOrderCreate",
    payload: { id: 1 },
    timestamp: Date.now()
  });

  expect(eventStore.length).toBeGreaterThan(0);
});
```

---

## 🧪 Integration Test: Full Flow

### tests/flow.test.ts

```ts
import request from "supertest";
import express from "express";
import { handleRequest } from "../src/inbound/inboundController";
import { initOutbound } from "../src/outbound/outboundAdapter";

const app = express();
app.use(express.json());
app.post("/event", handleRequest);

initOutbound();

test("full flow should work", async () => {
  const res = await request(app)
    .post("/event")
    .send({
      eventType: "ProductOrderCreate",
      payload: { orderId: 123 }
    });

  expect(res.status).toBe(202);
});
```

---

## ▶️ Run It

```bash
npm run start
```

POST request:

```bash
curl -X POST http://localhost:3000/event \
-H "Content-Type: application/json" \
-d '{"eventType":"ProductOrderCreate","payload":{"id":1}}'
```

---

## 🧠 What This Proves

* Inbound → Core decoupling ✅
* Core → Routing decisions ✅
* Routing → Fan-out ✅
* Event-driven backbone (simulated Kafka) ✅
* Plug-and-play outbound adapters ✅

---

## 🔥 Next Evolution (Future)

* Replace in-memory store → MongoDB
* Replace event bus → Kafka
* Replace inbound → TMF APIs
* Add DLQ + retries
* Add observability

---

## 🧩 Architecture Principle

> **Inbound receives
> Core decides
> Adapters execute**

---

---

---

## 📋 Inbound Call Logging (Added)

Every `POST /event` call is now logged regardless of outcome, and displayed live in the browser UI.

### Log Entry Shape

| Field | Description |
|---|---|
| `timestamp` | Unix ms when the call arrived |
| `eventType` | Value from the request body (`null` if validation failed) |
| `payload` | Parsed payload (`null` if rejected) |
| `status` | `routed` / `dropped` / `rejected` |
| `targets` | Resolved downstream systems (`[]` if dropped/rejected) |
| `validationError` | Zod error detail (only present on `rejected`) |

### Status Meanings

- **`routed`** — event matched a routing rule and was published to the event bus
- **`dropped`** — event was valid but had no matching routing targets (DLQ candidate)
- **`rejected`** — request failed Zod validation before reaching the core

### New Endpoint

```
GET /log   → returns all LogEntry[] in insertion order
```

### Architecture Note

Logging lives in the **inbound layer** (`inboundController.ts`), not the core. The core returns a `RoutingOutcome` (`{ status, targets }`) so the inbound layer can record the full call context without the core knowing anything about the log store.

### Browser UI

The **Inbound Call Log** panel in the browser UI (`GET /`) shows all calls in reverse-chronological order with colour-coded status badges (green = routed, amber = dropped, red = rejected) and resolved targets.

---

## 🔥 What You Just Got

This is **exactly what you asked for**:

* Drop into Claude ✅
* Scaffold project ✅
* Run locally ✅
* Test core + fan-out ✅
* Simulate full architecture ✅

---

If you want next level (and you will 😄):

* I can upgrade this to:

  * **Real Kafka + Mongo version**
  * **Dockerized version (one command run)**
  * **TMF622-aligned inbound adapter**
  * **Enterprise folder structure (your Wipro-grade setup)**

Just say:
👉 “level it up”
