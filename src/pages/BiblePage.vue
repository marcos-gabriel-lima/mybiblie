<template>
  <q-page class="q-pa-md">
    <!-- Header da Bíblia -->
    <div class="bible-header text-center q-mb-xl">
      <q-icon 
        name="auto_stories" 
        size="80px" 
        color="primary" 
        class="q-mb-md"
      />
      <h1 class="text-h3 text-weight-bold text-primary q-mb-sm">
        Bíblia Sagrada
      </h1>
      <p class="text-h6 text-grey-7">
        Escolha um livro para começar sua leitura
      </p>
    </div>

    <!-- Filtros -->
    <div class="filters-section q-mb-lg">
      <div class="row q-gutter-md items-center">
        <div class="col-12 col-md-6">
          <q-input
            v-model="searchText"
            placeholder="Buscar livro..."
            outlined
            clearable
            @input="filterBooks"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        
        <div class="col-12 col-md-6">
          <q-select
            v-model="selectedTestament"
            :options="testamentOptions"
            label="Filtrar por testamento"
            outlined
            clearable
            emit-value
            map-options
            @update:model-value="filterBooks"
          />
        </div>
      </div>
    </div>

    <!-- Lista de Livros -->
    <div class="books-section">
      <!-- Antigo Testamento -->
      <div v-if="showOldTestament" class="testament-section q-mb-xl">
        <h2 class="text-h5 text-weight-bold text-primary q-mb-md">
          <q-icon name="history" class="q-mr-sm" />
          Antigo Testamento
        </h2>
        
        <div class="row q-gutter-md">
          <div 
            v-for="book in filteredOldTestamentBooks" 
            :key="book.name"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <q-card 
              class="book-card cursor-pointer" 
              flat 
              bordered
              @click="selectBook(book)"
            >
              <q-card-section class="text-center">
                <q-icon :name="book.icon" size="40px" color="primary" class="q-mb-md" />
                <h3 class="text-h6 text-weight-bold q-mb-xs">{{ book.name }}</h3>
                <p class="text-grey-6 q-mb-sm">{{ book.chapters }} capítulos</p>
                <q-chip 
                  :label="book.abbreviation" 
                  color="primary" 
                  outline 
                  size="sm"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Novo Testamento -->
      <div v-if="showNewTestament" class="testament-section">
        <h2 class="text-h5 text-weight-bold text-primary q-mb-md">
          <q-icon name="favorite" class="q-mr-sm" />
          Novo Testamento
        </h2>
        
        <div class="row q-gutter-md">
          <div 
            v-for="book in filteredNewTestamentBooks" 
            :key="book.name"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <q-card 
              class="book-card cursor-pointer" 
              flat 
              bordered
              @click="selectBook(book)"
            >
              <q-card-section class="text-center">
                <q-icon :name="book.icon" size="40px" color="primary" class="q-mb-md" />
                <h3 class="text-h6 text-weight-bold q-mb-xs">{{ book.name }}</h3>
                <p class="text-grey-6 q-mb-sm">{{ book.chapters }} capítulos</p>
                <q-chip 
                  :label="book.abbreviation" 
                  color="primary" 
                  outline 
                  size="sm"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Mensagem quando não há resultados -->
      <div v-if="!hasResults" class="text-center q-py-xl">
        <q-icon name="search_off" size="60px" color="grey-5" class="q-mb-md" />
        <h3 class="text-h6 text-grey-6">Nenhum livro encontrado</h3>
        <p class="text-grey-5">Tente ajustar os filtros de busca</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { BIBLE_BOOKS } from '../utils/bibleData.js'

const router = useRouter()

// Estado da página
const searchText = ref('')
const selectedTestament = ref(null)
const allBooks = ref(BIBLE_BOOKS)

// Opções do filtro de testamento
const testamentOptions = [
  { label: 'Antigo Testamento', value: 'old' },
  { label: 'Novo Testamento', value: 'new' }
]

// Computed properties para filtros
const oldTestamentBooks = computed(() => 
  allBooks.value.filter(book => book.testament === 'old')
)

const newTestamentBooks = computed(() => 
  allBooks.value.filter(book => book.testament === 'new')
)

const filteredOldTestamentBooks = computed(() => {
  let books = oldTestamentBooks.value
  
  if (searchText.value) {
    books = books.filter(book => 
      book.name.toLowerCase().includes(searchText.value.toLowerCase())
    )
  }
  
  return books
})

const filteredNewTestamentBooks = computed(() => {
  let books = newTestamentBooks.value
  
  if (searchText.value) {
    books = books.filter(book => 
      book.name.toLowerCase().includes(searchText.value.toLowerCase())
    )
  }
  
  return books
})

const showOldTestament = computed(() => {
  // Se nenhum testamento está selecionado, mostra ambos
  if (!selectedTestament.value) return filteredOldTestamentBooks.value.length > 0
  // Se "old" está selecionado, mostra apenas o antigo testamento
  if (selectedTestament.value === 'old') return filteredOldTestamentBooks.value.length > 0
  // Se "new" está selecionado, não mostra o antigo testamento
  return false
})

const showNewTestament = computed(() => {
  // Se nenhum testamento está selecionado, mostra ambos
  if (!selectedTestament.value) return filteredNewTestamentBooks.value.length > 0
  // Se "new" está selecionado, mostra apenas o novo testamento
  if (selectedTestament.value === 'new') return filteredNewTestamentBooks.value.length > 0
  // Se "old" está selecionado, não mostra o novo testamento
  return false
})

const hasResults = computed(() => {
  return filteredOldTestamentBooks.value.length > 0 || 
         filteredNewTestamentBooks.value.length > 0
})

// Funções
function selectBook(book) {
  const slug = book.name.toLowerCase().replace(/\s+/g, '-')
  router.push(`/book/${slug}`)
}

function filterBooks() {
  // A filtragem é feita automaticamente pelos computed properties
  // Esta função pode ser usada para lógica adicional se necessário
}
</script>

<style scoped>
.bible-header {
  padding: 40px 0;
}

.book-card {
  transition: all 0.2s ease-in-out;
  height: 100%;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.testament-section {
  margin-bottom: 40px;
}

.filters-section {
  background: rgba(25, 118, 210, 0.05);
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid var(--q-primary);
}

@media (max-width: 600px) {
  .bible-header {
    padding: 20px 0;
  }
  
  .book-card {
    margin-bottom: 16px;
  }
  
  .filters-section {
    padding: 16px;
  }
}
</style>
