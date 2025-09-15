# 🚀 Guia de Deploy - Bíblia App

Este guia explica como fazer o deploy do Bíblia App em diferentes plataformas.

## 📦 Build de Produção

Antes de fazer o deploy, gere o build de produção:

```bash
npm run build
```

Isso criará uma pasta `dist/` com todos os arquivos otimizados para produção.

## 🌐 Deploy Web

### Vercel (Recomendado)

1. Instale o Vercel CLI:
```bash
npm i -g vercel
```

2. Faça login e configure:
```bash
vercel login
vercel
```

3. Siga as instruções na tela. O Vercel detectará automaticamente que é um projeto Vite.

### Netlify

1. Instale o Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build e deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages

1. Instale o gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Adicione ao package.json:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://seu-usuario.github.io/biblia-app"
}
```

3. Deploy:
```bash
npm run deploy
```

## 🖥️ App Desktop (Electron)

Para converter em aplicativo desktop:

1. Instale o Electron:
```bash
npm install --save-dev electron electron-builder
```

2. Adicione scripts ao package.json:
```json
{
  "scripts": {
    "electron": "electron .",
    "electron:pack": "electron-builder",
    "electron:dist": "npm run build && electron-builder"
  },
  "main": "electron.config.js",
  "build": {
    "appId": "com.seuusuario.biblia-app",
    "productName": "Bíblia App",
    "directories": {
      "output": "electron-dist"
    },
    "files": [
      "dist/**/*",
      "electron.config.js"
    ]
  }
}
```

3. Execute:
```bash
npm run electron:dist
```

## 📱 App Mobile (PWA)

O app já está configurado como PWA. Para melhorar:

1. Adicione um service worker
2. Configure o manifest.json
3. Adicione ícones para diferentes tamanhos

## 🔧 Configurações de Produção

### Variáveis de Ambiente

Crie um arquivo `.env.production`:
```
VITE_APP_TITLE=Bíblia App
VITE_APP_DESCRIPTION=Leia a Bíblia Sagrada online
```

### Otimizações

- Minificação automática com Vite
- Tree shaking para reduzir bundle size
- Lazy loading de componentes
- Compressão gzip no servidor

## 📊 Monitoramento

### Analytics

Adicione Google Analytics ou similar:

```typescript
// src/utils/analytics.ts
export const trackEvent = (event: string, data?: any) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', event, data)
  }
}
```

### Error Tracking

Use Sentry ou similar para rastrear erros:

```bash
npm install @sentry/react
```

## 🔒 Segurança

- HTTPS obrigatório em produção
- Headers de segurança configurados
- CSP (Content Security Policy) implementado
- Validação de entrada em todos os formulários

## 📈 Performance

- Lazy loading de imagens
- Code splitting por rotas
- Cache de API responses
- Service worker para cache offline

## 🧪 Testes

Antes do deploy, execute os testes:

```bash
npm run test
npm run test:e2e
```

## 📝 Checklist de Deploy

- [ ] Build de produção gerado sem erros
- [ ] Testes passando
- [ ] Variáveis de ambiente configuradas
- [ ] Analytics configurado
- [ ] Error tracking ativo
- [ ] HTTPS configurado
- [ ] Headers de segurança
- [ ] Performance otimizada
- [ ] PWA funcionando
- [ ] Responsividade testada

## 🆘 Troubleshooting

### Build falha
- Verifique se todas as dependências estão instaladas
- Limpe o cache: `npm run clean`
- Verifique erros de TypeScript: `npm run type-check`

### Deploy falha
- Verifique se o build foi gerado corretamente
- Confirme as configurações de DNS
- Verifique logs do servidor

### Performance lenta
- Use Lighthouse para auditoria
- Otimize imagens
- Implemente lazy loading
- Configure cache headers

