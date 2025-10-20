# Documentação Técnica - Bíblia Digital

## 📋 Visão Geral

A **Bíblia Digital** é uma aplicação web moderna construída com Quasar Framework e Vue.js 3, projetada para proporcionar uma experiência de leitura da Bíblia intuitiva e responsiva.

## 🏗️ Arquitetura

### Stack Tecnológica
- **Frontend**: Vue.js 3 (Composition API)
- **Framework**: Quasar Framework 2.x
- **Build Tool**: Vite
- **Estilização**: SCSS + Material Design
- **Roteamento**: Vue Router 4
- **Linting**: ESLint + Prettier

### Estrutura de Pastas
```
src/
├── components/          # Componentes reutilizáveis
│   ├── ChapterNavigation.vue
│   └── DailyVerse.vue
├── config/             # Configurações da aplicação
│   └── appConfig.js
├── css/                # Estilos globais
│   ├── app.scss
│   └── quasar.variables.scss
├── layouts/            # Layouts da aplicação
│   └── MainLayout.vue
├── pages/              # Páginas da aplicação
│   ├── IndexPage.vue
│   └── BookPage.vue
├── router/             # Configuração de rotas
│   ├── index.js
│   └── routes.js
├── utils/              # Utilitários e dados
│   └── bibleData.js
└── App.vue            # Componente raiz
```

## 🔧 Componentes Principais

### MainLayout.vue
- **Função**: Layout principal da aplicação
- **Recursos**: 
  - Navegação lateral com lista de livros
  - Cabeçalho com título e busca
  - Dialog de busca integrado
- **Estado**: Gerencia drawer, busca e seleção de livros

### IndexPage.vue
- **Função**: Página inicial da aplicação
- **Recursos**:
  - Hero section com call-to-action
  - Cards de recursos da aplicação
  - Acesso rápido a livros populares
  - Versículo do dia
- **Componentes**: DailyVerse

### BookPage.vue
- **Função**: Exibição de livros e capítulos
- **Recursos**:
  - Lista de capítulos em grid
  - Dialog para leitura de versículos
  - Navegação entre capítulos
- **Componentes**: ChapterNavigation

### ChapterNavigation.vue
- **Função**: Navegação entre capítulos
- **Recursos**:
  - Botões anterior/próximo
  - Informações do capítulo atual
  - Design responsivo

### DailyVerse.vue
- **Função**: Exibição do versículo do dia
- **Recursos**:
  - Seleção automática baseada no dia
  - Compartilhamento de versículos
  - Sistema de marcadores (preparado)

## 📊 Dados e Estado

### bibleData.js
Centraliza todos os dados relacionados à Bíblia:
- **BIBLE_BOOKS**: Array com todos os 66 livros
- **DAILY_VERSES**: Versículos para o versículo do dia
- **Funções utilitárias**: Busca, geração de capítulos, etc.

### appConfig.js
Configurações centralizadas da aplicação:
- Informações da aplicação
- Configurações de tema e fonte
- Configurações de leitura
- Configurações de cache e API

## 🎨 Design System

### Cores
- **Primária**: #8B4513 (Marrom dourado)
- **Secundária**: #DAA520 (Dourado)
- **Acento**: #CD853F (Peru)
- **Modo Escuro**: Tons de marrom escuro

### Tipografia
- **Fonte Principal**: Georgia, Times New Roman, serif
- **Tamanhos**: Responsivos (12px - 24px)
- **Hierarquia**: H1-H6 com pesos apropriados

### Componentes
- **Cards**: Bordas suaves, sombras sutis
- **Botões**: Material Design com estados hover
- **Dialogs**: Maximizados para leitura
- **Navegação**: Intuitiva e acessível

## 🚀 Funcionalidades Implementadas

### ✅ Concluído
1. **Estrutura Base**
   - Projeto Quasar configurado
   - Roteamento funcional
   - Layout responsivo

2. **Navegação**
   - Menu lateral com todos os livros
   - Navegação entre capítulos
   - URLs amigáveis

3. **Leitura**
   - Exibição de versículos
   - Interface de leitura otimizada
   - Navegação fluida

4. **Design**
   - Tema personalizado
   - Modo escuro preparado
   - Responsividade completa

5. **Componentes**
   - Componentes modulares
   - Reutilização de código
   - Manutenibilidade

### 🔄 Em Desenvolvimento
1. **Busca Funcional**
   - Integração com API de textos
   - Busca por palavras-chave
   - Resultados destacados

2. **Funcionalidades Avançadas**
   - Sistema de marcadores
   - Histórico de leitura
   - Configurações personalizadas

## 🔌 Integrações Futuras

### API de Textos Bíblicos
```javascript
// Exemplo de integração futura
const API_ENDPOINTS = {
  verses: '/api/verses',
  search: '/api/search',
  translations: '/api/translations'
}
```

### Armazenamento Local
```javascript
// Sistema de marcadores e favoritos
const STORAGE_KEYS = {
  bookmarks: 'bible_bookmarks',
  history: 'reading_history',
  settings: 'user_settings'
}
```

## 🧪 Testes

### Estrutura de Testes (Futuro)
```
tests/
├── unit/              # Testes unitários
├── integration/       # Testes de integração
├── e2e/              # Testes end-to-end
└── fixtures/         # Dados de teste
```

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 600px
- **Tablet**: 600px - 1024px
- **Desktop**: > 1024px

### Adaptações
- Grid responsivo para capítulos
- Navegação otimizada para touch
- Tipografia escalável
- Componentes adaptativos

## 🔒 Segurança

### Considerações
- Validação de entrada
- Sanitização de dados
- HTTPS obrigatório em produção
- Headers de segurança

## 📈 Performance

### Otimizações Implementadas
- Lazy loading de componentes
- Compressão de assets
- Cache de dados
- Imagens otimizadas

### Métricas Alvo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🚀 Deploy

### Comandos de Build
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build

# Preview
npm run preview
```

### Configurações de Deploy
- **Static Hosting**: Netlify, Vercel
- **CDN**: CloudFlare
- **SSL**: Automático

## 🤝 Contribuição

### Padrões de Código
- ESLint + Prettier configurados
- Convenções Vue.js 3
- Documentação JSDoc
- Commits semânticos

### Processo de Desenvolvimento
1. Fork do repositório
2. Branch para feature
3. Desenvolvimento com testes
4. Pull request com documentação

---

**Última atualização**: Dezembro 2024  
**Versão**: 1.0.0  
**Mantenedor**: Equipe de Desenvolvimento
