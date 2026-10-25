# Design System — Landing Page Thalyta | Agência

> **Auditoria visual e especificação para reconstrução de interface**  
> Fonte: captura fornecida pelo usuário, arquivo `Landing page · desktop 1440@1x.png`.  
> **Precisão:** a imagem disponibilizada possui **368 × 2048 px**, apesar de seu nome mencionar 1440. Portanto, a análise de hierarquia, composição, cores chapadas e relações espaciais é observacional; **medidas originais em CSS, nomes de fontes, estados interativos, microanimações, HTML e comportamento em mobile não podem ser confirmados**. Valores numéricos não obtidos diretamente são *propostas de implementação*, não dados extraídos. A captura termina no início de “Como funciona”; o conteúdo posterior não está visível.

---

## 1. Resumo executivo

Landing page de agência/personal brand com direção **editorial retrô-contemporânea**, alto contraste, tipografia expressiva e blocos cromáticos alternados. A página combina linguagem de conversão (“site”, “anúncios”, “retorno”) com credibilidade (anos de atuação, clientes, faturamento, resultados), portfólio e CTAs de baixa fricção. A atmosfera remete a impresso vintage atualizado: serif itálica em palavras de ênfase, grandes títulos sans condensados, selos circulares, filetes, cores terrosas e cartões geometricamente simples.

**Princípios visuais:**
1. Uma mensagem central e uma ação principal por seção.
2. Tipografia é o principal elemento gráfico; imagens e mockups são auxiliares.
3. Contraste entre seções escuras densas e seções claras de respiro.
4. Títulos em caixa alta, de largura visual reduzida e entrelinha comprimida.
5. Expressões em serif itálica quebram a rigidez do texto sans.
6. Cards sem sombra ou com sombra praticamente inexistente.
7. Verde-sálvia e vinho médio como superfícies de destaque, sem gradientes chamativos.
8. Uso pontual de elementos ornamentais: estrela, selo serrilhado, linha divisória, pequenos ícones.

## 2. Inventário cromático

### 2.1 Cores medidas na rasterização recebida

As amostras dominantes abaixo foram identificadas pela repetição exata de RGB na imagem. Há confiança **alta** nesses valores *dentro do PNG recebido*, não necessariamente nos tokens originais do Figma.

| Token sugerido | HEX | RGB | Função observada | Confiança |
|---|---|---|---|---|
| `--color-wine-950` | `#3E0F19` | 62,15,25 | Hero, nav, serviços, portfólio escuro, resultados | Alta |
| `--color-wine-700` | `#7B2132` | 123,33,50 | Faixa de processo, cards e destaque nos resultados | Alta |
| `--color-cream-100` | `#F6EFE2` | 246,239,226 | Superfície clara primária, seções de conteúdo | Alta |
| `--color-beige-200` | `#EDE3D0` | 237,227,208 | Cards suaves, quadros, fundos de mockup | Alta |
| `--color-sage-400` | `#B8C29A` | 184,194,154 | Arco hero, régua de métricas, botões e cards | Alta |
| `--color-sage-100` | `#E4E6D0` | 228,230,208 | Fundo da seção de escolhas | Alta |
| `--color-white` | `#FFFFFF` | 255,255,255 | Texto em escuro, superfície de cards | Alta |
| `--color-ink` | `#3A2F2A` | 58,47,42 | Texto escuro secundário/neutralizado | Média |

**Cores funcionais derivadas (proposta, não extração):** `--color-border-light: rgba(62,15,25,.17)`; `--color-border-dark: rgba(246,239,226,.2)`; `--color-text-muted-light: rgba(246,239,226,.78)`; `--color-text-muted-dark: rgba(62,15,25,.75)`.

### 2.2 Regras de aplicação

- Vinho profundo funciona como cor institucional dominante e **background canvas**.
- Creme é a cor de leitura prolongada e contrasta com títulos vinho/marrom.
- Verde-sálvia é a cor de frescor e distinção: usar em painéis e CTAs, **não como cor universal de texto**.
- Vinho médio assinala uma etapa de processo ou um resultado importante.
- Bege quente suaviza blocos informativos e aproxima a página de um editorial impresso.
- Limitar cada seção a 1 cor de fundo dominante + 1 acento + cores de texto.
- Não introduzir azul, roxo, neon ou dourados cintilantes: quebrariam o vocabulário identificado.

### 2.3 Contraste e acessibilidade

**Verificar com cálculo de contraste antes de publicar**, especialmente texto vinho sobre sálvia e branco sobre vinho médio. Preferir branco sobre vinho escuro, vinho sobre creme e vinho sobre bege para texto pequeno. O botão verde do hero demanda validação específica do contraste de seu texto.

## 3. Tipografia

### 3.1 Classificação das famílias visuais

A imagem **não comprova a família tipográfica exata**. Distinguem-se três comportamentos:

| Papel | Características perceptíveis | Candidatas visuais para teste (não identificação) |
|---|---|---|
| `display-condensed` | Sans serif pesada, **muito condensada**, caixa alta, terminais planos, ritmo estreito, alta densidade | Anton, Bebas Neue com peso compensado, Archivo Narrow ExtraBold, Oswald Heavy |
| `editorial-italic` | Serifada contrastada e itálica, com desenho caligráfico e terminações finas | Instrument Serif Italic, Cormorant Garamond Italic, Playfair Display Italic |
| `body-sans` | Sans limpa, compacta, de corpo pequeno, com leitura moderna | Inter, Manrope, Archivo |

**Importante:** para reproduzir fielmente, comparar glifos visíveis de `SEU SITE`, `RETORNO`, `juntos`, `entrego` com amostras das candidatas. Sem acesso ao arquivo fonte ou CSS, atribuir uma fonte específica como “a original” seria especulação.

### 3.2 Hierarquia tipográfica proposta para viewport desktop 1440

| Estilo | Desktop CSS proposto | Peso | Entrelinha | Tracking | Uso |
|---|---|---|---|---|---|
| Hero headline | `clamp(3.75rem, 5.5vw, 6.5rem)` | 800–900 | `.90–.98` | `-.035em` | Título central de abertura |
| H2 section | `clamp(2.25rem, 3.6vw, 4.5rem)` | 800–900 | `.94–1.02` | `-.025em` | Abertura de seção |
| H3 card | `clamp(1.2rem, 1.8vw, 2.2rem)` | 800–900 | `1.0–1.08` | `-.02em` | Headline de cartão |
| KPI numeral | `clamp(3.25rem, 5vw, 6rem)` | 800–900 | `.9` | `-.04em` | 36X / 8,8% / 132 MIL |
| Editorial italic | `1em` relativo ao título | 400–500 | `1` | normal | Palavra-chave no meio do heading |
| Body | `clamp(.94rem, 1vw, 1.075rem)` | 400–500 | `1.45–1.6` | normal | Explicações e provas |
| Eyebrow / micro-label | `.65–.8rem` | 600–700 | `1.2–1.4` | `.06em` | Categoria / legendas |
| Nav / button | `.72–.88rem` | 600–700 | `1.1–1.2` | `0–.035em` | Navegação, CTA |

Estes valores são **alvos de reconstrução**, não medidas tiradas da captura reduzida.

### 3.3 Composição de títulos

- Quebras de linha são intencionais, não simplesmente consequência do container.
- Blocos em maiúsculas alternam com uma palavra/frase em *serif itálica*, geralmente em caixa baixa.
- Exemplo de padrão: `SEU SITE E SEUS / ANÚNCIOS / TRABALHANDO` + `juntos` + `PARA TRAZER CLIENTES.`
- Contrastar famílias sem perder baseline e coerência de entrelinha.
- A serif não deve ser usada como fonte principal do texto de apoio.
- Os títulos de seção são visivelmente mais compactos que headlines comuns de SaaS.
- Evitar tracking positivo nos títulos grandes; o peso e a condensação já dão personalidade.

## 4. Sistema de layout

### 4.1 Grid e alinhamentos

A página usa **container central com alinhamento de bordas recorrente**, frequentemente com dois painéis lado a lado ou subdivisões desiguais. Na rasterização de 368 px, o início do conteúdo principal está cerca de 20 px da esquerda — aproximadamente **5,4% da largura**. Isso sugere um gutter de ~`5–6vw` para a reconstrução, mas não revela as medidas reais do layout de 1440 px.

**Proposta:**
```css
:root {
  --container: 1280px;
  --gutter: clamp(20px, 5.4vw, 80px);
  --section-space: clamp(76px, 8vw, 144px);
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
}
.container { width: min(calc(100% - 2 * var(--gutter)), var(--container)); margin-inline: auto; }
.section { padding-block: var(--section-space); }
```

- **Hero:** composição assimétrica 2 colunas, copy predominante à esquerda e elemento gráfico/ilustração à direita.
- **Problema:** coluna do título à esquerda e lista de objeções à direita; abaixo, parágrafo expressivo alinhado à coluna direita.
- **Processo:** linha horizontal com três estações equidistantes.
- **Argumento IA:** grid de cards de tamanhos diferentes, com cartão alto à direita.
- **Serviços:** lista editorial de faixas horizontais com três áreas: serviço, descrição, link.
- **Escolha:** três CTAs lado a lado.
- **Portfólio:** grid assimétrico 3 colunas, tiles variando em altura.
- **Resultados:** card grande à esquerda + duas métricas empilhadas à direita.
- **Como funciona:** início de duas colunas visíveis; restante não pode ser auditado.

### 4.2 Espaçamento e ritmo

- Seções principais separadas por **troca total de cor**, em vez de bordas.
- Padding vertical generoso nos painéis claros; seções com muitas provas/cards usam densidade maior.
- Espaços internos frequentemente seguem progressão 8 / 12 / 16 / 24 / 32 / 48 / 64 px **como recomendação**.
- Gaps de cards aproximadamente regulares e estreitos em comparação à largura dos cards.
- Pequenos divisores substituem bordas espessas entre itens textuais.
- O acabamento é predominantemente **reto ou com raios discretos**; não há linguagem de pills gigantes em todos os componentes.

## 5. Mapa completo das seções visíveis

### S01 — Header / navegação institucional

**Fundo:** vinho profundo. **Estrutura:** logotipo textual à esquerda (`THALYTA` + descriptor pequeno), links de navegação ao centro, CTA claro à direita. Layout horizontal extremamente compacto; header não possui moldura, sombra ou separador destacado. O CTA é um retângulo pequeno de tom sálvia/bege. **Itens de navegação legíveis na imagem:** `Serviços`, `Portfólio`, `Sobre`, `Contato` (a leitura das etiquetas muito pequenas é aproximada). **Comportamentos não verificáveis:** sticky, menu dropdown, menu mobile, destino dos links.

**Implementação:** `header > nav`; logo clicável; `ul` de links; CTA destacado; estados `hover`, `focus-visible`, menu toggle abaixo de 768 px. Altura proposta 72–88 px desktop.

### S02 — Hero de proposta de valor

**Fundo:** vinho profundo. **Esquerda:** título de 4–5 linhas em branco com palavra `juntos` em serif itálica creme; parágrafo curto contextualizando Thalyta e o crescimento em marketing/site/anúncios; dois botões lado a lado. **Botão primário:** sálvia clara com texto escuro, ícone seta. **Secundário:** contorno claro/transparência vinho com símbolo de WhatsApp e texto. **Direita:** arte de nicho arquitetônico/portal arredondado de topo semicircular em verde-sálvia; interior creme; microtexto central. Sobreposição de selo vinho serrilhado/circular com estrela central e escrita ao redor. A arte funciona como ponto focal de marca e não como foto de banco de imagem.

**Vetores:** arco com vértice redondo, selo de borda radial dentada, estrela de quatro pontas; contrastar com o bloco de texto geométrico. **Responsive:** empilhar arte depois da copy, preservar proporções e evitar que o selo cubra CTAs.

### S03 — Fita/régua horizontal de credibilidade

**Fundo:** verde-sálvia médio. **Formato:** faixa quase horizontal com leve inclinação/efeito de banda, cortando a transição do hero para a seção clara. **Conteúdo observado:** `+150 CLIENTES`, `+R$ 20 MILHÕES EM FATURAMENTO GERADO`, `5 ANOS DE ATUAÇÃO`, `BRASIL TODO`, intercalados por pequenos signos/estrelas/vermelhos. **Tipografia:** display condensada escura, compacta, caixa alta. **Função:** prova social quantitativa e alcance.

**Implementação:** rail com itens em `inline-flex`; sem necessidade de ticker animado, pois movimento não é comprovado. Responsivo pode usar overflow horizontal ou quebra de duas linhas, mantendo texto legível.

### S04 — Manifesto de problema / diagnóstico de conversão

**Fundo:** creme. **Grid:** título grande à esquerda; cinco tópicos à direita, cada um com ícone circular vermelho e linha horizontal fina como divisor. **Headline:** `SE VOCÊ JÁ INVESTIU E NÃO VIU retorno, A CONVERSA COMEÇA AQUI.` Palavra `retorno` em serif itálica vinho. **Tópicos:** mensagens sobre página não converter, negócio não aparecer/cliente não encontrar, falta de clareza, presença online e páginas genéricas; alguns trechos são muito pequenos para transcrição fiel. Abaixo da lista, parágrafo em vinho/serif ou fonte de tom editorial reforçando diagnóstico e resolução.

**Componente:** `PainPointList` com ícone pequeno tipo círculo/x, descrição curta e border-bottom. **Tom:** firme e diagnóstico; evita excesso de jargão. **Acessibilidade:** não depender da cor vermelha para representar o tópico.

### S05 — Plano integrado para site + anúncios

**Fundo:** vinho médio `#7B2132`. **Headline:** `UM PLANO SÓ PARA O SITE E PARA OS anúncios.` último termo em serif itálica. **Body:** texto branco compacto sobre estratégia integrada. **Timeline:** filete horizontal longo e três nós, cada um representado por círculo sálvia com ícone escuro; títulos em caixa alta: `PLANEJAMENTO`, `CONSTRUÇÃO`, `MEDIÇÃO`. Abaixo, microdescrições.

**Composição:** a linha une os centros dos círculos, com três colunas igualmente espaçadas. Ícones lineares ou sólidos simples (planejamento/lâmpada ou estratégia, construção/tela ou layout, medição/gráfico). A imagem não oferece resolução suficiente para nomear com precisão cada ícone.

### S06 — Diferencial estratégico: pessoas + IA

**Fundo:** creme. **Título:** `QUALQUER PESSOA GERA UMA PÁGINA COM IA. ESTRATÉGIA ELA NÃO gera.` A palavra `gera` surge em serif itálica vinho. **Grid editorial tipo bento:**

1. Card bege superior esquerdo com ícone simples de pessoa, título `EU CONHEÇO O SEU CLIENTE.` e descrição reduzida.
2. Card sálvia central com ícone de pesquisa/lupa, headline sobre entendimento do Google e das IAs, descrição breve.
3. Card bege alto à direita, com centro quase vazio/microtexto, e **faixa vinho na base** com texto `TEM UMA PESSOA responsável.`
4. Card branco largo na parte inferior esquerda, contorno vinho fino, ícone de gráfico, título `CADA CLIQUE É MEDIDO.` e texto explicativo à direita.

**Linguagem:** composição variada, assimetria controlada, alternância de cards opacos e borda simples. Não usar sombra ou gradientes. **Responsividade:** 2 colunas em tablet, 1 coluna em mobile; card alto pode ter faixa de rodapé mantendo ordem de leitura.

### S07 — Serviços / “O que eu entrego”

**Fundo:** vinho profundo. **Título:** `O QUE EU entrego`, com `entrego` serif itálica bege/sálvia. **Três linhas de serviço**, separadas por filetes horizontais sutis: `SITES`, `TRÁFEGO PAGO`, `ESTRATÉGIA DE MÍDIA PAGA`. Cada linha contém título grande à esquerda, pequena etiqueta para os dois primeiros, descrição breve no centro e link à direita `Quero esse serviço` com seta.

**Detalhe:** filetes finos, etiquetas pequenas em cores sálvia e vinho médio, sem cards fundos individuais. A última linha inclui uma microdescrição de planejamento para mídia paga. **Rodapé de serviços:** uma fileira de chips/etiquetas de plataformas e recursos, incluindo referências visíveis a Meta Ads e Google Ads e outras integrações (textos restantes não plenamente legíveis).

**Acordeões:** **não é possível identificar um accordion aberto ou fechado nesta captura**. O padrão observado é uma **lista de serviços com links de ação**. Não implementar painel colapsável por suposição; apenas se especificado depois. Se houver accordion no produto original, conferir HTML ou gravação da interação.

### S08 — Direcionador “Por onde você quer começar?”

**Fundo:** verde-sálvia pálido `#E4E6D0`. **Título:** `POR ONDE VOCÊ QUER começar?`, serif itálica em vinho. **Três cartões horizontais:**
- Vinho profundo: ícone de monitor; `QUERO UM SITE`; seta no canto inferior direito.
- Vinho médio: ícone em alvo/círculo; `QUERO ANUNCIAR`; seta.
- Verde-sálvia médio: estrela de quatro pontas; `QUERO OS DOIS`; seta.

**Layout:** alturas iguais, raio pequeno, texto alinhado na base, ícone na borda superior esquerda. São **cards-CTA inteiros**, não somente botões internos. Contraste de cores no terceiro card precisa ser validado.

### S09 — Portfólio de websites

**Fundo:** creme. **Título:** `SITES QUE JÁ entreguei.`, com itálico em vinho. **Galeria editorial/assimétrica:** mosaico de 3 colunas, cartões de preview com pequenos browser mockups: barra superior vinho com três pequenos pontos, área interna bege/creme, quadros com borda fina. Abaixo ou junto dos previews, cards com nome do cliente e tipo de solução. **Nomes legíveis:** `LUK MOB`, `ESMALTERIA DA JANA`, `CLÍNICA ANALICE SOUSA`, `CLÍNICA LONGEVA`, `NOEMI LUCENA` (conferir grafia dos menores títulos antes da publicação). Algumas miniaturas parecem placeholders textuais simplificados em vez de screenshots definitivas.

**Organização observável:** elemento grande à esquerda, faixa alta/card na coluna central, cartões menores à direita e em linha inferior. Uma peça escura de `LUK MOB` inclui explicação e botão `Ver site`. **Componentes:** `ProjectCard`, `BrowserPreview`, `ProjectMeta`, `TextLink`; cada card precisa de link e nome acessível. **Não supor filtros, hover animado, modal ou carousel:** nenhuma dessas interações aparece na captura.

### S10 — Resultados e provas quantitativas

**Fundo:** vinho profundo. **Headline:** `RESULTADOS QUE EU CONSIGO TE mostrar.` com `mostrar` em serif itálica. **Cards:** principal grande em vinho médio à esquerda, contendo grande `36X`, nota sobre retorno no primeiro mês e explicação em corpo reduzido. À direita, dois cards empilhados: primeiro sálvia com grande `8,8%`; segundo bege com `132 MIL`. Os textos exatos dos cases e suas bases numéricas estão pequenos demais para leitura segura.

**Hierarquia:** números gigantes em display condensada, parágrafos breves, micro-label com cliente/campanha no topo. **Abaixo:** texto `Marcas que já fizemos`/equivalente e lista corrida de nomes de clientes em branco, separados por pequenos elementos; entre os nomes discerníveis estão `BLUE FIT ACADEMIAS`, `DECOR COLORS`, `FARM RIO LATAM`, `UNIFOR`, `UNIVS`, `UNILEÃO`, `PIXEL`, `FORFOOD`, `BLOCOCK`/`BLOCOK` e `PRIME PLUS`. Conferir grafia e autorização de uso no conteúdo final.

**Parte inferior:** três quadrantes retangulares com contorno tracejado e microtexto de depoimento/placeholder; a leitura é limitada. Um rodapé minúsculo aparece antes da transição para a próxima seção. **Cuidados:** resultados reais exigem períodos, atribuição, metodologia e validação; não converter valores vistos em promessas gerais de performance.

### S11 — “Como funciona” (somente abertura visível)

**Fundo:** creme. **Título:** `COMO funciona`, itálico em vinho. Abaixo aparecem dois subtítulos em display condensado: `SITE` e `TRÁFEGO`; há pequenas descrições sob eles. **A captura termina nessa área**. Não há evidência para mapear as próximas etapas, FAQs, depoimentos, footer ou CTAs posteriores. Este bloco deve ser tratado como seção parcialmente documentada.

---

## 6. Biblioteca de componentes

| Componente | Anatomia | Estilo | Interação recomendada / evidência |
|---|---|---|---|
| `SiteHeader` | Brand + links + CTA | Vinho, texto claro, altura curta | Links; sticky **não confirmado** |
| `BrandWordmark` | Nome maiúsculo + descriptor | Sans display + microtexto | Link home |
| `HeadlineMixed` | Blocos condensados + span serif italic | Quebra editorial | Estático |
| `PrimaryButton` | Texto + seta | Sálvia, texto vinho, cantos discretos | Hover por mudança suave de luminância; foco visível |
| `OutlineButton` | Ícone + texto | Transparente com borda clara | Link WhatsApp; verificar URL |
| `SocialProofBand` | 4 métricas + símbolos | Sálvia, texto vinho | Ticker não confirmado |
| `PainPointItem` | Ícone + texto + divisor | Creme, vinho | Não clicável por padrão |
| `TimelineStep` | Circular icon + label + body | Vinho médio / sálvia | Sem comportamento conhecido |
| `BentoInfoCard` | Ícone + título + body | Bege, verde ou branco | Estático |
| `BottomAccentCard` | Conteúdo superior + banda inferior vinho | Bege + vinho | Estático |
| `ServiceRow` | Label + resumo + link | Vinho, filete discreto | Navegação, **não accordion comprovado** |
| `ServiceChip` | Texto pequeno em borda/placa | Vinho e contorno sutil | Estático |
| `ChoiceCTA` | Ícone + ação + seta | 3 fundos institucionais | Área inteira clicável |
| `BrowserPreview` | Top bar + pontinhos + conteúdo preview | Vinho/creme | Prévia ilustrativa |
| `ProjectCard` | Preview + nome + meta + link | Bege/verde/vinho | Link externo para site |
| `MetricCard` | Cliente + número + descrição | Vinho médio, sálvia, bege | Estático |
| `ClientLogoRail` | Nomes alinhados horizontalmente | Texto branco condensado | Eventual wrap no mobile |
| `TestimonialOutline` | Texto + autoria | Linha pontilhada vinho-claro | Estático, conteúdo não decifrável |
| `SectionDivider` | Alternância de cor / filete | Sem sombra | Estático |

### 6.1 Botões e links — estados de implementação

```css
.button {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .65rem;
  padding: .7rem 1.1rem;
  border: 1px solid transparent;
  border-radius: 3px;
  font-family: var(--font-body);
  font-size: .875rem;
  font-weight: 700;
  text-decoration: none;
  transition: background-color .18s ease, color .18s ease, border-color .18s ease;
}
.button--primary { background: var(--color-sage-400); color: var(--color-wine-950); }
.button--outline { background: transparent; color: var(--color-cream-100); border-color: currentColor; }
.button:focus-visible, a:focus-visible { outline: 3px solid #B8C29A; outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; } }
```

**Observação:** hover, focus, disabled e loading não aparecem em screenshot estático; o CSS acima formaliza estados que deveriam existir na implementação, sem afirmar que são os originais.

### 6.2 Ícones e vetores

**Estilo predominante:** pictogramas simples e lineares, poucos detalhes, traço uniforme, uso pontual de sálvia, vinho ou creme. Elementos reconhecíveis: monitor/tela, lupa/alvo, pessoa, gráfico, estrela de quatro pontas, seta pequena para direita, ícones de processo e símbolo do WhatsApp. Ornamentos distintivos: (1) selo circular serrilhado; (2) arco vertical com topo redondo; (3) pequenos sinais divisores na faixa de prova social.

**Construção sugerida:** SVG inline com `currentColor`; `stroke-width` consistente (1.5–2 px em 24 × 24); SVG decorativo `aria-hidden="true"`; ícones que sejam o único label de um link devem ter nome acessível. Não substituir selos por emojis.

### 6.3 Bordas, raios, sombra e separadores

- Cards majoritariamente retangulares; raio visual muito pequeno (proposta `2–6px`).
- Contorno fino em alguns cards claros (`1px` vinho).
- Listas de serviços têm separadores `1px` em tom vinho-claro/transparente.
- Depoimentos aparentam usar borda tracejada, leve e fina.
- **Sombras são ausentes ou extremamente discretas**; evite `box-shadow` difuso de dashboards modernos.
- Elementos gráficos de destaque podem sobrepor seus containers; usar `position: absolute` com limites responsivos.

## 7. Design tokens prontos para desenvolvimento

```css
:root {
  /* Cor: amostras obtidas do PNG */
  --color-wine-950: #3E0F19;
  --color-wine-700: #7B2132;
  --color-cream-100: #F6EFE2;
  --color-beige-200: #EDE3D0;
  --color-sage-400: #B8C29A;
  --color-sage-100: #E4E6D0;
  --color-white: #FFFFFF;
  --color-ink: #3A2F2A;

  /* Fontes: substitutas propostas, não confirmadas */
  --font-display: 'Anton', 'Impact', sans-serif;
  --font-editorial: 'Instrument Serif', 'Georgia', serif;
  --font-body: 'Inter', 'Arial', sans-serif;

  /* Escala: proposta */
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 6px;
  --border-subtle-dark: 1px solid rgb(246 239 226 / 20%);
  --border-subtle-light: 1px solid rgb(62 15 25 / 18%);
  --container: 1280px;
  --gutter: clamp(20px, 5.4vw, 80px);
  --section-space: clamp(72px, 7.5vw, 132px);
}

.display-title { font-family: var(--font-display); text-transform: uppercase; line-height: .96; font-weight: 900; }
.display-title em { font-family: var(--font-editorial); text-transform: none; font-weight: 400; font-style: italic; letter-spacing: -.015em; }
.body-text { font-family: var(--font-body); line-height: 1.55; }
```

### 7.1 Mapeamento de seção para classes

```text
site
├── site-header                vinho-950
├── hero                       vinho-950
│   ├── hero-copy              HeadlineMixed + body + buttons
│   └── hero-art               architectural-arch + star-seal
├── proof-band                 sage-400
├── pain-points                cream-100
├── three-step-plan            wine-700
├── ai-and-strategy            cream-100
├── services                   wine-950
├── choose-your-path           sage-100
├── portfolio                  cream-100
├── case-results               wine-950
└── how-it-works [PARCIAL]     cream-100
```

## 8. Responsividade — proposta de reconstrução

Não existe visualização mobile/tablet no material, então isto é **especificação recomendada**, não comportamento comprovado.

| Faixa | Recomendações |
|---|---|
| `≥1200px` | Container central; hero 2 colunas; grids de 3 colunas; métricas 2 colunas assimétricas |
| `768–1199px` | Reduzir headings por `clamp`; hero com coluna da arte menor; bento e portfólio em 2 colunas; cards de escolha podem permanecer em 3 se legíveis |
| `<768px` | Header com menu acessível; hero em coluna única; CTAs em coluna se necessário; timeline vertical; grids em 1 coluna; serviços com título + descrição + link empilhados; métricas em 1 coluna; rail de clientes com wrap |
| `<390px` | Gutter ~20px; limitar headings para evitar overflow; botões 100%; evitar microtexto abaixo de 12–14px |

**Regras:** garantir target clicável 44 × 44 px, não usar texto embutido no mockup como conteúdo essencial, reduzir sobreposição do selo, preservar hierarquia da mensagem, controlar largura de linha (`max-width: 60ch` para body) e usar imagem em `aspect-ratio` apropriado.

## 9. Movimento e microinterações

A captura é estática: **nenhuma animação é verificável**. Sugestões coerentes, caso se queira motion:

- Hover sutil do card CTA: cor/contraste, evitando giro 3D e glow.
- Seta pode transladar 3–4 px horizontalmente.
- Links de serviço podem receber underline ou leve mudança de contraste.
- Reveal por fade curto das seções (180–300 ms), respeitando `prefers-reduced-motion`.
- Manter a faixa de métricas estática, a menos que um vídeo de referência confirme marquee.
- Evitar parallax pesado em hero, contadores automáticos intrusivos e transições longas.

## 10. Diretrizes de UX, conteúdo e conversão

1. **CTA primário repetido estrategicamente:** hero, escolha do serviço, item de serviço e fechamento real da página (não visível).
2. **Mensagens orientadas a resultado:** benefícios primeiro, método depois, evidências por último.
3. **Escaneabilidade:** números em display enorme, parágrafos limitados a poucas linhas, listas de dor com um assunto por item.
4. **Credibilidade:** preservar contexto dos KPIs e apresentar período/escopo de cada case; diferenciar faturamento gerado de receita da agência.
5. **Proposta de valor:** associação explícita entre páginas que convertem e anúncios que levam pessoas certas.
6. **Portfólio:** identificar cliente, categoria e ação objetiva para navegar ao projeto.
7. **Contato:** WhatsApp com mensagem predefinida coerente com a origem do clique; eventos de analytics separados por serviço.
8. **Sem falsas promessas:** métricas como 36X não devem ser apresentadas como resultado garantido.

## 11. Acessibilidade e performance

- Usar `h1` somente para hero, `h2` por seção e `h3` nos cards; a estilização de destaque não deve modificar a ordem semântica.
- A serif itálica deve compor o heading semanticamente, não virar imagem.
- Conferir WCAG AA: contraste 4.5:1 no texto normal e 3:1 para texto grande/ícones significativos.
- Links com texto compreensível fora de contexto (por exemplo `Ver site da Clínica Longéva` em `aria-label` quando texto visível for apenas `Ver site`).
- `alt` apropriado para prévias reais; decorative SVGs com `aria-hidden`.
- `font-display: swap`, pré-carregamento criterioso, imagens WebP/AVIF e dimensões explícitas para evitar CLS.
- Respeitar `prefers-reduced-motion`; teclado deve navegar por todos os links.
- Testar layout em 320, 375, 768, 1024 e 1440 px.

## 12. Estrutura técnica recomendada

```text
src/
├── styles/
│   ├── tokens.css
│   ├── fonts.css
│   ├── reset.css
│   ├── globals.css
│   └── utilities.css
├── components/
│   ├── Header
│   ├── MixedHeading
│   ├── CTAButton
│   ├── SealGraphic
│   ├── ProofBand
│   ├── PainPointList
│   ├── TimelineStep
│   ├── FeatureBento
│   ├── ServiceRow
│   ├── PathCard
│   ├── ProjectCard
│   ├── BrowserMockup
│   └── MetricCard
└── sections/
    ├── Hero
    ├── Credibility
    ├── PainPoints
    ├── IntegratedPlan
    ├── StrategyDifference
    ├── Services
    ├── StartHere
    ├── Portfolio
    ├── Results
    └── HowItWorks
```

### 12.1 Exemplo de heading acessível

```html
<h1 class="display-title">
  SEU SITE E SEUS ANÚNCIOS<br />
  TRABALHANDO <em>juntos</em><br />
  PARA TRAZER CLIENTES.
</h1>
```

As quebras acima são ilustrativas; calibrar conforme largura disponível e texto final da página.

## 13. Inventário de evidências e lacunas

| Item | Visível na captura? | Observação |
|---|---|---|
| Paleta principal | Sim | 6 fundos dominantes medidos por RGB |
| Hierarquia tipográfica | Sim | Estilos distinguíveis; famílias exatas indeterminadas |
| Layout desktop | Sim, raster reduzida | Relações espaciais; CSS original desconhecido |
| Textos grandes | Em grande parte | Alguns títulos claros e transcritos |
| Textos pequenos | Parcialmente | Não transcrever como citação fiel |
| Header e CTA | Sim | Links/alvos e estados desconhecidos |
| Ícones/selo | Sim | Formas perceptíveis, geometria exata não disponível |
| Cards bento | Sim | Distribuição e color blocking observáveis |
| Accordion | Não demonstrado | Há serviços em linhas com links, não painéis expandidos |
| Portfólio | Sim | Algumas legendas pequenas ilegíveis |
| KPIs | Sim | 36X, 8,8%, 132 MIL visíveis; método não visível |
| Depoimentos | Parcialmente | Caixas tracejadas, texto não legível |
| Responsividade | Não | Regras propostas |
| Estados hover/focus | Não | Regras propostas |
| Scroll/sticky/animações | Não | Não inferir do PNG |
| Conteúdo após “Como funciona” | Não | Fora do enquadramento |

## 14. Checklist de fidelidade para recriação

- [ ] Usar as seis cores dominantes com os valores HEX identificados.
- [ ] Reproduzir uma sans display realmente condensada e pesada.
- [ ] Aplicar uma serif itálica apenas nas palavras editoriais em destaque.
- [ ] Preservar composição de hero com copy à esquerda e arco+selo à direita.
- [ ] Replicar a régua sálvia de prova social com separadores.
- [ ] Construir bloco de dores com linhas finas e ícones pequenos.
- [ ] Representar o método com timeline horizontal em vinho médio.
- [ ] Recriar o bento assimétrico de IA/estratégia e card branco com contorno.
- [ ] Manter serviços como três rows editoriais e links à direita.
- [ ] Montar três cards-CTA cromaticamente distintos.
- [ ] Recriar grid assimétrico de portfólio com frames de browser.
- [ ] Dar proeminência aos KPIs 36X, 8,8% e 132 MIL.
- [ ] Evitar sombras elevadas, gradientes, brilho excessivo e arredondamentos grandes.
- [ ] Verificar nomes dos clientes, textos curtos e descrição dos resultados no material fonte em resolução integral.
- [ ] Testar em mobile sem extrapolar comportamento original não evidenciado.
- [ ] Obter continuação do screenshot para auditar resto de “Como funciona”, FAQ e footer, caso existam.

---

## 15. Síntese de direção de arte

**Expressão da marca:** agência estratégica, autoral, assertiva, próxima e orientada a resultados. **Mood:** editorial vintage, digital contemporâneo, alto contraste, personalidade tipográfica. **Elementos assinatura:** vinho escuro, creme papel, verde-sálvia, título sans condensado, serif itálica contextual, arco arquitetônico, estrela de quatro pontas e selo circular, filetes finos, layouts de bento, blocos de KPI oversized.

**Critério de qualidade:** a versão reconstruída deve parecer uma landing page editorial feita sob medida — nunca um template genérico de startup, um dashboard ou um flyer publicitário.
