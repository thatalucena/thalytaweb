// Testes da rota /api/lead com o banco em memória (sem Supabase e sem planilha). Uso: npm test

import test from 'node:test';
import assert from 'node:assert/strict';

process.env.LEAD_STORE = 'memory';
delete process.env.APPS_SCRIPT_URL;

const { default: handler } = await import('../api/lead.js');
const { memoriaLocal } = await import('../server/banco.js');

let ipSeq = 0;
async function chamar(body, { ip, method = 'POST' } = {}) {
  const req = { method, body, headers: { 'x-forwarded-for': ip || `10.0.0.${++ipSeq}` } };
  const res = {
    statusCode: 200, headers: {}, data: null,
    setHeader(k, v) { this.headers[k] = v; },
    status(code) { this.statusCode = code; return this; },
    json(data) { this.data = data; return this; },
  };
  await handler(req, res);
  return res;
}

const contato = { nome: 'Ana Paula', whatsapp: '(85) 9 9812-4471', email: 'Ana@LojaDaAna.com.br', interesse: 'site' };
const respostasSite = {
  tipo_site: 'Landing page', oferta: 'Moda feminina', tem_site: 'Ainda não tenho',
  objetivo_site: 'Receber contatos', publico: 'Mulheres de 25 a 45 anos', investimento_site: 'R$ 3.000 a 5.000',
  inicio: 'Em até 30 dias', extra: '',
  verba: 'Acima de R$ 15.000', // de outro ramo: precisa ser descartado
};

test('GET é recusado', async () => {
  const res = await chamar(undefined, { method: 'GET' });
  assert.equal(res.statusCode, 405);
});

test('parcial cria, atualiza e o completo fecha o mesmo registro', async () => {
  const parcial = await chamar({ acao: 'parcial', contato, origem: { utm_source: 'instagram', pagina_origem: 'link_da_bio' } });
  assert.equal(parcial.statusCode, 200);
  assert.ok(parcial.data.id && parcial.data.token);

  const row = memoriaLocal.rows.get(parcial.data.id);
  assert.equal(row.status, 'parcial');
  assert.equal(row.whatsapp, '85998124471');
  assert.equal(row.email, 'ana@lojadaana.com.br');
  assert.equal(row.utm_source, 'instagram');
  assert.ok(row.ip_hash && !row.ip_hash.includes('10.0.0'), 'guarda só o hash do IP');

  const corrigido = await chamar({ acao: 'parcial', id: parcial.data.id, token: parcial.data.token, contato: { ...contato, nome: 'Ana' } });
  assert.equal(corrigido.data.id, parcial.data.id);
  assert.equal(memoriaLocal.rows.get(parcial.data.id).nome, 'Ana');

  const completo = await chamar({
    acao: 'completo', id: parcial.data.id, token: parcial.data.token, contato, respostas: respostasSite, consentimento: true,
  });
  assert.equal(completo.statusCode, 200);
  const final = memoriaLocal.rows.get(parcial.data.id);
  assert.equal(final.status, 'completo');
  assert.equal(final.faixa_site, 'R$ 3.000 a 5.000');
  assert.equal(final.faixa_verba, null, 'verba de outro ramo descartada');
  assert.equal(final.respostas.verba, undefined);
  assert.equal(final.score, 3 + 2 + 0 + 1);
  assert.equal(final.consentimento, true);
  assert.ok(final.consentimento_em);
});

test('completo sem parcial (ou com token errado) cria registro novo', async () => {
  const antes = memoriaLocal.rows.size;
  const res = await chamar({
    acao: 'completo', id: crypto.randomUUID(), token: 'a'.repeat(48), contato, respostas: respostasSite, consentimento: true,
  });
  assert.equal(res.statusCode, 200);
  assert.equal(memoriaLocal.rows.size, antes + 1);
  assert.equal(memoriaLocal.rows.get(res.data.id).status, 'completo');
});

test('validação no servidor devolve os campos com erro', async () => {
  const res = await chamar({
    acao: 'completo', contato: { ...contato, whatsapp: '(85) 9 98' }, respostas: { ...respostasSite, tipo_site: 'Inventado' }, consentimento: false,
  });
  assert.equal(res.statusCode, 422);
  assert.ok(res.data.campos.whatsapp);
  assert.ok(res.data.campos.tipo_site);
  assert.ok(res.data.campos.consentimento);
});

test('formato inválido é recusado', async () => {
  const res = await chamar({ acao: 'apagar', contato });
  assert.equal(res.statusCode, 422);
});

test('honeypot preenchido responde ok e não grava', async () => {
  const antes = memoriaLocal.rows.size;
  const res = await chamar({ acao: 'parcial', contato, empresa_site: 'http://spam.example' });
  assert.equal(res.statusCode, 200);
  assert.equal(memoriaLocal.rows.size, antes);
});

test('limite de 5 registros novos por IP por hora', async () => {
  const ip = '203.0.113.9';
  for (let i = 0; i < 5; i++) {
    const res = await chamar({ acao: 'parcial', contato }, { ip });
    assert.equal(res.statusCode, 200, `envio ${i + 1}`);
  }
  const bloqueado = await chamar({ acao: 'parcial', contato }, { ip });
  assert.equal(bloqueado.statusCode, 429);
});
