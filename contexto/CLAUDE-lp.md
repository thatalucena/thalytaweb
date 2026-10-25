# CLAUDE.md: Landing page (site principal)

Leia primeiro: `contexto/00-fundacao.md`, `contexto/02-landing-page.md` e `contexto/04-claude-design.md` (tokens e telas aprovadas).

## O que é
Página de venda dos serviços de site (foco principal) e tráfego pago (secundário). Todo CTA leva ao formulário (URL em `assets/js/config.js`, ainda não publicado), repassando UTMs e `?interesse=site|trafego|ambos` quando houver.

## Stack
Astro estático, ilhas de JS apenas onde houver interação (abas de processo, FAQ, carrossel de portfólio). Deploy na Vercel.

## Estrutura
- `src/pages/index.astro` com as 12 seções do briefing 02, cada uma em um componente.
- `src/data/conteudo.ts`: copy, provas, FAQ e portfólio. Fonte única de conteúdo.
- `src/data/faq.ts`: alimenta o FAQ visível e o schema `FAQPage`.
- `public/llms.txt`, `public/robots.txt`, sitemap gerado no build.

## SEO, GEO e AEO (a página é a prova do serviço)
- Um H1. Hierarquia H2/H3 limpa. Texto real em HTML.
- JSON-LD: `ProfessionalService`, `FAQPage`, `BreadcrumbList`. `Review` só com depoimentos reais.
- Title até 60 caracteres e meta description até 155. Open Graph.
- Core Web Vitals: LCP até 2,5 s, CLS até 0,1, INP até 200 ms.

## Rastreamento
Meta Pixel, Google tag, GA4, Tag Manager. Eventos: `view_section_<nome>`, `click_cta_<posicao>`, `select_interesse`, `click_whatsapp`, `click_site_<nome>`.

## Atenção
- Preço: gestão de tráfego a partir de R$ 1.000/mês, mínimo de 3 meses, verba de anúncio à parte. Site sob orçamento.
- Números de prova só os do briefing 00. Nada de inventar.

## Definição de pronto
Lighthouse mobile: Performance 95 ou mais, SEO 100, Acessibilidade 95 ou mais. Schema validado. `npm run check:placeholders` sem erros.

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
WhatsApp (85) 99424-9599 · e-mail thalucena9@gmail.com · CNPJ 51.890.738/0001-02 · Fortaleza/CE. Landing page em `thalytalucena.vercel.app` (domínio próprio ainda não comprado). Hospedagem: Vercel.

## Ordem dos projetos e domínios
- Landing page: `{{DOMINIO}}`
- Link da bio: `link.{{DOMINIO}}`
- Formulário: `contato.{{DOMINIO}}`
Os três ficam no mesmo monorepo (pastas e projetos Vercel separados) e repassam UTMs por query string.
