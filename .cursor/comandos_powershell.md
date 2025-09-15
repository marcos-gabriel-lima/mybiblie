# 🖥️ Comandos PowerShell Específicos para Bíblia IA

## 🚀 Comandos Essenciais (Execute na Ordem)

### 1. **Verificação Inicial**
```powershell
# Verificar se está na pasta correta
pwd

# Se não estiver, navegar para a pasta do projeto
cd "C:\Users\marco\OneDrive\Área de Trabalho\sorry"
```

### 2. **Diagnóstico Completo**
```powershell
# Verificar se Flutter está funcionando
flutter doctor

# Se der erro, pare aqui e instale o Flutter
# Se estiver OK, continue para o próximo passo
```

### 3. **Instalar Dependências**
```powershell
# Instalar todas as dependências do projeto
flutter pub get

# Se der erro, execute:
flutter clean
flutter pub get
```

### 4. **Verificar Código**
```powershell
# Verificar se há erros no código
flutter analyze

# Se houver erros, corrija-os antes de continuar
```

### 5. **Executar o App**
```powershell
# Executar no navegador (mais fácil)
flutter run -d chrome

# Ou executar no Windows
flutter run -d windows

# Ou executar no Android (se dispositivo conectado)
flutter run -d android
```

## 🔧 Comandos de Solução de Problemas

### Se Flutter não for reconhecido:
```powershell
# Verificar PATH
$env:PATH

# Adicionar Flutter ao PATH (temporário)
$env:PATH += ";C:\flutter\bin"

# Reiniciar PowerShell e tentar novamente
flutter --version
```

### Se der erro de dependências:
```powershell
# Limpar tudo e reinstalar
flutter clean
flutter pub cache clean
flutter pub get
flutter pub upgrade
```

### Se não encontrar dispositivos:
```powershell
# Listar dispositivos disponíveis
flutter devices

# Se não aparecer nenhum, use o navegador:
flutter run -d chrome
```

## 🎯 Comando Único para Executar Tudo

```powershell
# Copie e cole este comando completo:
cd "C:\Users\marco\OneDrive\Área de Trabalho\sorry" && flutter doctor && flutter pub get && flutter analyze && flutter run -d chrome
```

## 📱 Comandos Específicos para Este Projeto

### Executar o Bíblia IA App
```powershell
# Navegar para a pasta
cd "C:\Users\marco\OneDrive\Área de Trabalho\sorry"

# Executar no navegador
flutter run -d chrome
```

### Build para Produção
```powershell
# Build para Windows
flutter build windows

# Build para Web
flutter build web

# Build para Android
flutter build apk
```

### Desenvolvimento
```powershell
# Hot reload (quando o app estiver rodando)
# Pressione 'r' no terminal

# Hot restart (quando o app estiver rodando)
# Pressione 'R' no terminal

# Parar o app
# Pressione 'q' no terminal
```

## 🚨 Sinais de Sucesso

### ✅ Quando está funcionando:
- "Flutter 3.x.x • channel stable"
- "Running Gradle task 'assembleDebug'"
- "Launching lib\main.dart on Chrome"
- "Flutter run key commands"
- O app abre no navegador

### ❌ Quando há problema:
- "flutter não é reconhecido"
- "Android SDK not found"
- "No devices found"
- "Pub get failed"

## 💡 Dicas Importantes

1. **SEMPRE execute `flutter doctor` primeiro**
2. **Use `flutter run -d chrome` para testar rapidamente**
3. **Se algo der errado, execute `flutter clean`**
4. **Mantenha o PowerShell aberto durante o desenvolvimento**
5. **Use Ctrl+C para parar comandos que estão travados**

## 🎉 Comando de Teste Final

```powershell
# Execute este comando para testar se tudo está funcionando:
flutter run -d chrome

# Se este comando funcionar e abrir o app no navegador, 
# seu ambiente está perfeito! 🎉
```

---

**🚀 PRONTO! Agora você pode executar o app Bíblia IA sem erros!**
