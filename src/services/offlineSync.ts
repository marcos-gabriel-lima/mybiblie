import { databaseService } from './database'
import { BibleApiService } from './bibleApi'
import { Chapter } from '../types/bible'

interface SyncStatus {
  isOnline: boolean
  lastSync: Date | null
  pendingSync: boolean
  syncInProgress: boolean
}

class OfflineSyncService {
  private syncStatus: SyncStatus = {
    isOnline: navigator.onLine,
    lastSync: null,
    pendingSync: false,
    syncInProgress: false
  }

  private listeners: Array<(status: SyncStatus) => void> = []

  constructor() {
    this.setupEventListeners()
    this.initializeService()
  }

  // Inicializar o serviço de forma assíncrona
  private async initializeService(): Promise<void> {
    try {
      // Aguardar a inicialização do banco de dados
      await databaseService.init()
      await this.loadSyncStatus()
    } catch (error) {
      console.error('Erro ao inicializar OfflineSyncService:', error)
    }
  }

  // Configurar listeners de eventos
  private setupEventListeners(): void {
    window.addEventListener('online', () => {
      console.log('Conexão restaurada - iniciando sincronização')
      this.syncStatus.isOnline = true
      this.notifyListeners()
      this.syncWhenOnline()
    })

    window.addEventListener('offline', () => {
      console.log('Conexão perdida - modo offline')
      this.syncStatus.isOnline = false
      this.notifyListeners()
    })

    // Sincronizar quando a página ganha foco
    window.addEventListener('focus', () => {
      if (this.syncStatus.isOnline && !this.syncStatus.syncInProgress) {
        this.syncWhenOnline()
      }
    })
  }

  // Carregar status de sincronização do banco
  private async loadSyncStatus(): Promise<void> {
    try {
      // Verificar se o banco está inicializado antes de tentar acessar
      if (!databaseService.isInitialized()) {
        console.log('Banco de dados ainda não inicializado, aguardando...')
        return
      }
      
      const settings = await databaseService.getSettings()
      if (settings?.lastSync) {
        this.syncStatus.lastSync = new Date(settings.lastSync)
      }
    } catch (error) {
      console.error('Erro ao carregar status de sincronização:', error)
    }
  }

  // Notificar listeners sobre mudanças de status
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.syncStatus))
  }

  // Adicionar listener para mudanças de status
  addStatusListener(listener: (status: SyncStatus) => void): () => void {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  // Obter status atual
  getStatus(): SyncStatus {
    return { ...this.syncStatus }
  }

  // Verificar se está online
  isOnline(): boolean {
    return this.syncStatus.isOnline
  }

  // Sincronizar quando online
  private async syncWhenOnline(): Promise<void> {
    if (this.syncStatus.syncInProgress) return

    this.syncStatus.syncInProgress = true
    this.syncStatus.pendingSync = false
    this.notifyListeners()

    try {
      console.log('Iniciando sincronização...')
      
      // Aqui você pode implementar lógica de sincronização específica
      // Por exemplo, sincronizar favoritos com um servidor
      
      this.syncStatus.lastSync = new Date()
      await this.saveSyncStatus()
      
      console.log('Sincronização concluída')
    } catch (error) {
      console.error('Erro na sincronização:', error)
      this.syncStatus.pendingSync = true
    } finally {
      this.syncStatus.syncInProgress = false
      this.notifyListeners()
    }
  }

  // Salvar status de sincronização
  private async saveSyncStatus(): Promise<void> {
    try {
      const settings = await databaseService.getSettings() || {
        id: 'app-settings',
        language: 'pt-BR',
        fontSize: 'medium',
        theme: 'light',
        lastSync: new Date()
      }

      settings.lastSync = this.syncStatus.lastSync || new Date()
      await databaseService.saveSettings(settings)
    } catch (error) {
      console.error('Erro ao salvar status de sincronização:', error)
    }
  }

  // Forçar sincronização
  async forceSync(): Promise<void> {
    if (!this.syncStatus.isOnline) {
      throw new Error('Não é possível sincronizar offline')
    }

    await this.syncWhenOnline()
  }

  // Obter capítulo (offline primeiro, depois online)
  async getChapter(bookId: string, chapterNumber: number, language: string): Promise<Chapter | null> {
    try {
      // Tentar buscar offline primeiro
      const offlineChapter = await databaseService.getChapter(bookId, chapterNumber, language)
      if (offlineChapter) {
        console.log(`Capítulo encontrado offline: ${bookId} ${chapterNumber}`)
        return offlineChapter
      }

      // Se não encontrou offline e está online, buscar online
      if (this.syncStatus.isOnline) {
        console.log(`Buscando capítulo online: ${bookId} ${chapterNumber}`)
        const onlineChapter = await BibleApiService.getChapter(bookId, chapterNumber, language)
        
        if (onlineChapter) {
          // Salvar no banco offline para próximas consultas
          await databaseService.saveChapter(onlineChapter, bookId, chapterNumber, language)
          console.log(`Capítulo salvo offline: ${bookId} ${chapterNumber}`)
        }
        
        return onlineChapter
      }

      // Se está offline e não encontrou, retornar null
      console.log(`Capítulo não encontrado offline: ${bookId} ${chapterNumber}`)
      return null

    } catch (error) {
      console.error('Erro ao obter capítulo:', error)
      return null
    }
  }

  // Pré-carregar capítulos populares
  async preloadPopularChapters(): Promise<void> {
    if (!this.syncStatus.isOnline) return

    const popularChapters = [
      { bookId: 'genesis', chapter: 1 },
      { bookId: 'john', chapter: 3 },
      { bookId: 'psalms', chapter: 23 },
      { bookId: 'matthew', chapter: 5 },
      { bookId: 'matthew', chapter: 6 },
      { bookId: 'matthew', chapter: 7 },
      { bookId: 'john', chapter: 1 },
      { bookId: 'john', chapter: 14 },
      { bookId: 'romans', chapter: 8 },
      { bookId: 'corinthians1', chapter: 13 }
    ]

    console.log('Iniciando pré-carregamento de capítulos populares...')

    for (const { bookId, chapter } of popularChapters) {
      try {
        // Verificar se já existe offline
        const existing = await databaseService.getChapter(bookId, chapter, 'pt-BR')
        if (existing) continue

        // Buscar e salvar
        const chapterData = await BibleApiService.getChapter(bookId, chapter, 'pt-BR')
        if (chapterData) {
          await databaseService.saveChapter(chapterData, bookId, chapter, 'pt-BR')
          console.log(`Pré-carregado: ${bookId} ${chapter}`)
        }

        // Pequena pausa para não sobrecarregar
        await new Promise(resolve => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`Erro ao pré-carregar ${bookId} ${chapter}:`, error)
      }
    }

    console.log('Pré-carregamento concluído')
  }

  // Obter estatísticas de uso offline
  async getOfflineStats(): Promise<{
    hasOfflineData: boolean
    chaptersCount: number
    favoritesCount: number
    lastSync: Date | null
  }> {
    try {
      const hasOfflineData = await databaseService.hasOfflineData()
      const stats = await databaseService.getDatabaseStats()
      const settings = await databaseService.getSettings()

      return {
        hasOfflineData,
        chaptersCount: stats.chaptersCount,
        favoritesCount: stats.favoritesCount,
        lastSync: settings?.lastSync ? new Date(settings.lastSync) : null
      }
    } catch (error) {
      console.error('Erro ao obter estatísticas offline:', error)
      return {
        hasOfflineData: false,
        chaptersCount: 0,
        favoritesCount: 0,
        lastSync: null
      }
    }
  }

  // Limpar dados offline
  async clearOfflineData(): Promise<void> {
    try {
      await databaseService.clearDatabase()
      this.syncStatus.lastSync = null
      await this.saveSyncStatus()
      console.log('Dados offline limpos')
    } catch (error) {
      console.error('Erro ao limpar dados offline:', error)
      throw error
    }
  }
}

// Instância singleton
export const offlineSyncService = new OfflineSyncService()
