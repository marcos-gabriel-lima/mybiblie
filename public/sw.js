const CACHE_NAME = 'biblia-app-v3'
const STATIC_CACHE = 'biblia-static-v3'
const DYNAMIC_CACHE = 'biblia-dynamic-v3'
const BIBLE_CACHE = 'biblia-content-v3'
const FONTS_CACHE = 'biblia-fonts-v3'

// URLs estáticas para cache inicial
const STATIC_URLS = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon-144x144.png',
  '/icons/icon-96x96.png',
  '/icons/icon-72x72.png'
]

// URLs de fontes para cache
const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
]

// Livros populares para pré-cache
const POPULAR_BOOKS = [
  'Genesis', 'Psalms', 'John', 'Matthew', 'Romans', '1Corinthians',
  'Galatians', 'Ephesians', 'Philippians', 'Colossians'
]

// Traduções suportadas
const TRANSLATIONS = ['acf', 'kjv', 'rvr1960']

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Instalando versão v3...')
  
  event.waitUntil(
    Promise.all([
      // Cache estático
      caches.open(STATIC_CACHE).then(cache => {
        console.log('📦 Cacheando recursos estáticos...')
        return cache.addAll(STATIC_URLS)
      }),
      // Cache de fontes
      caches.open(FONTS_CACHE).then(cache => {
        console.log('🔤 Cacheando fontes...')
        return cache.addAll(FONT_URLS)
      }),
      // Força ativação imediata
      self.skipWaiting()
    ])
  )
})

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Ativando versão v3...')
  
  event.waitUntil(
    Promise.all([
      // Limpa caches antigos
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheName.includes('v3')) {
              console.log('🗑️ Removendo cache antigo:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      }),
      // Assume controle de todas as páginas
      self.clients.claim(),
      // Pré-cache conteúdo popular
      preloadPopularContent()
    ])
  )
})

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Ignora requisições não-HTTP
  if (!request.url.startsWith('http')) {
    return
  }

  // Estratégia para recursos estáticos
  if (isStaticResource(request)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE))
    return
  }

  // Estratégia para fontes
  if (isFontRequest(request)) {
    event.respondWith(cacheFirst(request, FONTS_CACHE))
    return
  }

  // Estratégia para API da Bíblia
  if (isBibleApiRequest(request)) {
    event.respondWith(cacheFirstWithFallback(request, BIBLE_CACHE))
    return
  }

  // Estratégia para outras requisições dinâmicas
  event.respondWith(networkFirst(request, DYNAMIC_CACHE))
})

// Funções auxiliares
function isStaticResource(request) {
  const url = new URL(request.url)
  return url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/) ||
         url.pathname === '/' ||
         url.pathname === '/manifest.json' ||
         url.pathname.startsWith('/icons/')
}

function isFontRequest(request) {
  return request.url.includes('fonts.googleapis.com') ||
         request.url.includes('fonts.gstatic.com') ||
         request.url.match(/\.(woff|woff2|ttf|eot)$/)
}

function isBibleApiRequest(request) {
  return request.url.includes('bible-api.com')
}

// Estratégia Cache First
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      console.log('📱 Servindo do cache:', request.url)
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
      console.log('💾 Salvando no cache:', request.url)
    }
    
    return networkResponse
  } catch (error) {
    console.error('❌ Erro no cache first:', error)
    return new Response('Recurso não disponível offline', { 
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
}

// Estratégia Network First
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.log('🌐 Rede indisponível, tentando cache:', request.url)
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    return new Response('Conteúdo não disponível offline', { 
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
}

// Estratégia Cache First com Fallback
async function cacheFirstWithFallback(request, cacheName) {
  try {
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      console.log('📖 Servindo Bíblia do cache:', request.url)
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
      console.log('📚 Cacheando conteúdo bíblico:', request.url)
    }
    
    return networkResponse
  } catch (error) {
    console.log('📖 API indisponível, tentando cache:', request.url)
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Retorna uma resposta de fallback para APIs da Bíblia
    return new Response(JSON.stringify({
      error: 'Conteúdo bíblico não disponível offline',
      offline: true,
      message: 'Conecte-se à internet para acessar este conteúdo'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// Pré-carregar conteúdo popular
async function preloadPopularContent() {
  console.log('📚 Pré-carregando conteúdo popular...')
  
  try {
    const cache = await caches.open(BIBLE_CACHE)
    
    for (const book of POPULAR_BOOKS) {
      for (const translation of TRANSLATIONS) {
        try {
          const url = `https://bible-api.com/${book}+1?translation=${translation}`
          const response = await fetch(url)
          
          if (response.ok) {
            await cache.put(url, response.clone())
            console.log(`✅ Cacheado: ${book} ${translation}`)
          }
        } catch (error) {
          console.warn(`⚠️ Erro ao cachear ${book} ${translation}:`, error)
        }
      }
    }
    
    console.log('🎉 Pré-carregamento concluído!')
  } catch (error) {
    console.error('❌ Erro no pré-carregamento:', error)
  }
}

// Mensagens do Service Worker
self.addEventListener('message', (event) => {
  const { type, data } = event.data
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting()
      break
      
    case 'CACHE_BIBLE_CONTENT':
      cacheBibleContent(data)
      break
      
    case 'CLEAR_CACHE':
      clearAllCaches()
      break
      
    case 'GET_CACHE_SIZE':
      getCacheSize().then(size => {
        event.ports[0].postMessage({ type: 'CACHE_SIZE', size })
      })
      break
      
    case 'PRELOAD_BOOK':
      preloadBook(data.book, data.translation)
      break
  }
})

// Função para cachear conteúdo bíblico específico
async function cacheBibleContent(content) {
  try {
    const cache = await caches.open(BIBLE_CACHE)
    const url = `https://bible-api.com/${content.book}+${content.chapter}?translation=${content.translation}`
    const response = new Response(JSON.stringify(content), {
      headers: { 'Content-Type': 'application/json' }
    })
    await cache.put(url, response)
    console.log('💾 Conteúdo bíblico cacheado:', url)
  } catch (error) {
    console.error('❌ Erro ao cachear conteúdo bíblico:', error)
  }
}

// Função para limpar todos os caches
async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys()
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    )
    console.log('🗑️ Todos os caches limpos')
  } catch (error) {
    console.error('❌ Erro ao limpar caches:', error)
  }
}

// Função para obter tamanho do cache
async function getCacheSize() {
  try {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate()
      return estimate.usage || 0
    }
    return 0
  } catch (error) {
    console.error('❌ Erro ao obter tamanho do cache:', error)
    return 0
  }
}

// Função para pré-carregar um livro específico
async function preloadBook(book, translation) {
  try {
    const cache = await caches.open(BIBLE_CACHE)
    const url = `https://bible-api.com/${book}+1?translation=${translation}`
    
    const response = await fetch(url)
    if (response.ok) {
      await cache.put(url, response.clone())
      console.log(`📖 Livro pré-carregado: ${book} ${translation}`)
    }
  } catch (error) {
    console.error(`❌ Erro ao pré-carregar ${book} ${translation}:`, error)
  }
}

// Notificação de atualização
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Background sync (quando disponível)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  console.log('🔄 Executando sincronização em background...')
  // Implementar lógica de sincronização
}