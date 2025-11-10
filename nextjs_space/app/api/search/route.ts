
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bibliaData from '@/data/biblia_almeida_completa.json'

function searchInJSON(query: string, limit: number = 100) {
  const queryLower = query.toLowerCase()
  const results: any[] = []
  
  for (const livro of bibliaData.livros) {
    for (const capitulo of livro.capitulos) {
      for (const versiculo of capitulo.versiculos) {
        if (versiculo.texto.toLowerCase().includes(queryLower)) {
          results.push({
            id: `verse-${livro.ordem}-${capitulo.numero}-${versiculo.numero}`,
            chapterId: `chapter-${livro.ordem}-${capitulo.numero}`,
            number: versiculo.numero,
            text: versiculo.texto,
            chapter: {
              id: `chapter-${livro.ordem}-${capitulo.numero}`,
              bookId: `book-${livro.ordem}`,
              number: capitulo.numero,
              book: {
                id: `book-${livro.ordem}`,
                name: livro.nome,
                testament: livro.testamento,
              },
            },
          })
          
          if (results.length >= limit) {
            return results
          }
        }
      }
    }
  }
  
  return results
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json(
        { error: 'Termo de busca é obrigatório' },
        { status: 400 }
      )
    }

    if (query.length < 2) {
      return NextResponse.json(
        { error: 'Termo de busca deve ter pelo menos 2 caracteres' },
        { status: 400 }
      )
    }

    // Tentar buscar no banco primeiro se disponível
    if (prisma) {
      try {
        const verses = await prisma.verse.findMany({
          where: {
            text: {
              contains: query,
              mode: 'insensitive',
            },
          },
          include: {
            chapter: {
              include: {
                book: {
                  select: {
                    id: true,
                    name: true,
                    testament: true,
                  },
                },
              },
            },
          },
          orderBy: [
            { chapter: { book: { order: 'asc' } } },
            { chapter: { number: 'asc' } },
            { number: 'asc' },
          ],
          take: 100,
        })

        if (verses && verses.length > 0) {
          return NextResponse.json({
            verses,
            count: verses.length,
            query,
          })
        }
      } catch (error) {
        console.error('Erro ao buscar no banco, usando fallback JSON:', error)
      }
    }

    // Fallback: buscar no JSON
    const verses = searchInJSON(query, 100)

    return NextResponse.json({
      verses,
      count: verses.length,
      query,
    })

  } catch (error) {
    console.error('Erro na busca:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
