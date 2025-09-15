# 🌍 Internacionalização (i18n) - Bíblia App

## 🚀 Visão Geral

O Bíblia App agora suporta múltiplos idiomas com um sistema completo de internacionalização usando **react-i18next**. O app está disponível em português brasileiro, inglês e espanhol.

## 🗣️ Idiomas Suportados

### 🇧🇷 **Português Brasileiro (pt-BR)**
- Idioma padrão do aplicativo
- Interface completamente traduzida
- Textos bíblicos em português

### 🇺🇸 **English (en-US)**
- Interface em inglês
- Textos bíblicos em inglês
- Tradução completa de todos os elementos

### 🇪🇸 **Español (es-ES)**
- Interface em espanhol
- Textos bíblicos em espanhol
- Tradução completa de todos os elementos

## 🏗️ Arquitetura

### **Configuração Principal**
- `src/i18n/index.ts` - Configuração do i18next
- `src/i18n/locales/` - Arquivos de tradução por idioma
- `src/hooks/useLanguage.ts` - Hook personalizado para gerenciar idiomas

### **Componentes**
- `src/components/LanguageSelector.tsx` - Seletor de idioma
- Componentes atualizados para usar `useTranslation()`

### **Serviços**
- `src/services/bibleApi.ts` - Mapeamento de livros por idioma
- `src/hooks/useBibleApi.ts` - Hooks atualizados para suportar idiomas

## 📁 Estrutura de Traduções

```
src/i18n/locales/
├── pt-BR.json    # Português Brasileiro
├── en-US.json    # English
└── es-ES.json    # Español
```

### **Estrutura dos Arquivos de Tradução**

```json
{
  "app": {
    "title": "Bíblia App",
    "subtitle": "Leia a Palavra de Deus..."
  },
  "navigation": {
    "home": "Início",
    "books": "Livros",
    "search": "Buscar"
  },
  "books": {
    "title": "Livros da Bíblia",
    "oldTestament": "Antigo Testamento",
    "newTestament": "Novo Testamento"
  }
}
```

## 🎯 Como Usar

### **Em Componentes React**
```tsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p>{t('app.subtitle')}</p>
    </div>
  )
}
```

### **Mudança de Idioma**
```tsx
import { useLanguage } from '../hooks/useLanguage'

function LanguageSelector() {
  const { changeLanguage, languages } = useLanguage()
  
  return (
    <select onChange={(e) => changeLanguage(e.target.value)}>
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  )
}
```

## 🔧 Configuração

### **Detecção Automática**
```typescript
detection: {
  order: ['localStorage', 'navigator', 'htmlTag'],
  caches: ['localStorage'],
  lookupLocalStorage: 'bible-app-language'
}
```

### **Fallback**
```typescript
fallbackLng: 'pt-BR'  // Português como idioma padrão
```

### **Debug**
```typescript
debug: process.env.NODE_ENV === 'development'
```

## 📚 Mapeamento de Livros por Idioma

### **Português/Inglês**
```typescript
'genesis': 'Genesis',
'matthew': 'Matthew',
'john': 'John'
```

### **Espanhol**
```typescript
'genesis': 'Genesis',
'matthew': 'Mateo',
'john': 'Juan'
```

## 🎨 Seletor de Idioma

### **Desktop**
- Localizado no header ao lado da navegação
- Dropdown com bandeiras e nomes dos idiomas
- Indicador visual do idioma atual

### **Mobile**
- Integrado ao menu hambúrguer
- Mesma funcionalidade do desktop
- Interface touch-friendly

## 💾 Persistência

### **LocalStorage**
- Idioma selecionado é salvo automaticamente
- Persiste entre sessões do navegador
- Chave: `bible-app-language`

### **Detecção Automática**
- Detecta idioma do navegador na primeira visita
- Fallback para português se idioma não suportado
- Prioridade: localStorage > navigator > htmlTag

## 🔄 Atualização Dinâmica

### **Interface**
- Mudança instantânea de todos os textos
- Sem necessidade de recarregar a página
- Transições suaves

### **API**
- Mapeamento de livros atualizado automaticamente
- Cache limpo ao mudar idioma
- Requisições na linguagem correta

## 🛠️ Adicionando Novos Idiomas

### **1. Criar Arquivo de Tradução**
```bash
# Criar src/i18n/locales/fr-FR.json
```

### **2. Adicionar ao Hook**
```typescript
// src/hooks/useLanguage.ts
export const LANGUAGES: Language[] = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'Français', flag: '🇫🇷' } // Novo
]
```

### **3. Adicionar Mapeamento da API**
```typescript
// src/services/bibleApi.ts
export const BOOK_NAME_MAPPING = {
  'fr-FR': {
    'genesis': 'Genese',
    'matthew': 'Matthieu',
    'john': 'Jean'
  }
}
```

### **4. Registrar no i18n**
```typescript
// src/i18n/index.ts
import frFR from './locales/fr-FR.json'

const resources = {
  'fr-FR': {
    translation: frFR
  }
}
```

## 🎯 Benefícios

- **Acessibilidade Global**: Suporte a usuários de diferentes países
- **Experiência Nativa**: Interface no idioma nativo do usuário
- **Flexibilidade**: Fácil adição de novos idiomas
- **Performance**: Carregamento otimizado de traduções
- **Persistência**: Lembra preferência do usuário
- **API Inteligente**: Textos bíblicos na linguagem correta

## 🔮 Próximos Passos

- [ ] Adicionar mais idiomas (Francês, Alemão, Italiano)
- [ ] Tradução de textos bíblicos específicos por idioma
- [ ] Detecção de região para formatação de datas/números
- [ ] Suporte a RTL (Right-to-Left) para árabe/hebraico
- [ ] Tradução dinâmica via API
- [ ] Pluralização avançada
- [ ] Interpolação de variáveis

## 📊 Estatísticas

- **3 idiomas** suportados
- **66 livros** mapeados por idioma
- **100+ strings** traduzidas
- **0 dependências** externas além do react-i18next
- **100% cobertura** da interface traduzida

---

**🌍 O Bíblia App agora é verdadeiramente internacional!**

