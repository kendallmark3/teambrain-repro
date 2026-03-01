# Intent-Aligned Cloud Architecture
> Generated from: `/intent/constraints.md`  
> Owner: [ROLE]  
> Last revised: [DATE]

Before any infrastructure is provisioned, this document answers three questions
derived from declared intent. Infrastructure code is written inside these boundaries.

---

## Q1: What cloud architecture pattern aligns with our intent?

> Fill this in after running the AI prompt below against your intent file.

**Recommended pattern:** [e.g. Event-driven microservices / Modular monolith / CQRS + event sourcing]

**Why it aligns:**
- [Reason 1 — trace to constraint]
- [Reason 2 — trace to constraint]

---

## Q2: What deployment model violates our intent?

**We will not use:**

| Pattern | Why It Violates Intent |
|---------|----------------------|
| Direct-to-prod pipelines without approval gates | Violates: "No direct production access" |
| Stateful single-instance deployments | Violates: "Stateless services where possible" |
| Manually provisioned resources | Violates: "All cloud resources must be reproducible" |
| [Add pattern] | Violates: [constraint] |

---

## Q3: What CI/CD behavior must be constrained?

| Behavior | Constraint Applied |
|----------|--------------------|
| Auto-merge to main without review | ❌ Not permitted |
| Deploy on merge without staging validation | ❌ Not permitted |
| Skip rollback step to reduce pipeline time | ❌ Not permitted — rollback is non-negotiable |
| Infrastructure changes without drift check | ❌ Not permitted |
| Missing `/intent/` files | ❌ Pipeline fails — intent is required |
| [Add behavior] | [Constraint] |

---

## Resulting Infrastructure Decisions

> Populate this after the above questions are answered.

### Compute
- [ ] [Decision] — Justified by: [constraint]

### Networking
- [ ] [Decision] — Justified by: [constraint]

### Data
- [ ] [Decision] — Justified by: [constraint]

### Secrets & Config
- [ ] All secrets via [Vault / AWS Secrets Manager / GCP Secret Manager]
- [ ] No environment variables hardcoded in Dockerfiles or deployment manifests

### Observability Stack
- [ ] [Logging tool] — structured JSON logs
- [ ] [Tracing tool] — distributed tracing on critical path
- [ ] [Alerting tool] — alerts tied to constraint violation thresholds, not just uptime

---

## AI Prompt to Generate This Document

Run this prompt against your intent files to populate the sections above:

```
Based on the declared intent in /intent/architecture.intent.md 
and the constraints in /intent/constraints.md:

1. What cloud architecture pattern best aligns with our stated priorities?
2. What deployment models would violate our declared constraints?
3. What CI/CD behaviors must be explicitly constrained or blocked?

For each answer, trace your reasoning back to a specific constraint.
Do not recommend patterns that optimize for speed if they conflict with declared tradeoffs.
```

---

*This file lives at `/infra/intent-aligned-architecture.md`*  
*Infrastructure code (Terraform / CDK / Pulumi) lives in `/infra/` alongside this document.*
