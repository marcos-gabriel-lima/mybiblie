const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'bible', component: () => import('pages/BiblePage.vue') },
      { path: 'bookmarks', component: () => import('pages/BookmarksPage.vue') },
      { path: 'favorites', component: () => import('pages/FavoritesPage.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
      { path: 'book/:bookName', component: () => import('pages/BookPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
