# 🔧 Solução: "No key with alias 'biblia_almeida' found in keystore"

## ❌ Problema

O Android Studio está tentando usar um keystore inválido no caminho:
```
C:\xampp\htdocs\biblia_almeida\app\build\apk
```

Este caminho **NÃO é um arquivo de keystore válido**. Um keystore deve ser um arquivo `.jks` ou `.keystore`.

## ✅ Solução Rápida: Criar Novo Keystore

### Passo 1: Limpar Configuração Antiga

1. **Feche a janela atual** (clique em Cancel)

2. **No Android Studio:**
   - **File > Invalidate Caches / Restart**
   - Selecione **"Invalidate and Restart"**
   - Aguarde reiniciar

### Passo 2: Criar Novo Keystore

1. **Build > Generate Signed Bundle / APK**

2. **Selecione APK** e clique em **Next**

3. **Key store path:**
   - Clique em **"Create new..."**
   - **NÃO** use o caminho antigo!
   - Escolha uma pasta segura: `C:\Users\SeuUsuario\Documents\`
   - Nome do arquivo: `biblia_almeida.jks`
   - **IMPORTANTE**: Deve terminar em `.jks`
   - Clique em **Salvar**

4. **Preencha os dados do Keystore:**
   ```
   Password: MinhaSenh@123! (crie uma senha forte)
   Confirm: MinhaSenh@123! (digite novamente)
   ```

5. **Preencha os dados da Key:**
   ```
   Alias: biblia_almeida
   Password: MinhaSenh@123! (pode ser a mesma)
   Validity (years): 25
   ```

6. **Preencha Certificate:**
   ```
   First and Last Name: Seu Nome
   Organizational Unit: (opcional)
   Organization: Bíblia Almeida App
   City or Locality: Sua Cidade
   State or Province: Seu Estado
   Country Code (XX): BR
   ```

7. **Clique em OK**

8. **Volte à tela anterior e preencha:**
   ```
   Key store password: MinhaSenh@123!
   Key alias: biblia_almeida
   Key password: MinhaSenh@123!
   Remember passwords: ✅ (marque)
   ```

9. **Clique em Next**

10. **Selecione:**
    - ✅ **APK**
    - Build variant: **release**

11. **Clique em Finish**

---

## 🚀 Solução Alternativa: APK Debug (Mais Rápido)

Se você só quer testar o app, **não precisa de keystore**:

1. **Feche a janela** (Cancel)

2. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
   - **NÃO** use "Generate Signed Bundle/APK"
   - Use apenas "Build APK(s)"

3. **Aguarde compilar**

4. **Clique em "locate"** na notificação

5. **APK estará em:**
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

**Este APK funciona normalmente para testar!**

---

## 🔍 Verificar se Keystore Foi Criado

Após criar, verifique se o arquivo existe:

```bash
dir C:\Users\SeuUsuario\Documents\biblia_almeida.jks
```

Se aparecer o arquivo, está correto!

---

## ⚠️ Importante

1. **Guarde o arquivo `.jks` e a senha em local seguro!**
   - Sem eles, você não poderá atualizar o app na Play Store

2. **Use sempre o mesmo keystore** para atualizações

3. **Não compartilhe o keystore** com ninguém

---

## 📝 Checklist

- [ ] Fechou a janela antiga
- [ ] Clicou em "Create new..."
- [ ] Escolheu pasta segura (ex: Documents)
- [ ] Nome do arquivo termina em `.jks`
- [ ] Preencheu todos os dados
- [ ] Alias é `biblia_almeida` (não `key0`)
- [ ] Senhas são fortes e anotadas
- [ ] Clicou em Finish

---

## 💡 Dica

**Para desenvolvimento/teste:** Use APK Debug (não precisa de keystore)

**Para Play Store:** Use APK Release assinado (precisa de keystore válido)

