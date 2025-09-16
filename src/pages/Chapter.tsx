import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { books } from '../data/bible'
import { ArrowLeft, ArrowRight, Heart, Share2 } from 'lucide-react'
import { useBibleApi } from '../hooks/useBibleApi'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorState } from '../components/ErrorState'
import { useTranslation } from 'react-i18next'
import { Favorite } from '../types/bible'
import { databaseService } from '../services/database'

export function Chapter() {
  const { t, i18n } = useTranslation()
  const { bookId, chapterNumber } = useParams<{ bookId: string; chapterNumber: string }>()
  const [book, setBook] = useState<any>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [fontSize, setFontSize] = useState('medium')
  const [favorites, setFavorites] = useState<Favorite[]>([])
  
  const { chapter, loading, error, loadChapter, clearError } = useBibleApi()

  useEffect(() => {
    if (bookId && chapterNumber) {
      // Find the book
      const foundBook = books.find(b => b.id === bookId)
      setBook(foundBook)

      // Load chapter data from API
      loadChapter(bookId, parseInt(chapterNumber))
    }
  }, [bookId, chapterNumber, loadChapter, i18n.language])

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('bible-favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const handlePreviousChapter = () => {
    if (book && chapterNumber) {
      const prevChapter = parseInt(chapterNumber) - 1
      if (prevChapter >= 1) {
        loadChapter(bookId!, prevChapter)
        window.history.pushState({}, '', `/book/${bookId}/chapter/${prevChapter}`)
      }
    }
  }

  const handleNextChapter = () => {
    if (book && chapterNumber) {
      const nextChapter = parseInt(chapterNumber) + 1
      if (nextChapter <= book.chapters) {
        loadChapter(bookId!, nextChapter)
        window.history.pushState({}, '', `/book/${bookId}/chapter/${nextChapter}`)
      }
    }
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // Here you would save to localStorage or API
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${book?.name} ${chapterNumber}`,
          text: `Leia ${book?.name} ${chapterNumber} no Bíblia App`,
          url: window.location.href
        })
      } catch (err) {
        console.log('Erro ao compartilhar:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copiado para a área de transferência!')
    }
  }

  const handleToggleVerseFavorite = async (verse: any) => {
    console.log('handleToggleVerseFavorite called with:', { verse, bookId, chapterNumber, book })
    if (!bookId || !chapterNumber || !book) {
      console.log('Missing required data:', { bookId, chapterNumber, book })
      return
    }

    const verseId = `${bookId}-${chapterNumber}-${verse.number}`
    console.log('Generated verseId:', verseId)
    const existingFavorite = favorites.find(fav => fav.id === verseId)
    console.log('Existing favorite found:', existingFavorite)

    try {
      let updatedFavorites: Favorite[]

      if (existingFavorite) {
        // Remove from favorites
        await databaseService.removeFavorite(verseId)
        updatedFavorites = favorites.filter(fav => fav.id !== verseId)
        console.log('Favorite removed from database:', verseId)
      } else {
        // Add to favorites
        const newFavorite: Favorite = {
          id: verseId,
          bookId: bookId,
          chapter: parseInt(chapterNumber),
          verse: verse.number,
          text: verse.text,
          addedAt: new Date()
        }
        await databaseService.saveFavorite(newFavorite)
        updatedFavorites = [...favorites, newFavorite]
        console.log('Favorite saved to database:', verseId)
      }

      setFavorites(updatedFavorites)
      console.log('Updated favorites state:', updatedFavorites)
      
      // Manter sincronização com localStorage para compatibilidade
      const favoritesForStorage = updatedFavorites.map(fav => ({
        ...fav,
        addedAt: fav.addedAt.toISOString()
      }))
      
      localStorage.setItem('bible-favorites', JSON.stringify(favoritesForStorage))
      
      console.log('Favorito salvo:', existingFavorite ? 'removido' : 'adicionado', verseId)
      console.log('Total de favoritos agora:', updatedFavorites.length)
      
      // Dispatch custom event to notify other components
      const event = new CustomEvent('favoritesUpdated', { 
        detail: { favorites: updatedFavorites } 
      })
      console.log('Dispatching favoritesUpdated event:', event)
      window.dispatchEvent(event)
    } catch (error) {
      console.error('Erro ao salvar/remover favorito:', error)
    }
  }

  const fontSizeClasses = {
    small: 'text-base',
    medium: 'text-lg',
    large: 'text-xl',
    xlarge: 'text-2xl'
  }

  if (!book) {
    return <ErrorState message={t('chapter.bookNotFound')} />
  }

  if (loading) {
    return <LoadingSpinner text={t('chapter.loading')} />
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => {
          clearError()
          if (bookId && chapterNumber) {
            loadChapter(bookId, parseInt(chapterNumber))
          }
        }}
      />
    )
  }

  if (!chapter) {
    return <ErrorState message={t('chapter.chapterNotFound')} />
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 px-2 md:px-4">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <Link to="/books" className="flex items-center text-gray-600 hover:text-gray-900 text-sm md:text-base">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('chapter.backToBooks')}
          </Link>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleToggleFavorite}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite 
                  ? 'text-red-500 bg-red-50' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {book.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            {t('chapter.chapter')} {chapter.number}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 pt-6 border-t border-gray-200 space-y-4 md:space-y-0">
          <button
            onClick={handlePreviousChapter}
            disabled={parseInt(chapterNumber || '1') <= 1}
            className="flex items-center px-3 md:px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('chapter.previousChapter')}
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-xs md:text-sm text-gray-500">{t('chapter.fontSize')}</span>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="px-2 md:px-3 py-1 border border-gray-300 rounded-lg text-xs md:text-sm"
            >
              <option value="small">{t('chapter.fontSizeOptions.small')}</option>
              <option value="medium">{t('chapter.fontSizeOptions.medium')}</option>
              <option value="large">{t('chapter.fontSizeOptions.large')}</option>
              <option value="xlarge">{t('chapter.fontSizeOptions.xlarge')}</option>
            </select>
          </div>

          <button
            onClick={handleNextChapter}
            disabled={parseInt(chapterNumber || '1') >= book.chapters}
            className="flex items-center px-3 md:px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
          >
            {t('chapter.nextChapter')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* Chapter Content */}
      <div className="card">
        <div className={`verse-text ${fontSizeClasses[fontSize as keyof typeof fontSizeClasses]} leading-relaxed space-y-3 md:space-y-4`}>
          {chapter.verses.map((verse: any) => {
            const verseId = `${bookId}-${chapterNumber}-${verse.number}`
            const isVerseFavorite = favorites.some(fav => fav.id === verseId)
            
            return (
                 <div key={verse.number} className="flex items-start space-x-2 md:space-x-3 group">
                   <span className="verse-number flex-shrink-0 mt-1 text-sm md:text-base">
                     {verse.number}
                   </span>
                   <span className="flex-1 text-sm md:text-base leading-relaxed">
                     {verse.text}
                   </span>
                   <button
                     onClick={() => {
                       console.log('Heart button clicked for verse:', verse.number)
                       handleToggleVerseFavorite(verse)
                     }}
                     onMouseEnter={() => console.log('Mouse entered verse', verse.number)}
                     className={`opacity-100 transition-opacity p-1 rounded ${
                       isVerseFavorite 
                         ? 'text-red-500 bg-red-50' 
                         : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                     }`}
                     title={isVerseFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                   >
                     <Heart className={`w-4 h-4 ${isVerseFavorite ? 'fill-current' : ''}`} />
                   </button>
                 </div>
            )
          })}
        </div>
      </div>

      {/* Chapter Navigation Footer */}
      <div className="card">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <button
            onClick={handlePreviousChapter}
            disabled={parseInt(chapterNumber || '1') <= 1}
            className="flex items-center px-4 md:px-6 py-2 md:py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base w-full md:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('chapter.previousChapter')}
          </button>

          <div className="text-center">
            <p className="text-xs md:text-sm text-gray-500">
              {parseInt(chapterNumber || '1')} {t('chapter.of')} {book.chapters} {t('books.chapters')}
            </p>
          </div>

          <button
            onClick={handleNextChapter}
            disabled={parseInt(chapterNumber || '1') >= book.chapters}
            className="flex items-center px-4 md:px-6 py-2 md:py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base w-full md:w-auto justify-center"
          >
            {t('chapter.nextChapter')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}