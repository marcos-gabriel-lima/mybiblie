<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn 
          flat 
          dense 
          round 
          icon="menu" 
          aria-label="Menu" 
          @click="toggleLeftDrawer" 
        />

        <q-toolbar-title class="text-center">
          <div class="row items-center justify-center">
            <q-icon name="auto_stories" size="md" class="q-mr-sm" />
            <span class="text-h6">Bíblia Digital</span>
          </div>
        </q-toolbar-title>

        <q-btn 
          flat 
          dense 
          round 
          icon="search" 
          aria-label="Buscar" 
          @click="toggleSearchDialog"
        />
      </q-toolbar>
    </q-header>

    <q-drawer 
      v-model="leftDrawerOpen" 
      show-if-above 
      bordered
      class="main-drawer"
    >
      <q-list>
        <q-item-label header class="text-primary text-weight-bold">
          <q-icon name="menu" class="q-mr-sm" />
          Menu Principal
        </q-item-label>

        <!-- Opções do Menu Principal -->
        <q-item 
          clickable
          v-ripple
          @click="navigateToHome"
          :active="$route.path === '/'"
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Início</q-item-label>
            <q-item-label caption>Página principal</q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
          clickable
          v-ripple
          @click="navigateToBible"
          :active="$route.path.startsWith('/bible')"
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="auto_stories" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Bíblia</q-item-label>
            <q-item-label caption>Livros e capítulos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
          clickable
          v-ripple
          @click="navigateToBookmarks"
          :active="$route.path === '/bookmarks'"
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="bookmark" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Marcações</q-item-label>
            <q-item-label caption>Versículos salvos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
          clickable
          v-ripple
          @click="navigateToFavorites"
          :active="$route.path === '/favorites'"
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="favorite" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Favoritos</q-item-label>
            <q-item-label caption>Versículos favoritos</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item-label header class="text-primary text-weight-bold">
          <q-icon name="settings" class="q-mr-sm" />
          Configurações
        </q-item-label>

        <q-item 
          clickable
          v-ripple
          @click="toggleDarkMode"
        >
          <q-item-section avatar>
            <q-icon :name="$q.dark.isActive ? 'light_mode' : 'dark_mode'" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $q.dark.isActive ? 'Modo Claro' : 'Modo Escuro' }}</q-item-label>
            <q-item-label caption>Alternar tema</q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
          clickable
          v-ripple
          @click="navigateToSettings"
          :active="$route.path === '/settings'"
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Configurações</q-item-label>
            <q-item-label caption>Preferências</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Dialog de Busca -->
    <q-dialog v-model="searchDialogOpen">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Buscar na Bíblia</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="searchText"
            placeholder="Digite sua busca..."
            outlined
            @keyup.enter="performSearch"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
            <template #append>
              <q-btn 
                flat 
                round 
                dense 
                icon="close" 
                @click="searchDialogOpen = false"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="searchDialogOpen = false" />
          <q-btn 
            color="primary" 
            label="Buscar" 
            @click="performSearch"
            :disable="!searchText.trim()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

// Estado do drawer e busca
const leftDrawerOpen = ref(false)
const searchDialogOpen = ref(false)
const searchText = ref('')

// Funções de navegação
function navigateToHome() {
  router.push('/')
  leftDrawerOpen.value = false
}

function navigateToBible() {
  router.push('/bible')
  leftDrawerOpen.value = false
}

function navigateToBookmarks() {
  router.push('/bookmarks')
  leftDrawerOpen.value = false
}

function navigateToFavorites() {
  router.push('/favorites')
  leftDrawerOpen.value = false
}

function navigateToSettings() {
  router.push('/settings')
  leftDrawerOpen.value = false
}

function toggleDarkMode() {
  $q.dark.toggle()
}

// Funções do drawer e busca
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleSearchDialog() {
  searchDialogOpen.value = !searchDialogOpen.value
  if (searchDialogOpen.value) {
    searchText.value = ''
  }
}

function performSearch() {
  if (searchText.value.trim()) {
    // Implementar lógica de busca
    console.log('Buscando por:', searchText.value)
    searchDialogOpen.value = false
    // TODO: Implementar navegação para resultados da busca
  }
}
</script>

<style scoped>
.main-drawer {
  background-color: #f5f5f5;
  border-right: 2px solid var(--q-primary);
}

.body--dark .main-drawer {
  background-color: #1a1a1a !important;
  border-right-color: var(--q-primary) !important;
}

.q-item {
  margin: 4px 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.q-item:hover {
  background-color: rgba(25, 118, 210, 0.1);
  transform: translateX(4px);
}

.q-item--active {
  background-color: var(--q-primary) !important;
  color: white !important;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
}

.q-item-label--header {
  padding: 16px 8px 8px 8px;
  font-size: 1.1rem;
  border-bottom: 2px solid var(--q-primary);
  margin-bottom: 8px;
}

.q-separator {
  margin: 16px 8px;
  background-color: var(--q-primary);
  opacity: 0.3;
}

.body--dark .q-separator {
  background-color: var(--q-primary) !important;
  opacity: 0.5;
}
</style>
