/**
 * TeamBrain Demo — SPA Router + Animations
 * Vanilla JS, no dependencies.
 */

// ── State ──────────────────────────────────────────────────────────────────
let currentPage = 'home';

// ── DOM ───────────────────────────────────────────────────────────────────
const hamburger      = document.getElementById('hamburger');
const drawer         = document.getElementById('drawer');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const footer         = document.getElementById('footer');

// ── Router ─────────────────────────────────────────────────────────────────
function navigateTo(pageId) {
  if (pageId === currentPage) { closeDrawer(); return; }

  const outEl = document.getElementById(`page-${currentPage}`);
  const inEl  = document.getElementById(`page-${pageId}`);
  if (!inEl) return;

  outEl.classList.remove('page-visible');

  setTimeout(() => {
    outEl.classList.remove('page-active');
    inEl.classList.add('page-active');
    void inEl.offsetWidth; // force reflow
    inEl.classList.add('page-visible');

    currentPage = pageId;
    updateNavLinks(pageId);
    window.scrollTo({ top: 0, behavior: 'instant' });
    onPageEnter(pageId);
  }, 280);

  closeDrawer();
}

function updateNavLinks(pageId) {
  document.querySelectorAll('.nav-link, .drawer-link').forEach(el => {
    el.classList.toggle('active', el.dataset.page === pageId);
  });
}

// ── Click delegation ───────────────────────────────────────────────────────
document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-page]');
  if (target) navigateTo(target.dataset.page);
});

// ── Mobile drawer ──────────────────────────────────────────────────────────
hamburger.addEventListener('click', () => {
  const isOpen = drawer.classList.toggle('open');
  drawerBackdrop.classList.toggle('open', isOpen);
  hamburger.classList.toggle('open', isOpen);
});
drawerBackdrop.addEventListener('click', closeDrawer);

function closeDrawer() {
  drawer.classList.remove('open');
  drawerBackdrop.classList.remove('open');
  hamburger.classList.remove('open');
}

// ── Intersection Observer (reveal + bar animations) ────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    if (entry.target.classList.contains('p-card')) {
      entry.target.classList.add('bar-animated');
    }
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });

function observeReveals() {
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('visible');
    revealObserver.observe(el);
  });
}

// ── Typewriter ─────────────────────────────────────────────────────────────
const TW_LINES = [
  'Intent-Driven\nEngineering.',
  'Reasoning\nBefore Solutions.',
  'Judgment Over\nFaster Answers.',
  'Glass-Box\nThinking.',
];
let twLine = 0, twChar = 0, twDir = 'typing', twTimer = null;

function runTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const line = TW_LINES[twLine];

  if (twDir === 'typing') {
    el.innerHTML = line.slice(0, ++twChar).replace('\n', '<br>');
    if (twChar >= line.length) { twDir = 'pausing'; schedTw(2200); return; }
    schedTw(55);
  } else if (twDir === 'pausing') {
    twDir = 'erasing'; schedTw(60);
  } else {
    el.innerHTML = line.slice(0, --twChar).replace('\n', '<br>');
    if (twChar <= 0) {
      twLine = (twLine + 1) % TW_LINES.length;
      twDir = 'typing'; schedTw(380); return;
    }
    schedTw(28);
  }
}
function schedTw(ms) { clearTimeout(twTimer); twTimer = setTimeout(runTypewriter, ms); }
function startTypewriter() {
  clearTimeout(twTimer);
  twChar = 0; twDir = 'typing'; twLine = 0;
  const el = document.getElementById('typewriter');
  if (el) el.textContent = '';
  schedTw(500);
}

// ── Counter animation ──────────────────────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    if (target === 0) { el.textContent = '0'; return; }
    const start = performance.now();
    const dur   = 1300;
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// ── Get Started checklist interactivity ────────────────────────────────────
function initChecklist() {
  document.querySelectorAll('.gs-check input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      cb.closest('.gs-check').style.opacity = cb.checked ? '.6' : '1';
    });
  });
}

// ── Contact form validation ────────────────────────────────────────────────
function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const email   = document.getElementById('contactEmail');
    const message = document.getElementById('contactMessage');
    const errEmail   = document.getElementById('errEmail');
    const errMessage = document.getElementById('errMessage');

    // Reset
    [email, message].forEach(el => el.classList.remove('input-error'));
    errEmail.textContent = ''; errMessage.textContent = '';

    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('input-error');
      errEmail.textContent = 'Please enter a valid email address.';
      valid = false;
    }
    if (!message.value.trim() || message.value.trim().length < 20) {
      message.classList.add('input-error');
      errMessage.textContent = 'Message must be at least 20 characters.';
      valid = false;
    }

    if (!valid) return;

    const submitBtn = form.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    // Simulate submission (no real backend)
    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('visible');
    }, 1200);
  });
}

// ── Template tab switcher ──────────────────────────────────────────────────
function initTemplateTabs() {
  const tabs   = document.querySelectorAll('.tmpl-tab');
  const panels = document.querySelectorAll('.tmpl-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tmpl;
      tabs.forEach(t   => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(`tmpl-${target}`);
      if (panel) panel.classList.add('active');
    });
  });
}

// ── Per-page init ──────────────────────────────────────────────────────────
function onPageEnter(pageId) {
  observeReveals();
  if (pageId === 'home') {
    startTypewriter();
    setTimeout(animateCounters, 350);
  }
  if (pageId === 'getstarted') {
    initChecklist();
  }
  if (pageId === 'contact') {
    initContactForm();
  }
  if (pageId === 'templates') {
    initTemplateTabs();
  }
}

// ── Boot ───────────────────────────────────────────────────────────────────
function boot() {
  const homeEl = document.getElementById('page-home');
  homeEl.classList.add('page-active');
  void homeEl.offsetWidth;
  homeEl.classList.add('page-visible');
  updateNavLinks('home');
  onPageEnter('home');
}

boot();
