# 🔧 Solução: Erro "Keystore file not found for signing config 'externalOverride'"

## ❌ Erro

```
Keystore file 'C:\Users\marco\.gradle\daemon\8.11.1\quasar-app\src-capacitor\android\app\build\outputs\apk\release\app-release.apk' not found for signing config 'externalOverride'.
```

## ✅ Solução

O problema é que o Android Studio criou uma configuração de assinatura incorreta. Vamos corrigir:

### Opção 1: Limpar e Gerar APK Debug (Mais Rápido)

1. **No Android Studio:**
   - **Build > Clean Project**
   - Aguarde terminar

2. **Gerar APK Debug (não precisa de keystore):**
   - **Build > Build Bundle(s) / APK(s) > Build APK(s)**
   - **NÃO** use "Generate Signed Bundle/APK"
   - Aguarde compilar

3. **APK estará em:**
   ```
   quasar-app/src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk
   ```

### Opção 2: Remover Configuração de Assinatura Incorreta

1. **No Android Studio:**
   - **File > Invalidate Caches / Restart**
   - Selecione **"Invalidate and Restart"**
   - Aguarde reiniciar

2. **Build > Clean Project**

3. **Tente gerar APK Debug novamente:**
   - **Build > Build Bundle(s) / APK(s) > Build APK(s)**

### Opção 3: Gerar APK Release Corretamente

1. **Feche todas as janelas do Android Studio**

2. **Delete a pasta build (se existir):**
   ```bash
   cd quasar-app/src-capacitor/android
   Remove-Item -Recurse -Force app\build -ErrorAction SilentlyContinue
   ```

3. **Abra Android Studio novamente**

4. **Build > Clean Project**

5. **Build > Generate Signed Bundle / APK**
   - Selecione **APK**
   - Clique em **"Create new..."**
   - Crie keystore novo em local seguro
   - Preencha todos os dados
   - Clique em **Next**

6. **Na próxima tela:**
   - **Destination Folder**: Deixe **VAZIO**
   - Build variant: **release**
   - Clique em **Create**

---

## 🎯 Solução Rápida Recomendada

**Use APK Debug primeiro (não precisa de keystore):**

1. **Build > Clean Project**
2. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
3. Aguarde compilar
4. Clique em **"locate"** na notificação
5. APK pronto!

**Depois, quando quiser APK release assinado, siga a Opção 3 acima.**

---

## 📍 Onde Está o APK Debug

```
quasar-app/src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## ✅ Checklist

- [ ] Build > Clean Project executado
- [ ] Build > Build APK(s) (não Generate Signed)
- [ ] APK encontrado na pasta debug

---

**Use APK Debug primeiro para testar!** 🚀

