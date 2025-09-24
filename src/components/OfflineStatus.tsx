import { useState } from 'react'
import { 
  Wifi, 
  WifiOff, 
  Download, 
  Trash2, 
  RefreshCw, 
  Smartphone,
  CheckCircle,
  AlertCircle,
  Info,
  Database,
  HardDrive,
  Activity,
  Zap
} from 'lucide-react'
import { useOffline, useCacheSizeFormatter } from '../hooks/useOffline'
import { useTranslation } from 'react-i18next'

export function OfflineStatus() {
  const { t } = useTranslation()
  const {
    isOnline,
    isInstalled,
    canInstall,
    cacheSize,
    lastSync,
    isServiceWorkerActive,
    cacheStats,
    installApp,
    clearCache,
    syncOfflineContent,
    checkCacheSize,
    preloadBook,
    getCacheStats,
    updateServiceWorker
  } = useOffline()
  
  const { formatBytes } = useCacheSizeFormatter()
  const [isLoading, setIsLoading] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleInstall = async () => {
    setIsLoading(true)
    try {
      await installApp()
    } catch (error) {
      console.error('Erro ao instalar:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearCache = async () => {
    setIsLoading(true)
    try {
      await clearCache()
    } catch (error) {
      console.error('Erro ao limpar cache:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSync = async () => {
    setIsLoading(true)
    try {
      await syncOfflineContent()
    } catch (error) {
      console.error('Erro na sincronização:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreloadBook = async () => {
    setIsLoading(true)
    try {
      await preloadBook('Genesis', 'acf')
      await preloadBook('Psalms', 'acf')
      await preloadBook('John', 'acf')
      await preloadBook('Matthew', 'acf')
    } catch (error) {
      console.error('Erro no pré-carregamento:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateServiceWorker = async () => {
    setIsLoading(true)
    try {
      await updateServiceWorker()
    } catch (error) {
      console.error('Erro na atualização:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefreshStats = async () => {
    setIsLoading(true)
    try {
      await getCacheStats()
      await checkCacheSize()
    } catch (error) {
      console.error('Erro ao atualizar estatísticas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Status Principal */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isOnline ? (
              <Wifi className="w-5 h-5 text-green-500" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-500" />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                {isOnline ? 'Conectado' : 'Modo Offline'}
              </h3>
              <p className="text-sm text-gray-600">
                {isOnline 
                  ? 'Você está conectado à internet' 
                  : 'Funcionando offline - conteúdo limitado'
                }
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {isServiceWorkerActive && (
                <Activity className="w-4 h-4 text-green-500" title="Service Worker ativo" />
              )}
              {isInstalled && (
                <Smartphone className="w-4 h-4 text-blue-500" title="App instalado" />
              )}
            </div>
          </div>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="btn-secondary text-sm"
          >
            {showDetails ? 'Ocultar' : 'Detalhes'}
          </button>
        </div>
      </div>

      {/* Detalhes Expandidos */}
      {showDetails && (
        <div className="space-y-4">
          {/* Status de Instalação */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <Smartphone className="w-4 h-4 mr-2" />
                Instalação do App
              </h4>
              {isInstalled && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`text-sm font-medium ${
                  isInstalled ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {isInstalled ? 'Instalado' : 'Não instalado'}
                </span>
              </div>
              
              {canInstall && !isInstalled && (
                <button
                  onClick={handleInstall}
                  disabled={isLoading}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 mr-2" />
                  )}
                  Instalar App
                </button>
              )}
              
              {isInstalled && (
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  App instalado e funcionando offline
                </div>
              )}
            </div>
          </div>

          {/* Cache e Armazenamento */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <Database className="w-4 h-4 mr-2" />
                Cache e Armazenamento
              </h4>
              <button
                onClick={handleRefreshStats}
                disabled={isLoading}
                className="text-sm text-gray-500 hover:text-gray-700"
                title="Atualizar estatísticas"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tamanho total do cache:</span>
                <span className="text-sm font-medium">
                  {formatBytes(cacheSize)}
                </span>
              </div>
              
              {/* Estatísticas detalhadas */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Estático:</span>
                  <span className="font-medium">{cacheStats.static} itens</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Dinâmico:</span>
                  <span className="font-medium">{cacheStats.dynamic} itens</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Bíblia:</span>
                  <span className="font-medium">{cacheStats.bible} capítulos</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Fontes:</span>
                  <span className="font-medium">{cacheStats.fonts} itens</span>
                </div>
              </div>
              
              {lastSync && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Última sincronização:</span>
                  <span className="text-sm font-medium">
                    {lastSync.toLocaleString()}
                  </span>
                </div>
              )}
              
              <div className="flex space-x-2">
                <button
                  onClick={handleSync}
                  disabled={isLoading || !isOnline}
                  className="btn-secondary flex-1 flex items-center justify-center text-sm"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  Sincronizar
                </button>
                
                <button
                  onClick={handleClearCache}
                  disabled={isLoading}
                  className="btn-secondary flex-1 flex items-center justify-center text-sm"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4 mr-2" />
                  )}
                  Limpar Cache
                </button>
              </div>
            </div>
          </div>

          {/* Funcionalidades Avançadas */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Funcionalidades Avançadas
              </h4>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="btn-secondary text-sm"
              >
                {showAdvanced ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            
            {showAdvanced && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Service Worker:</span>
                  <span className={`text-sm font-medium ${
                    isServiceWorkerActive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isServiceWorkerActive ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={handlePreloadBook}
                    disabled={isLoading || !isOnline}
                    className="btn-secondary flex-1 flex items-center justify-center text-sm"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <HardDrive className="w-4 h-4 mr-2" />
                    )}
                    Pré-carregar Livros
                  </button>
                  
                  <button
                    onClick={handleUpdateServiceWorker}
                    disabled={isLoading}
                    className="btn-secondary flex-1 flex items-center justify-center text-sm"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    Atualizar SW
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dicas Offline */}
          <div className="card bg-blue-50 border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Como usar offline
            </h4>
            
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Instale o app para acesso completo offline</li>
              <li>• Sincronize conteúdo quando estiver online</li>
              <li>• Favoritos e notas funcionam sempre offline</li>
              <li>• Busca funciona apenas com conteúdo cacheado</li>
              <li>• Cache é limpo automaticamente quando necessário</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente compacto para header
export function OfflineIndicator() {
  const { isOnline, isInstalled } = useOffline()
  
  if (isInstalled) {
    return (
      <div className="flex items-center space-x-1 text-green-600">
        <Smartphone className="w-4 h-4" />
        <span className="text-xs font-medium">Instalado</span>
      </div>
    )
  }
  
  if (!isOnline) {
    return (
      <div className="flex items-center space-x-1 text-red-600">
        <WifiOff className="w-4 h-4" />
        <span className="text-xs font-medium">Offline</span>
      </div>
    )
  }
  
  return null
}