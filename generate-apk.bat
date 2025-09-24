@echo off
echo 🔧 Configurando versões compatíveis para APK...

echo 📦 Instalando versões estáveis do Capacitor...
npm install @capacitor/android@6.0.0 @capacitor/cli@6.0.0 --save-exact

echo 🔄 Sincronizando projeto...
npx cap sync

echo 🏗️ Gerando APK...
cd android
gradlew clean
gradlew assembleDebug

echo ✅ APK gerado em: android\app\build\outputs\apk\debug\app-debug.apk
pause
