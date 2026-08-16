/* ================================================================
   PORTFOLIO SCRIPT (WORLD 1 & 2 + ANIMATED CANVAS + TYPEWRITERS)
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initScrollProgress();
  initBackToTop();
  initScrollReveal();
  initFooterYear();
  initWorld1Canvas();
  initMatrixCanvas();
  initTerminalTypewriter();
  initHeadingTypewriter();
});

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/* ----------------------------------------------------------------
   1. MOBILE NAVIGATION
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

  menu.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}


/* ----------------------------------------------------------------
   2. SCROLL PROGRESS BAR
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

  updateBar();
}


/* ----------------------------------------------------------------
   3. BACK-TO-TOP BUTTON
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
   ---------------------------------------------------------------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

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
   ---------------------------------------------------------------- */
function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}


/* ----------------------------------------------------------------
   6. WORLD 1 BACKGROUND ANIMATION (Peach, Flowers, Soft Particles)
   ---------------------------------------------------------------- */
/* function initWorld1Canvas() {
  const canvas = document.getElementById("world1Canvas");
  if (!canvas || prefersReducedMotion) return;
  const ctx = canvas.getContext("2d");

  let width, height;
  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();

  // Floating symbols/particles
  const symbols = [ "🍓", "🌸", "✨", "🌷"];
  const particles = Array.from({ length: 22 }, () => ({
    x: Math.random() * width,
    y: Math.random() * (height * 0.55), // only in World 1 / transition area
    size: Math.random() * 14 + 10,
    speedY: (Math.random() * 0.4 + 0.2) * 0.8,
    speedX: (Math.random() - 0.5) * 0.3,
    char: symbols[Math.floor(Math.random() * symbols.length)],
    opacity: Math.random() * 0.35 + 0.15
  }));

  const animate = () => {
    ctx.clearRect(0, 0, width, height);

    if (window.scrollY < height * 0.7) { // only animate when near top
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < -50) p.y = height * 0.6;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px serif`;
        ctx.fillText(p.char, p.x, p.y);
      });
    }
    requestAnimationFrame(animate);
  };
  animate();
}*/


/* ----------------------------------------------------------------
   7. WORLD 2 MATRIX BACKGROUND ANIMATION
   ---------------------------------------------------------------- */
/*function initMatrixCanvas() {
  const canvas = document.getElementById("matrixCanvas");
  if (!canvas || prefersReducedMotion) return;
  const ctx = canvas.getContext("2d");

  let width, height;
  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();

  const chars = "01010101XYZ#<>[]{}SYS_ROOT_LV";
  const fontSize = 14;
  let columns = Math.floor(width / fontSize);
  let drops = Array(columns).fill(1);

  const draw = () => {
    ctx.fillStyle = "rgba(13, 17, 23, 0.15)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#00ff66";
    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  };

  setInterval(draw, 40);
}*/

/* ----------------------------------------------------------------
   6. WORLD 1 BACKGROUND ANIMATION (Peach, Flowers, Soft Particles)
   ---------------------------------------------------------------- */
function initWorld1Canvas() {
  const canvas = document.getElementById("world1Canvas");
  if (!canvas || prefersReducedMotion) return;
  const ctx = canvas.getContext("2d");

  let width, height;
  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();

  const symbols = [ "🍓", "🌸", "✨", "🌷"];
  const particles = Array.from({ length: 20 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 14 + 10,
    speedY: (Math.random() * 0.4 + 0.2) * 0.8,
    speedX: (Math.random() - 0.5) * 0.3,
    char: symbols[Math.floor(Math.random() * symbols.length)],
    opacity: Math.random() * 0.35 + 0.15
  }));

  const animate = () => {
    ctx.clearRect(0, 0, width, height);

    // Only draw World 1 animation while user is in World 1 / Transition
    const terminalBreak = document.getElementById("terminal-break");
    const breakTop = terminalBreak ? terminalBreak.offsetTop : height * 1.5;

    if (window.scrollY < breakTop + 200) {
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < -50) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px serif`;
        ctx.fillText(p.char, p.x, p.y);
      });
    }
    requestAnimationFrame(animate);
  };
  animate();
}


/* ----------------------------------------------------------------
   7. WORLD 2 MATRIX BACKGROUND ANIMATION
   ---------------------------------------------------------------- */
function initMatrixCanvas() {
  const canvas = document.getElementById("matrixCanvas");
  if (!canvas || prefersReducedMotion) return;
  const ctx = canvas.getContext("2d");

  let width, height;
  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();

  const chars = "01010101XYZ#<>[]{}SYS_ROOT_LV";
  const fontSize = 14;
  let columns = Math.floor(width / fontSize);
  let drops = Array(columns).fill(1);

  const draw = () => {
    ctx.fillStyle = "rgba(13, 17, 23, 0.2)";
    ctx.fillRect(0, 0, width, height);

    // Only run matrix rain when user scrolls down to World 2
    const terminalBreak = document.getElementById("terminal-break");
    const breakTop = terminalBreak ? terminalBreak.offsetTop : height;

    if (window.scrollY >= breakTop - 100) {
      ctx.fillStyle = "#00ff66";
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
  };

  setInterval(draw, 40);
}


/* ----------------------------------------------------------------
   8. TERMINAL TYPEWRITER EFFECT
   ---------------------------------------------------------------- */
function initTerminalTypewriter() {
  const container = document.getElementById("typewriterTerminal");
  if (!container || prefersReducedMotion) return;

  const lines = [
    "> SYSTEM_SWITCH: EXECUTING...",
    "> UNLOCKING KERNEL MODE...",
    "> WELCOME TO WORLD_02"
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let started = false;

  const typeLine = () => {
    if (lineIdx >= lines.length) return;

    if (charIdx === 0) {
      const p = document.createElement("p");
      p.className = "terminal__line";
      if (lineIdx === lines.length - 1) {
        p.classList.add("terminal__line--highlight");
      }
      container.appendChild(p);
    }

    const currentP = container.lastElementChild;
    const currentText = lines[lineIdx];

    if (charIdx < currentText.length) {
      currentP.textContent += currentText.charAt(charIdx);
      charIdx++;
      setTimeout(typeLine, 35);
    } else {
      if (lineIdx === lines.length - 1) {
        const cursor = document.createElement("span");
        cursor.className = "terminal__cursor";
        cursor.textContent = "_";
        currentP.appendChild(cursor);
      }
      lineIdx++;
      charIdx = 0;
      setTimeout(typeLine, 300);
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        setTimeout(typeLine, 200);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(container);
}


/* ----------------------------------------------------------------
   9. SECTION HEADINGS TYPEWRITER EFFECT
   ---------------------------------------------------------------- */
function initHeadingTypewriter() {
  const headings = document.querySelectorAll(".type-heading");
  if (!headings.length || prefersReducedMotion) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const h = entry.target;
        const text = h.getAttribute("data-text");
        h.textContent = "";
        let i = 0;

        const type = () => {
          if (i < text.length) {
            h.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
          } else {
            // add subtle terminal cursor
            const cursor = document.createElement("span");
            cursor.className = "terminal__cursor";
            cursor.textContent = "_";
            h.appendChild(cursor);
          }
        };
        type();
        obs.unobserve(h);
      }
    });
  }, { threshold: 0.3 });

  headings.forEach(h => observer.observe(h));
}

const glow = document.getElementById("cursorGlow");
window.addEventListener("mousemove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});
window.addEventListener("scroll", () => {
  const breakEl = document.getElementById("terminal-break");
  if (window.scrollY >= breakEl.offsetTop - 200) {
    document.body.classList.add("in-world-two");
  } else {
    document.body.classList.remove("in-world-two");
  }
});
