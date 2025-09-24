import { useState, useEffect, useCallback } from 'react'

interface OfflineStatus {
  isOnline: boolean
  isInstalled: boolean
  canInstall: boolean
  installPrompt: any
  cacheSize: number
  lastSync: Date | null
  isServiceWorkerActive: boolean
  cacheStats: {
    static: number
    dynamic: number
    bible: number
    fonts: number
  }
}

interface OfflineActions {
  installApp: () => Promise<void>
  clearCache: () => Promise<void>
  syncOfflineContent: () => Promise<void>
  checkCacheSize: () => Promise<number>
  preloadBook: (book: string, translation: string) => Promise<void>
  getCacheStats: () => Promise<any>
  updateServiceWorker: () => Promise<void>
}

export function useOffline(): OfflineStatus & OfflineActions {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isInstalled, setIsInstalled] = useState(false)
  const [canInstall, setCanInstall] = useState(false)
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [cacheSize, setCacheSize] = useState(0)
  const [lastSync, setLastSync] = useState<Date | null>(null)
  const [isServiceWorkerActive, setIsServiceWorkerActive] = useState(false)
  const [cacheStats, setCacheStats] = useState({
    static: 0,
    dynamic: 0,
    bible: 0,
    fonts: 0
  })

  // Verificar status online/offline
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Verificar se o app está instalado
  useEffect(() => {
    const checkInstalled = () => {
      // Verifica se está rodando em modo standalone (instalado)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      const isInApp = (window.navigator as any).standalone === true
      setIsInstalled(isStandalone || isInApp)
    }

    checkInstalled()
    
    // Verificar mudanças no display mode
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    mediaQuery.addEventListener('change', checkInstalled)
    
    return () => mediaQuery.removeEventListener('change', checkInstalled)
  }, [])

  // Verificar status do Service Worker
  useEffect(() => {
    const checkServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.getRegistration()
          setIsServiceWorkerActive(!!registration && !!registration.active)
        } catch (error) {
          console.error('Erro ao verificar Service Worker:', error)
        }
      }
    }

    checkServiceWorker()
    
    // Verificar mudanças no Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', checkServiceWorker)
      return () => navigator.serviceWorker.removeEventListener('controllerchange', checkServiceWorker)
    }
  }, [])

  // Capturar prompt de instalação
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
      setCanInstall(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  // Verificar tamanho do cache
  const checkCacheSize = useCallback(async (): Promise<number> => {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate()
        return estimate.usage || 0
      }
      return 0
    } catch (error) {
      console.error('Erro ao verificar tamanho do cache:', error)
      return 0
    }
  }, [])

  // Atualizar tamanho do cache
  useEffect(() => {
    const updateCacheSize = async () => {
      const size = await checkCacheSize()
      setCacheSize(size)
    }

    updateCacheSize()
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(updateCacheSize, 30000)
    
    return () => clearInterval(interval)
  }, [checkCacheSize])

  // Instalar app
  const installApp = useCallback(async (): Promise<void> => {
    if (!installPrompt) {
      throw new Error('Prompt de instalação não disponível')
    }

    try {
      const result = await installPrompt.prompt()
      console.log('Resultado da instalação:', result)
      
      if (result.outcome === 'accepted') {
        setCanInstall(false)
        setInstallPrompt(null)
        setIsInstalled(true)
      }
    } catch (error) {
      console.error('Erro ao instalar app:', error)
      throw error
    }
  }, [installPrompt])

  // Limpar cache
  const clearCache = useCallback(async (): Promise<void> => {
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys()
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        )
        console.log('Cache limpo com sucesso')
      }
      
      // Limpar localStorage relacionado ao cache
      const keysToRemove = Object.keys(localStorage).filter(key => 
        key.startsWith('bible-cache-') || 
        key.startsWith('offline-')
      )
      keysToRemove.forEach(key => localStorage.removeItem(key))
      
      // Atualizar tamanho do cache
      const newSize = await checkCacheSize()
      setCacheSize(newSize)
    } catch (error) {
      console.error('Erro ao limpar cache:', error)
      throw error
    }
  }, [checkCacheSize])

  // Sincronizar conteúdo offline
  const syncOfflineContent = useCallback(async (): Promise<void> => {
    try {
      if (!isOnline) {
        throw new Error('Não é possível sincronizar offline')
      }

      // Enviar mensagem para o Service Worker para sincronizar
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SYNC_OFFLINE_CONTENT'
        })
      }

      // Cachear conteúdo essencial
      const essentialBooks = ['Genesis', 'Psalms', 'John', 'Matthew']
      const translations = ['acf', 'kjv', 'rvr1960']
      
      for (const book of essentialBooks) {
        for (const translation of translations) {
          try {
            const response = await fetch(
              `https://bible-api.com/${book}+1?translation=${translation}`
            )
            if (response.ok) {
              // O Service Worker irá cachear automaticamente
              console.log(`Cacheado: ${book} em ${translation}`)
            }
          } catch (error) {
            console.warn(`Erro ao cachear ${book} em ${translation}:`, error)
          }
        }
      }

      setLastSync(new Date())
      console.log('Sincronização offline concluída')
    } catch (error) {
      console.error('Erro na sincronização offline:', error)
      throw error
    }
  }, [isOnline])

  // Pré-carregar um livro específico
  const preloadBook = useCallback(async (book: string, translation: string): Promise<void> => {
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'PRELOAD_BOOK',
          data: { book, translation }
        })
        console.log(`📖 Pré-carregando: ${book} ${translation}`)
      }
    } catch (error) {
      console.error('Erro ao pré-carregar livro:', error)
      throw error
    }
  }, [])

  // Obter estatísticas detalhadas do cache
  const getCacheStats = useCallback(async (): Promise<any> => {
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys()
        const stats = {
          static: 0,
          dynamic: 0,
          bible: 0,
          fonts: 0
        }

        for (const cacheName of cacheNames) {
          const cache = await caches.open(cacheName)
          const keys = await cache.keys()
          
          if (cacheName.includes('static')) {
            stats.static = keys.length
          } else if (cacheName.includes('dynamic')) {
            stats.dynamic = keys.length
          } else if (cacheName.includes('bible')) {
            stats.bible = keys.length
          } else if (cacheName.includes('fonts')) {
            stats.fonts = keys.length
          }
        }

        setCacheStats(stats)
        return stats
      }
      return null
    } catch (error) {
      console.error('Erro ao obter estatísticas do cache:', error)
      return null
    }
  }, [])

  // Atualizar Service Worker
  const updateServiceWorker = useCallback(async (): Promise<void> => {
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration()
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' })
          window.location.reload()
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar Service Worker:', error)
      throw error
    }
  }, [])

  // Atualizar estatísticas do cache periodicamente
  useEffect(() => {
    const updateStats = async () => {
      await getCacheStats()
      const size = await checkCacheSize()
      setCacheSize(size)
    }

    updateStats()
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(updateStats, 30000)
    
    return () => clearInterval(interval)
  }, [getCacheStats, checkCacheSize])

  return {
    isOnline,
    isInstalled,
    canInstall,
    installPrompt,
    cacheSize,
    lastSync,
    isServiceWorkerActive,
    cacheStats,
    installApp,
    clearCache,
    syncOfflineContent,
    checkCacheSize,
    preloadBook,
    getCacheStats,
    updateServiceWorker
  }
}

// Hook para formatar tamanho do cache
export function useCacheSizeFormatter() {
  const formatBytes = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }, [])

  return { formatBytes }
}
