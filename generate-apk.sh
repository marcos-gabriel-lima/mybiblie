#!/bin/bash

# Script para gerar APK com versões compatíveis
echo "🔧 Configurando versões compatíveis..."

# Atualizar Capacitor para versão estável
npm install @capacitor/android@6.0.0 @capacitor/cli@6.0.0

# Sincronizar projeto
npx cap sync

# Gerar APK
cd android
./gradlew clean
./gradlew assembleDebug

echo "✅ APK gerado em: android/app/build/outputs/apk/debug/app-debug.apk"
