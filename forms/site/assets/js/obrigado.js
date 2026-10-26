// Página de obrigado: botões, conversão (uma vez por envio) e entrada animada.

import { CONFIG, WHATSAPP_MESSAGES, whatsappUrl } from './config.js';
import { initTags, track, trackLead } from './tracking.js';
import { initMotion } from './motion.js';
import { store, STORAGE_LEAD } from './storage.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

initTags();

document.querySelectorAll('[data-whatsapp]').forEach((link) => {
  link.href = whatsappUrl(WHATSAPP_MESSAGES.obrigado);
  link.addEventListener('click', () => track('click_whatsapp', { origem: 'obrigado' }));
});
document.querySelectorAll('[data-instagram]').forEach((link) => {
  link.href = CONFIG.instagram;
  link.addEventListener('click', () => track('click_instagram', { origem: 'obrigado' }));
});

// generate_lead só dispara se a pessoa chegou aqui por um envio real, e uma vez só.
const lead = store.get(STORAGE_LEAD);
if (lead && !lead.convertido) {
  trackLead({
    interesse: lead.interesse,
    faixa_verba: lead.faixa_verba || lead.faixa_site || 'nao_informado',
    faixa_site: lead.faixa_site || '',
  });
  store.set(STORAGE_LEAD, { ...lead, convertido: true });
}

if (initMotion({ reduced })) {
  window.__motionReady = true;
  const { gsap } = window;
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.fromTo('.thanks__star', { rotation: -180, scale: 0 }, { rotation: 0, scale: 1, duration: 1.1, ease: 'back.out(1.8)' }, 0)
    .fromTo('[data-intro]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.1)
    .fromTo('.next-steps li', { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 }, 0.45)
    .fromTo('.thanks__actions .btn', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.7)
    .add(() => gsap.to('.thanks__star', { rotation: 90, duration: 14, ease: 'none', repeat: -1 }));
} else {
  document.documentElement.classList.remove('motion');
}
