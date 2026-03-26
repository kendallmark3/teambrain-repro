# Test Report — Intent-Driven Integration POC

**Date:** 2026-03-26
**Runner:** Jest
**Result:** PASS

---

## Summary

| Metric        | Value |
|---------------|-------|
| Test Suites   | 2 passed, 2 total |
| Tests         | 8 passed, 8 total |
| Snapshots     | 0 |
| Duration      | 0.821s |

---

## Test Suites

### `tests/core.test.ts` — PASS

Unit tests for the canonical core processing logic.

| Test | Result |
|------|--------|
| processEvent stores the event in the event store | ✓ |
| processEvent does not crash for unknown eventType (no targets) | ✓ |
| processEvent stores multiple events in order | ✓ |

### `tests/flow.test.ts` — PASS

Integration tests for the full inbound → core → outbound flow via HTTP.

| Test | Result |
|------|--------|
| POST /event returns 202 for valid ProductOrderCreate | ✓ |
| POST /event returns 202 for unknown eventType (dropped, not errored) | ✓ |
| POST /event returns 400 for missing eventType | ✓ |
| POST /event returns 400 for empty eventType string | ✓ |
| GET /events returns stored events | ✓ |

---

## What Was Verified

- Inbound adapter accepts and validates event payloads
- Core service persists events and resolves routing targets
- Unknown event types are dropped gracefully (no crash, no 5xx)
- Fan-out to Salesforce, ServiceNow, and InventorySystem confirmed via outbound adapter logs
- Event store is queryable via GET /events

---

## Architecture Under Test

```
Inbound (REST) → Core (canonical model + routing) → Event Bus → Outbound Adapters
```

Routing rules tested:
- `ProductOrderCreate` → Salesforce, ServiceNow
- `InventoryUpdate` → InventorySystem
- `UnknownEvent` → dropped (no targets)
