# ADR-001: Use Kafka as Transport Layer for Nautobot-Salesforce Integration

**Status:** Accepted
**Date:** 2024-11-12
**Authors:** Platform Architecture Team

---

## Context

The Nautobot to Salesforce integration needs to reliably deliver location change events from Nautobot to Salesforce. We evaluated several transport options.

The primary requirements are:
- Guaranteed delivery — no lost events even if Salesforce is temporarily unavailable
- Decoupled systems — Nautobot should not be blocked waiting for Salesforce to respond
- Replayability — ability to reprocess events if Salesforce schema changes
- Observability — visibility into message flow and failures

---

## Decision

We will use **Apache Kafka** as the transport layer between Nautobot and Salesforce.

Nautobot publishes webhook events to a Kafka topic. The integration microservice consumes from that topic and writes to Salesforce. A dead letter queue handles failed messages.

---

## Alternatives Considered

### Direct HTTP Integration (Rejected)

Nautobot webhooks call the Salesforce API directly.

**Why rejected:**
- Tight coupling — if Salesforce is down, Nautobot webhook delivery fails
- No replay capability — lost events cannot be recovered
- No backpressure control — Salesforce API rate limits would cause cascading failures

### AWS SQS (Rejected)

Use SQS as a managed queue between Nautobot and Salesforce.

**Why rejected:**
- Introduces AWS dependency into an otherwise on-prem stack
- Higher operational cost
- Team has stronger Kafka expertise

---

## Consequences

**Gains:**
- Event durability — Kafka retains messages for 7 days
- Decoupling — Salesforce downtime does not affect Nautobot
- Replayability — DLQ enables safe reprocessing
- Scalability — consumer group can be scaled horizontally

**Tradeoffs:**
- Operational complexity — Kafka cluster requires maintenance
- Eventual consistency — Salesforce may lag Nautobot by seconds during high load
- Schema management — Kafka message schema must be versioned carefully

---

## Migration Notes

No migration required. This is a net-new integration. Existing manual sync process will be deprecated after 30-day parallel run confirms correctness.
