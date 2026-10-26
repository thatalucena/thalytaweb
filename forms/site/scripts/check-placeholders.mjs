// Falha se encontrar placeholders {{...}} nos arquivos publicados.
// Uso: npm run check:placeholders

import { readdir, readFile } from 'node:fs/promises';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const IGNORE = new Set(['node_modules', 'scripts', '.git', '.vercel', 'vendor']);
const EXTENSIONS = new Set(['.html', '.css', '.js', '.mjs', '.json', '.txt', '.xml', '.svg']);
const IGNORE_FILES = new Set(['README.md', 'package.json']);
const PATTERN = /\{\{[^}]+\}\}/g;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return IGNORE.has(entry.name) ? [] : walk(path);
    return EXTENSIONS.has(extname(entry.name)) && !IGNORE_FILES.has(entry.name) ? [path] : [];
  }));
  return files.flat();
}

const found = new Map();
for (const file of await walk(root)) {
  const lines = (await readFile(file, 'utf8')).split('\n');
  lines.forEach((line, index) => {
    for (const match of line.matchAll(PATTERN)) {
      const key = match[0];
      if (!found.has(key)) found.set(key, []);
      found.get(key).push(`${relative(root, file)}:${index + 1}`);
    }
  });
}

if (!found.size) {
  console.log('Nenhum placeholder encontrado. Pode publicar.');
  process.exit(0);
}

console.error(`Encontrei ${found.size} placeholder(s) pendente(s):\n`);
for (const [key, places] of found) {
  console.error(`  ${key}  (${places.length}x)  ${places.slice(0, 3).join(', ')}${places.length > 3 ? ', ...' : ''}`);
}
console.error('\nPreencha antes de publicar.');
process.exit(1);
