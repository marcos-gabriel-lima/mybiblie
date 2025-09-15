import { Book, Chapter, Verse } from '../types/bible'
import { API_CONFIG, DEV_CONFIG } from '../config/api'
import { getLocalBibleChapter, isLocalChapterAvailable } from '../data/bibleData'

// Cache para evitar requisições desnecessárias
const cache = new Map<string, any>()

// Mapeamento de traduções por idioma
const TRANSLATION_MAPPING: Record<string, string> = {
  'pt-BR': 'kjv', // Usando KJV e traduzindo para português
  'en-US': 'kjv', // King James Version (English)
  'es-ES': 'kjv' // Usando KJV e traduzindo para espanhol
}

// Função para traduzir texto usando API gratuita
async function translateText(text: string, targetLanguage: string): Promise<string> {
  try {
    // Usando MyMemory API (gratuita e sem necessidade de chave)
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`)
    const data = await response.json()
    
    if (data.responseStatus === 200 && data.responseData) {
      return data.responseData.translatedText
    }
    
    return text // Retorna texto original se tradução falhar
  } catch (error) {
    console.warn('Erro na tradução:', error)
    return text // Retorna texto original se tradução falhar
  }
}

export interface BibleApiResponse {
  reference: string
  verses: Array<{
    book_id: string
    book_name: string
    chapter: number
    verse: number
    text: string
  }>
  text: string
  translation_id: string
  translation_name: string
  translation_note: string
}

export class BibleApiService {
  /**
   * Busca um capítulo específico da Bíblia
   */
  static async getChapter(bookName: string, chapterNumber: number, language: string = 'pt-BR'): Promise<Chapter | null> {
    const translation = TRANSLATION_MAPPING[language] || TRANSLATION_MAPPING['pt-BR']
    const cacheKey = `${bookName}-${chapterNumber}-${language}`
    
    // Verifica cache primeiro
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)
    }

    // Tenta usar dados locais primeiro para todos os idiomas
    const localChapter = getLocalBibleChapter(bookName.toLowerCase(), chapterNumber, language)
    if (localChapter) {
      if (DEV_CONFIG.LOG_REQUESTS) {
        console.log(`Usando dados locais para: ${bookName} ${chapterNumber} (${language})`)
      }
      
      const chapter: Chapter = {
        number: chapterNumber,
        verses: localChapter.verses.map(verse => ({
          number: verse.number,
          text: verse.text
        }))
      }
      
      // Salva no cache
      cache.set(cacheKey, chapter)
      return chapter
    }

    try {
      const url = `${API_CONFIG.BIBLE_API_BASE}/${bookName}+${chapterNumber}?translation=${translation}`
      
      if (DEV_CONFIG.LOG_REQUESTS) {
        console.log(`Buscando capítulo: ${bookName} ${chapterNumber} (${translation})`)
      }

      const response = await fetch(url, {
        headers: API_CONFIG.DEFAULT_HEADERS,
        signal: AbortSignal.timeout(API_CONFIG.REQUEST_TIMEOUT)
      })
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar capítulo: ${response.status}`)
      }

      const data: BibleApiResponse = await response.json()
      
      // Se não for inglês, traduz os versículos
      let verses = data.verses.map(verse => ({
        number: verse.verse,
        text: verse.text.trim()
      }))

      // Traduz para português ou espanhol se necessário
      if (language === 'pt-BR' || language === 'es-ES') {
        const targetLang = language === 'pt-BR' ? 'pt' : 'es'
        
        // Traduz cada versículo
        const translatedVerses = await Promise.all(
          verses.map(async (verse) => ({
            ...verse,
            text: await translateText(verse.text, targetLang)
          }))
        )
        
        verses = translatedVerses
      }
      
      // Converte para nossa estrutura
      const chapter: Chapter = {
        number: chapterNumber,
        verses: verses
      }

      // Salva no cache
      cache.set(cacheKey, chapter)
      
      return chapter
    } catch (error) {
      console.error('Erro ao buscar capítulo:', error)
      return null
    }
  }

  /**
   * Busca um versículo específico
   */
  static async getVerse(bookName: string, chapterNumber: number, verseNumber: number, language: string = 'pt-BR'): Promise<Verse | null> {
    try {
      const translation = TRANSLATION_MAPPING[language] || TRANSLATION_MAPPING['pt-BR']
      const url = `${API_CONFIG.BIBLE_API_BASE}/${bookName}+${chapterNumber}:${verseNumber}?translation=${translation}`
      
      const response = await fetch(url, {
        headers: API_CONFIG.DEFAULT_HEADERS,
        signal: AbortSignal.timeout(API_CONFIG.REQUEST_TIMEOUT)
      })
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar versículo: ${response.status}`)
      }

      const data: BibleApiResponse = await response.json()
      
      if (data.verses.length > 0) {
        const verse = data.verses[0]
        return {
          number: verseNumber,
          text: verse.text.trim()
        }
      }

      return null
    } catch (error) {
      console.error('Erro ao buscar versículo:', error)
      return null
    }
  }

  /**
   * Busca múltiplos versículos
   */
  static async getVerses(bookName: string, chapterNumber: number, startVerse: number, endVerse: number): Promise<Verse[]> {
    try {
      const response = await fetch(`${BIBLE_API_BASE}/${bookName}+${chapterNumber}:${startVerse}-${endVerse}`)
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar versículos: ${response.status}`)
      }

      const data: BibleApiResponse = await response.json()
      
      return data.verses.map(verse => ({
        number: verse.verse,
        text: verse.text.trim()
      }))
    } catch (error) {
      console.error('Erro ao buscar versículos:', error)
      return []
    }
  }

  /**
   * Busca por texto (versículos que contenham a palavra/frase)
   */
  static async searchText(query: string, language: string = 'pt-BR'): Promise<Array<{
    book: Book
    chapter: number
    verse: number
    text: string
  }>> {
    const results: Array<{
      book: Book
      chapter: number
      verse: number
      text: string
    }> = []

    try {
      // Buscar apenas nos dados locais disponíveis para evitar problemas de CORS
      const localChapter = getLocalBibleChapter('genesis', 1, language)
      
      if (localChapter) {
        localChapter.verses.forEach(verse => {
          if (verse.text.toLowerCase().includes(query.toLowerCase())) {
            results.push({
              book: { id: 'genesis', name: 'Genesis', chapters: 1 } as Book,
              chapter: 1,
              verse: verse.number,
              text: verse.text
            })
          }
        })
      }

      // Limita resultados para performance
      return results.slice(0, 20)
    } catch (error) {
      console.error('Erro na busca:', error)
      return []
    }
  }

  /**
   * Limpa o cache
   */
  static clearCache(): void {
    cache.clear()
  }

  /**
   * Obtém estatísticas do cache
   */
  static getCacheStats(): { size: number; keys: string[] } {
    return {
      size: cache.size,
      keys: Array.from(cache.keys())
    }
  }
}

// Mapeamento de nomes de livros para a API por idioma
export const BOOK_NAME_MAPPING: Record<string, Record<string, string>> = {
  'pt-BR': {
    'genesis': 'Genesis',
    'exodus': 'Exodus',
    'leviticus': 'Leviticus',
    'numbers': 'Numbers',
    'deuteronomy': 'Deuteronomy',
    'joshua': 'Joshua',
    'judges': 'Judges',
    'ruth': 'Ruth',
    'samuel1': '1 Samuel',
    'samuel2': '2 Samuel',
    'kings1': '1 Kings',
    'kings2': '2 Kings',
    'chronicles1': '1 Chronicles',
    'chronicles2': '2 Chronicles',
    'ezra': 'Ezra',
    'nehemiah': 'Nehemiah',
    'esther': 'Esther',
    'job': 'Job',
    'psalms': 'Psalms',
    'proverbs': 'Proverbs',
    'ecclesiastes': 'Ecclesiastes',
    'song': 'Song of Solomon',
    'isaiah': 'Isaiah',
    'jeremiah': 'Jeremiah',
    'lamentations': 'Lamentations',
    'ezekiel': 'Ezekiel',
    'daniel': 'Daniel',
    'hosea': 'Hosea',
    'joel': 'Joel',
    'amos': 'Amos',
    'obadiah': 'Obadiah',
    'jonah': 'Jonah',
    'micah': 'Micah',
    'nahum': 'Nahum',
    'habakkuk': 'Habakkuk',
    'zephaniah': 'Zephaniah',
    'haggai': 'Haggai',
    'zechariah': 'Zechariah',
    'malachi': 'Malachi',
    'matthew': 'Matthew',
    'mark': 'Mark',
    'luke': 'Luke',
    'john': 'John',
    'acts': 'Acts',
    'romans': 'Romans',
    'corinthians1': '1 Corinthians',
    'corinthians2': '2 Corinthians',
    'galatians': 'Galatians',
    'ephesians': 'Ephesians',
    'philippians': 'Philippians',
    'colossians': 'Colossians',
    'thessalonians1': '1 Thessalonians',
    'thessalonians2': '2 Thessalonians',
    'timothy1': '1 Timothy',
    'timothy2': '2 Timothy',
    'titus': 'Titus',
    'philemon': 'Philemon',
    'hebrews': 'Hebrews',
    'james': 'James',
    'peter1': '1 Peter',
    'peter2': '2 Peter',
    'john1': '1 John',
    'john2': '2 John',
    'john3': '3 John',
    'jude': 'Jude',
    'revelation': 'Revelation'
  },
  'en-US': {
    'genesis': 'Genesis',
    'exodus': 'Exodus',
    'leviticus': 'Leviticus',
    'numbers': 'Numbers',
    'deuteronomy': 'Deuteronomy',
    'joshua': 'Joshua',
    'judges': 'Judges',
    'ruth': 'Ruth',
    'samuel1': '1 Samuel',
    'samuel2': '2 Samuel',
    'kings1': '1 Kings',
    'kings2': '2 Kings',
    'chronicles1': '1 Chronicles',
    'chronicles2': '2 Chronicles',
    'ezra': 'Ezra',
    'nehemiah': 'Nehemiah',
    'esther': 'Esther',
    'job': 'Job',
    'psalms': 'Psalms',
    'proverbs': 'Proverbs',
    'ecclesiastes': 'Ecclesiastes',
    'song': 'Song of Solomon',
    'isaiah': 'Isaiah',
    'jeremiah': 'Jeremiah',
    'lamentations': 'Lamentations',
    'ezekiel': 'Ezekiel',
    'daniel': 'Daniel',
    'hosea': 'Hosea',
    'joel': 'Joel',
    'amos': 'Amos',
    'obadiah': 'Obadiah',
    'jonah': 'Jonah',
    'micah': 'Micah',
    'nahum': 'Nahum',
    'habakkuk': 'Habakkuk',
    'zephaniah': 'Zephaniah',
    'haggai': 'Haggai',
    'zechariah': 'Zechariah',
    'malachi': 'Malachi',
    'matthew': 'Matthew',
    'mark': 'Mark',
    'luke': 'Luke',
    'john': 'John',
    'acts': 'Acts',
    'romans': 'Romans',
    'corinthians1': '1 Corinthians',
    'corinthians2': '2 Corinthians',
    'galatians': 'Galatians',
    'ephesians': 'Ephesians',
    'philippians': 'Philippians',
    'colossians': 'Colossians',
    'thessalonians1': '1 Thessalonians',
    'thessalonians2': '2 Thessalonians',
    'timothy1': '1 Timothy',
    'timothy2': '2 Timothy',
    'titus': 'Titus',
    'philemon': 'Philemon',
    'hebrews': 'Hebrews',
    'james': 'James',
    'peter1': '1 Peter',
    'peter2': '2 Peter',
    'john1': '1 John',
    'john2': '2 John',
    'john3': '3 John',
    'jude': 'Jude',
    'revelation': 'Revelation'
  },
  'es-ES': {
    'genesis': 'Genesis',
    'exodus': 'Exodo',
    'leviticus': 'Levitico',
    'numbers': 'Numeros',
    'deuteronomy': 'Deuteronomio',
    'joshua': 'Josue',
    'judges': 'Jueces',
    'ruth': 'Rut',
    'samuel1': '1 Samuel',
    'samuel2': '2 Samuel',
    'kings1': '1 Reyes',
    'kings2': '2 Reyes',
    'chronicles1': '1 Cronicas',
    'chronicles2': '2 Cronicas',
    'ezra': 'Esdras',
    'nehemiah': 'Nehemias',
    'esther': 'Ester',
    'job': 'Job',
    'psalms': 'Salmos',
    'proverbs': 'Proverbios',
    'ecclesiastes': 'Eclesiastes',
    'song': 'Cantares',
    'isaiah': 'Isaias',
    'jeremiah': 'Jeremias',
    'lamentations': 'Lamentaciones',
    'ezekiel': 'Ezequiel',
    'daniel': 'Daniel',
    'hosea': 'Oseas',
    'joel': 'Joel',
    'amos': 'Amos',
    'obadiah': 'Abdias',
    'jonah': 'Jonas',
    'micah': 'Miqueas',
    'nahum': 'Nahum',
    'habakkuk': 'Habacuc',
    'zephaniah': 'Sofonias',
    'haggai': 'Hageo',
    'zechariah': 'Zacarias',
    'malachi': 'Malaquias',
    'matthew': 'Mateo',
    'mark': 'Marcos',
    'luke': 'Lucas',
    'john': 'Juan',
    'acts': 'Hechos',
    'romans': 'Romanos',
    'corinthians1': '1 Corintios',
    'corinthians2': '2 Corintios',
    'galatians': 'Galatas',
    'ephesians': 'Efesios',
    'philippians': 'Filipenses',
    'colossians': 'Colosenses',
    'thessalonians1': '1 Tesalonicenses',
    'thessalonians2': '2 Tesalonicenses',
    'timothy1': '1 Timoteo',
    'timothy2': '2 Timoteo',
    'titus': 'Tito',
    'philemon': 'Filemon',
    'hebrews': 'Hebreos',
    'james': 'Santiago',
    'peter1': '1 Pedro',
    'peter2': '2 Pedro',
    'john1': '1 Juan',
    'john2': '2 Juan',
    'john3': '3 Juan',
    'jude': 'Judas',
    'revelation': 'Apocalipsis'
  }
}
