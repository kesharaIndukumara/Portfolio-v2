/* =================================================================
   Keshara Indukumara — Portfolio
   Vanilla JS. No framework, no build step.
   Handles: mobile menu, sticky-header state, active-link highlight,
   reveal-on-scroll, and the footer year.
   ================================================================= */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* ---------- Footer year ---------- */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    /* ---------- Mobile menu ---------- */
    var menuToggle = document.getElementById("menuToggle");
    var mobileMenu = document.getElementById("mobileMenu");
    var menuIcon = document.getElementById("menuIcon");

    var iconMenu =
      '<line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
    var iconClose =
      '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';

    function setMenu(open) {
      if (!mobileMenu || !menuToggle) return;
      mobileMenu.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
      menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (menuIcon) menuIcon.innerHTML = open ? iconClose : iconMenu;
    }

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", function () {
        setMenu(!mobileMenu.classList.contains("is-open"));
      });
      // Close after picking a destination
      mobileMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          setMenu(false);
        });
      });
      // Close on Escape
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setMenu(false);
      });
      // Reset when resizing up to desktop
      window.addEventListener("resize", function () {
        if (window.innerWidth >= 768) setMenu(false);
      });
    }

    /* ---------- Sticky header background on scroll ---------- */
    var header = document.getElementById("siteHeader");
    function onScroll() {
      if (!header) return;
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- Reveal-on-scroll ---------- */
    var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    var prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
      );
      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }

    /* ---------- Active nav link while scrolling ---------- */
    var sections = Array.prototype.slice.call(
      document.querySelectorAll("main section[id]")
    );
    var navLinks = Array.prototype.slice.call(
      document.querySelectorAll('.site-header nav a[href^="#"]')
    );

    function linkFor(id) {
      return navLinks.filter(function (a) {
        return a.getAttribute("href") === "#" + id;
      });
    }

    if (sections.length && navLinks.length && "IntersectionObserver" in window) {
      var spyObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            navLinks.forEach(function (a) {
              a.classList.remove("is-active");
              a.removeAttribute("aria-current");
            });
            linkFor(entry.target.id).forEach(function (a) {
              a.classList.add("is-active");
              a.setAttribute("aria-current", "true");
            });
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach(function (section) {
        spyObserver.observe(section);
      });
    }
  });
})();
