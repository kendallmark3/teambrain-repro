# CLAUDE.md — TeamBrain-Powered Project Memory

> This file is committed to git. Every developer and every Claude Code session inherits these standards automatically.

---

## Project Context

**Type:** API / Backend  
**Stack:** TypeScript / Node.js  
**Team:** 2–5 developers  
**Reasoning Framework:** [TeamBrain](https://github.com/kendallmark3/TeamBrain)

---

## Core Principle: Reasoning Before Solutions

Before writing any code, Claude must:

1. **Restate the intent** — What problem are we actually solving?
2. **List assumptions** — What are we taking for granted? State them explicitly.
3. **Identify tradeoffs** — What are we gaining and giving up with this approach?
4. **Surface risks early** — What could go wrong? Flag it before it becomes a bug.
5. **No invented facts** — If requirements are ambiguous, ask. Do not guess and implement.

> If you cannot explain the reasoning, do not write the code.

---

## Non-Negotiables

- **Never implement without understanding intent.** Run `/intent-check` before starting any new feature.
- **Never invent requirements.** If something is unclear, stop and ask the team.
- **Always document the why, not just the what.** Comments explain decisions, not mechanics.
- **Tradeoffs must be explicit.** Every architectural decision needs a documented alternative considered.
- **Risk surfaces early.** If you touch auth, payments, data integrity, or external APIs — flag it before proceeding.
- **Glass-box thinking.** Reasoning must be visible and linked to constraints, not hidden inside black-box outputs.

---

## TypeScript / API Standards

- Strict TypeScript — no `any`, no silent type casting
- All endpoints must have explicit input validation (Zod or equivalent)
- Error handling must be intentional — no swallowed exceptions
- Every public function needs a JSDoc comment explaining **why** it exists, not just what it does
- Environment variables must be validated at startup, not scattered through code
- No inline secrets, no hardcoded URLs, no magic strings

---

## Architecture Decisions

Before proposing a new pattern, data model, or service boundary:

1. State the current state and why it's insufficient
2. Propose the change with explicit tradeoffs
3. Name at least one alternative considered and why it was rejected
4. Identify what breaks or needs migration

> Use `/arch-review` to trigger a structured architecture review.

---

## Code Review Standards

Every PR must answer:
- What problem does this solve?
- What assumptions does it make?
- What did you consider and reject?
- What are the edge cases and how are they handled?
- What monitoring or observability does this add?

> Use `/review` before opening a PR.

---

## Sensitive Path Rules

If your change touches any of the following, **stop and flag before proceeding:**

- `/auth` or authentication logic
- Payment or billing logic
- Database migrations or schema changes
- External API integrations
- Environment configuration
- Rate limiting or security middleware

---

## Team Workflow

```
New feature → /intent-check → implement → /review → PR
Architecture change → /arch-review → team alignment → implement
```

**For new team members:** Clone the repo, run `claude` from the project root. These standards load automatically. Read `teambrain/TeamBrain.md` for the full reasoning framework.

---

## Folder Structure Conventions

```
src/
├── routes/       # HTTP layer only — no business logic here
├── services/     # Business logic — one responsibility per service
├── models/       # Data models and validation schemas
├── middleware/   # Auth, logging, error handling
├── utils/        # Pure functions, no side effects
└── config/       # Environment and configuration loading
```

---

## What Claude Should Never Do

- Implement a feature without stating intent first
- Guess at ambiguous requirements
- Propose a single solution without acknowledging alternatives
- Write code that touches sensitive paths without flagging risk
- Skip error handling because "it probably won't happen"
- Use `any` in TypeScript

---

## References

- [TeamBrain Framework](https://github.com/kendallmark3/TeamBrain)
- `teambrain/TeamBrain.md` — Core reasoning principles
- `teambrain/IntentPrompt.md` — Intent validation protocol
- `teambrain/signals.md` — Early warning signals
- `teambrain/DataArch.md` — Data architecture standards
- `.claude/rules/` — Domain-specific rules loaded by Claude Code
