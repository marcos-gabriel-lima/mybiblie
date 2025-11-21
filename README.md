# Bíblia Sagrada Almeida

Aplicativo de leitura da Bíblia Sagrada versão Almeida desenvolvido com Quasar Framework e Capacitor.

## Funcionalidades

- Leitura completa dos 66 livros da Bíblia
- Navegação por capítulos e versículos
- Interface moderna e responsiva
- Aplicativo Android nativo

## Tecnologias

- **Quasar Framework** - Framework Vue.js
- **Capacitor** - Build para Android/iOS
- **Vue 3** - Framework JavaScript

## Estrutura do Projeto

```
biblia_almeida/
├── quasar-app/          # Aplicação Quasar (principal)
│   ├── src/            # Código fonte
│   └── src-capacitor/  # Projeto Capacitor
├── nextjs_space/       # Versão Next.js (alternativa)
└── README.md
```

## Instalação

### Quasar App (Recomendado)

```bash
cd quasar-app
npm install
quasar dev
```

### Build para Android

```bash
cd quasar-app
quasar build -m capacitor -T android
```

Depois abra no Android Studio:
```bash
cd src-capacitor
npx cap open android
```

## Desenvolvedor

Marco Gabriel Lima
