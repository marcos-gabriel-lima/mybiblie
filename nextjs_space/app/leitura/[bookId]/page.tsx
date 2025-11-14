
import { Book, ChevronRight, Home, BookOpen, Scroll } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { prisma } from '@/lib/db'
import bibliaData from '@/data/biblia_almeida_completa.json'

async function getBookWithChapters(bookId: string) {
  // Tentar buscar do banco se disponível
  if (prisma) {
    try {
      const book = await prisma.book.findUnique({
        where: { id: bookId },
        include: {
          chapters: {
            orderBy: { number: 'asc' },
            include: {
              _count: {
                select: { verses: true }
              }
            }
          },
        },
      })
      
      if (book) {
        return book
      }
    } catch (error) {
      console.error('Erro ao buscar livro do banco, usando fallback JSON:', error)
    }
  }
  
  // Fallback: buscar do JSON
  return getBookFromJSON(bookId)
}

function getBookFromJSON(bookId: string) {
  try {
    // Extrair o número do livro do ID (ex: "book-1" -> 1)
    const bookNumber = parseInt(bookId.replace('book-', ''))
    
    if (isNaN(bookNumber) || bookNumber < 1 || bookNumber > 66) {
      return null
    }
    
    const livroData = bibliaData.livros[bookNumber - 1]
    
    if (!livroData) {
      return null
    }
    
    // Criar estrutura compatível com o que o banco retornaria
    const book = {
      id: `book-${bookNumber}`,
      name: livroData.nome,
      testament: livroData.testamento,
      order: bookNumber,
      chapters: livroData.capitulos.map((capitulo: any) => ({
        id: `chapter-${bookNumber}-${capitulo.numero}`,
        bookId: `book-${bookNumber}`,
        number: capitulo.numero,
        _count: {
          verses: capitulo.versiculos?.length || 0
        }
      }))
    }
    
    return book
  } catch (error) {
    console.error('Erro ao carregar livro do JSON:', error)
    return null
  }
}

interface Props {
  params: { bookId: string }
}

export default async function BookPage({ params }: Props) {
  const { bookId } = params
  const book = await getBookWithChapters(bookId)

  if (!book) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span className="font-medium">Início</span>
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link href="/leitura" className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">Leitura</span>
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <Book className="h-5 w-5 text-primary" />
              <span className="font-semibold">{book.name}</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Book Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Scroll className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">{book.name}</h1>
          </div>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Badge variant="secondary" className="text-base px-4 py-2">
              {book.testament} Testamento
            </Badge>
            <Badge variant="outline" className="text-base px-4 py-2">
              {book.chapters?.length || 0} Capítulos
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecione um capítulo para começar sua leitura do livro de {book.name}
          </p>
        </div>

        {/* Chapters Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Capítulos
          </h2>
          
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {book.chapters?.map((chapter) => (
              <Link key={chapter.id} href={`/leitura/${book.id}/${chapter.id}`}>
                <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105">
                  <CardContent className="p-4 text-center">
                    <div className="mb-2">
                      <span className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                        {chapter.number}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {chapter._count?.verses || 0} versículos
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-16">
          <div className="flex gap-4">
            <Link href="/leitura">
              <Button variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                Ver Todos os Livros
              </Button>
            </Link>
            <Link href="/busca">
              <Button variant="outline">
                <Book className="mr-2 h-4 w-4" />
                Buscar Versículos
              </Button>
            </Link>
          </div>
        </div>

        {/* Book Info Card */}
        <div className="mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Sobre o livro de {book.name}</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-2xl font-bold text-primary">{book.chapters?.length || 0}</div>
                    <div className="text-sm text-muted-foreground">Capítulos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {book.chapters?.reduce((acc, chapter) => acc + (chapter._count?.verses || 0), 0) || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Versículos</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
export const revalidate = 3600
