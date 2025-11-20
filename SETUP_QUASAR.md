# 🚀 Setup Quasar Framework - Gerar APK

## 📋 Passo a Passo Completo

### 1. Instalar Quasar CLI

```bash
npm install -g @quasar/cli
```

### 2. Criar Projeto Quasar

```bash
cd C:\xampp\htdocs\biblia_almeida
quasar create quasar-app
```

**Durante a criação, selecione:**
- ✅ TypeScript
- ✅ ESLint
- ✅ PWA
- ✅ Capacitor (para mobile)

### 3. Copiar Dados da Bíblia

```bash
# Copiar arquivos JSON
copy biblia_almeida_completa.json quasar-app\src\assets\data\
copy livros_info.json quasar-app\src\assets\data\
```

### 4. Adicionar Modo Capacitor

```bash
cd quasar-app
quasar mode add capacitor
```

### 5. Adicionar Android

```bash
quasar mode add capacitor -T android
```

### 6. Configurar Capacitor

Edite `src-capacitor/capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bibliaalmeida.app',
  appName: 'Bíblia Sagrada Almeida',
  webDir: 'dist/spa',
  android: {
    allowMixedContent: true,
  },
};

export default config;
```

### 7. Build para Android

```bash
quasar build -m capacitor -T android
```

### 8. Abrir Android Studio

```bash
quasar dev -m capacitor -T android
```

### 9. Gerar APK no Android Studio

1. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
2. APK em: `src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk`

---

## ⚡ Comandos Rápidos

```bash
# Instalar Quasar
npm install -g @quasar/cli

# Criar projeto
quasar create quasar-app

# Adicionar mobile
cd quasar-app
quasar mode add capacitor
quasar mode add capacitor -T android

# Build e abrir
quasar build -m capacitor -T android
quasar dev -m capacitor -T android
```

---

**Pronto! Agora você pode gerar APK com Quasar!** 🎉

