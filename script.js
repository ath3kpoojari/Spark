/* ═══════════════════════════════════════════════
   ATHRIPRIYA K POOJARI — Portfolio JS
   Pure Vanilla JavaScript — No dependencies
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. STICKY NAV — add .scrolled class on scroll ── */
  const navbar = document.getElementById('navbar');
  function handleNavScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ── 2. HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  /* ── 3. ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function setActiveLink() {
    let current = '';
    const scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      if (scrollY >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(function (anchor) {
      anchor.classList.remove('active');
      if (anchor.getAttribute('href') === '#' + current) {
        anchor.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ── 4. SCROLL REVEAL (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Stagger children within the same parent container
            const siblings = Array.from(
              entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
            );
            const idx = siblings.indexOf(entry.target);
            const delay = Math.min(idx * 80, 400);
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, delay);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all immediately
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── 5. BACK TO TOP BUTTON ── */
  const backToTop = document.getElementById('backToTop');

  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTop, { passive: true });
  handleBackToTop();

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── 6. CONTACT FORM SUBMISSION ── */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = contactForm.querySelector('#name').value.trim();
      const email   = contactForm.querySelector('#email').value.trim();
      const message = contactForm.querySelector('#message').value.trim();

      if (!name || !email || !message) return;

      // Simulate sending (replace with a real form service like Formspree if needed)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(function () {
        formSuccess.classList.add('show');
        contactForm.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;

        // Hide success message after 6 seconds
        setTimeout(function () {
          formSuccess.classList.remove('show');
        }, 6000);
      }, 1200);
    });
  }

  /* ── 7. EXPANDABLE ACHIEVEMENT/CERT CARDS (keyboard & click) ── */
  // Achievement and cert cards support click-to-highlight
  const cards = document.querySelectorAll(
    '.achievement-card, .cert-card, .project-card, .stat-card'
  );

  cards.forEach(function (card) {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    function toggleHighlight() {
      const isActive = card.classList.contains('highlighted');
      // Remove highlight from all
      cards.forEach(function (c) { c.classList.remove('highlighted'); });
      if (!isActive) card.classList.add('highlighted');
    }

    card.addEventListener('click', toggleHighlight);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleHighlight();
      }
    });
  });

  /* ── 8. SMOOTH HASH LINK SCROLLING (offset for sticky nav) ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 24;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── 9. SKILL TAG HOVER RIPPLE (subtle micro-interaction) ── */
  document.querySelectorAll('.skill-tag').forEach(function (tag) {
    tag.addEventListener('mouseenter', function () {
      tag.style.transition = 'background 0.18s, color 0.18s, border-color 0.18s, transform 0.18s';
      tag.style.transform = 'scale(1.05)';
    });
    tag.addEventListener('mouseleave', function () {
      tag.style.transform = '';
    });
  });

  /* ── 10. DYNAMIC YEAR IN FOOTER (future-proof) ── */
  const yearEls = document.querySelectorAll('.footer-year');
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

})();
