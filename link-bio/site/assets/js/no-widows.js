// Evita palavra sozinha na última linha: troca o último espaço de cada texto
// por um espaço que não quebra (as duas últimas palavras descem juntas).
// Roda de forma síncrona, antes da primeira pintura, para não mexer no layout depois.
(function () {
  var TARGETS = 'p, li';
  var SKIP = '.chip, .btn, .footer, .sr-only, .intro__handle';
  var BLOCKS = 'p, div, ul, ol, li, h2, h3, h4, figure, blockquote';

  function fix(el) {
    if (el.closest(SKIP) || el.querySelector(BLOCKS)) return;
    if (el.textContent.trim().split(/\s+/).length < 4) return;

    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    var seenWord = false;
    for (var i = nodes.length - 1; i >= 0; i--) {
      var value = nodes[i].nodeValue;
      for (var j = value.length - 1; j >= 0; j--) {
        if (/\s/.test(value[j])) {
          if (seenWord) {
            nodes[i].nodeValue = value.slice(0, j) + ' ' + value.slice(j + 1);
            return;
          }
        } else {
          seenWord = true;
        }
      }
    }
  }

  document.querySelectorAll(TARGETS).forEach(fix);
})();
