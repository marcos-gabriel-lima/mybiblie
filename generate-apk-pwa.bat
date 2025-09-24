@echo off
echo 🚀 Gerando APK da Bíblia App usando PWA Builder...

echo 📦 Fazendo build do projeto...
npm run build

echo 🌐 Abrindo PWA Builder...
start https://www.pwabuilder.com/

echo.
echo 📱 INSTRUÇÕES PARA GERAR APK:
echo.
echo 1. Cole esta URL no PWA Builder: http://localhost:3000
echo 2. Ou faça upload da pasta 'dist' para um servidor
echo 3. Clique em "Build My PWA"
echo 4. Selecione "Android" 
echo 5. Baixe o APK gerado
echo.
echo ✅ Alternativa: Use o Capacitor Cloud
echo 🌐 Acesse: https://capacitor.cloud/
echo 📁 Conecte: https://github.com/marcos-gabriel-lima/mybiblie
echo.
pause
