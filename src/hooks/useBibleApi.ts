import { useState, useEffect, useCallback } from 'react'
import { BibleApiService, BOOK_NAME_MAPPING } from '../services/bibleApi'
import { offlineSyncService } from '../services/offlineSync'
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

      // Usar o sistema offline que busca primeiro localmente, depois online
      const chapterData = await offlineSyncService.getChapter(bookName, chapterNumber, currentLanguage)
      
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

interface UseOfflineStatusReturn {
  isOnline: boolean
  lastSync: Date | null
  pendingSync: boolean
  syncInProgress: boolean
  offlineStats: {
    hasOfflineData: boolean
    chaptersCount: number
    favoritesCount: number
    lastSync: Date | null
  } | null
  preloadPopularChapters: () => Promise<void>
  clearOfflineData: () => Promise<void>
  forceSync: () => Promise<void>
}

export function useOfflineStatus(): UseOfflineStatusReturn {
  const [status, setStatus] = useState(offlineSyncService.getStatus())
  const [offlineStats, setOfflineStats] = useState<{
    hasOfflineData: boolean
    chaptersCount: number
    favoritesCount: number
    lastSync: Date | null
  } | null>(null)

  useEffect(() => {
    // Carregar estatísticas iniciais
    const loadStats = async () => {
      try {
        const stats = await offlineSyncService.getOfflineStats()
        setOfflineStats(stats)
      } catch (error) {
        console.error('Erro ao carregar estatísticas offline:', error)
      }
    }

    loadStats()

    // Adicionar listener para mudanças de status
    const removeListener = offlineSyncService.addStatusListener((newStatus) => {
      setStatus(newStatus)
    })

    return () => {
      removeListener()
    }
  }, [])

  const preloadPopularChapters = useCallback(async () => {
    try {
      await offlineSyncService.preloadPopularChapters()
      // Recarregar estatísticas após pré-carregamento
      const stats = await offlineSyncService.getOfflineStats()
      setOfflineStats(stats)
    } catch (error) {
      console.error('Erro no pré-carregamento:', error)
    }
  }, [])

  const clearOfflineData = useCallback(async () => {
    try {
      await offlineSyncService.clearOfflineData()
      const stats = await offlineSyncService.getOfflineStats()
      setOfflineStats(stats)
    } catch (error) {
      console.error('Erro ao limpar dados offline:', error)
    }
  }, [])

  const forceSync = useCallback(async () => {
    try {
      await offlineSyncService.forceSync()
      const stats = await offlineSyncService.getOfflineStats()
      setOfflineStats(stats)
    } catch (error) {
      console.error('Erro na sincronização forçada:', error)
    }
  }, [])

  return {
    isOnline: status.isOnline,
    lastSync: status.lastSync,
    pendingSync: status.pendingSync,
    syncInProgress: status.syncInProgress,
    offlineStats,
    preloadPopularChapters,
    clearOfflineData,
    forceSync
  }
}
