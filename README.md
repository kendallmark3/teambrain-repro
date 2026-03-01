# [Project Name]
> Intent-Driven Engineering — TeamBrain™ Framework

---

## ⚠️ Start Here

Before writing code, read:

1. [`/intent/architecture.intent.md`](./intent/architecture.intent.md) — Why this system exists and what it must never compromise.
2. [`/intent/constraints.md`](./intent/constraints.md) — The architectural rules derived from intent.

If these files are missing or incomplete, **stop**. Resolve intent before building.

---

## Repo Structure

```
repo/
 ├── intent/
 │    ├── architecture.intent.md   ← Start here. Always.
 │    └── constraints.md           ← Rules derived from intent
 │
 ├── src/                          ← Application source code
 ├── infra/
 │    └── intent-aligned-architecture.md  ← Cloud decisions traced to intent
 ├── prompts/
 │    └── system.prompt.md         ← AI operating instructions (version controlled)
 ├── tests/
 └── README.md
```

---

## Working With AI on This Project

Paste the contents of [`/prompts/system.prompt.md`](./prompts/system.prompt.md) into your AI session before asking for code, architecture, or infrastructure recommendations.

This ensures the AI operates inside declared constraints — not as a generic code generator.

---

## CI Requirements

This repo enforces the following checks on every PR:

- [ ] `/intent/architecture.intent.md` exists and is non-empty
- [ ] `/intent/constraints.md` exists and is non-empty
- [ ] No secrets detected in committed files
- [ ] Infrastructure drift check passes (if applicable)

PRs that fail intent checks are blocked from merge.

---

## Constraint Violations

If you believe a constraint must be violated to ship:

1. Do not silently work around it.
2. Open a PR that names the violation explicitly.
3. Get approval from the intent owner listed in `architecture.intent.md`.
4. Document the exception and remediation deadline in `constraints.md`.

---

## Intent Review

Intent is not permanent. It must be revisited when trigger conditions are met.  
See the trigger conditions listed in `/intent/architecture.intent.md`.

---

*Built on the TeamBrain™ Intent-Driven Engineering Framework.*
