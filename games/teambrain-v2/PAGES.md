# Pages Reference — TeamBrain v2

Full breakdown of every page: content, HTML structure, components, and key classes.

---

## Navigation

All pages are navigated via `data-page="<id>"` attributes on any clickable element. No URLs change. The active page is tracked in JS (`currentPage`) and reflected in nav links via `.active` class.

```
Nav bar     → .nl buttons  (desktop)
Drawer      → .dl buttons  (mobile)
Footer      → .fl buttons  (all sizes)
Hero buttons, image buttons, inline CTAs → same data-page mechanism
```

---

## Page 1 — Home (`id="page-home"`)

**Purpose:** First impression. Establishes what TeamBrain is in 3 seconds or less.

### Sections

#### Hero (`class="home-hero"`)
Two-column grid: left = text content, right = image.

| Element | Class | Description |
|---------|-------|-------------|
| Eyebrow | `.eyebrow` | "Enterprise Reasoning Framework" |
| Headline | `.hero-h1` | Typewriter text cycling 4 phrases |
| Blinking cursor | `.cur` | CSS `@keyframes blink` |
| Body text | `.hero-p` | Framework summary paragraph |
| CTA buttons | `.hero-btns` | "Explore Principles" → principles, "What Is It →" → what |
| Negative pills | `.hero-pills` | "Not code generation", "Not a chatbot", "Not a magic solver" |
| Accent pill | `.pill-accent` | "A thinking amplifier" |
| Image button | `.hero-img-btn` | Clicks → principles page |
| Hero image | `.hero-img` | Intent-Driven AI diagram |
| Image caption | `.hero-img-cap` | "Intent-Driven AI with Purpose & Governance → Explore Principles" |

#### Quote Strip (`class="quote-strip"`)
Full-width blockquote: *"Good systems come from good judgment — not faster answers."*
Left border accent: `var(--pri)`.

#### Pillars (`class="pillars"`)
3-column grid of `.pillar` cards with scroll-reveal + stagger delays:
1. 🧠 Think Before Building
2. 🔍 Glass-Box, Not Black-Box
3. 🏛️ Built for Enterprise Reality

---

## Page 2 — What Is It (`id="page-what"`)

**Purpose:** Explain what TeamBrain provides and where it comes from.

### Sections

#### Two-column split (`class="what-split"`)

**Left — capabilities (`class="what-left"`):**
- Intro paragraph
- 4 `.what-item` rows with icons:
  - 🏗️ Architecture Reviews
  - ⚖️ Delivery Tradeoffs
  - ⚠️ Risk Analysis
  - 📊 Executive Communication

**Right — context cards (`class="what-right"`):**

| Card | Class | Content |
|------|-------|---------|
| Sources | `.what-card` | 3 bullet dots listing experience sources (global delivery, HCL-style consulting, principal engineers) |
| Glass-box identity | `.what-card.what-card--accent` | "A glass-box AI reviewer — not a black-box answer generator" |
| Status | `.what-card` | 4 ✅ status lines (actively evolving, used daily, etc.) |

---

## Page 3 — The Problem (`id="page-problem"`)

**Purpose:** Show what conventional AI gets wrong and how TeamBrain is different.

### Sections

#### Comparison grid (`class="problem-grid"`)
3-column: bad card | vs divider | good card

**Bad card (`class="prob-card prob-bad"`):** "Most AI Tools"
- 4 `.prob-list li` items with ✗ marks:
  - Jump straight to solutions
  - Invent requirements
  - Miss enterprise constraints
  - Optimize for speed over correctness

**VS divider (`class="prob-divider"`):** Circle with "vs" — hidden on mobile.

**Good card (`class="prob-card prob-good"`):** "TeamBrain"
- 4 `.prob-list li` items with ✓ marks:
  - Restates the problem first
  - Calls out unclear requirements
  - Surfaces constraints explicitly
  - Slows down the right moments

#### Context box (`class="problem-contexts"`)
4-item grid of environments where TeamBrain is designed for:
💰 Decisions are expensive to undo · 🔒 Real constraints · 💡 Clarity > cleverness · 🎯 Judgment > novelty

---

## Page 4 — Principles (`id="page-principles"`)

**Purpose:** The 6 non-negotiable rules of the framework.

### Components

Each principle is a `.pr` card with scroll-reveal:

| # | Class | Title |
|---|-------|-------|
| 01 | `.pr` | Reasoning Before Solutions |
| 02 | `.pr` | Explicit Assumptions |
| 03 | `.pr` | Clear Tradeoffs |
| 04 | `.pr` | Risk Surfaced Early |
| 05 | `.pr` | No Invented Facts |
| 06 | `.pr` | No Hidden Requirements |

Each `.pr` card contains:
- `.pr-num` — large faded number (01–06)
- `.pr-body` — heading + paragraph
- `.pr-bar` + `.pr-fill` — animated gradient bar (fills to 100% width when `.visible` class is added by IntersectionObserver)

#### Callout (`class="principles-callout"`)
Left-accent box highlighting: *"If something is unclear, TeamBrain calls it out instead of guessing."*

---

## Page 5 — How It's Used (`id="page-usage"`)

**Purpose:** Explain the 3 adoption modes and practical use cases.

### Sections

#### Modes (`class="usage-modes"`)
3-column grid of `.umode` cards:

| # | Title | Tags |
|---|-------|------|
| 01 | A Prompt Pack Loaded Into AI Tools | ChatGPT · Claude · Copilot · Any AI |
| 02 | A Thinking Companion During Design & Review | Architecture · PR Review · Design Sessions |
| 03 | A Team-Level Reasoning Standard | CLAUDE.md · Git-tracked · Team-wide |

#### Use Cases (`class="usage-cases"`)
6-item 3-column grid (`.uc-item`):
🏗️ Architecture reviews · ☁️ Cloud & platform decisions · 🚀 DevOps and delivery models · 🔗 Integration strategy · 📊 Executive summaries · 🎓 Daily instruction for engineers leveling up

#### Repository Contents (`class="usage-repo"`)
5-item 2-column grid (`.ur-item`):
- 💬 Core TeamBrain prompts
- 📄 Structured markdown templates
- 🔄 Reusable decision frameworks
- 🔎 Review and challenge patterns
- 📢 Executive translation formats

Footer note: "Everything is copy-paste friendly · Tool-agnostic · Safe for restricted enterprise environments"

---

## Page 6 — Who It's For (`id="page-who"`)

**Purpose:** Define the audience — roles and environments.

### Sections

#### Two-column layout (`class="who-layout"`)

**Left — Roles (`class="who-roles"`):**
6 `.role` cards:
- 👤 Senior Engineers
- 👤 Tech Leads
- 👤 Architects
- 👤 Consultants
- 👤 Engineering Managers
- 👤 Platform & DevOps Leaders

**Right — Environments (`class="who-envs"`):**
4 `.env` cards:
- 🏛️ Large Organizations
- ⚖️ Regulated Environments
- 📋 Consulting & Delivery Models
- 🔗 Complex Integration Landscapes

#### Is / Is Not (`class="is-isnot"`)
Two-column comparison:

| TeamBrain IS | TeamBrain IS NOT |
|-------------|-----------------|
| A thinking amplifier | A code generator |
| A virtual senior engineering team | A chatbot persona |
| A structured reasoning process | A magic architecture solver |
| A glass-box AI reviewer | A replacement for engineers |
| A team-wide shared standard | A shortcut to faster answers |
| A daily instructor for engineers leveling up | A substitute for judgment |

---

## Page 7 — Get Started (`id="page-start"`)

**Purpose:** Actionable guide to using TeamBrain. No setup required.

### Sections

#### 4-Step guide (`class="start-steps"`)
Each step is a `.ss` row (numbered circle + body):

| Step | Title | Key detail |
|------|-------|------------|
| 1 | Open Any Markdown File in the Repo | Clone snippet, `open teambrain/TeamBrain.md` |
| 2 | Paste Into Your AI Tool of Choice | Pills: ChatGPT · Claude · Copilot · Gemini · Any AI |
| 3 | Provide Your Real Context | Before/after example showing generic vs specific prompt |
| 4 | Let TeamBrain Review, Challenge, and Clarify | 5 ✅ outcome items |

#### Philosophy (`class="philosophy"`)
Centered quote + 2×2 grid of `.phi-item` cards:
- ⏸️ Slow down the right moments
- ⚡ Speed up decision quality
- 📉 Reduce rework
- 📈 Improve outcomes over time

#### Author CTA (`class="start-cta"`)
Card with `MK` avatar, **Mark Kendall** name + role, repo link, and two navigation buttons.

---

## Page 8 — Claude Agents (`id="page-agents"`)

**Purpose:** Introduce the Claude Agent SDK — how it works, what tools it provides, and how it connects to TeamBrain.

### Sections

#### Compare (`class="ag-compare"`)
Two-column before/after:
- Without SDK: manual tool loop, manual wiring, manual state management
- With SDK: automated loop, built-in tools, sessions, error handling

#### Built-in Tools (`class="ag-tools-grid"`)
6-item 3-column grid (`.ag-tool`):

| Tool | Description |
|------|-------------|
| `Read / Write / Edit` | File operations |
| `Bash` | Run terminal commands |
| `Glob / Grep` | File and content search |
| `WebSearch / WebFetch` | Real-time web access |
| `AskUserQuestion` | Interactive clarification |
| `Task` | Spawn subagents |

#### Permission Modes (`class="ag-modes-grid"`)
3-column grid (`.ag-mode`):

| Mode | Use Case |
|------|----------|
| `bypassPermissions` | CI/CD · Automation |
| `acceptEdits` | Development · Interactive |
| `default` | Custom · Fine-grained |

#### Quick Start (`class="ag-code-block"`)
Syntax-highlighted TypeScript code block showing:
- Install command
- API key setup
- `query()` call with `allowedTools` and `permissionMode`

#### Subagents (`class="ag-subagent-grid"`)
3-column grid showing example subagent specializations:
- 🔍 code-reviewer (Read · Glob · Grep — read-only)
- 🧪 test-runner (Bash · Read · Grep — executes)
- 📝 doc-writer (Read · Write · Glob — no commands)

#### Sessions + MCP (`class="ag-split-section"`)
Two-column split:
- 🔁 Sessions — resume context across queries with `session_id`
- 🔌 MCP — connect to external systems (Playwright example)

#### TeamBrain + Agents Callout (`class="ag-callout"`)
How the two combine: load TeamBrain prompts as agent system context so the agent reasons (restate → assumptions → tradeoffs → risks) before touching any file.

---

## Footer

Displayed on all pages. Contains:
- Brand mark (TB) + name
- Navigation links (`.fl` buttons) to all 8 pages
- Philosophy quote: *"Good systems come from good judgment — not faster answers."*
