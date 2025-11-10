# 📖 Bíblia Sagrada Almeida - Aplicativo de Leitura Bíblica

Uma aplicação moderna e completa para leitura da Bíblia Sagrada versão Almeida, desenvolvida com Next.js 14, TypeScript e Tailwind CSS.

## ✨ Funcionalidades

- 📚 **Leitura Completa**: Acesse todos os 66 livros da Bíblia Sagrada versão Almeida
- 🔍 **Busca Inteligente**: Busque versículos por palavras-chave em toda a Bíblia
- 📖 **Navegação Intuitiva**: Interface moderna e fácil de usar
- 📱 **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🌓 **Tema Claro/Escuro**: Suporte a modo claro e escuro
- ⚡ **Modo JSON**: Funciona sem banco de dados usando arquivos JSON
- 🗄️ **Suporte a Banco de Dados**: Opcionalmente use PostgreSQL para funcionalidades avançadas
- ❤️ **Favoritos**: Marque versículos favoritos (requer banco de dados)
- 📝 **Anotações**: Adicione anotações pessoais aos versículos (requer banco de dados)
- 📅 **Planos de Leitura**: Acompanhe planos de leitura estruturados (requer banco de dados)

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização moderna
- **Prisma** - ORM para banco de dados (opcional)
- **NextAuth.js** - Autenticação (opcional)
- **Lucide React** - Ícones modernos
- **shadcn/ui** - Componentes UI

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/marcos-gabriel-lima/mybiblie.git
cd mybiblie/nextjs_space
```

2. Instale as dependências:
```bash
npm install --legacy-peer-deps
```

3. Execute o projeto:
```bash
npm run dev
```

4. Acesse no navegador: `http://localhost:3010`

## 🎯 Modo de Uso

### Modo JSON (Sem Banco de Dados) - Padrão

A aplicação funciona **imediatamente** sem configuração adicional usando arquivos JSON:

- ✅ Listagem de livros
- ✅ Navegação por capítulos
- ✅ Leitura de versículos
- ✅ Busca de versículos

**Nenhuma configuração necessária!** Apenas execute `npm run dev`.

### Modo com Banco de Dados (Opcional)

Para funcionalidades avançadas (login, favoritos, anotações):

1. Configure PostgreSQL
2. Crie arquivo `.env` na pasta `nextjs_space`:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/biblia_almeida?schema=public"
NEXTAUTH_URL="http://localhost:3010"
NEXTAUTH_SECRET="seu-secret-aqui"
```

3. Execute as migrações:
```bash
npx prisma migrate dev
```

4. Popule o banco:
```bash
npm run prisma:seed
```

Veja `nextjs_space/CONFIGURACAO_BIBLIA.md` para instruções detalhadas.

## 📁 Estrutura do Projeto

```
biblia_almeida/
├── nextjs_space/          # Aplicação Next.js
│   ├── app/              # Páginas e rotas
│   ├── components/       # Componentes React
│   ├── data/             # Arquivos JSON com conteúdo bíblico
│   ├── lib/              # Utilitários e configurações
│   ├── prisma/           # Schema do Prisma
│   └── scripts/          # Scripts de seed
├── biblia_almeida_completa.json  # Conteúdo completo da Bíblia
└── livros_info.json      # Informações dos livros
```

## 📖 Conteúdo da Bíblia

O projeto inclui:
- **66 livros** da Bíblia Sagrada
- **~1.189 capítulos**
- **~31.000 versículos**
- Versão **Almeida Corrigida Fiel (ACF)**

Arquivos de dados:
- `nextjs_space/data/biblia_almeida_completa.json` (6.5 MB)
- `nextjs_space/data/livros_info.json`

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento na porta 3010
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa o linter
npm run prisma:seed  # Popula banco de dados (requer .env)
```

## 📱 Responsividade

O aplicativo é totalmente responsivo:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (até 767px)

## 🌐 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório GitHub à Vercel
2. Configure variáveis de ambiente (se usar banco)
3. Deploy automático a cada push

### Outros Provedores

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- AWS
- DigitalOcean

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Desenvolvedor

**Marco Gabriel Lima**

- GitHub: [@marcos-gabriel-lima](https://github.com/marcos-gabriel-lima)
- Repositório: [mybiblie](https://github.com/marcos-gabriel-lima/mybiblie)

## 🙏 Agradecimentos

- Bíblia Sagrada versão Almeida
- Next.js - Framework React
- Tailwind CSS - Framework CSS
- shadcn/ui - Componentes UI
- Prisma - ORM moderno

## 📚 Documentação Adicional

- `nextjs_space/MODO_JSON.md` - Guia do modo JSON
- `nextjs_space/CONFIGURACAO_BIBLIA.md` - Guia de configuração do banco
- `nextjs_space/configurar-biblia.md` - Configuração rápida

---

⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!

