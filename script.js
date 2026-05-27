/* ============================================================
   add sugar — script.js
   ============================================================ */

/* ── Hero image: ズームイン演出 ── */
(function () {
  const heroImg = document.getElementById('heroImg');
  if (!heroImg) return;

  function onLoad() {
    heroImg.classList.add('loaded');
  }

  if (heroImg.complete && heroImg.naturalWidth > 0) {
    onLoad();
  } else {
    heroImg.addEventListener('load', onLoad);
  }
})();


/* ── Header: スクロールで背景付与 ── */
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 初期状態チェック
})();


/* ── Mobile nav: ハンバーガー開閉 ── */
(function () {
  const toggle   = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function () {
    const isOpen = mobileNav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  });

  // リンククリックで閉じる
  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-label', 'メニューを開く');
    });
  });
})();


/* ── Reveal on scroll: フェードイン ── */
(function () {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // 兄弟要素をグループ化してstagger（段差）をつける
  function getStaggerDelay(el) {
    const parent = el.parentElement;
    if (!parent) return 0;
    const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
    const index = siblings.indexOf(el);
    return index >= 0 ? index * 110 : 0;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const delay = getStaggerDelay(entry.target);
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -32px 0px',
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ── Smooth scroll: ナビリンク ── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.getElementById('site-header')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
