import { useState, useEffect } from 'react'
import { 
  Settings as SettingsIcon, 
  Download, 
  Trash2, 
  RefreshCw,
  Smartphone,
  Globe,
  Type,
  Palette
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useOffline } from '../hooks/useOffline'
import { OfflineStatus } from '../components/OfflineStatus'
import { LanguageSelector } from '../components/LanguageSelector'
import { useLanguage } from '../hooks/useLanguage'

export function Settings() {
  const { t } = useTranslation()
  const { currentLanguage, getCurrentLanguage } = useLanguage()
  const {
    isOnline,
    isInstalled,
    canInstall,
    cacheSize,
    lastSync,
    installApp,
    clearCache,
    syncOfflineContent,
    checkCacheSize
  } = useOffline()

  const [fontSize, setFontSize] = useState('medium')
  const [theme, setTheme] = useState('light')
  const [isLoading, setIsLoading] = useState(false)

  // Carregar configurações do localStorage
  useEffect(() => {
    const savedFontSize = localStorage.getItem('bible-app-font-size') || 'medium'
    const savedTheme = localStorage.getItem('bible-app-theme') || 'light'
    
    setFontSize(savedFontSize)
    setTheme(savedTheme)
    
    // Aplicar tema
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const handleFontSizeChange = (newSize: string) => {
    setFontSize(newSize)
    localStorage.setItem('bible-app-font-size', newSize)
    
    // Aplicar tamanho da fonte
    document.documentElement.setAttribute('data-font-size', newSize)
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('bible-app-theme', newTheme)
    
    // Aplicar tema
    document.documentElement.setAttribute('data-theme', newTheme)
  }

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

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (date: Date | null): string => {
    if (!date) return 'Nunca'
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const currentLang = getCurrentLanguage()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <SettingsIcon className="w-8 h-8 mr-3" />
          Configurações
        </h1>
        <p className="text-gray-600">Personalize sua experiência de leitura</p>
      </div>

      {/* Aparência */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          Aparência
        </h2>
        
        <div className="space-y-6">
          {/* Tamanho da Fonte */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tamanho da fonte
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { value: 'small', label: 'Pequeno' },
                { value: 'medium', label: 'Médio' },
                { value: 'large', label: 'Grande' },
                { value: 'xlarge', label: 'Muito Grande' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFontSizeChange(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    fontSize === option.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tema */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tema
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'light', label: 'Claro' },
                { value: 'dark', label: 'Escuro' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleThemeChange(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    theme === option.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Idioma */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Idioma
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Idioma da interface</h3>
              <p className="text-sm text-gray-600">
                {currentLang?.flag} {currentLang?.name}
              </p>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Funcionalidades Offline */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Smartphone className="w-5 h-5 mr-2" />
          Funcionalidades Offline
        </h2>
        
        <OfflineStatus />
      </div>

      {/* Informações do App */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Informações do App
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Versão:</span>
            <span className="text-sm font-medium">1.0.0</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status da conexão:</span>
            <span className={`text-sm font-medium ${
              isOnline ? 'text-green-600' : 'text-red-600'
            }`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">App instalado:</span>
            <span className={`text-sm font-medium ${
              isInstalled ? 'text-green-600' : 'text-gray-600'
            }`}>
              {isInstalled ? 'Sim' : 'Não'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Tamanho do cache:</span>
            <span className="text-sm font-medium">{formatBytes(cacheSize)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Última sincronização:</span>
            <span className="text-sm font-medium">{formatDate(lastSync)}</span>
          </div>
        </div>
      </div>

      {/* Ações */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Ações
        </h2>
        
        <div className="space-y-3">
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
          
          <button
            onClick={handleSync}
            disabled={isLoading || !isOnline}
            className="btn-secondary w-full flex items-center justify-center"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Sincronizar Conteúdo
          </button>
          
          <button
            onClick={handleClearCache}
            disabled={isLoading}
            className="btn-secondary w-full flex items-center justify-center text-red-600 hover:text-red-700"
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
  )
}
