import { books } from '../data/bible'
import { useState } from 'react'
import { Search, BookOpen } from 'lucide-react'
import { BookCard } from '../components/BookCard'
import { useTranslation } from 'react-i18next'

export function BookList() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTestament, setSelectedTestament] = useState<'all' | 'old' | 'new'>('all')

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.abbreviation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTestament = selectedTestament === 'all' || book.testament === selectedTestament
    return matchesSearch && matchesTestament
  })

  const oldTestamentBooks = filteredBooks.filter(book => book.testament === 'old')
  const newTestamentBooks = filteredBooks.filter(book => book.testament === 'new')

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">{t('books.title')}</h1>
        <p className="text-sm md:text-base text-gray-600">{t('books.subtitle')}</p>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('books.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Testament Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTestament('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTestament === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('books.all')}
            </button>
            <button
              onClick={() => setSelectedTestament('old')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTestament === 'old'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('books.oldTestament')}
            </button>
            <button
              onClick={() => setSelectedTestament('new')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTestament === 'new'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('books.newTestament')}
            </button>
          </div>
        </div>
      </div>

      {/* Old Testament */}
      {selectedTestament === 'all' || selectedTestament === 'old' ? (
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 md:w-6 md:h-6 mr-2 text-primary-600" />
{t('books.oldTestament')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {oldTestamentBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      ) : null}

      {/* New Testament */}
      {selectedTestament === 'all' || selectedTestament === 'new' ? (
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 md:w-6 md:h-6 mr-2 text-primary-600" />
{t('books.newTestament')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {newTestamentBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      ) : null}

      {/* No results */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum livro encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar sua busca ou filtro para encontrar o livro desejado.
          </p>
        </div>
      )}
    </div>
  )
}


