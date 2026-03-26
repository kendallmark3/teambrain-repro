# Test Results — Intent-Driven Integration POC

**Date:** 2026-03-26
**Run:** `npm test -- --verbose`
**Result:** 19 passed / 0 failed / 3 suites / 0.539s

---

## Summary

| Suite | Tests | Status |
|---|---|---|
| `core.test.ts` | 3 | PASS |
| `intent-driven.test.ts` | 11 | PASS |
| `flow.test.ts` | 5 | PASS |
| **Total** | **19** | **All pass** |

---

## core.test.ts — Core Service Unit Tests

| # | Test | Result |
|---|---|---|
| 1 | processEvent stores the event in the event store | PASS |
| 2 | processEvent routes unknown eventType to droppedStore, not eventStore | PASS |
| 3 | processEvent stores multiple events in order | PASS |

**What these cover:** Core routing decisions, event persistence to `eventStore` for routed events, and separation of dropped events into `droppedStore`.

---

## intent-driven.test.ts — Intent-Driven Ownership Gap Tests

Tests introduced after reviewing the article on intent-driven engineering vs hub-and-spoke. Each test validates a specific ownership or observability gap present in the original hub-and-spoke implementation.

| # | Test | Result | Gap Addressed |
|---|---|---|---|
| 1 | dropped event (no targets) is persisted to droppedStore | PASS | Dropped events must not be silently discarded |
| 2 | dropped event does not appear in eventStore | PASS | eventStore only holds routed events |
| 3 | routed event has status 'routed' | PASS | Event lifecycle must be explicit |
| 4 | dropped event has status 'dropped' | PASS | Event lifecycle must be explicit |
| 5 | source field is preserved on a routed event | PASS | Intent ownership must be traceable |
| 6 | source field is preserved on a dropped event | PASS | Intent ownership must be traceable |
| 7 | GET /routing-rules returns the full routing table | PASS | Routing intent must be inspectable |
| 8 | GET /events/dropped returns dropped events | PASS | Failure states must be observable via API |
| 9 | GET /events/dropped returns empty when all events are routed | PASS | Failure states must be observable via API |
| 10 | resetSubscribers prevents handler accumulation across tests | PASS | EventBus state must not leak between tests |
| 11 | after resetSubscribers, no handlers fire | PASS | EventBus state must not leak between tests |

---

## flow.test.ts — HTTP Integration Tests

| # | Test | Result |
|---|---|---|
| 1 | POST /event returns 202 for valid ProductOrderCreate | PASS |
| 2 | POST /event returns 202 for unknown eventType (dropped, not errored) | PASS |
| 3 | POST /event returns 400 for missing eventType | PASS |
| 4 | POST /event returns 400 for empty eventType string | PASS |
| 5 | GET /events returns stored events | PASS |

**What these cover:** Full HTTP request/response cycle, Zod input validation, correct status codes for valid/invalid/unroutable events, and event retrieval.

---

## Architecture Changes Validated by Tests

| Change | Validated By |
|---|---|
| `CanonicalEvent.status: "routed" \| "dropped"` | intent-driven tests 3, 4 |
| `CanonicalEvent.source?: string` | intent-driven tests 5, 6 |
| `droppedStore` separates dropped events from `eventStore` | intent-driven tests 1, 2; core test 2 |
| `GET /events/dropped` endpoint | intent-driven tests 8, 9 |
| `GET /routing-rules` endpoint | intent-driven test 7 |
| `resetSubscribers()` on EventBus | intent-driven tests 10, 11 |
