
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bibliaData from '@/data/biblia_almeida_completa.json'

interface Props {
  params: { chapterId: string }
}

function getChapterFromJSON(chapterId: string) {
  try {
    // Extrair bookNumber e chapterNumber do ID (ex: "chapter-1-1" -> book: 1, chapter: 1)
    const match = chapterId.match(/chapter-(\d+)-(\d+)/)
    if (!match) {
      return null
    }
    
    const bookNumber = parseInt(match[1])
    const chapterNumber = parseInt(match[2])
    
    if (isNaN(bookNumber) || isNaN(chapterNumber) || bookNumber < 1 || bookNumber > 66) {
      return null
    }
    
    const livroData = bibliaData.livros[bookNumber - 1]
    if (!livroData) {
      return null
    }
    
    const capituloData = livroData.capitulos.find((cap: any) => cap.numero === chapterNumber)
    if (!capituloData) {
      return null
    }
    
    // Criar estrutura compatível com o que o banco retornaria
    const chapter = {
      id: chapterId,
      bookId: `book-${bookNumber}`,
      number: chapterNumber,
      verses: capituloData.versiculos.map((versiculo: any) => ({
        id: `verse-${bookNumber}-${chapterNumber}-${versiculo.numero}`,
        chapterId: chapterId,
        number: versiculo.numero,
        text: versiculo.texto,
      })),
      book: {
        id: `book-${bookNumber}`,
        name: livroData.nome,
        testament: livroData.testamento,
      },
    }
    
    return chapter
  } catch (error) {
    console.error('Erro ao carregar capítulo do JSON:', error)
    return null
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  try {
    const { chapterId } = await params

    if (!chapterId) {
      return NextResponse.json(
        { error: 'ID do capítulo é obrigatório' },
        { status: 400 }
      )
    }

    // Tentar buscar do banco se disponível
    if (prisma) {
      try {
        const chapter = await prisma.chapter.findUnique({
          where: { id: chapterId },
          include: {
            verses: {
              orderBy: { number: 'asc' },
            },
            book: {
              select: {
                id: true,
                name: true,
                testament: true,
              },
            },
          },
        })

        if (chapter) {
          return NextResponse.json(chapter)
        }
      } catch (error) {
        console.error('Erro ao buscar capítulo do banco, usando fallback JSON:', error)
      }
    }

    // Fallback: buscar do JSON
    const chapterFromJSON = getChapterFromJSON(chapterId)
    
    if (!chapterFromJSON) {
      return NextResponse.json(
        { error: 'Capítulo não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(chapterFromJSON)

  } catch (error) {
    console.error('Erro ao buscar capítulo:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
