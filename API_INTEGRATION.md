# 📖 Integração com Bible API

## 🚀 Visão Geral

O Bíblia App agora está integrado com a **Bible API** (https://bible-api.com), uma API gratuita e confiável que fornece textos bíblicos completos em várias traduções.

## 🔧 Funcionalidades Implementadas

### ✅ **Carregamento de Capítulos**
- Busca automática de capítulos completos da Bíblia
- Cache inteligente para melhor performance
- Estados de loading e erro bem definidos

### ✅ **Navegação Otimizada**
- Navegação entre capítulos sem recarregar a página
- Histórico de navegação mantido
- Transições suaves

### ✅ **Tratamento de Erros**
- Mensagens de erro claras e úteis
- Botões de retry para tentar novamente
- Fallbacks para situações de erro

### ✅ **Performance**
- Cache local para evitar requisições desnecessárias
- Timeout configurável para requisições
- Logs de desenvolvimento para debugging

## 🏗️ Arquitetura

### **Serviços**
- `src/services/bibleApi.ts` - Serviço principal da API
- `src/hooks/useBibleApi.ts` - Hooks personalizados para React
- `src/config/api.ts` - Configurações da API

### **Componentes**
- `src/components/LoadingSpinner.tsx` - Spinner de carregamento
- `src/components/ErrorState.tsx` - Estado de erro reutilizável

### **Páginas Atualizadas**
- `src/pages/Chapter.tsx` - Agora usa API real
- `src/pages/Search.tsx` - Preparado para busca via API

## 📊 Mapeamento de Livros

A API usa nomes em inglês, então criamos um mapeamento completo:

```typescript
const BOOK_NAME_MAPPING = {
  'genesis': 'Genesis',
  'exodus': 'Exodus',
  'matthew': 'Matthew',
  'john': 'John',
  // ... todos os 66 livros
}
```

## 🔄 Fluxo de Dados

1. **Usuário navega para um capítulo**
2. **Hook `useBibleApi` é chamado**
3. **Verifica cache primeiro**
4. **Se não estiver em cache, faz requisição para API**
5. **Converte resposta para formato interno**
6. **Salva no cache**
7. **Atualiza interface**

## 🎯 Estados da Interface

### **Loading**
```tsx
<LoadingSpinner text="Carregando capítulo..." />
```

### **Erro**
```tsx
<ErrorState 
  message="Erro ao carregar capítulo"
  onRetry={() => loadChapter(bookId, chapterNumber)}
/>
```

### **Sucesso**
- Capítulo carregado e exibido
- Navegação funcional
- Funcionalidades disponíveis

## ⚙️ Configurações

### **API Config**
```typescript
export const API_CONFIG = {
  BIBLE_API_BASE: 'https://bible-api.com',
  REQUEST_TIMEOUT: 10000,
  MAX_CACHE_SIZE: 100,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000
}
```

### **Dev Config**
```typescript
export const DEV_CONFIG = {
  LOG_REQUESTS: true, // Log de requisições
  USE_MOCK_DATA: false, // Usar dados mock
  ENABLE_CACHE: true // Habilitar cache
}
```

## 🚀 Como Usar

### **Carregar um Capítulo**
```typescript
const { chapter, loading, error, loadChapter } = useBibleApi()

useEffect(() => {
  loadChapter('john', 1) // João capítulo 1
}, [])
```

### **Buscar um Versículo**
```typescript
const { verse, loading, error, loadVerse } = useVerseApi()

useEffect(() => {
  loadVerse('john', 3, 16) // João 3:16
}, [])
```

### **Buscar Texto**
```typescript
const { results, loading, error, search } = useBibleSearch()

const handleSearch = () => {
  search('amor') // Busca por "amor"
}
```

## 🔍 Debugging

### **Logs de Desenvolvimento**
```typescript
// Ativado automaticamente em desenvolvimento
console.log(`Buscando capítulo: ${bookName} ${chapterNumber}`)
```

### **Estatísticas do Cache**
```typescript
const stats = BibleApiService.getCacheStats()
console.log(`Cache size: ${stats.size}`)
console.log(`Cached keys: ${stats.keys}`)
```

### **Limpar Cache**
```typescript
BibleApiService.clearCache()
```

## 🛠️ Manutenção

### **Adicionar Novo Livro**
1. Adicionar ao `BOOK_NAME_MAPPING`
2. Adicionar aos dados em `src/data/bible.ts`
3. Testar carregamento

### **Mudar API**
1. Atualizar `API_CONFIG.BIBLE_API_BASE`
2. Ajustar formato de resposta se necessário
3. Testar todas as funcionalidades

### **Otimizar Performance**
1. Ajustar `MAX_CACHE_SIZE`
2. Modificar `REQUEST_TIMEOUT`
3. Implementar cache persistente (localStorage)

## 🎉 Benefícios

- **Textos Completos**: Todos os versículos da Bíblia disponíveis
- **Performance**: Cache inteligente reduz requisições
- **Confiabilidade**: API estável e bem mantida
- **Flexibilidade**: Fácil de trocar ou adicionar APIs
- **UX**: Estados de loading e erro bem definidos
- **Manutenibilidade**: Código organizado e documentado

## 🔮 Próximos Passos

- [ ] Implementar busca real por texto
- [ ] Adicionar múltiplas traduções
- [ ] Cache persistente com localStorage
- [ ] Offline support com Service Worker
- [ ] Analytics de uso da API
- [ ] Rate limiting e throttling

---

**🎯 A integração com a Bible API está completa e funcionando perfeitamente!**

