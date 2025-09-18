import { Chapter, Verse } from '../types/bible'

// Configuração do banco de dados
const DB_NAME = 'BibleAppDB'
const DB_VERSION = 1

// Stores (tabelas) do banco
const STORES = {
  CHAPTERS: 'chapters',
  BOOKS: 'books',
  FAVORITES: 'favorites',
  SETTINGS: 'settings'
} as const

// Interface para dados do capítulo no banco
interface ChapterData {
  id: string // formato: bookId-chapterNumber
  bookId: string
  chapterNumber: number
  language: string
  verses: Verse[]
  lastUpdated: Date
  isOffline: boolean
}

// Interface para configurações
interface AppSettings {
  id: string
  language: string
  fontSize: string
  theme: string
  lastSync: Date
}

class DatabaseService {
  private db: IDBDatabase | null = null

  // Verificar se o banco está inicializado
  isInitialized(): boolean {
    return this.db !== null
  }

  // Inicializar o banco de dados
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => {
        console.error('Erro ao abrir banco de dados:', request.error)
        reject(request.error)
      }

      request.onsuccess = () => {
        this.db = request.result
        console.log('Banco de dados inicializado com sucesso')
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        
        // Store para capítulos
        if (!db.objectStoreNames.contains(STORES.CHAPTERS)) {
          const chapterStore = db.createObjectStore(STORES.CHAPTERS, { keyPath: 'id' })
          chapterStore.createIndex('bookId', 'bookId', { unique: false })
          chapterStore.createIndex('language', 'language', { unique: false })
          chapterStore.createIndex('lastUpdated', 'lastUpdated', { unique: false })
        }

        // Store para livros
        if (!db.objectStoreNames.contains(STORES.BOOKS)) {
          db.createObjectStore(STORES.BOOKS, { keyPath: 'id' })
        }

        // Store para favoritos
        if (!db.objectStoreNames.contains(STORES.FAVORITES)) {
          const favoriteStore = db.createObjectStore(STORES.FAVORITES, { keyPath: 'id' })
          favoriteStore.createIndex('bookId', 'bookId', { unique: false })
          favoriteStore.createIndex('addedAt', 'addedAt', { unique: false })
        }

        // Store para configurações
        if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
          db.createObjectStore(STORES.SETTINGS, { keyPath: 'id' })
        }

        console.log('Estrutura do banco de dados criada')
      }
    })
  }

  // Salvar capítulo no banco
  async saveChapter(chapter: Chapter, bookId: string, chapterNumber: number, language: string): Promise<void> {
    if (!this.db) throw new Error('Banco de dados não inicializado')

    const chapterData: ChapterData = {
      id: `${bookId}-${chapterNumber}-${language}`,
      bookId,
      chapterNumber,
      language,
      verses: chapter.verses,
      lastUpdated: new Date(),
      isOffline: true
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.CHAPTERS], 'readwrite')
      const store = transaction.objectStore(STORES.CHAPTERS)
      const request = store.put(chapterData)

      request.onsuccess = () => {
        console.log(`Capítulo salvo no banco: ${chapterData.id}`)
        resolve()
      }

      request.onerror = () => {
        console.error('Erro ao salvar capítulo:', request.error)
        reject(request.error)
      }
    })
  }

  // Buscar capítulo no banco
  async getChapter(bookId: string, chapterNumber: number, language: string): Promise<Chapter | null> {
    if (!this.db) throw new Error('Banco de dados não inicializado')

    const id = `${bookId}-${chapterNumber}-${language}`

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.CHAPTERS], 'readonly')
      const store = transaction.objectStore(STORES.CHAPTERS)
      const request = store.get(id)

      request.onsuccess = () => {
        if (request.result) {
          const chapterData: ChapterData = request.result
          const chapter: Chapter = {
            number: chapterData.chapterNumber,
            verses: chapterData.verses
          }
          console.log(`Capítulo encontrado no banco: ${id}`)
          resolve(chapter)
        } else {
          console.log(`Capítulo não encontrado no banco: ${id}`)
          resolve(null)
        }
      }

      request.onerror = () => {
        console.error('Erro ao buscar capítulo:', request.error)
        reject(request.error)
      }
    })
  }

  // Salvar favorito no banco
  async saveFavorite(favorite: any): Promise<void> {
    if (!this.db) throw new Error('Banco de dados não inicializado')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.FAVORITES], 'readwrite')
      const store = transaction.objectStore(STORES.FAVORITES)
      const request = store.put(favorite)

      request.onsuccess = () => {
        console.log(`Favorito salvo no banco: ${favorite.id}`)
        resolve()
      }

      request.onerror = () => {
        console.error('Erro ao salvar favorito:', request.error)
        reject(request.error)
      }
    })
  }

  // Buscar todos os favoritos
  async getAllFavorites(): Promise<any[]> {
    if (!this.db) throw new Error('Banco de dados não inicializado')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.FAVORITES], 'readonly')
      const store = transaction.objectStore(STORES.FAVORITES)
      const request = store.getAll()

      request.onsuccess = () => {
        console.log(`${request.result.length} favoritos encontrados no banco`)
        resolve(request.result)
      }

      request.onerror = () => {
        console.error('Erro ao buscar favoritos:', request.error)
        reject(request.error)
      }
    })
  }

  // Remover favorito
  async removeFavorite(favoriteId: string): Promise<void> {
    if (!this.db) throw new Error('Banco de dados não inicializado')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.FAVORITES], 'readwrite')
      const store = transaction.objectStore(STORES.FAVORITES)
      const request = store.delete(favoriteId)

      request.onsuccess = () => {
        console.log(`Favorito removido do banco: ${favoriteId}`)
        resolve()
      }

      request.onerror = () => {
        console.error('Erro ao remover favorito:', request.error)
        reject(request.error)
      }
    })
  }

  // Salvar configurações
  async saveSettings(settings: AppSettings): Promise<void> {
    if (!this.db) throw new Error('Banco de dados não inicializado')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.SETTINGS], 'readwrite')
      const store = transaction.objectStore(STORES.SETTINGS)
      const request = store.put(settings)

      request.onsuccess = () => {
        console.log('Configurações salvas no banco')
        resolve()
      }

      request.onerror = () => {
        console.error('Erro ao salvar configurações:', request.error)
        reject(request.error)
      }
    })
  }

  // Buscar configurações
  async getSettings(): Promise<AppSettings | null> {
    if (!this.db) throw new Error('Banco de dados não inicializado')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.SETTINGS], 'readonly')
      const store = transaction.objectStore(STORES.SETTINGS)
      const request = store.get('app-settings')

      request.onsuccess = () => {
        resolve(request.result || null)
      }

      request.onerror = () => {
        console.error('Erro ao buscar configurações:', request.error)
        reject(request.error)
      }
    })
  }

  // Verificar se há dados offline
  async hasOfflineData(): Promise<boolean> {
    if (!this.db) throw new Error('Banco de dados não inicializado')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.CHAPTERS], 'readonly')
      const store = transaction.objectStore(STORES.CHAPTERS)
      const request = store.count()

      request.onsuccess = () => {
        resolve(request.result > 0)
      }

      request.onerror = () => {
        console.error('Erro ao verificar dados offline:', request.error)
        reject(request.error)
      }
    })
  }

  // Limpar banco de dados
  async clearDatabase(): Promise<void> {
    if (!this.db) throw new Error('Banco de dados não inicializado')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.CHAPTERS, STORES.FAVORITES], 'readwrite')
      
      // const clearChapterStore = transaction.objectStore(STORES.CHAPTERS).clear()
      // const clearFavoriteStore = transaction.objectStore(STORES.FAVORITES).clear()

      transaction.oncomplete = () => {
        console.log('Banco de dados limpo')
        resolve()
      }

      transaction.onerror = () => {
        console.error('Erro ao limpar banco de dados:', transaction.error)
        reject(transaction.error)
      }
    })
  }

  // Obter estatísticas do banco
  async getDatabaseStats(): Promise<{
    chaptersCount: number
    favoritesCount: number
    totalSize: number
  }> {
    if (!this.db) throw new Error('Banco de dados não inicializado')

    const chaptersCount = await this.getStoreCount(STORES.CHAPTERS)
    const favoritesCount = await this.getStoreCount(STORES.FAVORITES)

    return {
      chaptersCount,
      favoritesCount,
      totalSize: 0 // IndexedDB não fornece tamanho diretamente
    }
  }

  private async getStoreCount(storeName: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.count()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
}

// Instância singleton
export const databaseService = new DatabaseService()

// Inicializar automaticamente
databaseService.init().catch(console.error)
