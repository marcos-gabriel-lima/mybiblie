# 📱 Como Gerar APK no Android Studio

Guia completo para gerar um APK Android a partir do projeto Next.js usando TWA (Trusted Web Activity) ou Capacitor.

## 🎯 Opções Disponíveis

### Opção 1: TWA com Bubblewrap (Recomendado - Requer domínio HTTPS)
- Melhor performance
- Funciona como app nativo
- Requer domínio HTTPS publicado

### Opção 2: Capacitor (Alternativa - Pode usar URL local)
- Mais flexível
- Pode apontar para URL local ou remota
- Funciona sem domínio HTTPS (para desenvolvimento)

---

## 📋 Pré-requisitos

1. **Android Studio** instalado
   - Download: https://developer.android.com/studio
   - Instale o SDK Android (API 21+)

2. **Node.js** instalado (já tem)

3. **Java JDK** (vem com Android Studio)

4. **Domínio HTTPS** (para TWA) ou URL do app publicado

---

## 🚀 Opção 1: TWA com Bubblewrap (Recomendado)

### Passo 1: Publicar o App

Primeiro, publique seu app Next.js em um domínio HTTPS:

**Opção A: Vercel (Gratuito)**
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Fazer login
vercel login

# 3. Deploy
cd nextjs_space
vercel

# 4. Anotar a URL gerada (ex: https://biblia-almeida.vercel.app)
```

**Opção B: Netlify, Railway, ou outro serviço**

### Passo 2: Instalar Bubblewrap

```bash
npm install -g @bubblewrap/cli
```

### Passo 3: Inicializar Projeto Android

```bash
# Substitua pela URL do seu app publicado
bubblewrap init --manifest=https://SEU-DOMINIO.vercel.app/manifest.json
```

**Durante a inicialização, informe:**
- `applicationId`: `com.bibliaalmeida.app` (ou seu domínio invertido)
- `appName`: `Bíblia Sagrada Almeida`
- `launcherName`: `Bíblia Almeida`
- `packageName`: `com.bibliaalmeida.app`

### Passo 4: Gerar Keystore para Assinatura

```bash
# Gerar keystore
bubblewrap sign --generate \
  --ksFile ./keystore.jks \
  --alias bibliaalmeida \
  --password SUA_SENHA_AQUI
```

**⚠️ IMPORTANTE:** Guarde a senha e o arquivo `keystore.jks` em local seguro!

### Passo 5: Obter SHA256 Fingerprint

```bash
keytool -list -v -keystore ./keystore.jks -alias bibliaalmeida
```

Copie o **SHA256 Fingerprint** (ex: `AA:BB:CC:DD:...`)

### Passo 6: Criar assetlinks.json

Crie o arquivo `public/.well-known/assetlinks.json` no seu projeto Next.js:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.bibliaalmeida.app",
    "sha256_cert_fingerprints": [
      "SEU_SHA256_AQUI"
    ]
  }
}]
```

**Exemplo:**
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.bibliaalmeida.app",
    "sha256_cert_fingerprints": [
      "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99"
    ]
  }
}]
```

### Passo 7: Criar Rota no Next.js

Crie `nextjs_space/app/.well-known/assetlinks.json/route.ts`:

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  const assetlinks = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.bibliaalmeida.app",
        sha256_cert_fingerprints: [
          "SEU_SHA256_AQUI" // Cole o SHA256 aqui
        ]
      }
    }
  ]

  return NextResponse.json(assetlinks, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
```

### Passo 8: Fazer Deploy Novamente

```bash
vercel --prod
```

### Passo 9: Validar assetlinks.json

Acesse: `https://SEU-DOMINIO.vercel.app/.well-known/assetlinks.json`

Deve retornar o JSON criado.

### Passo 10: Build do APK

```bash
# No diretório criado pelo bubblewrap
bubblewrap build
```

Isso gera:
- `build/app-release.apk` - APK assinado
- Projeto Android completo

### Passo 11: Abrir no Android Studio

```bash
# Abrir o projeto gerado
# O Bubblewrap cria uma pasta com o projeto Android
# Abra essa pasta no Android Studio
```

**No Android Studio:**
1. File > Open > Selecione a pasta do projeto gerado
2. Aguarde sincronização
3. Build > Build Bundle(s) / APK(s) > Build APK(s)
4. Ou execute em emulador: Run > Run 'app'

---

## 🔧 Opção 2: Capacitor (Alternativa)

### Passo 1: Instalar Capacitor

```bash
cd nextjs_space
npm install @capacitor/core @capacitor/android @capacitor/cli
```

### Passo 2: Inicializar Capacitor

```bash
npx cap init
```

**Informe:**
- App name: `Bíblia Sagrada Almeida`
- App ID: `com.bibliaalmeida.app`
- Web dir: `out` (ou `.next` dependendo da build)

### Passo 3: Configurar capacitor.config.ts

Crie/edite `nextjs_space/capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bibliaalmeida.app',
  appName: 'Bíblia Sagrada Almeida',
  webDir: 'out',
  server: {
    // Para desenvolvimento local
    // url: 'http://localhost:3010',
    // cleartext: true,
    
    // Para produção (use URL do seu app publicado)
    url: 'https://SEU-DOMINIO.vercel.app',
    cleartext: false
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
```

### Passo 4: Build do Next.js

```bash
npm run build
```

### Passo 5: Adicionar Plataforma Android

```bash
npx cap add android
```

### Passo 6: Sincronizar

```bash
npx cap sync
```

### Passo 7: Abrir no Android Studio

```bash
npx cap open android
```

Isso abre o projeto no Android Studio automaticamente.

### Passo 8: Gerar APK no Android Studio

1. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
2. Aguarde a compilação
3. O APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

### Passo 9: APK de Release (Assinado)

Para gerar APK de release assinado:

1. **Build > Generate Signed Bundle / APK**
2. Selecione **APK**
3. Crie uma keystore (ou use existente)
4. Preencha os dados
5. Selecione **release** build variant
6. Clique em **Finish**

O APK estará em: `android/app/build/outputs/apk/release/app-release.apk`

---

## ✅ Testar o APK

### Instalar no Dispositivo

```bash
# Conectar dispositivo via USB (com depuração USB ativada)
adb install app-release.apk

# Ou arraste o arquivo APK para o dispositivo
```

### Verificar Funcionamento

- App deve abrir normalmente
- Navegação deve funcionar
- Busca deve funcionar
- Tema claro/escuro deve funcionar

---

## 🐛 Solução de Problemas

### Erro: "assetlinks.json não encontrado"
- Verifique se o arquivo está acessível em `https://SEU-DOMINIO/.well-known/assetlinks.json`
- Verifique se o Content-Type é `application/json`

### Erro: "SHA256 não confere"
- Verifique se o SHA256 no assetlinks.json está correto
- Use o comando `keytool -list -v` novamente

### Erro: "App não carrega"
- Verifique se a URL no Capacitor está correta
- Para desenvolvimento, use `http://localhost:3010` com `cleartext: true`

### Erro: "Build failed"
- Verifique se o Android SDK está instalado
- Verifique se o Java JDK está configurado
- Limpe o projeto: Build > Clean Project

---

## 📦 Estrutura Final

```
projeto/
├── nextjs_space/          # Projeto Next.js
├── android/               # Projeto Android (Capacitor)
│   └── app/
│       └── build/
│           └── outputs/
│               └── apk/
│                   └── release/
│                       └── app-release.apk
└── keystore.jks          # Keystore (TWA)
```

---

## 🎯 Próximos Passos

1. ✅ APK gerado e testado
2. 📱 Publicar na Google Play Store (gerar AAB)
3. 🔄 Atualizar app quando necessário
4. 📊 Monitorar uso e feedback

---

## 📚 Recursos Úteis

- [Bubblewrap Docs](https://github.com/GoogleChromeLabs/bubblewrap)
- [Capacitor Docs](https://capacitorjs.com/docs)
- [Android Studio](https://developer.android.com/studio)
- [TWA Documentation](https://developer.chrome.com/docs/android/trusted-web-activity/)

---

**Dica:** Para desenvolvimento rápido, use Capacitor com URL local. Para produção, use TWA com domínio HTTPS.

