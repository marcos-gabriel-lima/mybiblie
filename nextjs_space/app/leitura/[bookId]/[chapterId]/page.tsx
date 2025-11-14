
import { Book, ChevronRight, Home, BookOpen, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { prisma } from '@/lib/db'
import bibliaData from '@/data/biblia_almeida_completa.json'

interface Verse {
  id: string
  number: number
  text: string
}

interface Chapter {
  id: string
  number: number
  verses: Verse[]
  book: {
    id: string
    name: string
    testament: string
  }
}

interface Props {
  params: { bookId: string; chapterId: string }
}

interface Chapter {
  id: string
  number: number
  verses: { id: string; number: number; text: string }[]
  book: { id: string; name: string; testament: string }
}

function getChapterFromJSON(chapterId: string): Chapter | null {
  const match = chapterId.match(/chapter-(\d+)-(\d+)/)
  if (!match) return null
  const bookNumber = parseInt(match[1])
  const chapterNumber = parseInt(match[2])
  const livroData = bibliaData.livros[bookNumber - 1]
  if (!livroData) return null
  const capituloData = livroData.capitulos.find((cap: any) => cap.numero === chapterNumber)
  if (!capituloData) return null
  return {
    id: chapterId,
    number: chapterNumber,
    verses: capituloData.versiculos.map((v: any) => ({
      id: `verse-${bookNumber}-${chapterNumber}-${v.numero}`,
      number: v.numero,
      text: v.texto,
    })),
    book: {
      id: `book-${bookNumber}`,
      name: livroData.nome,
      testament: livroData.testamento,
    },
  }
}

export const revalidate = 3600

export default async function ChapterPage({ params }: Props) {
  const { chapterId } = params
  let chapter: Chapter | null = null

  if (prisma) {
    try {
      const dbChapter = await prisma.chapter.findUnique({
        where: { id: chapterId },
        include: {
          verses: { orderBy: { number: 'asc' } },
          book: { select: { id: true, name: true, testament: true } },
        },
      })
      if (dbChapter) {
        chapter = {
          id: dbChapter.id,
          number: dbChapter.number,
          verses: dbChapter.verses.map((v) => ({ id: v.id, number: v.number, text: v.text })),
          book: dbChapter.book,
        }
      }
    } catch {}
  }

  if (!chapter) {
    chapter = getChapterFromJSON(chapterId)
  }

  // Garantir consistência de IDs para navegação
  const bookId = chapter.book.id

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Capítulo não encontrado</p>
          <Link href="/leitura">
            <Button>Voltar à Leitura</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4 text-sm">
            <Link href="/" className="flex items-center space-x-2 hover:text-primary">
              <Home className="h-4 w-4" />
              <span>Início</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            <Link href="/leitura" className="hover:text-primary">
              <span>Leitura</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            <Link href={`/leitura/${bookId}`} className="hover:text-primary">
              <span>{chapter.book.name}</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            <span className="font-semibold text-primary">
              Capítulo {chapter.number}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Chapter Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              {chapter.book.name} {chapter.number}
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Badge variant="secondary">
              {chapter.book.testament} Testamento
            </Badge>
            <Badge variant="outline">
              {chapter.verses?.length || 0} Versículos
            </Badge>
          </div>
        </div>

        {/* Chapter Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="space-y-4">
              {chapter.verses?.map((verse) => (
                <div
                  key={verse.id}
                  className="group relative p-4 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-bold text-primary bg-primary/10 rounded-full">
                        {verse.number}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p 
                        className="text-foreground leading-relaxed"
                        style={{ fontSize: `18px`, lineHeight: 1.7 }}
                      >
                        {verse.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href={`/leitura/${bookId}`}>
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar aos Capítulos
            </Button>
          </Link>
          
          <div className="flex gap-4">
            <Link href="/busca">
              <Button variant="outline">
                <Book className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </Link>
          </div>
        </div>

        {/* Chapter Info */}
        <div className="mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 text-center">
              <h3 className="text-lg font-semibold mb-4">
                {chapter.book.name} - Capítulo {chapter.number}
              </h3>
              <div className="text-sm text-muted-foreground">
                {chapter.verses?.length || 0} versículos • {chapter.book.testament} Testamento
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
