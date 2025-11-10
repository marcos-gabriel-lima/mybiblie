
import { Book, ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { prisma } from '@/lib/db'
import livrosInfo from '@/data/livros_info.json'

async function getBooks() {
  // Tentar buscar do banco se disponível
  if (prisma) {
    try {
      const books = await prisma.book.findMany({
        orderBy: { order: 'asc' },
        include: {
          chapters: {
            orderBy: { number: 'asc' },
          },
        },
      })
      
      // Se encontrou livros no banco, retorna
      if (books && books.length > 0) {
        return books
      }
    } catch (error) {
      console.error('Erro ao buscar livros do banco, usando fallback JSON:', error)
    }
  }
  
  // Fallback: usar dados do JSON
  return getBooksFromJSON()
}

function getBooksFromJSON() {
  try {
    const livros = livrosInfo.livros.map((livro, index) => ({
      id: `book-${livro.ordem}`,
      name: livro.nome,
      testament: livro.testamento,
      order: livro.ordem,
      createdAt: new Date(),
      chapters: Array.from({ length: livro.n_capitulos }, (_, i) => ({
        id: `chapter-${livro.ordem}-${i + 1}`,
        bookId: `book-${livro.ordem}`,
        number: i + 1,
        verses: [],
      })),
    }))
    return livros
  } catch (error) {
    console.error('Erro ao carregar livros do JSON:', error)
    return []
  }
}

export default async function LeituraPage() {
  const books = await getBooks()
  const antigoTestamento = books?.filter(book => book.testament === 'Antigo') || []
  const novoTestamento = books?.filter(book => book.testament === 'Novo') || []

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
            <div className="flex items-center space-x-2">
              <Book className="h-5 w-5 text-primary" />
              <span className="font-semibold">Leitura Bíblica</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Bíblia Sagrada Almeida
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha um livro para começar sua leitura. Navegue através dos 66 livros 
            da Bíblia organizados por testamento.
          </p>
        </div>

        <div className="space-y-12">
          {/* Antigo Testamento */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-foreground">Antigo Testamento</h2>
              <Badge variant="secondary">{antigoTestamento.length} livros</Badge>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {antigoTestamento.map((book) => (
                <Link key={book.id} href={`/leitura/${book.id}`}>
                  <Card className="group hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {book.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {book.chapters?.length || 0} capítulos
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Novo Testamento */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-foreground">Novo Testamento</h2>
              <Badge variant="secondary">{novoTestamento.length} livros</Badge>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {novoTestamento.map((book) => (
                <Link key={book.id} href={`/leitura/${book.id}`}>
                  <Card className="group hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {book.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {book.chapters?.length || 0} capítulos
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Estatísticas da Bíblia Sagrada</CardTitle>
              <CardDescription>Informações sobre esta versão da Bíblia Almeida</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-2xl font-bold text-primary">{books?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Livros</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {books?.reduce((acc, book) => acc + (book.chapters?.length || 0), 0) || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Capítulos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{antigoTestamento.length}</div>
                  <div className="text-sm text-muted-foreground">A.T.</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{novoTestamento.length}</div>
                  <div className="text-sm text-muted-foreground">N.T.</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
