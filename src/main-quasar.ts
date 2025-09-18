import { Quasar } from 'quasar'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Import your components
import App from './App.vue'
// import routes from './router/routes'

// Import i18n
// import i18n from './i18n'

// Import boot files
// import boot from './boot'

const router = createRouter({
  history: createWebHistory(),
  routes: []
})

const app = createApp(App)

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

app.use(router)
// app.use(i18n)

// Import and register boot files
// boot.forEach((bootFile: any) => {
//   bootFile.default({ app, router })
// })

app.mount('#app')
