# 🔧 Solução: ERR_CONNECTION_REFUSED no App Android

## ❌ Problema

O app tenta carregar de `http://192.168.0.105:9500/` mas não consegue conectar.

**Erro:** `net::ERR_CONNECTION_REFUSED`

## ✅ Causa

O app foi gerado enquanto o Quasar estava em modo desenvolvimento, ou há configuração de servidor no Capacitor.

## 🚀 Solução: Gerar APK Corretamente

### Passo 1: Fazer Build de Produção

```bash
cd quasar-app
quasar build -m capacitor -T android
```

Isso vai:
- ✅ Fazer build de produção do Quasar
- ✅ Copiar arquivos para `src-capacitor/www`
- ✅ Preparar para gerar APK

### Passo 2: Verificar Capacitor Config

Certifique-se que **NÃO** há `server.url` no `capacitor.config.json`:

```json
{
  "appId": "com.bibliaalmeida.app",
  "appName": "Bíblia Sagrada Almeida",
  "webDir": "www",
  // ❌ NÃO deve ter "server": { "url": "..." }
}
```

### Passo 3: Sincronizar Capacitor

```bash
cd quasar-app/src-capacitor
npx cap sync android
```

### Passo 4: Gerar Novo APK

No Android Studio:
1. **Build > Clean Project**
2. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
3. Aguarde compilar
4. Instale o novo APK

---

## 🔍 Verificar se Está Correto

### 1. Verificar se pasta www tem arquivos:

```bash
cd quasar-app/src-capacitor
dir www
```

Deve ter: `index.html`, `assets/`, etc.

### 2. Verificar capacitor.config.json:

```bash
type src-capacitor\capacitor.config.json
```

**NÃO deve ter** `"server": { "url": "..." }`

---

## ⚠️ Importante

**SEMPRE faça build de produção antes de gerar APK:**

```bash
quasar build -m capacitor -T android
```

**NÃO** gere APK enquanto o Quasar dev está rodando (`quasar dev`).

---

## 📋 Checklist

- [ ] Build de produção feito (`quasar build -m capacitor -T android`)
- [ ] Capacitor sincronizado (`npx cap sync android`)
- [ ] `capacitor.config.json` sem `server.url`
- [ ] Novo APK gerado no Android Studio
- [ ] APK instalado no dispositivo

---

**Execute esses passos e o app funcionará offline!** ✅

