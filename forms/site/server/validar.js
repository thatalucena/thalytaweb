// Validação do que chega do navegador: formato com Zod e regras de cada
// pergunta com o mesmo fluxo.js que monta as telas.

import { z } from 'zod';
import { INTERESSES, MENSAGENS, camposDoRamo, validarCampo, soDigitos } from '../assets/js/fluxo.js';

const texto = (max) => z.string().trim().max(max).optional().default('');
const resposta = z.union([z.string().max(600), z.array(z.string().max(80)).max(10)]);

const PAYLOAD = z.object({
  acao: z.enum(['parcial', 'completo']),
  id: z.uuid().optional(),
  token: z.string().regex(/^[a-f0-9]{48}$/).optional(),
  contato: z.object({
    nome: z.string().max(80),
    whatsapp: z.string().max(20),
    email: z.string().max(120),
    interesse: z.enum(Object.keys(INTERESSES)),
  }),
  respostas: z.record(z.string().max(40), resposta).optional().default({}),
  consentimento: z.boolean().optional().default(false),
  origem: z.object({
    utm_source: texto(120),
    utm_medium: texto(120),
    utm_campaign: texto(120),
    utm_content: texto(120),
    utm_term: texto(120),
    referrer: texto(500),
    pagina_origem: texto(60),
  }).optional().default({}),
  // Honeypot: campo invisível. Gente de verdade nunca preenche.
  empresa_site: z.string().max(200).optional().default(''),
});

// Retorna { ok: true, dados } ou { ok: false, erros: { campo: mensagem } }.
export function validarPedido(body) {
  const parsed = PAYLOAD.safeParse(body);
  if (!parsed.success) return { ok: false, erros: { geral: 'Formato inválido.' } };

  const dados = parsed.data;
  const erros = {};

  ['nome', 'whatsapp', 'email', 'interesse'].forEach((id) => {
    const erro = validarCampo(id, dados.contato[id]);
    if (erro) erros[id] = erro;
  });

  // Só as perguntas do ramo escolhido entram; o resto é descartado.
  const respostas = {};
  if (dados.acao === 'completo') {
    camposDoRamo(dados.contato.interesse).forEach((id) => {
      const valor = dados.respostas[id];
      const erro = validarCampo(id, valor);
      if (erro) erros[id] = erro;
      else if (valor !== undefined && valor !== '') respostas[id] = typeof valor === 'string' ? valor.trim() : valor;
    });
    if (!dados.consentimento) erros.consentimento = MENSAGENS.consentimento;
  }

  if (Object.keys(erros).length) return { ok: false, erros };

  return {
    ok: true,
    dados: {
      ...dados,
      respostas,
      contato: {
        nome: dados.contato.nome.trim(),
        whatsapp: soDigitos(dados.contato.whatsapp),
        email: dados.contato.email.trim().toLowerCase(),
        interesse: dados.contato.interesse,
      },
    },
  };
}
