# 🚀 Guia de Deploy e Funcionalidades Offline - Bíblia App

## 📦 Preparação para Deploy

### 1. Build de Produção
```bash
# Instalar dependências
npm install

# Gerar build de produção
npm run build

# Verificar se o build foi gerado corretamente
ls -la dist/
```

### 2. Configurações de Produção

#### Variáveis de Ambiente
Crie um arquivo `.env.production`:
```env
VITE_APP_TITLE=Bíblia App
VITE_APP_DESCRIPTION=Leia a Bíblia Sagrada online e offline
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=https://bible-api.com
```

#### Otimizações do Vite
O `vite.config.ts` já está configurado com:
- ✅ Code splitting por rotas
- ✅ Minificação automática
- ✅ Tree shaking
- ✅ Source maps para debug

## 🌐 Deploy Online

### Opção 1: Vercel (Recomendado)

1. **Instalar Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel login
vercel --prod
```

3. **Configurações automáticas:**
- ✅ Detecção automática do Vite
- ✅ Build otimizado
- ✅ HTTPS automático
- ✅ CDN global

### Opção 2: Netlify

1. **Instalar Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Deploy:**
```bash
npm run build
netlify deploy --prod --dir=dist
```

3. **Configurações:**
- ✅ Build command: `npm run build`
- ✅ Publish directory: `dist`
- ✅ Redirects para SPA

### Opção 3: GitHub Pages

1. **Instalar gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Adicionar scripts ao package.json:**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://seu-usuario.github.io/biblia-app"
}
```

3. **Deploy:**
```bash
npm run deploy
```

## 📱 Funcionalidades PWA e Offline

### 1. Service Worker Avançado

O Service Worker implementado inclui:

#### Estratégias de Cache:
- **Cache First**: Para recursos estáticos (JS, CSS, imagens)
- **Network First**: Para requisições dinâmicas
- **Cache First com Fallback**: Para API da Bíblia

#### Funcionalidades:
- ✅ Cache automático de recursos estáticos
- ✅ Cache inteligente de conteúdo bíblico
- ✅ Limpeza automática de caches antigos
- ✅ Atualização automática do Service Worker
- ✅ Fallback offline para APIs

### 2. Manifest.json Otimizado

O manifest inclui:
- ✅ Ícones para todos os tamanhos
- ✅ Shortcuts para funcionalidades principais
- ✅ Screenshots para app stores
- ✅ Configurações de orientação
- ✅ Suporte a diferentes dispositivos

### 3. Funcionalidades Offline

#### Recursos Disponíveis Offline:
- ✅ Interface completa do app
- ✅ Favoritos salvos localmente
- ✅ Notas pessoais
- ✅ Conteúdo bíblico cacheado
- ✅ Configurações do usuário

#### Recursos que Requerem Conexão:
- ❌ Busca em tempo real
- ❌ Novos capítulos não cacheados
- ❌ Sincronização de dados

### 4. Instalação do App

#### Para Usuários:
1. **Desktop (Chrome/Edge):**
   - Ícone de instalação na barra de endereços
   - Menu "Instalar Bíblia App"

2. **Mobile (Android):**
   - Banner de instalação automático
   - Menu "Adicionar à tela inicial"

3. **Mobile (iOS):**
   - Safari: Compartilhar > "Adicionar à Tela de Início"

## 🔧 Configurações Avançadas

### 1. Cache Management

#### Limpeza Automática:
```javascript
// Service Worker limpa caches antigos automaticamente
const CACHE_VERSIONS = {
  STATIC: 'biblia-static-v2',
  DYNAMIC: 'biblia-dynamic-v2',
  BIBLE: 'biblia-content-v2'
}
```

#### Controle Manual:
- Botão "Limpar Cache" nas configurações
- Sincronização manual de conteúdo
- Verificação de tamanho do cache

### 2. Sincronização Offline

#### Conteúdo Pré-carregado:
- Gênesis, Salmos, João, Mateus
- Todas as traduções (ACF, KJV, RVR1960)
- Cache automático durante navegação

#### Estratégia de Sincronização:
1. **Online**: Cache automático de conteúdo acessado
2. **Offline**: Servir conteúdo cacheado
3. **Reconexão**: Sincronização em background

### 3. Performance

#### Otimizações Implementadas:
- ✅ Lazy loading de componentes
- ✅ Code splitting por rotas
- ✅ Compressão de assets
- ✅ Cache inteligente
- ✅ Service Worker otimizado

#### Métricas Esperadas:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 📊 Monitoramento

### 1. Analytics (Opcional)

```javascript
// Google Analytics 4
gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: 'Bíblia App',
  page_location: window.location.href
})
```

### 2. Error Tracking

```javascript
// Sentry para rastreamento de erros
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: 'production'
})
```

### 3. Performance Monitoring

```javascript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

## 🚀 Checklist de Deploy

### Antes do Deploy:
- [ ] Build gerado sem erros
- [ ] Testes passando
- [ ] Service Worker funcionando
- [ ] Manifest.json válido
- [ ] Ícones gerados
- [ ] PWA testada

### Após o Deploy:
- [ ] HTTPS configurado
- [ ] PWA instalável
- [ ] Funcionalidades offline testadas
- [ ] Performance verificada
- [ ] Analytics configurado (opcional)
- [ ] Error tracking ativo (opcional)

## 🔍 Troubleshooting

### Problemas Comuns:

#### 1. Service Worker não atualiza:
```javascript
// Forçar atualização
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(registration => {
    registration.unregister()
  })
  window.location.reload()
})
```

#### 2. Cache não funciona:
- Verificar se HTTPS está ativo
- Limpar cache do navegador
- Verificar console para erros

#### 3. PWA não instala:
- Verificar manifest.json
- Testar em diferentes navegadores
- Verificar critérios de instalação

#### 4. Performance lenta:
- Usar Lighthouse para auditoria
- Verificar tamanho dos assets
- Otimizar imagens
- Implementar lazy loading

## 📱 Testes de PWA

### Ferramentas de Teste:
1. **Chrome DevTools**: Application > Manifest
2. **Lighthouse**: Auditoria PWA completa
3. **Web App Manifest Validator**: Validar manifest
4. **PWA Builder**: Teste de compatibilidade

### Critérios de PWA:
- ✅ Manifest válido
- ✅ Service Worker ativo
- ✅ HTTPS obrigatório
- ✅ Ícones adequados
- ✅ Responsividade
- ✅ Funcionalidades offline

---

## 🎯 Próximos Passos

1. **Deploy em produção**
2. **Testar funcionalidades offline**
3. **Monitorar performance**
4. **Coletar feedback dos usuários**
5. **Implementar melhorias baseadas no uso**

---

**🚀 Seu Bíblia App está pronto para ser usado online e offline!**
