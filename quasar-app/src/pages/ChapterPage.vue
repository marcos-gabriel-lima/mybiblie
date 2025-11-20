<template>
  <q-page class="q-pa-md">
    <div v-if="loading" class="flex flex-center" style="min-height: 50vh">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else-if="!chapter" class="flex flex-center" style="min-height: 50vh">
      <div class="text-center">
        <div class="text-h6 text-negative q-mb-md">Capítulo não encontrado</div>
        <q-btn
          color="primary"
          label="Voltar à Leitura"
          @click="$router.push('/')"
        />
      </div>
    </div>

    <div v-else>
      <!-- Chapter Header -->
      <div class="text-center q-mb-lg">
        <div class="row items-center justify-center q-mb-md">
          <q-icon name="menu_book" size="md" color="primary" class="q-mr-sm" />
          <h1 class="text-h4 text-weight-bold">
            {{ chapter.book.name }} {{ chapter.number }}
          </h1>
        </div>
        <div class="row items-center justify-center q-gutter-md q-mb-md">
          <q-badge color="secondary">
            {{ chapter.book.testament }} Testamento
          </q-badge>
          <q-badge outline color="primary">
            {{ chapter.verses?.length || 0 }} Versículos
          </q-badge>
        </div>
      </div>

      <!-- Chapter Content -->
      <q-card class="q-mb-lg">
        <q-card-section>
          <div class="q-gutter-md">
            <div
              v-for="verse in chapter.verses"
              :key="verse.id"
              class="row q-gutter-md q-pa-sm"
            >
              <div class="col-auto">
                <q-badge
                  color="primary"
                  text-color="white"
                  class="text-weight-bold"
                  style="min-width: 32px; height: 32px"
                >
                  {{ verse.number }}
                </q-badge>
              </div>
              <div class="col">
                <p
                  class="text-body1"
                  style="font-size: 18px; line-height: 1.7"
                >
                  {{ verse.text }}
                </p>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Navigation -->
      <div class="row justify-between items-center q-mb-xl">
        <q-btn
          outline
          color="primary"
          icon="arrow_back"
          label="Voltar aos Capítulos"
          @click="$router.push(`/book/${chapter.book.id}`)"
        />
      </div>

      <!-- Chapter Info -->
      <q-card style="max-width: 600px; margin: 0 auto">
        <q-card-section class="text-center">
          <div class="text-h6 q-mb-sm">
            {{ chapter.book.name }} - Capítulo {{ chapter.number }}
          </div>
          <div class="text-body2 text-grey-7">
            {{ chapter.verses?.length || 0 }} versículos • {{ chapter.book.testament }} Testamento
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import bibliaData from 'src/assets/biblia_almeida_completa.json'

const route = useRoute()
const loading = ref(true)
const chapter = ref(null)

function getChapterFromJSON(chapterId) {
  try {
    const match = chapterId.match(/chapter-(\d+)-(\d+)/)
    if (!match) return null
    
    const bookNumber = parseInt(match[1])
    const chapterNumber = parseInt(match[2])
    
    const livroData = bibliaData.livros[bookNumber - 1]
    if (!livroData) return null
    
    const capituloData = livroData.capitulos.find((cap) => cap.numero === chapterNumber)
    if (!capituloData) return null
    
    return {
      id: chapterId,
      number: chapterNumber,
      verses: capituloData.versiculos.map((v) => ({
        id: `verse-${bookNumber}-${chapterNumber}-${v.numero}`,
        number: v.numero,
        text: v.texto,
      })),
      book: {
        id: `book-${bookNumber}`,
        name: livroData.nome,
        testament: livroData.testamento,
      },
    }
  } catch (error) {
    console.error('Erro ao carregar capítulo do JSON:', error)
    return null
  }
}

onMounted(() => {
  const chapterId = route.params.chapterId
  chapter.value = getChapterFromJSON(chapterId)
  loading.value = false
})
</script>

