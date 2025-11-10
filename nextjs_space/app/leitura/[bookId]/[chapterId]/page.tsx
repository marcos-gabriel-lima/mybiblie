
'use client'

import { useState, useEffect } from 'react'
import { Book, ChevronRight, Home, BookOpen, Heart, MessageSquare, ChevronLeft, Settings } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'

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

export default function ChapterPage({ params }: Props) {
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [fontSize, setFontSize] = useState(18)

  useEffect(() => {
    async function loadChapter() {
      try {
        const response = await fetch(`/api/chapters/${params.chapterId}`)
        if (!response.ok) {
          throw new Error('Capítulo não encontrado')
        }
        const data = await response.json()
        setChapter(data)
      } catch (error) {
        setError('Erro ao carregar capítulo')
        console.error('Erro:', error)
      } finally {
        setLoading(false)
      }
    }

    loadChapter()
  }, [params.chapterId])

  const handleVerseClick = (verse: Verse) => {
    // Implementar ações do versículo (favoritar, adicionar nota, etc.)
    console.log('Versículo clicado:', verse)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p className="text-muted-foreground">Carregando capítulo...</p>
        </div>
      </div>
    )
  }

  if (error || !chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Capítulo não encontrado'}</p>
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
            <Link href={`/leitura/${chapter.book.id}`} className="hover:text-primary">
              <span>{chapter.book.name}</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            <span className="font-semibold text-primary">
              Capítulo {chapter.number}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
              >
                A-
              </Button>
              <span className="text-xs text-muted-foreground">{fontSize}px</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              >
                A+
              </Button>
            </div>
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
                  className="group relative p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleVerseClick(verse)}
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
                        style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
                      >
                        {verse.text}
                      </p>
                    </div>
                  </div>
                  
                  {/* Verse Actions */}
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href={`/leitura/${chapter.book.id}`}>
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
