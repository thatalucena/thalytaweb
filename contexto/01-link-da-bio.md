# 01 Briefing: Link da bio

## Objetivo
Transformar o clique do perfil @thalyta.web em ação: formulário (principal), landing page (conteúdo) ou WhatsApp (conversa rápida). Página única, mobile first, abrindo em menos de 1 segundo.

## Público e contexto de uso
Quem chega vem do Instagram, no celular, com pouca paciência. Já viu conteúdo seu. Quer saber rápido: quem é você, o que faz, se serve para o negócio dele e como falar com você.

## Estrutura (ordem fixa, de cima para baixo)
1. **Apresentação**
   - Foto sua (retrato, fundo claro).
   - Nome: Thalyta Lucena. @thalyta.web.
   - Uma linha: "Sites que vendem e anúncios que trazem cliente, no mesmo plano."
   - 3 chips de prova: `+150 clientes` · `+R$ 20 milhões gerados` · `5 anos de estrada`. (Só publicar com evidência, ver 00.)
2. **Carrossel de serviços** (swipe horizontal, 1 card por vez, com indicador de posição)
   - Card 1: **Sites que convertem.** Planejamento, copy, design, SEO, GEO e AEO.
   - Card 2: **Tráfego pago.** Meta e Google, relatório semanal.
   - Card 3: **Estratégia de mídia paga.** Diagnóstico, metas reais e distribuição de verba.
   - Cada card: ícone, título, 1 frase, 3 itens e um link "Ver detalhes" para a seção da LP.
3. **Botão: Ver a landing page** (link para o site principal).
4. **Botão principal: Quero meu diagnóstico** (link para o formulário). Maior destaque visual da página, em bordô.
5. **Vitrine de sites**
   - Título: "Sites que já entreguei".
   - 5 mockups em celular e desktop, com nome do cliente e segmento, cada um com link para o site no ar.
   - Lok Mob, Esmalteria da Jana, Clínica Analice Sousa, Clínica Longeva, Noemi Lucena.
6. **Botão: Falar no WhatsApp** (mensagem pré-preenchida: "Oi, Thalyta! Vim pelo Instagram e quero conversar sobre {{interesse}}").
7. **Rodapé mínimo:** CNPJ, e-mail, política de privacidade.

## Funcionalidade
- Carrossel com scroll-snap nativo, sem biblioteca pesada.
- UTMs: todo link de saída recebe `utm_source=instagram&utm_medium=bio&utm_campaign=link_da_bio&utm_content=<id do botão>`.
- Eventos (GA4 e Meta Pixel): `click_bio_lp`, `click_bio_form`, `click_bio_whatsapp`, `click_bio_site_<nome>`, `swipe_servicos`.
- Sem painel de edição. Links vivem em um único arquivo `links.ts`. Para mudar, edita e faz deploy.
- Imagens em WebP/AVIF, largura máxima de 800px, carregamento preguiçoso fora da primeira dobra.

## Stack e hospedagem
- Astro estático, JS mínimo.
- Vercel. Subdomínio: `link.{{DOMINIO}}`.

## Critérios de pronto
- Lighthouse mobile: Performance 95 ou mais, Acessibilidade 95 ou mais.
- Funciona abrindo dentro do navegador interno do Instagram (iOS e Android).
- Todos os botões com área de toque de pelo menos 48px.
- Nenhum placeholder `{{...}}` no build final.
