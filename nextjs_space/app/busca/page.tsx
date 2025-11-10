
'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Book, ChevronRight, Home, Loader2, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'

interface SearchResult {
  id: string
  text: string
  number: number
  chapter: {
    id: string
    number: number
    book: {
      id: string
      name: string
      testament: string
    }
  }
}

export default function BuscaPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus no input de busca quando a página carrega
    searchInputRef.current?.focus()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setIsLoading(true)
    setHasSearched(true)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm.trim())}`)
      const data = await response.json()
      
      if (response.ok) {
        setResults(data.verses || [])
      } else {
        console.error('Erro na busca:', data.error)
        setResults([])
      }
    } catch (error) {
      console.error('Erro ao fazer busca:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const highlightText = (text: string, term: string) => {
    if (!term) return text
    
    const regex = new RegExp(`(${term})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded font-semibold">
          {part}
        </span> : part
    )
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
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-primary" />
              <span className="font-semibold">Busca</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Search Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Buscar na Bíblia Sagrada
          </h1>
          <p className="text-lg text-muted-foreground">
            Encontre versículos por palavras-chave ou temas específicos
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Digite uma palavra ou frase (ex: amor, fé, esperança...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" disabled={isLoading || !searchTerm.trim()}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Buscar
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        {hasSearched && (
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
                <p className="text-muted-foreground">Buscando versículos...</p>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Resultados da Busca
                  </h2>
                  <Badge variant="secondary">
                    {results.length} versículo{results.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {results.map((verse) => (
                    <Card key={verse.id} className="group hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <Book className="h-4 w-4 text-primary" />
                            <span className="font-semibold text-foreground">
                              {verse.chapter.book.name} {verse.chapter.number}:{verse.number}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {verse.chapter.book.testament} Testamento
                            </Badge>
                          </div>
                          <Link href={`/leitura/${verse.chapter.book.id}/${verse.chapter.id}`}>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <BookOpen className="h-4 w-4 mr-1" />
                              Ler Capítulo
                            </Button>
                          </Link>
                        </div>
                        <p className="text-foreground leading-relaxed reading-text">
                          {highlightText(verse.text, searchTerm)}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Nenhum resultado encontrado
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Não foram encontrados versículos com o termo "{searchTerm}"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tente buscar por palavras diferentes ou mais específicas
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Help Section */}
        {!hasSearched && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Como usar a busca
              </CardTitle>
              <CardDescription>
                Dicas para encontrar os versículos que você procura
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Exemplos de busca:</h4>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span>"amor"</span>
                    <span className="text-muted-foreground">Encontra todos os versículos com a palavra amor</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span>"vida eterna"</span>
                    <span className="text-muted-foreground">Busca pela frase completa</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span>"fé esperança"</span>
                    <span className="text-muted-foreground">Versículos que contêm ambas as palavras</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Temas populares:</h4>
                <div className="flex flex-wrap gap-2">
                  {['amor', 'fé', 'esperança', 'paz', 'sabedoria', 'oração', 'perdão', 'graça'].map((tema) => (
                    <Button
                      key={tema}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchTerm(tema)
                        searchInputRef.current?.focus()
                      }}
                    >
                      {tema}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
