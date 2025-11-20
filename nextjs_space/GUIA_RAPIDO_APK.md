# 🚀 Guia Rápido - Gerar APK

## Método Rápido com Capacitor

### 1. Instalar Dependências
```bash
cd nextjs_space
npm install @capacitor/core @capacitor/android @capacitor/cli
```

### 2. Inicializar (apenas primeira vez)
```bash
npx cap init
# App name: Bíblia Sagrada Almeida
# App ID: com.bibliaalmeida.app
# Web dir: out
```

### 3. Adicionar Android (apenas primeira vez)
```bash
npx cap add android
```

### 4. Configurar capacitor.config.ts
Edite `capacitor.config.ts` e configure a URL do seu app:
- **Desenvolvimento**: `url: 'http://localhost:3010'`
- **Produção**: `url: 'https://SEU-DOMINIO.vercel.app'`

### 5. Gerar APK
```bash
# Opção 1: Script automático
npm run android:build

# Opção 2: Manual
npm run build
npm run cap:sync
npm run cap:open
```

### 6. No Android Studio
1. Aguarde sincronização
2. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
3. APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## Para APK de Release (Assinado)

1. **Build > Generate Signed Bundle / APK**
2. Selecione **APK**
3. Crie keystore (ou use existente)
4. Selecione **release**
5. APK estará em: `android/app/build/outputs/apk/release/app-release.apk`

---

## Testar APK

```bash
# Instalar no dispositivo conectado
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

📖 **Guia completo**: Veja `GERAR_APK_ANDROID.md` para mais detalhes.

