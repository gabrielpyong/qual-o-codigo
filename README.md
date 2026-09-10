# Códigos Rissul

Ferramenta mobile-first para consultar e manter códigos de produtos pesados na balança. A consulta pública está em `/`; o cadastro administrativo está em `/admin`.

## Tecnologias

Next.js, TypeScript, Tailwind CSS e Supabase (PostgreSQL + Storage). O Supabase é a única fonte dos produtos; o catálogo não usa `localStorage`.

## Executar localmente

```bash
npm install
copy .env.example .env.local
npm run dev
```

Preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` no `.env.local`. Encontre ambos em **Project Settings → API** do Supabase. Nunca use `service_role` no navegador.

## Configurar Supabase

1. Abra **SQL Editor → New query**.
2. Execute [supabase/schema.sql](supabase/schema.sql).
3. O script cria/atualiza tabela, índices, bucket `product-images` (JPEG, PNG, WebP, até 5 MB) e RLS do MVP.

As políticas atuais permitem gerenciamento com a chave pública. Antes de abrir `/admin` a usuários não confiáveis, implemente Supabase Auth e restrinja as políticas de escrita.

## Vercel

Importe o repositório GitHub e, em **Settings → Environment Variables**, cadastre as duas variáveis `NEXT_PUBLIC_SUPABASE_*` para Production, Preview e Development. Sem elas, a aplicação mostra erro de configuração em vez de gravar dados isolados por aparelho.

## Validar

```bash
npm run lint
npm run build
```
