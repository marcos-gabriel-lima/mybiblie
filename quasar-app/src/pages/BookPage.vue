<template>
  <q-page class="q-pa-md">
    <div v-if="loading" class="flex flex-center" style="min-height: 50vh">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else-if="!book" class="flex flex-center" style="min-height: 50vh">
      <div class="text-center">
        <div class="text-h6 text-negative q-mb-md">Livro não encontrado</div>
        <q-btn
          color="primary"
          label="Voltar à Leitura"
          @click="$router.push('/')"
        />
      </div>
    </div>

    <div v-else>
      <!-- Book Header -->
      <div class="text-center q-mb-xl">
        <div class="row items-center justify-center q-mb-md">
          <q-icon name="menu_book" size="md" color="primary" class="q-mr-sm" />
          <h1 class="text-h3 text-weight-bold">{{ book.name }}</h1>
        </div>
        <div class="row items-center justify-center q-gutter-md q-mb-md">
          <q-badge color="secondary" class="text-body2">
            {{ book.testament }} Testamento
          </q-badge>
          <q-badge outline color="primary" class="text-body2">
            {{ book.chapters?.length || 0 }} Capítulos
          </q-badge>
        </div>
        <p class="text-body1 text-grey-7">
          Selecione um capítulo para começar sua leitura do livro de {{ book.name }}
        </p>
      </div>

      <!-- Chapters Grid -->
      <div class="q-mb-xl">
        <h2 class="text-h5 text-weight-bold q-mb-md row items-center">
          <q-icon name="menu_book" size="sm" class="q-mr-sm" />
          Capítulos
        </h2>
        
        <div class="row q-col-gutter-sm">
          <div
            v-for="chapter in book.chapters"
            :key="chapter.id"
            class="col-6 col-sm-4 col-md-3 col-lg-2"
          >
            <q-card
              class="cursor-pointer text-center"
              @click="$router.push(`/book/${book.id}/chapter/${chapter.id}`)"
            >
              <q-card-section class="q-pa-md">
                <div class="text-h5 text-weight-bold text-primary q-mb-xs">
                  {{ chapter.number }}
                </div>
                <div class="text-caption text-grey-7">
                  {{ chapter.verseCount || 0 }} versículos
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="row justify-center q-gutter-md q-mb-xl">
        <q-btn
          outline
          color="primary"
          icon="menu_book"
          label="Ver Todos os Livros"
          @click="$router.push('/')"
        />
      </div>

      <!-- Book Info -->
      <q-card style="max-width: 600px; margin: 0 auto">
        <q-card-section>
          <div class="text-center">
            <div class="text-h6 q-mb-md">Sobre o livro de {{ book.name }}</div>
            <div class="row q-col-gutter-md">
              <div class="col-6 text-center">
                <div class="text-h4 text-primary text-weight-bold">
                  {{ book.chapters?.length || 0 }}
                </div>
                <div class="text-caption text-grey-7">Capítulos</div>
              </div>
              <div class="col-6 text-center">
                <div class="text-h4 text-primary text-weight-bold">
                  {{ totalVerses }}
                </div>
                <div class="text-caption text-grey-7">Versículos</div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import bibliaData from 'src/assets/biblia_almeida_completa.json'

const route = useRoute()
const loading = ref(true)
const book = ref(null)

const totalVerses = computed(() => {
  if (!book.value?.chapters) return 0
  return book.value.chapters.reduce((acc, chapter) => acc + (chapter.verseCount || 0), 0)
})

function getBookFromJSON(bookId) {
  try {
    const bookNumber = parseInt(bookId.replace('book-', ''))
    
    if (isNaN(bookNumber) || bookNumber < 1 || bookNumber > 66) {
      return null
    }
    
    const livroData = bibliaData.livros[bookNumber - 1]
    
    if (!livroData) {
      return null
    }
    
    return {
      id: `book-${bookNumber}`,
      name: livroData.nome,
      testament: livroData.testamento,
      order: bookNumber,
      chapters: livroData.capitulos.map((capitulo) => ({
        id: `chapter-${bookNumber}-${capitulo.numero}`,
        bookId: `book-${bookNumber}`,
        number: capitulo.numero,
        verseCount: capitulo.versiculos?.length || 0
      }))
    }
  } catch (error) {
    console.error('Erro ao carregar livro do JSON:', error)
    return null
  }
}

onMounted(() => {
  const bookId = route.params.bookId
  book.value = getBookFromJSON(bookId)
  loading.value = false
})
</script>

