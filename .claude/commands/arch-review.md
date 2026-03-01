# /arch-review

Use this before proposing or implementing any architectural change — new service, new data model, new pattern, new dependency.

## 1. Current State
What exists today and why is it insufficient?

## 2. Proposed Change
Describe the change in one paragraph. If you need more than a paragraph, the scope is too large — break it down.

## 3. Tradeoffs
| What we gain | What we give up |
|---|---|
| | |

Fill this table. Both columns must have entries. If you can't fill the right column, you haven't thought it through.

## 4. Alternatives Considered
Name at least **two** alternatives and explain why each was rejected.

- **Option A:** [description] — Rejected because: [reason]
- **Option B:** [description] — Rejected because: [reason]

## 5. Migration & Breakage
- What existing code breaks?
- What data needs to migrate?
- Can this be rolled back? How?

## 6. Observability
- How will we know if this is working?
- What do we log, monitor, or alert on?

## 7. Team Alignment
- Who needs to review this before it goes in?
- Does this decision need to be documented in `DECISIONS.md`?

---

> Do not implement until the team has seen and agreed on this review.
