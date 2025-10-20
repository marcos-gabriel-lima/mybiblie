// Serviço para integração com Bible API
const BIBLE_API_BASE_URL = 'https://bible-api.com'

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
