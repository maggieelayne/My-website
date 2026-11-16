/* =========================================================
   Elayne Ink — site interactions
   ========================================================= */

/* ---- EDIT THESE ---- */
const BOOKING_EMAIL = "your-email@example.com";            // where booking requests go
const INSTAGRAM_URL = "https://instagram.com/elayneink";   // your Instagram link

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Fine line art library (SVG path data, 100×100) ---------- */
const ART = {
  brow:    ["M8 62 C 26 40, 58 30, 92 44", "M14 60 C 30 46, 56 38, 86 46", "M20 70 Q 50 66 80 70"],
  lips:    ["M8 50 C 22 32, 38 30, 50 40 C 62 30, 78 32, 92 50 C 76 72, 24 72, 8 50 Z", "M8 50 C 32 54, 68 54, 92 50"],
  eye:     ["M8 52 Q 50 18 92 52 Q 50 78 8 52 Z", "M90 51 L 99 42", "M50 52 m -13 0 a 13 13 0 1 0 26 0 a 13 13 0 1 0 -26 0", "M24 34 L 20 26 M 38 26 L 36 17 M 52 24 L 52 14 M 66 26 L 69 17 M 79 33 L 84 26"],
  stem:    ["M50 96 C 47 70, 53 48, 50 22", "M50 72 C 36 68, 30 58, 32 50 C 42 53, 48 60, 50 72", "M50 56 C 64 51, 70 41, 68 34 C 58 38, 52 46, 50 56", "M50 22 C 42 17, 42 7, 50 3 C 58 7, 58 17, 50 22"],
  moon:    ["M60 14 A 36 36 0 1 0 60 86 A 29 29 0 1 1 60 14 Z", "M80 24 L 82 30 88 32 82 34 80 40 78 34 72 32 78 30 Z", "M86 60 l 0 0.1"],
  sparkle: ["M50 12 L 54 46 88 50 54 54 50 88 46 54 12 50 46 46 Z", "M80 18 L 82 24 88 26 82 28 80 34 78 28 72 26 78 24 Z"],
  wave:    ["M6 50 C 22 28, 34 72, 50 50 S 78 28, 94 50", "M6 62 C 22 40, 34 84, 50 62 S 78 40, 94 62"],
  script:  ["M10 64 C 18 40, 24 30, 22 56 C 22 66, 30 66, 34 54 C 36 46, 42 46, 42 56 C 42 66, 50 64, 52 52 C 54 42, 60 44, 58 58 C 58 66, 66 66, 70 52 C 72 44, 80 44, 78 56 C 78 64, 86 66, 92 56", "M30 76 C 50 72, 70 72, 88 76"],
  heart:   ["M50 82 C 18 60, 14 38, 30 30 C 40 25, 48 32, 50 40 C 52 32, 60 25, 70 30 C 86 38, 82 60, 50 82 Z"],
  butterfly: ["M50 30 L 50 74", "M50 40 C 34 20, 12 22, 16 40 C 18 52, 36 54, 50 48", "M50 40 C 66 20, 88 22, 84 40 C 82 52, 64 54, 50 48", "M50 50 C 38 56, 26 70, 34 76 C 42 80, 48 66, 50 56", "M50 50 C 62 56, 74 70, 66 76 C 58 80, 52 66, 50 56", "M50 30 C 46 22, 42 20, 40 18 M 50 30 C 54 22, 58 20, 60 18"],
};
const svgFor = (key) =>
  `<svg viewBox="0 0 100 100" aria-hidden="true">${ART[key].map((d) => `<path d="${d}"/>`).join("")}</svg>`;

/* ---------- Gallery data — swap `art` for `img: "images/your-photo.jpg"` ---------- */
const WORK = [
  { cat: "brows",  title: "Microblading",       note: "Healed",        art: "brow",      bg: "var(--blush)",       fg: "var(--wine)" },
  { cat: "tattoo", title: "Wildflower stem",    note: "Forearm",       art: "stem",      bg: "var(--cream)",       fg: "var(--cherry)" },
  { cat: "lips",   title: "Lip blush",          note: "Fresh",         art: "lips",      bg: "var(--wine)",        fg: "var(--blush)" },
  { cat: "tattoo", title: "Crescent moon",      note: "Behind ear",    art: "moon",      bg: "var(--ink)",         fg: "var(--cream)" },
  { cat: "brows",  title: "Powder brows",       note: "Healed",        art: "brow",      bg: "var(--cream)",       fg: "var(--cherry)" },
  { cat: "lips",   title: "Lash line",          note: "Healed",        art: "eye",       bg: "var(--blush)",       fg: "var(--cherry)" },
  { cat: "tattoo", title: "Micro script",       note: "Inner wrist",   art: "script",    bg: "var(--cherry)",      fg: "var(--light-cream)" },
  { cat: "tattoo", title: "Butterfly",          note: "Ankle",         art: "butterfly", bg: "var(--light-cream)", fg: "var(--wine)" },
  { cat: "tattoo", title: "Fine line heart",    note: "Finger",        art: "heart",     bg: "var(--blush)",       fg: "var(--wine)" },
];

/* ---------- Helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- Year ---------- */
$("#year").textContent = new Date().getFullYear();
$("#igLink").href = INSTAGRAM_URL;

/* ---------- Hero line drawing: set exact path lengths ---------- */
$$(".hero__art path").forEach((p, i) => {
  const len = Math.ceil(p.getTotalLength());
  p.style.setProperty("--len", len);
  p.style.animationDelay = `${0.3 + i * 0.18}s`;
});

/* ---------- Nav ---------- */
const nav = $(".nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const toggle = $("#navToggle");
const links = $("#navLinks");
const setMenu = (open) => {
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  links.classList.toggle("is-open", open);
  document.body.style.overflow = open ? "hidden" : "";
};
toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
$$("a", links).forEach((a) => a.addEventListener("click", () => setMenu(false)));

/* ---------- Custom cursor ---------- */
const cursor = $(".cursor");
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion) {
  let x = 0, y = 0, cx = 0, cy = 0;
  window.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; cursor.classList.add("is-visible"); });
  document.addEventListener("mouseleave", () => cursor.classList.remove("is-visible"));
  const loop = () => {
    cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  };
  loop();
  document.addEventListener("mouseover", (e) => {
    cursor.classList.toggle("is-hover", !!e.target.closest("a, button, label, summary, .menu__item, input[type=range]"));
  });
}

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
$$(".reveal").forEach((el) => io.observe(el));

/* ---------- Tabs (services + aftercare) ---------- */
$$("[role=tablist]").forEach((list) => {
  const tabs = $$("[role=tab]", list);
  const select = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute("aria-controls"));
      panel.hidden = !on;
      panel.classList.toggle("is-active", on);
    });
    if (list.closest(".services")) showPreview($(".menu__item", document.getElementById(tab.getAttribute("aria-controls"))).dataset.art);
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(t));
    t.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
      next.focus(); select(next);
    });
  });
});

/* ---------- Services hover preview ---------- */
const preview = $("#previewArt");
let currentArt = "";
function showPreview(key) {
  if (!key || key === currentArt) return;
  currentArt = key;
  preview.innerHTML = ART[key].map((d) => `<path d="${d}"/>`).join("");
}
$$(".menu__item").forEach((item) => {
  const activate = () => {
    $$(".menu__item.is-hot").forEach((m) => m.classList.remove("is-hot"));
    item.classList.add("is-hot");
    showPreview(item.dataset.art);
  };
  item.addEventListener("mouseenter", activate);
  item.addEventListener("click", activate);
});
showPreview("brow");

/* ---------- Before / After brow illustration ---------- */
(function brows() {
  const NS = "http://www.w3.org/2000/svg";
  // Brow spine: quadratic bezier from head (left) to tail (right)
  const P0 = [70, 132], P1 = [250, 52], P2 = [338, 114];
  const at = (u) => [
    (1 - u) ** 2 * P0[0] + 2 * (1 - u) * u * P1[0] + u * u * P2[0],
    (1 - u) ** 2 * P0[1] + 2 * (1 - u) * u * P1[1] + u * u * P2[1],
  ];
  // Seeded random so the drawing is the same every load
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  function strokes(group, count, opacityRange, sparse) {
    for (let i = 0; i < count; i++) {
      const u = sparse ? 0.15 + rnd() * 0.75 : Math.pow(rnd(), 0.9);
      const [cx, cy] = at(u);
      const t = (36 * Math.pow(1 - u, 0.6) + 5) * (sparse ? 0.7 : 1);
      const y0 = cy + t / 2 * (0.4 + rnd() * 0.6);
      const y1 = cy - t / 2 * (0.4 + rnd() * 0.6);
      const lean = t * (0.12 + u * 0.75) + rnd() * 3;
      const x1 = cx + lean;
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", `M${cx.toFixed(1)} ${y0.toFixed(1)} Q ${(cx + lean * 0.2).toFixed(1)} ${((y0 + y1) / 2).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "#5A1219");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-width", (0.9 + rnd() * 0.7).toFixed(2));
      path.setAttribute("opacity", (opacityRange[0] + rnd() * (opacityRange[1] - opacityRange[0])).toFixed(2));
      group.appendChild(path);
    }
  }
  function eye(group) {
    const lid = document.createElementNS(NS, "path");
    lid.setAttribute("d", "M110 205 Q 205 240 310 196");
    lid.setAttribute("fill", "none");
    lid.setAttribute("stroke", "#1E1012");
    lid.setAttribute("stroke-width", "1.4");
    lid.setAttribute("opacity", ".55");
    group.appendChild(lid);
    for (let i = 0; i < 14; i++) {
      const u = 0.1 + i / 16;
      const x = 110 + 200 * u, y = 205 + 30 * Math.sin(Math.PI * u) - 6 * u;
      const l = document.createElementNS(NS, "path");
      l.setAttribute("d", `M${x} ${y} q ${4 + u * 6} 8 ${8 + u * 8} 12`);
      l.setAttribute("fill", "none");
      l.setAttribute("stroke", "#1E1012");
      l.setAttribute("stroke-width", "1");
      l.setAttribute("opacity", ".45");
      group.appendChild(l);
    }
  }
  const before = $("#browBefore"), after = $("#browAfter");
  strokes(before, 38, [0.15, 0.4], true);
  eye(before);
  seed = 11;
  strokes(after, 230, [0.45, 0.95], false);
  eye(after);

  const frame = $("#compare");
  const range = $(".compare__range", frame);
  const set = (v) => frame.style.setProperty("--pos", `${v}%`);
  range.addEventListener("input", () => set(range.value));
  set(range.value);
})();

/* ---------- Gallery + filters + lightbox ---------- */
const gallery = $("#gallery");
gallery.innerHTML = WORK.map((w, i) => `
  <button class="tile reveal" data-cat="${w.cat}" data-i="${i}" style="--tile-bg:${w.bg};--tile-fg:${w.fg}" aria-label="Open ${w.title}">
    <div class="tile__art">${w.img ? `<img src="${w.img}" alt="${w.title}" loading="lazy">` : svgFor(w.art)}</div>
    <div class="tile__cap"><em>${w.title}</em><span>${w.note}</span></div>
  </button>`).join("");
$$(".tile", gallery).forEach((el) => io.observe(el));

$$(".chip").forEach((chip) => chip.addEventListener("click", () => {
  $$(".chip").forEach((c) => c.classList.toggle("is-active", c === chip));
  const f = chip.dataset.filter;
  $$(".tile", gallery).forEach((t) => t.classList.toggle("is-hidden", f !== "all" && t.dataset.cat !== f));
}));

const lb = $("#lightbox"), lbArt = $("#lbArt"), lbCap = $("#lbCap");
let lbIndex = 0, lastFocus = null;
const visibleTiles = () => $$(".tile:not(.is-hidden)", gallery).map((t) => +t.dataset.i);
function openLb(i) {
  lbIndex = i;
  const w = WORK[i];
  lbArt.style.setProperty("--tile-bg", w.bg);
  lbArt.style.setProperty("--tile-fg", w.fg);
  lbArt.innerHTML = w.img ? `<img src="${w.img}" alt="${w.title}">` : svgFor(w.art);
  lbCap.textContent = `${w.title} — ${w.note}`;
  if (lb.hidden) { lastFocus = document.activeElement; lb.hidden = false; document.body.style.overflow = "hidden"; $(".lightbox__close", lb).focus(); }
}
function closeLb() { lb.hidden = true; document.body.style.overflow = ""; lastFocus?.focus(); }
function stepLb(d) { const v = visibleTiles(); const p = v.indexOf(lbIndex); openLb(v[(p + d + v.length) % v.length]); }
gallery.addEventListener("click", (e) => { const t = e.target.closest(".tile"); if (t) openLb(+t.dataset.i); });
$(".lightbox__close", lb).addEventListener("click", closeLb);
$(".lightbox__prev", lb).addEventListener("click", () => stepLb(-1));
$(".lightbox__next", lb).addEventListener("click", () => stepLb(1));
lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", (e) => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowRight") stepLb(1);
  if (e.key === "ArrowLeft") stepLb(-1);
});

/* ---------- Aftercare checklist ---------- */
$$(".check").forEach((c) => {
  c.setAttribute("aria-label", `Mark done: ${c.parentElement.textContent.trim()}`);
  c.addEventListener("click", () => c.setAttribute("aria-pressed", c.getAttribute("aria-pressed") !== "true"));
});

/* ---------- FAQ: one open at a time ---------- */
$$(".accordion details").forEach((d) => d.addEventListener("toggle", () => {
  if (d.open) $$(".accordion details").forEach((o) => { if (o !== d) o.open = false; });
}));

/* ---------- Booking form → prefilled email ---------- */
const form = $("#bookForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const err = $("#formError");
  const data = new FormData(form);
  const services = data.getAll("service");
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  form.name.classList.toggle("is-invalid", !name);
  form.email.classList.toggle("is-invalid", !form.email.checkValidity() || !email);

  if (!services.length) return (err.textContent = "Please choose at least one service.");
  if (!name) return (err.textContent = "Please add your name.");
  if (!email || !form.email.checkValidity()) return (err.textContent = "Please add a valid email address.");
  err.textContent = "";

  const lines = [`Name: ${name}`, `Email: ${email}`];
  if (data.get("phone")) lines.push(`Phone: ${data.get("phone")}`);
  lines.push(`Services: ${services.join(", ")}`);
  if (data.get("date")) lines.push(`Preferred date: ${data.get("date")}`);
  if (data.get("message")) lines.push("", data.get("message"));
  const body = lines.join("\n");

  const subject = `Booking request: ${services.join(", ")}`;
  window.location.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  $("#formSuccess").hidden = false;
});
