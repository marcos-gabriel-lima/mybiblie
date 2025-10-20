# 📖 Bíblia Digital

Uma aplicação web moderna e responsiva para leitura e estudo da Bíblia Sagrada, desenvolvida com Vue.js 3 e Quasar Framework.

## 🚀 Características Principais

- **Interface Moderna**: Design limpo e intuitivo com Material Design
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Navegação Intuitiva**: Acesso fácil a todos os 66 livros da Bíblia
- **Busca Inteligente**: Encontre livros rapidamente com filtros por testamento
- **Versículo do Dia**: Inspiração diária com versículos selecionados
- **Modo Escuro**: Leitura confortável em qualquer ambiente
- **Acesso Rápido**: Links diretos para livros populares como Salmos, João, Provérbios e Romanos

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Vue.js 3** - Framework JavaScript reativo
- **Quasar Framework** - Framework Vue.js para aplicações multiplataforma
- **Vue Router 4** - Roteamento para aplicações Vue.js
- **Material Icons** - Ícones consistentes e modernos

### Desenvolvimento
- **Vite** - Build tool rápido e moderno
- **ESLint** - Linter para qualidade de código
- **Prettier** - Formatador de código
- **PostCSS** - Processador CSS
- **Autoprefixer** - Prefixos CSS automáticos

### APIs Externas
- **Bible API** - API para conteúdo bíblico (https://bible-api.com)

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ChapterNavigation.vue
│   ├── DailyVerse.vue
│   └── EssentialLink.vue
├── config/              # Configurações da aplicação
│   └── appConfig.js
├── css/                 # Estilos globais
│   ├── app.scss
│   └── quasar.variables.scss
├── layouts/             # Layouts da aplicação
│   └── MainLayout.vue
├── pages/               # Páginas da aplicação
│   ├── BiblePage.vue
│   ├── BookmarksPage.vue
│   ├── BookPage.vue
│   ├── ErrorNotFound.vue
│   ├── FavoritesPage.vue
│   ├── IndexPage.vue
│   └── SettingsPage.vue
├── router/              # Configuração de rotas
│   ├── index.js
│   └── routes.js
├── services/            # Serviços e APIs
│   └── bibleApi.js
├── utils/               # Utilitários e dados
│   └── bibleData.js
└── App.vue              # Componente raiz
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (versão 20 ou superior)
- npm (versão 6.13.4 ou superior) ou yarn (versão 1.21.1 ou superior)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd biblia-app
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute em modo de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse a aplicação**
   - Abra seu navegador em `http://localhost:9000`

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção

# Linting e Formatação
npm run lint         # Executa ESLint
npm run format       # Formata código com Prettier

# Pós-instalação
npm run postinstall  # Prepara ambiente Quasar
```

## 📱 Funcionalidades

### 🏠 Página Inicial
- Apresentação da aplicação
- Recursos principais destacados
- Acesso rápido a livros populares
- Versículo do dia inspirador

### 📚 Biblioteca Bíblica
- Lista completa dos 66 livros da Bíblia
- Separação por Antigo e Novo Testamento
- Informações detalhadas de cada livro (número de capítulos, abreviação)
- Filtros por testamento e busca por nome

### 🔍 Busca e Navegação
- Busca inteligente por nome do livro
- Filtros por testamento (Antigo/Novo)
- Navegação intuitiva entre livros e capítulos
- Interface responsiva para todos os dispositivos

### ⚙️ Configurações
- Modo escuro/claro
- Ajustes de fonte
- Configurações de leitura
- Preferências do usuário

## 🎨 Design e UX

### Paleta de Cores
- **Primária**: `#8B4513` (Marrom bíblico)
- **Secundária**: `#DAA520` (Dourado)
- **Suporte**: Tons de cinza para texto e fundos

### Tipografia
- **Fonte Principal**: Georgia, Times New Roman, serif
- **Tamanhos**: 12px - 24px (configurável)
- **Hierarquia**: Títulos, subtítulos e texto corrido bem definidos

### Componentes
- Cards interativos com hover effects
- Botões com estados visuais claros
- Ícones Material Design consistentes
- Layout responsivo com grid system

## 🔧 Configuração

### Configurações da Aplicação (`src/config/appConfig.js`)

```javascript
export const APP_CONFIG = {
  name: 'Bíblia Digital',
  version: '1.0.0',
  theme: {
    default: 'light',
    enableDarkMode: true,
    primaryColor: '#8B4513',
    secondaryColor: '#DAA520'
  },
  font: {
    defaultSize: 16,
    family: 'Georgia, Times New Roman, serif'
  },
  reading: {
    defaultTranslation: 'almeida',
    enableNotes: true,
    enableBookmarks: true
  }
}
```

### Configuração do Quasar (`quasar.config.js`)
- Build target: ES2022, Chrome 115+, Firefox 115+, Safari 14+
- Router mode: Hash (compatível com hospedagem estática)
- Plugins: ESLint integrado
- Suporte a PWA, Electron e Cordova

## 📊 Dados da Bíblia

### Estrutura dos Livros (`src/utils/bibleData.js`)
- **66 livros** completos (39 Antigo + 27 Novo Testamento)
- **Metadados** de cada livro:
  - Nome completo e abreviação
  - Número de capítulos
  - Ícone representativo
  - Classificação por testamento

### API Integration (`src/services/bibleApi.js`)
- Integração com Bible API (https://bible-api.com)
- Funções para buscar versículos, capítulos e livros
- Mapeamento de nomes em português para formato da API
- Tratamento de erros e fallbacks

## 🚀 Deploy

### Build de Produção
```bash
npm run build
```

### Hospedagem Estática
A aplicação gera arquivos estáticos que podem ser hospedados em:
- **Netlify**
- **Vercel**
- **GitHub Pages**
- **Firebase Hosting**
- **AWS S3 + CloudFront**

### Variáveis de Ambiente
```bash
# .env.production
NODE_ENV=production
VITE_API_BASE_URL=https://bible-api.com
```

## 🤝 Contribuição

### Padrões de Código
- **ESLint**: Configuração Vue.js + Prettier
- **Prettier**: Formatação automática
- **Conventional Commits**: Padrão de commits
- **Componentes**: PascalCase para nomes
- **Arquivos**: kebab-case para nomes

### Estrutura de Commits
```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: ajustes de formatação
refactor: refatoração de código
test: adiciona testes
```

### Processo de Contribuição
1. Fork do repositório
2. Criação de branch para feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit das mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para branch (`git push origin feature/nova-funcionalidade`)
5. Abertura de Pull Request

## 📝 Roadmap

### Versão 1.1.0
- [ ] Sistema de favoritos persistente
- [ ] Notas pessoais nos versículos
- [ ] Histórico de leitura
- [ ] Compartilhamento de versículos

### Versão 1.2.0
- [ ] Múltiplas traduções bíblicas
- [ ] Busca por texto nos versículos
- [ ] Planos de leitura
- [ ] Modo offline (PWA)

### Versão 2.0.0
- [ ] Sistema de usuários
- [ ] Sincronização entre dispositivos
- [ ] Estudos bíblicos interativos
- [ ] API própria

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Marcos Gabriel**
- Email: marcosgabriellimacosta@gmail.com
- GitHub: [@marcosgabriel](https://github.com/marcosgabriel)

## 🙏 Agradecimentos

- **Bible API** - Fornecimento do conteúdo bíblico
- **Quasar Framework** - Framework Vue.js multiplataforma
- **Material Design** - Sistema de design do Google
- **Comunidade Vue.js** - Suporte e recursos

---

**Versão**: 1.0.0  
**Última atualização**: Dezembro 2024  
**Status**: Em desenvolvimento ativo