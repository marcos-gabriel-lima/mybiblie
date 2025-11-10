# Configuração Rápida - Conteúdo da Bíblia

## Arquivo .env necessário

Crie um arquivo `.env` na pasta `nextjs_space` com:

```env
DATABASE_URL="postgresql://postgres:senha123@localhost:5432/biblia_almeida?schema=public"
NEXTAUTH_URL="http://localhost:3010"
NEXTAUTH_SECRET="seu-secret-aqui"
```

## Comandos para configurar

```bash
# 1. Criar banco de dados
createdb -U postgres biblia_almeida

# 2. Executar migrações
cd nextjs_space
npx prisma migrate dev --name init

# 3. Popular com conteúdo da Bíblia
npm run prisma:seed
```

## Ver guia completo

Veja `CONFIGURACAO_BIBLIA.md` para instruções detalhadas.

