# Site · Thalyta Lucena

Landing page + páginas de Serviços, Portfólio, Processo e Dúvidas.
HTML, CSS e JavaScript puros, com **GSAP + ScrollTrigger** para as animações e **Lenis** para o scroll suave.
Endereço atual: **https://thalytalucena.vercel.app**

## Como rodar

```bash
npm run dev                  # servidor local em http://localhost:4321
npm run check:copy           # sem travessão e sem "não é X, é Y" (todas as páginas)
npm run check:placeholders   # falha se sobrar {{...}}; rode antes de todo deploy
```

Não há build. A pasta inteira é o site publicado (Vercel, `vercel.json` com `cleanUrls`).

## Estrutura

```
landing-page/
├── index.html                    landing page (13 blocos do briefing 02)
├── servicos/index.html           /servicos
├── portfolio/index.html          /portfolio
├── processo/index.html           /processo
├── duvidas/index.html            /duvidas (FAQ completo + schema FAQPage)
├── politica-de-privacidade.html  LGPD
├── assets/
│   ├── css/
│   │   ├── tokens.css            cores (hex), raios, sombras, @font-face
│   │   ├── base.css              reset, moldura de blocos, tipografia, entrada do hero via CSS
│   │   ├── components.css        botões, header, menu, selo, faixa, mockups, FAQ, voltar ao topo, hovers
│   │   ├── sections.css          seções da home + política
│   │   └── pages.css             páginas internas
│   ├── js/
│   │   ├── no-widows.js          evita palavra sozinha na última linha (roda antes da pintura)
│   │   ├── config.js             WhatsApp, URL do formulário, IDs de GA4 e Pixel
│   │   ├── links.js              links do formulário (interesse + UTMs) e WhatsApp
│   │   ├── tracking.js           dataLayer, GA4, Meta Pixel, eventos do briefing
│   │   ├── ui.js                 menu mobile, abas, barra fixa, página ativa no menu, voltar ao topo
│   │   ├── motion.js             Lenis + GSAP (entradas, letreiros, selo, parallax)
│   │   └── main.js               ponto de entrada
│   ├── fonts/                    Bricolage Grotesque (subset PT, eixos 400–800) e Instrument Serif
│   ├── img/                      retratos da Thalyta
│   ├── img/portfolio/            prints reais dos 5 sites (desktop 1024×640, celular 360×720)
│   └── vendor/                   gsap 3.12.5, ScrollTrigger 3.12.5, lenis 1.1.13
├── og-image.jpg, favicon.svg, robots.txt, sitemap.xml, llms.txt, vercel.json
└── scripts/                      check-placeholders.mjs, check-copy.mjs
```

**Atenção:** header, menu mobile, bloco "Por onde você quer começar?", rodapé e sprite de ícones se repetem nas 5 páginas. Ao mudar um deles, mude em todas. O FAQ da home e o de `/duvidas` também aparecem no JSON-LD de cada página: edite texto e schema juntos.

## Decisões

| Tema | Decisão |
|---|---|
| Direção visual | Estrutura e ritmo da Loudly Studio (blocos arredondados sobre fundo escuro, header em pílulas, grade em perspectiva, cartões de vidro, selo girando, cartões inclinados, letreiros, menu em tela cheia) com **apenas a paleta, as fontes e os detalhes da id visual da Thalyta**. |
| Sem eyebrows | Os rótulos pequenos acima dos títulos foram retirados. Rótulos de lista viraram subtítulos em Instrument Serif. |
| Destaque | Instrument Serif itálico em uma palavra ou numa expressão curta de destaque por título. |
| Viúvas | `text-wrap: pretty` + `no-widows.js`, que junta as duas últimas palavras de cada parágrafo, item e título. |
| Menu | Serviços, Portfólio, Processo e Dúvidas abrem páginas próprias. A página atual fica marcada no menu. |
| Formulário | Ainda não publicado. Com `CONFIG.formUrl` vazio, os botões com interesse abrem o WhatsApp com a mensagem certa, e os genéricos levam à seção `/#diagnostico`. Quando o formulário existir, preencha a URL completa (a Vercel não aceita `contato.thalytalucena.vercel.app`, então ele terá outro endereço, como `contatothalyta.vercel.app`). |
| Ofertas | Site sob orçamento **com taxa de manutenção mensal** (não existe mais a menção a "sem fidelidade"). Tráfego a partir de R$ 1.000/mês de honorário, verba à parte, mínimo de 3 meses. |
| Atendimento | Sem horário publicado. Só "respondo no mesmo dia útil". |
| Depoimentos | Pedro (Clínica Longeva), Lucas (Lok Mob) e Noemi Lucena, com o texto enviado. Só o acento de "esperávamos" e o ponto final foram ajustados. Também estão no schema como `Review`, sem nota. |
| CSS | Cores em hexadecimal e medidas em px, com custom properties só como fonte única dos valores. |
| Acessibilidade | Um H1 por página, foco visível, alvos de 48 px ou mais, `details` nativo no FAQ, abas com teclado, menu com Esc e foco preso, skip link, breadcrumbs. `prefers-reduced-motion` desliga Lenis, entradas e letreiros. |

## Testes (25/10/2026)

- Chrome headless em 1440, 820 e 390 px nas 6 páginas: sem erros de JS ou HTTP, sem rolagem horizontal, nenhum elemento preso invisível, nenhum alvo de toque abaixo de 44 px, nenhuma viúva detectada.
- Lighthouse mobile (servidor com gzip, como na Vercel):

| Página | Performance | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| / | 96 | 100 | 100 | 100 |
| /servicos | 98 | 100 | 100 | 100 |
| /portfolio | 93 | 100 | 100 | 100 |
| /processo | 98 | 100 | 100 | 100 |
| /duvidas | 98 | 100 | 100 | 100 |

O Portfólio fica em 93 no mobile simulado por causa dos 10 prints (cerca de 300 KB). No desktop ele tira 100, e o LCP medido no navegador com throttling é de 1,4 s.

## Pendências

1. **GA4 e Meta Pixel:** preencher `gaId` e `metaPixelId` em `assets/js/config.js`.
2. **Formulário:** publicar e preencher `formUrl` em `assets/js/config.js`.
3. **Retrato profissional:** a foto atual tem 640 px; com 1000 px ou mais o arco do hero fica nítido em telas retina.
4. **Dados dos sites do portfólio** (leads, velocidade, posição no Google), se quiser mostrar números por projeto.
5. **Prints:** são de 25/10/2026. Se algum site mudar, refaça em `assets/img/portfolio/` com o mesmo nome e tamanho.
