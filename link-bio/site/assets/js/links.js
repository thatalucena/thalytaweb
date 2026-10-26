// Monta os destinos: UTMs em todo link de saída, formulário e WhatsApp.

import { CONFIG, WHATSAPP_MESSAGES, isConfigured } from './config.js';

export function whatsappUrl(message = WHATSAPP_MESSAGES.conversa) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

function withUtm(href, content) {
  const url = new URL(href);
  Object.entries(CONFIG.utm).forEach(([key, value]) => url.searchParams.set(key, value));
  url.searchParams.set('utm_content', content);
  return url.toString();
}

function formUrl() {
  if (!isConfigured(CONFIG.formUrl)) return whatsappUrl(WHATSAPP_MESSAGES.diagnostico);
  const url = new URL(withUtm(CONFIG.formUrl, 'diagnostico'));
  url.searchParams.set('pagina_origem', 'link_da_bio');
  return url.toString();
}

export function initLinks() {
  document.querySelectorAll('a[data-out]').forEach((link) => {
    if (link.hasAttribute('data-form')) return;
    link.href = withUtm(link.href, link.dataset.out);
  });

  document.querySelectorAll('a[data-form]').forEach((link) => {
    link.href = formUrl();
  });

  document.querySelectorAll('a[data-whatsapp]').forEach((link) => {
    link.href = whatsappUrl(WHATSAPP_MESSAGES.conversa);
  });

  // Sites de clientes abrem em outra aba; a bio continua aberta para voltar.
  document.querySelectorAll('.site__link').forEach((link) => {
    link.target = '_blank';
    link.rel = 'noopener';
  });
}
