# ⚡ Solução Rápida - APK Não Funciona

## 🎯 O Problema

O Next.js com API routes precisa de um servidor rodando. Para o APK funcionar, você tem 2 opções:

## ✅ Solução Rápida (5 minutos)

### 1. Publicar no Vercel (Gratuito)

```bash
cd nextjs_space
npm i -g vercel
vercel login
vercel
```

**Anote a URL** que aparece (ex: `https://biblia-almeida-xyz.vercel.app`)

### 2. Configurar Capacitor

Edite `capacitor.config.ts` e descomente/edite:

```typescript
server: {
  url: 'https://SUA-URL-AQUI.vercel.app', // COLE A URL DO VERCEL
  cleartext: false
}
```

### 3. Gerar APK

```bash
npm run android:build:url
```

### 4. No Android Studio

1. Aguarde abrir
2. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
3. Aguarde compilar
4. **Clique em "locate"** na notificação
5. **APK está pronto!**

---

## 📍 Onde Está o APK?

```
nextjs_space/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🔍 Verificar se Existe

```bash
cd nextjs_space
dir android\app\build\outputs\apk\debug
```

Se aparecer `app-debug.apk`, está tudo certo!

---

## 📱 Instalar no Celular

```bash
# Conectar celular via USB (com depuração USB ativada)
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

Ou arraste o arquivo APK para o celular e instale manualmente.

---

## ❌ Se Ainda Não Funcionar

1. **Verifique se publicou no Vercel**
2. **Verifique se a URL no capacitor.config.ts está correta**
3. **Execute novamente**: `npm run cap:sync`
4. **No Android Studio**: Build > Clean Project, depois Build APK novamente

---

## 💡 Dica

O app vai carregar do servidor Vercel. Isso é normal e garante que tudo funcione!

