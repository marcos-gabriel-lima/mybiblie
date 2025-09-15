# 🖥️ REGRAS ESSENCIAIS DO POWERSHELL - Bíblia IA

## 🚨 REGRA #1: SEMPRE verificar se Flutter está instalado

```powershell
# ANTES de qualquer comando, execute:
flutter --version
```

**Se der erro "flutter não reconhecido", PARE e instale o Flutter primeiro!**

## 🚨 REGRA #2: SEMPRE navegar para a pasta correta

```powershell
# Verificar onde você está:
pwd

# Navegar para a pasta do projeto:
cd "C:\Users\marco\OneDrive\Área de Trabalho\sorry"
```

## 🚨 REGRA #3: SEMPRE executar comandos na ordem correta

```powershell
# ORDEM OBRIGATÓRIA:
1. flutter doctor
2. flutter pub get
3. flutter analyze
4. flutter run -d chrome
```

## 🚨 REGRA #4: SEMPRE usar o navegador para testar primeiro

```powershell
# Comando mais seguro para testar:
flutter run -d chrome
```

## 🚨 REGRA #5: SEMPRE limpar cache se algo der errado

```powershell
# Se algo der errado, execute:
flutter clean
flutter pub get
```

## 🎯 COMANDO MÁGICO - Execute Este Primeiro

```powershell
# Copie e cole este comando completo:
cd "C:\Users\marco\OneDrive\Área de Trabalho\sorry" && flutter doctor && flutter pub get && flutter run -d chrome
```

## ✅ SINAIS DE SUCESSO

### Quando está funcionando:
- "Flutter 3.x.x • channel stable"
- "Launching lib\main.dart on Chrome"
- "Flutter run key commands"
- O app abre no navegador

### Quando há problema:
- "flutter não é reconhecido" → Instale Flutter
- "Android SDK not found" → Instale Android Studio
- "No devices found" → Use `flutter run -d chrome`
- "Pub get failed" → Execute `flutter clean`

## 🔧 COMANDOS DE EMERGÊNCIA

### Se nada funcionar:
```powershell
# 1. Reiniciar PowerShell como Administrador
# 2. Executar:
flutter doctor -v
# 3. Seguir as instruções que aparecerem
```

### Reset completo:
```powershell
flutter clean
flutter pub cache clean
flutter pub get
flutter pub upgrade
```

## 📱 COMANDOS ESPECÍFICOS PARA BÍBLIA IA

### Executar o app:
```powershell
cd "C:\Users\marco\OneDrive\Área de Trabalho\sorry"
flutter run -d chrome
```

### Desenvolvimento:
- **Hot reload**: Pressione 'r' (quando app estiver rodando)
- **Hot restart**: Pressione 'R' (quando app estiver rodando)
- **Parar app**: Pressione 'q' (quando app estiver rodando)

### Build para produção:
```powershell
flutter build web
flutter build windows
flutter build apk
```

## 🚨 CHECKLIST ANTES DE EXECUTAR

### ✅ Verificações obrigatórias:
1. **Flutter instalado?** → `flutter --version`
2. **Na pasta correta?** → `pwd` deve mostrar a pasta do projeto
3. **Dependências instaladas?** → `flutter pub get`
4. **Sem erros?** → `flutter analyze`
5. **Dispositivo disponível?** → `flutter devices`

## 💡 DICAS IMPORTANTES

1. **SEMPRE execute `flutter doctor` primeiro**
2. **Use `flutter run -d chrome` para testar rapidamente**
3. **Se algo der errado, execute `flutter clean`**
4. **Mantenha o PowerShell aberto durante o desenvolvimento**
5. **Use Ctrl+C para parar comandos que estão travados**

## 🎉 TESTE FINAL

```powershell
# Execute este comando para testar se tudo está funcionando:
flutter run -d chrome
```

**Se este comando funcionar e abrir o app no navegador, seu ambiente está perfeito! 🎉**

---

## 📋 RESUMO DAS REGRAS

1. ✅ Verificar Flutter instalado
2. ✅ Navegar para pasta correta
3. ✅ Executar comandos na ordem
4. ✅ Usar navegador para testar
5. ✅ Limpar cache se der erro

**🚀 Siga estas regras e você nunca terá problemas com PowerShell!**
