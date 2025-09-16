import { useState } from 'react'
import { useOfflineStatus } from '../hooks/useBibleApi'
import { Wifi, WifiOff, Download, Trash2, RefreshCw, Database, CheckCircle } from 'lucide-react'

export function OfflineStatus() {
  const {
    isOnline,
    lastSync,
    pendingSync,
    syncInProgress,
    offlineStats,
    preloadPopularChapters,
    clearOfflineData,
    forceSync
  } = useOfflineStatus()

  const [isPreloading, setIsPreloading] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handlePreload = async () => {
    setIsPreloading(true)
    try {
      await preloadPopularChapters()
    } finally {
      setIsPreloading(false)
    }
  }

  const handleClearData = async () => {
    if (confirm('Tem certeza que deseja limpar todos os dados offline? Esta ação não pode ser desfeita.')) {
      await clearOfflineData()
    }
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'Nunca'
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <Wifi className="w-5 h-5 text-green-500" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-500" />
          )}
          <h3 className="text-lg font-semibold">
            {isOnline ? 'Online' : 'Offline'}
          </h3>
          {syncInProgress && (
            <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
          )}
        </div>
        
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          {showDetails ? 'Ocultar' : 'Detalhes'}
        </button>
      </div>

      {showDetails && (
        <div className="space-y-4">
          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Database className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Capítulos</span>
              </div>
              <p className="text-lg font-bold text-blue-600">
                {offlineStats?.chaptersCount || 0}
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Favoritos</span>
              </div>
              <p className="text-lg font-bold text-green-600">
                {offlineStats?.favoritesCount || 0}
              </p>
            </div>
          </div>

          {/* Status de sincronização */}
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="text-sm font-medium mb-2">Sincronização</h4>
            <p className="text-sm text-gray-600">
              Última sincronização: {formatDate(lastSync)}
            </p>
            {pendingSync && (
              <p className="text-sm text-orange-600 mt-1">
                ⚠️ Sincronização pendente
              </p>
            )}
          </div>

          {/* Ações */}
          <div className="space-y-2">
            <button
              onClick={handlePreload}
              disabled={isPreloading || !isOnline}
              className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              <span>
                {isPreloading ? 'Pré-carregando...' : 'Pré-carregar Capítulos Populares'}
              </span>
            </button>

            <div className="flex space-x-2">
              <button
                onClick={forceSync}
                disabled={!isOnline || syncInProgress}
                className="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${syncInProgress ? 'animate-spin' : ''}`} />
                <span>Sincronizar</span>
              </button>

              <button
                onClick={handleClearData}
                disabled={!offlineStats?.hasOfflineData}
                className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4" />
                <span>Limpar</span>
              </button>
            </div>
          </div>

          {/* Informações */}
          <div className="bg-blue-50 rounded-lg p-3">
            <h4 className="text-sm font-medium text-blue-800 mb-1">
              💡 Como funciona
            </h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Capítulos são salvos automaticamente quando lidos</li>
              <li>• Pré-carregue capítulos populares para uso offline</li>
              <li>• Favoritos são sempre salvos localmente</li>
              <li>• Sincronização automática quando online</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
