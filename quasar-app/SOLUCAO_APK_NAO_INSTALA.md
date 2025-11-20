# 🔧 Solução: APK Não Instala no Android

## ❌ Problema

Ao tentar instalar o APK, aparece notificação: **"App não instalado"**

## ✅ Soluções (Teste uma por vez)

### Solução 1: Habilitar "Fontes Desconhecidas"

**No Android:**
1. **Configurações > Segurança**
2. Ative **"Fontes desconhecidas"** ou **"Instalar apps desconhecidos"**
3. Se aparecer lista de apps, escolha o app que você está usando (Chrome, Gerenciador de Arquivos, etc.)
4. Ative a permissão
5. Tente instalar novamente

**Android 8.0+:**
- A permissão é por app
- Quando tentar instalar, o Android pedirá permissão
- Clique em **"Permitir desta vez"** ou **"Permitir sempre"**

---

### Solução 2: Verificar se APK Está Completo

```bash
# Verificar tamanho do APK (deve ter alguns MB)
dir quasar-app\src-capacitor\android\app\build\outputs\apk\debug\app-debug.apk
```

Se o arquivo estiver muito pequeno (< 1MB), pode estar corrompido.

**Solução:**
- Gere o APK novamente
- Build > Clean Project
- Build > Build APK(s)

---

### Solução 3: Desinstalar Versão Anterior

Se você já instalou uma versão antes:

1. **Configurações > Apps**
2. Procure por "Bíblia Sagrada Almeida" ou "biblia"
3. **Desinstale** se encontrar
4. Tente instalar novamente

Ou via ADB:
```bash
adb uninstall com.bibliaalmeida.app
```

---

### Solução 4: Verificar Espaço no Dispositivo

1. **Configurações > Armazenamento**
2. Verifique se há espaço suficiente (pelo menos 50MB livres)
3. Libere espaço se necessário

---

### Solução 5: Instalar via ADB (Mais Confiável)

```bash
# Conectar dispositivo via USB
# Ativar Depuração USB no Android

# Instalar APK
adb install quasar-app\src-capacitor\android\app\build\outputs\apk\debug\app-debug.apk

# Se der erro, forçar instalação
adb install -r quasar-app\src-capacitor\android\app\build\outputs\apk\debug\app-debug.apk
```

**Vantagens:**
- Mostra erro específico se falhar
- Mais confiável que instalação manual

---

### Solução 6: Verificar Assinatura do APK

O APK pode estar com problema de assinatura. Gere um APK debug novo:

1. **No Android Studio:**
   - Build > Clean Project
   - Build > Build Bundle(s) / APK(s) > Build APK(s)
   - **NÃO** use "Generate Signed Bundle/APK" (para debug)

2. **Use o APK debug** (não precisa de keystore)

---

### Solução 7: Verificar Logs de Erro

Via ADB, veja o erro específico:

```bash
# Ver logs em tempo real
adb logcat | findstr "PackageManager"

# Ou ver último erro
adb logcat -d | findstr "INSTALL_FAILED"
```

Isso mostrará o motivo exato da falha.

---

## 🔍 Erros Comuns e Soluções

### "INSTALL_FAILED_INSUFFICIENT_STORAGE"
- **Causa**: Sem espaço
- **Solução**: Libere espaço no dispositivo

### "INSTALL_FAILED_UPDATE_INCOMPATIBLE"
- **Causa**: Versão anterior instalada
- **Solução**: Desinstale versão anterior primeiro

### "INSTALL_PARSE_FAILED_NO_CERTIFICATES"
- **Causa**: APK não assinado
- **Solução**: Gere APK debug novo (Build > Build APK(s))

### "INSTALL_FAILED_INVALID_APK"
- **Causa**: APK corrompido
- **Solução**: Gere APK novo

### "App não instalado" (sem erro específico)
- **Causa**: Permissões ou APK incompleto
- **Solução**: 
  1. Habilite "Fontes desconhecidas"
  2. Gere APK novo
  3. Tente instalar via ADB

---

## ✅ Passo a Passo Recomendado

### 1. Habilitar Fontes Desconhecidas
- Configurações > Segurança > Fontes desconhecidas (ativar)

### 2. Desinstalar Versão Anterior (se houver)
```bash
adb uninstall com.bibliaalmeida.app
```

### 3. Gerar APK Debug Novo
- Android Studio: Build > Clean Project
- Build > Build APK(s)

### 4. Instalar via ADB
```bash
adb install quasar-app\src-capacitor\android\app\build\outputs\apk\debug\app-debug.apk
```

### 5. Ver Erro (se falhar)
```bash
adb logcat -d | findstr "INSTALL"
```

---

## 📱 Verificar se APK Está Correto

```bash
# Verificar se arquivo existe e tamanho
dir quasar-app\src-capacitor\android\app\build\outputs\apk\debug\app-debug.apk

# Verificar assinatura do APK
apksigner verify --print-certs quasar-app\src-capacitor\android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 💡 Dicas

1. **Sempre use APK debug primeiro** - Mais fácil de instalar
2. **Instale via ADB** - Mostra erros específicos
3. **Verifique logs** - Ajuda a identificar o problema
4. **Libere espaço** - Muitas vezes é falta de espaço

---

## 🎯 Solução Rápida

```bash
# 1. Desinstalar versão anterior
adb uninstall com.bibliaalmeida.app

# 2. Instalar novo APK
adb install -r quasar-app\src-capacitor\android\app\build\outputs\apk\debug\app-debug.apk

# 3. Ver erro se falhar
adb logcat -d | findstr "INSTALL"
```

---

**Teste essas soluções e me diga qual erro específico aparece!** 🔍

