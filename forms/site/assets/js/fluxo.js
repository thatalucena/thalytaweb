// Definição declarativa do formulário: perguntas, ramos, validação e score.
// Fonte única: o navegador monta as telas a partir daqui e a API (api/lead.js)
// importa o mesmo arquivo para validar as respostas e calcular o score.
// Para mudar uma pergunta, uma opção ou um peso do score, mude só aqui.

export const INTERESSES = {
  trafego: 'Tráfego pago',
  site: 'Site',
  ambos: 'Os dois',
};

const INICIO = [
  { value: 'Agora', score: 3 },
  { value: 'Em até 30 dias', score: 2 },
  { value: 'Em 1 a 3 meses', score: 1 },
  { value: 'Só estou pesquisando', score: 0 },
];

// Tipos: text, email, tel, textarea, cards (escolha única em cartão),
// chips (escolha única em chip) e chips-multi (várias escolhas).
export const PERGUNTAS = {
  nome: {
    label: 'Nome',
    type: 'text',
    placeholder: 'Como posso te chamar?',
    autocomplete: 'name',
    max: 80,
  },
  whatsapp: {
    label: 'WhatsApp',
    type: 'tel',
    placeholder: '(00) 0 0000-0000',
    autocomplete: 'tel-national',
    max: 20,
  },
  email: {
    label: 'E-mail',
    type: 'email',
    placeholder: 'seu@email.com.br',
    autocomplete: 'email',
    max: 120,
  },
  interesse: {
    label: 'Você está buscando',
    type: 'cards',
    cols: 3,
    options: Object.entries(INTERESSES).map(([value, label]) => ({ value, label })),
  },

  tipo_site: {
    label: 'Tipo de site',
    type: 'cards',
    cols: 2,
    options: ['Institucional', 'Venda', 'Apresentação', 'Portfólio', 'Landing page', 'E-commerce', 'Link da bio', 'Catálogo fixo'].map((value) => ({ value })),
  },
  oferta: {
    label: 'O que você vende ou oferece?',
    type: 'text',
    placeholder: 'Ex.: moda feminina, vendo pelo Instagram',
    max: 160,
  },
  tem_site: {
    label: 'Você já tem site?',
    type: 'cards',
    options: [
      { value: 'Sim, já tenho', score: 1 },
      { value: 'Tenho, mas está parado', score: 1 },
      { value: 'Ainda não tenho', score: 0 },
    ],
  },
  objetivo_site: {
    label: 'Principal objetivo do site',
    type: 'chips',
    options: [
      { value: 'Receber contatos', score: 1 },
      { value: 'Vender online', score: 1 },
      { value: 'Apresentar a empresa', score: 1 },
      { value: 'Outro', score: 0 },
    ],
  },
  publico: {
    label: 'Qual é o público-alvo?',
    type: 'text',
    placeholder: 'Ex.: mulheres de 25 a 45 anos em Fortaleza',
    max: 160,
  },
  investimento_site: {
    label: 'Qual valor pretende investir no seu site?',
    type: 'cards',
    cols: 2,
    options: [
      { value: 'Até R$ 1.000', score: 0 },
      { value: 'R$ 1.000 a 3.000', score: 2 },
      { value: 'R$ 3.000 a 5.000', score: 3 },
      { value: 'Acima de R$ 5.000', score: 4 },
      { value: 'Ainda não sei', score: 0 },
    ],
  },

  canais: {
    label: 'Por onde você vende hoje?',
    type: 'chips-multi',
    options: ['Loja física', 'WhatsApp', 'Instagram', 'Site', 'Marketplace', 'Outro'].map((value) => ({ value })),
  },
  cidade: {
    label: 'Em qual cidade ou região você atende?',
    type: 'text',
    placeholder: 'Ex.: Messejana, Fortaleza',
    autocomplete: 'address-level2',
    max: 120,
  },
  frequencia: {
    label: 'Com que frequência você posta?',
    type: 'chips',
    options: ['Todo dia', 'Algumas vezes na semana', 'De vez em quando', 'Não posto'].map((value) => ({ value })),
  },
  producao: {
    label: 'Quem produz o conteúdo?',
    type: 'chips',
    options: ['Eu mesmo', 'Funcionário', 'Agência ou freelancer', 'Ninguém'].map((value) => ({ value })),
  },
  ja_anuncia: {
    label: 'Você já anuncia?',
    type: 'cards',
    options: [
      { value: 'Sim', score: 1 },
      { value: 'Já anunciei e parei', score: 1 },
      { value: 'Nunca anunciei', score: 0 },
    ],
  },
  objetivo_anuncios: {
    label: 'Principal objetivo',
    type: 'chips',
    options: [
      { value: 'Mais mensagens no WhatsApp', score: 1 },
      { value: 'Mais vendas online', score: 1 },
      { value: 'Mais clientes na loja', score: 1 },
      { value: 'Mais seguidores', score: 1 },
      { value: 'Outro', score: 0 },
    ],
  },
  plataforma: {
    label: 'Onde quer anunciar?',
    type: 'chips',
    options: ['Meta', 'Google', 'Os dois', 'Não sei'].map((value) => ({ value })),
  },
  verba: {
    label: 'Quanto pode investir em anúncios por mês?',
    type: 'cards',
    cols: 2,
    options: [
      { value: 'Até R$ 1.000', score: 0 },
      { value: 'R$ 1.000 a 3.000', score: 2 },
      { value: 'R$ 3.000 a 7.000', score: 3 },
      { value: 'R$ 7.000 a 15.000', score: 4 },
      { value: 'Acima de R$ 15.000', score: 4 },
      { value: 'Ainda não sei', score: 0 },
    ],
  },
  meta_3_meses: {
    label: 'Onde você quer que o negócio esteja daqui a 3 meses?',
    type: 'text',
    placeholder: 'Ex.: com o delivery cheio nos fins de semana',
    max: 200,
  },
  inicio: {
    label: 'Quando você quer começar?',
    type: 'cards',
    options: INICIO,
  },
  extra: {
    label: 'Tem algo mais que eu deva saber?',
    type: 'textarea',
    optional: true,
    placeholder: 'Ex.: já tenho logo e fotos, só falta organizar os textos.',
    max: 600,
  },
};

// Ajustes de texto por ramo, sem duplicar a pergunta.
const em = (id, extra) => ({ id, ...extra });

export const ETAPA_CONTATO = {
  id: 'contato',
  nome: 'contato',
  titulo: ['Me conta quem é ', 'você', '.'],
  sub: 'Leva uns 2 minutos. Eu leio tudo com calma antes de te chamar.',
  campos: [em('nome'), em('whatsapp'), em('email'), em('interesse')],
};

export const RAMOS = {
  site: [
    {
      id: 'site_tipo',
      nome: 'tipo e oferta',
      titulo: ['Que tipo de ', 'site', '?'],
      sub: 'Escolha o que mais se parece com o que você imagina.',
      campos: [em('tipo_site'), em('oferta'), em('tem_site')],
    },
    {
      id: 'site_objetivo',
      nome: 'objetivo e público',
      titulo: ['Pra que o site vai ', 'servir', '?'],
      sub: 'Isso define a ordem do que o seu cliente vai ler.',
      campos: [em('objetivo_site', { label: 'Principal objetivo' }), em('publico'), em('investimento_site')],
    },
    {
      id: 'site_inicio',
      nome: 'início e envio',
      titulo: ['Quando a gente ', 'começa', '?'],
      sub: 'Última etapa. Depois disso eu te chamo no WhatsApp.',
      campos: [em('inicio'), em('extra')],
    },
  ],

  trafego: [
    {
      id: 'trafego_negocio',
      nome: 'negócio',
      titulo: ['O que você ', 'vende', '?'],
      sub: 'Quero entender onde o seu cliente já te encontra.',
      campos: [em('oferta', { placeholder: 'Ex.: açaí e lanches, delivery' }), em('canais'), em('cidade')],
    },
    {
      id: 'trafego_redes',
      nome: 'redes e anúncios',
      titulo: ['Como estão as suas ', 'redes', '?'],
      sub: 'Sem julgamento. Isso me ajuda a saber por onde começar.',
      campos: [em('frequencia'), em('producao'), em('ja_anuncia')],
    },
    {
      id: 'trafego_objetivo',
      nome: 'objetivo e verba',
      titulo: ['O que você quer dos ', 'anúncios', '?'],
      sub: 'A verba é paga direto na plataforma e fica à parte da gestão.',
      campos: [em('objetivo_anuncios'), em('plataforma'), em('verba')],
    },
    {
      id: 'trafego_meta',
      nome: 'meta e envio',
      titulo: ['Daqui a ', '3 meses', ''],
      sub: 'Última etapa. Depois disso eu te chamo no WhatsApp.',
      campos: [
        em('meta_3_meses'),
        em('inicio', { label: 'Quando quer começar?' }),
        em('extra', { placeholder: 'Ex.: já impulsionei posts no Instagram e não tive retorno.' }),
      ],
    },
  ],

  ambos: [
    {
      id: 'ambos_site',
      nome: 'site e negócio',
      titulo: ['Que tipo de ', 'site', '?'],
      sub: 'Começo pelo site porque é ele que recebe o clique do anúncio.',
      campos: [em('tipo_site'), em('oferta', { placeholder: 'Ex.: clínica de fisioterapia' }), em('cidade', { placeholder: 'Ex.: Aldeota, Fortaleza' })],
    },
    {
      id: 'ambos_publico',
      nome: 'objetivo e público',
      titulo: ['Pra quem é o ', 'negócio', '?'],
      sub: 'Uma resposta curta já me ajuda muito.',
      campos: [em('objetivo_site'), em('publico', { placeholder: 'Ex.: adultos com dor crônica e atletas amadores' }), em('canais')],
    },
    {
      id: 'ambos_redes',
      nome: 'redes',
      titulo: ['Como estão as suas ', 'redes', '?'],
      sub: 'Sem julgamento. Isso me ajuda a saber por onde começar.',
      campos: [em('frequencia'), em('producao'), em('ja_anuncia')],
    },
    {
      id: 'ambos_anuncios',
      nome: 'anúncios',
      titulo: ['E os ', 'anúncios', '?'],
      sub: 'A verba é paga direto na plataforma e fica à parte da gestão.',
      campos: [em('plataforma'), em('verba'), em('objetivo_anuncios', { label: 'Objetivo dos anúncios' })],
    },
    {
      id: 'ambos_meta',
      nome: 'meta e envio',
      titulo: ['Daqui a ', '3 meses', ''],
      sub: 'Última etapa. Depois disso eu te chamo no WhatsApp.',
      campos: [
        em('meta_3_meses', { placeholder: 'Ex.: agenda cheia de segunda a sábado' }),
        em('inicio', { label: 'Quando quer começar?' }),
        em('extra', { placeholder: 'Ex.: meu site atual não aparece no Google e quero anunciar no Instagram.' }),
      ],
    },
  ],
};

export const isInteresse = (value) => Object.hasOwn(INTERESSES, value);

// Etapas completas do ramo (a etapa de contato é sempre a primeira).
export function etapas(interesse) {
  return [ETAPA_CONTATO, ...(RAMOS[interesse] || [])];
}

// Antes da escolha o contador mostra o ramo do foco (site, 4 etapas), como nas telas.
export const totalEtapas = (interesse) => etapas(isInteresse(interesse) ? interesse : 'site').length;

// Pergunta com os ajustes da etapa aplicados.
export const pergunta = (campo) => ({ ...PERGUNTAS[campo.id], ...campo });

// Campos de resposta (sem os de contato) que valem para o ramo.
export function camposDoRamo(interesse) {
  const ids = new Set();
  (RAMOS[interesse] || []).forEach((etapa) => etapa.campos.forEach((campo) => ids.add(campo.id)));
  return [...ids];
}

// --------------------------------------------------------------------------
// Validação (mesmas mensagens no navegador e no servidor)
// --------------------------------------------------------------------------

export const soDigitos = (value) => String(value || '').replace(/\D/g, '');

// Aceita celular (11 dígitos, começando com 9) e fixo (10 dígitos, começando de 2 a 5), com DDD válido.
const ehFixo = (digits) => digits.length === 10 && /[2-5]/.test(digits[2]);

export function whatsappValido(value) {
  const digits = soDigitos(value);
  if (Number(digits.slice(0, 2)) < 11) return false;
  return ehFixo(digits) || (digits.length === 11 && digits[2] === '9');
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MENSAGENS = {
  nome: 'Me conta como posso te chamar.',
  whatsapp: 'Faltou um número no WhatsApp, confere pra mim?',
  whatsappInvalido: 'Esse WhatsApp parece incompleto, confere o DDD pra mim?',
  email: 'Faltou o seu e-mail, confere pra mim?',
  emailInvalido: 'Esse e-mail parece incompleto, confere pra mim?',
  escolha: 'Escolhe uma opção pra eu seguir.',
  multi: 'Marca pelo menos uma opção.',
  texto: 'Conta rapidinho, uma frase já ajuda.',
  longo: 'Esse texto passou do tamanho, dá pra resumir?',
  consentimento: 'Pra enviar, preciso que você concorde com o contato.',
};

// Retorna a mensagem de erro do campo ou '' se estiver tudo certo.
export function validarCampo(id, value) {
  const q = PERGUNTAS[id];
  if (!q) return MENSAGENS.escolha;

  if (q.type === 'chips-multi') {
    if (!Array.isArray(value) || !value.length) return MENSAGENS.multi;
    const allowed = new Set(q.options.map((o) => o.value));
    return value.every((v) => allowed.has(v)) ? '' : MENSAGENS.multi;
  }

  if (q.options) {
    return q.options.some((o) => o.value === value) ? '' : MENSAGENS.escolha;
  }

  const text = typeof value === 'string' ? value.trim() : '';
  if (text.length > q.max) return MENSAGENS.longo;

  if (id === 'whatsapp') {
    const digits = soDigitos(text);
    if (!digits) return MENSAGENS.whatsapp;
    // Celular com 10 dígitos: faltou um número (é o caso da tela de erro).
    if (digits.length < 10 || (digits.length === 10 && !ehFixo(digits))) return MENSAGENS.whatsapp;
    return whatsappValido(digits) ? '' : MENSAGENS.whatsappInvalido;
  }
  if (id === 'email') {
    if (!text) return MENSAGENS.email;
    return EMAIL.test(text) ? '' : MENSAGENS.emailInvalido;
  }
  if (q.optional) return '';
  if (text.length < 2) return id === 'nome' ? MENSAGENS.nome : MENSAGENS.texto;
  return '';
}

// --------------------------------------------------------------------------
// Score (0 a 9), calculado no servidor
// --------------------------------------------------------------------------
// Investimento: verba de anúncio (tráfego e os dois) ou valor do site (ramo site), 0 a 4.
// Início: 0 a 3. Já anuncia ou já tem site: +1. Objetivo claro (fora "Outro"): +1.
// 5 ou mais: chamar no mesmo dia.

const pontos = (id, value) => {
  const option = PERGUNTAS[id].options.find((o) => o.value === value);
  return option && option.score ? option.score : 0;
};

export function calcularScore(interesse, respostas) {
  const r = respostas || {};
  let score = 0;

  score += interesse === 'site' ? pontos('investimento_site', r.investimento_site) : pontos('verba', r.verba);
  score += pontos('inicio', r.inicio);
  score += interesse === 'site' ? pontos('tem_site', r.tem_site) : pontos('ja_anuncia', r.ja_anuncia);

  const objetivo = interesse === 'trafego' ? pontos('objetivo_anuncios', r.objetivo_anuncios) : pontos('objetivo_site', r.objetivo_site);
  score += objetivo;

  return Math.min(9, score);
}
