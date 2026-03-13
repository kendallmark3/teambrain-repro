---
name: arch-review
description: This skill should be used when the user proposes or discusses architectural changes — new services, new data models, new patterns, new dependencies, API design, database schema changes, or service boundaries. Trigger phrases include "architecture", "service", "data model", "schema", "pattern", "refactor", "restructure", "new dependency", or "how should we design".
version: 1.0.0
---

# Architecture Review

Apply this framework before proposing or implementing any architectural change.

## 1. Current State
What exists today and why is it insufficient?

## 2. Proposed Change
Describe the change in one paragraph. If it requires more than a paragraph, the scope is too large — break it down.

## 3. Tradeoffs
| What we gain | What we give up |
|---|---|
| | |

Both columns must have entries. If you can't fill the right column, the tradeoffs haven't been thought through.

## 4. Alternatives Considered
Name at least two alternatives and explain why each was rejected.

- **Option A:** [description] — Rejected because: [reason]
- **Option B:** [description] — Rejected because: [reason]

## 5. Migration & Breakage
- What existing code breaks?
- What data needs to migrate?
- Can this be rolled back? How?

## 6. Observability
- How will we know if this is working?
- What should be logged, monitored, or alerted on?

## 7. Team Alignment
- Who needs to review this before it goes in?
- Does this decision need to be documented in `DECISIONS.md`?

---

> Do not implement until the team has seen and agreed on this review.
