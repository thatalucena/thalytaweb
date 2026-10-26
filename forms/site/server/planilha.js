// Envia o lead para a planilha do Google pelo Apps Script (forms/apps-script/Code.gs).
// O script atualiza a linha pelo id: o parcial vira completo na mesma linha.
// Falha na planilha não derruba o envio; o lead já está salvo no Supabase.

import { PERGUNTAS } from '../assets/js/fluxo.js';

const TIMEOUT = 5000;

function resumo(respostas) {
  return Object.entries(respostas || {})
    .filter(([id]) => !['cidade', 'inicio', 'verba', 'investimento_site'].includes(id))
    .map(([id, valor]) => `${PERGUNTAS[id] ? PERGUNTAS[id].label : id}: ${Array.isArray(valor) ? valor.join(', ') : valor}`)
    .join(' | ');
}

export function linhaDaPlanilha(row) {
  const r = row.respostas || {};
  return {
    id: row.id,
    data: row.created_at,
    atualizado: row.updated_at,
    status: row.status,
    nome: row.nome,
    whatsapp: row.whatsapp,
    email: row.email,
    interesse: row.interesse,
    faixa_verba: row.faixa_verba || '',
    faixa_site: row.faixa_site || '',
    inicio: row.inicio || '',
    cidade: row.cidade || '',
    objetivo: row.objetivo || '',
    resumo: resumo(r),
    origem: [row.utm_source, row.utm_medium, row.utm_campaign, row.utm_content].filter(Boolean).join(' / ') || row.pagina_origem || '',
    pagina_origem: row.pagina_origem || '',
    score: row.score ?? '',
  };
}

export async function enviarParaPlanilha(row) {
  const url = process.env.APPS_SCRIPT_URL;
  if (!url) return { ok: false, motivo: 'APPS_SCRIPT_URL vazia' };

  try {
    const response = await fetch(url, {
      method: 'POST',
      // text/plain evita o preflight; o Apps Script lê o corpo como texto.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ segredo: process.env.APPS_SCRIPT_SECRET || '', lead: linhaDaPlanilha(row) }),
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const text = await response.text();
    if (!response.ok || !text.includes('"ok":true')) {
      console.error('Planilha recusou o lead', response.status, text.slice(0, 200));
      return { ok: false };
    }
    return { ok: true };
  } catch (error) {
    console.error('Planilha indisponível', error.message);
    return { ok: false };
  }
}
