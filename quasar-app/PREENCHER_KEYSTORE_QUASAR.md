# 🔐 Como Preencher a Tela de Keystore - Quasar

## 📋 Passo a Passo Visual

### Passo 1: Criar Novo Keystore

1. **No campo "Key store path"** (que está destacado):
   - Clique no botão **"Create new..."**

2. **Na janela que abrir:**
   - Escolha uma pasta segura (ex: `C:\Users\SeuUsuario\Documents\`)
   - **Nome do arquivo**: `biblia_almeida.jks`
   - ⚠️ **IMPORTANTE**: Deve terminar em `.jks`
   - Clique em **"Salvar"**

### Passo 2: Preencher Dados do Keystore

Na tela de criação do keystore:

**Password:**
- Crie uma senha forte (ex: `MinhaSenh@123!`)
- Anote em local seguro!

**Confirm:**
- Digite a mesma senha novamente

**Alias:**
- Digite: `biblia_almeida`
- Não use `key0` ou outros nomes genéricos

**Password (da Key):**
- Pode ser a mesma do keystore ou diferente
- Recomendo usar a mesma para facilitar

**Validity (years):**
- Deixe `25` (padrão)

**Certificate:**
- **First and Last Name**: Seu nome completo
- **Organization**: `Bíblia Almeida App`
- **City or Locality**: Sua cidade
- **State or Province**: Seu estado
- **Country Code**: `BR`

3. **Clique em "OK"**

### Passo 3: Voltar à Tela Principal

Agora você volta à tela inicial e deve preencher:

**Key store path:**
- Já deve estar preenchido com: `C:\Users\SeuUsuario\Documents\biblia_almeida.jks`

**Key store password:**
- Digite a senha que você criou

**Key alias:**
- Digite: `biblia_almeida`

**Key password:**
- Digite a mesma senha do keystore

**Remember passwords:**
- ✅ **Marque** essa opção (facilita próximas vezes)

### Passo 4: Continuar

1. **Clique em "Next"** (botão azul)

2. **Na próxima tela:**
   - Selecione ✅ **APK**
   - Build variant: **release**
   - Destination Folder: **Deixe vazio** (padrão)

3. **Clique em "Create"**

---

## ✅ Exemplo de Valores Preenchidos

```
Module: android.app
Key store path: C:\Users\SeuUsuario\Documents\biblia_almeida.jks
Key store password: MinhaSenh@123!
Key alias: biblia_almeida
Key password: MinhaSenh@123!
Remember passwords: ✅ (marcado)
```

---

## 📍 Onde o APK Será Salvo

Após clicar em "Create", o APK será salvo em:

```
quasar-app/src-capacitor/android/app/build/outputs/apk/release/app-release.apk
```

---

## ⚠️ IMPORTANTE

1. **Guarde o arquivo `.jks` e a senha em local seguro!**
   - Você precisará deles para atualizar o app na Play Store

2. **Use sempre o mesmo keystore** para atualizações

3. **Não compartilhe o keystore** com ninguém

---

## 🎯 Resumo Rápido

1. ✅ Clique em **"Create new..."**
2. ✅ Escolha pasta segura
3. ✅ Nome: `biblia_almeida.jks`
4. ✅ Preencha senha e dados
5. ✅ Alias: `biblia_almeida`
6. ✅ Volte e preencha as senhas
7. ✅ Clique em **"Next"**
8. ✅ Selecione **APK** e **release**
9. ✅ Clique em **"Create"**

---

**Siga esses passos e o APK será gerado com sucesso!** 🎉

