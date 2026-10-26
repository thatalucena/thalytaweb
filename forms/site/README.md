# Formulário · Thalyta Lucena

Formulário em etapas que qualifica leads de site, tráfego pago ou os dois. Grava no Supabase e na planilha do Google.

Endereço planejado: **https://contatothalyta.vercel.app** (projeto Vercel `contatothalyta`, Root Directory **`forms/site`**).

Sem build. HTML, CSS e JavaScript puros (ES modules) com GSAP 3.12.5 e Lenis 1.1.13. A única parte de servidor é a função `api/lead.js`, que guarda a chave do Supabase.

## Estrutura

```
forms/
├── site/                       ← o que vai para a Vercel
│   ├── index.html              formulário (as etapas são montadas a partir de fluxo.js)
│   ├── obrigado.html           página de obrigado (noindex), dispara generate_lead
│   ├── api/lead.js             POST /api/lead: valida, grava no Supabase, manda para a planilha
│   ├── server/                 validar.js (Zod + fluxo.js) · banco.js (Supabase REST) · planilha.js (Apps Script)
│   ├── assets/
│   │   ├── css/tokens.css      mesmas cores e fontes da LP + tokens de campo
│   │   ├── css/form.css        layout, campos, opções, botões, obrigado
│   │   ├── js/fluxo.js         ÚNICO lugar das perguntas, ramos, mensagens de erro e score
│   │   ├── js/form.js          estado, telas, validação na hora, envio, eventos
│   │   ├── js/config.js        WhatsApp, Instagram, política, IDs de GA4 e Pixel
│   │   ├── js/motion.js        GSAP (troca de etapa, entrada, toques) + Lenis
│   │   ├── js/tracking.js      GA4 e Meta Pixel (só carregam com ID preenchido)
│   │   └── fonts/, vendor/     mesmos arquivos da LP
│   ├── scripts/                dev.mjs (servidor local), testes, check-copy, check-placeholders
│   ├── .env.example            variáveis de ambiente
│   └── vercel.json             cleanUrls, cache longo em /assets, cabeçalhos de segurança
├── supabase/schema.sql         tabela leads, RLS, gatilho de updated_at
├── apps-script/Code.gs         recebe o lead e grava/atualiza a linha na planilha
├── ref/                        telas aprovadas (não mexer)
└── img/                        fotos e prints originais
```

## Editar

| Quero mudar | Onde |
|---|---|
| Uma pergunta, opção, placeholder ou a ordem das etapas | `assets/js/fluxo.js` (a API usa o mesmo arquivo para validar) |
| Pesos do score | `score` de cada opção em `assets/js/fluxo.js` |
| WhatsApp, Instagram, link da política, GA4, Pixel | `assets/js/config.js` |
| Textos da coluna do desktop e do obrigado | `index.html` e `obrigado.html` |
| Cores, cantos, fontes | `assets/css/tokens.css` |
| Limite de envios por IP | `LIMITE` e `JANELA_MS` em `api/lead.js` |

## Comportamento

- **Ramos:** Site (4 etapas) · Tráfego pago (5) · Os dois (6). O contador "Etapa X de N" se ajusta assim que a pessoa escolhe.
- **Ramo Site:** além das perguntas do briefing, pergunta "Você já tem site?" (etapa 2) e "Qual valor pretende investir no seu site?" (etapa 3). As duas entram no score.
- **`?interesse=site|trafego|ambos`:** a pergunta "Você está buscando" some, mas nome, WhatsApp e e-mail continuam na etapa 1. Também lê `utm_*` e `pagina_origem`.
- **Etapa 1:** ao tocar em Continuar, salva em segundo plano com `status = parcial` (a pessoa não espera). Se voltar e corrigir o contato, o mesmo registro é atualizado.
- **Envio final:** atualiza o mesmo registro para `completo` (validado por um token que só aquele navegador tem). Se a etapa 1 não tiver salvo, cria o registro já completo.
- **Voltar e recarregar:** respostas preservadas (sessionStorage da aba).
- **Validação:** ao sair do campo e ao continuar, com as mensagens humanas do briefing. O servidor valida de novo com as mesmas regras.
- **Consentimento:** já vem marcado (decisão de 25/10/2026). Se a pessoa desmarcar, não envia.
- **Botão Enviar:** vira "Enviando..." e trava. Se a rede falhar, aparece "Não consegui enviar. Confere sua internet e tenta de novo, suas respostas continuam aqui." e o botão volta ao normal.
- **Anti-spam:** honeypot `empresa_site` (preenchido = responde ok e não grava), limite de 5 registros novos por IP por hora (guarda só o hash do IP), validação com Zod.
- **Score (0 a 9), no servidor:** investimento (verba de anúncio, ou valor do site no ramo Site) 0 a 4 · início 0 a 3 · já anuncia ou já tem site +1 · objetivo diferente de "Outro" +1. 5 ou mais: chamar no mesmo dia.
- **Eventos:** `form_start`, `form_step_1…N` (com `interesse` e `etapa`), `select_interesse`, `form_abandon` (com a etapa, ao sair sem enviar), `generate_lead` no obrigado (GA4 + Pixel `Lead`, com `interesse`, `faixa_verba` e `faixa_site`), `click_whatsapp`, `click_instagram`. O `generate_lead` dispara uma vez por envio; recarregar o obrigado não repete.
- **Movimento:** entrada da página, troca de etapa deslizando no sentido da navegação, pulinho ao escolher opção, tremor curto no erro, barra de progresso preenchendo, estrela girando no obrigado. Lenis só na roda do mouse e no trackpad. Com `prefers-reduced-motion`, nada se mexe.

## Comandos

```
npm install                 # instala o Zod (usado pela API)
npm run dev                 # http://localhost:4323 · sem .env.local grava na memória (veja /__leads)
npm test                    # fluxo, validação, score e API (banco em memória)
npm run check:copy          # sem travessão e sem "não é X, é Y" (páginas e textos em JS)
npm run check:placeholders  # falha se sobrar {{...}}
```

## Testes de 25/10/2026

- `npm test`: 14 testes passando (ramos, máx. 3 campos por etapa, WhatsApp, e-mail, score dos 3 ramos, parcial → completo, token errado, honeypot, limite por IP, formato inválido).
- Navegador (Chrome, 390 e 1440): os três ramos de ponta a ponta. Erro na hora, Voltar preservando respostas, contador ajustando, `?interesse=` sem a pergunta, consentimento desmarcado bloqueando, "Enviando...", falha de rede com alerta visível, recarregar mantendo a etapa, `generate_lead` uma vez só, UTMs e `pagina_origem` gravados. Sem rolagem horizontal, sem erros no console.
- Lighthouse mobile (servidor local, sem gzip): formulário 96 / 100 / 100 / 100. Obrigado 97 / 100 / 100 (SEO 63 porque é `noindex` de propósito).
- `check:copy` e `check:placeholders` sem erros.
- **Falta testar (só depois de publicar e conectar):** Supabase e planilha reais, iPhone e Android, navegador interno do Instagram.

## Como conectar (passo a passo)

### 1. Supabase (banco de dados)

O Supabase guarda cada pedido numa tabela, como uma planilha protegida. Só a função da Vercel escreve nela.

**Criar a conta e o projeto**
1. Acesse https://supabase.com e clique em **Start your project**. Entre com o GitHub (o mesmo do repositório) ou com e-mail.
2. Na primeira vez, ele pede para criar uma **organização**: nome `Thalyta Lucena`, tipo **Personal**, plano **Free**.
3. Clique em **New project** e preencha:
   - **Project name:** `formulario-thalyta`
   - **Database password:** clique em **Generate a password** e guarde a senha num lugar seguro (não vai ser usada no formulário, mas é a chave-mestra do banco).
   - **Region:** **South America (São Paulo)**.
4. Clique em **Create new project** e espere 1 a 2 minutos até o painel carregar.

**Criar a tabela**
5. No menu da esquerda, clique em **SQL Editor** (ícone `>_`).
6. Clique em **+ New query** (ou no campo em branco que já aparece).
7. Abra o arquivo `forms/supabase/schema.sql` no seu editor, copie **tudo** e cole no SQL Editor.
8. Clique em **Run** (ou Cmd + Enter). Deve aparecer **Success. No rows returned**. Se pedir confirmação por ser uma operação que altera o banco, confirme.
9. No menu da esquerda, clique em **Table Editor**. Deve aparecer a tabela **leads**, vazia, com a indicação de **RLS enabled**. RLS é a trava que impede qualquer acesso que não venha do servidor.

**Copiar as duas informações de conexão**
10. Clique na engrenagem **Project Settings** (no fim do menu da esquerda).
11. **Project URL:** em **Data API** (em alguns painéis, **API**), copie o endereço `https://xxxxxxxx.supabase.co`. Ele também aparece no botão **Connect**, no topo. Esse valor é o `SUPABASE_URL`.
12. **Chave secreta:** em **API Keys**:
    - Na aba de chaves novas (**Publishable and secret keys**), procure **Secret keys**, clique em **Reveal** (ou no ícone do olho) e copie o valor que começa com `sb_secret_`. Se a lista estiver vazia, clique em **Create new API keys** antes.
    - Se o seu painel só mostrar **Legacy API Keys**, copie a **service_role** (clique em **Reveal**).
    - Esse valor é o `SUPABASE_SERVICE_ROLE_KEY`.
13. **Não** use a chave `anon` nem a `publishable`. E nunca cole a chave secreta em arquivo do repositório, WhatsApp ou e-mail: ela dá acesso total ao banco. Guarde num gerenciador de senhas até cadastrar na Vercel.

**No dia a dia**
- Para ver os pedidos: **Table Editor** > **leads**. Dá para filtrar por `status`, `interesse` ou `score`.
- Use a **planilha** para trabalhar os leads (é mais prática). O Supabase é o registro seguro; mudar o status na planilha não muda no Supabase.
- No plano Free, o Supabase **pausa projetos sem nenhum uso por 7 dias** e avisa por e-mail. Com o formulário recebendo pedidos isso não acontece; se acontecer, entre no painel e clique em **Restore project**. Enquanto estiver pausado, o formulário mostra o aviso de erro.

### 2. Planilha do Google + Apps Script

O Apps Script é um pequeno programa que mora dentro da planilha. A função da Vercel manda cada pedido para ele, e ele escreve ou atualiza a linha.

**Criar a planilha e colar o script**
1. Entre no Google Drive com a conta que vai cuidar dos leads e crie uma **Planilha Google** em branco. Dê o nome `Leads · Formulário`.
2. No menu da planilha, clique em **Extensões** > **Apps Script**. Abre uma aba nova com o editor e um arquivo chamado **Código.gs** com `function myFunction() {}`.
3. Clique em **Projeto sem título** (no topo) e renomeie para `Formulário Thalyta`.
4. Apague todo o conteúdo do **Código.gs**, abra `forms/apps-script/Code.gs` no seu editor, copie **tudo** e cole.
5. Salve com Cmd + S (ou o ícone de disquete).

**Criar o segredo**
6. O segredo é uma senha combinada entre a Vercel e o script, para ninguém mais conseguir escrever na sua planilha. No Terminal do Mac, rode:
   ```
   openssl rand -hex 24
   ```
   Copie o resultado (48 letras e números). Esse valor é o `APPS_SCRIPT_SECRET`.
7. No Apps Script, clique na engrenagem **Configurações do projeto** (menu da esquerda).
8. Role até **Propriedades do script** > **Adicionar propriedade do script**:
   - **Propriedade:** `SEGREDO` (assim, maiúsculo)
   - **Valor:** o segredo do passo 6
9. Clique em **Salvar propriedades do script**.

**Autorizar e testar**
10. Volte ao editor (ícone `< >` no menu da esquerda).
11. Na barra de cima, no seletor de função (ao lado de **Depurar**), escolha **testar** e clique em **Executar**.
12. Vai aparecer **Autorização necessária**. Clique em **Revisar permissões** e escolha sua conta.
13. O Google mostra **O Google não verificou este app**. É normal: o app é seu e só você usa. Clique em **Avançado** > **Acessar Formulário Thalyta (não seguro)** > **Permitir**.
14. No **Registro de execução**, embaixo, deve aparecer **Execução concluída**.
15. Volte à planilha: surgiu a aba **Leads** com o cabeçalho e uma linha "Teste". Pode apagar essa linha (a linha inteira, não só o conteúdo).

**Publicar como App da Web**
16. No Apps Script, clique no botão azul **Implantar** > **Nova implantação**.
17. Ao lado de **Selecionar tipo**, clique na engrenagem e escolha **App da Web**.
18. Preencha:
    - **Descrição:** `Formulário v1`
    - **Executar como:** **Eu (seu e-mail)**
    - **Quem pode acessar:** **Qualquer pessoa**. Sem isso a Vercel não consegue enviar. O segredo protege a entrada.
19. Clique em **Implantar**. Se pedir autorização de novo, repita o passo 13.
20. Copie a **URL do app da Web** (termina em `/exec`). Não confunda com o **ID da implantação**. Esse valor é o `APPS_SCRIPT_URL`.
21. Teste rápido: cole essa URL no navegador. Aparecer **"Função de script não encontrada: doGet"** é o esperado. O script só aceita envios (POST), não visitas.

**Cuidados com a planilha**
- Não renomeie a aba **Leads** e não insira nem mova colunas entre **Data** e **Reunião marcada**. O script escreve pela posição das colunas.
- Pode ordenar, filtrar, colorir e formatar à vontade. Se quiser colunas novas, crie depois da última coluna.
- A última coluna (**ID**) fica oculta e é como o script encontra a linha para transformar o parcial em completo. Não apague.
- **Responsável**, **Observações**, **Data do contato** e **Reunião marcada** são suas; o script nunca escreve nelas.
- Na coluna **Status** você pode trocar para `contatado`, `reuniao` ou `descartado`. O script não volta esses status para `completo`.
- Se um lead não aparecer na planilha, veja **Execuções** no menu da esquerda do Apps Script: cada envio aparece com o resultado.
- Se um dia editar o código: **Implantar** > **Gerenciar implantações** > lápis > **Versão: Nova versão** > **Implantar**. A URL continua a mesma. Não use **Nova implantação**, que cria outra URL.

### Testar a conexão antes de publicar (opcional, recomendado)

Com os 4 valores em mãos, dá para testar tudo no seu computador:

1. Na pasta `forms/site`, copie `.env.example` para um arquivo novo chamado `.env.local` (no Terminal: `cp .env.example .env.local`).
2. Abra o `.env.local` e preencha `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `APPS_SCRIPT_URL` e `APPS_SCRIPT_SECRET`, sem aspas e sem espaços.
3. Rode `npm install` (uma vez) e `npm run dev`. O terminal deve dizer **leads: Supabase**.
4. Abra http://localhost:4323, preencha a etapa 1 e avance: a linha aparece como `parcial` no Supabase e na planilha.
5. Termine o formulário: a mesma linha vira `completo`, com score.
6. Apague as linhas de teste nos dois lugares. O `.env.local` não vai para o GitHub (está no `.gitignore`).

### 3. Vercel (publicação)

1. Em https://vercel.com, **Add New** > **Project** > importe o repositório `thalytaweb`.
2. Nome do projeto: `contatothalyta`. **Root Directory: `forms/site`**. Framework Preset: **Other**. Deixe Build Command e Output Directory vazios.
3. **Environment Variables** (marque Production e Preview):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `APPS_SCRIPT_URL`
   - `APPS_SCRIPT_SECRET`
4. **Deploy**. Ao terminar, abra `https://contatothalyta.vercel.app`.
5. Se mudar uma variável depois, faça **Redeploy** (as funções só leem as variáveis novas num deploy novo).

### 4. Teste depois de publicar

1. Preencha a etapa 1 e avance. No Supabase (**Table Editor** > `leads`) deve aparecer a linha com `status = parcial`; na planilha, a linha em até 1 minuto.
2. Termine o formulário. A mesma linha vira `completo`, com `score`, nos dois lugares.
3. Repita nos três ramos (`/?interesse=site`, `/?interesse=trafego`, `/?interesse=ambos`) no iPhone e no Android, e abrindo o link pelo Instagram.
4. Se algo não gravar: Vercel > projeto > **Logs** (filtre por `/api/lead`). Erro `Supabase 401`: chave errada. `Planilha recusou`: segredo diferente nos dois lados ou implantação sem "Qualquer pessoa".
5. Honeypot: no computador, abra o DevTools > Console, rode `document.querySelector('#empresa_site').value = 'teste'` e envie; nada deve ser gravado.
6. Limite por IP: o 6º cadastro novo na mesma hora, da mesma rede, mostra "Recebi muitos envios daqui agora...".

### 5. Medição

1. Preencha `gaId` (`G-...`) e `metaPixelId` em `assets/js/config.js` (os mesmos da LP) e publique.
2. GA4: **Administrador** > **Eventos** > marque `generate_lead` como **evento principal** (conversão).
3. Google Ads: **Metas** > **Conversões** > **Importar** > Google Analytics 4 > `generate_lead`.
4. Meta: o evento padrão `Lead` dispara no obrigado. Confira no **Gerenciador de Eventos** > **Testar eventos**.

### 6. Ligar a LP e o link da bio ao formulário

1. Em `landing-page/assets/js/config.js` e `link-bio/site/assets/js/config.js`, preencha `formUrl: 'https://contatothalyta.vercel.app/'`.
2. Publique os dois. Os botões passam a abrir o formulário com `?interesse=`, as UTMs e `pagina_origem`.
