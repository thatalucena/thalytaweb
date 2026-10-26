# Link da bio · Thalyta Lucena

Página única que recebe o clique do perfil @thalyta.web e leva para o formulário (diagnóstico), a landing page ou o WhatsApp.

Endereço planejado: **https://biothalyta.vercel.app** (projeto Vercel `biothalyta`, Root Directory `link-bio/site`).

Não há build. A pasta inteira é o site publicado (Vercel, `vercel.json` com `cleanUrls` e cache longo em `/assets`).

## Estrutura

```
link-bio/site/
├── index.html              a página (7 blocos do briefing 01, na ordem das telas de link-bio/ref)
├── favicon.svg, og-image.jpg, robots.txt, vercel.json
├── assets/
│   ├── css/
│   │   ├── tokens.css      cores (hex), cantos, sombra, @font-face
│   │   └── bio.css         base, coluna, blocos, carrosséis, botões, movimento
│   ├── fonts/              Bricolage Grotesque (variável 400–800, largura 75–100%) e Instrument Serif (regular e itálico)
│   ├── img/                retrato (320 e 512px) e prints do portfólio (desktop 400/800px, celular 120/360px)
│   ├── js/
│   │   ├── config.js       ÚNICO lugar para WhatsApp, formUrl, IDs de medição, UTMs e mensagens
│   │   ├── links.js        UTMs nos links de saída, formulário e WhatsApp
│   │   ├── tracking.js     GA4 e Meta Pixel (só carregam com ID preenchido) e eventos de clique
│   │   ├── carousel.js     indicador do carrossel, toque nos pontos, setas do teclado, swipe_servicos
│   │   ├── motion.js       Lenis + GSAP/ScrollTrigger
│   │   ├── no-widows.js    evita palavra sozinha na última linha
│   │   └── main.js         ponto de entrada
│   └── vendor/             GSAP 3.12.5, ScrollTrigger, Lenis 1.1.13 (mesmos arquivos da LP)
└── scripts/                check-copy.mjs e check-placeholders.mjs
```

## Editar

| Quero mudar | Onde |
|---|---|
| Número do WhatsApp, mensagens, UTMs | `assets/js/config.js` |
| Endereço do formulário (quando publicar) | `formUrl` em `assets/js/config.js` |
| GA4 e Meta Pixel | `gaId` e `metaPixelId` em `assets/js/config.js` |
| Textos, cards de serviço, sites da vitrine | `index.html` |
| Cores, cantos, fontes | `assets/css/tokens.css` |

## Comportamento

- **UTMs:** todo link com `data-out` recebe `utm_source=instagram&utm_medium=bio&utm_campaign=link_da_bio&utm_content=<data-out>`.
- **Quero meu diagnóstico:** com `formUrl` vazio abre o WhatsApp com "Oi, Thalyta! Vim pelo Instagram e quero meu diagnóstico.". Com `formUrl` preenchido, abre o formulário com as UTMs e `pagina_origem=link_da_bio`.
- **Falar no WhatsApp:** "Oi, Thalyta! Vim pelo Instagram e quero conversar sobre site e anúncios."
- **Sites da vitrine:** abrem em nova aba; o cartão inteiro é clicável.
- **Eventos:** `click_bio_lp` (Meu portfólio e os três "Ver detalhes", com `botao`), `click_bio_form`, `click_bio_whatsapp`, `click_bio_site_<nome>`, `swipe_servicos` (com `card` e `servico`).
- **Carrossel:** scroll-snap nativo, um card por vez com a ponta do próximo à mostra. O indicador acompanha o card e também funciona por toque e pelas setas do teclado.
- **Movimento:** entrada da apresentação (nome, foto, selo, chips), selo girando, cards chegando da direita, estrela do diagnóstico girando com o scroll, estrelas de fundo no desktop. Lenis só na roda do mouse e no trackpad; no toque o scroll é nativo (melhor no navegador do Instagram).
- **prefers-reduced-motion:** sem Lenis e sem GSAP; tudo aparece no lugar. Sem JS, a página aparece completa (links sem UTMs).
- **Toque nos botões:** encolhe para 97% e clareia em 120ms, volta em 160ms.

## Comandos

```
npm run dev                 # http://localhost:4322
npm run check:copy          # sem travessão e sem "não é X, é Y"
npm run check:placeholders  # falha se sobrar {{...}}
```

## Testes de 25/10/2026

- Lighthouse mobile (servidor local com gzip): performance 97, acessibilidade 100, boas práticas 100, SEO 100. CLS 0.
- Sem rolagem horizontal em 390 e 1440. Sem erros no console.
- Carrossel: pontos, arrasto e setas atualizam o indicador; `swipe_servicos` dispara uma vez por troca.
- Todos os links e botões com pelo menos 48px de altura.
- `check:copy` e `check:placeholders` sem erros.
- **Falta testar:** navegador interno do Instagram no iPhone e no Android (só dá depois do deploy).
