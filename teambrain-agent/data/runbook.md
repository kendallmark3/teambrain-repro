# Runbook: Nautobot to Salesforce Integration Incident Response

## Service Overview

The Nautobot-Salesforce integration microservice processes location change events from Nautobot and syncs them to Salesforce. It runs on Kafka topic `nautobot.location.events`.

---

## Alert: Consumer Lag Spike

**Trigger:** Kafka consumer lag on `nautobot.location.events` exceeds 1000 messages.

**Steps:**
1. Check pod health: `kubectl get pods -n integrations`
2. Check consumer group lag: `kafka-consumer-groups --describe --group nautobot-sf-consumer`
3. If pods are healthy but lag is growing, scale up: `kubectl scale deployment nautobot-sf-integration --replicas=3`
4. If messages are stuck, check the dead letter queue: `kafka-console-consumer --topic nautobot.location.events.DLQ`
5. Escalate to the integrations team if lag does not reduce within 15 minutes.

---

## Alert: Dead Letter Queue Growing

**Trigger:** DLQ message count exceeds 50.

**Steps:**
1. Pull a sample message from the DLQ and inspect the payload.
2. Common causes:
   - Salesforce location schema mismatch — check for new required fields in Salesforce.
   - Nautobot webhook sending unexpected location type.
   - Salesforce API rate limit hit (check Salesforce API usage dashboard).
3. Fix the root cause before replaying DLQ messages.
4. To replay: use the DLQ replay tool: `python scripts/replay_dlq.py --topic nautobot.location.events.DLQ --limit 100`

---

## Alert: Salesforce API Errors

**Trigger:** 4xx or 5xx error rate from Salesforce API exceeds 5% over 5 minutes.

**Steps:**
1. Check Salesforce API status page.
2. Verify OAuth token is valid: `curl -X POST https://salesforce.internal/auth/token`
3. If token expired, rotate credentials in the secrets manager and restart the pod.
4. If Salesforce is returning 429 (rate limit), reduce Kafka consumer throughput by setting `MAX_POLL_RECORDS=10` in the deployment config.

---

## Escalation Path

- L1: On-call engineer (PagerDuty)
- L2: Integrations team lead
- L3: Platform architect

---

## Useful Commands

```bash
# View live logs
kubectl logs -f deployment/nautobot-sf-integration -n integrations

# Check Kafka topic
kafka-topics --describe --topic nautobot.location.events

# Restart the service
kubectl rollout restart deployment/nautobot-sf-integration -n integrations
```
