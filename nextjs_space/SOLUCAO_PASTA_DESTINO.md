# 🔧 Solução: "The destination folder does not exist or is not writeable"

## ❌ Erro

```
The destination folder does not exist or is not writeable
C:\xampp\htdocs\biblia_almeida\app\build\apk
```

## ✅ Solução Rápida

### Passo 1: Fechar o Erro

1. **Clique em "OK"** no diálogo de erro

### Passo 2: Corrigir o Caminho de Destino

1. **No campo "Destination Folder":**
   - Clique no **ícone de pasta** ao lado do campo
   - OU **delete o caminho** e deixe vazio (Android Studio usará o padrão)
   - OU use o caminho correto do projeto:

2. **Caminho Correto (se quiser especificar):**
   ```
   C:\xampp\htdocs\biblia_almeida\nextjs_space\android\app\build\outputs\apk\release
   ```

3. **OU Deixe Vazio:**
   - Delete o caminho do campo
   - Deixe em branco
   - Android Studio usará automaticamente a pasta correta do projeto

### Passo 3: Verificar Build Variant

- Certifique-se que **"release"** está selecionado (já está)

### Passo 4: Criar APK

1. **Clique em "Create"** (botão azul)
2. O APK será gerado na pasta padrão do projeto

---

## 🎯 Solução Mais Simples

**Deixe o campo "Destination Folder" VAZIO!**

1. **Delete o caminho** que está no campo
2. **Deixe em branco**
3. **Clique em "Create"**
4. O Android Studio salvará automaticamente em:
   ```
   nextjs_space/android/app/build/outputs/apk/release/app-release.apk
   ```

---

## 📍 Onde o APK Será Salvo (Padrão)

Se você deixar o campo vazio, o APK será salvo em:

```
C:\xampp\htdocs\biblia_almeida\nextjs_space\android\app\build\outputs\apk\release\app-release.apk
```

---

## 🔍 Verificar se APK Foi Gerado

Após clicar em "Create" e aguardar:

```bash
cd C:\xampp\htdocs\biblia_almeida\nextjs_space
dir android\app\build\outputs\apk\release
```

Se aparecer `app-release.apk`, está tudo certo!

---

## 💡 Dica

**Sempre deixe o campo "Destination Folder" vazio** quando gerar APK no Android Studio. Ele automaticamente usa a pasta correta do projeto.

---

## ✅ Resumo

1. ✅ Clique em "OK" no erro
2. ✅ Delete o caminho do campo "Destination Folder" (deixe vazio)
3. ✅ Clique em "Create"
4. ✅ APK será gerado na pasta padrão

