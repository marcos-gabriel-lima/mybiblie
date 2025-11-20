# ⚡ Comandos Rápidos - iOS/iPhone

## 🚀 Sequência Completa (Primeira Vez)

```bash
# 1. Instalar CocoaPods (no Mac)
sudo gem install cocoapods

# 2. Adicionar iOS ao projeto
cd quasar-app
quasar mode add capacitor -T ios

# 3. Build para iOS
quasar build -m capacitor -T ios

# 4. Abrir Xcode
quasar dev -m capacitor -T ios
```

## 📱 No Xcode

1. **Configurar assinatura:**
   - Selecione projeto > Target "App" > Signing & Capabilities
   - Marque "Automatically manage signing"
   - Selecione seu Team (Apple ID)

2. **Executar:**
   - Selecione dispositivo (Simulador ou iPhone)
   - Clique em **Play** (▶️) ou **Cmd + R**

3. **Gerar IPA:**
   - Product > Archive
   - Distribute App

---

## ⚠️ IMPORTANTE

**iOS só compila no Mac!**

- ❌ Não funciona no Windows
- ✅ Precisa de Mac com macOS
- ✅ Xcode instalado
- ✅ Apple ID (gratuito funciona)

---

## 📍 Estrutura

```
quasar-app/src-capacitor/ios/    # Projeto Xcode
```

---

📖 **Guia completo**: Veja `GERAR_APP_IPHONE.md`

