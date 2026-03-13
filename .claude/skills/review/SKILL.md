---
name: review
description: This skill should be used when the user is preparing to open a pull request, wants code reviewed, asks "is this ready?", or has just finished implementing a feature. Trigger phrases include "PR", "pull request", "review", "ready to merge", "done", "finished", or "can I ship this".
version: 1.0.0
---

# Pre-PR Code Review

Run through every section before opening a pull request. Flag any failures before proceeding.

## Intent
- Does this PR solve the problem stated in the ticket/issue?
- Is the PR description clear enough that someone unfamiliar can understand it in 2 minutes?

## Code Quality
- Is there any `any` in TypeScript? If yes — fix it before proceeding.
- Are all inputs validated at the boundary (route/controller level)?
- Are errors handled intentionally, not silently swallowed?
- Are there magic strings or hardcoded values that should be constants or env vars?

## Logic & Edge Cases
- What happens with empty or null input?
- What happens under high load or timeout?
- What happens if a downstream service is unavailable?

## Security
- Does this touch auth, payments, or sensitive data? If yes — flag it explicitly.
- Are there any new environment variables? Are they validated at startup?
- Could any input be used for injection (SQL, command, XSS, etc.)?

## Tests
- Is there a test for the happy path?
- Is there a test for at least one failure/edge case?
- Would a test failure here catch a real bug?

## Documentation
- Do new functions have JSDoc comments explaining **why** they exist?
- Does the PR description explain what was considered and rejected?
- Does anything need updating in the README or architecture docs?

## Checklist
- [ ] Intent is clear and matches the original requirement
- [ ] No `any` in TypeScript
- [ ] All inputs validated
- [ ] Error handling is explicit
- [ ] Edge cases are covered
- [ ] Security reviewed
- [ ] Tests written
- [ ] Docs updated if needed

---

> If any checkbox is unchecked — fix it before the PR goes up. The team's time is worth more than a fast merge.
