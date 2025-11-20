## Objetivo
Migrar o app atual (Next.js) para Quasar (Vue 3) com PWA, mantendo leitura/busca da Bíblia via JSON, e gerar um APK pelo Android Studio.

## Arquitetura Quasar
- SPA + PWA (Workbox) com cache offline dos JSON e páginas.
- Vue Router com rotas:
  - `/` (Home)
  - `/leitura` (lista de livros)
  - `/leitura/:bookId` (capítulos do livro)
  - `/leitura/:bookId/:chapterId` (versículos)
  - `/busca` (pesquisa)
- Estado leve com Pinia (opcional) para preferências (tema, fonte, últimos acessos).
- Componentes Quasar (QLayout, QHeader, QBtn, QCard, QBadge, QIcon, QInput, QSpinner).

## Migração de Dados
- Reutilizar `biblia_almeida_completa.json` e `livros_info.json` em `src/assets/data`.
- Manter convenção de IDs: `book-<n>`, `chapter-<n>-<m>`, `verse-<n>-<m>-<k>`.
- Criar composable `useBible.ts` com:
  - `getBooks()` (JSON)
  - `getBook(bookId)` (JSON)
  - `getChapter(chapterId)` (JSON)
  - `searchVerses(query, limit)` (varredura simples; opcional índice em memória para acelerar).

## Telas
- Home: atalhos para Leitura e Busca, contadores (livros/capítulos), tema claro/escuro.
- Leitura: grid de livros com contagem de capítulos; badge por testamento.
- Livro: grid de capítulos com contagem de versículos.
- Capítulo: lista de versículos com número e texto; controle de tamanho de fonte; navegação de retorno.
- Busca: input com resultados listados (livro cap:verso), destaque do termo, link para capítulo.

## PWA e Performance
- Workbox: pre-cache de shell e JSON; cache-first para dados estáticos; network-first para páginas.
- Lazy-load de rotas para reduzir TTI.
- Web Worker opcional para indexação da busca se necessário (etapa futura).

## Android (APK) via Android Studio
- Adicionar Capacitor no Quasar:
  - `quasar mode add capacitor`
  - Configurar `capacitor.config.ts` (nome do app, id do pacote, ícones).
- Build: `quasar build -m capacitor -T android`.
- Abrir no Android Studio: `npx cap open android`.
- Assinatura: Generate Signed APK/AAB com sua keystore.
- Publicação do link: subir `app-release.apk` (GitHub Releases, S3, ou seu domínio) e compartilhar URL.

## Extras
- Tema escuro com `this.$q.dark.set(true/false)` e persistência em LocalStorage.
- Internacionalização (opcional) com `vue-i18n` para labels.
- Autenticação: manter fora (modo JSON) por simplicidade; integrar depois se desejar backend.

## Entregáveis
- Projeto Quasar com PWA funcional, telas equivalentes.
- APK gerado e pronto para download.
- Instruções de publicação do link para usuários.

Confirma a migração para Quasar nestes termos? Ao aprovar, inicio a criação do projeto, portando as telas e dados e gerando o APK para disponibilizarmos o link de download.