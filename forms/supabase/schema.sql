-- Formulário Thalyta Lucena · tabela leads
-- Rodar uma vez no Supabase: SQL Editor > New query > colar tudo > Run.
-- Gravação e leitura só pela rota /api/lead, com a chave secreta (service role) no servidor.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  status           text not null default 'parcial'
                   check (status in ('parcial', 'completo', 'contatado', 'reuniao', 'descartado')),

  nome             text not null,
  whatsapp         text not null,          -- só dígitos, com DDD (sem o 55)
  email            text not null,
  interesse        text not null check (interesse in ('trafego', 'site', 'ambos')),

  respostas        jsonb not null default '{}'::jsonb,  -- todas as perguntas do ramo
  faixa_verba      text,                   -- verba mensal de anúncios (tráfego e os dois)
  faixa_site       text,                   -- valor pretendido para o site (ramo site)
  inicio           text,
  cidade           text,
  objetivo         text,

  utm_source       text,
  utm_medium       text,
  utm_campaign     text,
  utm_content      text,
  utm_term         text,
  referrer         text,
  pagina_origem    text,

  consentimento    boolean not null default false,
  consentimento_em timestamptz,
  score            int check (score between 0 and 9),

  edit_token       text not null,          -- permite ao mesmo navegador atualizar o parcial
  ip_hash          text                    -- hash do IP para o limite de envios (nunca o IP)
);

create index if not exists leads_ip_hash_created_at_idx on public.leads (ip_hash, created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_faixa_verba_idx on public.leads (faixa_verba);

-- updated_at automático
create or replace function public.leads_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_touch_updated_at on public.leads;
create trigger leads_touch_updated_at
before update on public.leads
for each row execute function public.leads_touch_updated_at();

-- Segurança: RLS ligada e nenhuma política para anon/authenticated.
-- Só a chave secreta do servidor (que ignora RLS) lê e grava.
alter table public.leads enable row level security;
alter table public.leads force row level security;
revoke all on table public.leads from anon, authenticated;
