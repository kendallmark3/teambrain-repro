---
name: intent-check
description: This skill should be used when the user asks to implement a new feature, add functionality, fix a bug, or make any code change. Activate before writing any code to validate intent, surface assumptions, and identify risks. Trigger phrases include "implement", "add", "build", "create", "fix", "change", "update", or any request to write new code.
version: 1.0.0
---

# Intent Check

Before writing any code, answer all of the following out loud. Do not skip any.

## 1. What is the actual problem?
Restate the requirement in your own words. Not what was asked — what problem it solves.

## 2. Who is affected?
Which users, systems, or services does this touch?

## 3. What are you assuming?
List every assumption being made. If you can't list at least two, you haven't thought hard enough.

## 4. What are the edge cases?
What happens at the boundaries? Empty input, max load, network failure, bad auth?

## 5. What could go wrong?
Name the top 3 risks with this approach before starting.

## 6. What is NOT in scope?
Be explicit about what this change does not do.

## 7. Is there a simpler solution?
If yes — why aren't you doing that instead?

---

> Only proceed once all 7 are answered. If any answer is "I don't know" — stop and ask the user before proceeding.
