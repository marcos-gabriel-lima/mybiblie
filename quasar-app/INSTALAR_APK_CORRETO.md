# 📱 Como Instalar APK Corretamente no Android

## 🔍 Problema: "App não instalado"

Soluções passo a passo:

---

## ✅ Solução 1: Habilitar Fontes Desconhecidas

**No seu Android:**

1. **Configurações > Segurança**
2. Ative **"Fontes desconhecidas"** ou **"Instalar apps desconhecidos"**
3. Se aparecer lista, escolha o app que você está usando:
   - **Chrome** (se baixou pelo navegador)
   - **Gerenciador de Arquivos** (se abriu pelo arquivo)
   - **Downloads** (se abriu pela pasta Downloads)
4. **Ative a permissão**
5. **Tente instalar novamente**

**Android 8.0+:**
- Quando tentar instalar, o Android pedirá permissão automaticamente
- Clique em **"Permitir desta vez"** ou **"Permitir sempre"**

---

## ✅ Solução 2: Desinstalar Versão Anterior

Se você já tentou instalar antes:

**Via ADB (Recomendado):**
```bash
adb uninstall com.bibliaalmeida.app
```

**Ou manualmente:**
1. **Configurações > Apps**
2. Procure por "Bíblia" ou "biblia"
3. **Desinstale** se encontrar
4. Tente instalar novamente

---

## ✅ Solução 3: Instalar via ADB (Mais Confiável)

**Vantagens:**
- Mostra erro específico se falhar
- Mais confiável que instalação manual

**Passos:**

1. **Conectar celular via USB**
2. **Ativar Depuração USB:**
   - Configurações > Sobre o telefone
   - Toque 7 vezes em "Número da versão"
   - Volte: Configurações > Opções do desenvolvedor
   - Ative "Depuração USB"

3. **Instalar APK:**
```bash
# Encontrar o APK correto
cd C:\xampp\htdocs\biblia_almeida\quasar-app\src-capacitor\android

# Instalar APK debug (recomendado)
adb install app\build\outputs\apk\debug\app-debug.apk

# Se der erro, forçar instalação
adb install -r app\build\outputs\apk\debug\app-debug.apk
```

4. **Ver erro específico (se falhar):**
```bash
adb logcat -d | findstr "INSTALL"
```

---

## ✅ Solução 4: Verificar Qual APK Usar

**Use APK Debug (recomendado para testar):**
```
app/build/outputs/apk/debug/app-debug.apk
```

**NÃO use APK Release** se não tiver keystore configurado corretamente.

---

## 🔍 Verificar Erro Específico

Execute e me mostre o resultado:

```bash
# Ver logs de instalação
adb logcat -d | findstr "INSTALL_FAILED"

# Ou ver todos os erros
adb logcat -d | findstr "PackageManager"
```

Isso mostrará o motivo exato da falha.

---

## 📋 Checklist de Solução

- [ ] Fontes desconhecidas habilitadas
- [ ] Versão anterior desinstalada
- [ ] Espaço suficiente no dispositivo (50MB+)
- [ ] APK debug usado (não release)
- [ ] Tentou instalar via ADB
- [ ] Verificou logs de erro

---

## 💡 Dica

**Sempre instale via ADB primeiro** para ver o erro específico:

```bash
adb install app\build\outputs\apk\debug\app-debug.apk
```

Se aparecer erro, copie a mensagem e me envie!

---

**Teste essas soluções e me diga qual erro aparece!** 🔍

