# TeamBrain v2 — Interactive Demo Site

A single-page application that presents the [TeamBrain](https://github.com/kendallmark3/TeamBrain) intent-driven engineering framework as a polished, interactive demo. Built entirely with vanilla HTML, CSS, and JavaScript — no build tools, no dependencies, no framework.

---

## Quick Start

```bash
# Open directly in any browser — no server needed
open games/teambrain-v2/index.html

# Or via full path
open /path/to/teambrain-repo/games/teambrain-v2/index.html
```

---

## What This Is

This site translates the TeamBrain GitHub README into an 8-page interactive experience covering:

| Page | ID | Description |
|------|----|-------------|
| Home | `home` | Hero typewriter, diagram image, 3 pillars |
| What Is It | `what` | Framework overview, capabilities, sources |
| The Problem | `problem` | Side-by-side: Most AI tools vs TeamBrain |
| Principles | `principles` | 6 core non-negotiables with animated bars |
| How It's Used | `usage` | 3 modes, use cases, repo contents |
| Who It's For | `who` | Roles, environments, Is/Is Not comparison |
| Get Started | `start` | 4-step guide, philosophy, author CTA |
| Claude Agents | `agents` | Agent SDK overview, tools, subagents, MCP |

---

## File Structure

```
games/teambrain-v2/
├── index.html          # All 8 pages, nav, drawer, footer — single file SPA
├── style.css           # ~1480 lines — design tokens, components, responsive
├── app.js              # ~130 lines — SPA router, typewriter, scroll reveals
├── images/
│   └── ChatGPT Image Mar 1, 2026, 10_44_48 AM.png   # Intent-Driven diagram
├── README.md           # This file
├── ARCHITECTURE.md     # Code structure and technical patterns
└── PAGES.md            # Full breakdown of each page and its components
```

---

## Design System

| Token | Value | Used For |
|-------|-------|----------|
| `--bg` | `#06080f` | Page background |
| `--bg2` | `#0c0f1a` | Cards, panels |
| `--bg3` | `#111527` | Code blocks, inputs |
| `--pri` | `#818cf8` | Indigo — primary accent, links |
| `--acc` | `#34d399` | Emerald — secondary accent, success |
| `--warn` | `#fbbf24` | Amber — warnings |
| `--danger` | `#f87171` | Red — errors, "not" states |
| `--border` | `#1e2540` | All borders |
| `--text` | `#e2e8f0` | Primary text |
| `--muted` | `#64748b` | Secondary text, labels |

---

## Tech Constraints

- **Zero dependencies** — no npm, no bundler, no framework
- **Single HTML file** — all pages are `<section>` elements toggled with CSS classes
- **No hash routing** — page state is in-memory JS only; refresh returns to home
- **No server required** — works as a local `file://` URL

---

## Browser Support

Targets modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses:
- CSS custom properties
- CSS Grid and Flexbox
- Intersection Observer API
- `requestAnimationFrame` (via IntersectionObserver transitions)

---

## Author

**Mark Kendall** — Senior Architect · Consultant · Systems Thinker
Framework: [github.com/kendallmark3/TeamBrain](https://github.com/kendallmark3/TeamBrain)
