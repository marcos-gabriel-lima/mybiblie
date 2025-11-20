# 🚀 Gerar APK Debug - Passo a Passo Simples

## ✅ Método Mais Fácil (Sem Keystore)

### No Android Studio

1. **Build > Clean Project**
   - Aguarde terminar

2. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
   - ⚠️ **NÃO** use "Generate Signed Bundle/APK"
   - Use apenas "Build APK(s)"

3. **Aguarde compilar**
   - Pode levar 2-5 minutos

4. **Quando aparecer notificação:**
   - Clique em **"locate"** ou **"Show in Explorer"**
   - A pasta do APK será aberta

---

## 📍 Onde Está o APK

```
quasar-app/src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📱 Instalar no Android

### Método 1: Via ADB (Recomendado)

```bash
# Conectar celular via USB
# Ativar Depuração USB no celular

# Instalar
adb install quasar-app\src-capacitor\android\app\build\outputs\apk\debug\app-debug.apk
```

**Vantagens:**
- Mostra erro se houver problema
- Mais confiável

### Método 2: Manual (Arrastar e Soltar)

1. **Copie o APK** para o celular
2. **No celular**: Abra o arquivo
3. **Habilite "Fontes desconhecidas"** se pedir
4. **Instale**

---

## ⚠️ Se APK Não Instalar

### 1. Habilitar Fontes Desconhecidas

**Android:**
- Configurações > Segurança > Fontes desconhecidas (ativar)
- Ou quando tentar instalar, permita o app

### 2. Desinstalar Versão Anterior

```bash
adb uninstall com.bibliaalmeida.app
```

### 3. Ver Erro Específico

```bash
adb logcat -d | findstr "INSTALL"
```

---

## 🔍 Verificar se APK Foi Gerado

```bash
cd quasar-app\src-capacitor\android
dir app\build\outputs\apk\debug
```

Se aparecer `app-debug.apk`, está tudo certo!

---

## ✅ Checklist

- [ ] Build > Clean Project executado
- [ ] Build > Build APK(s) executado (não Generate Signed)
- [ ] Notificação apareceu
- [ ] APK encontrado na pasta
- [ ] Fontes desconhecidas habilitadas no celular
- [ ] Versão anterior desinstalada (se houver)

---

**Siga esses passos e o APK será gerado e instalado!** 🎉

