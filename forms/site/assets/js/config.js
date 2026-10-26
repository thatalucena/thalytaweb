// Configuração única do formulário. Para mudar contato, destino ou medição, edite aqui.
// As perguntas ficam em fluxo.js; as chaves secretas ficam só nas variáveis de ambiente da Vercel.

export const CONFIG = {
  // WhatsApp com DDI + DDD, só números.
  whatsapp: '5585994249599',
  instagram: 'https://www.instagram.com/thalyta.web/',
  privacidade: 'https://thalytalucena.vercel.app/politica-de-privacidade',

  // Rota da API (mesmo projeto Vercel).
  api: '/api/lead',

  // IDs de medição. Vazio = a tag não carrega.
  gaId: '',
  metaPixelId: '',
};

export const WHATSAPP_MESSAGES = {
  obrigado: 'Oi, Thalyta! Acabei de enviar o formulário de diagnóstico.',
};

export const isConfigured = (value) => Boolean(value) && !value.includes('{{');

export const whatsappUrl = (message) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
