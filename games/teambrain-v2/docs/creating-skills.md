# Creating Claude Code Skills

> Reference guide for building, configuring, and distributing Claude Code skills — based on the official Claude Code documentation.

---

## What Are Skills?

Skills extend what Claude can do. Create a `SKILL.md` file with instructions, and Claude adds it to its toolkit. Claude uses skills when relevant, or you can invoke one directly with `/skill-name`.

**Key point:** Custom commands have been merged into skills. A file at `.claude/commands/review.md` and a skill at `.claude/skills/review/SKILL.md` both create `/review` and work the same way.

Claude Code skills follow the [Agent Skills](https://agentskills.io) open standard — works across multiple AI tools. Claude Code extends it with invocation control, subagent execution, and dynamic context injection.

---

## Bundled Skills (Ship with Claude Code)

| Skill | Usage | What It Does |
|-------|-------|--------------|
| `/simplify` | After a feature/bug fix | Reviews changed files for reuse, quality, efficiency — spawns 3 parallel review agents then applies fixes |
| `/batch <instruction>` | Large-scale codebase changes | Decomposes work into 5–30 units, spawns one background agent per unit in isolated git worktrees |
| `/debug [description]` | Session troubleshooting | Reads session debug log to diagnose issues |

---

## Quick Start — Create Your First Skill

### Step 1: Create the skill directory

Skills live in a named directory. Personal skills (available across all projects):

```bash
mkdir -p ~/.claude/skills/explain-code
```

### Step 2: Write SKILL.md

Every skill needs a `SKILL.md` with two parts:
- **YAML frontmatter** (between `---` markers) — tells Claude when and how to use the skill
- **Markdown content** — instructions Claude follows when invoked

```yaml
---
name: explain-code
description: Explains code with visual diagrams and analogies. Use when explaining how code works, teaching about a codebase, or when the user asks "how does this work?"
---

When explaining code, always include:

1. **Start with an analogy**: Compare the code to something from everyday life
2. **Draw a diagram**: Use ASCII art to show the flow, structure, or relationships
3. **Walk through the code**: Explain step-by-step what happens
4. **Highlight a gotcha**: What's a common mistake or misconception?

Keep explanations conversational. For complex concepts, use multiple analogies.
```

### Step 3: Test the skill

**Let Claude invoke it automatically** when the description matches:
```
How does this code work?
```

**Or invoke it directly:**
```
/explain-code src/auth/login.ts
```

---

## Where Skills Live

| Location | Path | Applies To |
|----------|------|------------|
| Enterprise | Managed settings | All users in your organization |
| Personal | `~/.claude/skills/<skill-name>/SKILL.md` | All your projects |
| Project | `.claude/skills/<skill-name>/SKILL.md` | This project only |
| Plugin | `<plugin>/skills/<skill-name>/SKILL.md` | Where plugin is enabled |

**Priority:** enterprise > personal > project. Plugin skills use `plugin-name:skill-name` namespace — no conflicts.

**Monorepo support:** When editing files in subdirectories, Claude Code automatically discovers skills from nested `.claude/skills/` directories (e.g., `packages/frontend/.claude/skills/`).

---

## Skill Directory Structure

Each skill is a directory with `SKILL.md` as the required entrypoint:

```
my-skill/
├── SKILL.md           # Main instructions (required)
├── template.md        # Template for Claude to fill in
├── examples/
│   └── sample.md      # Example output showing expected format
└── scripts/
    └── validate.sh    # Script Claude can execute
```

> Keep `SKILL.md` under 500 lines. Move detailed reference material to separate files.

---

## Frontmatter Reference

All fields are optional. `description` is recommended so Claude knows when to use the skill.

| Field | Required | Description |
|-------|----------|-------------|
| `name` | No | Display name. If omitted, uses directory name. Lowercase, numbers, hyphens only (max 64 chars). |
| `description` | Recommended | What the skill does and when to use it. Claude uses this to decide when to apply it. |
| `argument-hint` | No | Hint shown during autocomplete. Example: `[issue-number]` or `[filename] [format]` |
| `disable-model-invocation` | No | `true` = only you can invoke. Claude cannot trigger automatically. Default: `false` |
| `user-invocable` | No | `false` = hidden from `/` menu. Only Claude can invoke. Default: `true` |
| `allowed-tools` | No | Tools Claude can use without approval when this skill is active |
| `model` | No | Model to use when this skill is active |
| `context` | No | `fork` = run in isolated subagent context |
| `agent` | No | Which subagent type to use when `context: fork` is set |
| `hooks` | No | Hooks scoped to this skill's lifecycle |

---

## String Substitutions

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | All arguments passed at invocation. If missing from content, appended as `ARGUMENTS: <value>` |
| `$ARGUMENTS[N]` | Specific argument by 0-based index (`$ARGUMENTS[0]` = first arg) |
| `$N` | Shorthand for `$ARGUMENTS[N]` (`$0` = first, `$1` = second) |
| `${CLAUDE_SESSION_ID}` | Current session ID — useful for logging or session-specific files |

**Example:**
```yaml
---
name: session-logger
description: Log activity for this session
---

Log the following to logs/${CLAUDE_SESSION_ID}.log:

$ARGUMENTS
```

---

## Invocation Control

| Frontmatter | You can invoke | Claude can invoke | When loaded into context |
|-------------|----------------|-------------------|--------------------------|
| (default) | Yes | Yes | Description always in context, full skill loads when invoked |
| `disable-model-invocation: true` | Yes | No | Description NOT in context |
| `user-invocable: false` | No | Yes | Description always in context |

**Use `disable-model-invocation: true`** for workflows with side effects you want to control:
```yaml
---
name: deploy
description: Deploy the application to production
disable-model-invocation: true
---
Deploy $ARGUMENTS to production:
1. Run the test suite
2. Build the application
3. Push to the deployment target
4. Verify the deployment succeeded
```

**Use `user-invocable: false`** for background knowledge that isn't an actionable command:
```yaml
---
name: legacy-system-context
description: Context about the legacy payment system architecture
user-invocable: false
---
The legacy payment system uses...
```

---

## Tool Restriction

Limit which tools Claude can use when a skill is active:

```yaml
---
name: safe-reader
description: Read files without making changes
allowed-tools: Read, Grep, Glob
---
```

---

## Passing Arguments

```yaml
---
name: fix-issue
description: Fix a GitHub issue
disable-model-invocation: true
---

Fix GitHub issue $ARGUMENTS following our coding standards.

1. Read the issue description
2. Understand the requirements
3. Implement the fix
4. Write tests
5. Create a commit
```

Running `/fix-issue 123` → Claude receives "Fix GitHub issue 123 following our coding standards..."

**Multiple positional arguments:**
```yaml
---
name: migrate-component
description: Migrate a component from one framework to another
---

Migrate the $0 component from $1 to $2.
Preserve all existing behavior and tests.
```

Running `/migrate-component SearchBar React Vue` → `$0`=SearchBar, `$1`=React, `$2`=Vue.

---

## Dynamic Context Injection

The `` !`command` `` syntax runs shell commands **before** the skill content is sent to Claude. The output replaces the placeholder — Claude sees actual data, not the command.

```yaml
---
name: pr-summary
description: Summarize changes in a pull request
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

## Pull request context
- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`
- Changed files: !`gh pr diff --name-only`

## Your task
Summarize this pull request for the team.
```

When this skill runs:
1. Each `` !`command` `` executes immediately (before Claude sees anything)
2. Output replaces the placeholder
3. Claude receives the fully-rendered prompt with actual data

> This is preprocessing, not something Claude executes. Claude only sees the final result.

**Tip:** Include the word `ultrathink` anywhere in skill content to enable extended thinking mode.

---

## Running Skills in a Subagent

Add `context: fork` to run a skill in isolation. The skill content becomes the prompt driving the subagent — it won't have access to your conversation history.

```yaml
---
name: deep-research
description: Research a topic thoroughly
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly:

1. Find relevant files using Glob and Grep
2. Read and analyze the code
3. Summarize findings with specific file references
```

When this skill runs:
1. A new isolated context is created
2. The subagent receives the skill content as its prompt
3. The `agent` field determines execution environment (model, tools, permissions)
4. Results are summarized and returned to your main conversation

**Available `agent` options:** `Explore`, `Plan`, `general-purpose`, or any custom subagent from `.claude/agents/`. If omitted, uses `general-purpose`.

**Skills vs. Subagents:**

| Approach | System Prompt | Task | Also Loads |
|----------|---------------|------|------------|
| Skill with `context: fork` | From agent type | SKILL.md content | CLAUDE.md |
| Subagent with `skills` field | Subagent markdown body | Claude's delegation message | Preloaded skills + CLAUDE.md |

---

## Supporting Files

Keep `SKILL.md` focused on essentials. Reference supporting files so Claude knows when to load them:

```markdown
## Additional resources

- For complete API details, see [reference.md](reference.md)
- For usage examples, see [examples.md](examples.md)
```

```
my-skill/
├── SKILL.md       (required — overview and navigation)
├── reference.md   (detailed API docs — loaded when needed)
├── examples.md    (usage examples — loaded when needed)
└── scripts/
    └── helper.py  (utility script — executed, not loaded)
```

---

## Controlling Claude's Skill Access

By default, Claude can invoke any skill without `disable-model-invocation: true`.

**Disable ALL skills** (deny the Skill tool in `/permissions`):
```
Skill
```

**Allow or deny specific skills:**
```
# Allow only specific skills
Skill(commit)
Skill(review-pr *)

# Deny specific skills
Skill(deploy *)
```

Permission syntax: `Skill(name)` for exact match, `Skill(name *)` for prefix match.

---

## Sharing Skills

| Target | How |
|--------|-----|
| Project team | Commit `.claude/skills/` to version control |
| Plugin users | Create a `skills/` directory in your plugin |
| Organization | Deploy via managed settings |

---

## Types of Skill Content

**Reference content** — knowledge Claude applies to current work:
```yaml
---
name: api-conventions
description: API design patterns for this codebase
---

When writing API endpoints:
- Use RESTful naming conventions
- Return consistent error formats
- Include request validation
```

**Task content** — step-by-step instructions for a specific action:
```yaml
---
name: deploy
description: Deploy the application to production
context: fork
disable-model-invocation: true
---

Deploy the application:
1. Run the test suite
2. Build the application
3. Push to the deployment target
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Skill not triggering | Check description has keywords users would naturally say. Run `What skills are available?`. Try `/skill-name` directly. |
| Skill triggers too often | Make description more specific. Add `disable-model-invocation: true` for manual-only. |
| Claude doesn't see all skills | Skill descriptions have a context budget (2% of context window, min 16,000 chars). Run `/context` for warnings. Override with `SLASH_COMMAND_TOOL_CHAR_BUDGET` env var. |

---

## TeamBrain + Skills

Skills are a natural extension of the TeamBrain intent-driven framework:

- Create a `review` skill that enforces TeamBrain's reasoning-before-solutions protocol
- Use `disable-model-invocation: true` on deployment skills so engineers control when to ship
- Use `user-invocable: false` on a `teambrain-context` skill that loads framework principles as background knowledge
- Add `context: fork` to architecture review skills so they run in isolation without polluting conversation history
- Use `allowed-tools: Read, Grep, Glob` on audit skills to enforce read-only review mode

**Example: TeamBrain intent-check skill**
```yaml
---
name: intent-check
description: Run TeamBrain intent validation before starting any new feature
disable-model-invocation: true
argument-hint: [feature description]
---

Before implementing $ARGUMENTS, run the full TeamBrain intent protocol:

1. **Restate the intent** — What problem are we actually solving?
2. **List assumptions** — What are we taking for granted? State them explicitly.
3. **Identify tradeoffs** — What are we gaining and giving up?
4. **Surface risks early** — What could go wrong? Flag it before writing code.
5. **No invented facts** — If requirements are ambiguous, ask. Do not guess.

Do not proceed to implementation until all 5 steps are complete.
```

---

## Related Resources

- [Claude Code Skills Docs](https://code.claude.com/docs/en/skills)
- [Subagents](https://code.claude.com/docs/en/sub-agents)
- [Plugins](https://code.claude.com/docs/en/plugins)
- [Hooks](https://code.claude.com/docs/en/hooks)
- [Memory & CLAUDE.md](https://code.claude.com/docs/en/memory)
- [Permissions](https://code.claude.com/docs/en/permissions)
- [Agent Skills Open Standard](https://agentskills.io)
