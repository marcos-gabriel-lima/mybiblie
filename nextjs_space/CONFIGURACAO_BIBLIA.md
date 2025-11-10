# 📖 Guia de Configuração do Conteúdo da Bíblia

Este guia explica como configurar o banco de dados e popular com o conteúdo completo da Bíblia Sagrada versão Almeida.

## 📋 Pré-requisitos

1. **PostgreSQL instalado e rodando**
   - Download: https://www.postgresql.org/download/
   - Ou use Docker: `docker run --name postgres-biblia -e POSTGRES_PASSWORD=senha123 -p 5432:5432 -d postgres`

2. **Node.js e npm instalados**
   - Verifique: `node --version` e `npm --version`

## 🔧 Passo 1: Configurar o Banco de Dados

### 1.1 Criar o arquivo `.env`

Na pasta `nextjs_space`, crie um arquivo `.env` com a seguinte configuração:

```env
# URL de conexão com o PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/biblia_almeida?schema=public"

# URL base da aplicação (para NextAuth)
NEXTAUTH_URL="http://localhost:3010"
NEXTAUTH_SECRET="seu-secret-aqui-gerar-com-openssl-rand-base64-32"
```

**Exemplo de DATABASE_URL:**
- Usuário: `postgres`
- Senha: `senha123`
- Host: `localhost`
- Porta: `5432`
- Banco: `biblia_almeida`

```env
DATABASE_URL="postgresql://postgres:senha123@localhost:5432/biblia_almeida?schema=public"
```

### 1.2 Criar o banco de dados

Conecte-se ao PostgreSQL e crie o banco:

```sql
CREATE DATABASE biblia_almeida;
```

Ou via linha de comando:
```bash
createdb -U postgres biblia_almeida
```

## 🗄️ Passo 2: Executar as Migrações do Prisma

As migrações criam as tabelas necessárias no banco de dados.

```bash
cd nextjs_space
npx prisma migrate dev --name init
```

Isso irá:
- Criar as tabelas: `users`, `books`, `chapters`, `verses`, `favorites`, `notes`, `reading_plans`, `reading_progress`
- Criar as relações entre as tabelas
- Gerar o Prisma Client atualizado

## 📚 Passo 3: Popular o Banco com o Conteúdo da Bíblia

O projeto já possui um script de seed que popula o banco automaticamente com:
- ✅ Todos os 66 livros da Bíblia
- ✅ Todos os capítulos e versículos
- ✅ Um usuário administrador padrão
- ✅ Planos de leitura pré-configurados

### 3.1 Executar o Seed

```bash
cd nextjs_space
npm run prisma:seed
```

Ou diretamente:
```bash
npx tsx --require dotenv/config scripts/seed.ts
```

### 3.2 O que o seed faz:

1. **Cria usuário administrador:**
   - Email: `john@doe.com`
   - Senha: `johndoe123`

2. **Importa conteúdo bíblico:**
   - Lê o arquivo `data/biblia_almeida_completa.json`
   - Cria todos os livros, capítulos e versículos
   - Processa aproximadamente 31.000+ versículos

3. **Cria planos de leitura:**
   - Bíblia em 1 Ano
   - Novo Testamento em 30 Dias
   - Salmos em 30 Dias
   - Provérbios em 31 Dias

### 3.3 Tempo estimado

O processo de seed pode levar alguns minutos devido ao grande volume de dados (66 livros, ~1.189 capítulos, ~31.000 versículos).

## ✅ Passo 4: Verificar se Funcionou

### 4.1 Verificar no banco de dados

```bash
# Conectar ao PostgreSQL
psql -U postgres -d biblia_almeida

# Contar livros
SELECT COUNT(*) FROM books;

# Contar versículos
SELECT COUNT(*) FROM verses;

# Ver alguns livros
SELECT name, testament, order FROM books ORDER BY "order" LIMIT 10;
```

### 4.2 Testar na aplicação

1. Acesse: `http://localhost:3010/leitura`
2. Você deve ver todos os 66 livros listados
3. Clique em um livro (ex: Gênesis)
4. Você deve ver todos os capítulos do livro
5. Clique em um capítulo para ver os versículos

## 🔄 Reexecutar o Seed

Se precisar reexecutar o seed (por exemplo, após limpar o banco):

```bash
# Limpar o banco (CUIDADO: apaga todos os dados!)
npx prisma migrate reset

# Ou manualmente no PostgreSQL:
# DROP DATABASE biblia_almeida;
# CREATE DATABASE biblia_almeida;

# Depois executar novamente:
npx prisma migrate dev
npm run prisma:seed
```

## 📁 Estrutura dos Dados

### Arquivo JSON
O conteúdo da Bíblia está em:
- `nextjs_space/data/biblia_almeida_completa.json` (6.5 MB)

### Estrutura no Banco
```
books (66 livros)
  └── chapters (~1.189 capítulos)
      └── verses (~31.000 versículos)
```

### Relacionamentos
- `User` → `Favorite` → `Verse`
- `User` → `Note` → `Verse`
- `User` → `ReadingProgress` → `ReadingPlan`

## 🚨 Solução de Problemas

### Erro: "DATABASE_URL is not set"
- Verifique se o arquivo `.env` existe na pasta `nextjs_space`
- Verifique se a variável `DATABASE_URL` está correta

### Erro: "Connection refused"
- Verifique se o PostgreSQL está rodando
- Verifique se a porta está correta (padrão: 5432)
- Verifique usuário e senha

### Erro: "Database does not exist"
- Crie o banco de dados manualmente
- Ou use: `createdb -U postgres biblia_almeida`

### Seed muito lento
- Normal! O processo pode levar 5-15 minutos
- O arquivo JSON tem 6.5 MB de dados
- São ~31.000 versículos sendo inseridos

### Quero usar SQLite ao invés de PostgreSQL
1. Altere `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```
2. Execute: `npx prisma migrate dev`
3. Execute: `npm run prisma:seed`

## 📝 Notas Importantes

1. **Modo Fallback**: Se o banco não estiver configurado, a aplicação usa os dados do arquivo JSON automaticamente
2. **Performance**: Com banco de dados, a busca e navegação são mais rápidas
3. **Backup**: Faça backup regular do banco de dados
4. **Produção**: Use variáveis de ambiente seguras em produção

## 🎯 Próximos Passos

Após configurar:
1. ✅ Teste a leitura dos livros
2. ✅ Teste a busca de versículos
3. ✅ Crie uma conta e teste favoritos
4. ✅ Teste os planos de leitura

---

**Dúvidas?** Verifique os logs do seed ou consulte a documentação do Prisma: https://www.prisma.io/docs

