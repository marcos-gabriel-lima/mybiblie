// Configurações da aplicação Bíblia Digital
export const APP_CONFIG = {
  // Informações da aplicação
  name: 'Bíblia Digital',
  version: '1.0.0',
  description: 'Aplicação Digital da Bíblia',
  
  // Configurações de desenvolvimento
  dev: {
    serverPort: 9000,
    serverHost: 'localhost'
  },
  
  // Configurações de produção
  prod: {
    serverPort: 4173
  },
  
  // Configurações de tema
  theme: {
    default: 'light',
    enableDarkMode: true,
    primaryColor: '#8B4513',
    secondaryColor: '#DAA520'
  },
  
  // Configurações de fonte
  font: {
    defaultSize: 16,
    minSize: 12,
    maxSize: 24,
    family: 'Georgia, Times New Roman, serif'
  },
  
  // Configurações de leitura
  reading: {
    defaultTranslation: 'almeida',
    enableNotes: true,
    enableBookmarks: true,
    enableHighlights: true
  },
  
  // Configurações de cache
  cache: {
    enabled: true,
    duration: 3600000, // 1 hora em millisegundos
    maxSize: 50 // MB
  },
  
  // Configurações de API (para futuras implementações)
  api: {
    baseUrl: 'https://api.biblia.com',
    timeout: 10000,
    retryAttempts: 3
  }
}

// Funções utilitárias para configuração
export function getConfigValue(key, defaultValue = null) {
  const keys = key.split('.')
  let value = APP_CONFIG
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      return defaultValue
    }
  }
  
  return value
}

export function updateConfigValue(key, newValue) {
  const keys = key.split('.')
  let config = APP_CONFIG
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!config[keys[i]]) {
      config[keys[i]] = {}
    }
    config = config[keys[i]]
  }
  
  config[keys[keys.length - 1]] = newValue
}

// Configurações específicas para diferentes ambientes
export const ENV_CONFIG = {
  development: {
    debug: true,
    logLevel: 'debug',
    enableDevTools: true
  },
  production: {
    debug: false,
    logLevel: 'error',
    enableDevTools: false
  },
  test: {
    debug: true,
    logLevel: 'warn',
    enableDevTools: false
  }
}
