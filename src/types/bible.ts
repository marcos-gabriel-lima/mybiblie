export interface Book {
  id: string
  name: string
  testament: 'old' | 'new'
  chapters: number
  abbreviation: string
}

export interface Verse {
  number: number
  text: string
}

export interface Chapter {
  number: number
  verses: Verse[]
}

export interface BibleData {
  books: Book[]
  chapters: Record<string, Chapter[]>
}

export interface SearchResult {
  book: Book
  chapter: number
  verse: number
  text: string
}

export interface Favorite {
  id: string
  bookId: string
  chapter: number
  verse: number
  text: string
  addedAt: Date
}

export interface Note {
  id: string
  bookId: string
  chapter: number
  verse: number
  text: string
  note: string
  createdAt: Date
  updatedAt: Date
}



