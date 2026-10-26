// POST /api/lead · grava o lead no Supabase e manda para a planilha.
//
// acao "parcial": etapa 1 (contato). Cria o registro com status parcial e devolve id + token.
//   Se vier id + token, atualiza o contato do mesmo registro (a pessoa voltou e corrigiu).
// acao "completo": última etapa. Com id + token atualiza o parcial para completo;
//   sem eles (a etapa 1 não chegou a salvar), cria o registro já completo.
//
// A chave do Supabase fica só aqui, nas variáveis de ambiente da Vercel.

import { createHash, randomBytes } from 'node:crypto';
import { calcularScore } from '../assets/js/fluxo.js';
import { validarPedido } from '../server/validar.js';
import { banco } from '../server/banco.js';
import { enviarParaPlanilha } from '../server/planilha.js';

// Limite por IP: no máximo 5 registros novos por hora. Atualizações não contam.
const LIMITE = 5;
const JANELA_MS = 60 * 60 * 1000;

const MSG_ERRO = 'Não consegui enviar. Confere sua internet e tenta de novo, suas respostas continuam aqui.';
const MSG_LIMITE = 'Recebi muitos envios daqui agora. Tenta de novo daqui a pouco ou me chama no WhatsApp.';

function ipDe(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return forwarded || String(req.headers['x-real-ip'] || '') || 'desconhecido';
}

// Guardo só o hash do IP, nunca o IP em si.
const hashIp = (ip) => createHash('sha256').update(`thalyta-forms:${ip}`).digest('hex').slice(0, 32);

function camposDoLead(dados) {
  const { contato, origem } = dados;
  return {
    nome: contato.nome,
    whatsapp: contato.whatsapp,
    email: contato.email,
    interesse: contato.interesse,
    utm_source: origem.utm_source || null,
    utm_medium: origem.utm_medium || null,
    utm_campaign: origem.utm_campaign || null,
    utm_content: origem.utm_content || null,
    utm_term: origem.utm_term || null,
    referrer: origem.referrer || null,
    pagina_origem: origem.pagina_origem || null,
  };
}

function camposDoEnvio(dados) {
  const r = dados.respostas;
  const interesse = dados.contato.interesse;
  return {
    status: 'completo',
    respostas: r,
    faixa_verba: r.verba || null,
    faixa_site: r.investimento_site || null,
    inicio: r.inicio || null,
    cidade: r.cidade || null,
    objetivo: (interesse === 'trafego' ? r.objetivo_anuncios : r.objetivo_site) || null,
    consentimento: true,
    consentimento_em: new Date().toISOString(),
    score: calcularScore(interesse, r),
  };
}

async function criar(db, req, registro) {
  const ipHash = hashIp(ipDe(req));
  const recentes = await db.contarRecentes(ipHash, new Date(Date.now() - JANELA_MS));
  if (recentes >= LIMITE) return { limite: true };

  const token = randomBytes(24).toString('hex');
  const row = await db.inserir({ ...registro, edit_token: token, ip_hash: ipHash });
  return { row, token };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, erro: 'Use POST.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = null; }
  }

  // Honeypot preenchido: responde como sucesso e não grava nada.
  if (body && typeof body.empresa_site === 'string' && body.empresa_site.trim()) {
    return res.status(200).json({ ok: true });
  }

  const validacao = validarPedido(body);
  if (!validacao.ok) {
    return res.status(422).json({ ok: false, erro: 'Confere os campos marcados.', campos: validacao.erros });
  }

  const dados = validacao.dados;
  const db = banco();

  try {
    let row = null;
    let token = dados.token;

    if (dados.acao === 'parcial') {
      if (dados.id && token) {
        row = await db.atualizar(dados.id, token, camposDoLead(dados), { status: 'parcial' });
      }
      if (!row) {
        const criado = await criar(db, req, { status: 'parcial', ...camposDoLead(dados) });
        if (criado.limite) return res.status(429).json({ ok: false, erro: MSG_LIMITE });
        ({ row, token } = criado);
      }
    } else {
      const campos = { ...camposDoLead(dados), ...camposDoEnvio(dados) };
      if (dados.id && token) {
        row = await db.atualizar(dados.id, token, campos);
      }
      if (!row) {
        const criado = await criar(db, req, campos);
        if (criado.limite) return res.status(429).json({ ok: false, erro: MSG_LIMITE });
        ({ row, token } = criado);
      }
    }

    // A Vercel encerra a função depois da resposta: espera a planilha (com limite de tempo).
    await enviarParaPlanilha(row);

    return res.status(200).json({ ok: true, id: row.id, token });
  } catch (error) {
    console.error('Erro ao gravar o lead', error);
    return res.status(500).json({ ok: false, erro: MSG_ERRO });
  }
}
