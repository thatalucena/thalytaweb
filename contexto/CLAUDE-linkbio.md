# CLAUDE.md: Link da bio (@thalyta.web)

Leia primeiro: `contexto/00-fundacao.md`, `contexto/01-link-da-bio.md` e `contexto/04-claude-design.md` (tokens e telas aprovadas).

## O que é
Página única, mobile first, que recebe o tráfego do perfil do Instagram e leva para o formulário, a landing page ou o WhatsApp.

## Stack
Astro estático, JS mínimo. Carrossel com `scroll-snap` nativo. Deploy na Vercel.

## Estrutura
- `src/data/links.ts`: todos os links, textos de botões e itens do carrossel. É o único lugar para editar conteúdo.
- `src/components/`: Header, ChipsProva, CarrosselServicos, BotaoLink, VitrineSites, BotaoWhatsapp, Footer.
- `public/mockups/`: imagens dos 5 sites (Lok Mob, Esmalteria da Jana, Clínica Analice Sousa, Clínica Longeva, Noemi Lucena).

## Comportamento
- Todo link de saída recebe `utm_source=instagram&utm_medium=bio&utm_campaign=link_da_bio&utm_content=<id do botão>`.
- Eventos GA4 e Meta Pixel: `click_bio_lp`, `click_bio_form`, `click_bio_whatsapp`, `click_bio_site_<nome>`, `swipe_servicos`.
- WhatsApp com mensagem pré-preenchida, usando `encodeURIComponent`.

## Definição de pronto
Lighthouse mobile com Performance e Acessibilidade acima de 95. Abre bem no navegador interno do Instagram. `npm run check:placeholders` sem erros.

## Quem é a dona do projeto
Thalyta Lucena, desenvolvedora de sites e gestora de tráfego pago. Instagram @thalyta.web. Fale sempre em português do Brasil.

## Regras de código (obrigatórias)
- **CSS:** cores sempre em hexadecimal direto e tamanhos sempre em pixel. Proibido usar `var(--...)`, `rem`, `em` para tamanho, `clamp()` e Tailwind. Media queries em px. Use CSS puro ou CSS Modules.
- Tokens de design ficam em `src/styles/tokens.css` apenas como referência de valores (hex e px), nunca como variáveis CSS. Copie o valor onde for usar.
- Paleta inicial (confirmar com o resultado do Claude Design): creme #F6EFE2, creme profundo #EDE3D0, bordô #7B2132, bordô escuro #5E1826, oliva clara #B8C29A, oliva pálida #E4E6D0, oliva escura #5E6B45, texto #3A2F2A, texto suave #7A6F66, branco #FFFFFF.
- Mobile first. Área de toque mínima de 48px. Contraste AA.
- Todo texto em HTML real. Nenhum texto dentro de imagem.
- Acessibilidade: foco visível, rótulos em todos os campos, `alt` descritivo, respeitar `prefers-reduced-motion`.
- Imagens em WebP ou AVIF, com largura e altura definidas.

## Regras de copy (obrigatórias)
- Nunca usar travessão em textos para o público.
- Nunca usar construções do tipo "isso não é X, é Y" ou variações.
- Tom direto, próximo e sem jargão. Falar "você".
- Nomes de marca e de pessoas exatamente como estão nos briefings.
- Não altere a copy dos briefings sem avisar. Se algo não couber, sinalize e proponha.

## Honestidade dos dados
- Nunca inventar números, depoimentos, logos ou resultados.
- O que ainda não existe fica como placeholder no formato `{{NOME_DO_DADO}}`.
- O script `npm run check:placeholders` falha se encontrar `{{` no build. Rode antes de todo deploy.
- Toda métrica publicada precisa ter fonte registrada no briefing 00.

## Forma de trabalhar
- Antes de executar, sinalize inconsistências (dados, nomes, links, prazos) e espere confirmação.
- Correções pontuais: não reescreva o que não foi pedido.
- Commits pequenos, com mensagem descritiva.
- Ao terminar uma etapa, liste o que foi feito, o que ficou pendente e como testar.

## Contatos e dados legais (conferir antes de publicar)
WhatsApp (85) 99424-9599 · e-mail thalucena9@gmail.com · CNPJ 51.890.738/0001-02 · Fortaleza/CE. Domínio: `{{DOMINIO}}` (Hostinger, ainda não comprado). Hospedagem: Vercel.

## Ordem dos projetos e domínios
- Landing page: `{{DOMINIO}}`
- Link da bio: `link.{{DOMINIO}}`
- Formulário: `contato.{{DOMINIO}}`
Os três ficam no mesmo monorepo (pastas e projetos Vercel separados) e repassam UTMs por query string.
