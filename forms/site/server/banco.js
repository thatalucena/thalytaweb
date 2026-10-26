// Acesso à tabela leads do Supabase pela API REST, com a chave secreta do servidor.
// Com LEAD_STORE=memory (só no npm run dev) os registros ficam na memória do processo.

const TABLE = 'leads';

function supabase() {
  // Aceita a URL do projeto com ou sem o /rest/v1 que o painel da Data API mostra.
  const url = String(process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '').replace(/\/rest\/v1$/, '');
  const key = String(process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
  if (!url || !key) throw new Error('SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY não configuradas.');

  const headers = { apikey: key, 'Content-Type': 'application/json' };
  // Chave antiga (JWT service_role) também vai no Authorization; a nova (sb_secret_) só no apikey.
  if (key.startsWith('eyJ')) headers.Authorization = `Bearer ${key}`;

  return async (path, { method = 'GET', body, prefer } = {}) => {
    const response = await fetch(`${url}/rest/v1/${path}`, {
      method,
      headers: prefer ? { ...headers, Prefer: prefer } : headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      throw new Error(`Supabase ${response.status}: ${await response.text()}`);
    }
    return response;
  };
}

const remoto = {
  async inserir(registro) {
    const response = await supabase()(TABLE, { method: 'POST', body: registro, prefer: 'return=representation' });
    const [row] = await response.json();
    return row;
  },

  // Atualiza só se id e token baterem (e, se pedido, só enquanto o status for o esperado).
  async atualizar(id, token, campos, { status } = {}) {
    const filtros = [`id=eq.${encodeURIComponent(id)}`, `edit_token=eq.${encodeURIComponent(token)}`];
    if (status) filtros.push(`status=eq.${status}`);
    const response = await supabase()(`${TABLE}?${filtros.join('&')}`, {
      method: 'PATCH',
      body: campos,
      prefer: 'return=representation',
    });
    const [row] = await response.json();
    return row || null;
  },

  async contarRecentes(ipHash, desde) {
    const response = await supabase()(
      `${TABLE}?select=id&ip_hash=eq.${ipHash}&created_at=gte.${encodeURIComponent(desde.toISOString())}`,
      { method: 'HEAD', prefer: 'count=exact' },
    );
    const range = response.headers.get('content-range') || '*/0';
    return Number(range.split('/')[1]) || 0;
  },
};

const memoria = (() => {
  const rows = new Map();
  return {
    rows,
    async inserir(registro) {
      const now = new Date().toISOString();
      const row = { id: crypto.randomUUID(), created_at: now, updated_at: now, ...registro };
      rows.set(row.id, row);
      return row;
    },
    async atualizar(id, token, campos, { status } = {}) {
      const row = rows.get(id);
      if (!row || row.edit_token !== token || (status && row.status !== status)) return null;
      Object.assign(row, campos, { updated_at: new Date().toISOString() });
      return row;
    },
    async contarRecentes(ipHash, desde) {
      return [...rows.values()].filter((r) => r.ip_hash === ipHash && new Date(r.created_at) >= desde).length;
    },
  };
})();

export const banco = () => (process.env.LEAD_STORE === 'memory' ? memoria : remoto);
export const memoriaLocal = memoria;
