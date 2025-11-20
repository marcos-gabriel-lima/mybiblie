<template>
  <q-page class="q-pa-md">
    <div class="text-center q-mb-xl">
      <h1 class="text-h3 text-weight-bold q-mb-md">Bíblia Sagrada Almeida</h1>
      <p class="text-body1 text-grey-7">
        Escolha um livro para começar sua leitura. Navegue através dos 66 livros 
        da Bíblia organizados por testamento.
      </p>
    </div>

    <div class="q-gutter-y-xl">
      <!-- Antigo Testamento -->
      <section>
        <div class="row items-center q-mb-md">
          <h2 class="text-h5 text-weight-bold q-mr-md">Antigo Testamento</h2>
          <q-badge color="secondary">{{ antigoTestamento.length }} livros</q-badge>
        </div>
        
        <div class="row q-col-gutter-md">
          <div
            v-for="book in antigoTestamento"
            :key="book.id"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <q-card
              class="cursor-pointer"
              @click="$router.push(`/book/${book.id}`)"
            >
              <q-card-section>
                <div class="row items-center justify-between">
                  <div>
                    <div class="text-weight-bold text-h6">{{ book.name }}</div>
                    <div class="text-caption text-grey-7">
                      {{ book.chapters?.length || 0 }} capítulos
                    </div>
                  </div>
                  <q-icon name="chevron_right" size="sm" color="grey-6" />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </section>

      <!-- Novo Testamento -->
      <section>
        <div class="row items-center q-mb-md">
          <h2 class="text-h5 text-weight-bold q-mr-md">Novo Testamento</h2>
          <q-badge color="secondary">{{ novoTestamento.length }} livros</q-badge>
        </div>
        
        <div class="row q-col-gutter-md">
          <div
            v-for="book in novoTestamento"
            :key="book.id"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <q-card
              class="cursor-pointer"
              @click="$router.push(`/book/${book.id}`)"
            >
              <q-card-section>
                <div class="row items-center justify-between">
                  <div>
                    <div class="text-weight-bold text-h6">{{ book.name }}</div>
                    <div class="text-caption text-grey-7">
                      {{ book.chapters?.length || 0 }} capítulos
                    </div>
                  </div>
                  <q-icon name="chevron_right" size="sm" color="grey-6" />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </section>
    </div>

    <!-- Estatísticas -->
    <q-card class="q-mt-xl" style="max-width: 800px; margin: 0 auto">
      <q-card-section>
        <div class="text-h6 q-mb-md">Estatísticas da Bíblia Sagrada</div>
        <div class="row q-col-gutter-md">
          <div class="col-6 col-sm-3 text-center">
            <div class="text-h4 text-primary text-weight-bold">{{ books.length }}</div>
            <div class="text-caption text-grey-7">Livros</div>
          </div>
          <div class="col-6 col-sm-3 text-center">
            <div class="text-h4 text-primary text-weight-bold">
              {{ totalChapters }}
            </div>
            <div class="text-caption text-grey-7">Capítulos</div>
          </div>
          <div class="col-6 col-sm-3 text-center">
            <div class="text-h4 text-primary text-weight-bold">{{ antigoTestamento.length }}</div>
            <div class="text-caption text-grey-7">A.T.</div>
          </div>
          <div class="col-6 col-sm-3 text-center">
            <div class="text-h4 text-primary text-weight-bold">{{ novoTestamento.length }}</div>
            <div class="text-caption text-grey-7">N.T.</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import livrosInfo from 'src/assets/livros_info.json'

const books = ref([])

const antigoTestamento = computed(() => {
  return books.value.filter(book => book.testament === 'Antigo')
})

const novoTestamento = computed(() => {
  return books.value.filter(book => book.testament === 'Novo')
})

const totalChapters = computed(() => {
  return books.value.reduce((acc, book) => acc + (book.chapters?.length || 0), 0)
})

function getBooksFromJSON() {
  try {
    const livros = livrosInfo.livros.map((livro) => ({
      id: `book-${livro.ordem}`,
      name: livro.nome,
      testament: livro.testamento,
      order: livro.ordem,
      chapters: Array.from({ length: livro.n_capitulos }, (_, i) => ({
        id: `chapter-${livro.ordem}-${i + 1}`,
        bookId: `book-${livro.ordem}`,
        number: i + 1,
        verses: [],
      })),
    }))
    return livros
  } catch (error) {
    console.error('Erro ao carregar livros do JSON:', error)
    return []
  }
}

onMounted(() => {
  books.value = getBooksFromJSON()
})
</script>
