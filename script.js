/* =========================================================
   CityBuddy — Project Website
   Mobile menu, active-link highlighting, gentle scroll reveal.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Mobile hamburger menu ---------- */
  var hamburger = document.getElementById("hamburgerBtn");
  var nav = document.getElementById("mainNav");

  function closeMenu() {
    nav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open menu");
  }

  function openMenu() {
    nav.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close menu");
  }

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      var isOpen = nav.classList.contains("open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close the mobile menu after a link is tapped
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    // Close if the viewport grows back to desktop size
    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  /* ---------- Active nav link while scrolling ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = "#" + entry.target.id;
          var link = navLinks.filter(function (l) {
            return l.getAttribute("href") === id;
          })[0];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) {
              l.classList.remove("active");
            });
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  /* ---------- Gentle scroll-reveal ---------- */
  var revealSelectors = [
    ".vmo-card",
    ".team-card",
    ".info-card",
    ".feature-card",
    ".ai-card",
    ".uiux-card",
    ".doc-stage",
    ".compare-card",
    ".pipeline-node",
    ".dt-node",
    ".flow-node",
    ".timeline-node",
    ".gallery-item",
    ".media-block",
    ".problem-statement"
  ];

  var revealEls = document.querySelectorAll(revealSelectors.join(","));
  revealEls.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: no IntersectionObserver support — just show everything
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
