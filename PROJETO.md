# Projeto Thalyta Lucena · Guia mestre

> Documento de direcionamento para novos chats, alterações futuras e para a criação do **link da bio** e do **formulário**.
> Atualizado em 25/10/2026. Se algo mudar, atualize aqui e no `contexto/00-fundacao.md`.

**Como usar em um chat novo:** peça para ler este arquivo primeiro. Ele resume tudo e aponta para os arquivos detalhados.

---

## 1. Visão geral

Três peças, mesma marca, mesmo objetivo: gerar leads qualificados para **sites** (foco) e **tráfego pago** (upsell).

| Peça | Status | Endereço | Papel |
|---|---|---|---|
| Landing page (site principal) | **Pronta e publicada** | https://thalytalucena.vercel.app | Explica, prova e conduz ao formulário |
| Link da bio | A fazer | sugestão: `thalytaweb-link.vercel.app` | Converte o clique do Instagram @thalyta.web |
| Formulário em etapas | A fazer | sugestão: `thalytaweb-contato.vercel.app` | Qualifica e grava o lead |

Fluxo: Instagram → link da bio → formulário (principal), landing page ou WhatsApp. Anúncios → landing page → formulário. Todos repassam UTMs por query string.

> A Vercel não aceita subdomínio de subdomínio (`link.thalytalucena.vercel.app` não existe). Enquanto não houver domínio próprio (`{{DOMINIO}}`, Hostinger ou registro.br), cada peça terá seu próprio `*.vercel.app`. Com domínio: `{{DOMINIO}}`, `link.{{DOMINIO}}`, `contato.{{DOMINIO}}`.

---

## 2. Mapa de arquivos do repositório

```
thalytaweb/
├── PROJETO.md                ← este arquivo
├── contexto/
│   ├── 00-fundacao.md        fonte única: posicionamento, oferta, provas, voz, contatos, metas
│   ├── 01-link-da-bio.md     briefing do link da bio
│   ├── 02-landing-page.md    briefing da LP (copy base das seções)
│   ├── 03-formulario.md      briefing do formulário (fluxos, banco, score)
│   ├── 04-claude-design.md   direção de identidade visual e telas
│   ├── CLAUDE-linkbio.md     instruções de código do link da bio (`link-bio/`)
│   ├── CLAUDE-forms.md       instruções de código do formulário (`forms/`)
│   └── CLAUDE-lp.md          instruções de código da LP (versão original)
├── design system/
│   ├── design-system-thalyta-agencia.md   auditoria do layout de referência da Thalyta
│   └── loudly-studio-design-system.md     estrutura/ritmo de referência (Loudly Studio)
├── id visual/                01 Logotipo · 02 Cores e tipografia · 03 Formas, fotografia, mockups e voz · 04 Biblioteca de componentes
├── references/               layout de referência (PNG + HTML) e prints
├── print ref/                prints de referência (Loudly)
├── img/profile.jpeg          foto original
├── landing-page/             ← código da landing page publicada (ver landing-page/README.md)
├── link-bio/                 link da bio (ref/ = telas aprovadas, img/ = fotos e prints)
└── forms/                    formulário em etapas (ref/ = telas aprovadas, img/ = fotos e prints)
```

Monorepo: um único repositório no GitHub e um projeto Vercel por pasta, cada um com seu **Root Directory** (`landing-page`, `link-bio`, `forms`). Os documentos da raiz valem para as três peças.

**Preservar sempre:** `id visual/`, `references/`, `print ref/`, `design system/`, `img/`. São originais de referência.

---

## 3. Marca e negócio (resumo do 00)

- **Nome:** Thalyta Lucena · **Instagram:** @thalyta.web · Fortaleza/CE, atende o Brasil todo, 100% remoto.
- **Uma frase:** Eu crio o site que vende e os anúncios que levam gente até ele, tudo no mesmo plano, falando direto com você.
- **Público:** pequenos e médios empresários, com ou sem site, que já se frustraram com agência, freelancer ou IA.
- **Contatos:** WhatsApp (85) 99424-9599 (`5585994249599`) · thalucena9@gmail.com · CNPJ 51.890.738/0001-02.
- **Atendimento:** "respondo no mesmo dia útil". **Nunca publicar horário.**

### Oferta
| Serviço | Condição |
|---|---|
| Sites (institucional, venda, LP, portfólio, catálogo, e-commerce, link da bio) | Sob orçamento, **com taxa de manutenção mensal**. ~10 dias úteis após receber o material. 2 rodadas de ajuste. |
| Gestão de tráfego (Meta e Google) | A partir de **R$ 1.000/mês de honorário**, verba de anúncio à parte, **mínimo 3 meses**, implantação ~15 dias. |
| Estratégia de mídia paga | Diagnóstico, metas, distribuição de verba. |

Não usar mais "sem fidelidade".

### Diferenciais (nesta ordem)
1. Atendimento direto com quem planeja e executa. 2. Site e tráfego pensados juntos. 3. Site com SEO, GEO e AEO (resposta ao "faço com IA"). 4. Relatório em linguagem simples e reunião mensal. 5. Metas em faixas, nunca promessa. 6. 5 anos, +150 clientes, vários nichos.

### Provas autorizadas
- Números: +150 clientes · +R$ 20 milhões gerados · 5 anos.
- Cases: **Linda Colchões** (R$ 800 mil no 1º mês com R$ 22 mil em mídia, 36x) · **Tec Store** (R$ 982 → R$ 8.640, 8,8x, 210 conversas, R$ 3,50/conversa) · **Coronel Lucas** (132 mil visualizações, 53,2 mil de alcance, 2,1 mil cliques, 739 seguidores, ago/2026).
- Marcas (citação autorizada, em texto; logos só com autorização): Bluefit Academias, Decor Colors, FarmRio Latam, Unifor, UniVS, Unileão, Pixpel, ForFood, Blocok, Prime Plus.
- Depoimentos reais: Pedro (Clínica Longeva), Lucas (Lok Mob), Noemi Lucena. Texto exato em `contexto/00-fundacao.md`.
- Portfólio (5 sites, prints de 25/10/2026 em `landing-page/assets/img/portfolio/`):
  | Site | URL | Segmento |
  |---|---|---|
  | Lok Mob | https://lok-mob.vercel.app/ | aluguel de motos e carros (Fortaleza e Sobral) |
  | Esmalteria da Jana | https://esmalteria-da-jana.vercel.app/ | esmalteria (João Pessoa) |
  | Clínica Analice Sousa | https://www.clinicaanalicesousa.com/ | harmonização íntima masculina |
  | Clínica Longeva | https://clinicalongeva.com/ | fisioterapia e musculação terapêutica |
  | Noemi Lucena | https://noemilucena.vercel.app/ | videomaker e storymaker |

---

## 4. Regras inegociáveis

### Copy
- **Nunca travessão** (— ou –) em texto público.
- **Nunca** "isso não é X, é Y", "mas sim" ou variações.
- Frases curtas, verbos de ação, "você", primeira pessoa quando a Thalyta fala. Sem jargão. Sem promessa de resultado.
- Nomes de marcas e pessoas exatamente como o cliente definiu.
- Não reescrever a copy dos briefings sem avisar.

### Dados
- **Nenhum número, depoimento, logo ou resultado inventado.** O que não existe vira placeholder `{{NOME_DO_DADO}}`.
- Script de checagem de placeholders bloqueia o deploy se sobrar `{{`.

### Código e qualidade
- Cores em **hexadecimal**, medidas em **px**, media queries em px. Sem `rem`, `clamp()` ou Tailwind.
- Custom properties `var(--...)` **permitidas apenas como fonte única dos valores** (decisão tomada na LP; ver seção 7).
- Mobile first, alvos de toque ≥ 48px, contraste AA, foco visível, rótulos em todo campo, `alt` descritivo, `prefers-reduced-motion` respeitado.
- Todo texto em HTML real. Imagens WebP/AVIF com largura e altura definidas.
- Um H1 por página.

---

## 5. Identidade visual (como foi implementada na LP)

Direção: **estrutura e ritmo da Loudly Studio** (blocos arredondados sobre fundo escuro, header em pílulas, selo girando, cartões inclinados, letreiros, menu em tela cheia) com **apenas a paleta, as fontes e os detalhes da id visual da Thalyta**.

### Paleta (fonte: `landing-page/assets/css/tokens.css`)
| Papel | Token | Hex |
|---|---|---|
| Fundo dominante (moldura) | `--vinho` | `#3E0F19` |
| Cartão no escuro, hover | `--bordo-escuro` | `#5E1826` |
| Marca, blocos, CTA no claro | `--bordo` | `#7B2132` |
| Claro principal | `--creme` | `#F6EFE2` |
| Claro alternativo | `--creme-profundo` | `#EDE3D0` |
| Cartões | `--branco` | `#FFFFFF` |
| Acento: CTA no escuro, selo, chips | `--oliva` | `#B8C29A` |
| Hover oliva | `--oliva-hover` | `#CBD3AF` |
| Fundo suave | `--oliva-palida` | `#E4E6D0` |
| Apoio escuro | `--oliva-escura` | `#5E6B45` |
| Texto | `--marrom` | `#3A2F2A` |
| Texto suave | `--marrom-suave` | `#6B5F56` |
| Erro (formulário) | `--terracota` | `#A8361C` |
| Erro sobre escuro | `--terracota-clara` | `#F4A38C` |
| Linhas | `--linha-clara` `#F6EFE233` · `--linha-escura` `#3E0F1926` · `--grade` `#7B21321F` | |

Proporção 60/30/10: vinho/bordô · creme/branco · oliva.

### Tipografia
- **Bricolage Grotesque** (sans, eixos 400–800, `font-stretch` 75–100%): títulos em **800, condensado 75%, caixa alta**; texto corrido 16/26px.
- **Instrument Serif** (normal e itálico): **uma palavra ou expressão curta em itálico por título** (`<em>` dentro de `.h1/.h2`), e subtítulos (`.serif-sub`).
- Fontes locais em `landing-page/assets/fonts/` (woff2, subset latino). Reaproveitar os mesmos arquivos.
- Escala (mobile → ≥1200px): H1 46/44 → 88/80 · H2 38/38 → 64/60 · H3 display 26/28 → 34/34 · lead 18/30 · rótulo 12/16 com tracking 2px.
- **Sem eyebrows** (rótulos pequenos acima de títulos).
- Viúvas: `text-wrap: pretty` + `no-widows.js`.

### Formas e componentes
- Raios: bloco 32px (24px no mobile) · card 24px · pílula 999px.
- Sombra dura de destaque: `6px 6px 0 #3E0F19` (sm: `4px 4px 0`). Sombra suave: `0 18px 44px #3E0F1929`.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- `body` com fundo vinho e padding 8px (12px em telas maiores); cada seção é um `.block--{creme|branco|oliva|oliva-palida|bordo|vinho}` arredondado.
- Botões `.btn` pílula, min-height 56px, 16px/700, com ícone circular 40px (`.btn--icon`):
  - `.btn--bordo` (primário no claro, ícone oliva) · `.btn--oliva` (primário no escuro, hover com sombra dura creme) · `.btn--outline` / `.btn--outline-light` (secundários).
- Pílulas `.pill--{vinho|bordo|creme|branco|oliva}` para chips de prova e skills.
- Mockups `.browser` (barra + tela) para portfólio; selo circular girando; estrela; arco oliva no hero.
- Fotos da Thalyta em `landing-page/assets/img/` (retrato 4x5, avatar, duotone vinho e oliva). Retrato atual tem 640px; ideal ≥1000px.

---

## 6. Landing page (pronta)

Detalhes técnicos completos em `landing-page/README.md`.

- **Stack real:** HTML, CSS e JS puros (ES modules) + GSAP 3.12.5 + ScrollTrigger + Lenis 1.1.13 (em `assets/vendor/`). Sem build. Vercel com `cleanUrls`.
- **Páginas:** `/`, `/servicos`, `/portfolio`, `/processo`, `/duvidas`, `/politica-de-privacidade`.
- **Seções da home (`data-section`):** hero · dor · solucao · diferenciais · servicos · escolha · portfolio · provas · processo · investimento · faq · formulario · rodape.
- **H1:** "Seu site e seus anúncios trabalhando *juntos* para trazer clientes."
- **Config única:** `landing-page/assets/js/config.js` (`whatsapp`, `formUrl`, `gaId`, `metaPixelId`, mensagens de WhatsApp por interesse).
- **Comportamento dos CTAs (`links.js`):** com `formUrl` vazio, botões com interesse abrem o WhatsApp com mensagem certa e os genéricos levam a `/#diagnostico`. Com `formUrl` preenchido, abrem o formulário com `?interesse=site|trafego|ambos`, UTMs recebidos e `pagina_origem=landing_page`.
- **Eventos (`tracking.js`):** `view_section_<nome>`, `click_cta_<posicao>`, `select_interesse`, `click_whatsapp`, `click_site_<nome>`. Tags só carregam se os IDs estiverem preenchidos.
- **SEO/GEO/AEO:** JSON-LD `ProfessionalService`, `FAQPage`, `BreadcrumbList`, `Review` (sem nota); `sitemap.xml`, `robots.txt`, `llms.txt`, OG image.
- **Comandos:** `npm run dev` (localhost:4321) · `npm run check:copy` · `npm run check:placeholders`.
- **Testes de 25/10/2026:** Lighthouse mobile 93–98 de performance e 100 em acessibilidade, boas práticas e SEO; sem erros, sem rolagem horizontal em 1440/820/390.

**Atenção ao editar:** header, menu mobile, bloco "Por onde você quer começar?", rodapé e sprite de ícones se repetem nas 5 páginas. FAQ visível e JSON-LD devem ser editados juntos.

---

## 7. Divergências entre briefings e o que foi feito

Os arquivos `contexto/` foram escritos antes da implementação. Onde divergem, **vale o que está aqui**:

| Tema | Briefing original | Decisão vigente |
|---|---|---|
| Stack da LP | Astro | HTML/CSS/JS puros + GSAP + Lenis |
| `var(--...)` | Proibido | Permitido só como fonte única de valores hex/px |
| Paleta | Fundo creme dominante | **Vinho `#3E0F19` dominante** como moldura, blocos claros por cima |
| Fontes | Lora + Poppins (portfólio PDF) | **Bricolage Grotesque + Instrument Serif** |
| Texto suave | `#7A6F66` | `#6B5F56` (contraste AA) |
| Site | "sem fidelidade" | Taxa de manutenção mensal |
| Horário | "das 8h às 19h" (página de obrigado do 03) | **Sem horário.** Só "no mesmo dia útil" |
| Subdomínios | `link.` / `contato.` | `*.vercel.app` próprios até comprar domínio |
| Menu | Âncoras na página | Páginas próprias `/servicos`, `/portfolio`, `/processo`, `/duvidas` |

---

## 8. Direcionamento: Link da bio

Briefing completo: `contexto/01-link-da-bio.md` · instruções: `contexto/CLAUDE-linkbio.md`.

### Recomendação de stack
Seguir o mesmo padrão da LP: **HTML, CSS e JS puros**, página única, sem build. Reaproveitar de `landing-page/`: `tokens.css`, fontes, `no-widows.js`, padrão de `config.js` + `tracking.js`, botões `.btn`, pílulas, mockups `.browser` e os prints de `assets/img/portfolio/`. GSAP/Lenis **não** são necessários (página curta, meta < 1s); no máximo transições CSS, respeitando `prefers-reduced-motion`. Pasta `link-bio/` no monorepo, com projeto Vercel próprio (Root Directory `link-bio`).

> O briefing pede Astro e `links.ts`. **Decisão confirmada em 25/10/2026:** HTML, CSS e JS puros, como a LP, com um `links.js` (ou `config.js`) único com todos os links e textos.

### Estrutura (ordem fixa)
1. **Apresentação:** foto (`thalyta-avatar`), "Thalyta Lucena", @thalyta.web, linha "Sites que vendem e anúncios que trazem cliente, no mesmo plano.", chips `+150 clientes` · `+R$ 20 milhões gerados` · `5 anos de estrada`.
2. **Carrossel de serviços** (scroll-snap nativo, 1 card por vez, indicador de posição): Sites que convertem · Tráfego pago · Estratégia de mídia paga. Cada card: ícone, título, 1 frase, 3 itens, "Ver detalhes" → `https://thalytalucena.vercel.app/servicos`.
3. **Botão:** Ver a landing page.
4. **Botão principal (maior destaque, bordô):** Quero meu diagnóstico → formulário (enquanto não existir, WhatsApp com mensagem, mesma lógica da LP).
5. **Vitrine:** "Sites que já entreguei", 5 mockups com nome, segmento e link.
6. **Botão WhatsApp:** "Oi, Thalyta! Vim pelo Instagram e quero conversar sobre {{interesse}}" (`encodeURIComponent`). Resolver o `{{interesse}}` antes de publicar.
7. **Rodapé mínimo:** CNPJ, e-mail, link para `https://thalytalucena.vercel.app/politica-de-privacidade`.

### Técnico
- UTMs em todo link de saída: `utm_source=instagram&utm_medium=bio&utm_campaign=link_da_bio&utm_content=<id do botão>`.
- Eventos: `click_bio_lp`, `click_bio_form`, `click_bio_whatsapp`, `click_bio_site_<nome>`, `swipe_servicos`.
- Imagens WebP, máx. 800px, `loading="lazy"` fora da primeira dobra.
- Visual: mesmo `body` vinho com blocos arredondados; layout de coluna única (~390px) centralizado no desktop.

### Pronto quando
Lighthouse mobile ≥ 95 (performance e acessibilidade) · abre bem no navegador interno do Instagram (iOS e Android) · alvos ≥ 48px · sem `{{...}}` · `check:copy` sem erros.

---

## 9. Direcionamento: Formulário

Briefing completo: `contexto/03-formulario.md` · instruções: `contexto/CLAUDE-forms.md`.

### Stack
Next.js (App Router) + TypeScript + Supabase + Google Apps Script + Vercel. Aqui o framework se justifica (estado multi-etapas e rota de API com chave secreta). Estilo em CSS puro/CSS Modules usando os **mesmos tokens e fontes da LP**.

### Experiência
- Uma pergunta principal por tela (2–3 campos no máx.), "Etapa X de N", botão Voltar com respostas preservadas, teclado correto, opções em cards/chips, validação na hora com erro humano ("Faltou um número no WhatsApp, confere pra mim?"), cor de erro terracota.
- **Etapa 1** (nome, WhatsApp com máscara, e-mail, interesse: Tráfego pago · Site · Os dois) é salva ao avançar com `status = 'parcial'`.
- Ramos: **Site** (etapas 2–4) · **Tráfego** (2–5) · **Os dois** (2–6). Perguntas exatas no 03. Definir o fluxo de forma declarativa em `src/lib/fluxo.ts`.
- `?interesse=site|trafego|ambos` pula a escolha e começa na etapa 2. Aceita `utm_*` e `pagina_origem`.
- Consentimento (1 linha, última etapa) com link para a política de privacidade da LP.

### Página de obrigado
"Recebi seu pedido, obrigada." · texto **sem horário**: "Vou olhar suas respostas com calma e te chamo no WhatsApp no mesmo dia útil." · bloco "O que acontece agora" (3 passos) · botões WhatsApp e Instagram · dispara `generate_lead` com interesse e faixa de verba.

### Dados
- Supabase, tabela `leads` (campos no 03), RLS ligada, gravação só pela rota `/api/lead` com service role key no servidor.
- Apps Script envia cada lead (parcial e completo) para a planilha.
- Anti-spam: honeypot, limite por IP, validação com Zod.
- Score 0–9 no servidor (verba, início, já anuncia/tem site, objetivo claro). ≥ 5: chamar no mesmo dia.
- Env: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `APPS_SCRIPT_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`. Nunca versionar `.env`.

### Eventos
`form_start`, `form_step_1…N`, `form_abandon` (com etapa), `generate_lead` (GA4, Pixel `Lead`, Google Ads via GA4).

### Depois de publicar
Preencher `formUrl` em `landing-page/assets/js/config.js` (URL completa) e no link da bio. Testar os três ramos em iPhone e Android, linha na planilha em até 1 minuto, parcial → completo, honeypot e limite por IP.

---

## 10. Metas e mensuração
- Meta mensal: **50 leads e 5 reuniões** (10% de conversão lead → reunião).
- Cadeia de eventos: clique na bio → CTA da LP → início do formulário → etapas → lead → WhatsApp → reunião (manual na planilha).

---

## 11. Pendências gerais
1. Preencher `gaId` e `metaPixelId` em `landing-page/assets/js/config.js`.
2. Criar e publicar o formulário; preencher `formUrl`.
3. Criar e publicar o link da bio; trocar o link do perfil @thalyta.web.
4. Comprar domínio e migrar para `{{DOMINIO}}`, `link.` e `contato.`; atualizar sitemap, canonical, OG e `llms.txt`.
5. Retrato profissional ≥ 1000px.
6. Dados reais dos 5 sites do portfólio (leads, velocidade, posição no Google), se quiser exibir.
7. Atualizar o portfólio em PDF: @thalyta.web e WhatsApp novo.
8. Refazer prints do portfólio se algum site mudar (mesmo nome e tamanho).

---

## 12. Forma de trabalhar (para qualquer chat)
- Ler este arquivo e o `00-fundacao.md` antes de mexer.
- Sinalizar inconsistências antes de executar e esperar confirmação.
- Mudanças pontuais: não reescrever o que não foi pedido.
- Rodar `check:copy` e `check:placeholders` antes de todo deploy; nunca declarar teste como feito sem rodar.
- Ao terminar: listar o que foi feito, o que ficou pendente e como testar. Atualizar este arquivo quando uma decisão mudar.
- Responder em português do Brasil.
