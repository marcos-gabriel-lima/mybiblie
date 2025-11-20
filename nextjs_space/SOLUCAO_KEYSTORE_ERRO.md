# 🔐 Solução: Erro de Keystore no Android Studio

## ❌ Erro Encontrado

```
Failed to read key key0 from store "C:\xampp\htdocs\biblia_almeida\app\build\apk": 
keystore password was incorrect
```

## 🎯 Soluções

### ✅ Solução 1: Gerar APK Debug (Mais Rápido - SEM Assinatura)

**APK Debug não precisa de keystore!**

1. **No Android Studio:**
   - **Build > Build Bundle(s) / APK(s) > Build APK(s)**
   - **NÃO** use "Generate Signed Bundle/APK"
   - Use apenas "Build APK(s)"

2. **O APK estará em:**
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

3. **Este APK funciona normalmente!**
   - Pode instalar no dispositivo
   - Pode testar tudo
   - Só não pode publicar na Play Store (precisa de release assinado)

---

### ✅ Solução 2: Corrigir Keystore (Para APK Release)

#### Opção A: Criar Novo Keystore Corretamente

1. **No Android Studio:**
   - **Build > Generate Signed Bundle / APK**
   - Selecione **APK**
   - Clique em **"Create new..."** (não use o caminho antigo)

2. **Escolha um local seguro:**
   - Exemplo: `C:\Users\SeuUsuario\Documents\biblia_almeida.jks`
   - **NÃO** use dentro da pasta do projeto

3. **Preencha:**
   - **Password**: Crie uma senha forte
   - **Alias**: `biblia_almeida`
   - **Key password**: Pode ser a mesma do keystore
   - ✅ **Marque "Remember passwords"**

4. **Continue e gere o APK**

#### Opção B: Remover Configuração de Keystore Antiga

1. **Verificar arquivo `android/app/build.gradle`**

   Procure por algo como:
   ```gradle
   signingConfigs {
       release {
           storeFile file('C:\\xampp\\htdocs\\biblia_almeida\\app\\build\\apk')
           // ...
       }
   }
   ```

2. **Remover ou comentar essa seção**

3. **Ou criar keystore novo** (Solução A acima)

---

### ✅ Solução 3: Limpar e Rebuild

1. **No Android Studio:**
   - **Build > Clean Project**
   - Aguarde terminar

2. **Build > Rebuild Project**
   - Aguarde terminar

3. **Tente gerar APK Debug novamente:**
   - **Build > Build Bundle(s) / APK(s) > Build APK(s)**

---

## 🚀 Passo a Passo Recomendado (APK Debug)

### 1. Limpar Projeto

No Android Studio:
- **Build > Clean Project**

### 2. Gerar APK Debug

- **Build > Build Bundle(s) / APK(s) > Build APK(s)**
- **NÃO** selecione "Generate Signed Bundle/APK"
- Apenas "Build APK(s)"

### 3. Localizar APK

Após compilar, clique em **"locate"** na notificação, ou vá em:

```
nextjs_space/android/app/build/outputs/apk/debug/app-debug.apk
```

### 4. Instalar

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🔍 Verificar Arquivo build.gradle

Se o erro persistir, verifique:

**Arquivo:** `nextjs_space/android/app/build.gradle`

Procure por `signingConfigs` e veja se há algo errado. Se houver, comente ou remova:

```gradle
// Comentar isso se estiver causando problema
/*
signingConfigs {
    release {
        // ...
    }
}
*/
```

---

## 💡 Dica Importante

**Para testar o app, use APK Debug!**
- ✅ Funciona normalmente
- ✅ Não precisa de keystore
- ✅ Pode instalar e testar
- ❌ Não pode publicar na Play Store (mas isso é depois)

**Para Play Store, você precisará:**
- APK Release assinado
- Keystore válido
- Mas isso pode ser feito depois, quando for publicar

---

## ✅ Resumo Rápido

1. **Build > Clean Project**
2. **Build > Build Bundle(s) / APK(s) > Build APK(s)** (NÃO o "Generate Signed")
3. **Clique em "locate"** na notificação
4. **APK pronto!**

