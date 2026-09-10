-- Execute este arquivo no SQL Editor do Supabase antes de configurar as variáveis de ambiente.
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null,
  tare numeric not null check (tare >= 0),
  chamber text not null check (chamber in ('D1', 'D2', 'D3', 'D4', 'E1', 'E2', 'E3', 'E4', 'E5','Rômulo')),
  image_url text,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

-- MVP sem login: qualquer aparelho que abre o sistema pode consultar e gerenciar o catálogo.
create policy "Public product access" on public.products
  for all to anon using (true) with check (true);

create index if not exists products_name_idx on public.products (name);
