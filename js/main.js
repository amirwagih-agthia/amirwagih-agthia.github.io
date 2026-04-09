/* =========================================================
   Al Faysal — main.js
   Handles: language toggle, announcement bar, mobile nav,
            active nav link
   ========================================================= */

(function () {
  'use strict';

  /* ── Language ─────────────────────────────────────────── */
  const LANG_KEY = 'af_lang';
  let currentLang = localStorage.getItem(LANG_KEY) || 'en';

  function applyLang(lang) {
    currentLang = lang;
    const html = document.documentElement;
    html.lang = lang;
    html.dir  = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-en]').forEach(el => {
      const text = lang === 'ar' ? el.dataset.ar : el.dataset.en;
      if (text !== undefined) {
        // Handle placeholder vs. attribute-only elements
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Update toggle button label
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = lang === 'ar' ? 'EN' : 'AR';
      btn.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    });

    localStorage.setItem(LANG_KEY, lang);
  }

  function initLang() {
    // Wire up all toggle buttons
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        applyLang(currentLang === 'en' ? 'ar' : 'en');
      });
    });
    applyLang(currentLang);
  }

  /* ── Announcement Bar ────────────────────────────────── */
  function initAnnouncementBar() {
    const bar = document.querySelector('.announcement-bar');
    if (!bar) return;

    // If dismissed in this session, hide immediately
    if (sessionStorage.getItem('af_bar_dismissed') === '1') {
      bar.style.display = 'none';
      return;
    }

    const closeBtn = bar.querySelector('.announcement-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        bar.style.maxHeight = bar.scrollHeight + 'px';
        bar.style.overflow  = 'hidden';
        bar.style.transition = 'max-height 0.4s ease, opacity 0.4s ease';
        requestAnimationFrame(() => {
          bar.style.maxHeight = '0';
          bar.style.opacity   = '0';
        });
        bar.addEventListener('transitionend', () => {
          bar.style.display = 'none';
        }, { once: true });
        sessionStorage.setItem('af_bar_dismissed', '1');
      });
    }

    // Cycling messages
    const messages = bar.querySelectorAll('.announcement-msg');
    if (messages.length > 1) {
      let idx = 0;
      messages.forEach((m, i) => m.classList.toggle('active', i === 0));
      setInterval(() => {
        messages[idx].classList.remove('active');
        idx = (idx + 1) % messages.length;
        messages[idx].classList.add('active');
      }, 4000);
    }
  }

  /* ── Mobile Nav ──────────────────────────────────────── */
  function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const drawer    = document.querySelector('.mobile-drawer');
    const overlay   = document.querySelector('.drawer-overlay');

    if (!hamburger || !drawer) return;

    function openDrawer() {
      drawer.classList.add('open');
      if (overlay) overlay.classList.add('show');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      isOpen ? closeDrawer() : openDrawer();
    });

    if (overlay) overlay.addEventListener('click', closeDrawer);

    // Close on nav link click
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

    // Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  /* ── Active Nav Link ─────────────────────────────────── */
  function initActiveNav() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkFile = href.split('/').pop();
      const isHome = (filename === '' || filename === 'index.html') &&
                     (linkFile === '' || linkFile === 'index.html');
      if (isHome || (linkFile && linkFile === filename)) {
        link.classList.add('active');
      }
    });
  }

  /* ── Sticky Nav Shadow ───────────────────────────────── */
  function initNavScroll() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ── Init ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    initAnnouncementBar();
    initMobileNav();
    initActiveNav();
    initNavScroll();
  });

})();
