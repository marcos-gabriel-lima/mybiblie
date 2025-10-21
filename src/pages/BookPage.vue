<template>
  <q-page class="q-pa-md">
    <!-- Header do Livro -->
    <div class="book-header text-center q-mb-xl">
      <q-icon 
        name="auto_stories" 
        size="80px" 
        color="primary" 
        class="q-mb-md"
      />
      <h1 class="text-h3 text-weight-bold text-primary q-mb-sm">
        {{ bookInfo?.name || 'Carregando...' }}
      </h1>
      <p class="text-h6 text-grey-7">
        {{ bookInfo?.chapters || 0 }} capítulos
      </p>
    </div>

    <!-- Navegação de Capítulos -->
    <div class="chapters-grid">
      <h2 class="text-h5 text-weight-bold q-mb-md">
        Capítulos
      </h2>
      
      <div class="row q-gutter-sm">
        <div 
          v-for="chapter in chapters" 
          :key="chapter"
          class="col-2 col-sm-1 col-md-1"
        >
          <q-btn
            :label="chapter"
            color="primary"
            outline
            rounded
            class="chapter-btn full-width"
            @click="openChapter(chapter)"
          />
        </div>
      </div>
    </div>

    <!-- Dialog do Capítulo -->
    <q-dialog v-model="chapterDialogOpen" maximized>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{ bookInfo?.name }} - Capítulo {{ selectedChapter }}
          </div>
          <q-space />
          <q-btn 
            icon="close" 
            flat 
            round 
            dense 
            v-close-popup 
          />
        </q-card-section>

        <!-- Componente de Navegação -->
        <ChapterNavigation
          :book-name="bookInfo?.name || ''"
          :current-chapter="selectedChapter"
          :total-chapters="bookInfo?.chapters || 0"
          @previous-chapter="previousChapter"
          @next-chapter="nextChapter"
        />

        <q-card-section class="chapter-content">
          <!-- Estado de carregamento -->
          <div v-if="loading" class="text-center q-py-xl">
            <q-spinner-dots size="40px" color="primary" />
            <p class="q-mt-md text-grey-6">Carregando capítulo...</p>
          </div>

          <!-- Estado de erro -->
          <div v-else-if="error" class="text-center q-py-xl">
            <q-icon name="error" size="60px" color="negative" class="q-mb-md" />
            <h3 class="text-h6 text-negative q-mb-sm">Erro ao carregar</h3>
            <p class="text-grey-6 q-mb-lg">{{ error }}</p>
            <q-btn 
              color="primary" 
              label="Tentar novamente" 
              @click="openChapter(selectedChapter)"
            />
          </div>

          <!-- Conteúdo dos versículos -->
          <div v-else class="verses-container">
            <div 
              v-for="verse in verses" 
              :key="verse.number"
              class="verse-item q-mb-md"
            >
              <div class="verse-number">{{ verse.number }}</div>
              <div class="verse-text">{{ verse.text }}</div>
            </div>
          </div>
        </q-card-section>

      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ChapterNavigation from 'components/ChapterNavigation.vue'
import { findBookByName, generateChapters } from '../utils/bibleData.js'
import { getChapterPortuguese, getBookApiName, processVerses } from '../services/bibleApi.js'
import { useQuasar } from 'quasar'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()

// Estado da página
const bookInfo = ref(null)
const chapters = ref([])
const chapterDialogOpen = ref(false)
const selectedChapter = ref(1)
const verses = ref([])
const loading = ref(false)
const error = ref(null)

// Funções
async function openChapter(chapter) {
  selectedChapter.value = chapter
  loading.value = true
  error.value = null
  
  try {
    const apiBookName = getBookApiName(bookInfo.value.name)
    const apiData = await getChapterPortuguese(apiBookName, chapter, 'almeida')
    verses.value = processVerses(apiData)
    chapterDialogOpen.value = true
  } catch (err) {
    error.value = 'Erro ao carregar o capítulo. Tente novamente.'
    console.error('Erro ao carregar capítulo:', err)
    $q.notify({
      type: 'negative',
      message: 'Erro ao carregar o capítulo',
      caption: 'Verifique sua conexão com a internet'
    })
  } finally {
    loading.value = false
  }
}

async function previousChapter() {
  if (selectedChapter.value > 1) {
    await openChapter(selectedChapter.value - 1)
  }
}

async function nextChapter() {
  if (selectedChapter.value < (bookInfo.value?.chapters || 0)) {
    await openChapter(selectedChapter.value + 1)
  }
}

// Inicialização
onMounted(() => {
  const bookName = route.params.bookName
  bookInfo.value = findBookByName(bookName)
  
  if (bookInfo.value) {
    chapters.value = generateChapters(bookInfo.value.chapters)
  } else {
    // Livro não encontrado, redirecionar para home
    router.push('/')
  }
})
</script>

<style scoped>
.book-header {
  padding: 40px 0;
}

.chapters-grid {
  max-width: 800px;
  margin: 0 auto;
}

.chapter-btn {
  min-height: 50px;
  font-weight: bold;
}

.chapter-content {
  max-height: 70vh;
  overflow-y: auto;
}

.verses-container {
  line-height: 1.8;
  font-size: 16px;
}

.verse-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}

.verse-number {
  background: var(--q-primary);
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  margin-right: 12px;
  flex-shrink: 0;
  margin-top: 2px;
}

.verse-text {
  flex: 1;
  text-align: justify;
}

@media (max-width: 600px) {
  .verses-container {
    font-size: 14px;
  }
  
  .verse-item {
    margin-bottom: 12px;
  }
}
</style>
