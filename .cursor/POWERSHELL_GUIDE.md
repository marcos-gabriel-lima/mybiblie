# 🖥️ Guia Completo do PowerShell para Desenvolvimento Flutter

## 🚨 Regras Essenciais para Evitar Erros

### 1. **SEMPRE verificar se o Flutter está instalado**
```powershell
# ANTES de qualquer comando Flutter, execute:
flutter --version
# Se der erro "flutter não reconhecido", pare aqui e instale o Flutter
```

### 2. **Navegar corretamente nos diretórios**
```powershell
# Para ver onde você está:
pwd

# Para listar arquivos:
ls
# ou
dir

# Para entrar em uma pasta:
cd nome-da-pasta

# Para voltar uma pasta:
cd ..

# Para ir direto para a pasta do projeto:
cd "C:\Users\marco\OneDrive\Área de Trabalho\sorry"
```

### 3. **Comandos Flutter essenciais (em ordem)**
```powershell
# 1. SEMPRE primeiro:
flutter doctor

# 2. Depois, se estiver tudo OK:
flutter pub get

# 3. Para executar:
flutter run

# 4. Para limpar (se der erro):
flutter clean
flutter pub get
```

## 🔧 Comandos de Diagnóstico

### Verificar Status do Flutter
```powershell
# Diagnóstico completo
flutter doctor -v

# Verificar apenas Android
flutter doctor --android-licenses

# Verificar dispositivos conectados
flutter devices
```

### Verificar Dependências
```powershell
# Ver dependências instaladas
flutter pub deps

# Atualizar dependências
flutter pub upgrade

# Verificar problemas
flutter analyze
```

## 🚀 Comandos de Build e Execução

### Executar o App
```powershell
# Executar no dispositivo padrão
flutter run

# Executar em dispositivo específico
flutter run -d chrome
flutter run -d windows
flutter run -d android

# Executar em modo debug
flutter run --debug

# Executar em modo release
flutter run --release
```

### Build para Produção
```powershell
# Build para Android
flutter build apk

# Build para Windows
flutter build windows

# Build para Web
flutter build web
```

## 🛠️ Solução de Problemas Comuns

### Erro: "flutter não é reconhecido"
```powershell
# Solução 1: Verificar PATH
$env:PATH

# Solução 2: Adicionar Flutter ao PATH (temporário)
$env:PATH += ";C:\flutter\bin"

# Solução 3: Reiniciar PowerShell como Administrador
# E executar: flutter doctor
```

### Erro: "Android SDK não encontrado"
```powershell
# Verificar se Android Studio está instalado
# Executar:
flutter doctor --android-licenses

# Aceitar todas as licenças digitando 'y' quando solicitado
```

### Erro: "Dependências não encontradas"
```powershell
# Limpar tudo e reinstalar
flutter clean
flutter pub get
flutter pub upgrade
```

### Erro: "Dispositivo não encontrado"
```powershell
# Listar dispositivos disponíveis
flutter devices

# Se não aparecer nenhum dispositivo:
# - Conecte um celular via USB com depuração ativada
# - Ou abra um emulador Android
# - Ou execute: flutter run -d chrome (para web)
```

## 📱 Comandos Específicos para Este Projeto

### Configuração Inicial
```powershell
# 1. Navegar para a pasta do projeto
cd "C:\Users\marco\OneDrive\Área de Trabalho\sorry"

# 2. Verificar se é um projeto Flutter válido
flutter doctor

# 3. Instalar dependências
flutter pub get

# 4. Verificar se não há erros
flutter analyze
```

### Executar o Bíblia IA App
```powershell
# Executar no navegador (mais fácil para testar)
flutter run -d chrome

# Executar no Windows (se disponível)
flutter run -d windows

# Executar no Android (se dispositivo conectado)
flutter run -d android
```

## 🔍 Comandos de Debugging

### Ver Logs Detalhados
```powershell
# Executar com logs verbosos
flutter run -v

# Ver logs de build
flutter build apk -v
```

### Limpar Cache
```powershell
# Limpar cache do Flutter
flutter clean

# Limpar cache do pub
flutter pub cache clean

# Limpar cache do Dart
dart pub cache clean
```

## ⚡ Comandos Rápidos (Atalhos)

### Sequência Completa de Setup
```powershell
# Copie e cole este bloco completo:
flutter doctor
flutter pub get
flutter analyze
flutter run -d chrome
```

### Sequência de Limpeza e Reinstalação
```powershell
# Se algo der errado, execute:
flutter clean
flutter pub get
flutter pub upgrade
flutter run -d chrome
```

## 🎯 Checklist Antes de Executar Comandos

### ✅ Verificações Obrigatórias
1. **Flutter instalado?** → `flutter --version`
2. **Na pasta correta?** → `pwd` deve mostrar a pasta do projeto
3. **Dependências instaladas?** → `flutter pub get`
4. **Sem erros?** → `flutter analyze`
5. **Dispositivo disponível?** → `flutter devices`

### ✅ Ordem Correta de Comandos
```powershell
# SEMPRE nesta ordem:
1. flutter doctor
2. flutter pub get
3. flutter analyze
4. flutter run -d chrome
```

## 🚨 Sinais de Alerta - PARAR se Ver

### ❌ Erros que Indicam Problema Grave
- "flutter não é reconhecido como comando"
- "Android SDK not found"
- "No devices found"
- "Pub get failed"

### ✅ Sinais de que Está Funcionando
- "Flutter 3.x.x • channel stable"
- "Running Gradle task 'assembleDebug'"
- "Flutter run key commands"
- "Application finished"

## 📋 Comandos de Emergência

### Se Nada Funcionar
```powershell
# 1. Reiniciar PowerShell como Administrador
# 2. Executar:
flutter doctor -v
# 3. Seguir as instruções que aparecerem
# 4. Se necessário, reinstalar Flutter
```

### Reset Completo
```powershell
# CUIDADO: Isso limpa tudo
flutter clean
flutter pub cache clean
flutter pub get
flutter pub upgrade
```

## 🎉 Comando de Sucesso

### Quando Tudo Estiver Funcionando
```powershell
# Este comando deve mostrar o app rodando:
flutter run -d chrome

# Você deve ver:
# - "Launching lib\main.dart on Chrome"
# - "Flutter run key commands"
# - O app abrindo no navegador
```

---

## 🚀 **COMANDO MÁGICO - Execute Este Primeiro**

```powershell
# Copie e cole este comando completo:
cd "C:\Users\marco\OneDrive\Área de Trabalho\sorry" && flutter doctor && flutter pub get && flutter run -d chrome
```

**Se este comando funcionar, seu ambiente está perfeito! 🎉**

---

**💡 Dica:** Sempre execute `flutter doctor` primeiro para verificar se tudo está OK antes de tentar executar o app!
