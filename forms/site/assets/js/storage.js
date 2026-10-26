// sessionStorage pode falhar (aba anônima, bloqueio): as páginas seguem sem ele.

export const STORAGE_FORM = 'tl-form-v1';
export const STORAGE_LEAD = 'tl-lead-v1';

export const store = {
  get(key) { try { return JSON.parse(sessionStorage.getItem(key)); } catch { return null; } },
  set(key, value) { try { sessionStorage.setItem(key, JSON.stringify(value)); } catch { /* sem persistência */ } },
  del(key) { try { sessionStorage.removeItem(key); } catch { /* sem persistência */ } },
};
