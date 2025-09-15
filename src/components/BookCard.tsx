import { Link } from 'react-router-dom'
import { Book } from '../types/bible'
import { useTranslation } from 'react-i18next'

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const { t } = useTranslation()
  
  return (
    <Link
      to={`/book/${book.id}/chapter/1`}
      className="card hover:shadow-md transition-shadow group p-4 md:p-6"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors text-base md:text-lg">
          {book.name}
        </h3>
        <span className="text-xs md:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded flex-shrink-0">
          {book.abbreviation}
        </span>
      </div>
      <p className="text-sm text-gray-600">
        {book.chapters} {book.chapters === 1 ? t('books.chapter') : t('books.chapters')}
      </p>
    </Link>
  )
}
