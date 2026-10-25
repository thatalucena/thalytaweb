// Revisa a copy pública contra as regras do briefing 00:
// sem travessão (— ou –) e sem construções do tipo "não é X, é Y".
// Uso: npm run check:copy

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const PAGES = ['index.html', 'servicos/index.html', 'portfolio/index.html', 'processo/index.html', 'duvidas/index.html', 'politica-de-privacidade.html', 'llms.txt'];

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

let problems = 0;
for (const page of PAGES) {
  const text = visibleText(await readFile(root + page, 'utf8'));
  text.split('\n').map((l) => l.trim()).filter(Boolean).forEach((line) => {
    RULES.forEach((rule) => {
      if (rule.pattern.test(line)) {
        problems += 1;
        console.error(`${page}: ${rule.name} → "${line}"`);
      }
    });
  });
}

if (problems) {
  console.error(`\n${problems} problema(s) de copy.`);
  process.exit(1);
}
console.log('Copy dentro das regras: sem travessão e sem "não é X, é Y".');
