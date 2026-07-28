# Qual o Código?

Consulta rápida de códigos de balança para o açougue. A busca funciona conforme o funcionário digita e mostra código, tara, câmara e foto do produto.

## Desenvolvimento local

```bash
npm run dev
```

Sem configuração adicional, o sistema usa dados de exemplo e salva cadastros somente neste navegador.

## Ativar o Supabase

1. Crie um projeto no [Supabase](https://supabase.com).
2. No **SQL Editor**, execute o conteúdo de `supabase/schema.sql`.
3. Copie `.env.example` para `.env.local` e preencha a URL e a chave anônima do projeto.
4. Reinicie o servidor de desenvolvimento.

Com as variáveis preenchidas, todos os aparelhos passam a consultar o mesmo catálogo. Para publicar na Vercel, adicione as mesmas variáveis em **Settings → Environment Variables** antes do deploy.

> No MVP não há login: qualquer pessoa que abrir o sistema pode alterar os produtos. Quando o uso estiver consolidado, a próxima evolução é proteger o cadastro com autenticação.
