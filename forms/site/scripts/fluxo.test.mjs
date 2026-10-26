// Testes da definição do fluxo, da validação e do score. Uso: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { PERGUNTAS, RAMOS, etapas, totalEtapas, validarCampo, whatsappValido, calcularScore, MENSAGENS } from '../assets/js/fluxo.js';

test('cada ramo tem o número de etapas das telas', () => {
  assert.equal(totalEtapas('site'), 4);
  assert.equal(totalEtapas('trafego'), 5);
  assert.equal(totalEtapas('ambos'), 6);
  assert.equal(totalEtapas(''), 4, 'antes da escolha mostra "de 4"');
});

test('no máximo 3 campos por etapa e toda pergunta existe', () => {
  Object.keys(RAMOS).forEach((ramo) => {
    etapas(ramo).forEach((etapa) => {
      const campos = etapa.campos.filter((c) => c.id !== 'interesse');
      assert.ok(campos.length <= 3, `${etapa.id} tem ${campos.length} campos`);
      etapa.campos.forEach((c) => assert.ok(PERGUNTAS[c.id], `pergunta ${c.id} não existe`));
    });
  });
});

test('ramo site pergunta se já tem site e quanto quer investir', () => {
  const ids = RAMOS.site.flatMap((e) => e.campos.map((c) => c.id));
  assert.ok(ids.includes('tem_site'));
  assert.ok(ids.includes('investimento_site'));
});

test('a última etapa de cada ramo tem início e campo opcional', () => {
  Object.values(RAMOS).forEach((ramo) => {
    const ids = ramo.at(-1).campos.map((c) => c.id);
    assert.ok(ids.includes('inicio'));
    assert.ok(ids.includes('extra'));
  });
});

test('WhatsApp: celular, fixo e erros humanos', () => {
  assert.ok(whatsappValido('(85) 9 9812-4471'));
  assert.ok(whatsappValido('8532124471'));
  assert.ok(!whatsappValido('(85) 8 9812-4471'), 'celular sem o 9');
  assert.ok(!whatsappValido('(05) 9 9812-4471'), 'DDD inválido');
  assert.equal(validarCampo('whatsapp', '(85) 9 9812-447'), MENSAGENS.whatsapp, 'celular com um número a menos');
  assert.equal(validarCampo('whatsapp', '(85) 3212-4471'), '', 'fixo');
  assert.equal(validarCampo('whatsapp', '(85) 9 9812-44'), MENSAGENS.whatsapp);
  assert.equal(validarCampo('whatsapp', ''), MENSAGENS.whatsapp);
});

test('e-mail, nome, opções e campo opcional', () => {
  assert.equal(validarCampo('email', 'ana@lojadaana.com.br'), '');
  assert.equal(validarCampo('email', 'ana@loja'), MENSAGENS.emailInvalido);
  assert.equal(validarCampo('nome', ''), MENSAGENS.nome);
  assert.equal(validarCampo('interesse', 'site'), '');
  assert.equal(validarCampo('interesse', 'outra'), MENSAGENS.escolha);
  assert.equal(validarCampo('canais', []), MENSAGENS.multi);
  assert.equal(validarCampo('canais', ['WhatsApp', 'Instagram']), '');
  assert.equal(validarCampo('canais', ['Inventado']), MENSAGENS.multi);
  assert.equal(validarCampo('extra', ''), '');
  assert.equal(validarCampo('extra', 'x'.repeat(601)), MENSAGENS.longo);
});

test('score de 0 a 9 nos três ramos', () => {
  assert.equal(calcularScore('site', {
    investimento_site: 'Acima de R$ 5.000', inicio: 'Agora', tem_site: 'Sim, já tenho', objetivo_site: 'Vender online',
  }), 9);
  assert.equal(calcularScore('site', {
    investimento_site: 'Ainda não sei', inicio: 'Só estou pesquisando', tem_site: 'Ainda não tenho', objetivo_site: 'Outro',
  }), 0);
  assert.equal(calcularScore('site', {
    investimento_site: 'R$ 1.000 a 3.000', inicio: 'Em até 30 dias', tem_site: 'Ainda não tenho', objetivo_site: 'Receber contatos',
  }), 5, 'lead de site comum já pode chegar a 5');
  assert.equal(calcularScore('trafego', {
    verba: 'R$ 1.000 a 3.000', inicio: 'Agora', ja_anuncia: 'Já anunciei e parei', objetivo_anuncios: 'Mais mensagens no WhatsApp',
  }), 7);
  assert.equal(calcularScore('ambos', {
    verba: 'Acima de R$ 15.000', inicio: 'Agora', ja_anuncia: 'Sim', objetivo_site: 'Receber contatos',
  }), 9);
});
