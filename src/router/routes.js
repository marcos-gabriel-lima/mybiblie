const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Books.vue') },
      { path: '/books', component: () => import('pages/Books.vue') },
      { path: '/book/:bookId/chapter/:chapterNumber', component: () => import('pages/Chapter.vue') },
      { path: '/search', component: () => import('pages/Search.vue') },
      { path: '/favorites', component: () => import('pages/Favorites.vue') },
      { path: '/settings', component: () => import('pages/Settings.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
