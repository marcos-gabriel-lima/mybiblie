## Diagnóstico
- A lentidão ao entrar em livros/capítulos vem de tentativas de acesso ao banco com Prisma que expiram antes de cair no JSON (timeout de pool). Isso ocorre mesmo em modo local sem banco conectado.
- Páginas como `Leitura` e `Livro` tentam buscar no banco primeiro; quando a conexão falha, só então usam o fallback JSON, adicionando vários segundos.
- O capítulo atualmente carrega via página client-side e faz requisição à API, adicionando um round-trip desnecessário.

## Melhorias Propostas
1. **Detecção rápida de disponibilidade do banco**
   - No `lib/db.ts`, tentar `prisma.$connect()` com timeout curto (ex.: 1000ms); se falhar, exportar `prisma = null`.
   - Adicionar suporte a `USE_JSON_ONLY=true` para forçar modo JSON em todo o app.
2. **Evitar chamadas ao banco quando indisponível**
   - Páginas/rotas já verificam `if (prisma)`, mas com a detecção de conectividade o `prisma` será `null` e o fallback será imediato.
3. **Renderização no servidor para capítulos**
   - Converter `app/leitura/[bookId]/[chapterId]/page.tsx` para Server Component e carregar o capítulo diretamente (JSON/DB) sem chamada à API, eliminando o round-trip.
4. **Cache leve**
   - Adicionar `export const revalidate = 3600` para páginas de leitura em modo JSON, permitindo cache por 1h e resposta mais rápida.
5. **Mensagens claras de modo**
   - Opcional: exibir badge “Modo JSON (sem banco)” em `Leitura` quando `USE_JSON_ONLY=true`, para evitar expectativa de recursos de conta.

## Passos de Implementação
- Atualizar `lib/db.ts` com teste de conectividade e suporte a `USE_JSON_ONLY`.
- Ajustar `Leitura`/`Livro` para se beneficiar do `prisma=null` imediato (sem mudanças funcionais adicionais).
- Tornar `Capítulo` Server Component e reutilizar a função de obtenção do capítulo usada na API.
- Adicionar `revalidate` nas páginas relevantes.

## Validação
- Iniciar em desenvolvimento (`npm run dev`).
- Acessar `http://localhost:3010/leitura` e medir tempo de carregamento (deve ser imediato).
- Navegar para `book-1` e `chapter-1-1`; sem atrasos perceptíveis.
- Verificar logs: nenhuma mensagem de timeout de Prisma.

## Impacto
- Reduz drasticamente o tempo de entrada em leitura/capítulos em ambientes sem banco.
- Mantém compatibilidade quando o banco estiver funcional, usando DB normalmente.
- Não altera IDs nem estrutura de dados já corrigidos, preservando navegação e links.