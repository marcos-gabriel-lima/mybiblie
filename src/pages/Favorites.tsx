import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Trash2, BookOpen } from 'lucide-react'
import { Favorite } from '../types/bible'
import { books } from '../data/bible'

export function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    // Load favorites from localStorage
    const loadFavorites = () => {
      const savedFavorites = localStorage.getItem('bible-favorites')
      console.log('Raw localStorage data:', savedFavorites)
      if (savedFavorites) {
        try {
          const parsed = JSON.parse(savedFavorites)
          console.log('Parsed favorites:', parsed)
          // Convert string dates back to Date objects
          const favoritesWithDates = parsed.map((fav: any) => ({
            ...fav,
            addedAt: new Date(fav.addedAt)
          }))
          console.log('Favorites with dates:', favoritesWithDates)
          setFavorites(favoritesWithDates)
        } catch (error) {
          console.error('Erro ao carregar favoritos:', error)
          setFavorites([])
        }
      } else {
        console.log('No favorites found in localStorage')
      }
    }

    loadFavorites()
    console.log('Favorites page loaded, checking localStorage...')

    // Listen for storage changes (when favorites are added from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'bible-favorites') {
        console.log('Storage change detected, reloading favorites...')
        loadFavorites()
      }
    }

    // Listen for custom favorites update event
    const handleFavoritesUpdate = () => {
      console.log('Custom favorites update event received, reloading...')
      loadFavorites()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate)
    }
  }, [])

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id)
    setFavorites(updatedFavorites)
    localStorage.setItem('bible-favorites', JSON.stringify(updatedFavorites))
  }

  const clearAllFavorites = () => {
    if (confirm('Tem certeza que deseja remover todos os favoritos?')) {
      setFavorites([])
      localStorage.removeItem('bible-favorites')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Heart className="w-8 h-8 text-red-500 mr-3" />
          Meus Favoritos
        </h1>
        <p className="text-gray-600">
          {favorites.length === 0 
            ? 'Você ainda não tem versículos favoritos' 
            : `${favorites.length} ${favorites.length === 1 ? 'versículo favorito' : 'versículos favoritos'}`
          }
        </p>
      </div>

      {favorites.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={clearAllFavorites}
            className="btn-secondary text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Limpar Todos
          </button>
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum favorito ainda
          </h3>
          <p className="text-gray-600 mb-6">
            Comece a ler a Bíblia e marque seus versículos favoritos clicando no ícone de coração.
          </p>
          <Link to="/books" className="btn-primary">
            <BookOpen className="w-4 h-4 mr-2" />
            Começar Leitura
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((favorite) => {
            const book = books.find(b => b.id === favorite.bookId)
            return (
              <div key={favorite.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Heart className="w-4 h-4 text-red-500 mr-2 fill-current" />
                      <h3 className="font-semibold text-gray-900">
                        {book?.name} {favorite.chapter}:{favorite.verse}
                      </h3>
                    </div>
                    <p className="verse-text mb-3">
                      <span className="verse-number">{favorite.verse}</span>
                      {favorite.text}
                    </p>
                    <p className="text-sm text-gray-500">
                      Adicionado em {new Date(favorite.addedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                      to={`/book/${favorite.bookId}/chapter/${favorite.chapter}`}
                      className="btn-secondary text-sm"
                    >
                      Ler
                    </Link>
                    <button
                      onClick={() => removeFavorite(favorite.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remover dos favoritos"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Tips */}
      <div className="card bg-green-50 border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-3">Como usar os Favoritos</h3>
        <ul className="space-y-2 text-green-800">
          <li>• Clique no ícone de coração em qualquer versículo para adicioná-lo aos favoritos</li>
          <li>• Seus favoritos são salvos localmente no seu navegador</li>
          <li>• Use os favoritos para revisitar versículos que tocaram seu coração</li>
          <li>• Você pode remover favoritos individualmente ou limpar todos de uma vez</li>
        </ul>
      </div>
    </div>
  )
}

