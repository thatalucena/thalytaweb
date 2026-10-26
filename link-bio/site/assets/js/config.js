// Configuração única do link da bio. Para mudar contato, destino ou medição, edite aqui.
// Os textos ficam no index.html (HTML real, para leitura rápida e acessível).

export const CONFIG = {
  // WhatsApp com DDI + DDD, só números.
  whatsapp: '5585994249599',

  // Formulário em etapas (forms/site, projeto Vercel contatothalyta).
  // "Quero meu diagnóstico" abre com as UTMs da bio e pagina_origem=link_da_bio.
  // Vazio = volta a abrir o WhatsApp com a mensagem de diagnóstico.
  formUrl: 'https://contatothalyta.vercel.app/',

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
