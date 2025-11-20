## Visão Geral

* Vamos gerar um projeto Android (APK) a partir da sua PWA usando Trusted Web Activity (TWA), abrindo seu site em modo app.

* O TWA (via Bubblewrap) cria um projeto Android completo que você abre e compila no Android Studio.

* Alternativa se você não tiver domínio HTTPS: Capacitor com `server.url` (WebView), também gera projeto para Android Stu
  dio.

## Pré‑requisitos

1. Publicar seu app em um domínio HTTPS (ex.: Vercel). Use `NEXTAUTH_URL` apontando para o domínio.
2. Manifest PWA OK (já está): `display: "standalone"`, `start_url: "/"`, `theme_color`, ícones.
3. Preparar uma keystore para assinar o APK (necessária para vincular domínio).

## Passos (TWA com Bubblewrap)

1. Instalar Bubblewrap CLI:

* `npm i -g @bubblewrap/cli`

1. Inicializar projeto Android a partir do manifest público:

* `bubblewrap init --manifest=https://SEU-DOMINIO/manifest.json`

* Preencha `applicationId` (ex.: `com.seudominio.bibliaalmeida`), nome do app, etc.

1. Gerar/usar keystore de assinatura:

* Gerar: `bubblewrap sign --generate --ksFile ./keystore.jks --alias bibliaalmeida`

1. Obter SHA256 da assinatura:

* `keytool -list -v -keystore ./keystore.jks -alias bibliaalmeida`

* Copie o fingerprint SHA256.

1. Criar `/.well-known/assetlinks.json` no seu domínio:

* Conteúdo:

  * `{ "relation": ["delegate_permission/common.handle_all_urls"], "target": { "namespace": "android_app", "package_name": "com.seudominio.bibliaalmeida", "sha256_cert_fingerprints": ["SEU_SHA256_AQUI"] } }`

1. Build do APK:

* `bubblewrap build` (gera projeto Android + APK em `build/app-release.apk`).

1. Abrir no Android Studio:

* Abra a pasta do projeto gerado pelo Bubblewrap.

* Configure assinatura em Build > Generate Signed Bundle/APK (opcional se quiser AAB/PLAY).

* Execute em emulador/dispositivo.

## Validação

* Instalar em dispositivo (`adb install build/app-release.apk`).

* Abrir o app; deve carregar seu site PWA em modo app.

* Se houver erro de verificação do domínio, confirme `assetlinks.json` acessível e fingerprint correto.

## Alternativa (sem domínio HTTPS)

1. Capacitor + Android Studio (WebView com URL externa):

* `npm i @capacitor/core @capacitor/android`

* Configurar `capacitor.config.ts` com `server: { url: "https://SEU-DOMINIO" }`.

* `npx cap add android`

* `npx cap open android` (abre no Android Studio) e gera APK.

* Observação: sem domínio, pode apontar para IP local em rede, mas é menos estável. Para offline, seria preciso um service worker robusto.

## Entregáveis

* Projeto Android pronto para Android Studio.

* APK `app-release.apk` assinado.

* Instruções para publicar na Play Store (AAB) se desejar.

## Próximo Passo

* Confirme se já possui domínio HTTPS publicado. Se sim, seguimos com TWA/Bubblewrap; se não, seguimos com Capacitor/URL externa e depois migramos para TWA.

