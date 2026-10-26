/**
 * Formulário Thalyta Lucena · recebe os leads da rota /api/lead e grava na planilha.
 *
 * Instalação (detalhes no forms/site/README.md):
 * 1. Na planilha: Extensões > Apps Script, cole este arquivo inteiro.
 * 2. Em Configurações do projeto > Propriedades do script, crie SEGREDO com o mesmo
 *    valor de APPS_SCRIPT_SECRET da Vercel.
 * 3. Implantar > Nova implantação > App da Web · Executar como: Eu · Acesso: Qualquer pessoa.
 * 4. Copie a URL /exec para APPS_SCRIPT_URL na Vercel.
 *
 * Cada lead ocupa uma linha, localizada pelo id: o parcial vira completo na mesma linha.
 * As colunas de acompanhamento (responsável, observações, data do contato, reunião)
 * são suas e nunca são sobrescritas pelo script.
 */

var ABA = 'Leads';

// Colunas preenchidas pelo formulário (na ordem da planilha).
var COLUNAS = [
  ['data', 'Data'],
  ['nome', 'Nome'],
  ['whatsapp', 'WhatsApp'],
  ['email', 'E-mail'],
  ['interesse', 'Interesse'],
  ['faixa_verba', 'Verba de anúncios'],
  ['faixa_site', 'Investimento no site'],
  ['inicio', 'Início'],
  ['cidade', 'Cidade'],
  ['objetivo', 'Objetivo'],
  ['resumo', 'Resumo das respostas'],
  ['origem', 'Origem (UTM)'],
  ['status', 'Status'],
  ['score', 'Score'],
];

// Colunas manuais, só criadas no cabeçalho.
var MANUAIS = ['Responsável', 'Observações', 'Data do contato', 'Reunião marcada'];

var INTERESSES = { trafego: 'Tráfego pago', site: 'Site', ambos: 'Os dois' };

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var corpo = JSON.parse(e.postData.contents);
    var segredo = PropertiesService.getScriptProperties().getProperty('SEGREDO') || '';
    if (segredo && corpo.segredo !== segredo) return resposta({ ok: false, erro: 'segredo' });

    lock.waitLock(10000);
    gravar(corpo.lead);
    return resposta({ ok: true });
  } catch (erro) {
    return resposta({ ok: false, erro: String(erro) });
  } finally {
    lock.releaseLock();
  }
}

function gravar(lead) {
  if (!lead || !lead.id) throw new Error('lead sem id');
  var aba = prepararAba();
  var linha = acharLinha(aba, lead.id);
  var valores = COLUNAS.map(function (coluna) { return formatar(coluna[0], lead[coluna[0]], lead); });

  if (linha) {
    // Status manual (contatado, reuniao...) não volta para "completo".
    var statusAtual = aba.getRange(linha, indice('status')).getValue();
    if (statusAtual && ['parcial', 'completo'].indexOf(statusAtual) === -1) {
      valores[indice('status') - 1] = statusAtual;
    }
    aba.getRange(linha, 1, 1, valores.length).setValues([valores]);
  } else {
    aba.appendRow(valores.concat(MANUAIS.map(function () { return ''; }), [lead.id]));
  }
}

function prepararAba() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(ABA) || planilha.insertSheet(ABA);
  if (aba.getLastRow() === 0) {
    var cabecalho = COLUNAS.map(function (c) { return c[1]; }).concat(MANUAIS, ['ID']);
    aba.appendRow(cabecalho);
    aba.setFrozenRows(1);
    aba.getRange(1, 1, 1, cabecalho.length).setFontWeight('bold');
    aba.hideColumns(cabecalho.length);
  }
  return aba;
}

// O id fica na última coluna (oculta).
function acharLinha(aba, id) {
  var total = aba.getLastRow();
  if (total < 2) return 0;
  var colunaId = COLUNAS.length + MANUAIS.length + 1;
  var achado = aba.getRange(2, colunaId, total - 1, 1).createTextFinder(id).matchEntireCell(true).findNext();
  return achado ? achado.getRow() : 0;
}

function indice(chave) {
  for (var i = 0; i < COLUNAS.length; i++) if (COLUNAS[i][0] === chave) return i + 1;
  return 0;
}

function formatar(chave, valor, lead) {
  if (chave === 'data') return valor ? new Date(valor) : new Date();
  if (chave === 'whatsapp') {
    var digitos = String(valor || '').replace(/\D/g, '');
    return '=HYPERLINK("https://wa.me/55' + digitos + '";"' + mascara(digitos) + '")';
  }
  if (chave === 'interesse') return INTERESSES[valor] || valor || '';
  return valor === undefined || valor === null ? '' : valor;
}

function mascara(d) {
  if (d.length === 11) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 3) + ' ' + d.slice(3, 7) + '-' + d.slice(7);
  if (d.length === 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
  return d;
}

function resposta(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(ContentService.MimeType.JSON);
}

// Teste manual no editor: selecione testar e clique em Executar.
function testar() {
  gravar({
    id: 'teste-' + new Date().getTime(),
    data: new Date().toISOString(),
    status: 'parcial',
    nome: 'Teste',
    whatsapp: '85999999999',
    email: 'teste@exemplo.com',
    interesse: 'site',
    origem: 'teste manual',
    score: '',
  });
}
