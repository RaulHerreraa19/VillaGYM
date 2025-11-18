// script.js — validación básica del formulario de leads y efectos mínimos
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("leadForm");
  const feedback = form.querySelector(".form-feedback");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    feedback.textContent = "";
    const name = form.name.value.trim();
    const email = form.email.value.trim();

    if (!name) {
      feedback.textContent = "Por favor escribe tu nombre.";
      form.name.focus();
      return;
    }

    if (!validateEmail(email)) {
      feedback.textContent = "Introduce un correo válido.";
      form.email.focus();
      return;
    }

    // Simulación de envío exitoso — aquí conectarías con API o backend
    feedback.textContent =
      "¡Gracias! Pronto te contactaremos para agendar tu prueba.";
    form.reset();
  });

  // Efecto de scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

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
    if (header) {
      // Parallax para el header (más pronunciado)
      header.style.backgroundPosition = `center calc(50% + ${sc * 0.18}px)`;
    }
    if (hero) {
      // Ajuste sutil de posición de fondo para efecto parallax
      hero.style.backgroundPosition = `center calc(50% + ${sc * 0.12}px)`;
    }
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

  show(0);
  start();
})();
