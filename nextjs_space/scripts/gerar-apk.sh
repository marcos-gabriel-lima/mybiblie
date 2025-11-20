#!/bin/bash

# Script para gerar APK usando Capacitor
# Uso: ./scripts/gerar-apk.sh

echo "📱 Gerando APK para Android..."

# 1. Build do Next.js
echo "🔨 Fazendo build do Next.js..."
npm run build

# 2. Sincronizar Capacitor
echo "🔄 Sincronizando Capacitor..."
npx cap sync

# 3. Abrir no Android Studio
echo "🚀 Abrindo Android Studio..."
echo "💡 No Android Studio:"
echo "   1. Build > Build Bundle(s) / APK(s) > Build APK(s)"
echo "   2. Ou: Build > Generate Signed Bundle / APK (para release)"
echo ""

npx cap open android

echo "✅ Pronto! O projeto está aberto no Android Studio."
echo "📦 O APK será gerado em: android/app/build/outputs/apk/"

