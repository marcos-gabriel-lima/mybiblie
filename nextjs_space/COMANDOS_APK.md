# 🚀 Comandos para Gerar APK

## 📋 Sequência Completa (Primeira Vez)

```bash
# 1. Instalar Capacitor
cd nextjs_space
npm install @capacitor/core @capacitor/android @capacitor/cli

# 2. Inicializar
npx cap init
# App name: Bíblia Sagrada Almeida
# App ID: com.bibliaalmeida.app
# Web dir: .next

# 3. Adicionar Android
npx cap add android

# 4. Publicar app (Vercel)
npm i -g vercel
vercel login
vercel
# Anote a URL gerada

# 5. Configurar capacitor.config.ts
# Edite e coloque: url: 'https://SUA-URL.vercel.app'

# 6. Gerar APK
npm run android:build:url
```

## 🔄 Comandos para Gerar APK (Depois da Primeira Vez)

```bash
# Opção 1: Build completo (recomendado)
npm run android:build:url

# Opção 2: Passo a passo
npm run build
npm run cap:sync
npm run cap:open
```

## 📍 Onde Está o APK?

```
nextjs_space/android/app/build/outputs/apk/debug/app-debug.apk
```

## 🔍 Verificar se APK Foi Gerado

```bash
# Windows
dir android\app\build\outputs\apk\debug

# Linux/Mac
ls android/app/build/outputs/apk/debug
```

## 📱 Instalar no Dispositivo

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## 🎯 No Android Studio

1. Aguarde abrir
2. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
3. Aguarde compilar
4. Clique em **"locate"** na notificação
5. APK estará na pasta aberta

