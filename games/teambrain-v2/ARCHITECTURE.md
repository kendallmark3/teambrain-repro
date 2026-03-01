# Architecture — TeamBrain v2

Technical breakdown of how the site is built. Three files, zero dependencies.

---

## File Responsibilities

| File | Lines | Responsibility |
|------|-------|----------------|
| `index.html` | ~920 | Structure: all 8 pages, nav, drawer, footer |
| `style.css` | ~1480 | Presentation: tokens, components, layout, responsive |
| `app.js` | ~131 | Behaviour: routing, typewriter, scroll reveals |

---

## SPA Routing (`app.js`)

The site is a zero-library Single Page Application. All pages live in the DOM simultaneously. Routing works by toggling two CSS classes: `active` (display: block) and `visible` (opacity + transform transition).

### Page lifecycle

```
navigateTo(pageId)
  │
  ├─ Remove `.visible` from current page     → starts fade-out transition (280ms)
  │
  └─ setTimeout(280ms)
       ├─ Remove `.active` from current page  → display:none
       ├─ Add `.active` to incoming page      → display:block
       ├─ void el.offsetWidth                 → force reflow (triggers CSS transition)
       ├─ Add `.visible` to incoming page     → fade-in
       ├─ Update active nav links
       ├─ Scroll to top (instant)
       └─ Call onEnter(pageId)               → page-specific init
```

### Page CSS classes

```css
.page              /* display:none by default */
.page.active       /* display:block */
.page.visible      /* opacity:1, transform:translateY(0) — animated */
```

### Click delegation

All navigation is handled by a single delegated listener on `document`. Any element with `data-page="<id>"` triggers navigation — nav buttons, drawer buttons, footer links, hero buttons, and image buttons all work the same way without individual handlers.

```js
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-page]');
  if (t) navigateTo(t.dataset.page);
});
```

---

## Mobile Drawer

The mobile menu is a slide-in drawer (`transform: translateX(100%)` → `0`). It is controlled by toggling `.open` on three elements simultaneously:

| Element | Effect of `.open` |
|---------|-------------------|
| `.drawer` | `translateX(0)` — slides in |
| `.backdrop` | `opacity:1`, `pointer-events:all` — dim overlay |
| `.burger` | Animates ☰ → ✕ via `span` transforms |

The backdrop click closes the drawer. Navigating always closes the drawer before the page swap.

---

## Scroll Reveal System

A single `IntersectionObserver` instance (`io`) watches all `.reveal` elements at a threshold of 8%. When an element enters the viewport, `.visible` is added and the element is unobserved (fires once only).

```js
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    io.unobserve(entry.target);
  });
}, { threshold: 0.08 });
```

On every page navigation, `observeReveals()` resets all `.reveal` elements (removes `.visible`) and re-registers them. This allows elements to animate again each time a page is visited.

### Stagger delays

Individual `.reveal` elements carry a CSS custom property `--d` for delay:

```html
<div class="reveal" style="--d:.1s">...</div>
```

```css
.reveal {
  transition: opacity .5s ease calc(var(--d, 0s)),
              transform .5s ease calc(var(--d, 0s));
}
```

---

## Typewriter (`app.js`)

Runs only on the Home page. Cycles through 4 lines with three phases per line:

| Phase | Speed | Action |
|-------|-------|--------|
| `typing` | 55ms/char | Appends characters to `#tw` |
| `pause` | 2400ms | Holds complete line |
| `erasing` | 28ms/char | Removes characters from end |

The blinking cursor is a `<span class="cur">|</span>` with a CSS `@keyframes blink` animation — it exists independently of the JS typewriter so it never stops blinking.

---

## CSS Architecture (`style.css`)

The stylesheet is structured in sections, top to bottom:

```
1. Reset                  (*, box-sizing)
2. Design Tokens          (:root CSS custom properties)
3. Base typography         (body, h1–h4, p, a)
4. Nav                    (.nav, .brand, .nl, .burger)
5. Mobile Drawer          (.drawer, .dl, .backdrop)
6. Page system            (.page, .page.active, .page.visible)
7. Layout utilities       (.inner, .ph, .eyebrow)
8. Reveal animation       (.reveal, .reveal.visible)
9. Buttons                (.btn-p, .btn-g, .btn-acc)
10. HOME page             (.home-hero, .hero-*, .glass-box, .quote-strip, .pillars)
11. WHAT IS IT page       (.what-split, .what-item, .what-card, .wc-*)
12. THE PROBLEM page      (.problem-grid, .prob-*, .problem-contexts)
13. PRINCIPLES page       (.pr, .pr-num, .pr-bar, .pr-fill, .principles-callout)
14. HOW IT'S USED page    (.usage-modes, .umode, .usage-cases, .uc-*, .usage-repo)
15. WHO IT'S FOR page     (.who-layout, .role, .env, .is-isnot, .is-card)
16. GET STARTED page      (.start-steps, .ss, .philosophy, .start-cta)
17. CLAUDE AGENTS page    (.ag-compare, .ag-tool, .ag-mode, .ag-pre, .ag-subagent)
18. Nav accent variant    (.nl--acc, .dl--acc, .fl--acc)
19. Footer                (.footer, .footer-inner, .footer-links, .fl)
20. Responsive            (@media max-width: 900px, 600px)
```

### Component naming convention

Page-specific components are namespaced with a short prefix to avoid collisions:

| Prefix | Page |
|--------|------|
| `hero-` | Home hero |
| `what-`, `wc-` | What Is It |
| `prob-`, `pc-` | The Problem |
| `pr-` | Principles |
| `umode-`, `uc-`, `ur-` | How It's Used |
| `who-`, `role-`, `env-` | Who It's For |
| `ss-`, `phi-`, `cta-` | Get Started |
| `ag-` | Claude Agents |

---

## Responsive Strategy

Two breakpoints only:

| Breakpoint | Changes |
|------------|---------|
| `≤ 900px` | Nav links hidden → burger shown; all multi-column grids collapse to 1 column; hero right panel hidden |
| `≤ 600px` | Page padding reduced; hero h1 font smaller; hero buttons stack vertically |

No JavaScript involved in responsive behaviour — pure CSS.

---

## Images

One image is currently used, stored in `images/`:

```
images/
└── ChatGPT Image Mar 1, 2026, 10_44_48 AM.png
    └── Intent-Driven AI diagram (CLAUDE.md governance flow)
        Linked to: Principles page
        Rendered as: .hero-img-btn (clickable button)
```

To add more images: place them in `images/`, add a `.hero-img-btn` block to the hero section, and set `data-page` to the destination page.

---

## Performance Notes

- No external fonts, no icon libraries, no CDN dependencies
- All animations use CSS transitions + `transform`/`opacity` (GPU-composited)
- IntersectionObserver fires exactly once per element per page visit
- The typewriter uses `setTimeout` (not `setInterval`) to allow variable timing per phase
- Page transitions use `display:none` → `display:block` gated behind a 280ms timeout to prevent layout thrashing during animation
