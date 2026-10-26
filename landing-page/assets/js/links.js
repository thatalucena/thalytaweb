// Monta os destinos dos botões. Os de diagnóstico levam à seção do formulário da home
// (#diagnostico) e marcam o interesse no filtro; só o botão do filtro abre o formulário,
// com interesse e UTMs. Os de WhatsApp abrem a conversa.

import { CONFIG, WHATSAPP_MESSAGES, isConfigured } from './config.js?v=20261026';
import { track } from './tracking.js?v=20261026';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const UTM_STORAGE = 'lp_utms';
const INTERESSES = ['site', 'trafego', 'ambos'];

// UTMs da URL; sem elas, as guardadas na sessão (a visita pode chegar por uma página interna).
function incomingUtms() {
  const params = new URLSearchParams(window.location.search);
  const utms = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) utms[key] = value;
  });
  try {
    if (Object.keys(utms).length) sessionStorage.setItem(UTM_STORAGE, JSON.stringify(utms));
    else return JSON.parse(sessionStorage.getItem(UTM_STORAGE)) || {};
  } catch { /* sem storage: fica só com a URL */ }
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

// Seção do formulário: na home é âncora; nas páginas internas, a home com o interesse na URL.
function sectionUrl(interesse = '') {
  if (document.getElementById('diagnostico')) return '#diagnostico';
  return `/${interesse ? `?interesse=${interesse}` : ''}#diagnostico`;
}

export function initLinks() {
  incomingUtms();

  document.querySelectorAll('a[data-form]').forEach((link) => {
    if (link.hasAttribute('data-form-picker')) return;
    link.href = sectionUrl(link.dataset.form);
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

  const select = (interesse) => {
    const radio = picker.querySelector(`input[value="${interesse}"]`);
    if (radio) radio.checked = true;
  };

  // Botões com interesse marcam o card do filtro antes de descer até a seção.
  document.querySelectorAll('a[data-form]:not([data-form-picker])').forEach((link) => {
    if (!INTERESSES.includes(link.dataset.form)) return;
    link.addEventListener('click', () => {
      select(link.dataset.form);
      update();
      track('select_interesse', { interesse: link.dataset.form, origem: link.dataset.cta || 'botao' });
    });
  });

  // Vindo de uma página interna com ?interesse=.
  const vindo = new URLSearchParams(window.location.search).get('interesse');
  if (INTERESSES.includes(vindo)) select(vindo);

  update();
}
