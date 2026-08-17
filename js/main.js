document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initCountdown();
  initCarousel();
  initRsvp();
});

function initNav() {
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".site-nav__toggle");
  const links = document.querySelector(".site-nav__links");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 10);
  });

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => links.classList.remove("is-open"));
  });
}

function initCountdown() {
  const target = new Date(WEDDING_DATE).getTime();
  const els = {
    days: document.querySelector("[data-countdown-days]"),
    hours: document.querySelector("[data-countdown-hours]"),
    minutes: document.querySelector("[data-countdown-minutes]"),
    seconds: document.querySelector("[data-countdown-seconds]"),
  };

  if (!els.days || Number.isNaN(target)) return;

  function tick() {
    const diff = Math.max(0, target - Date.now());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    els.days.textContent = String(days);
    els.hours.textContent = String(hours).padStart(2, "0");
    els.minutes.textContent = String(minutes).padStart(2, "0");
    els.seconds.textContent = String(seconds).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
}

function initCarousel() {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const track = carousel.querySelector("[data-carousel-track]");
  const slides = Array.from(track.children);
  const dotsWrap = carousel.querySelector("[data-carousel-dots]");
  const prevBtn = carousel.querySelector("[data-carousel-prev]");
  const nextBtn = carousel.querySelector("[data-carousel-next]");

  if (slides.length <= 1) {
    carousel.setAttribute("data-single", "");
    return;
  }

  let index = 0;

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.className = "carousel__dot";
    dot.setAttribute("aria-label", `Go to photo ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, di) => dot.classList.toggle("is-active", di === index));
  }

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  let touchStartX = null;
  track.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 40) goTo(index + (delta < 0 ? 1 : -1));
    touchStartX = null;
  });

  goTo(0);
}

function initRsvp() {
  const frameWrap = document.querySelector("[data-rsvp-frame-wrap]");
  const fallback = document.querySelector("[data-rsvp-fallback]");

  if (RSVP_EMBED_URL) {
    const iframe = document.createElement("iframe");
    iframe.src = RSVP_EMBED_URL;
    iframe.title = "RSVP form";
    frameWrap.appendChild(iframe);
    frameWrap.hidden = false;
  } else {
    fallback.hidden = false;
    const linkBtn = fallback.querySelector("[data-rsvp-link]");
    const emailLine = fallback.querySelector("[data-rsvp-email-line]");
    const emailLink = fallback.querySelector("[data-rsvp-email]");

    if (RSVP_LINK_URL) {
      linkBtn.href = RSVP_LINK_URL;
    } else {
      linkBtn.hidden = true;
    }

    if (CONTACT_EMAIL) {
      emailLink.href = `mailto:${CONTACT_EMAIL}`;
      emailLink.textContent = CONTACT_EMAIL;
    } else {
      emailLine.hidden = true;
    }
  }
}
