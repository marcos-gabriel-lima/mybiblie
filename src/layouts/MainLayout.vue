<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          📖 Bíblia App
        </q-toolbar-title>

        <div>
          <q-btn
            flat
            round
            dense
            icon="language"
            @click="showLanguageDialog = true"
          />
          <q-btn
            flat
            round
            dense
            icon="wifi"
            @click="showOfflineStatus = true"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Navegação
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />

        <q-separator />

        <q-item-label header>
          Status Offline
        </q-item-label>

        <q-item>
          <q-item-section>
            <q-item-label>
              <q-icon 
                :name="isOnline ? 'wifi' : 'wifi_off'" 
                :color="isOnline ? 'positive' : 'negative'"
              />
              {{ isOnline ? 'Online' : 'Offline' }}
            </q-item-label>
            <q-item-label caption>
              {{ offlineStats?.chaptersCount || 0 }} capítulos offline
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Language Dialog -->
    <q-dialog v-model="showLanguageDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Selecionar Idioma</div>
        </q-card-section>

        <q-card-section>
          <q-list>
            <q-item clickable v-close-popup @click="changeLanguage('pt-BR')">
              <q-item-section avatar>
                <q-icon name="flag" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>🇧🇷 Português</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="changeLanguage('en-US')">
              <q-item-section avatar>
                <q-icon name="flag" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>🇺🇸 English</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="changeLanguage('es-ES')">
              <q-item-section avatar>
                <q-icon name="flag" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>🇪🇸 Español</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Offline Status Dialog -->
    <q-dialog v-model="showOfflineStatus">
      <OfflineStatus />
    </q-dialog>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import EssentialLink from 'components/EssentialLink.vue'
import OfflineStatus from 'components/OfflineStatus.vue'
import { useOfflineStatus } from '../hooks/useBibleApi'

const linksList = [
  {
    title: 'Livros',
    caption: 'Navegar pelos livros',
    icon: 'book',
    link: '/books'
  },
  {
    title: 'Buscar',
    caption: 'Buscar versículos',
    icon: 'search',
    link: '/search'
  },
  {
    title: 'Favoritos',
    caption: 'Meus versículos favoritos',
    icon: 'favorite',
    link: '/favorites'
  },
  {
    title: 'Configurações',
    caption: 'Configurações do app',
    icon: 'settings',
    link: '/settings'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    OfflineStatus
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const showLanguageDialog = ref(false)
    const showOfflineStatus = ref(false)
    
    const { locale } = useI18n()
    const { isOnline, offlineStats } = useOfflineStatus()

    const changeLanguage = (lang) => {
      locale.value = lang
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      showLanguageDialog,
      showOfflineStatus,
      isOnline,
      offlineStats,
      changeLanguage,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
