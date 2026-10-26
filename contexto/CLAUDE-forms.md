# CLAUDE.md: Formulário de captação

> **Atualizado em 25/10/2026:** a stack e algumas regras abaixo mudaram (HTML/CSS/JS puros + função da Vercel, tokens como custom properties, texto suave `#6B5F56`). Vale o `PROJETO.md` (seções 7 e 9) e o `forms/site/README.md`.

Leia primeiro: `contexto/00-fundacao.md`, `contexto/03-formulario.md` e `contexto/04-claude-design.md` (tokens e telas aprovadas).

## O que é
Formulário em etapas, em página própria, que qualifica leads para site, tráfego pago ou os dois. Os dados vão para o Supabase e para uma planilha do Google.

## Stack
Next.js (App Router), TypeScript, Supabase, Apps Script, deploy na Vercel.

## Estrutura
- `src/app/page.tsx`: lê `interesse` e `utm_*` da URL e inicia o fluxo.
- `src/lib/fluxo.ts`: definição declarativa das etapas por ramo (site, trafego, ambos). Não duplique perguntas em componentes.
- `src/components/Etapa*.tsx`, `BarraProgresso`, `CampoTelefone`, `CardOpcao`.
- `src/app/api/lead/route.ts`: valida no servidor, grava no Supabase e envia à planilha via Apps Script.
- `src/app/obrigado/page.tsx`.
- `supabase/schema.sql`: tabela `leads` e políticas de RLS.

## Regras de dados
- A etapa 1 é enviada ao avançar e salva com `status = 'parcial'`. O envio final atualiza o mesmo registro para `completo`.
- RLS ligada. A service role key fica só no servidor (variável de ambiente), nunca no navegador.
- Honeypot invisível e limite de envios por IP. Validação com Zod no servidor.
- Consentimento: uma linha com link para a política de privacidade, registrado com data.
- Score de lead calculado no servidor conforme o briefing 03.

## Rastreamento
`form_start`, `form_step_N`, `form_abandon`, `generate_lead` (GA4, Meta Pixel `Lead`, Google Ads via GA4). A página de obrigado dispara a conversão.

## Variáveis de ambiente
`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `APPS_SCRIPT_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`. Nunca versionar `.env`.

## Definição de pronto
Teste completo nos três ramos em iPhone e Android. Linha na planilha em até 1 minuto. Parcial atualizado para completo. Honeypot e limite por IP testados. `npm run check:placeholders` sem erros.

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
