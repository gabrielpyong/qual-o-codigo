-- Códigos Rissul: execute uma vez no SQL Editor do Supabase.
create extension if not exists pg_trgm;
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(), name text not null, search_terms text[] not null default '{}', code text not null,
  tare numeric(8,3) check (tare is null or tare >= 0), photo_url text, category text, chamber_location text, notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
alter table public.products add column if not exists search_terms text[] not null default '{}';
alter table public.products add column if not exists photo_url text;
alter table public.products add column if not exists category text;
alter table public.products add column if not exists chamber_location text;
alter table public.products add column if not exists notes text;
alter table public.products add column if not exists updated_at timestamptz not null default now();
do $$ begin
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'products' and column_name = 'chamber') then
    execute 'update public.products set chamber_location = chamber where chamber_location is null and chamber is not null';
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'products' and column_name = 'image_url') then
    execute 'update public.products set photo_url = image_url where photo_url is null and image_url is not null';
  end if;
end $$;
create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at before update on public.products for each row execute function public.set_updated_at();
create index if not exists products_name_trgm_idx on public.products using gin (name gin_trgm_ops);
create index if not exists products_search_terms_idx on public.products using gin (search_terms);
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values ('product-images', 'product-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']) on conflict (id) do update set public = true, file_size_limit = 5242880, allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];
alter table public.products enable row level security;
drop policy if exists "Public product access" on public.products;
create policy "Public product access" on public.products for all to anon using (true) with check (true);
drop policy if exists "Public product images" on storage.objects;
create policy "Public product images" on storage.objects for all to anon using (bucket_id = 'product-images') with check (bucket_id = 'product-images');
-- Antes de liberar /admin para usuários não confiáveis, use Supabase Auth e restrinja a escrita.
