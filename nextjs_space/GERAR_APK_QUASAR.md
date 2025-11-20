# 📱 Gerar APK com Quasar Framework

Guia completo para gerar APK Android usando Quasar Framework.

## 🎯 Por que Quasar?

- ✅ Suporte nativo para mobile (Android/iOS)
- ✅ PWA integrado
- ✅ Build otimizado para mobile
- ✅ Integração fácil com Capacitor
- ✅ Comandos simples para gerar APK

---

## 📋 Pré-requisitos

1. **Node.js** instalado
2. **Android Studio** instalado
3. **Java JDK** (vem com Android Studio)
4. **Quasar CLI** instalado globalmente

---

## 🚀 Instalação e Configuração

### Passo 1: Instalar Quasar CLI

```bash
npm install -g @quasar/cli
```

### Passo 2: Criar Projeto Quasar (se ainda não tem)

```bash
# Criar novo projeto Quasar
quasar create biblia-quasar

# Ou se já tem projeto, apenas adicionar modo mobile
cd seu-projeto-quasar
quasar mode add capacitor
```

### Passo 3: Configurar Quasar para Mobile

Edite `quasar.conf.js`:

```javascript
module.exports = function (ctx) {
  return {
    // ...
    capacitor: {
      hideSplashscreen: true,
      androidStatusBarPadding: true,
      iosStatusBarPadding: true,
    },
    // ...
  }
}
```

---

## 📱 Adicionar Plataforma Android

### Passo 1: Adicionar Capacitor ao Quasar

```bash
quasar mode add capacitor
```

### Passo 2: Adicionar Plataforma Android

```bash
quasar mode add capacitor -T android
```

Ou manualmente:

```bash
npx cap add android
```

---

## 🔧 Configurar Capacitor no Quasar

### Arquivo: `src-capacitor/capacitor.config.ts`

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bibliaalmeida.app',
  appName: 'Bíblia Sagrada Almeida',
  webDir: 'dist/spa', // Quasar gera em dist/spa
  server: {
    // Para desenvolvimento local
    // url: 'http://localhost:9000',
    // cleartext: true,
    
    // Para produção (use URL do seu app publicado)
    // url: 'https://SEU-DOMINIO.vercel.app',
    // cleartext: false
  },
  android: {
    allowMixedContent: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#1e40af",
    }
  }
};

export default config;
```

---

## 🏗️ Build e Gerar APK

### Passo 1: Build do Quasar para Android

```bash
quasar build -m capacitor -T android
```

Este comando:
- ✅ Faz build do Quasar (SPA)
- ✅ Copia para `src-capacitor`
- ✅ Sincroniza com Capacitor
- ✅ Prepara projeto Android

### Passo 2: Abrir no Android Studio

```bash
quasar dev -m capacitor -T android
```

Ou manualmente:

```bash
cd src-capacitor
npx cap open android
```

### Passo 3: Gerar APK no Android Studio

1. **Aguarde sincronização** do projeto
2. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
3. **Aguarde compilar**
4. **Clique em "locate"** na notificação
5. **APK estará em:**
   ```
   src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk
   ```

---

## 🔐 APK Release Assinado (Para Play Store)

### Passo 1: Criar Keystore

No Android Studio:
1. **Build > Generate Signed Bundle / APK**
2. Selecione **APK**
3. Clique em **"Create new..."**
4. Escolha local seguro: `C:\Users\SeuUsuario\Documents\biblia_almeida.jks`
5. Preencha:
   - Password: crie senha forte
   - Alias: `biblia_almeida`
   - Key password: mesma senha
6. Clique em **OK**

### Passo 2: Gerar APK Release

1. **Volte à tela anterior**
2. Preencha:
   - Key store path: caminho do `.jks` criado
   - Key store password: sua senha
   - Key alias: `biblia_almeida`
   - Key password: sua senha
3. **Clique em Next**
4. **Selecione:**
   - ✅ **APK**
   - Build variant: **release**
5. **Destination Folder**: Deixe vazio (padrão)
6. **Clique em Create**

### Passo 3: Localizar APK Release

```
src-capacitor/android/app/build/outputs/apk/release/app-release.apk
```

---

## 📝 Scripts Úteis no package.json

Adicione ao `package.json`:

```json
{
  "scripts": {
    "quasar:dev": "quasar dev",
    "quasar:build": "quasar build",
    "quasar:android": "quasar build -m capacitor -T android",
    "quasar:android:open": "quasar dev -m capacitor -T android",
    "quasar:android:sync": "cd src-capacitor && npx cap sync android"
  }
}
```

Uso:
```bash
npm run quasar:android        # Build para Android
npm run quasar:android:open   # Build e abre Android Studio
```

---

## 🎯 Fluxo Completo (Resumo)

```bash
# 1. Instalar Quasar CLI (primeira vez)
npm install -g @quasar/cli

# 2. Adicionar modo Capacitor (primeira vez)
quasar mode add capacitor

# 3. Adicionar Android (primeira vez)
quasar mode add capacitor -T android

# 4. Build para Android
quasar build -m capacitor -T android

# 5. Abrir Android Studio
quasar dev -m capacitor -T android
# OU
cd src-capacitor
npx cap open android

# 6. No Android Studio: Build > Build APK(s)
```

---

## 📁 Estrutura do Projeto Quasar

```
projeto-quasar/
├── src/                    # Código fonte Vue
├── src-capacitor/          # Projeto Capacitor (gerado)
│   ├── android/           # Projeto Android
│   │   └── app/
│   │       └── build/
│   │           └── outputs/
│   │               └── apk/
│   │                   ├── debug/
│   │                   └── release/
│   └── capacitor.config.ts
├── dist/                   # Build do Quasar
│   └── spa/               # SPA build (usado pelo Capacitor)
└── quasar.conf.js         # Configuração do Quasar
```

---

## 🔍 Verificar se APK Foi Gerado

```bash
# Windows
dir src-capacitor\android\app\build\outputs\apk\debug

# Linux/Mac
ls src-capacitor/android/app/build/outputs/apk/debug
```

---

## 📱 Instalar APK no Dispositivo

```bash
# Conectar dispositivo via USB (depuração USB ativada)
adb install src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🐛 Solução de Problemas

### Erro: "quasar: command not found"
```bash
npm install -g @quasar/cli
```

### Erro: "capacitor mode not found"
```bash
quasar mode add capacitor
```

### Erro: "android platform not found"
```bash
quasar mode add capacitor -T android
```

### Erro: "webDir não encontrado"
- Verifique se fez `quasar build` antes
- O webDir deve ser `dist/spa` (padrão do Quasar)

### Build falha no Android Studio
1. **Build > Clean Project**
2. **Build > Rebuild Project**
3. Tente novamente

---

## ✅ Checklist

- [ ] Quasar CLI instalado globalmente
- [ ] Projeto Quasar criado/configurado
- [ ] Modo Capacitor adicionado
- [ ] Plataforma Android adicionada
- [ ] `quasar build -m capacitor -T android` executado
- [ ] Android Studio aberto
- [ ] Build > Build APK(s) executado
- [ ] APK encontrado na pasta

---

## 💡 Dicas

1. **Desenvolvimento**: Use `quasar dev -m capacitor -T android` para hot reload
2. **Produção**: Use `quasar build -m capacitor -T android` para build otimizado
3. **Keystore**: Guarde em local seguro, você precisará para atualizações
4. **PWA**: Quasar já inclui PWA configurado automaticamente

---

## 📚 Documentação

- [Quasar Framework](https://quasar.dev/)
- [Quasar Capacitor](https://quasar.dev/quasar-cli-vite/developing-capacitor-apps/introduction)
- [Capacitor Docs](https://capacitorjs.com/docs)

---

**Agora você pode gerar APK usando Quasar Framework!** 🎉

