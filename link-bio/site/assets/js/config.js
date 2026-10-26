// Configuração única do link da bio. Para mudar contato, destino ou medição, edite aqui.
// Os textos ficam no index.html (HTML real, para leitura rápida e acessível).

export const CONFIG = {
  // WhatsApp com DDI + DDD, só números.
  whatsapp: '5585994249599',

  // Formulário em etapas (pasta forms/, ainda não publicado).
  // Vazio = "Quero meu diagnóstico" abre o WhatsApp com a mensagem de diagnóstico.
  // Quando publicar, coloque a URL completa: 'https://contatothalyta.vercel.app/'.
  formUrl: '',

  // IDs de medição. Vazio = a tag não carrega.
  gaId: '',
  metaPixelId: '',

  // UTMs fixas de todo link de saída. utm_content recebe o data-out de cada botão.
  utm: {
    utm_source: 'instagram',
    utm_medium: 'bio',
    utm_campaign: 'link_da_bio',
  },
};

export const WHATSAPP_MESSAGES = {
  conversa: 'Oi, Thalyta! Vim pelo Instagram e quero conversar sobre site e anúncios.',
  diagnostico: 'Oi, Thalyta! Vim pelo Instagram e quero meu diagnóstico.',
};

export const isConfigured = (value) => Boolean(value) && !value.includes('{{');
