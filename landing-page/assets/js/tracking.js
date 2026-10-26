// Rastreamento: dataLayer (GTM/GA4) e Meta Pixel, só se os IDs estiverem configurados.

import { CONFIG, isConfigured } from './config.js?v=20261026';

window.dataLayer = window.dataLayer || [];

export function track(event, params = {}) {
  window.dataLayer.push({ event, ...params });
  if (typeof window.gtag === 'function') window.gtag('event', event, params);
  if (typeof window.fbq === 'function') window.fbq('trackCustom', event, params);
}

function loadScript(src) {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function initTags() {
  if (isConfigured(CONFIG.gaId)) {
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', CONFIG.gaId);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${CONFIG.gaId}`);
  }

  if (isConfigured(CONFIG.metaPixelId)) {
    const fbq = function fbq() {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = '2.0';
    window.fbq = window._fbq = fbq;
    loadScript('https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', CONFIG.metaPixelId);
    window.fbq('track', 'PageView');
  }
}

// view_section_<nome>: dispara uma vez quando a seção aparece.
export function initSectionViews() {
  const sections = document.querySelectorAll('[data-section]');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      track(`view_section_${entry.target.dataset.section}`);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  sections.forEach((section) => observer.observe(section));
}

// Cliques: CTA, WhatsApp e sites do portfólio.
export function initClickTracking() {
  document.addEventListener('click', (event) => {
    const el = event.target.closest('a, button');
    if (!el) return;

    if (el.hasAttribute('data-whatsapp')) {
      track('click_whatsapp', { posicao: el.dataset.cta || 'desconhecida' });
      return;
    }
    if (el.dataset.site) {
      track(`click_site_${el.dataset.site}`);
      return;
    }
    if (el.dataset.cta) {
      track(`click_cta_${el.dataset.cta}`, { interesse: el.dataset.form || '' });
    }
  });
}
