// Rastreamento: dataLayer (GA4) e Meta Pixel, só se os IDs estiverem configurados.

import { CONFIG, isConfigured } from './config.js';

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

// click_bio_lp, click_bio_form, click_bio_whatsapp, click_bio_site_<nome>: vêm do data-event.
export function initClickTracking() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-event]');
    if (!link) return;
    track(link.dataset.event, { botao: link.dataset.out || 'whatsapp' });
  });
}
