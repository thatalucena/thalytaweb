// Servidor local: arquivos estáticos com cleanUrls (igual à Vercel) e a rota /api/lead.
// Lê .env.local se existir. Sem SUPABASE_URL, grava na memória (LEAD_STORE=memory)
// e mostra os registros em http://localhost:4323/__leads.
// Uso: npm run dev

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const PORT = Number(process.env.PORT) || 4323;

const envFile = join(root, '.env.local');
if (existsSync(envFile)) {
  readFileSync(envFile, 'utf8').split('\n').forEach((line) => {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match && !(match[1] in process.env)) process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
  });
}
// Aponta o que ainda está vazio ou com o valor de exemplo do .env.example.
const pendentes = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'APPS_SCRIPT_URL', 'APPS_SCRIPT_SECRET']
  .filter((key) => !process.env[key] || /x{6,}/.test(process.env[key]));
if (pendentes.length) {
  console.warn(`Atenção: ${pendentes.join(', ')} vazio(s) ou com valor de exemplo no .env.local.`);
}
if (pendentes.includes('SUPABASE_URL') || pendentes.includes('SUPABASE_SERVICE_ROLE_KEY')) {
  process.env.LEAD_STORE = 'memory';
}

const { default: handler } = await import('../api/lead.js');
const { memoriaLocal } = await import('../server/banco.js');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

// Resposta no formato que a Vercel entrega às funções Node.
function vercelRes(res) {
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (data) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(data));
    return res;
  };
  return res;
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return undefined;
  if (String(req.headers['content-type']).includes('application/json')) {
    try { return JSON.parse(raw); } catch { return raw; }
  }
  return raw;
}

async function serveFile(res, path) {
  const data = await readFile(path);
  res.writeHead(200, { 'Content-Type': TYPES[extname(path)] || 'application/octet-stream' });
  res.end(data);
}

async function resolvePath(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  if (/^[/\\](api|server|scripts|node_modules)[/\\]/.test(clean) || clean.includes('.env')) return null;
  const candidates = clean.endsWith('/') ? [join(clean, 'index.html')] : [clean, `${clean}.html`];
  for (const candidate of candidates) {
    const full = join(root, candidate);
    if (!full.startsWith(root)) continue;
    try {
      if ((await stat(full)).isFile()) return full;
    } catch { /* tenta o próximo */ }
  }
  return null;
}

createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  try {
    if (url.pathname === '/api/lead') {
      req.body = await readBody(req);
      await handler(req, vercelRes(res));
      return;
    }
    if (url.pathname === '/__leads' && process.env.LEAD_STORE === 'memory') {
      vercelRes(res).status(200).json([...memoriaLocal.rows.values()]);
      return;
    }
    const file = await resolvePath(url.pathname);
    if (!file) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Não encontrado');
      return;
    }
    await serveFile(res, file);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) res.writeHead(500);
    res.end();
  }
}).listen(PORT, () => {
  const modo = process.env.LEAD_STORE === 'memory' ? 'memória (veja /__leads)' : 'Supabase';
  console.log(`Formulário em http://localhost:${PORT} · leads: ${modo}`);
});
