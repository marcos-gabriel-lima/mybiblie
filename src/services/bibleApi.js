// Serviço para integração com Bible API
const BIBLE_API_BASE_URL = 'https://bible-api.com'

// Importar dados locais em português
import { getLocalPortugueseVerse, searchPortugueseVerses } from '../data/portugueseBible.js'

// APIs alternativas para português (para implementação futura)
// const PORTUGUESE_APIS = {
//   alternative: 'https://api.bible.com/v1/bibles',
//   local: '/api/bible'
// }

// Função para buscar um versículo específico
export async function getVerse(reference) {
  try {
    const response = await fetch(`${BIBLE_API_BASE_URL}/${reference}`)
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar versículo:', error)
    throw error
  }
}

// Função para buscar um capítulo completo
export async function getChapter(book, chapter) {
  try {
    const reference = `${book}+${chapter}`
    const response = await fetch(`${BIBLE_API_BASE_URL}/${reference}`)
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar capítulo:', error)
    throw error
  }
}

// Função para buscar um livro completo
export async function getBook(book) {
  try {
    const response = await fetch(`${BIBLE_API_BASE_URL}/${book}`)
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar livro:', error)
    throw error
  }
}

// Função para buscar por texto (busca)
export async function searchVerses(query) {
  try {
    const response = await fetch(`${BIBLE_API_BASE_URL}/${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar versículos:', error)
    throw error
  }
}

// Mapeamento de nomes de livros para formato da API
export const BOOK_API_MAPPING = {
  'Gênesis': 'genesis',
  'Êxodo': 'exodus',
  'Levítico': 'leviticus',
  'Números': 'numbers',
  'Deuteronômio': 'deuteronomy',
  'Josué': 'joshua',
  'Juízes': 'judges',
  'Rute': 'ruth',
  '1 Samuel': '1 samuel',
  '2 Samuel': '2 samuel',
  '1 Reis': '1 kings',
  '2 Reis': '2 kings',
  '1 Crônicas': '1 chronicles',
  '2 Crônicas': '2 chronicles',
  'Esdras': 'ezra',
  'Neemias': 'nehemiah',
  'Ester': 'esther',
  'Jó': 'job',
  'Salmos': 'psalms',
  'Provérbios': 'proverbs',
  'Eclesiastes': 'ecclesiastes',
  'Cantares': 'song of solomon',
  'Isaías': 'isaiah',
  'Jeremias': 'jeremiah',
  'Lamentações': 'lamentations',
  'Ezequiel': 'ezekiel',
  'Daniel': 'daniel',
  'Oséias': 'hosea',
  'Joel': 'joel',
  'Amós': 'amos',
  'Obadias': 'obadiah',
  'Jonas': 'jonah',
  'Miquéias': 'micah',
  'Naum': 'nahum',
  'Habacuque': 'habakkuk',
  'Sofonias': 'zephaniah',
  'Ageu': 'haggai',
  'Zacarias': 'zechariah',
  'Malaquias': 'malachi',
  'Mateus': 'matthew',
  'Marcos': 'mark',
  'Lucas': 'luke',
  'João': 'john',
  'Atos': 'acts',
  'Romanos': 'romans',
  '1 Coríntios': '1 corinthians',
  '2 Coríntios': '2 corinthians',
  'Gálatas': 'galatians',
  'Efésios': 'ephesians',
  'Filipenses': 'philippians',
  'Colossenses': 'colossians',
  '1 Tessalonicenses': '1 thessalonians',
  '2 Tessalonicenses': '2 thessalonians',
  '1 Timóteo': '1 timothy',
  '2 Timóteo': '2 timothy',
  'Tito': 'titus',
  'Filemom': 'philemon',
  'Hebreus': 'hebrews',
  'Tiago': 'james',
  '1 Pedro': '1 peter',
  '2 Pedro': '2 peter',
  '1 João': '1 john',
  '2 João': '2 john',
  '3 João': '3 john',
  'Judas': 'jude',
  'Apocalipse': 'revelation'
}

// Função para converter nome do livro para formato da API
export function getBookApiName(bookName) {
  return BOOK_API_MAPPING[bookName] || bookName.toLowerCase()
}

// Função para processar versículos da API
export function processVerses(apiData) {
  if (!apiData || !apiData.verses) {
    return []
  }
  
  return apiData.verses.map(verse => ({
    number: verse.verse,
    text: verse.text
  }))
}

// Função para buscar versículo em português (com fallback para inglês)
export async function getVersePortuguese(reference, translation = 'almeida') {
  try {
    // Primeiro, tenta buscar em português usando diferentes estratégias
    let portugueseData = await tryPortugueseSources(reference, translation)
    
    if (portugueseData) {
      return portugueseData
    }
    
    // Fallback para inglês se não encontrar em português
    console.warn(`Não foi possível encontrar ${reference} em português, usando versão em inglês`)
    return await getVerse(reference)
  } catch (error) {
    console.error('Erro ao buscar versículo em português:', error)
    // Fallback para inglês em caso de erro
    return await getVerse(reference)
  }
}

// Função para tentar diferentes fontes em português
async function tryPortugueseSources(reference, translation) {
  // Estratégia 1: Tentar com parâmetros de idioma na API atual
  try {
    const response = await fetch(`${BIBLE_API_BASE_URL}/${reference}?translation=${translation}`)
    if (response.ok) {
      const data = await response.json()
      if (data && data.verses && data.verses.length > 0) {
        return data
      }
    }
  } catch (error) {
    console.log('Estratégia 1 falhou:', error.message)
  }
  
  // Estratégia 2: Usar dados locais em português
  try {
    const localData = await getLocalPortugueseVerseData(reference)
    if (localData) {
      return localData
    }
  } catch (error) {
    console.log('Estratégia 2 falhou:', error.message)
  }
  
  return null
}

// Função para obter versículos em português de dados locais
async function getLocalPortugueseVerseData(reference) {
  // Usar os dados locais importados
  return getLocalPortugueseVerse(reference)
}

// Função para buscar capítulo em português
export async function getChapterPortuguese(book, chapter, translation = 'almeida') {
  try {
    const reference = `${book}+${chapter}`
    return await getVersePortuguese(reference, translation)
  } catch (error) {
    console.error('Erro ao buscar capítulo em português:', error)
    return await getChapter(book, chapter)
  }
}

// Função para buscar livro em português
export async function getBookPortuguese(book, translation = 'almeida') {
  try {
    return await getVersePortuguese(book, translation)
  } catch (error) {
    console.error('Erro ao buscar livro em português:', error)
    return await getBook(book)
  }
}

// Configurações de traduções disponíveis
export const AVAILABLE_TRANSLATIONS = {
  almeida: {
    name: 'Almeida Revista e Corrigida',
    code: 'ARC',
    language: 'pt-BR',
    description: 'Tradução clássica da Bíblia em português'
  },
  nvi: {
    name: 'Nova Versão Internacional',
    code: 'NVI',
    language: 'pt-BR',
    description: 'Tradução moderna e acessível'
  },
  ntlh: {
    name: 'Nova Tradução na Linguagem de Hoje',
    code: 'NTLH',
    language: 'pt-BR',
    description: 'Linguagem simples e atual'
  },
  english: {
    name: 'King James Version',
    code: 'KJV',
    language: 'en-US',
    description: 'English translation (fallback)'
  }
}

// Função para obter configuração de tradução
export function getTranslationConfig(translationCode) {
  return AVAILABLE_TRANSLATIONS[translationCode] || AVAILABLE_TRANSLATIONS.almeida
}

// Função para buscar por texto em português
export async function searchVersesPortuguese(query, translation = 'almeida') {
  try {
    // Primeiro, tenta buscar nos dados locais
    const localResults = searchPortugueseVerses(query)
    if (localResults && localResults.length > 0) {
      return {
        query: query,
        results: localResults,
        translation: translation,
        source: 'local'
      }
    }
    
    // Fallback para busca em inglês
    console.warn(`Não foi possível encontrar "${query}" em português, usando busca em inglês`)
    return await searchVerses(query)
  } catch (error) {
    console.error('Erro ao buscar versículos em português:', error)
    return await searchVerses(query)
  }
}
