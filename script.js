/* ================================================================
   PORTFOLIO SCRIPT
   ================================================================
   Small, focused, vanilla JS. Each function does one job:

   1. initMobileNav()      — hamburger open/close + auto-close on link tap
   2. initScrollProgress() — fills the top progress bar as you scroll
   3. initBackToTop()      — shows/hides + wires the back-to-top button
   4. initScrollReveal()   — fades/slides .reveal elements into view
   5. initFooterYear()     — writes the current year into the footer

   None of this depends on any external library. Everything checks
   prefers-reduced-motion where relevant so motion-sensitive users
   still get a fully usable page.
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initScrollProgress();
  initBackToTop();
  initScrollReveal();
  initFooterYear();
});

/* Shared check: does the user prefer reduced motion? Read once and
   reused by any function that would otherwise animate something. */
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/* ----------------------------------------------------------------
   1. MOBILE NAVIGATION
   ----------------------------------------------------------------
   Toggles the .is-open class on the menu (CSS handles the actual
   slide/fade via max-height, see style.css section 16). Also
   closes the menu automatically after a link is tapped, and
   keeps the button's aria-expanded state in sync for screen
   readers.
   ---------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  // Close the menu once a nav link is used, so it doesn't stay open
  // covering the section the user just navigated to.
  menu.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape for keyboard users.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}


/* ----------------------------------------------------------------
   2. SCROLL PROGRESS BAR
   ----------------------------------------------------------------
   Calculates how far the user has scrolled through the whole
   document (0–100%) and sets that as the bar's width. Uses
   requestAnimationFrame via a simple "ticking" flag so it never
   runs more than once per frame, even on very fast scroll events.
   ---------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;

  let ticking = false;

  const updateBar = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateBar);
      ticking = true;
    }
  });

  updateBar(); // set the correct value on initial load too
}


/* ----------------------------------------------------------------
   3. BACK-TO-TOP BUTTON
   ----------------------------------------------------------------
   Fades the button in once the user has scrolled past roughly one
   viewport (i.e. past the hero), and scrolls smoothly back to the
   top when clicked.
   ---------------------------------------------------------------- */
function initBackToTop() {
  const button = document.getElementById("backToTop");
  if (!button) return;

  const SHOW_AFTER_PX = window.innerHeight * 0.8;

  const toggleVisibility = () => {
    button.classList.toggle("is-visible", window.scrollY > SHOW_AFTER_PX);
  };

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
}


/* ----------------------------------------------------------------
   4. SCROLL-REVEAL ANIMATION
   ----------------------------------------------------------------
   Uses IntersectionObserver (not scroll-event math) to add
   .is-visible to each .reveal element the first time it enters
   the viewport, matching the CSS fade/slide-up transition defined
   in style.css section 14. Each element is only revealed once —
   we unobserve it right after, since re-hiding content that
   scrolls back offscreen tends to feel gimmicky rather than
   polished.
   ---------------------------------------------------------------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  // If the browser has no IntersectionObserver support (very rare
  // today) or the user prefers reduced motion, just show everything
  // immediately rather than risking content staying hidden.
  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealEls.forEach((el) => observer.observe(el));
}


/* ----------------------------------------------------------------
   5. FOOTER YEAR
   ----------------------------------------------------------------
   Small nicety so the footer's copyright-style line never goes
   stale — it always reflects the visitor's current year.
   ---------------------------------------------------------------- */
function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ================================================================
   FUTURE ADDITIONS — suggested hooks (not implemented yet)
   ================================================================
   - Hero load-in sequence: add a `window.addEventListener("load", ...)`
     that adds a `.is-loaded` class to <body>, then animate
     .hero__name / .hero__photo / .hero__tagline off that class in CSS.
   - Parallax on the decorative .blob shapes using scroll position or
     mousemove (keep it subtle, and skip entirely when
     prefersReducedMotion is true).
   - Animated skill bars: observe .skill-bar elements the same way
     initScrollReveal() does, and set their width from a data-level
     attribute when they enter view.
   - Custom cursor or hover "spotlight" effect for .card / .tile using
     mousemove + CSS custom properties (--x, --y).
   ================================================================ */
