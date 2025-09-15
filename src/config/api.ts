// Configurações da API
export const API_CONFIG = {
  // Bible API base URL
  BIBLE_API_BASE: 'https://bible-api.com',
  
  // Timeout para requisições (em ms)
  REQUEST_TIMEOUT: 10000,
  
  // Tamanho máximo do cache
  MAX_CACHE_SIZE: 100,
  
  // Configurações de retry
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  
  // Headers padrão
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

// Configurações de desenvolvimento
export const DEV_CONFIG = {
  // Log de requisições em desenvolvimento
  LOG_REQUESTS: process.env.NODE_ENV === 'development',
  
  // Mock de dados em desenvolvimento (se necessário)
  USE_MOCK_DATA: false,
  
  // Cache em desenvolvimento
  ENABLE_CACHE: true
}

