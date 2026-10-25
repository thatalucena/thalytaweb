# 03 Briefing: Formulário de captação

## Objetivo
**Qualificar.** Cada resposta ajuda a decidir, na planilha, quem vira reunião. O formulário é uma página própria, em etapas, pensada para celular.

## Regras de experiência
- Uma pergunta principal por tela. 2 a 3 campos no máximo.
- Barra de progresso com número da etapa ("Etapa 2 de 5").
- Botão Voltar sempre disponível. Respostas preservadas.
- Teclado certo para cada campo (telefone, e-mail).
- Opções de toque para o que for escolha (cards ou chips), texto livre só quando necessário.
- Validação na hora, mensagem de erro humana. Exemplo: "Faltou um número no WhatsApp, confere pra mim?"
- **A etapa 1 é salva assim que for enviada** (status `parcial`). Se a pessoa abandonar depois, você ainda tem o contato.
- Conversão registrada apenas no envio final.

## Fluxo

### Etapa 1: contato (todos)
- Nome
- WhatsApp (máscara brasileira)
- E-mail
- Você está buscando: **Tráfego pago** · **Site** · **Os dois**
- Ao avançar, o fluxo se ramifica.

### Ramo SITE (interesse = site)
**Etapa 2:** Que tipo de site? (seleção única) Institucional · Venda · Apresentação · Portfólio · Landing page · E-commerce · Link da bio · Catálogo fixo. Depois: O que você vende ou oferece? (texto curto)
**Etapa 3:** Qual é o principal objetivo do site? (texto curto ou chips: receber contatos, vender online, apresentar a empresa, outro). Qual é o público-alvo? (texto curto)
**Etapa 4:** Quando você quer começar? (Agora, em até 30 dias, em 1 a 3 meses, só estou pesquisando). Tem algo mais que eu deva saber? (opcional) + consentimento + Enviar.

### Ramo TRÁFEGO (interesse = trafego)
**Etapa 2:** O que você vende ou oferece? · Por onde você vende hoje? (chips: loja física, WhatsApp, Instagram, site, marketplace, outro) · Em qual cidade ou região você atende?
**Etapa 3:** Com que frequência você posta nas redes? (todo dia, algumas vezes na semana, de vez em quando, não posto) · Quem produz o conteúdo? (eu mesmo, funcionário, agência ou freelancer, ninguém) · Você já anuncia? (sim, já anunciei e parei, nunca anunciei)
**Etapa 4:** Qual é o principal objetivo? (chips: mais mensagens no WhatsApp, mais vendas online, mais clientes na loja, mais seguidores, outro) · Onde quer anunciar? (Meta, Google, os dois, não sei) · Quanto pode investir em anúncios por mês? (Até R$ 1.000 · R$ 1.000 a 3.000 · R$ 3.000 a 7.000 · R$ 7.000 a 15.000 · Acima de R$ 15.000 · Ainda não sei)
**Etapa 5:** Onde você quer que o negócio esteja daqui a 3 meses? (texto curto) · Quando quer começar? · Tem algo mais que eu deva saber? (opcional) + consentimento + Enviar.

### Ramo OS DOIS (interesse = ambos)
Junta os dois ramos sem repetir perguntas:
**Etapa 2:** Que tipo de site? + O que você vende ou oferece? + Em qual cidade ou região você atende?
**Etapa 3:** Objetivo principal + Público-alvo + Por onde você vende hoje?
**Etapa 4:** Posts, quem produz, já anuncia.
**Etapa 5:** Onde anunciar, verba mensal, objetivo dos anúncios.
**Etapa 6:** Onde estar em 3 meses, quando começar, algo mais (opcional) + consentimento + Enviar.

### Consentimento (uma linha, na última etapa)
> Ao enviar, você concorda em ser contatado por WhatsApp e e-mail sobre este pedido. Seus dados ficam só comigo. [Política de privacidade]

### Pré-seleção por link
`/?interesse=site|trafego|ambos` pula a pergunta de interesse e começa na etapa 2. Também aceita `utm_*`.

## Página de obrigado
- **Título:** Recebi seu pedido, obrigada.
- Texto: Vou olhar suas respostas com calma e te chamo no WhatsApp no mesmo dia útil, das 8h às 19h.
- Bloco "O que acontece agora": 1 Eu analiso seu perfil · 2 Te chamo para uma conversa rápida · 3 Você recebe meu fluxo de trabalho e, se já tem site ou anúncio, uma análise.
- Botão: Falar agora no WhatsApp. Segundo botão: Ver meu Instagram (@thalyta.web).
- Dispara o evento de conversão principal (`generate_lead`), com o interesse e a faixa de verba como parâmetros.

## Dados e leads

### Supabase, tabela `leads`
| Campo | Tipo | Observação |
|---|---|---|
| id | uuid | chave |
| created_at / updated_at | timestamptz | |
| status | text | `parcial`, `completo`, `contatado`, `reuniao`, `descartado` |
| nome, whatsapp, email | text | |
| interesse | text | trafego, site, ambos |
| respostas | jsonb | todas as perguntas do ramo |
| faixa_verba | text | pesquisável |
| inicio | text | |
| utm_source, utm_medium, utm_campaign, utm_content, utm_term | text | |
| referrer, pagina_origem | text | |
| consentimento | boolean | e data |
| score | int | calculado |

- Segurança: RLS ligada. Inserção e leitura só pela rota de API do servidor com a service role key. A chave nunca vai para o navegador.
- Anti-spam: campo honeypot invisível, limite de envios por IP, validação no servidor.

### Planilha do Google
Cada lead (parcial e completo) cai em uma planilha via Apps Script (a rota de API faz o POST). Colunas: data, nome, WhatsApp (link clicável), e-mail, interesse, faixa de verba, início, cidade, objetivo, resumo das respostas, origem (UTM), status, score, responsável, observações, data do contato, reunião marcada (sim/não).

### Score sugerido (para você priorizar)
- Verba: Até R$ 1.000 (0) · R$ 1.000 a 3.000 (2) · R$ 3.000 a 7.000 (3) · acima (4)
- Início: Agora (3) · até 30 dias (2) · 1 a 3 meses (1) · pesquisando (0)
- Já anuncia ou já tem site: +1
- Objetivo claro preenchido: +1
- Vai de 0 a 9. Sugestão: 5 ou mais, chamar no mesmo dia.

## Rastreamento
`form_start`, `form_step_1` a `form_step_N`, `form_abandon` (com a etapa), `generate_lead`. Meta Pixel (Lead), Google Ads (conversão importada do GA4), GA4.

## Stack e hospedagem
- Next.js (App Router) para o estado multi-etapas e a rota de API.
- Supabase e Apps Script. Vercel. Subdomínio: `contato.{{DOMINIO}}`.

## Critérios de pronto
- Teste completo nos três ramos em iPhone e Android.
- Etapa 1 salva como `parcial` e atualizada para `completo`.
- Linha aparece na planilha em até 1 minuto.
- Honeypot e limite por IP testados.
- Lighthouse mobile 95 ou mais. Nenhum `{{...}}` no build final.
