# 📖 Modo JSON - Sem Banco de Dados

A aplicação está configurada para funcionar **100% com arquivos JSON**, sem necessidade de banco de dados!

## ✅ O que está funcionando

### Funcionalidades disponíveis:
- ✅ **Listagem de livros** - Todos os 66 livros da Bíblia
- ✅ **Navegação por capítulos** - Acesse qualquer capítulo de qualquer livro
- ✅ **Leitura de versículos** - Veja todos os versículos de cada capítulo
- ✅ **Busca de versículos** - Busque por palavras-chave em toda a Bíblia
- ✅ **Interface completa** - Todas as páginas funcionam normalmente

### O que NÃO funciona (requer banco de dados):
- ❌ Login/Cadastro de usuários
- ❌ Favoritos pessoais
- ❌ Anotações pessoais
- ❌ Planos de leitura com progresso
- ❌ Dashboard do usuário

## 📁 Arquivos de dados

O conteúdo da Bíblia está em:
- `data/biblia_almeida_completa.json` - Conteúdo completo (6.5 MB)
  - 66 livros
  - ~1.189 capítulos
  - ~31.000 versículos

- `data/livros_info.json` - Informações dos livros
  - Nome, testamento, número de capítulos

## 🔧 Como funciona

A aplicação usa um sistema de **fallback inteligente**:

1. **Tenta buscar no banco de dados** (se configurado)
2. **Se não encontrar ou banco não disponível** → usa o JSON automaticamente
3. **Nenhuma configuração necessária!**

## 🚀 Como usar

### 1. Iniciar o servidor
```bash
cd nextjs_space
npm run dev
```

### 2. Acessar a aplicação
- **Home**: http://localhost:3010
- **Leitura**: http://localhost:3010/leitura
- **Busca**: http://localhost:3010/busca

### 3. Navegar pelos livros
- Clique em qualquer livro na página `/leitura`
- Exemplo: http://localhost:3010/leitura/book-1 (Gênesis)
- Clique em qualquer capítulo para ver os versículos

### 4. Buscar versículos
- Acesse `/busca`
- Digite uma palavra ou frase
- Veja todos os versículos que contêm o termo

## 📊 Performance

- **Carregamento inicial**: Rápido (JSON é carregado uma vez)
- **Navegação**: Instantânea
- **Busca**: Pode levar alguns segundos (busca em ~31.000 versículos)

## 🔄 Migrar para banco de dados depois

Se quiser adicionar banco de dados no futuro:
1. Configure o PostgreSQL
2. Crie o arquivo `.env` com `DATABASE_URL`
3. Execute: `npx prisma migrate dev`
4. Execute: `npm run prisma:seed`

A aplicação continuará funcionando normalmente, mas agora com:
- Busca mais rápida
- Funcionalidades de usuário
- Favoritos e anotações

## ⚠️ Notas importantes

1. **Sem arquivo .env necessário** - A aplicação funciona sem configuração
2. **Prisma Client** - É gerado mas não é usado se não houver banco
3. **Logs** - Você verá avisos sobre DATABASE_URL não configurado (normal)
4. **Performance** - JSON funciona bem para leitura, mas busca pode ser mais lenta

## 🎯 Exemplos de uso

### Ver Gênesis capítulo 1
```
http://localhost:3010/leitura/book-1
```
Depois clique no capítulo 1

### Ver João capítulo 3
```
http://localhost:3010/leitura/book-43
```
Depois clique no capítulo 3

### Buscar "amor"
```
http://localhost:3010/busca?q=amor
```

---

**Tudo funcionando sem banco de dados!** 🎉

