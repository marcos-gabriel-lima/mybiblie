# 🔧 Solução: APK Não Funciona

## 🎯 Problema Identificado

O Next.js precisa ser configurado corretamente para gerar APK. Existem duas abordagens:

### ❌ Problema: Next.js com API Routes não funciona com build estática

O projeto usa API routes (`/api/chapters`, `/api/search`), que não funcionam com export estático.

## ✅ Soluções

### Solução 1: Usar URL do Servidor (RECOMENDADO)

**Vantagens:**
- ✅ Funciona com todas as funcionalidades
- ✅ API routes funcionam normalmente
- ✅ Mais fácil de manter

**Passos:**

1. **Publicar o app** (Vercel, Netlify, etc.):
```bash
npm i -g vercel
cd nextjs_space
vercel
```

2. **Configurar capacitor.config.ts**:
```typescript
server: {
  url: 'https://SEU-DOMINIO.vercel.app',
  cleartext: false
}
```

3. **Gerar APK**:
```bash
npm run android:build:url
```

4. **No Android Studio**: Build > Build APK

---

### Solução 2: Build Estática (Sem API Routes)

**Vantagens:**
- ✅ Funciona offline (parcialmente)
- ✅ Não precisa de servidor

**Desvantagens:**
- ❌ API routes não funcionam
- ❌ Busca precisa ser client-side

**Passos:**

1. **Fazer build estática**:
```bash
npm run build:static
```

2. **Configurar capacitor.config.ts** (remover server.url):
```typescript
// Comentar ou remover server.url
// server: { ... }
```

3. **Sincronizar**:
```bash
npx cap sync
```

4. **Abrir Android Studio**:
```bash
npx cap open android
```

5. **Build APK**

---

## 🚀 Passo a Passo Completo (Solução 1 - Recomendada)

### 1. Publicar App no Vercel

```bash
cd nextjs_space
npm i -g vercel
vercel login
vercel
```

Anote a URL gerada (ex: `https://biblia-almeida.vercel.app`)

### 2. Configurar Capacitor

Edite `capacitor.config.ts`:

```typescript
server: {
  url: 'https://SUA-URL.vercel.app', // Cole sua URL aqui
  cleartext: false
}
```

### 3. Instalar Capacitor (se ainda não instalou)

```bash
npm install @capacitor/core @capacitor/android @capacitor/cli
```

### 4. Inicializar (primeira vez)

```bash
npx cap init
# App name: Bíblia Sagrada Almeida
# App ID: com.bibliaalmeida.app
# Web dir: .next (ou out, dependendo)
```

### 5. Adicionar Android (primeira vez)

```bash
npx cap add android
```

### 6. Gerar APK

```bash
npm run android:build:url
```

### 7. No Android Studio

1. Aguarde abrir
2. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
3. Aguarde compilar
4. **Localizar APK**: Clique em "locate" quando aparecer a notificação
   - Ou vá em: `android/app/build/outputs/apk/debug/app-debug.apk`

### 8. Instalar no Dispositivo

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🔍 Verificar se Funcionou

### Onde está o APK?

1. **No Android Studio**:
   - Após build, aparece notificação "APK(s) generated successfully"
   - Clique em "locate" para abrir a pasta

2. **Caminho manual**:
   ```
   nextjs_space/android/app/build/outputs/apk/debug/app-debug.apk
   ```

3. **Verificar se existe**:
```bash
cd nextjs_space
dir android\app\build\outputs\apk\debug
```

---

## 🐛 Problemas Comuns

### Erro: "webDir não encontrado"

**Solução:**
- Verifique se fez `npm run build` antes
- Verifique o `webDir` no `capacitor.config.ts`
- Para build normal: use `.next`
- Para build estática: use `out`

### Erro: "Build failed" no Android Studio

**Solução:**
1. **File > Invalidate Caches / Restart**
2. **Build > Clean Project**
3. **Build > Rebuild Project**
4. Tente novamente

### APK não instala

**Solução:**
1. Desinstale versão anterior: `adb uninstall com.bibliaalmeida.app`
2. Instale novamente: `adb install app-debug.apk`

### App abre mas não carrega

**Solução:**
- Verifique se a URL no `capacitor.config.ts` está correta
- Verifique se o app está publicado e acessível
- Para desenvolvimento local, use: `http://10.0.2.2:3010` (IP do emulador)

---

## 📝 Checklist

- [ ] App publicado em domínio HTTPS
- [ ] Capacitor instalado
- [ ] `capacitor.config.ts` configurado com URL
- [ ] `npx cap add android` executado
- [ ] `npx cap sync` executado
- [ ] Android Studio aberto
- [ ] Build > Build APK executado
- [ ] APK encontrado na pasta

---

## 🎯 Comandos Rápidos

```bash
# Build completo e abrir Android Studio
npm run android:build:url

# Apenas sincronizar
npm run cap:sync

# Apenas abrir Android Studio
npm run cap:open

# Verificar se APK existe
dir android\app\build\outputs\apk\debug
```

---

## 💡 Dica Final

**Para desenvolvimento rápido:**
1. Publique no Vercel (gratuito)
2. Use a URL no `capacitor.config.ts`
3. Gere APK normalmente

**Isso garante que tudo funcione!**

