# Como Gerar APK - Bíblia Digital

## Pré-requisitos

1. **Java Development Kit (JDK) 17** - Instalado e configurado
2. **Android Studio** - Instalado e configurado
3. **Node.js** - Versão 20 ou superior
4. **npm** - Gerenciador de pacotes do Node.js

## Passos para Gerar o APK

### 1. Instalar Dependências
```bash
npm install
```

### 2. Fazer Build do Projeto Web
```bash
npm run build
```

### 3. Sincronizar com Capacitor
```bash
npx cap copy
```

### 4. Abrir Android Studio
```bash
npx cap open android
```

### 5. No Android Studio

1. **Aguardar a sincronização do Gradle** (pode demorar alguns minutos na primeira vez)
2. **Configurar o Java SDK**:
   - Vá em `File` → `Project Structure` → `SDK Location`
   - Certifique-se de que o JDK está apontando para Java 17
   - Exemplo: `C:\Program Files\Microsoft\jdk-17.0.16.8-hotspot\`

3. **Gerar APK de Debug**:
   - Vá em `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
   - Aguarde o build completar
   - O APK será gerado em: `android/app/build/outputs/apk/debug/app-debug.apk`

4. **Gerar APK de Release** (opcional):
   - Vá em `Build` → `Generate Signed Bundle / APK`
   - Escolha `APK`
   - Crie uma nova keystore ou use uma existente
   - Configure o build de release
   - O APK será gerado em: `android/app/build/outputs/apk/release/app-release.apk`

## Scripts Disponíveis

- `npm run build:android` - Build + Copy + Open Android Studio
- `npm run build:apk` - Build + Copy + Run Android (requer dispositivo/emulador)

## Solução de Problemas

### Erro: "failed to decrypt safe contents entry: javax.crypto.BadPaddingException"
- **Causa**: Keystore corrompida ou inexistente
- **Solução**: 
  1. **Nova keystore já foi criada** em `android/app/biblia-digital-release-key.keystore`
  2. **Configuração já foi aplicada** no `build.gradle`
  3. **Execute o script**: `.\gerar-apk-release.ps1`
  4. **OU manualmente**:
     ```bash
     cd android
     .\gradlew assembleRelease
     ```

### Erro: "invalid source release: 21"
- **Causa**: Projeto configurado para Java 21, mas sistema tem Java 17
- **Solução**: 
  1. Instalar Java 21 OU
  2. Configurar Android Studio para usar Java 17:
     - `File` → `Project Structure` → `SDK Location`
     - Definir JDK para Java 17

### Erro: "Gradle build failed"
- **Solução**: 
  1. Limpar cache do Gradle: `./gradlew clean`
  2. Re-sincronizar projeto no Android Studio
  3. Verificar conexão com internet (para download de dependências)

### APK muito grande
- **Solução**: 
  1. Ativar ProGuard/R8 para minificação
  2. Remover recursos não utilizados
  3. Usar App Bundle (.aab) em vez de APK

## Localização dos Arquivos

- **APK Debug**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **APK Release**: `android/app/build/outputs/apk/release/app-release.apk`
- **Configuração**: `android/app/build.gradle`
- **Manifesto**: `android/app/src/main/AndroidManifest.xml`

## Próximos Passos

1. **Testar o APK** em dispositivos Android
2. **Configurar ícones** personalizados
3. **Configurar splash screen** personalizado
4. **Assinar o APK** para distribuição
5. **Publicar na Google Play Store** (se desejado)

## Comandos Úteis

```bash
# Limpar build
npx cap clean

# Re-sincronizar tudo
npx cap sync

# Verificar dispositivos conectados
adb devices

# Instalar APK diretamente
adb install app-debug.apk
```
