// Configuração única da landing page. Para mudar contato ou destino, edite aqui.

export const CONFIG = {
  // WhatsApp com DDI + DDD, só números.
  whatsapp: '5585994249599',

  // Formulário em etapas (forms/site, projeto Vercel contatothalyta).
  // Os botões abrem com ?interesse= do card/serviço, as UTMs recebidas e pagina_origem=landing_page.
  // Vazio = os botões de diagnóstico voltam a abrir o WhatsApp com a mensagem do interesse.
  formUrl: 'https://contatothalyta.vercel.app/',

  // IDs de medição. Vazio = a tag não carrega.
  gaId: '',
  metaPixelId: '',
};

export const WHATSAPP_MESSAGES = {
  default: 'Oi, Thalyta! Vim pelo site e quero conversar sobre site e anúncios.',
  site: 'Oi, Thalyta! Vim pelo site e quero meu diagnóstico para um site.',
  trafego: 'Oi, Thalyta! Vim pelo site e quero meu diagnóstico para tráfego pago.',
  ambos: 'Oi, Thalyta! Vim pelo site e quero meu diagnóstico para site e tráfego pago.',
};

export const isConfigured = (value) => Boolean(value) && !value.includes('{{');
