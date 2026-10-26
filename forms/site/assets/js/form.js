// Formulário em etapas: estado, telas, validação na hora, envio e eventos.
// As perguntas vêm de fluxo.js; aqui só existe o comportamento.

import { INTERESSES, etapas, totalEtapas, pergunta, validarCampo, isInteresse, MENSAGENS } from './fluxo.js';
import { CONFIG } from './config.js';
import { track } from './tracking.js';
import { store, STORAGE_FORM as STORAGE, STORAGE_LEAD } from './storage.js';
import { intro, stepIn, stepOut, pop, shake, fill, scrollTop } from './motion.js';

const CONTATO = ['nome', 'whatsapp', 'email', 'interesse'];
const ORIGEM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'pagina_origem'];
const MSG_ERRO = 'Não consegui enviar. Confere sua internet e tenta de novo, suas respostas continuam aqui.';

let state;
let ui;
let busy = false;
let pendingParcial = null;
let submitted = false;

// --------------------------------------------------------------------------
// Estado
// --------------------------------------------------------------------------

function lerUrl() {
  const params = new URLSearchParams(window.location.search);
  const interesse = params.get('interesse');
  const origem = {};
  ORIGEM.forEach((key) => {
    const value = params.get(key);
    if (value) origem[key] = value.slice(0, 120);
  });
  return { preset: isInteresse(interesse) ? interesse : '', origem };
}

function criarEstado() {
  const url = lerUrl();
  const salvo = store.get(STORAGE);
  // Recarregar a página mantém as respostas, desde que o link aponte para o mesmo ramo.
  if (salvo && salvo.v === 1 && (!url.preset || salvo.preset === url.preset)) return salvo;

  return {
    v: 1,
    idx: 0,
    preset: url.preset,
    respostas: url.preset ? { interesse: url.preset } : {},
    consentimento: true,
    lead: null,
    origem: { ...url.origem, referrer: document.referrer.slice(0, 500) },
  };
}

const salvar = () => store.set(STORAGE, state);
const interesse = () => state.respostas.interesse || '';
const etapaAtual = () => etapas(interesse())[state.idx];
const ehUltima = () => state.idx === totalEtapas(interesse()) - 1 && isInteresse(interesse());

// --------------------------------------------------------------------------
// Montagem das telas (DOM real, sem innerHTML com dados da pessoa)
// --------------------------------------------------------------------------

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === undefined || value === null || value === false) return;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else node.setAttribute(key, value === true ? '' : value);
  });
  [].concat(children).forEach((child) => {
    if (child) node.append(child);
  });
  return node;
}

function icon(name, cls) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('aria-hidden', 'true');
  if (cls) svg.setAttribute('class', cls);
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `#${name}`);
  svg.append(use);
  return svg;
}

const erroEl = (id) => el('p', { class: 'field__error', id: `f-${id}-erro`, hidden: true }, [icon('i-alert'), el('span')]);

function labelText(q) {
  return q.optional ? [q.label, ' ', el('span', { class: 'field__opt', text: '(opcional)' })] : [q.label];
}

function campoTexto(id, q) {
  const attrs = {
    id: `f-${id}`,
    name: id,
    class: 'field__input',
    placeholder: q.placeholder,
    maxlength: q.max,
    autocomplete: q.autocomplete || 'off',
    'aria-describedby': `f-${id}-erro`,
  };
  let input;
  if (q.type === 'textarea') {
    input = el('textarea', { ...attrs, rows: 4 });
  } else {
    input = el('input', {
      ...attrs,
      type: q.type,
      inputmode: q.type === 'tel' ? 'tel' : q.type === 'email' ? 'email' : undefined,
      autocapitalize: q.type === 'text' ? 'sentences' : 'off',
      spellcheck: q.type === 'text' ? undefined : 'false',
      enterkeyhint: 'next',
    });
  }
  input.value = state.respostas[id] || '';

  return el('div', { class: 'field', 'data-field': id }, [
    el('label', { class: 'field__label', for: `f-${id}` }, labelText(q)),
    input,
    erroEl(id),
  ]);
}

function campoEscolha(id, q) {
  const multi = q.type === 'chips-multi';
  const chips = q.type !== 'cards';
  const valor = state.respostas[id];

  const opcoes = q.options.map((option) => {
    const checked = multi ? Array.isArray(valor) && valor.includes(option.value) : valor === option.value;
    const input = el('input', {
      type: multi ? 'checkbox' : 'radio',
      name: id,
      value: option.value,
      checked,
      'aria-describedby': `f-${id}-erro`,
    });
    input.checked = checked;
    const marca = chips ? icon('i-check', 'choice__check') : el('span', { class: 'choice__radio', 'aria-hidden': 'true' });
    return el('label', { class: 'choice' }, [
      input,
      el('span', { class: 'choice__box' }, [marca, el('span', { class: 'choice__text', text: option.label || option.value })]),
    ]);
  });

  return el('fieldset', { class: 'field', 'data-field': id }, [
    el('legend', { class: 'field__label' }, [q.label, multi ? el('span', { class: 'field__opt', text: ' (pode marcar mais de um)' }) : null]),
    el('div', { class: `choices choices--${chips ? 'chips' : 'cards'}`, 'data-cols': q.cols || 1 }, opcoes),
    erroEl(id),
  ]);
}

function consentimento() {
  const input = el('input', { type: 'checkbox', id: 'f-consentimento', name: 'consentimento', 'aria-describedby': 'f-consentimento-erro' });
  input.checked = state.consentimento;
  const link = el('a', { href: CONFIG.privacidade, target: '_blank', rel: 'noopener', text: 'Política de privacidade' });
  return el('div', { class: 'consent field', 'data-field': 'consentimento' }, [
    el('label', { class: 'consent__box', for: 'f-consentimento' }, [
      input,
      el('span', { class: 'consent__check', 'aria-hidden': 'true' }, [icon('i-check')]),
      el('span', { class: 'consent__text' }, ['Ao enviar, você concorda em ser contatado por WhatsApp e e-mail sobre este pedido. Seus dados ficam só comigo. ', link]),
    ]),
    erroEl('consentimento'),
  ]);
}

function camposVisiveis(etapa) {
  return etapa.campos.filter((campo) => !(campo.id === 'interesse' && state.preset));
}

function montarEtapa(etapa) {
  const [antes, destaque, depois] = etapa.titulo;
  const campos = camposVisiveis(etapa).map((campo) => {
    const q = pergunta(campo);
    return q.options ? campoEscolha(campo.id, q) : campoTexto(campo.id, q);
  });

  return el('section', { class: 'step', 'data-step': etapa.id, 'aria-labelledby': 'step-title' }, [
    el('h1', { class: 'step__title', id: 'step-title', tabindex: '-1' }, [antes, el('em', { text: destaque }), depois]),
    el('p', { class: 'step__sub', text: etapa.sub }),
    el('div', { class: 'step__fields' }, campos),
    ehUltima() ? consentimento() : null,
  ]);
}

// --------------------------------------------------------------------------
// Topo: contador, ramo e barra de progresso
// --------------------------------------------------------------------------

function atualizarTopo({ animar = false } = {}) {
  const total = totalEtapas(interesse());
  const atual = state.idx + 1;
  ui.num.textContent = atual;
  ui.total.textContent = total;
  ui.ramo.textContent = INTERESSES[interesse()] || '';

  if (ui.progress.children.length !== total) {
    ui.progress.replaceChildren(...Array.from({ length: total }, () => el('span', { class: 'progress__seg' })));
  }
  [...ui.progress.children].forEach((seg, i) => {
    const feito = i < atual;
    const novo = feito && !seg.classList.contains('is-done');
    seg.classList.toggle('is-done', feito);
    if (!feito) seg.style.removeProperty('--fill');
    if (novo && animar) fill(seg);
  });
  ui.progress.setAttribute('aria-valuemax', total);
  ui.progress.setAttribute('aria-valuenow', atual);
  ui.progress.setAttribute('aria-valuetext', `Etapa ${atual} de ${total}`);

  ui.back.hidden = state.idx === 0;
  ui.nextLabel.textContent = ehUltima() ? 'Enviar pedido' : 'Continuar';
  ui.next.classList.toggle('is-final', ehUltima());
}

// --------------------------------------------------------------------------
// Validação na hora
// --------------------------------------------------------------------------

function mostrarErro(id, mensagem, { animar = true } = {}) {
  const field = ui.host.querySelector(`[data-field="${id}"]`);
  if (!field) return;
  const box = field.querySelector('.field__error');
  const tinha = !box.hidden;
  field.classList.toggle('field--erro', Boolean(mensagem));
  box.hidden = !mensagem;
  box.querySelector('span').textContent = mensagem || '';
  field.querySelectorAll('input, textarea').forEach((input) => {
    if (mensagem) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  });
  if (mensagem && !tinha && animar) shake(box);
}

function validarEtapa() {
  let primeiro = null;
  camposVisiveis(etapaAtual()).forEach((campo) => {
    const erro = validarCampo(campo.id, state.respostas[campo.id]);
    mostrarErro(campo.id, erro);
    if (erro && !primeiro) primeiro = campo.id;
  });
  if (ehUltima()) {
    const erro = state.consentimento ? '' : MENSAGENS.consentimento;
    mostrarErro('consentimento', erro);
    if (erro && !primeiro) primeiro = 'consentimento';
  }
  return primeiro;
}

function focarCampo(id) {
  const field = ui.host.querySelector(`[data-field="${id}"]`);
  const alvo = field && field.querySelector('input:checked, input, textarea');
  if (!alvo) return;
  alvo.focus({ preventScroll: true });
  field.scrollIntoView({ block: 'center', behavior: document.documentElement.classList.contains('motion') ? 'smooth' : 'auto' });
}

// Máscara brasileira: (85) 9 9812-4471 no celular, (85) 3212-4471 no fixo.
export function mascaraWhatsapp(value) {
  const d = String(value).replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : '';
  // Começou com 9 depois do DDD: celular, já no formato com o 9 separado.
  if (d[2] === '9') {
    const resto = d.slice(3);
    return `(${d.slice(0, 2)}) 9${resto ? ` ${resto.slice(0, 4)}` : ''}${resto.length > 4 ? `-${resto.slice(4)}` : ''}`;
  }
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`;
}

function onInput(event) {
  const target = event.target;
  const id = target.name;
  if (!id || id === 'empresa_site') return;

  if (id === 'consentimento') {
    state.consentimento = target.checked;
    if (target.checked) mostrarErro('consentimento', '');
  } else if (target.type === 'checkbox') {
    state.respostas[id] = [...ui.host.querySelectorAll(`input[name="${id}"]:checked`)].map((input) => input.value);
  } else if (target.type === 'radio') {
    state.respostas[id] = target.value;
  } else {
    if (id === 'whatsapp') {
      const masked = mascaraWhatsapp(target.value);
      if (masked !== target.value) target.value = masked;
    }
    state.respostas[id] = target.value;
  }

  // Campo com erro: revalida enquanto a pessoa corrige.
  const field = target.closest('.field');
  if (field && field.classList.contains('field--erro') && id !== 'consentimento') {
    mostrarErro(id, validarCampo(id, state.respostas[id]), { animar: false });
  }

  if (event.type === 'change' && (target.type === 'radio' || target.type === 'checkbox')) {
    pop(target.nextElementSibling);
    if (id === 'interesse') {
      atualizarTopo({ animar: false });
      track('select_interesse', { interesse: target.value, origem: 'formulario' });
    }
  }
  salvar();
}

// Valida ao sair do campo, só se a pessoa já escreveu algo.
function onBlur(event) {
  const target = event.target;
  if (!target.matches('.field__input') || !target.value.trim()) return;
  mostrarErro(target.name, validarCampo(target.name, state.respostas[target.name]));
}

// --------------------------------------------------------------------------
// Navegação
// --------------------------------------------------------------------------

async function irPara(idx, dir) {
  const atual = ui.host.querySelector('.step');
  await stepOut(atual, dir);
  state.idx = idx;
  salvar();
  render(dir);
  scrollTop();
}

function render(dir = 1, { primeira = false } = {}) {
  const step = montarEtapa(etapaAtual());
  ui.host.replaceChildren(step);
  atualizarTopo({ animar: !primeira });
  if (window.__noWidows) window.__noWidows(step);

  if (primeira) {
    intro(step);
  } else {
    stepIn(step, dir);
    step.querySelector('.step__title').focus({ preventScroll: true });
  }
}

function payloadBase(acao) {
  const { nome = '', whatsapp = '', email = '' } = state.respostas;
  return {
    acao,
    ...(state.lead || {}),
    contato: { nome, whatsapp, email, interesse: interesse() },
    origem: state.origem,
    empresa_site: ui.honeypot.value,
  };
}

async function post(payload) {
  const response = await fetch(CONFIG.api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await response.json().catch(() => ({}));
  return { status: response.status, json };
}

// Etapa 1 salva em segundo plano: a pessoa avança sem esperar.
function salvarParcial() {
  pendingParcial = post(payloadBase('parcial'))
    .then(({ json }) => {
      if (json.ok && json.id) {
        state.lead = { id: json.id, token: json.token };
        salvar();
      }
    })
    .catch(() => { /* o envio final cria o registro completo */ });
}

function respostasDoRamo() {
  const respostas = {};
  Object.entries(state.respostas).forEach(([id, valor]) => {
    if (!CONTATO.includes(id)) respostas[id] = valor;
  });
  return respostas;
}

function setBusy(on) {
  busy = on;
  ui.next.disabled = on;
  ui.back.disabled = on;
  ui.next.classList.toggle('is-loading', on);
  ui.next.setAttribute('aria-busy', on ? 'true' : 'false');
  ui.nextLabel.textContent = on ? 'Enviando...' : ehUltima() ? 'Enviar pedido' : 'Continuar';
}

function alerta(mensagem) {
  ui.alertText.textContent = mensagem || '';
  ui.alert.hidden = !mensagem;
  if (mensagem) shake(ui.alert);
}

async function enviar() {
  setBusy(true);
  alerta('');
  try {
    if (pendingParcial) await pendingParcial;
    const { status, json } = await post({
      ...payloadBase('completo'),
      respostas: respostasDoRamo(),
      consentimento: state.consentimento,
    });

    if (json.ok) {
      submitted = true;
      const r = state.respostas;
      store.set(STORAGE_LEAD, {
        interesse: interesse(),
        faixa_verba: r.verba || '',
        faixa_site: r.investimento_site || '',
        enviado: Date.now(),
      });
      store.del(STORAGE);
      window.location.assign('/obrigado');
      return;
    }

    // Erros de campo vindos do servidor: marca na tela quando o campo está visível.
    if (status === 422 && json.campos) {
      const visiveis = Object.keys(json.campos).filter((id) => ui.host.querySelector(`[data-field="${id}"]`));
      visiveis.forEach((id) => mostrarErro(id, json.campos[id]));
      if (visiveis.length) focarCampo(visiveis[0]);
      else alerta(MSG_ERRO);
    } else {
      alerta(json.erro || MSG_ERRO);
    }
  } catch {
    alerta(MSG_ERRO);
  }
  setBusy(false);
}

async function onSubmit(event) {
  event.preventDefault();
  if (busy) return;
  alerta('');

  const invalido = validarEtapa();
  if (invalido) {
    focarCampo(invalido);
    return;
  }

  const etapa = etapaAtual();
  track(`form_step_${state.idx + 1}`, { interesse: interesse(), etapa: etapa.nome });

  if (state.idx === 0) salvarParcial();

  if (ehUltima()) {
    await enviar();
    return;
  }

  busy = true;
  await irPara(state.idx + 1, 1);
  busy = false;
}

async function onBack() {
  if (busy || state.idx === 0) return;
  alerta('');
  busy = true;
  await irPara(state.idx - 1, -1);
  busy = false;
}

// --------------------------------------------------------------------------
// Início
// --------------------------------------------------------------------------

export function initForm() {
  const form = document.querySelector('[data-form]');
  if (!form) return;

  ui = {
    form,
    host: form.querySelector('[data-step-host]'),
    back: form.querySelector('[data-back]'),
    next: form.querySelector('[data-next]'),
    nextLabel: form.querySelector('[data-next-label]'),
    alert: form.querySelector('[data-alert]'),
    alertText: form.querySelector('[data-alert-text]'),
    honeypot: form.querySelector('#empresa_site'),
    num: document.querySelector('[data-step-num]'),
    total: document.querySelector('[data-step-total]'),
    ramo: document.querySelector('[data-ramo]'),
    progress: document.querySelector('[data-progress]'),
  };

  state = criarEstado();
  // Ramo trocado ou estado antigo apontando para etapa que não existe mais.
  if (state.idx >= totalEtapas(interesse())) state.idx = 0;
  salvar();

  form.addEventListener('submit', onSubmit);
  form.addEventListener('input', onInput);
  form.addEventListener('change', onInput);
  form.addEventListener('focusout', onBlur);
  ui.back.addEventListener('click', onBack);

  // form_start: primeira interação real com o formulário.
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    track('form_start', { interesse: interesse() || 'nao_escolhido', pagina_origem: state.origem.pagina_origem || '' });
  };
  form.addEventListener('focusin', start, { once: true });
  form.addEventListener('pointerdown', start, { once: true });

  // form_abandon: saiu da página depois de começar e sem enviar.
  window.addEventListener('pagehide', () => {
    if (started && !submitted) track('form_abandon', { etapa: state.idx + 1, interesse: interesse() || 'nao_escolhido' });
  });

  render(1, { primeira: true });
}
