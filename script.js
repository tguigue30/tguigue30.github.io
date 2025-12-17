// Smooth scroll + active link + small UI effects

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = [...document.querySelectorAll("main section")];
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const themeToggle = document.querySelector(".theme-toggle");
  const yearSpan = document.getElementById("year");
  const fadeElements = document.querySelectorAll(".fade-in");

  // Current year in footer
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Smooth scroll for internal links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // Close mobile nav
        siteNav.classList.remove("open");
      }
    });
  });

  // Highlight active nav link on scroll
  const setActiveLinkOnScroll = () => {
    const scrollPos = window.scrollY + 120;
    let currentId = "hero";

    sections.forEach((section) => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      link.classList.toggle("active", href === `#${currentId}`);
    });
  };

  window.addEventListener("scroll", setActiveLinkOnScroll);
  setActiveLinkOnScroll();

  // Header shadow on scroll
  const onScrollHeader = () => {
    if (window.scrollY > 16) {
      header.style.boxShadow = "0 14px 30px rgba(15, 23, 42, 0.7)";
    } else {
      header.style.boxShadow = "none";
    }
  };

  window.addEventListener("scroll", onScrollHeader);
  onScrollHeader();

  // Mobile nav toggle
  navToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
  });

  // Theme toggle (light / dark) with localStorage
  const root = document.body;
  const THEME_KEY = "site-theme";

  const applyTheme = (theme) => {
    if (theme === "light") {
      root.classList.add("light-theme");
    } else {
      root.classList.remove("light-theme");
    }
  };

  // Load cached theme or system preference
  const storedTheme = window.localStorage.getItem(THEME_KEY);
  if (storedTheme) {
    applyTheme(storedTheme);
  } else {
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    applyTheme(prefersLight ? "light" : "dark");
  }

  themeToggle.addEventListener("click", () => {
    const isLight = root.classList.contains("light-theme");
    const newTheme = isLight ? "dark" : "light";
    applyTheme(newTheme);
    window.localStorage.setItem(THEME_KEY, newTheme);
  });

  // Reveal on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function () {
      alert("Thank you! Your message has been sent.");
      // Ne pas appeler preventDefault() ici pour laisser Formspree traiter la soumission
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Copy buttons
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const targetId = btn.getAttribute("data-copy-target");
      const codeEl = document.getElementById(targetId);
      if (!codeEl) return showToast("Bloc introuvable.");

      const text = codeEl.innerText;

      try {
        await navigator.clipboard.writeText(text);
        pulseCopied(btn);
        showToast("Copié");
      } catch {
        // fallback
        if (fallbackCopy(text)) {
          pulseCopied(btn);
          showToast("Copié");
        } else {
          showToast("Copie impossible.");
        }
      }
    });
  });

  // (Optionnel) mobile nav toggle si ton site l'utilise déjà
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => siteNav.classList.toggle("open"));
  }

  // (Optionnel) theme toggle si ton site l'utilise déjà
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
    });
  }
});

function fallbackCopy(text) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function pulseCopied(btn) {
  const original = btn.textContent;
  btn.textContent = "Copié";
  btn.classList.add("copy-btn--ok");
  setTimeout(() => {
    btn.textContent = original;
    btn.classList.remove("copy-btn--ok");
  }, 900);
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("toast--show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("toast--show"), 1400);
}

(() => {
  // ====== NAV (mobile) ======
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      siteNav.classList.toggle("open");
      navToggle.classList.toggle("open");
    });
  }

  // ====== THEME TOGGLE ======
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  // Optionnel : mémoriser le thème
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // ====== TOAST ======
  const toastEl = document.getElementById("toast");
  let toastTimer = null;

  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1800);
  }

  // ====== COPY BUTTONS ======
  async function copyText(text) {
    // navigator.clipboard nécessite HTTPS (ok sur GitHub Pages)
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // fallback
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        return true;
      } catch (err) {
        return false;
      }
    }
  }

  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".copy-btn");
    if (!btn) return;

    const targetId = btn.getAttribute("data-copy-target");
    if (!targetId) return;

    const code = document.getElementById(targetId);
    if (!code) {
      toast("Bloc introuvable");
      return;
    }

    const text = code.innerText.trim();
    const ok = await copyText(text);

    if (ok) toast("Copié ✓");
    else toast("Impossible de copier");
  });
})();
