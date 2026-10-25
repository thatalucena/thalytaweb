// Monta os destinos dos botões: formulário (com interesse e UTMs) e WhatsApp.

import { CONFIG, WHATSAPP_MESSAGES, isConfigured } from './config.js';
import { track } from './tracking.js';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

function incomingUtms() {
  const params = new URLSearchParams(window.location.search);
  const utms = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) utms[key] = value;
  });
  return utms;
}

export function whatsappUrl(message = WHATSAPP_MESSAGES.default) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formUrl(interesse = '') {
  if (!isConfigured(CONFIG.formUrl)) {
    return whatsappUrl(WHATSAPP_MESSAGES[interesse] || WHATSAPP_MESSAGES.default);
  }
  const url = new URL(CONFIG.formUrl);
  if (interesse) url.searchParams.set('interesse', interesse);
  Object.entries(incomingUtms()).forEach(([key, value]) => url.searchParams.set(key, value));
  url.searchParams.set('pagina_origem', 'landing_page');
  return url.toString();
}

function setExternal(link) {
  link.target = '_blank';
  link.rel = 'noopener';
}

export function initLinks() {
  // Botões de diagnóstico: o formulário direto quando ele existir.
  document.querySelectorAll('a[data-form]').forEach((link) => {
    if (link.hasAttribute('data-form-picker')) return;
    // Sem formulário publicado, os CTAs genéricos levam à seção de escolha da própria página.
    if (!isConfigured(CONFIG.formUrl) && !link.dataset.form) return;
    link.href = formUrl(link.dataset.form);
    setExternal(link);
  });

  document.querySelectorAll('a[data-whatsapp]').forEach((link) => {
    link.href = whatsappUrl(link.dataset.msg || WHATSAPP_MESSAGES.default);
  });

  // Links do portfólio ainda sem URL não levam a lugar nenhum.
  document.querySelectorAll('a[href*="{{"]').forEach((link) => {
    link.setAttribute('aria-disabled', 'true');
    link.removeAttribute('target');
    link.addEventListener('click', (event) => event.preventDefault());
  });

  initPicker();
}

// Seção do formulário: o card escolhido define o interesse do botão.
function initPicker() {
  const picker = document.querySelector('.picker');
  if (!picker) return;
  const submit = picker.querySelector('[data-form-picker]');

  const update = () => {
    const checked = picker.querySelector('input[name="interesse"]:checked');
    const interesse = checked ? checked.value : '';
    submit.dataset.form = interesse;
    submit.href = formUrl(interesse);
    setExternal(submit);
  };

  picker.addEventListener('change', (event) => {
    if (event.target.name !== 'interesse') return;
    update();
    track('select_interesse', { interesse: event.target.value, origem: 'secao_formulario' });
  });

  picker.addEventListener('submit', (event) => event.preventDefault());

  // Os cards "Por onde você quer começar?" também registram a escolha.
  document.querySelectorAll('[data-interesse-select]').forEach((card) => {
    card.addEventListener('click', () => {
      track('select_interesse', { interesse: card.dataset.form, origem: 'escolha' });
      const radio = picker.querySelector(`input[value="${card.dataset.form}"]`);
      if (radio) radio.checked = true;
      update();
    });
  });

  update();
}
