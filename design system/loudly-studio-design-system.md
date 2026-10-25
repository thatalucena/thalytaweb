# Design System: Loudly Studio

Fonte da análise: https://loudlystudio.framer.website/ (site construído no Framer, template de agência de social media). Páginas analisadas: Home (/), Services (/services), Work (/work), About (/about) e Contact (/contact).

Estrutura do arquivo: a Parte 1 (seções 1 a 21) traz o design system e a Home; a Parte 2 (seções 22 a 28) traz as páginas internas, os componentes novos e as inconsistências encontradas.
Método: valores lidos direto dos estilos computados do navegador, com viewport de 1317 x 892 px (desktop), mais inspeção visual de cada seção. Tudo que aparece como número neste documento foi medido, exceto onde estiver marcado como "aproximado" ou "não medido".

Altura total da página: 6202 px.

---

## 1. Visão geral e personalidade

Estilo geral: neo-brutalismo pop com energia de criador de conteúdo. Títulos gigantes em caixa alta numa fonte larga e ultra pesada, fundo roxo-berinjela profundo, rosa choque e verde-limão ácido como cores de impacto, cantos muito arredondados, elementos levemente inclinados como adesivos, setas e rabiscos desenhados à mão, cartões de vidro flutuando sobre uma grade em perspectiva.

Princípios visuais que se repetem na página inteira:

1. Contraste máximo: texto escuro (#240E30) sobre fundos claros, texto branco sobre fundos escuros.
2. Uma única palavra de cada título recebe a cor de destaque (rosa, limão ou roxo, conforme o fundo).
3. Tudo é arredondado: seções com raio 32 px, cards 22 a 30 px, botões e chips em pílula (999 px).
4. Inclinações pequenas (de -9° a +8°) em cards, etiquetas e rabiscos para dar sensação de colagem.
5. Cada seção é um "bloco" arredondado de cor chapada, separado dos vizinhos por uma faixa de 12 px do fundo roxo.
6. Microcopy curto, direto e informal, em inglês.

---

## 2. Cores

### 2.1 Paleta principal

| Nome sugerido | HEX | RGB | Papel |
|---|---|---|---|
| Berinjela (Ink) | #240E30 | 36, 14, 48 | Cor de texto principal, fundo da página (moldura), seções escuras, botões primários, pílula do logo |
| Rosa choque (Pink) | #EC4899 | 236, 72, 153 | Palavra de destaque nos títulos, números dos serviços, estrelas, seção do rodapé, ícone aberto do FAQ |
| Limão (Lime) | #D6FA50 | 214, 250, 80 | Seções de impacto, botão do menu, etiquetas, ícones de seta, palavra de destaque em fundo escuro |
| Lavanda clara (Surface) | #F4F0F6 | 244, 240, 246 | Cards de passos e de planos nas seções brancas, chips de seção |
| Branco | #FFFFFF | 255, 255, 255 | Seções claras, cards de depoimento, itens do FAQ, texto sobre escuro |

Observação: existe também #FAF9F5 e #141413 no DOM, mas pertencem a uma sobreposição de extensão do navegador, não ao site. Ignorar.

### 2.2 Transparências usadas

| Valor | Onde aparece |
|---|---|
| rgba(36, 14, 48, 0.62) | Texto secundário sobre fundo claro (descrições, subtítulos, cargo nos depoimentos, "/month" em cards claros) |
| rgba(255, 255, 255, 0.42) | Cards de vidro do hero (@mia.creates, @leo.bakes) |
| rgba(255, 255, 255, 0.55) | Linhas de serviço sobre limão, botão fantasma "See our work" |
| rgba(255, 255, 255, 0.5) | Chip de seção sobre limão ("What we do") |
| rgba(255, 255, 255, 0.85) | Chips brancos sobre as fotos dos cases, texto do copyright |
| rgba(255, 255, 255, 0.9) | Parágrafo do rodapé (chamada "Book a free 30-minute call") |
| rgba(255, 255, 255, 0.7) | Texto secundário sobre fundo escuro (legendas dos cases, parágrafo do FAQ, descrição do plano Growth) |
| rgba(255, 255, 255, 0.65) | Legenda "30 posts planned" no mini-card escuro |
| rgba(255, 255, 255, 0.6) | "/month" no plano Growth |
| rgba(255, 255, 255, 0.08) | Preenchimento muito sutil em elementos sobre fundo escuro (chip do FAQ e botões de contorno) |

### 2.3 Regra de uso das cores por fundo

| Fundo da seção | Texto base | Palavra de destaque do título | Botão primário | Detalhes |
|---|---|---|---|---|
| Branco (#FFFFFF) | #240E30 | Rosa #EC4899 | Berinjela com texto branco | Cards em #F4F0F6 |
| Limão (#D6FA50) | #240E30 | Rosa #EC4899 | Berinjela com texto branco | Cards em branco 55% |
| Berinjela (#240E30) | Branco | Limão #D6FA50 | Limão com texto berinjela | Cards brancos ou contorno branco |
| Rosa (#EC4899) | Branco | Berinjela #240E30 | Berinjela com seta limão | Contorno branco no botão secundário |

### 2.4 Sombras

Única sombra recorrente (cards de vidro, depoimentos, cards flutuantes): `0 18px 44px rgba(40, 70, 120, 0.16)`. Uma sombra azulada fria, suave e larga, usada em 8 elementos.

Sombra inset de 1 px na cor berinjela (`inset 0 0 0 1px`) é usada para criar o contorno fino dos botões fantasma e das linhas de serviço, em vez de uma borda CSS.

---

## 3. Tipografia

### 3.1 Famílias

| Família | Pesos carregados | Uso |
|---|---|---|
| **Unbounded** | 800 (ExtraBold) apenas | Todos os títulos, números grandes, preços, logo, nome dos planos, links do menu, wordmark gigante do rodapé |
| **Inter** | 400, 500, 600, 700, 800 | Todo o resto: parágrafos, botões, chips, legendas, perguntas do FAQ, rótulos, listas |

Unbounded só existe em peso 800 no site. Todo texto Unbounded é MAIÚSCULO (`text-transform: uppercase`).
O elemento body não define família (cai em sans-serif); a família é aplicada elemento a elemento.

Distribuição de uso medida: Unbounded 800 em 52 elementos de texto; Inter 700 em 45; Inter 400 em 38; Inter 500 e 600 em 18 cada; Inter 800 em 14.

### 3.2 Escala tipográfica completa (do maior ao menor)

Todos os valores de letter-spacing seguem uma lógica em proporção do tamanho: títulos grandes usam -0.04em a -0.05em, médios -0.03em, pequenos -0.01em a -0.02em. Texto Inter fica com tracking normal.

| Nível | Fonte / peso | Tamanho | Line-height | Letter-spacing | Cor | Caixa | Onde |
|---|---|---|---|---|---|---|---|
| Wordmark gigante | Unbounded 800 | 200 px | 170 px (0,85) | -10 px (-0,05em) | #FFFFFF | Alta | "LOUDLY" no rodapé |
| H1 Hero | Unbounded 800 | 168 px | 151,2 px (0,9) | -6,72 px (-0,04em) | #240E30 e #EC4899 | Alta | "#GROW LOUDER ONLINE" |
| H2 Rodapé (CTA final) | Unbounded 800 | 56 px | 56 px (1,0) | -2,24 px (-0,04em) | #FFFFFF e #240E30 | Alta | "READY TO GET LOUD?" |
| Números de estatística | Unbounded 800 | 52 px | 52 px (1,0) | -2,6 px (-0,05em) | #240E30 | Alta | 2.4M, +186%, 120+, 4.9★ |
| H2 de seção (padrão) | Unbounded 800 | 48 px | 48,96 px (1,02) | -1,92 px (-0,04em) | #240E30, #FFFFFF; destaque #EC4899 ou #D6FA50 | Alta | One team every feed, Results we're proud of, Simple plans, Brands that got louder, Questions? |
| H2 de seção (variante) | Unbounded 800 | 44 px | 44,88 px (1,02) | -1,76 px (-0,04em) | #240E30; destaque #EC4899 | Alta | "THREE STEPS TO A LOUDER BRAND" |
| Preço | Unbounded 800 | 44 px | 44 px (1,0) | -1,76 px | #240E30 (claros), #D6FA50 (Growth) | Alta | $890, $1,890, $3,490 |
| Links do menu | Unbounded 800 | 44 px | 47,52 px (1,08) | -1,76 px | #FFFFFF | Alta | HOME, SERVICES, WORK, ABOUT, CONTACT |
| Título de serviço | Unbounded 800 | 32 px | 33,6 px (1,05) | -0,96 px (-0,03em) | #240E30 | Alta | SOCIAL STRATEGY, CONTENT PRODUCTION... |
| Valor monetário em card | Unbounded 800 | 30 px | 30 px | -0,9 px | #240E30 | Alta | $18,420 |
| Título de passo | Unbounded 800 | 24 px | 25,2 px (1,05) | -0,72 px | #240E30 | Alta | PLAN YOUR CONTENT, GROW YOUR AUDIENCE |
| Nome do plano / valor curto | Unbounded 800 | 20 px | 20 px | -0,4 px (-0,02em) | #240E30 ou #FFFFFF | Alta | STARTER, GROWTH, SCALE, +12,480 |
| Etiqueta "30 DAYS" / logo | Unbounded 800 | 15 px | 15 px | -0,3 px | #240E30 / #FFFFFF | Alta | Etiqueta de dias, "LOUDLY" do logo |
| Etiqueta "STUDIO" | Unbounded 800 | 12 px | 12 px | -0,12 px | #240E30 | Alta | Tag do logo |
| Pergunta FAQ | Inter 700 | 17 px | 24,65 px (1,45) | normal | #240E30 | Normal | Perguntas do accordion |
| Sinal "+" do FAQ | Inter 700 | 18 px | 26,1 px | normal | #D6FA50 | Normal | Ícone de abrir |
| Corpo grande | Inter 400 | 16 px | 23,2 px (1,45) | normal | #240E30 62% / branco 70-90% | Normal | Parágrafos de seção (pricing, FAQ, rodapé) |
| Corpo médio / handle | Inter 700 | 16 px | 23,2 px | normal | #240E30 | Normal | @mia.creates, @leo.bakes, ↗ |
| Citação de depoimento | Inter 500 | 16 px | 24 px (1,5) | normal | #240E30 | Normal | Depoimentos |
| Estrelas | Inter 400 | 16 px | 23,2 px | 1,6 px | #EC4899 | Normal | ★★★★★ |
| Texto hero | Inter 500 | 15 px | 22,5 px (1,5) | normal | #240E30 | Normal | "We turn small brands..." |
| Links do rodapé | Inter 500 | 15 px | 21,75 px | normal | #FFFFFF | Normal | Home, Services, Instagram... |
| Texto de botão | Inter 600 | 14 px | 20,3 px | normal | #FFFFFF ou #240E30 | Normal | Start growing, All services |
| Botão de plano | Inter 700 | 14 px | 20,3 px | normal | #FFFFFF / #240E30 | Normal | Get started, Start growing |
| Descrição | Inter 400 | 14 px | 20,3 px | normal | #240E30 62% | Normal | Descrição de serviços e planos |
| Legenda de case | Inter 500 | 14 px | 20,3 px | normal | Branco 70% | Normal | "Café · Instagram + Ads" |
| Item de lista | Inter 400 | 14 px | 20,3 px | normal | #240E30 / #FFFFFF | Normal | 12 posts per month |
| Label de estatística | Inter 600 | 14 px | 20,3 px | normal | #240E30 | Normal | views generated last month |
| Número de serviço | Inter 700 | 13 px | 18,85 px | normal | #EC4899 | Normal | 01, 02, 03, 04 |
| Texto de apoio pequeno | Inter 400 | 13 px | 18,85 px | normal | #240E30 62% | Normal | Subtítulos dos passos |
| Rodapé legal | Inter 400 / 600 | 13 px | 18,85 px | normal | Branco 85% / branco | Normal | © 2026, Designed by PixaroStudio |
| Chip dos cases / pílulas | Inter 700 | 14 px | 20,3 px | normal | #240E30 | Normal | Bean & Bloom, +312% sales |
| Métrica pequena | Inter 500 | 12 px | 17,4 px | normal | #240E30 62% | Normal | +248% reach in 60 days |
| Cargo do depoimento | Inter 400 | 12 px | 17,4 px | normal | #240E30 62% | Normal | Creator, @mia.creates |
| Check de lista | Inter 800 | 12 px | 17,4 px | normal | #240E30 | Normal | ✓ |
| Chip de seção | Inter 600 | 11 px | 15,95 px | normal | #240E30 / branco | Normal | How we grow you, Pricing, FAQ |
| Cabeçalho de coluna do rodapé | Inter 700 | 11 px | 15,95 px | 1,1 px | #240E30 | Mantido em maiúsculas no texto | PAGES, SOCIAL |
| Label "FOLLOWERS" | Inter 700 | 11 px | 15,95 px | 0,88 px | #D6FA50 | Maiúsculas no texto | FOLLOWERS |
| Badge "Most popular" | Inter 700 | 11 px | 15,95 px | normal | #240E30 | Normal | Selo no plano Growth |
| Label "EST. MONTHLY SALES" | Inter 700 | 10 px | 14,5 px | 0,8 px | #240E30 | Maiúsculas no texto | Card de vendas |
| Legenda "30 posts planned" | Inter 400 | 10 px | 14,5 px | normal | Branco 65% | Normal | Mini-card escuro |

Regra de line-height: todo texto Inter usa 1,45 vezes o tamanho (exceto hero 1,5 e citações 1,5). Títulos Unbounded usam entre 0,85 (wordmark) e 1,08 (menu).

### 3.3 Hierarquia de leitura

1. Hero H1 (168 px) domina a dobra inicial e ocupa três linhas centralizadas.
2. H2 de seção (48 px) vem sempre depois de um chip de 11 px que funciona como "eyebrow" (rótulo da seção).
3. Abaixo do H2 existe, quando necessário, um parágrafo de 16 px com 62% de opacidade, centralizado.
4. Dentro dos cards, o título (Unbounded 20 a 32 px) é sempre mais pesado visualmente que a descrição (Inter 13 a 14 px), com salto de 3 a 5 vezes entre os dois níveis.
5. Números e métricas (estatísticas, preços) reutilizam Unbounded para ganhar o mesmo peso dos títulos.

### 3.4 Ênfase em títulos

Padrão de quebra de linha e destaque dos H2 (palavra destacada em MAIÚSCULAS dentro do título):

| Título | Destaque |
|---|---|
| #GROW LOUDER ONLINE | "#" e "LOUDER" em rosa; "GROW" e "ONLINE" em berinjela |
| THREE STEPS TO A LOUDER BRAND | "LOUDER" em rosa |
| ONE TEAM, EVERY FEED | "FEED" em rosa |
| RESULTS WE'RE PROUD OF | "PROUD OF" em limão (fundo escuro) |
| SIMPLE PLANS, LOUD RESULTS | "LOUD" em rosa |
| BRANDS THAT GOT LOUDER | "LOUDER" em rosa |
| QUESTIONS? WE'VE GOT ANSWERS | "ANSWERS" em limão (fundo escuro) |
| READY TO GET LOUD? | "LOUD" em berinjela (fundo rosa) |

---

## 4. Layout e estrutura da página

### 4.1 Moldura geral

- O fundo geral da página é #240E30 com padding de 12 px em todos os lados.
- Cada seção é um bloco arredondado (raio 32 px) com largura de 1294 px (viewport menos 24 px) e margem de 11 a 12 px entre blocos.
- O conteúdo interno de cada seção fica num contêiner centralizado de 1120 px de largura (do x = 99 ao x = 1219 em viewport de 1317 px). O hero e o rodapé usam margens laterais de 40 px.
- Padding vertical das seções: entre 70 px e 90 px no topo, entre 80 px e 150 px embaixo.
- Barra de navegação fixa no topo, de 89 px de altura, por cima de todas as seções.

### 4.2 Sequência de seções (ordem, altura e cor)

| # | Seção | Y (px) | Altura | Fundo | Raio |
|---|---|---|---|---|---|
| 0 | Navegação fixa | 0 | 89 | transparente | n/a |
| 1 | Hero | 12 | 893 | Imagem de grade rosa sobre branco-gelo | 32 px |
| 2 | How we grow you | 916 | 703 | #FFFFFF | 32 px |
| 3 | What we do | 1631 | 823 | #D6FA50 | 32 px |
| 4 | Recent wins | 2467 | 849 | #240E30 (mesmo fundo da moldura) | 32 px |
| 5 | Pricing | 3328 | 876 | #FFFFFF | 32 px |
| 6 | Results (The numbers) | 4215 | 727 | #D6FA50 | 32 px |
| 7 | FAQ | 4955 | 564 | #240E30 (mesmo fundo da moldura) | n/a |
| 8 | Rodapé (CTA + links) | 5531 | 671 | #EC4899 | 32 px |

Alternância de cores: claro (hero) > branco > limão > escuro > branco > limão > escuro > rosa. O ritmo evita duas seções vizinhas iguais.

### 4.3 Grids

| Seção | Estrutura | Colunas | Gap |
|---|---|---|---|
| How we grow you | 3 cards iguais de 360 x 330 px | 3 | 20 px (x = 99, 479, 859) |
| What we do | Lista vertical de linhas de 1120 x 104 px | 1 | 12 px |
| Recent wins | 3 cards de 360 x 440 px | 3 | 20 px |
| Pricing | 3 cards de 360 px, altura variável (422 / 441 / 433 px) | 3 | 20 px |
| Results (números) | 4 colunas de estatísticas | 4 | passo de 286 px |
| Results (depoimentos) | 3 cards de 360 px | 3 | 20 px |
| FAQ | 2 colunas: texto à esquerda (~380 px), accordion à direita (684 px, do x = 535 ao 1219) | 2 | ~156 px entre colunas |
| Rodapé | Texto e botões à esquerda, 2 colunas de links à direita (x = 1028 e 1147) | 2 + 1 | n/a |

### 4.4 Alinhamento

- Seções 2, 5 e 6: cabeçalho centralizado (chip, H2 e parágrafo no centro).
- Seções 3, 4 e 7: cabeçalho alinhado à esquerda, com botão de ação alinhado à direita na mesma linha do H2 (3 e 4).
- Hero: título centralizado, parágrafo e botões alinhados à esquerda embaixo, selo circular no canto inferior direito.
- Rodapé: título à esquerda, links à direita, wordmark gigante centralizado ocupando quase toda a largura.

---

## 5. Navegação (header fixo)

Posição: fixed, topo, largura total, altura 89 px, z-index acima de tudo.

| Elemento | Medidas e estilo |
|---|---|
| Logo, parte 1 "LOUDLY" | Pílula berinjela #240E30, 104 x 37 px, raio 999 px, padding 0 15 px, texto Unbounded 800 15 px branco, letter-spacing -0,3 px |
| Logo, parte 2 "STUDIO" | Etiqueta limão #D6FA50, 83 x 43 px, rotação de -4°, raio `999px 999px 999px 6px` (canto inferior esquerdo quase reto), padding 0 12 px, contorno fino berinjela, texto Unbounded 800 12 px berinjela |
| Botão Menu | Pílula limão, 93 x 41 px, raio 999 px, padding 0 18 px, gap 8 px, ícone ☰ + texto "Menu" em Inter 700, contorno fino berinjela |

Comportamento adaptativo da barra (observado ao rolar):

- Sobre fundo claro ou rosa (hero, branco): logo com pílula berinjela, tag limão preenchida, Menu limão preenchido.
- Sobre fundo limão: a tag "STUDIO" e o botão "Menu" ficam sem preenchimento (transparentes) e mostram só o contorno berinjela. A pílula "LOUDLY" continua berinjela.
- Sobre fundo berinjela: a pílula do logo se funde ao fundo (texto "LOUDLY" fica branco flutuando), a tag e o botão ficam limão.

### 5.1 Menu em tela cheia

- Ao clicar em Menu, o botão vira "Close" com ícone ✕ (Inter 700 13 px) e um painel cobre a tela inteira com fundo #240E30.
- Links empilhados no canto inferior esquerdo (x = 35 px): HOME, SERVICES, WORK, ABOUT, CONTACT em Unbounded 800, 44 px, line-height 47,52 px, letter-spacing -1,76 px, branco, passo vertical de ~53,5 px.
- Entrada animada: os links entram deslizando da esquerda com fade, em cascata (no início aparecem com opacidade reduzida e deslocados).
- Rodapé do menu: botão limão "Book a free call ↗" + texto "hello@loudly.studio · @loudly.studio" em Inter 14 px, branco 70%.
- Transição do overlay: opacity 0,3 s ease-in-out.

---

## 6. Hero (seção 1)

### 6.1 Estrutura

Camadas, de baixo para cima:

1. Imagem de fundo (cover, raio 32 px, 1294 x 893 px): grade rosa em perspectiva. Metade superior é uma parede quadriculada reta; metade inferior curva para baixo e vira um piso em perspectiva (efeito "palco 3D" retrô). Linhas rosa claras sobre fundo branco-gelo (aproximadamente #F7F7F7). Cor das linhas é aproximada ao rosa #EC4899 com cerca de 40% de opacidade (não medida pixel a pixel).
2. Título H1 centralizado (container "Center", padding 90 px 40 px 150 px).
3. Cards de vidro e rabiscos posicionados em absoluto ao redor do título.
4. Bloco inferior esquerdo: parágrafo + 2 botões.
5. Selo circular rotativo no canto inferior direito.

### 6.2 Título

Três linhas, Unbounded 800, 168 px, line-height 151,2 px, tracking -6,72 px, maiúsculas:

- Linha 1: "#" (rosa) + "GROW" (berinjela)
- Linha 2: "LOUDER" (rosa)
- Linha 3: "ONLINE" (berinjela)

### 6.3 Parágrafo e botões

- Parágrafo: "We turn small brands into the ones everybody talks about. Strategy, content and ads that actually grow your numbers." Inter 500, 15 px, line-height 22,5 px, berinjela, largura ~330 px, posição x = 52 px.
- Botão primário "Start growing ↗": 163 x 47 px (ver seção 9.1).
- Botão secundário "See our work": 122 x 47 px, fundo branco 55%, blur 10 px, contorno 1 px berinjela, Inter 600 13 px.

### 6.4 Cards de vidro (social proof flutuante)

| Card | Tamanho | Fundo | Raio | Blur | Sombra | Inclinação | Conteúdo |
|---|---|---|---|---|---|---|---|
| @mia.creates | 190 x 175 px (canto superior direito) | rgba(255,255,255,0.42) | 30 px | backdrop-filter 14 px | 0 18px 44px rgba(40,70,120,0.16) | 0° | Avatar circular de 76 px, @mia.creates Inter 700 16 px, "+248% reach in 60 days" Inter 500 12 px berinjela 62% |
| @leo.bakes | 215 x 202 px (esquerda, abaixo do título) | idem | 30 px | 14 px | idem | -9° | Avatar de 87 px, @leo.bakes, "12.4k new followers" |

Os avatares são fotos redondas com anel branco, fundo do avatar colorido (rosa/lima).

### 6.5 Vetores e rabiscos

- Seta curva rosa grande (169 x 169 px, rotação 6°): sai do card @mia.creates e aponta para o "W" de GROW, desenhada com traço grosso arredondado em #EC4899, com ponta de seta aberta. Estilo caneta marcadora.
- Seta rosa em S (183 x 156 px, rotação -4°): sobe do canto inferior esquerdo do "O" de ONLINE, com cabeça de seta à direita. Mesmo traço.
- Selo circular (sticker): círculo limão #D6FA50 de ~150 px com anel de texto girando "LET'S TALK GROWTH" repetido (Unbounded 800, berinjela, texto ao longo de círculo, separado por pontos), ícone espiral/loop ao centro (56 px, traço berinjela). Posição: canto inferior direito do hero (x ~1096, y ~708). Imagem do anel: 210 x 210 px.

---

## 7. Seção "How we grow you" (passos)

- Fundo branco, raio 32 px, padding 70 px 40 px 80 px.
- Chip centralizado "How we grow you": 122 x 30 px, fundo #F4F0F6, raio 999 px, padding 0 14 px, contorno fino berinjela, Inter 600 11 px.
- H2 centralizado em 3 linhas: "THREE STEPS / TO A LOUDER / BRAND" (44 px, destaque rosa em "LOUDER").
- 3 cards: 360 x 330 px, fundo #F4F0F6, raio 28 px, texto centralizado, padding interno ~26 px.
  - Título: Unbounded 24 px, duas linhas (PLAN YOUR / CONTENT, GROW YOUR / AUDIENCE, TURN LIKES / INTO SALES).
  - Subtítulo: Inter 400 13 px, berinjela 62% ("a 30-day calendar built around your brand", "real people who love what you do", "ads and funnels that pay for themselves").
  - Ilustração UI dentro do card:
    1. Mini-perfil escuro 161 x 131 px, #240E30, raio 20 px, rotação -6°, com avatar 48 px, "@nora.studio" (Inter 700 12 px branco) e "30 posts planned" (Inter 400 10 px, branco 65%). Ao lado, etiqueta limão "30 DAYS" (114 x 43 px, raio 18 px, rotação 4°, Unbounded 15 px).
    2. Pílula escura 268 x 56 px, raio 999 px, "+12,480" (Unbounded 20 px branco) + "FOLLOWERS" (Inter 700 11 px, tracking 0,88 px, limão). Abaixo, círculo limão de 54 px com ícone de espiral/loop (30 px).
    3. Card limão 248 x 80 px, raio 26 px, contorno berinjela 1 px, sombra suave. Rótulo "EST. MONTHLY SALES" (Inter 700 10 px, tracking 0,8 px) + "$18,420" (Unbounded 30 px).
- Conectores entre cards: rabiscos de linha ondulada com seta, traço berinjela fino (~2 px), imagens de 68 x 46 px (rotação -6°) e 69 x 49 px (rotação 8°), posicionados nos vãos entre card 1/2 e 2/3.
- Entrada do primeiro card: levemente rotacionado e deslocado, assentando durante o scroll (animação de entrada).

---

## 8. Seção "What we do" (serviços)

- Fundo limão #D6FA50, raio 32 px, padding 90 px 40 px.
- Chip "What we do" (91 x 30 px, fundo branco 50%, contorno berinjela), alinhado à esquerda.
- H2 à esquerda em 2 linhas: "ONE TEAM, / EVERY FEED" (48 px, destaque rosa em "FEED").
- Botão "All services ↗" alinhado à direita, na altura do H2: 151 x 48 px, berinjela, raio 999 px, texto Inter 600 14 px branco, círculo limão de ~31 px com seta ↗ berinjela à direita.
- Lista de 4 linhas (não são accordion; são cards-link de uma coluna):

| Nº | Título | Descrição |
|---|---|---|
| 01 | SOCIAL STRATEGY | Plans, calendars and content pillars that make sense. |
| 02 | CONTENT PRODUCTION | Reels, photos and UGC made by our in-house creators. |
| 03 | PAID ADS | Meta, TikTok and Google ads built to pay for themselves. |
| 04 | CREATOR PARTNERSHIPS | Creators your audience already loves and trusts. |

### 8.1 Anatomia da linha de serviço

| Propriedade | Valor |
|---|---|
| Tamanho | 1120 x 104 px |
| Fundo | rgba(255, 255, 255, 0.55) |
| Raio | 24 px |
| Padding | 22 px 26 px |
| Contorno | 1 px berinjela (via inset shadow) |
| Passo vertical entre linhas | 116 px (gap de 12 px) |
| Número | Inter 700 13 px, #EC4899, alinhado à esquerda do título |
| Título | Unbounded 800 32 px, #240E30, ao lado do número |
| Descrição | Inter 400 14 px, berinjela 62%, abaixo do título |
| Botão de seta | Círculo 46 px, #240E30, ↗ em Inter 700 16 px limão, alinhado à direita e centralizado verticalmente |
| Hover | `transform: scale(1.01)` (a linha cresce 1% e se desloca 5 px para a esquerda do eixo), transição "all" |

---

## 9. Botões e controles

### 9.1 Primário escuro com ícone (CTA principal)

Usado em: "Start growing" (hero), "All services" (seção de serviços), "Book a free call" (rodapé).

| Propriedade | Valor |
|---|---|
| Altura | 47 a 51 px |
| Padding | 0 8px 0 22px (ícone circular encosta na direita) |
| Gap interno | 10 px |
| Fundo | #240E30 |
| Raio | 999 px |
| Texto | Inter 600 14 px, #FFFFFF |
| Ícone | Círculo de 31 px (35 px no rodapé), fundo #D6FA50, seta ↗ em berinjela, Inter 700 14 a 16 px |
| Cursor | pointer; `transition: all` |

### 9.2 Primário limão

Usado em: "Book a free call" na seção FAQ e no menu.

- Altura 47 px, largura 175 px, fundo #D6FA50, raio 999 px, padding 0 8px 0 22px, gap 10 px.
- Texto Inter 600 14 px berinjela, ícone círculo berinjela de 31 px com seta ↗ limão (invertido em relação ao 9.1).

### 9.3 Fantasma translúcido

Usado em: "See our work".

- Altura 47 px, padding 0 20 px, fundo rgba(255,255,255,0.55), backdrop-filter blur 10 px, contorno 1 px berinjela, raio 999 px, Inter 600 13 px berinjela.

### 9.4 Contorno branco (sobre fundos escuros e rosa)

Usado em: "All case studies ↗" (Recent wins) e "hello@loudly.studio" (rodapé).

- Fundo transparente (ou branco 8%), contorno 1 px branco, raio 999 px, Inter 600/700 14 px branco; "All case studies" traz ↗ simples em limão ao lado do texto.
- "All case studies ↗": 167 x 45 px, padding 0 22 px, texto Inter 600 14 px branco.
- "hello@loudly.studio" (rodapé): 178 x 51 px, padding 0 22 px.

### 9.5 Botão do menu

Pílula limão 93 x 41 px, ver seção 5.

### 9.6 Botões de plano (largura total do card)

| Variação | Fundo | Texto | Altura | Raio |
|---|---|---|---|---|
| Em card claro (Starter, Scale) | #240E30 | Branco, Inter 700 14 px | 50 px | 999 px |
| Em card escuro (Growth) | #D6FA50 | #240E30, Inter 700 14 px | 50 px | 999 px |

Largura do botão: 308 px (card de 360 px menos padding de 26 px de cada lado).

### 9.7 Ícones circulares

| Ícone | Diâmetro | Fundo | Cor do glifo |
|---|---|---|---|
| Seta no CTA | 31 px | #D6FA50 | Berinjela |
| Seta na linha de serviço | 46 px | #240E30 | #D6FA50 |
| Check das listas de plano | 21 px | Branco (card claro) ou #D6FA50 (card escuro) | Berinjela, Inter 800 12 px |
| "+" do FAQ | 33 px | #240E30 | #D6FA50 |
| "×" do FAQ aberto | 33 px | #EC4899 | Berinjela |
| Seta no CTA do rodapé | 35 px | #D6FA50 | Berinjela |

### 9.8 Estados

- Hover observado: linhas de serviço e itens de FAQ fazem `scale(1.01)`. Todos os botões declaram `transition: all` (duração e easing não medidos).
- Cursor pointer em todos os controles interativos.
- Estado de foco: não medido.

---

## 10. Chips, etiquetas e badges

| Elemento | Medida | Fundo | Contorno | Texto |
|---|---|---|---|---|
| Chip de seção em fundo branco | 122 x 30 px, raio 999 px, padding 0 14 px | #F4F0F6 | 1 px berinjela | Inter 600 11 px berinjela |
| Chip de seção em fundo limão | 91 x 30 px | rgba(255,255,255,0.5) | 1 px berinjela | idem |
| Chip de seção em fundo escuro | 92 x 30 px ("Recent wins"), 49 x 30 px ("FAQ"), padding 0 14 px | rgba(255,255,255,0.08) | contorno fino branco | Inter 600 11 px branco |
| Etiqueta de marca sobre foto | 86 a 115 x 33 px, raio 999 px, padding 0 14 px | rgba(255,255,255,0.85) + blur 10 px | nenhum | Inter 700 14 px berinjela |
| Etiqueta de resultado sobre foto | ~109 x 34 px | #D6FA50 | nenhum | Inter 700 14 px berinjela |
| Badge "Most popular" | 96 x ~30 px, rotação 4° | #D6FA50 | nenhum | Inter 700 11 px berinjela |
| Etiqueta "30 DAYS" | 114 x 43 px, raio 18 px, rotação 4° | #D6FA50 | 1 px berinjela | Unbounded 800 15 px |
| Tag "STUDIO" | 83 x 43 px, rotação -4° | #D6FA50 | 1 px berinjela | Unbounded 800 12 px |

---

## 11. Seção "Recent wins" (cases)

- Fundo #240E30, raio 32 px.
- Chip "Recent wins" (contorno branco), H2 à esquerda "RESULTS WE'RE / PROUD OF" (48 px branco; "PROUD OF" em limão), botão contorno "All case studies ↗" à direita.
- 3 cards de case:

| Propriedade | Valor |
|---|---|
| Imagem | 360 x 440 px, `object-fit: cover`, raio 26 px |
| Estilo fotográfico | Fotos realistas com paleta rosa-pastel combinando com a marca (café com parede rosa, criadora com ring light, cosméticos com blocos de acrílico limão) |
| Chips sobrepostos | Base esquerda da foto, 2 pílulas lado a lado (nome da marca em branco 85% + resultado em limão), distância de ~16 px da borda |
| Legenda | Abaixo da imagem, Inter 500 14 px branco 70% à esquerda, seta ↗ limão (Inter 400 16 px) à direita |

| Case | Chip da marca | Chip do resultado | Legenda |
|---|---|---|---|
| 1 | Bean & Bloom | +312% sales | Café · Instagram + Ads |
| 2 | Mia Creates | 2.1M views | Creator · TikTok growth |
| 3 | Glow Lab | 4.8x ROAS | Skincare · Paid social |

- Animação: no scroll, o card 1 entra levemente inclinado e assenta.

---

## 12. Seção "Pricing"

- Fundo branco, raio 32 px, padding 90 px 40 px.
- Cabeçalho centralizado: chip "Pricing", H2 "SIMPLE PLANS, / LOUD RESULTS" (48 px, "LOUD" em rosa), parágrafo Inter 400 16 px berinjela 62%, largura máxima ~560 px: "No long contracts. Pick a plan, cancel anytime, and get a dedicated team from day one."
- 3 cards de plano, 360 px de largura, gap 20 px.

### 12.1 Anatomia do card de plano

| Propriedade | Starter e Scale | Growth (destaque) |
|---|---|---|
| Fundo | #F4F0F6 | #240E30 |
| Raio | 28 px | 28 px |
| Padding | ~26 px | ~26 px |
| Altura | 422 px / 433 px | 441 px (mais alto, ligeiramente deslocado para baixo) |
| Nome do plano | Unbounded 20 px berinjela | Unbounded 20 px branco |
| Preço | Unbounded 44 px berinjela | Unbounded 44 px limão |
| "/month" | Inter 400 14 px berinjela 62% | Inter 400 14 px branco 60% |
| Descrição | Inter 400 14 px berinjela 62% | Inter 400 14 px branco 70% |
| Divisor | Linha de 1 px, rgba(36, 14, 48, 0.12), largura 308 px | Linha de 1 px, rgba(255, 255, 255, 0.15), largura 308 px |
| Lista | Itens Inter 400 14 px, check branco 21 px, gap vertical ~12 px | Itens Inter 400 14 px branco, check limão 21 px |
| Botão | Berinjela, texto branco | Limão, texto berinjela |
| Badge | nenhum | "Most popular" limão, rotação 4°, no canto superior direito, pendurado para fora do padding |

| Plano | Preço | Descrição | Itens |
|---|---|---|---|
| Starter | $890 /month | For new brands that need a steady, good-looking feed. | 12 posts per month; 1 platform; Monthly content plan; Basic monthly report |
| Growth | $1,890 /month | Content + ads for brands ready to grow fast. | 20 posts + 8 reels; 2 platforms; Paid ads management; Community management; Bi-weekly reports |
| Scale | $3,490 /month | A full marketing team for brands going big. | Unlimited content; All platforms; Ads + funnels + email; Creator partnerships; Weekly strategy calls |

Botões: Starter "Get started", Growth "Start growing", Scale "Get started".

---

## 13. Seção "Results" (números e depoimentos)

- Fundo limão #D6FA50, raio 32 px.
- Cabeçalho centralizado: chip "The numbers" (fundo branco 50%, contorno berinjela), H2 "BRANDS THAT / GOT LOUDER" (48 px, "LOUDER" em rosa).

### 13.1 Estatísticas (4 colunas)

Número em Unbounded 52 px (tracking -2,6 px) + label em Inter 600 14 px, ambos berinjela, alinhados à esquerda.

| Número | Label |
|---|---|
| 2.4M | views generated last month |
| +186% | average follower growth |
| 120+ | brands grown since 2019 |
| 4.9★ | average client rating |

### 13.2 Cards de depoimento

| Propriedade | Valor |
|---|---|
| Tamanho | 360 x ~229 px |
| Fundo | #FFFFFF |
| Raio | 26 px |
| Padding | 26 px 24 px |
| Gap interno | 18 px |
| Sombra | 0 18px 44px rgba(40,70,120,0.16) |
| Inclinação | Card 1: 0°, card 2: +1,5°, card 3: -1° (efeito de adesivos soltos) |
| Estrelas | ★★★★★ Inter 400 16 px, #EC4899, letter-spacing 1,6 px |
| Citação | Inter 500 16 px, line-height 24 px, berinjela, entre aspas curvas |
| Autor | Avatar redondo de 49 px + nome Inter 700 14 px + cargo Inter 400 12 px berinjela 62% |

| Autor | Cargo | Citação |
|---|---|---|
| Mia Torres | Creator, @mia.creates | "In two months my account went from 3k to 40k. They just get what works on TikTok." |
| Leo Martin | Owner, Leo Bakes | "Our weekend orders doubled after the first campaign. Best money we spend every month." |
| Nora Blake | Founder, Nora Studio | "Fast, fun and seriously smart. Our launch sold out in four days." |

---

## 14. Seção "FAQ" (accordion)

- Fundo #240E30 (mesmo da moldura, sem bloco arredondado visível).
- Coluna esquerda:
  - Chip "FAQ" (contorno branco).
  - H2 em 3 linhas "QUESTIONS? / WE'VE GOT / ANSWERS" (48 px branco, "ANSWERS" em limão).
  - Parágrafo Inter 400 16 px branco 70%: "Still curious? Book a free call and ask us anything."
  - Botão limão "Book a free call ↗" (ver 9.2).
  - Rabisco ondulado com seta em berinjela claro, baixa opacidade, decorativo, embaixo do botão.
- Coluna direita: 4 itens de accordion empilhados, 684 px de largura.

### 14.1 Anatomia do item (estado fechado)

| Propriedade | Valor |
|---|---|
| Tamanho | 684 x 78 px |
| Fundo | #FFFFFF |
| Raio | 22 px |
| Padding | 22 px 24 px |
| Gap interno | 10 px |
| Passo vertical entre itens | 90 px (gap de 12 px) |
| Pergunta | Inter 700 17 px, berinjela |
| Ícone | Círculo de 33 px #240E30 com "+" limão (Inter 700 18 px), alinhado à direita e centralizado verticalmente |

### 14.2 Estado aberto

- O item cresce em altura (de 78 para ~132 px) e recebe `transform: scale(1.01)` (fica ~1% maior).
- A resposta aparece abaixo da pergunta, Inter 400 15 px, berinjela 62%, line-height 21,75 px, em até duas linhas. Altura do item aberto: 132 px (verificado).
- O ícone gira 45° e muda: o círculo vira #EC4899 e o "+" vira "×" em berinjela.
- Os itens abaixo descem para acomodar a nova altura (transição suave).
- Perguntas:

1. What kind of brands do you work with? Resposta: "Small and growing brands: cafés, creators, beauty, fitness, local shops and DTC products."
2. How long until I see results?
3. Do I need a long contract?
4. Do you make the content too?

(Comportamento observado nos itens 2 a 4: o mesmo padrão do item 1; as respostas não foram abertas na análise.)

---

## 15. Rodapé

- Fundo rosa #EC4899, raio 32 px, bloco de 1294 x ~671 px.
- Cabeçalho do rodapé:
  - H2 "READY TO / GET LOUD?" em Unbounded 56 px branco; "LOUD" em berinjela.
  - Parágrafo Inter 400 16 px branco 90%, largura máxima ~540 px: "Book a free 30-minute call. We'll look at your brand and tell you exactly what we'd do first."
  - Dois botões: berinjela "Book a free call ↗" (181 x 51 px, ícone limão de 35 px) e contorno branco "hello@loudly.studio" (Inter 600 14 px).
- Colunas de links (alinhadas à direita da seção):

| Coluna | Título | Itens |
|---|---|---|
| 1 (x = 1028 px) | PAGES | Home, Services, Work, About, Contact |
| 2 (x = 1147 px) | SOCIAL | Instagram, TikTok, LinkedIn, YouTube |

  - Título: Inter 700 11 px, tracking 1,1 px, berinjela.
  - Links: Inter 500 15 px, branco, passo vertical de ~31,5 px.
- Wordmark: "LOUDLY" em Unbounded 800 200 px, branco, line-height 170 px, tracking -10 px, centralizado, largura ~950 px, ocupando a parte inferior do bloco.
- Barra legal: "© 2026 Loudly Studio. All rights reserved." (Inter 400 13 px, branco 85%) à esquerda e "Designed by PixaroStudio" (Inter 600 13 px, branco) à direita.

---

## 16. Vetores, ilustrações e imagens

O site quase não usa SVG inline (apenas 3, um deles de uma extensão do navegador). Todos os rabiscos e ornamentos são imagens (PNG/SVG transparente exportados e posicionados no Framer). Inventário:

| Ativo | Tamanho | Onde | Rotação | Descrição |
|---|---|---|---|---|
| Grade de fundo do hero | 1294 x 893 px | Hero | 0° | Imagem cover, grade rosa em perspectiva, raio 32 px |
| Seta curva rosa grande | 169 x 169 px | Hero, topo direito | 6° | Traço grosso tipo marcador, aponta para o W de GROW |
| Seta em S rosa | 183 x 156 px | Hero, base esquerda | -4° | Sobe do "O" de ONLINE em direção à direita |
| Anel de texto "LET'S TALK GROWTH" | 210 x 210 px | Hero, canto inferior direito | gira continuamente | Texto em círculo, Unbounded 800, berinjela |
| Ícone espiral / loop | 56 px (hero) e 30 px (passo 2) | Selo do hero e card "+12,480" | 0° | Seta curva em espiral, traço berinjela, dentro de círculo limão |
| Rabisco ondulado com seta | 68 x 46 px | Entre cards de passo 1 e 2 | -6° | Linha sinuosa com ponta de seta, traço berinjela fino |
| Rabisco ondulado com seta (2) | 69 x 49 px | Entre cards de passo 2 e 3 | 8° | Idêntico ao anterior, espelhado |
| Rabisco decorativo no FAQ | ~80 x 35 px | FAQ, abaixo do botão | -8° | Mesma linha ondulada, em baixa opacidade |
| Avatares circulares | 49 a 87 px | Hero, passos, depoimentos | 0° | Fotos de rosto, `object-fit: cover`, raio 999 px |
| Fotos de case | 360 x 440 px | Recent wins | 0° | Fotografia lifestyle, raio 26 px |

Estilo dos rabiscos: traço contínuo de espessura constante (2 a 6 px conforme a escala), cantos arredondados, aparência de caneta marcadora desenhada rapidamente. Cor: rosa #EC4899 sobre fundo claro (hero) e berinjela #240E30 nos conectores.

Ícones de interface são caracteres tipográficos (↗, ✓, +, ×, ☰, ★), não SVG.

---

## 17. Espaçamento, raios e medidas recorrentes

### 17.1 Escala de raios

| Valor | Uso |
|---|---|
| 999 px / 99 px | Pílulas: botões, chips, ícones circulares, etiquetas |
| 32 px | Seções, imagem de fundo do hero, wrapper de blocos |
| 30 px | Cards de vidro do hero |
| 28 px | Cards de passo e de plano |
| 26 px | Cards de depoimento, fotos de case, card "EST. MONTHLY SALES" |
| 24 px | Linhas de serviço |
| 22 px | Itens do FAQ |
| 20 px | Mini-card escuro (@nora.studio) |
| 18 px | Etiqueta "30 DAYS" |
| `999px 999px 999px 6px` | Tag "STUDIO" (canto inferior esquerdo quase reto) |
| `26px 26px 26px 6px` e `18px 18px 18px 4px` | Balões de mensagem/etiqueta com "rabinho" |
| 10 a 12 px | Pequenos elementos utilitários (badge "Made in Framer") |

Regra: quanto maior o container, maior o raio, mantendo 22 a 32 px para cards e 999 px para tudo que é botão ou chip.

### 17.2 Espaçamentos mais frequentes

| Valor | Uso |
|---|---|
| 12 px | Moldura externa do site, gap entre linhas de serviço e itens de FAQ, gap entre seções |
| 20 px | Gap entre cards em grade de 3 colunas |
| 22 a 26 px | Padding interno de cards e linhas |
| 40 px | Padding lateral das seções |
| 70 a 90 px | Padding vertical das seções |
| 8 e 10 px | Gap interno de botões e padding do ícone circular |
| 14 px | Padding horizontal de chips |
| 18 px | Gap vertical interno do card de depoimento |

### 17.3 Medidas fixas

| Elemento | Medida |
|---|---|
| Contêiner de conteúdo | 1120 px, centralizado |
| Altura da navegação | 89 px |
| Altura de botão padrão | 47 px (grande: 50 a 51 px; pequeno: 41 px) |
| Altura de chip de seção | 30 px |
| Altura de linha de serviço | 104 px |
| Altura de item de FAQ fechado | 78 px |

---

## 18. Efeitos e movimento

| Efeito | Detalhe |
|---|---|
| Glassmorphism | backdrop-filter blur de 14 px (cards do hero) e 10 px (botão fantasma, chips sobre foto), fundo branco translúcido |
| Sombra de elevação | 0 18px 44px rgba(40,70,120,0.16) |
| Rotações estáticas | -9°, -8°, -6°, -4°, -1°, 1,5°, 4°, 6°, 8° em adesivos, etiquetas e cards |
| Entrada por scroll | Os elementos aparecem com fade e leve deslocamento/rotação ao entrar na tela (observado nos serviços, cases, passos, planos e depoimentos). Duração e easing não medidos |
| Hover | `scale(1.01)` em linhas de serviço e itens de FAQ; botões com `transition: all` |
| Selo circular | Texto em anel girando continuamente |
| Menu | Overlay com fade de 0,3 s ease-in-out e links entrando em cascata pela esquerda |
| Barra fixa | Troca de preenchimento (cheio para contorno) conforme a cor da seção sob ela |
| Badge "Made in Framer" | Fixo no canto inferior direito, branco, raio 10 px, não faz parte do design |

---

## 19. Conteúdo e tom de voz

- Idioma: inglês, tom informal e confiante, frases curtas, com verbos de ação ("Start growing", "Book a free call", "Get started").
- Hashtag no título principal (#GROW LOUDER ONLINE) reforça o universo de redes sociais.
- Números concretos como prova (+248%, +312%, 4.8x ROAS, 2.4M views).
- CTA repetido em 5 pontos: hero, serviços, planos, FAQ e rodapé.
- Subtítulos com promessa prática ("ads and funnels that pay for themselves").

---

## 20. Padrões de composição reaproveitáveis

1. **Seção padrão**: bloco de 32 px de raio + chip de 30 px + H2 de 48 px com 1 palavra em cor de destaque + conteúdo em contêiner de 1120 px.
2. **Card de 3 colunas**: 360 px de largura, gap de 20 px, raio entre 26 e 28 px.
3. **Botão com ícone**: pílula + círculo de cor invertida embutido à direita com seta ↗.
4. **Etiqueta adesivo**: pílula de cor viva, 4° a 8° de rotação, contorno fino, fonte Unbounded ou Inter 700.
5. **Linha clicável**: número em rosa + título Unbounded + descrição + círculo com seta, hover de 1,01.
6. **Inversão de cores por fundo**: ver tabela 2.3; sempre dois tons de texto (principal e destaque) mais um tom de ação.

---

## 21. CSS de referência (valores diretos em hex e px)

```css
/* Moldura e seções */
body { background: #240E30; padding: 12px; font-family: Inter, sans-serif; }
.section { border-radius: 32px; margin-bottom: 12px; padding: 90px 40px; }
.section-white { background: #FFFFFF; color: #240E30; }
.section-lime  { background: #D6FA50; color: #240E30; }
.section-dark  { background: #240E30; color: #FFFFFF; }
.section-pink  { background: #EC4899; color: #FFFFFF; }
.container { max-width: 1120px; margin: 0 auto; }

/* Tipografia */
.h1-hero   { font-family: Unbounded, sans-serif; font-weight: 800; font-size: 168px; line-height: 151.2px; letter-spacing: -6.72px; text-transform: uppercase; color: #240E30; }
.h2        { font-family: Unbounded, sans-serif; font-weight: 800; font-size: 48px; line-height: 48.96px; letter-spacing: -1.92px; text-transform: uppercase; }
.h3-service{ font-family: Unbounded, sans-serif; font-weight: 800; font-size: 32px; line-height: 33.6px; letter-spacing: -0.96px; text-transform: uppercase; }
.h3-step   { font-family: Unbounded, sans-serif; font-weight: 800; font-size: 24px; line-height: 25.2px; letter-spacing: -0.72px; text-transform: uppercase; }
.stat      { font-family: Unbounded, sans-serif; font-weight: 800; font-size: 52px; line-height: 52px; letter-spacing: -2.6px; text-transform: uppercase; }
.p-body    { font-family: Inter, sans-serif; font-weight: 400; font-size: 16px; line-height: 23.2px; color: rgba(36, 14, 48, 0.62); }
.p-small   { font-family: Inter, sans-serif; font-weight: 400; font-size: 14px; line-height: 20.3px; color: rgba(36, 14, 48, 0.62); }
.accent-pink { color: #EC4899; }
.accent-lime { color: #D6FA50; }

/* Chip de seção */
.chip { display: inline-flex; align-items: center; height: 30px; padding: 0 14px; border-radius: 999px; background: #F4F0F6; box-shadow: inset 0 0 0 1px #240E30; font: 600 11px/15.95px Inter, sans-serif; color: #240E30; }

/* Botão primário */
.btn { display: inline-flex; align-items: center; gap: 10px; height: 47px; padding: 0 8px 0 22px; border-radius: 999px; background: #240E30; color: #FFFFFF; font: 600 14px/20.3px Inter, sans-serif; transition: all 0.3s; }
.btn-icon { width: 31px; height: 31px; border-radius: 999px; background: #D6FA50; color: #240E30; display: flex; align-items: center; justify-content: center; font: 700 14px/1 Inter, sans-serif; }
.btn-lime { background: #D6FA50; color: #240E30; }
.btn-lime .btn-icon { background: #240E30; color: #D6FA50; }
.btn-ghost { background: rgba(255, 255, 255, 0.55); backdrop-filter: blur(10px); color: #240E30; box-shadow: inset 0 0 0 1px #240E30; padding: 0 20px; font-size: 13px; }

/* Cards */
.card-step { width: 360px; height: 330px; background: #F4F0F6; border-radius: 28px; text-align: center; padding: 26px; }
.card-glass { background: rgba(255, 255, 255, 0.42); backdrop-filter: blur(14px); border-radius: 30px; box-shadow: 0 18px 44px rgba(40, 70, 120, 0.16); }
.card-quote { width: 360px; background: #FFFFFF; border-radius: 26px; padding: 26px 24px; box-shadow: 0 18px 44px rgba(40, 70, 120, 0.16); display: flex; flex-direction: column; gap: 18px; }
.card-plan { width: 360px; background: #F4F0F6; border-radius: 28px; padding: 26px; }
.card-plan.featured { background: #240E30; color: #FFFFFF; }

/* Linha de serviço */
.service-row { display: flex; align-items: center; justify-content: space-between; height: 104px; padding: 22px 26px; border-radius: 24px; background: rgba(255, 255, 255, 0.55); box-shadow: inset 0 0 0 1px #240E30; transition: all 0.3s; }
.service-row:hover { transform: scale(1.01); }
.service-arrow { width: 46px; height: 46px; border-radius: 999px; background: #240E30; color: #D6FA50; }

/* Accordion */
.faq-item { background: #FFFFFF; border-radius: 22px; padding: 22px 24px; margin-bottom: 12px; transition: all 0.3s; }
.faq-item.open { transform: scale(1.01); }
.faq-q { font: 700 17px/24.65px Inter, sans-serif; color: #240E30; }
.faq-a { font: 400 15px/21.75px Inter, sans-serif; color: rgba(36, 14, 48, 0.62); }
.faq-icon { width: 33px; height: 33px; border-radius: 999px; background: #240E30; color: #D6FA50; }
.faq-item.open .faq-icon { background: #EC4899; color: #240E30; transform: rotate(45deg); }
```

---

# PARTE 2: PÁGINAS INTERNAS DO MENU

As seções 1 a 21 documentam o design system e a página Home. As seções 22 a 27 abaixo documentam as demais páginas do menu (Services, Work, About e Contact), medidas da mesma forma, e a seção 28 traz inconsistências e limitações.

Todas as páginas compartilham: moldura #240E30 com padding de 12 px, seções em blocos de raio 32 px, header fixo de 89 px, chip de seção + H2 de 48 px com uma palavra de destaque, FAQ/depoimentos/preços reaproveitados e o mesmo rodapé rosa (com título 56 px "READY TO GET LOUD?", links PAGES e SOCIAL e wordmark de 200 px). O rodapé fica dentro de um contêiner escuro com padding 0 12 12 e o painel rosa tem 659 px de altura, padding 80 40 28 e raio 32 px.

## 22. Mapa das páginas e ritmo de cores

| Página | Altura total | Sequência de seções (fundo, altura) |
|---|---|---|
| Home | 6202 px | Hero grade (893) > branco (703) > limão (823) > escuro (849) > branco (876) > limão (727) > escuro FAQ (564) > rosa rodapé |
| Services | 6124 px | Hero limão (892) > branco serviços (1124) > escuro How it works (592) > limão plataformas (676) > branco pricing (875) > escuro depoimentos (577) > limão FAQ (617) > rosa rodapé |
| Work | 6227 px | Hero escuro (892) > branco caso em destaque (720) > escuro galeria (1319) > limão números (560) > lavanda spotlight (720) > escuro indústrias (670) > branco depoimentos (577) > rosa rodapé |
| About | 5470 px | Hero grade (892) > branco história (700) > escuro time (752) > limão valores (617) > branco clientes (715) > escuro linha do tempo (558) > lavanda vagas (468) > rosa rodapé |
| Contact | 5459 px | Hero rosa (892) > branco formulário (734) > escuro próximos passos (569) > limão FAQ (587) > branco socials (579) > escuro estúdio (647) > limão newsletter (681) > rosa rodapé |

Cada página abre com um hero de identidade própria e alterna as cores das seções sem repetir dois fundos iguais seguidos (exceto o fundo lavanda #F4F0F6, usado como "branco quente" em Work e About).

| Hero | Fundo | Título (tamanho / line-height / tracking) | Cores do título |
|---|---|---|---|
| Home | Imagem de grade rosa em perspectiva | 168 / 151,2 / -6,72 px | berinjela, rosa |
| Services | Limão #D6FA50 | 90 / 82,8 / -3,6 px | berinjela, rosa |
| Work | Berinjela #240E30 com grade tonal | 120 / 110,4 / -4,8 px | branco, limão, rosa |
| About | Mesma imagem de grade rosa da Home | 96 / 88,32 / -3,84 px | berinjela, rosa |
| Contact | Rosa #EC4899 com grade tonal | 128 / 117,76 / -5,12 px | branco, berinjela |

Escala de títulos adicionais encontrados nas páginas internas (todos Unbounded 800, maiúsculas):

| Tamanho | Line-height | Tracking | Uso |
|---|---|---|---|
| 120 px | 110,4 px | -4,8 px | H1 do Work |
| 128 px | 117,76 px | -5,12 px | H1 do Contact |
| 96 px | 88,32 px | -3,84 px | H1 do About |
| 90 px | 82,8 px | -3,6 px | H1 do Services |
| 52 px | 53,04 px | -2,08 px | H2 "SMALL TEAM, BIG NOISE" (About) |
| 46 px | 46,92 px | -1,84 px | H2 dos casos do Work ("A BAKERY THAT SELLS OUT EVERY WEEKEND", "SKINCARE ADS WITH A 4.8X RETURN") |
| 34 px | 34 px | -1,36 px | Números de cases e da história (+212%, 18K, 4.8X, 2019, 12) |
| 26 px | 26 px | -0,78 px | Nome da rede social nos cards do Contact |
| 24 px | 24 px | -0,48 px | E-mail do botão do hero do Contact |
| 22 px | 23,1 px | -0,66 px | Título dos cards (Services hero, valores do About) |
| 21 px | 23,1 px | -0,42 px | Título dos passos (How it works, What happens next) |
| 19 px | 20,9 px | -0,38 px | Título da linha do tempo (About) |
| 18 px | 18 a 19,8 px | -0,36 px | Nomes do time, vagas, pílulas de marcas, números dos valores, adesivos do hero Contact |
| 16 px | 16 px | -0,32 px | Números dentro de pílulas (Work), "come say hi" |

Texto Inter adicional: 17 px/500 (parágrafo de hero de todas as páginas internas, line-height 25,5 px no Services e 24,65 px no Work e Contact), 15 px/400 com line-height 21,75 px (descrições dos serviços), 15 px/400 com placeholder rgba(0,0,0,0.4) nos campos, 13 px/700 para labels de formulário, 12 px/600 para tags, 12 px/700 para nomes nas pílulas do About.

---

## 23. Página Services

### 23.1 Hero (limão, 892 px)

- Fundo #D6FA50, raio 32 px, padding 140 px 56 px 60 px, duas colunas: texto à esquerda, pilha de cards à direita. No canto superior direito aparece um grande rabisco circular em espiral, em limão levemente mais escuro, cortado pela borda (decorativo, baixo contraste).
- Chip "Our services": 101 x 31 px, branco com contorno berinjela.
- H1 em 3 linhas: "SOCIAL, / ADS & / CONTENT" (90 px; "ADS &" em rosa).
- Parágrafo Inter 500 17 px, line-height 25,5 px, berinjela, largura ~330 px: promessa de "tudo que você precisa para aparecer, se destacar e vender online, planejado e executado por um time pequeno".
- Botões: "Book a free call" (primário escuro com círculo de seta limão) e "See pricing" (contorno berinjela, texto Inter 600 14 px).
- Pilha de 4 cards de serviço sobrepostos e inclinados (mini-versões das linhas de serviço da Home):

| Card | Fundo | Tamanho | Inclinação | Conteúdo |
|---|---|---|---|---|
| 01 SOCIAL STRATEGY | Branco | 332 x 160 px | -7° | Número rosa, círculo de seta, título, descrição "Plans, pillars and a 30-day calendar." |
| 02 CONTENT PRODUCTION | Rosa #EC4899 | 331 x 172 px | +5° | Texto escuro sobre rosa |
| 03 PAID ADS | Berinjela | 325 x 138 px | -3° | Número limão, título branco |
| 04 CREATOR PARTNERSHIPS | Branco | 333 x 177 px | +6° | Título berinjela |

Todos com raio 24 px, padding 18 x 20 px, sombra 0 18px 44px rgba(40,70,120,0.16), título Unbounded 22 px (line-height 23,1 px, tracking -0,66 px), número Inter 700 12 px, descrição Inter 400 13 px, círculo de seta de ~26 px com ↗ (limão em fundo escuro). Os cards se sobrepõem parcialmente, criando efeito de "baralho".

### 23.2 What we do (branco, 1124 px)

- Cabeçalho centralizado: chip "What we do", H2 de 48 px em 3 linhas "EVERYTHING YOUR / BRAND NEEDS TO / GET LOUD" ("LOUD" em rosa), parágrafo Inter 16 px berinjela 62% ("Pick one service or let us run the whole show...").
- Grade 2 x 2 de cards grandes de serviço, 550 x 310 px cada, gap de 20 px (colunas em x = 98 e 668, linhas em y = 1309 e 1640):

| Card | Fundo | Círculo de ícone | Título | Tags |
|---|---|---|---|---|
| 01 | #F4F0F6 | Limão com contorno | SOCIAL STRATEGY | Audits, Content pillars, Calendars |
| 02 | #D6FA50 | Branco com contorno | CONTENT PRODUCTION | Reels & TikToks, Photo shoots, UGC |
| 03 | #240E30 | Limão | PAID ADS THAT PAY | Meta Ads, TikTok Ads, Retargeting |
| 04 | #F4F0F6 | Limão com contorno | CREATOR PARTNERSHIPS | Influencers, Affiliates, Seeding |

Anatomia do card de serviço:

| Elemento | Valor |
|---|---|
| Raio e padding | 28 px, 30 px 28 px |
| Número | Pílula de contorno fino (~30 px de altura) com "01" em Inter 700 12 px |
| Ícone | Círculo de 57 px no canto superior direito, glifo de espiral/loop em traço fino, contorno 1 px berinjela |
| Título | Unbounded 800 32 px, line-height 32,64 px, tracking -0,96 px, em 2 linhas, #240E30 (branco no card escuro) |
| Descrição | Inter 400 15 px, line-height 21,75 px, berinjela 62% (branco 70% no escuro) |
| Tags | Pílulas de 30 px de altura, padding 0 12 px, Inter 600 12 px; fundo rgba(255,255,255,0.65) nos cards claros e rgba(255,255,255,0.1) com texto branco no escuro |

### 23.3 How it works (escuro, 592 px)

- Chip "How it works" (contorno branco, fundo branco 8%), H2 "FROM HELLO / TO GROWTH" (branco, "GROWTH" limão) alinhado à esquerda; rabisco de seta em arco limão à direita do título.
- 4 cards de passo, 267 x ~220 px, fundo rgba(255,255,255,0.06), raio 26 px, padding 28 24 26 px, contorno fino claro, gap de ~17 px (passo de 284 px). Alturas variam com o texto (197 a 220 px) e ficam alinhados ao topo.
  - Número: Unbounded 52 px limão ("01" a "04").
  - Chip de prazo no canto superior direito: contorno branco, Inter 600 11 px ("Week 1", "Week 1-2", "Week 2-4", "Ongoing").
  - Título: Unbounded 21 px (line-height 23,1 px, tracking -0,42 px), branco: DISCOVERY CALL, GROWTH PLAN, CREATE & LAUNCH, GROW & REPORT.
  - Descrição: Inter 400 14 px, branco 70%.

### 23.4 Where we play (limão, 676 px)

- Chip "Where we play", H2 "EVERY FEED / THAT MATTERS" ("MATTERS" rosa), parágrafo Inter 16 px.
- 8 pílulas de plataformas, Unbounded 800 15 px (tracking -0,3 px) em maiúsculas, centralizadas em 2 linhas com leve sobreposição e inclinações aleatórias:

| Pílula | Fundo | Texto | Tamanho | Inclinação |
|---|---|---|---|---|
| INSTAGRAM | #240E30 | Branco | 162 x 62 px | -4° |
| TIKTOK | Branco + contorno berinjela | Berinjela | 115 x 57 px | +3° |
| META ADS | #EC4899 | Branco | 143 x 56 px | -2° |
| YOUTUBE SHORTS | Branco + contorno | Berinjela | 218 x 70 px | +5° |
| PINTEREST | #240E30 | Branco | 150 x 59 px | -3° |
| LINKEDIN | Branco + contorno | Berinjela | 134 x 56 px | +2° |
| GOOGLE ADS | #240E30 | Branco | 170 x 63 px | -4° |
| EMAIL | Branco + contorno | Berinjela | 107 x 57 px | +3° |

Todas com raio 999 px e padding 0 22 px. Regra de cor: alternância berinjela, branco, rosa ao longo da linha.

- Estatísticas em 3 colunas (Unbounded 52 px berinjela + label Inter 600 13 px): "6 platforms, one plan", "40+ posts a month on Growth", "24H average reply time".

### 23.5 Pricing, depoimentos e FAQ

- **Pricing**: idêntico ao da Home (seção 12): mesmos 3 planos, preços, listas e botões. Altura da seção 875 px.
- **Depoimentos (escuro, 577 px)**: chip "Kind words", H2 "DON'T TAKE / OUR WORD FOR IT" (branco, "WORD" em limão). 3 cards brancos (366 x 217, 365 x 214, 363 x 211 px), raio 26 px, padding 26 24 px, sombra padrão, com inclinações sutis e estrelas rosa. Autores: Leo Martin (Owner, Leo Bakes), Mia Torres (Creator, @mia.creates), Nora Blake (Founder, Nora Studio).
- **FAQ (limão, 617 px)**: mesma estrutura do FAQ da Home (seção 14), com 5 itens de 684 x 77 px e gap de 13 px, ícone "+" circular de 33 px em berinjela com sinal limão. Chip "FAQ" com fundo branco 50%, H2 "QUESTIONS? / WE'VE GOT / ANSWERS" em berinjela com "ANSWERS" rosa, botão primário escuro "Book a free call" e um rabisco ondulado berinjela embaixo. Perguntas: How long until I see results?, Do I need to sign a long contract?, Do you create the content or do we?, Which platforms do you work with?, Is ad spend included in the price?

---

## 24. Página Work

### 24.1 Hero (escuro, 892 px)

- Fundo #240E30 com grade em perspectiva em tom ligeiramente mais claro (overlay de linhas arroxeadas de baixa opacidade). Padding do conteúdo: 110 px 40 px 40 px.
- Chip "Selected work": 110 x 31 px, fundo rgba(255,255,255,0.1), texto Inter 600 12 px branco.
- H1 em 2 linhas: "WORK" (branco) e "THAT" (limão) + "WORKS" (rosa), Unbounded 120 px.
- Parágrafo: Inter 500 17 px, line-height 24,65 px, branco 70%, centralizado, largura ~380 px.
- Botões lado a lado: "Start your project ↗" (limão, 50 px de altura, texto berinjela Inter 700 14 px, círculo de seta berinjela) e "Our services" (contorno branco, texto branco).
- 3 pílulas de estatística: 177 a 179 x 45 px, fundo rgba(255,255,255,0.08), raio 999 px, padding 0 18 px; número Unbounded 800 16 px limão ("120+", "48M", "3.9X") + label Inter 500 13 px branco ("brands grown", "organic views", "average ROAS").
- 4 cards em estilo polaroid nos cantos:

| Polaroid | Posição | Tamanho | Inclinação |
|---|---|---|---|
| Ember Candles | Superior esquerdo | 215 x 219 px | -8° |
| Flow Yoga | Superior direito | 212 x 217 px | +7° |
| Bean & Bloom | Inferior esquerdo | 209 x 214 px | +6° |
| Glow Lab | Inferior direito | 209 x 214 px | -6° |

Anatomia: fundo branco, raio 20 px, padding 8 8 12 px, foto com raio interno menor, legenda centralizada Inter 700 12 px berinjela. Mesma sombra dos cards flutuantes.

### 24.2 Featured case (branco, 720 px)

- Layout em 2 colunas: imagem de 540 x 540 px (raio 28 px) à esquerda e conteúdo à direita (x = 678).
- Sobre a imagem: etiqueta limão "+212% ORDERS" (190 x 59 px, raio `22px 22px 22px 6px`, padding 12 18 px, inclinação -6°, Unbounded 800 16 px) no topo esquerdo; chip branco 85% "Leo Bakes · Brooklyn" (163 x 40 px, Inter 700 13 px) embaixo.
- Coluna de texto: chip "Featured case" (#F4F0F6 com contorno, 103 x 30 px); H2 de 46 px "A BAKERY THAT / SELLS OUT / EVERY WEEKEND" ("SELLS OUT" rosa); parágrafo Inter 400 16 px berinjela 62%; divisor fino; 3 métricas em linha (Unbounded 34 px: "+212%" rosa, "18K" e "6 WKS" berinjela; labels Inter 600 13 px berinjela 62%: weekend orders, new local followers, to sell out); 3 tags de contorno (31 px de altura, fundo #F4F0F6): Instagram Reels, Local ads, Pre-orders.

### 24.3 Case studies (escuro, 1319 px)

- Chip "Case studies", H2 "MORE BRANDS / WE MADE LOUD" (branco, "LOUD" limão), parágrafo "Filter by what we did. Tap a category to see the work." (Inter 16 px, branco 70%).
- **Filtros de categoria**: 5 pílulas de 37 px de altura, padding 0 18 px, raio 999 px, fundo limão, texto Inter 700 13 px berinjela: All (52 px, ativo, opacidade 100%), Social, Ads, Content, Creators (opacidade 45% quando inativos). Estado ativo = opacidade total.
- **Galeria 3 x 2**: cards de imagem de 360 x 380 px, raio 26 px, gap de 20 px (linhas em y = 2023 e 2460), chips sobrepostos na base esquerda (marca branca 85% + resultado limão, mesma anatomia da seção 11) e legenda Inter 500 14 px branco 70% com ↗ limão (Inter 700 16 px).

| Marca | Resultado | Legenda |
|---|---|---|
| Bean & Bloom | +312% sales | Café · Instagram + Ads |
| Mia Creates | 2.1M views | Creator · TikTok growth |
| Glow Lab | 4.8x ROAS | Skincare · Paid social |
| Ember Candles | +640% reach | Home · Content + UGC |
| Flow Yoga | 1,200 sign-ups | Wellness · Meta ads |
| Leo Bakes | Sold out weekly | Bakery · Instagram content |

### 24.4 By the numbers (limão, 560 px)

- Chip "By the numbers", H2 "LOUD WORK, / LOUDER RESULTS" (berinjela, "RESULTS" rosa).
- 4 estatísticas (Unbounded 52 px berinjela + label Inter 600 13 px): 48M organic views in 2025; $6.2M revenue driven by ads; 3.9X average return on ad spend; 92% clients who stay a year+.
- Linha de 6 pílulas inclinadas de plataformas (mesma anatomia da seção 23.4, sem Google Ads e Email): Instagram, TikTok, Meta Ads, YouTube, Pinterest, LinkedIn.

### 24.5 Spotlight case (lavanda #F4F0F6, 720 px)

- Coluna esquerda: chip "Spotlight" (branco com contorno, 75 x 30 px), H2 de 46 px "SKINCARE ADS / WITH A 4.8X / RETURN" ("4.8X" rosa), parágrafo Inter 16 px, divisor, 3 métricas (Unbounded 34 px: "4.8X" rosa, "-38%" e "$410K" berinjela; labels: return on ad spend, cost per sale, revenue in 6 months) e botão primário escuro "Start your project ↗" (190 x 47 px).
- Coluna direita: imagem de produtos cosméticos (~540 x 540 px, raio 28 px) com etiqueta rosa "4.8X ROAS" no topo direito (144 x 54 px, raio `22px 22px 22px 6px`, sombra padrão, texto branco Unbounded 16 px, inclinação leve) e chip branco 85% "Glow Lab · Skincare" (156 x 40 px) embaixo.

### 24.6 Industries (escuro, 670 px)

- Chip "Industries", H2 "BRANDS WE / LOVE TO GROW" (branco, "GROW" limão), parágrafo "Different worlds, same goal: get noticed and get chosen." (Inter 16 px, branco 70%).
- Grade 3 x 2 de cards: 362 x 94 px (116 px quando o título quebra em 2 linhas), fundo rgba(255,255,255,0.06), raio 24 px, padding 24 px, contorno fino claro, gap horizontal de 17 px; passo vertical entre linhas de 143 px.
  - Título Unbounded 800 20 px (line-height 22 px), branco.
  - Contagem Inter 600 13 px limão ("28 brands").
  - Círculo de ícone limão de 45 px à direita, com glifo de espiral em berinjela.

| Indústria | Contagem |
|---|---|
| CAFÉS & FOOD | 28 brands |
| BEAUTY & SKINCARE | 22 brands |
| CREATORS | 19 creators |
| FITNESS & WELLNESS | 17 brands |
| HOME & LIFESTYLE | 15 brands |
| LOCAL SHOPS | 21 brands |

### 24.7 Depoimentos (branco, 577 px)

Mesmo bloco da seção 23.5, porém sobre fundo branco: chip "Kind words", H2 "DON'T TAKE / OUR WORD FOR IT" em berinjela com "WORD" rosa; 3 cards brancos com sombra azulada visível sobre o branco.

---

## 25. Página About

### 25.1 Hero (grade rosa, 892 px)

- Mesma imagem de grade rosa em perspectiva do hero da Home. Conteúdo com padding 130 px 56 px 50 px, texto à esquerda, foto em arco à direita.
- Chip "About us": 80 x 31 px, fundo rgba(255,255,255,0.55), contorno berinjela.
- H1 em 3 linhas: "HELLO," (berinjela), "WE'RE" (rosa), "LOUDLY" (berinjela), Unbounded 96 px.
- Parágrafo Inter 500 17 px, line-height 25,5 px, berinjela: "A tiny, very online team of strategists, creators and ad nerds helping small brands get the attention they deserve."
- Botões: "Work with us ↗" (160 x 47 px, escuro, círculo limão de 31 px) e "See our work" (contorno berinjela).
- **Foto em arco**: 400 x 520 px, raio `200px 200px 28px 28px` (topo totalmente arredondado, base com cantos suaves), contorno berinjela de ~1,5 px, foto da equipe numa mesa de trabalho.
- 3 pílulas de nome sobre a foto: branco, padding 5 14 5 5 px, raio 999 px, avatar circular de 43 px à esquerda e texto Inter 700 12 px: "Ava · founder" (149 x 64 px, -6°), "Jin · creative" (145 x 62 px, +5°) e "Sam · creator". Sombra padrão.
- Selo circular rotativo "LET'S TALK GROWTH" (círculo limão de 120 px com anel de texto e ícone espiral de 43 px) no canto inferior direito da foto.

### 25.2 Our story (branco, 700 px)

- Foto de equipe de 537 x 520 px, raio 28 px, à esquerda. Etiqueta rosa "SINCE 2019" (154 x 58 px, raio `22px 22px 22px 6px`, padding 12 18 px, inclinação -7°, Unbounded 800 branco). Selo circular rotativo de 110 px (limão) sobreposto no canto inferior direito da foto.
- Texto à direita (x = 680): chip "Our story" (#F4F0F6), H2 de 52 px "SMALL TEAM, / BIG NOISE" ("NOISE" rosa), 2 parágrafos Inter 400 16 px berinjela 62%, e 3 métricas (Unbounded 34 px: "2019" berinjela, "12" berinjela, "120+" rosa; labels Inter 600 13 px: founded, people, brands grown).

### 25.3 The team (escuro, 752 px)

- Chip "The team" (contorno branco), H2 "MEET THE / LOUD ONES" (branco, "LOUD ONES" limão); seta curva grande em limão (traço grosso, ~158 x 158 px) no canto superior direito apontando para a esquerda.
- 4 retratos de 266 x 320 px, raio 24 px, gap de ~19 px (passo de 285 px). Cada foto tem fundo de cor sólida diferente (rosa choque, creme, lilás, rosa claro) combinando com a paleta.
- Etiqueta-adesivo limão sobre a foto, canto inferior esquerdo, inclinada, texto Inter 700 12 px berinjela.
- Abaixo da foto: nome em Unbounded 800 18 px branco (maiúsculas) e cargo em Inter 400 13 px branco 70%.

| Pessoa | Cargo | Etiqueta |
|---|---|---|
| AVA COLLINS | Founder & strategy lead | Coffee x4 a day |
| MARCUS REED | Head of paid ads | Spreadsheet wizard |
| JIN PARK | Creative director | (sem etiqueta visível) |
| SAM RIVERA | Content creator | 1M+ on TikTok |

### 25.4 Values (limão, 617 px)

- Chip "What we believe", H2 "HOW WE / ROLL" (berinjela, "ROLL" rosa), centralizado.
- 4 cards brancos de 270 a 272 px de largura (alturas de 226 a 272 px, alinhados ao topo), raio 26 px, padding 28 24 px, sombra padrão, inclinações alternadas de -1,5°, +1°, -1° e +1,5°.
  - Círculo numerado de 55 px no topo: alterna berinjela com número limão e rosa com número branco (Unbounded 800 18 px).
  - Título Unbounded 800 22 px (line-height 23,1 px, tracking -0,66 px) berinjela.
  - Descrição Inter 400 14 px berinjela 62%.

| Nº | Título | Texto |
|---|---|---|
| 01 | RESULTS OVER LIKES | Pretty posts are nice. Sales, sign-ups and real fans are better. |
| 02 | SAY IT SIMPLY | No jargon, no 40-page decks. Clear plans you actually understand. |
| 03 | TEST EVERYTHING | We try fast, measure honestly and double down on what works. |
| 04 | BE A GOOD HUMAN | Kind, quick to reply and invested in your brand like it's ours. |

### 25.5 Clients (branco, 715 px)

- Chip "Brands we've grown" (#F4F0F6), H2 "120+ BRANDS / AND COUNTING" ("AND COUNTING" rosa), parágrafo Inter 16 px.
- "Nuvem" de 12 pílulas de marcas em 3 linhas centralizadas, sobrepostas e inclinadas, texto Unbounded 800 18 px (tracking -0,36 px) maiúsculas, altura de 62 a 74 px, padding 0 26 px, raio 999 px, inclinações de -4° a +4°. Cores: #F4F0F6 com contorno, limão, berinjela e rosa, sem regra fixa além de nunca repetir a mesma cor em pílulas vizinhas.
- Marcas: BEAN & BLOOM, GLOW LAB, MIA CREATES, EMBER, FLOW YOGA, LEO BAKES, NORA STUDIO, PETAL CO., KIND KICKS, SALT & SUN, MOXIE GYM, LUMEN SKIN.
- CTA centralizado "Join them ↗": botão primário escuro (ver 9.1).

### 25.6 Timeline (escuro, 558 px)

- Chip "How we got here", H2 "FROM ONE LAPTOP / TO 120+ BRANDS" (branco, "120+ BRANDS" limão).
- 4 colunas (passo de 285 px). Cada coluna começa com um ponto limão de 17 px e uma linha de 1 px, 237 px de largura, rgba(255,255,255,0.2), seguidos por:
  - Ano: Unbounded 800 44 px, tracking -2,2 px, limão.
  - Título: Unbounded 800 19 px (line-height 20,9 px), branco.
  - Descrição: Inter 400 13 px, branco 70%.

| Ano | Título | Texto |
|---|---|---|
| 2019 | ONE LAPTOP, ONE IDEA | Ava starts Loudly from her Brooklyn kitchen table. |
| 2021 | FIRST 10 CLIENTS | Local cafés and creators spread the word. |
| 2023 | OUR OWN STUDIO | A team of 8 and a real ring-lit content studio. |
| 2026 | 120+ BRANDS GROWN | 12 people, one mission: make small brands loud. |

### 25.7 Careers (lavanda #F4F0F6, 468 px)

- Esquerda: chip "Careers" (branco, contorno), H2 "WANT TO GET / LOUD WITH US?" ("LOUD" rosa), parágrafo Inter 16 px, botão de contorno berinjela com e-mail "jobs@loudly.studio".
- Direita (x = 682, largura 536 px): 3 linhas de vaga em branco, 78 px de altura, raio 20 px, padding 18 22 px, contorno 1 px berinjela, gap ~13 px.
  - Título Unbounded 800 18 px (line-height 19,8 px) berinjela, meta Inter 400 13 px berinjela 62%.
  - Círculo de seta de ~35 px limão com contorno berinjela e ↗ à direita.

| Vaga | Meta |
|---|---|
| CONTENT CREATOR | Remote · Full-time |
| PAID ADS SPECIALIST | Brooklyn or remote · Full-time |
| COMMUNITY MANAGER | Remote · Part-time |

---

## 26. Página Contact

### 26.1 Hero (rosa, 892 px)

- Fundo #EC4899 com grade em perspectiva em tom de rosa mais escuro (overlay tonal), padding 110 px 32 px 40 px, tudo centralizado.
- Chip "Contact": 73 x 31 px, fundo rgba(255,255,255,0.2), texto branco.
- H1 em 2 linhas: "LET'S TALK" (branco) e "GROWTH" (berinjela), Unbounded 128 px.
- Parágrafo Inter 500 17 px branco, centralizado: promete resposta em um dia útil com ideias, sem tom de venda.
- **Botão-e-mail gigante**: pílula berinjela de 472 x 75 px, padding 0 10 0 ~32 px, texto "HELLO@LOUDLY.STUDIO" em Unbounded 800 24 px (tracking -0,48 px) branco e círculo limão de 55 px com ↗ berinjela.
- 3 chips de confiança: 135 a 169 x 40 px, fundo rgba(255,255,255,0.18), raio 999 px, padding 0 16 0 8 px; check limão em círculo + texto Inter 600 13 px branco: "Reply in 24h", "Free 30-min call", "No long contracts".
- 3 adesivos inclinados em Unbounded 800 18 px (tracking -0,36 px), raio `24px 24px 24px 6px`, padding 14 20 px, sombra padrão:

| Adesivo | Fundo | Texto | Tamanho | Inclinação | Posição |
|---|---|---|---|---|---|
| HEY THERE! | Branco | Berinjela | 174 x 66 px | -7° | Superior esquerdo |
| LET'S GROW | Limão | Berinjela | 183 x 64 px | +6° | Superior direito |
| FREE CALL? | Berinjela | Branco | 175 x 60 px | +5° | Inferior esquerdo |

- Trio de avatares sobrepostos (55 px cada, anel branco, raio 999 px) no canto inferior direito.

### 26.2 Contact form (branco, 734 px)

- Coluna esquerda: chip "Start here" (#F4F0F6), H2 "TELL US / ABOUT YOUR / BRAND" ("BRAND" rosa), parágrafo Inter 16 px berinjela 62% ("Fill in the form and a real human will reply within one business day with first ideas") e lista de contatos com 4 linhas:

| Linha | Rótulo | Valor | Círculo de ícone (45 px) |
|---|---|---|---|
| E-mail | EMAIL | hello@loudly.studio | Berinjela, glifo "@" limão |
| Telefone | PHONE | +1 (718) 555-0148 | Limão, glifo de telefone berinjela |
| Estúdio | STUDIO | 214 Wythe Ave, Brooklyn, NY | Berinjela, glifo de casa limão |
| Horário | HOURS | Mon-Fri · 9am-6pm EST | Limão, glifo de relógio berinjela |

  Rótulo em Inter pequeno (~11 px, caixa alta, berinjela 62%, medida aproximada), valor em Inter 600 16 px berinjela. Linhas com passo de 60 px, círculos alternando berinjela e limão.

- Coluna direita: **card do formulário**, 672 x 554 px, fundo #F4F0F6, raio 28 px, padding 32 30 px:
  - Cabeçalho: título "FREE STRATEGY CALL" em Unbounded 800 20 px berinjela; chip de status limão "Replying today" (127 x 30 px, raio 999 px, Inter 600 12 px) com ponto rosa.
  - Labels: Inter 700 13 px berinjela ("Your name", "Email", "Brand / website", "Monthly budget", "What do you need help with?").
  - Campos: 299 x 53 px (duas colunas, gap de 14 px), fundo branco, raio 16 px, padding 16 px, Inter 400 15 px, placeholder rgba(0,0,0,0.4), sem contorno. O select de orçamento mostra "Select…" com seta de chevron à direita.
  - Textarea: 612 x 150 px, mesmo estilo dos campos.
  - **Botão Submit**: 612 x 53 px, fundo #333333, raio 10 px, texto Inter 600 14 px branco. Atenção: este é o estilo padrão do Framer e quebra o padrão pílula do restante do site (ver seção 28).

### 26.3 What happens next (escuro, 569 px)

- Chip "What happens next", H2 "EASY AS / 1, 2, 3" (branco, "3" limão); seta de rabisco limão grossa no canto superior direito.
- 3 cards de passo (mesma anatomia do How it works da seção 23.3, com 3 colunas de ~362 px): número Unbounded 52 px limão, chip de prazo ("Day 1", "Day 2-3", "Day 4-5"), título Unbounded 21 px branco, descrição Inter 14 px branco 70%.

| Nº | Título | Texto |
|---|---|---|
| 01 | WE REPLY IN 24H | We read your message, check out your brand and send a few first ideas. |
| 02 | FREE STRATEGY CALL | 30 minutes on Zoom to talk goals, budget and what we'd do first. |
| 03 | YOUR GROWTH PLAN | A clear proposal with timeline and price. No pressure, no fine print. |

### 26.4 FAQ (limão, 587 px)

Mesma estrutura da seção 23.5 (FAQ em limão, accordion branco). Perguntas visíveis: Is the first call really free?, How fast can we start?, Do you work with brands outside the US?, entre outras. Rodapé do bloco esquerdo traz "Can't find your answer? Send us a message" e botão "Book a free call" (berinjela com círculo de seta limão, 35 px).

### 26.5 Socials (branco, 579 px)

- Chip "Follow the noise", H2 "SAY HI ON / SOCIALS" ("SOCIALS" rosa), parágrafo "Daily tips, behind-the-scenes and the occasional dancing intern."
- 4 cards de rede social: 272 x 178 px (270 x 175 e 269 x 173 nos centrais), raio 26 px, padding 26 24 px, passo de ~284 px, inclinações de -2°, +1,5°, -1° e +2°.

| Rede | Fundo | Texto | Handle | Seguidores |
|---|---|---|---|---|
| INSTAGRAM | #240E30 | Branco | @loudly.studio | 48.2k followers |
| TIKTOK | #EC4899 | Branco | @loudly.studio | 112k followers |
| LINKEDIN | #D6FA50 | Berinjela | Loudly Studio | 9.6k followers |
| YOUTUBE | #F4F0F6 | Berinjela | @loudlystudio | 21k subscribers |

  - Handle: Inter 600 13 px no topo esquerdo.
  - Círculo de seta de 38 a 39 px no topo direito (branco nos cards escuro/rosa, berinjela nos cards limão/lavanda) com ↗.
  - Nome da rede: Unbounded 800 26 px (tracking -0,78 px) maiúsculas, embaixo.
  - Seguidores: Inter 600 13 px (branco 70% ou berinjela 62%).

### 26.6 Studio (escuro, 647 px)

- Foto do estúdio de 537 x 440 px, raio 28 px, com etiqueta-adesivo limão "COME SAY HI" (Unbounded 800 16 px berinjela, inclinada ~-6°) no topo esquerdo.
- Direita: chip "Visit the studio" (contorno branco), H2 "COFFEE'S / ON US" (branco, "US" limão), parágrafo Inter 16 px branco 70%.
- Tabela de informações em 3 linhas separadas por vãos de ~38 px: rótulo em Inter 700 11 px limão caixa alta (ADDRESS, HOURS, PARKING) à esquerda e valor Inter 400 14 px branco alinhado à direita ("214 Wythe Ave, Brooklyn, NY 11249", "Mon-Fri · 9am-6pm", "Street parking + bike racks").
- Botão limão "Get directions" com círculo de seta berinjela.

### 26.7 Newsletter (limão, 681 px)

- Chip "Newsletter", H2 "LOUD TIPS, / EVERY FRIDAY" ("FRIDAY" rosa), parágrafo Inter 16 px berinjela 62% ("One short email a week... No spam, ever.").
- Campo de e-mail em pílula branca (440 x ~53 px dentro de um contêiner de 480 px, raio 999 px, placeholder "you@brand.com") e botão **Submit** de 480 x 55 px, #333333, raio 10 px (mesmo estilo cinza do formulário).
- Microcopy: "Join 6,400+ brand owners. Unsubscribe anytime." (Inter 500 13 px, berinjela 62%).
- 3 vetores decorativos em berinjela abaixo do formulário: rabisco ondulado com seta (72 x 48 px), espiral/loop (55 x 55 px) e outro rabisco com seta (70 x 45 px).

---

## 27. Componentes e padrões novos (consolidado das páginas internas)

Itens que não existem na Home e passam a fazer parte do sistema:

| Componente | Especificação resumida |
|---|---|
| Polaroid | Branco, raio 20 px, padding 8 8 12 px, legenda Inter 700 12 px, inclinação entre -8° e +7° |
| Pílula de nome com avatar | Branco, raio 999 px, padding 5 14 5 5 px, avatar 43 px, Inter 700 12 px, inclinação leve |
| Pílula de plataforma / marca | Unbounded 800 15 a 18 px caixa alta, raio 999 px, padding 0 22 a 26 px, altura 56 a 74 px, inclinação -5° a +5°, cores alternadas (berinjela, branco com contorno, rosa, limão, lavanda) |
| Adesivo de canto reto | Raio `24px 24px 24px 6px`, padding 14 20 px, Unbounded 800 18 px, inclinado |
| Etiqueta de foto | Raio `22px 22px 22px 6px`, padding 12 18 px, Unbounded 800 16 px (rosa/limão), inclinação de -7° a -6° |
| Foto em arco | 400 x 520 px, raio `200px 200px 28px 28px`, contorno berinjela 1,5 px |
| Card de passo escuro | rgba(255,255,255,0.06), raio 26 px, contorno fino claro, número Unbounded 52 px limão + chip de prazo |
| Card de serviço grande | 550 x 310 px, raio 28 px, ícone circular 57 px, tags 30 px |
| Cards de valor | Branco, raio 26 px, círculo numerado 55 px, inclinações alternadas de ±1° a ±1,5° |
| Linha do tempo | Ponto limão 17 px + linha 1 px rgba(255,255,255,0.2), ano Unbounded 44 px limão |
| Linha de vaga | 536 x 78 px, branco, raio 20 px, contorno 1 px berinjela, círculo de seta limão 35 px |
| Filtro de categoria | Pílula limão 37 px, ativo 100% e inativos 45% de opacidade |
| Pílula de estatística | rgba(255,255,255,0.08), raio 999 px, 45 px de altura, número Unbounded 16 px limão |
| Card de rede social | 272 x 178 px, raio 26 px, 4 cores (berinjela, rosa, limão, lavanda), ↗ circular 39 px |
| Campo de formulário | Branco, raio 16 px, altura 53 px, padding 16 px, Inter 15 px |
| Botão e-mail gigante | 472 x 75 px, berinjela, Unbounded 24 px branco + círculo limão 55 px |
| Chip de confiança | 40 px de altura, rgba(255,255,255,0.18), check limão em círculo + Inter 600 13 px |
| Hero tonal | Fundo cor sólida (escuro ou rosa) com grade em perspectiva do mesmo tom, em vez da imagem de grade rosa |

Regras de inclinação reaproveitáveis: o design usa um conjunto fixo de ângulos (±1°, ±1,5°, ±2°, ±3°, ±4°, ±5°, ±6°, ±7°, +8°, -9°). Elementos grandes (cards de 270+ px) ficam entre ±1° e ±2°; elementos pequenos (pílulas, etiquetas, adesivos) entre ±3° e ±9°.

---

## 28. Inconsistências detectadas e limitações da análise

### 28.1 Inconsistências (para o designer decidir)

1. O botão **Submit** dos dois formulários (Contact e Newsletter) usa #333333 com raio 10 px, fora da linguagem de pílula, cores de marca e Inter 600 14 px do resto do site. Parece o estilo padrão do Framer. Sugestão: trocar por pílula berinjela de 50 px de altura com texto branco (ou limão no fundo escuro).
2. Services diz "6 platforms, one plan", mas a seção mostra 8 pílulas de plataformas (Instagram, TikTok, Meta Ads, YouTube Shorts, Pinterest, LinkedIn, Google Ads, Email). Work lista 6, o que bate com o número.
3. Services diz "40+ posts a month on Growth", mas o plano Growth lista "20 posts + 8 reels" (28 peças).
4. A pergunta do FAQ aparece com redação diferente entre páginas ("Do I need a long contract?" na Home e "Do I need to sign a long contract?" no Services).
5. O texto do selo circular e os ícones de espiral são imagens raster/vetor externas; se forem reaproveitados, exportar em SVG para manter nitidez.
6. A linha de serviço da Home chama o item de "PAID ADS" e a página Services de "PAID ADS THAT PAY", e "CREATOR PARTNERSHIPS" mantém o nome nos dois lugares. Padronizar o nome do serviço se for usado como taxonomia.

### 28.2 Limitações

1. Medido apenas em desktop (viewport de 1317 px). Breakpoints de tablet e mobile não foram inspecionados em nenhuma das 5 páginas.
2. Durações e curvas de easing das animações de entrada e dos hovers não foram medidas (o CSS declara `transition: all`, sem valor legível).
3. A cor exata das linhas da grade do hero é aproximada visualmente, pois a grade é uma imagem raster; o mesmo vale para o overlay tonal dos heros do Work e do Contact.
4. Alguns cards (passo 1, case 1, depoimentos, valores) aparecem com pequena rotação ou deslocamento por causa da animação de entrada; as rotações listadas são as medidas no momento da leitura e podem diferir levemente do estado final de repouso.
5. Respostas dos itens 2 a 4 do FAQ da Home e dos FAQs do Services e do Contact não foram abertas; os itens abertos seguem o padrão da seção 14.
6. Os formulários foram apenas lidos (estilos e estrutura); nada foi preenchido ou enviado. Estados de erro, foco e validação dos campos não foram medidos.
7. Medidas marcadas como aproximadas (rótulos da lista de contato do Contact, posição exata de tags dentro das fotos do time) vêm de leitura visual e não do DOM.
8. O selo "Made in Framer", o botão "Stop Claude" e o campo "Create a free website with Framer" detectados no DOM pertencem ao Framer e a uma extensão do navegador e foram excluídos da análise.
