# Onboarding Guide: Nautobot-Salesforce Integration

Welcome to the integrations team. This guide walks you through understanding and running the Nautobot-Salesforce location sync service.

---

## What This Service Does

When a network location (site, building, floor) is created or updated in Nautobot, this service automatically syncs that change to Salesforce. This keeps the sales and network teams working from the same location data.

**Data flow:**
```
Nautobot → Webhook → Kafka Topic → Integration Service → Salesforce API
```

If Salesforce is unavailable or rejects the message, it goes to a dead letter queue for safe reprocessing.

---

## Local Development Setup

### Prerequisites

- Java 17+
- Docker (for local Kafka)
- Access to dev Salesforce sandbox
- Access to dev Nautobot instance

### Step 1: Clone and configure

```bash
git clone git@github.com:company/nautobot-sf-integration.git
cd nautobot-sf-integration
cp .env.example .env
```

Fill in `.env` with:
- `SALESFORCE_CLIENT_ID` — get from the team 1Password vault
- `SALESFORCE_CLIENT_SECRET` — same vault
- `KAFKA_BOOTSTRAP_SERVERS=localhost:9092`
- `NAUTOBOT_WEBHOOK_SECRET` — get from Nautobot admin panel

### Step 2: Start local Kafka

```bash
docker-compose up -d kafka zookeeper
```

### Step 3: Run the service

```bash
./gradlew bootRun
```

The service starts on port 8080.

### Step 4: Send a test event

```bash
curl -X POST http://localhost:8080/webhook/nautobot \
  -H "Content-Type: application/json" \
  -d @test/fixtures/location-created.json
```

---

## Key Files to Understand

| File | Purpose |
|------|---------|
| `src/main/java/.../NautobotWebhookController.java` | Receives webhook, publishes to Kafka |
| `src/main/java/.../LocationTransformer.java` | Maps Nautobot schema → Salesforce schema |
| `src/main/java/.../SalesforceClient.java` | Handles Salesforce API calls and retries |
| `src/main/java/.../DlqConsumer.java` | Processes failed messages from the DLQ |
| `src/main/resources/application.yml` | All configuration |

---

## Common First-Week Questions

**Q: Why Kafka and not direct API calls?**
See ADR-001. Short answer: Salesforce goes down sometimes and we can't lose events.

**Q: What happens if a message fails?**
It goes to the dead letter queue. The on-call engineer reviews it and replays after fixing the root cause.

**Q: How do I add a new field mapping?**
Edit `LocationTransformer.java`. Add a test in `LocationTransformerTest.java`. All mappings must have unit test coverage.

**Q: Where do I find credentials?**
1Password vault: `Integrations Team`. Ask your onboarding buddy for access.

---

## Runbook

For incident response, see `runbook.md` in this documentation set.

---

## Who to Ask

- **Integration questions:** Post in #integrations-team on Slack
- **Salesforce schema changes:** Tag @salesforce-admin in the ticket
- **Kafka / infra issues:** Post in #platform-eng
- **Urgent incidents:** Page via PagerDuty — service name `nautobot-sf-integration`
