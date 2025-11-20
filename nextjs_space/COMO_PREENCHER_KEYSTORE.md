# 🔐 Como Preencher a Tela de Keystore no Android Studio

## 📋 Passo a Passo para Gerar APK Assinado

### Opção 1: Criar Novo Keystore (Primeira Vez)

1. **Module**: 
   - Deixe como está: `biblia_almeida.app` (ou o nome do seu módulo)

2. **Key store path**:
   - Clique em **"Create new..."**
   - Escolha uma pasta segura (ex: `C:\Users\SeuUsuario\Documents\keystores\`)
   - Nome do arquivo: `biblia_almeida.jks` ou `biblia_almeida.keystore`
   - Clique em **Salvar**

3. **Preencha os dados do Keystore**:
   - **Password**: Crie uma senha forte (ex: `MinhaSenh@123!`)
   - **Confirm**: Digite a senha novamente
   - ⚠️ **IMPORTANTE**: Anote essa senha em local seguro!

4. **Preencha os dados da Key**:
   - **Alias**: `biblia_almeida` (ou outro nome)
   - **Password**: Pode ser a mesma do keystore ou diferente
   - **Validity (years)**: `25` (padrão)
   - **Certificate**:
     - **First and Last Name**: `Marco Gabriel Lima` (ou seu nome)
     - **Organizational Unit**: `Desenvolvimento` (opcional)
     - **Organization**: `Bíblia Almeida App` (opcional)
     - **City or Locality**: Sua cidade
     - **State or Province**: Seu estado
     - **Country Code (XX)**: `BR` (para Brasil)

5. **Clique em OK**

6. **Volte à tela anterior e preencha**:
   - **Key store password**: A senha que você criou
   - **Key alias**: `biblia_almeida` (o mesmo que você colocou)
   - **Key password**: A senha da key (pode ser a mesma do keystore)
   - ✅ **Marque "Remember passwords"** (opcional, mas facilita)

7. **Clique em Next**

8. **Selecione**:
   - ✅ **APK** (para instalar diretamente)
   - Ou **Android App Bundle** (para Play Store)

9. **Build Variants**:
   - Selecione **release**

10. **Clique em Finish**

---

## Opção 2: Usar Keystore Existente

Se você já tem um keystore:

1. **Key store path**:
   - Clique em **"Choose existing..."**
   - Navegue até o arquivo `.jks` ou `.keystore`
   - Selecione o arquivo

2. **Preencha**:
   - **Key store password**: Senha do keystore
   - **Key alias**: Nome do alias (geralmente `biblia_almeida` ou similar)
   - **Key password**: Senha da key (pode ser a mesma do keystore)
   - ✅ **Marque "Remember passwords"**

3. **Clique em Next** e siga os passos 8-10 acima

---

## 📝 Exemplo de Valores

```
Module: biblia_almeida.app
Key store path: C:\Users\SeuUsuario\Documents\biblia_almeida.jks
Key store password: MinhaSenh@123!
Key alias: biblia_almeida
Key password: MinhaSenh@123!
Remember passwords: ✅ (marcado)
```

---

## ⚠️ IMPORTANTE

1. **Guarde o keystore e as senhas em local seguro!**
   - Sem eles, você NÃO poderá atualizar o app na Play Store
   - Faça backup do arquivo `.jks` ou `.keystore`

2. **Não compartilhe o keystore**
   - É como uma assinatura digital do seu app

3. **Use a mesma keystore para todas as atualizações**
   - Se perder, terá que criar novo app na Play Store

---

## 🎯 Próximos Passos

Após clicar em **Finish**:
- O Android Studio vai compilar o APK
- O APK estará em: `android/app/build/outputs/apk/release/app-release.apk`
- Você pode instalar no dispositivo ou enviar para a Play Store

---

## 💡 Dica

Se você já gerou um keystore antes (com Bubblewrap ou manualmente), use o mesmo arquivo para manter a consistência.

