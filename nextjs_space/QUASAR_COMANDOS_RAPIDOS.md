# ⚡ Comandos Rápidos - Quasar APK

## 🚀 Sequência Completa

```bash
# 1. Instalar Quasar CLI (primeira vez)
npm install -g @quasar/cli

# 2. Adicionar Capacitor (primeira vez)
quasar mode add capacitor

# 3. Adicionar Android (primeira vez)
quasar mode add capacitor -T android

# 4. Build para Android
quasar build -m capacitor -T android

# 5. Abrir Android Studio
quasar dev -m capacitor -T android
```

## 📱 No Android Studio

1. Aguarde sincronização
2. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
3. Clique em **"locate"** na notificação
4. APK pronto!

## 📍 Onde Está o APK?

```
src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk
```

## 🔄 Comandos para Rebuild

```bash
# Rebuild completo
quasar build -m capacitor -T android && quasar dev -m capacitor -T android

# Apenas sincronizar
cd src-capacitor
npx cap sync android
```

## 🔐 APK Release (Assinado)

1. **Build > Generate Signed Bundle / APK**
2. Selecione **APK**
3. Crie keystore (ou use existente)
4. Selecione **release**
5. APK em: `src-capacitor/android/app/build/outputs/apk/release/app-release.apk`

---

📖 **Guia completo**: Veja `GERAR_APK_QUASAR.md`

