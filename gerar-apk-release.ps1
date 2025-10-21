# Script para gerar APK de release assinado
# Execute este script no diretório do projeto

Write-Host "=== Gerando APK de Release Assinado ===" -ForegroundColor Green

# Navegar para o diretório do projeto
Set-Location "C:\xampp\htdocs\biblia\biblia-app"

Write-Host "1. Fazendo build do projeto web..." -ForegroundColor Yellow
npm run build

Write-Host "2. Sincronizando com Capacitor..." -ForegroundColor Yellow
npx cap copy

Write-Host "3. Gerando APK de release..." -ForegroundColor Yellow
Set-Location "android"
.\gradlew assembleRelease

Write-Host "4. APK gerado com sucesso!" -ForegroundColor Green
Write-Host "Localização: android\app\build\outputs\apk\release\app-release.apk" -ForegroundColor Cyan

# Voltar ao diretório original
Set-Location ".."

Write-Host "=== Processo concluído ===" -ForegroundColor Green
