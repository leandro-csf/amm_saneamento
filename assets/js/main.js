/* =============================================================
   Hotsite AMM + IPGC — interações (JavaScript de navegador puro)
   ============================================================= */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};

  /* ---------- Helpers ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- 1. Injeção do CTA a partir do config ---------- */
  var ctaUrl = cfg.ctaUrl && cfg.ctaUrl !== "#" ? cfg.ctaUrl : "#contato";
  var external = /^https?:\/\//i.test(ctaUrl);

  $all("[data-cta]").forEach(function (el) {
    el.setAttribute("href", ctaUrl);
    // Só troca o texto nos botões que pedem explicitamente (data-cta-label).
    // O botão do cabeçalho mantém seu rótulo curto próprio.
    if (el.hasAttribute("data-cta-label") && cfg.ctaLabel) el.textContent = cfg.ctaLabel;
    if (external) { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
  });

  /* ---------- 2. Cards de contato (seção CTA) ---------- */
  function mailIcon() {
    return '<span class="contact-card__ico" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></span>';
  }
  function waIcon() {
    return '<span class="contact-card__ico" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20l1.1-5.4A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8.5 9c0 4 2.5 6.5 6.5 6.5"/></svg></span>';
  }

  var contactsWrap = $("#contatos");
  if (contactsWrap) {
    var html = "";
    if (cfg.contactEmailAmm) {
      html += '<a class="contact-card" href="mailto:' + esc(cfg.contactEmailAmm) + '">' + mailIcon() +
        '<span><small>AMM</small><b>' + esc(cfg.contactEmailAmm) + "</b></span></a>";
    }
    if (cfg.contactEmailIpgc) {
      html += '<a class="contact-card" href="mailto:' + esc(cfg.contactEmailIpgc) + '">' + mailIcon() +
        '<span><small>IPGC</small><b>' + esc(cfg.contactEmailIpgc) + "</b></span></a>";
    }
    if (cfg.whatsapp) {
      var digits = String(cfg.whatsapp).replace(/\D/g, "");
      html += '<a class="contact-card" href="https://wa.me/' + digits + '" target="_blank" rel="noopener">' + waIcon() +
        "<span><small>WhatsApp</small><b>Conversar agora</b></span></a>";
    }
    contactsWrap.innerHTML = html;
  }

  /* ---------- 3. Contatos no rodapé ---------- */
  var footerContacts = $("#footerContacts");
  if (footerContacts) {
    var f = "";
    if (cfg.contactEmailAmm) f += '<li><a href="mailto:' + esc(cfg.contactEmailAmm) + '">' + esc(cfg.contactEmailAmm) + "</a></li>";
    if (cfg.contactEmailIpgc) f += '<li><a href="mailto:' + esc(cfg.contactEmailIpgc) + '">' + esc(cfg.contactEmailIpgc) + "</a></li>";
    if (cfg.whatsapp) f += '<li><a href="https://wa.me/' + String(cfg.whatsapp).replace(/\D/g, "") + '" target="_blank" rel="noopener">WhatsApp</a></li>';
    footerContacts.innerHTML = f;
  }

  /* ---------- 4. Header com sombra ao rolar ---------- */
  var header = $(".header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-stuck", window.pageYOffset > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 5. Menu mobile ---------- */
  var toggle = $("#navToggle");
  var nav = $("#nav");
  function closeNav() {
    if (!nav) return;
    nav.classList.remove("is-open");
    if (toggle) { toggle.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Abrir menu"); }
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    $all("a", nav).forEach(function (a) { a.addEventListener("click", closeNav); });
  }

  /* ---------- 6. Reveal on scroll (progressive enhancement) ---------- */
  var reveals = $all(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- 7. Ano dinâmico no rodapé ---------- */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
