// script.js — validación básica del formulario de leads y efectos mínimos
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for internal anchors (works without form)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Mobile nav toggle (safe guards)
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    // Close nav when a link is clicked
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (mainNav.classList.contains("open")) {
          mainNav.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Form handling (only if form exists)
  const form = document.getElementById("leadForm");
  if (form) {
    const feedback = form.querySelector(".form-feedback") || document.createElement("p");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (feedback) feedback.textContent = "";
      const name = (form.name && form.name.value) ? form.name.value.trim() : "";
      const email = (form.email && form.email.value) ? form.email.value.trim() : "";

      if (!name) {
        if (feedback) feedback.textContent = "Por favor escribe tu nombre.";
        if (form.name) form.name.focus();
        return;
      }

      if (!validateEmail(email)) {
        if (feedback) feedback.textContent = "Introduce un correo válido.";
        if (form.email) form.email.focus();
        return;
      }

      // Simulación de envío exitoso — aquí conectarías con API o backend
      if (feedback) feedback.textContent = "¡Gracias! Pronto te contactaremos para agendar tu prueba.";
      form.reset();
    });
  }

  function validateEmail(email) {
    // RegEx simple, suficiente para validación básica en front
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

// Parallax y efectos dinámicos (fuera del DOMContentLoaded handler para que funcionen rápido)
(function () {
  const hero = document.querySelector(".hero");
  const mock = document.querySelector(".hero-logo");
  const header = document.querySelector(".site-header");

  function onScroll() {
    const sc = window.scrollY;
    // No ajustar posición del fondo (header/hero) — imagen del header es estática.
    // Mantener solo transform sobre la imagen/logo para dar sensación de profundidad.
    if (mock) {
      // Desplazamiento sutil de la imagen/mock para dar profundidad
      mock.style.transform = `translateY(${sc * 0.06}px)`;
    }
  }

  // Reveal con IntersectionObserver para secciones (entrenadores, cards)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  window.addEventListener("scroll", onScroll, { passive: true });
  // Ejecutar una vez para posicion inicial
  onScroll();
})();

// Carrusel simple para la sección de ubicación
(function () {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;
  const slides = Array.from(carousel.querySelectorAll(".slide"));
  const dots = Array.from(carousel.querySelectorAll(".dot"));
  const prevBtn = carousel.querySelector(".carousel-control.prev");
  const nextBtn = carousel.querySelector(".carousel-control.next");
  let idx = 0;
  let interval = null;

  function show(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, sn) => {
      s.style.opacity = sn === idx ? "1" : "0";
      s.style.zIndex = sn === idx ? "2" : "1";
    });
    dots.forEach((d, di) => d.classList.toggle("active", di === idx));
  }

  function next() {
    show(idx + 1);
  }
  function prev() {
    show(idx - 1);
  }

  // Autoplay
  function start() {
    stop();
    interval = setInterval(next, 4500);
  }
  function stop() {
    if (interval) clearInterval(interval);
    interval = null;
  }

  // Events
  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      next();
      start();
    });
  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      prev();
      start();
    });
  dots.forEach((d) =>
    d.addEventListener("click", (e) => {
      const i = Number(d.dataset.index);
      show(i);
      start();
    })
  );

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("mouseleave", start);

  // Swipe support for touch devices
  let touchStartX = null;
  carousel.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches && e.touches.length === 1)
        touchStartX = e.touches[0].clientX;
      stop();
    },
    { passive: true }
  );
  carousel.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const touchEndX =
      e.changedTouches && e.changedTouches[0]
        ? e.changedTouches[0].clientX
        : null;
    if (touchEndX === null) return;
    const diff = touchStartX - touchEndX;
    const threshold = 40; // px
    if (diff > threshold) {
      next();
    } else if (diff < -threshold) {
      prev();
    }
    touchStartX = null;
    start();
  });

  show(0);
  start();
})();
