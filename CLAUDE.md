# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> This file is committed to git. Every developer and every Claude Code session inherits these standards automatically.

---

## Project Context

**Type:** Full-stack web application + intent-driven engineering framework
**Stack:** TypeScript, Node.js (Express) backend + React (Vite) frontend
**Team:** 2–5 developers
**Reasoning Framework:** [TeamBrain](https://github.com/kendallmark3/TeamBrain)

---

## Repository Architecture

This repo is both a **working full-stack application** (`app/`) and a **demonstration of intent-driven AI engineering practices**. Key directories:

- `app/server/` — Express API (TypeScript, Zod validation, strict mode)
- `app/client/` — React frontend (Vite, TypeScript strict)
- `intent/` — Canonical intent documents; CI checks these exist and are non-empty
- `.claude/commands/` — Custom slash command templates (`/intent-check`, `/arch-review`, `/review`)
- `demo/` — Standalone starter projects showing framework patterns

**Request flow:** Client fetches `/api/*` → Vite dev proxy → Express server on `:3001`. In production, the proxy is replaced by an env-configured base URL.

**Intent documents are first-class:** `intent/architecture.intent.md` and `intent/constraints.md` define what the system does and does not do. Architectural changes require updating these files, not just the code.

---

## Development Commands

```bash
# Backend (app/server/)
npm run dev        # tsx hot-reload on :3001
npm run build      # tsc compile to dist/
npm start          # run compiled dist/index.js

# Frontend (app/client/)
npm run dev        # Vite dev server on :5173 (proxies /api → :3001)
npm run build      # tsc + vite build to dist/
npm run preview    # preview production build
```

No test runner is configured yet. When adding tests, document the command here.

---

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
