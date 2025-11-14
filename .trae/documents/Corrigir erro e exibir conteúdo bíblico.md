## Diagnóstico
- Ao navegar para `leitura`/`leitura/book-1`, o navegador registra `SyntaxError: Invalid or unexpected token` e a navegação é abortada.
- Em páginas Server Components, estamos construindo objetos de fallback com propriedades não serializáveis (ex.: `Date`) que entram no stream RSC.
- Locais prováveis:
  - `nextjs_space/app/leitura/page.tsx`: função `getBooksFromJSON()` inclui `createdAt: new Date()`.
  - `nextjs_space/app/leitura/[bookId]/page.tsx`: função `getBookFromJSON()` inclui `createdAt: new Date()`.
- Isso pode corromper o payload RSC e causar o `SyntaxError` ao pré-carregar/abrir as páginas.

## Mudanças Propostas
1. Remover campos não serializáveis dos builders de fallback JSON (eliminar `createdAt: new Date()`).
2. Corrigir tipagem de `params` em componentes e rotas para objetos síncronos (remover `Promise` e `await params`).
3. Manter os IDs e estruturas compatíveis (sem alterar formato atual de `book-*`, `chapter-*`).
4. Garantir mensagens de erro claras e `notFound()` quando o fallback retornar `null`.

## Detalhes de Implementação
- `nextjs_space/app/leitura/page.tsx`
  - Em `getBooksFromJSON()`, remover a propriedade `createdAt` dos objetos de livro.
  - Manter apenas campos primitivos (`id`, `name`, `testament`, `order`, `chapters`).
- `nextjs_space/app/leitura/[bookId]/page.tsx`
  - Em `getBookFromJSON()`, remover `createdAt` do objeto `book` retornado.
  - Tipos de `Props`: alterar para `params: { bookId: string }` e remover `await params` ao obter `bookId`.
- `nextjs_space/app/api/chapters/[chapterId]/route.ts`
  - Ajustar assinatura do handler para `({ params }: { params: { chapterId: string } })` e remover `await params`.
- Revisão rápida
  - Confirmar que nenhuma outra função de fallback adiciona `Date` ou objetos complexos.

## Validação
- Rodar em desenvolvimento e acessar:
  - `http://localhost:3010/leitura` (lista de livros carregando via JSON se DB indisponível).
  - Clicar em um livro: `http://localhost:3010/leitura/book-1` (capítulos visíveis; sem erro RSC).
  - Abrir capítulo: `http://localhost:3010/leitura/book-1/chapter-1-1` (versículos mostram corretamente).
  - Console do browser sem `SyntaxError` e sem `ERR_ABORTED` na navegação.

## Considerações
- O modo JSON continuará funcional sem banco.
- Autenticação já está defensiva: o adapter só é aplicado se houver `prisma`.
- Se necessário, podemos melhorar a busca com índice em memória posteriormente, mas não é requisito para corrigir o erro atual.