# 04 Direção para o Claude Design (identidade completa e telas)

Cole este arquivo inteiro no Claude Design no começo do projeto. Anexe também os briefings 00, 01, 02 e 03 e prints das referências (instruções na seção 2).

---

## 1. Missão
Criar a **identidade visual completa** da Thalyta Lucena (desenvolvedora de sites e gestora de tráfego pago) e, com ela, as telas de três peças: **link da bio**, **landing page** e **formulário em etapas**. Depois de aprovado, tudo segue para desenvolvimento no Claude Code.

Ordem de trabalho: identidade, depois sistema de componentes, depois telas. Não começar telas antes de aprovar a identidade.

## 2. Referências
Os links abaixo foram indicados por mim. O Behance e o Pinterest bloqueiam leitura automática, então **anexe prints de cada referência** e peça ao Claude Design para analisar a imagem.

**Behance**
1. (for)GOT, branding de food delivery: https://www.behance.net/gallery/255145293/(for)GOT-Branding-food-delivery
2. Rebecca Gomes, Clube CLT, direção de arte: https://www.behance.net/gallery/257376319/Rebecca-Gomes-CLUBE-CLT-Direcao-de-Arte
3. Club Coffee, identidade de cafeteria com tom divertido: https://www.behance.net/gallery/254750507/Club-Coffee-Playful-Coffee-Shop-Brand-Identity

**Pinterest**
4. https://br.pinterest.com/pin/1127659194219918661/
5. https://br.pinterest.com/pin/626985579416898379/
6. https://br.pinterest.com/pin/709105903877094367/
7. https://br.pinterest.com/pin/669417932155855858/

**Âncora já existente (anexar):** o PDF "Portfólio de Tráfego Pago" da Thalyta. Ele já usa creme, bordô e verde oliva, títulos em serifa com palavra em itálico, cartões brancos de cantos arredondados, formas orgânicas em verde claro e um selo circular na capa. A nova identidade deve evoluir isso, e não começar do zero.

**Para cada referência, extrair e registrar (tabela):**
| Referência | Paleta | Tipografia | Grid e layout | Formas e texturas | Fotografia/ilustração | Tom de voz | O que levar | O que evitar |

Observação: pelos títulos, as referências parecem ter tom acolhedor, alimentar e brincalhão. Confirmar olhando as imagens antes de concluir qualquer coisa.

## 3. Marca
- **Nome:** Thalyta Lucena. **Instagram:** @thalyta.web.
- **Personalidade:** próxima, direta, sincera, caprichosa. Profissional sem ser fria. Sem cara de agência corporativa e sem cara de template de IA.
- **Sensação ao abrir a página:** "essa pessoa eu consigo conversar".
- **Público:** pequenos e médios empresários que já se frustraram com agências.
- **Diferenciais que o visual precisa sustentar:** atendimento direto, estratégia por trás do design, resultado medido.

## 4. Paleta inicial (partir daqui e refinar)
Cores extraídas do portfólio atual. Entregar sempre em **hexadecimal**.
| Papel | Nome | Hex |
|---|---|---|
| Fundo principal | Creme | #F6EFE2 |
| Fundo alternativo | Creme profundo | #EDE3D0 |
| Cor de marca e CTA | Bordô | #7B2132 |
| Bordô hover | Bordô escuro | #5E1826 |
| Apoio claro | Oliva clara | #B8C29A |
| Apoio muito claro | Oliva pálida | #E4E6D0 |
| Apoio escuro | Oliva escura | #5E6B45 |
| Texto principal | Marrom escuro | #3A2F2A |
| Texto secundário | Marrom suave | #7A6F66 |
| Cartões | Branco | #FFFFFF |

Verificar contraste (mínimo AA) para texto sobre creme, bordô e oliva. Propor 1 cor de alerta para erro de formulário, harmônica com a paleta.

## 5. Tipografia
- Hoje o portfólio usa Lora (títulos, com itálico de ênfase) e Poppins (texto).
- Pedir 3 pares de fontes do Google Fonts (serifada de personalidade para títulos e sans legível para texto), com 1 recomendação.
- Escala em **pixels** (desktop e mobile). Sem rem.

## 6. Entregáveis da identidade
1. Logotipo: versão horizontal, monograma (TL) e selo circular (como o da capa do portfólio). Versões clara, escura e uma cor.
2. Paleta final com usos e proporções (60/30/10).
3. Tipografia: títulos, subtítulos, texto, rótulos, botões, números de destaque.
4. Formas e texturas: blob orgânico, círculos, cantos arredondados, ícones (traço único, mesma espessura).
5. Fotografia: direção para o retrato da Thalyta (fundo claro, luz natural, enquadramentos) e para fotos de apoio.
6. Mockups de dispositivo para a vitrine de sites (celular e desktop, no estilo da marca).
7. Tom de voz resumido (3 exemplos de microcopy: botão, erro, agradecimento).
8. **Tokens de design em arquivo**: cores em hex e tamanhos em px, prontos para colar no Claude Code. Sem variáveis, rem ou clamp.

## 7. Biblioteca de componentes
Botão primário, secundário e fantasma (estados normal, hover, foco, desativado) · chip de prova · cartão de serviço · cartão de portfólio com mockup · cartão de depoimento · acordeão de FAQ · campo de texto, telefone, seleção por card, chips, textarea · barra de progresso por etapas · mensagens de erro e sucesso · menu fixo e barra inferior de CTA no mobile · selo circular · rodapé.

## 8. Telas

### 8.1 Link da bio (mobile 390 x 844, mais uma visualização desktop centralizada)
Ordem: apresentação com foto, nome, @thalyta.web, linha de valor e 3 chips · carrossel de serviços (3 cards, indicador de posição) · botão "Ver a landing page" · botão principal "Quero meu diagnóstico" · vitrine com 5 mockups de sites (Lok Mob, Esmalteria da Jana, Clínica Analice Sousa, Clínica Longeva, Noemi Lucena) · botão WhatsApp · rodapé mínimo.
Entregar: tela completa, estado do carrossel nos 3 cards, estado de toque no botão.

### 8.2 Landing page (desktop 1440 e mobile 390)
Seguir exatamente as 12 seções do briefing 02: menu fixo, hero, dor, solução, diferenciais ("o que a IA não faz"), serviços e skills, escolha do ponto de partida (3 cards), portfólio, provas, processo (duas trilhas), investimento, FAQ, seção do formulário, CTA final e rodapé.
Alternar fundos (creme, branco, bordô, oliva pálida) para dar ritmo. O hero precisa ter a foto da Thalyta, o selo circular e um elemento orgânico em oliva.
Dados numéricos nos desenhos: usar os reais do briefing 00 quando existirem e, onde não houver, **escrever "dado de exemplo" em texto pequeno ao lado**. Nenhum número de exemplo pode ser copiado para o desenvolvimento.
Entregar: página inteira em desktop e mobile, hover dos botões, FAQ aberto e fechado.

### 8.3 Formulário (mobile 390 primeiro, depois desktop)
- Etapa 1 (contato e interesse).
- Ramo Site: etapas 2, 3 e 4.
- Ramo Tráfego: etapas 2, 3, 4 e 5.
- Ramo Os dois: etapas 2 a 6.
- Estados: campo com erro, campo preenchido, botão carregando, botão Voltar, progresso.
- Página de obrigado.
Entregar todas as telas lado a lado em um quadro de fluxo, com setas indicando a ramificação.

## 9. Regras de copy nas telas
Sem travessão. Sem "isso não é X, é Y". Frases curtas e diretas. Usar a copy dos briefings. Se algo precisar de ajuste para caber, avisar em vez de reescrever em silêncio.

## 10. Como conduzir
1. Analisar as referências e apresentar a tabela da seção 2. Esperar minha aprovação.
2. Propor 3 direções de identidade (conservadora, equilibrada e ousada), todas dentro de creme, bordô e oliva. Esperar minha escolha.
3. Desenvolver a direção escolhida: logo, paleta, tipografia, componentes.
4. Desenhar as telas na ordem: formulário, link da bio, landing page.
5. Exportar o pacote de handoff: tokens (hex e px), componentes, telas e anotações de comportamento.

## 11. Critérios de aceite
- Parece uma marca pessoal com personalidade e não um template.
- Creme, bordô e oliva reconhecíveis em todas as peças.
- Legível e com contraste adequado no celular.
- Fácil de implementar em HTML e CSS puros (sem efeitos que dependam de bibliotecas).
- Consistência entre as três peças.
