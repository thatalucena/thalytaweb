// Configuração única da landing page. Para mudar contato ou destino, edite aqui.

export const CONFIG = {
  // WhatsApp com DDI + DDD, só números.
  whatsapp: '5585994249599',

  // Formulário em etapas (repositório próprio, ainda não publicado).
  // Vazio = os botões de diagnóstico abrem o WhatsApp com a mensagem do interesse.
  // Quando publicar, coloque a URL completa, por exemplo 'https://thalytaweb-contato.vercel.app/'.
  formUrl: '',

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
