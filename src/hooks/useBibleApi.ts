import { useState, useEffect, useCallback } from 'react'
import { BibleApiService, BOOK_NAME_MAPPING } from '../services/bibleApi'
import { Chapter, Verse, Book } from '../types/bible'
import { useTranslation } from 'react-i18next'

interface UseBibleApiReturn {
  chapter: Chapter | null
  loading: boolean
  error: string | null
  loadChapter: (bookId: string, chapterNumber: number) => Promise<void>
  clearError: () => void
}

export function useBibleApi(): UseBibleApiReturn {
  const { i18n } = useTranslation()
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

  // Limpa o cache quando o idioma muda
  useEffect(() => {
    if (currentLanguage !== i18n.language) {
      setCurrentLanguage(i18n.language)
      setChapter(null) // Limpa o capítulo atual para forçar recarregamento
    }
  }, [i18n.language, currentLanguage])

  const loadChapter = useCallback(async (bookId: string, chapterNumber: number) => {
    setLoading(true)
    setError(null)

    try {
      const currentLanguage = i18n.language
      const languageMapping = BOOK_NAME_MAPPING[currentLanguage] || BOOK_NAME_MAPPING['pt-BR']
      const bookName = languageMapping[bookId]
      
      if (!bookName) {
        throw new Error(`Livro não encontrado: ${bookId}`)
      }

      const chapterData = await BibleApiService.getChapter(bookName, chapterNumber, currentLanguage)
      
      if (chapterData) {
        setChapter(chapterData)
      } else {
        throw new Error('Capítulo não encontrado')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      setChapter(null)
    } finally {
      setLoading(false)
    }
  }, [i18n.language])

  const clearError = useCallback(() => {
    setError(null)
  }, [i18n.language])

  return {
    chapter,
    loading,
    error,
    loadChapter,
    clearError
  }
}

interface UseVerseApiReturn {
  verse: Verse | null
  loading: boolean
  error: string | null
  loadVerse: (bookId: string, chapterNumber: number, verseNumber: number) => Promise<void>
  clearError: () => void
}

export function useVerseApi(): UseVerseApiReturn {
  const { i18n } = useTranslation()
  const [verse, setVerse] = useState<Verse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadVerse = useCallback(async (bookId: string, chapterNumber: number, verseNumber: number) => {
    setLoading(true)
    setError(null)

    try {
      const currentLanguage = i18n.language
      const languageMapping = BOOK_NAME_MAPPING[currentLanguage] || BOOK_NAME_MAPPING['pt-BR']
      const bookName = languageMapping[bookId]
      
      if (!bookName) {
        throw new Error(`Livro não encontrado: ${bookId}`)
      }

      const verseData = await BibleApiService.getVerse(bookName, chapterNumber, verseNumber, currentLanguage)
      
      if (verseData) {
        setVerse(verseData)
      } else {
        throw new Error('Versículo não encontrado')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      setVerse(null)
    } finally {
      setLoading(false)
    }
  }, [i18n.language])

  const clearError = useCallback(() => {
    setError(null)
  }, [i18n.language])

  return {
    verse,
    loading,
    error,
    loadVerse,
    clearError
  }
}

interface UseBibleSearchReturn {
  results: Array<{
    book: Book
    chapter: number
    verse: number
    text: string
  }>
  loading: boolean
  error: string | null
  search: (query: string) => Promise<void>
  clearResults: () => void
  clearError: () => void
}

export function useBibleSearch(): UseBibleSearchReturn {
  const { i18n } = useTranslation()
  const [results, setResults] = useState<Array<{
    book: Book
    chapter: number
    verse: number
    text: string
  }>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const searchResults = await BibleApiService.searchText(query, i18n.language)
      setResults(searchResults)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro na busca'
      setError(errorMessage)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [i18n.language])

  const clearResults = useCallback(() => {
    setResults([])
  }, [i18n.language])

  const clearError = useCallback(() => {
    setError(null)
  }, [i18n.language])

  return {
    results,
    loading,
    error,
    search,
    clearResults,
    clearError
  }
}
