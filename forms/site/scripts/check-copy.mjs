// Revisa a copy pública contra as regras do briefing 00:
// sem travessão (— ou –) e sem construções do tipo "não é X, é Y".
// Confere as páginas e os textos do formulário (perguntas e mensagens em JS).
// Uso: npm run check:copy

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const PAGES = ['index.html', 'obrigado.html'];
const SCRIPTS = ['assets/js/fluxo.js', 'assets/js/form.js', 'assets/js/config.js', 'api/lead.js'];

const RULES = [
  { name: 'travessão', pattern: /[—–]/ },
  { name: '"não é X, é Y"', pattern: /\bnão (é|são)\b[^.!?]{0,60}[,;]\s*(é|são)\b/i },
  { name: '"mas sim"', pattern: /\bmas sim\b/i },
];

// Remove scripts, estilos, comentários e tags para sobrar só o texto visível.
const visibleText = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<!--[\s\S]*?-->/g, ' ')
  .replace(/<[^>]+>/g, '\n');

// Nos scripts, só o conteúdo entre aspas simples (é onde mora a copy).
const strings = (js) => [...js.matchAll(/'((?:[^'\\\n]|\\.)*)'/g)].map((m) => m[1]).join('\n');

let problems = 0;
const check = (file, text) => {
  text.split('\n').map((l) => l.trim()).filter(Boolean).forEach((line) => {
    RULES.forEach((rule) => {
      if (rule.pattern.test(line)) {
        problems += 1;
        console.error(`${file}: ${rule.name} → "${line}"`);
      }
    });
  });
};

for (const page of PAGES) check(page, visibleText(await readFile(root + page, 'utf8')));
for (const script of SCRIPTS) check(script, strings(await readFile(root + script, 'utf8')));

if (problems) {
  console.error(`\n${problems} problema(s) de copy.`);
  process.exit(1);
}
console.log('Copy dentro das regras: sem travessão e sem "não é X, é Y".');
