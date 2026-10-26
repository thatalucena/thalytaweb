// Rastreamento: dataLayer (GA4) e Meta Pixel, só se os IDs estiverem configurados.

import { CONFIG, isConfigured } from './config.js';

window.dataLayer = window.dataLayer || [];

export function track(event, params = {}) {
  window.dataLayer.push({ event, ...params });
  if (typeof window.gtag === 'function') window.gtag('event', event, params);
  if (typeof window.fbq === 'function') window.fbq('trackCustom', event, params);
}

// Conversão principal: GA4 generate_lead (importada no Google Ads) e Pixel Lead.
export function trackLead(params) {
  window.dataLayer.push({ event: 'generate_lead', ...params });
  if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', params);
  if (typeof window.fbq === 'function') window.fbq('track', 'Lead', params);
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
