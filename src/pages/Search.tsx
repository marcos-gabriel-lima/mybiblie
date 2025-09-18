import { useState } from 'react'
import { Search as SearchIcon, Loader2, AlertCircle } from 'lucide-react'
import { useBibleSearch } from '../hooks/useBibleApi'

export function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const { results, loading, error, search, clearResults, clearError } = useBibleSearch()

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      clearResults()
      return
    }
    search(searchTerm)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Buscar na Bíblia</h1>
        <p className="text-gray-600">Encontre versículos específicos ou palavras-chave</p>
      </div>

      {/* Search Form */}
      <div className="card">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Digite uma palavra ou frase para buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={!searchTerm.trim() || loading}
            className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Buscando...
              </>
            ) : (
              'Buscar'
            )}
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-center mb-3">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-red-900">Erro na Busca</h3>
          </div>
          <p className="text-red-800 mb-4">{error}</p>
          <button
            onClick={() => {
              clearError()
              handleSearch()
            }}
            className="btn-primary"
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
          </h2>
          
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary-600 mb-2">
                      {result.book.name} {result.chapter}:{result.verse}
                    </h3>
                    <p className="verse-text">
                      <span className="verse-number">{result.verse}</span>
                      {result.text}
                    </p>
                  </div>
                  <a
                    href={`/book/${result.book.id}/chapter/${result.chapter}`}
                    className="btn-secondary text-sm ml-4"
                  >
                    Ler
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchTerm && results.length === 0 && !loading && (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum resultado encontrado
          </h3>
          <p className="text-gray-600">
            Tente usar palavras diferentes ou verifique a ortografia.
          </p>
        </div>
      )}

      {/* Search Tips */}
      {!searchTerm && (
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Dicas de Busca</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Use palavras-chave específicas para encontrar versículos relevantes</li>
            <li>• Busque por temas como "amor", "fé", "esperança", "salvação"</li>
            <li>• Procure por frases conhecidas como "Porque Deus amou o mundo"</li>
            <li>• A busca é case-insensitive (não diferencia maiúsculas de minúsculas)</li>
          </ul>
        </div>
      )}
    </div>
  )
}
