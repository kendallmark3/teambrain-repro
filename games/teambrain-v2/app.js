/**
 * TeamBrain v2 — SPA router + animations
 * Vanilla JS, zero dependencies.
 */

// ── State ────────────────────────────────────────────────────────────────────
let currentPage = 'home';

// ── DOM ──────────────────────────────────────────────────────────────────────
const burger   = document.getElementById('burger');
const drawer   = document.getElementById('drawer');
const backdrop = document.getElementById('backdrop');

// ── Router ───────────────────────────────────────────────────────────────────
function navigateTo(pageId) {
  if (pageId === currentPage) { closeDrawer(); return; }

  const outEl = document.getElementById(`page-${currentPage}`);
  const inEl  = document.getElementById(`page-${pageId}`);
  if (!inEl) return;

  outEl.classList.remove('visible');
  setTimeout(() => {
    outEl.classList.remove('active');
    inEl.classList.add('active');
    void inEl.offsetWidth; // force reflow for transition
    inEl.classList.add('visible');
    currentPage = pageId;
    setActiveLinks(pageId);
    window.scrollTo({ top: 0, behavior: 'instant' });
    onEnter(pageId);
  }, 280);

  closeDrawer();
}

function setActiveLinks(pageId) {
  document.querySelectorAll('.nl, .dl').forEach(el => {
    el.classList.toggle('active', el.dataset.page === pageId);
  });
}

// ── Click delegation ─────────────────────────────────────────────────────────
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-page]');
  if (t) navigateTo(t.dataset.page);
});

// ── Mobile drawer ────────────────────────────────────────────────────────────
burger.addEventListener('click', () => {
  const isOpen = drawer.classList.toggle('open');
  backdrop.classList.toggle('open', isOpen);
  burger.classList.toggle('open', isOpen);
});
backdrop.addEventListener('click', closeDrawer);

function closeDrawer() {
  drawer.classList.remove('open');
  backdrop.classList.remove('open');
  burger.classList.remove('open');
}

// ── Intersection Observer (scroll reveals) ───────────────────────────────────
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    io.unobserve(entry.target);
  });
}, { threshold: 0.08 });

function observeReveals() {
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('visible');
    io.observe(el);
  });
}

// ── Typewriter ───────────────────────────────────────────────────────────────
const TW = [
  'AI That Thinks\nBefore It Answers.',
  'Intent-Driven\nEngineering.',
  'Glass-Box\nReasoning.',
  'Judgment Over\nFaster Answers.',
];
let twLine = 0, twChar = 0, twDir = 'typing', twTimer = null;

function runTw() {
  const el = document.getElementById('tw');
  if (!el) return;
  const line = TW[twLine];

  if (twDir === 'typing') {
    el.innerHTML = line.slice(0, ++twChar).replace('\n', '<br>');
    if (twChar >= line.length) { twDir = 'pause'; schedTw(2400); return; }
    schedTw(55);
  } else if (twDir === 'pause') {
    twDir = 'erasing'; schedTw(60);
  } else {
    el.innerHTML = line.slice(0, --twChar).replace('\n', '<br>');
    if (twChar <= 0) {
      twLine = (twLine + 1) % TW.length;
      twDir = 'typing'; schedTw(380); return;
    }
    schedTw(28);
  }
}
function schedTw(ms) { clearTimeout(twTimer); twTimer = setTimeout(runTw, ms); }
function startTw() {
  clearTimeout(twTimer);
  twChar = 0; twDir = 'typing'; twLine = 0;
  const el = document.getElementById('tw');
  if (el) el.textContent = '';
  schedTw(600);
}

// ── Per-page init ─────────────────────────────────────────────────────────────
function onEnter(pageId) {
  observeReveals();
  if (pageId === 'home') startTw();
}

// ── Boot ─────────────────────────────────────────────────────────────────────
(function boot() {
  const homeEl = document.getElementById('page-home');
  homeEl.classList.add('active');
  void homeEl.offsetWidth;
  homeEl.classList.add('visible');
  setActiveLinks('home');
  onEnter('home');
})();
