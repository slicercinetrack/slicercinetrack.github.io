(function () {
  var header = document.querySelector('header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    var page = location.pathname.replace(/\/+$/, '').split('/').pop();
    var current = (page || 'index.html').replace(/\.html$/i, '').toLowerCase();
    navLinks.querySelectorAll('a.button.left').forEach(function (a) {
      var href = a.getAttribute('href').replace(/\.html$/i, '').toLowerCase();
      if (href === current) a.classList.add('is-active');
    });
  }

  var navToggle = document.querySelector('.nav-toggle');
  if (navToggle && navLinks) {
    var closeNav = function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    };
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });
    document.addEventListener('click', function (e) {
      if (!navLinks.classList.contains('open')) return;
      if (navLinks.contains(e.target) || navToggle.contains(e.target)) return;
      closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var targets = document.querySelectorAll(
    '.pillars > div, .grid-2 > .card, .grid-3 > .card, .grid-4 > .card, .step, .cta-banner, .doc-shot, .team-grid > .card, .links-grid a'
  );

  if (!('IntersectionObserver' in window) || !targets.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 6) * 60 + 'ms';
    observer.observe(el);
  });
})();
