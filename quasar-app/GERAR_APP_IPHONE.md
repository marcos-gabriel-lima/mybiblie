# 📱 Gerar App para iPhone (iOS) - Quasar Framework

Guia completo para gerar app iOS usando Quasar Framework e Xcode.

## 📋 Pré-requisitos

1. **Mac com macOS** (obrigatório - iOS só compila no Mac)
2. **Xcode** instalado (da App Store)
3. **Xcode Command Line Tools**
4. **CocoaPods** (gerenciador de dependências iOS)

---

## 🚀 Passo a Passo

### Passo 1: Instalar Xcode

1. Abra a **App Store** no Mac
2. Procure por **"Xcode"**
3. Instale (é grande, ~15GB)
4. Abra o Xcode e aceite os termos
5. Instale componentes adicionais quando solicitado

### Passo 2: Instalar Command Line Tools

```bash
xcode-select --install
```

### Passo 3: Instalar CocoaPods

```bash
sudo gem install cocoapods
```

### Passo 4: Adicionar iOS ao Projeto Quasar

```bash
cd quasar-app
quasar mode add capacitor -T ios
```

Isso vai:
- Adicionar plataforma iOS
- Instalar dependências
- Criar projeto Xcode

### Passo 5: Build do Quasar para iOS

```bash
quasar build -m capacitor -T ios
```

### Passo 6: Abrir no Xcode

```bash
quasar dev -m capacitor -T ios
```

Ou manualmente:

```bash
cd src-capacitor
npx cap open ios
```

---

## 🍎 No Xcode

### 1. Configurar Assinatura

1. **Selecione o projeto** no navegador esquerdo
2. **Selecione o target "App"**
3. **Abra a aba "Signing & Capabilities"**
4. **Marque "Automatically manage signing"**
5. **Selecione seu Team** (Apple ID)
   - Se não tiver, crie uma conta Apple Developer (gratuita)

### 2. Selecionar Dispositivo

- No topo do Xcode, selecione um dispositivo:
  - **iPhone Simulator** (para testar)
  - **Seu iPhone conectado** (para instalar)

### 3. Executar no Simulador

1. **Clique no botão Play** (▶️) no topo
2. Ou pressione **Cmd + R**
3. O app abrirá no simulador

### 4. Executar no iPhone Físico

1. **Conecte seu iPhone** via USB
2. **Desbloqueie o iPhone**
3. **Confie no computador** (se aparecer popup)
4. **Selecione seu iPhone** no seletor de dispositivos
5. **Clique em Play** (▶️)
6. **No iPhone**: Vá em **Configurações > Geral > Gerenciamento de Dispositivos**
7. **Confie no desenvolvedor**

---

## 📦 Gerar IPA (Para Instalação)

### Opção 1: Archive (Para TestFlight/App Store)

1. **Product > Archive**
2. Aguarde compilar
3. **Window > Organizer** abrirá automaticamente
4. Selecione o archive
5. **Distribute App**
6. Escolha:
   - **App Store Connect** (para publicar)
   - **Ad Hoc** (para instalar em dispositivos específicos)
   - **Development** (para desenvolvimento)

### Opção 2: Build Direto (Para Teste)

1. **Product > Build** (Cmd + B)
2. O app será instalado no dispositivo/simulador selecionado

---

## 🔐 Configurar Certificados (Para Dispositivos Físicos)

### Conta Apple Developer Gratuita

1. Acesse: https://developer.apple.com
2. Faça login com Apple ID
3. Aceite os termos
4. No Xcode, selecione seu Team

### Conta Apple Developer Paga ($99/ano)

- Necessária apenas para publicar na App Store
- Para testar em dispositivos, a conta gratuita funciona

---

## 📱 Instalar no iPhone (Sem App Store)

### Método 1: Via Xcode (Direto)

1. Conecte iPhone via USB
2. No Xcode, selecione seu iPhone
3. Clique em **Play** (▶️)
4. O app será instalado automaticamente

### Método 2: Via TestFlight (Recomendado)

1. **Product > Archive**
2. **Distribute App > App Store Connect**
3. Faça upload
4. Acesse App Store Connect
5. Adicione testadores
6. Eles receberão link do TestFlight

### Método 3: Via Ad Hoc Distribution

1. **Product > Archive**
2. **Distribute App > Ad Hoc**
3. Selecione dispositivos (UDIDs)
4. Gere IPA
5. Instale via iTunes/Finder ou ferramentas como AltStore

---

## 🛠️ Comandos Úteis

```bash
# Adicionar iOS
quasar mode add capacitor -T ios

# Build para iOS
quasar build -m capacitor -T ios

# Abrir Xcode
quasar dev -m capacitor -T ios

# Ou manualmente
cd src-capacitor
npx cap open ios

# Sincronizar
cd src-capacitor
npx cap sync ios
```

---

## 📍 Estrutura do Projeto iOS

```
quasar-app/
├── src-capacitor/
│   ├── ios/              # Projeto Xcode
│   │   ├── App/
│   │   ├── App.xcodeproj
│   │   └── Podfile
│   └── capacitor.config.json
└── dist/spa/             # Build do Quasar
```

---

## ⚠️ Requisitos Importantes

1. **Mac obrigatório** - iOS não compila no Windows
2. **Xcode instalado** - Ferramenta oficial da Apple
3. **Apple ID** - Para assinar o app
4. **iPhone conectado** - Para instalar diretamente

---

## 🐛 Solução de Problemas

### Erro: "No signing certificate found"
- Configure "Automatically manage signing" no Xcode
- Selecione seu Team (Apple ID)

### Erro: "Device not trusted"
- No iPhone: Configurações > Geral > Gerenciamento de Dispositivos
- Confie no desenvolvedor

### Erro: "CocoaPods not found"
```bash
sudo gem install cocoapods
cd src-capacitor/ios
pod install
```

### Erro: "Provisioning profile"
- No Xcode: Signing & Capabilities
- Marque "Automatically manage signing"

---

## ✅ Checklist

- [ ] Mac disponível
- [ ] Xcode instalado
- [ ] CocoaPods instalado
- [ ] iOS adicionado ao projeto (`quasar mode add capacitor -T ios`)
- [ ] Build do Quasar feito (`quasar build -m capacitor -T ios`)
- [ ] Xcode aberto
- [ ] Assinatura configurada
- [ ] Dispositivo selecionado
- [ ] App executado

---

## 💡 Dicas

1. **Teste no Simulador primeiro** - Mais rápido
2. **Use TestFlight** - Melhor para distribuir para testadores
3. **Conta gratuita funciona** - Para desenvolvimento e teste
4. **Paga só se for publicar** - App Store requer conta paga

---

**Nota:** Para gerar app iOS, você **precisa de um Mac**. Não é possível compilar iOS no Windows.

