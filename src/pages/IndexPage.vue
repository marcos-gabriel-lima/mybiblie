<template>
  <q-page class="q-pa-md">
    <!-- Hero Section -->
    <div class="hero-section text-center q-mb-xl">
      <div class="hero-content">
        <q-icon 
          name="auto_stories" 
          size="120px" 
          color="primary" 
          class="q-mb-md"
        />
        <h1 class="text-h3 text-weight-bold text-primary q-mb-sm">
          Bíblia Digital
        </h1>
        <p class="text-h6 text-grey-7 q-mb-lg">
          Leia e estude a Palavra de Deus em qualquer lugar
        </p>
        <q-btn 
          color="primary" 
          size="lg" 
          label="Começar Leitura" 
          icon="play_arrow"
          @click="startReading"
          class="q-px-xl"
        />
      </div>
    </div>

    <!-- Features Section -->
    <div class="features-section q-mb-xl">
      <h2 class="text-h4 text-center text-weight-bold q-mb-lg">
        Recursos da Aplicação
      </h2>
      
      <div class="row q-gutter-md">
        <div class="col-12 col-md-4">
          <q-card class="feature-card text-center" flat bordered>
            <q-card-section>
              <q-icon name="search" size="48px" color="primary" class="q-mb-md" />
              <h3 class="text-h6 text-weight-bold q-mb-sm">Busca Inteligente</h3>
              <p class="text-grey-7">
                Encontre versículos específicos ou temas rapidamente com nossa ferramenta de busca avançada.
              </p>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-4">
          <q-card class="feature-card text-center" flat bordered>
            <q-card-section>
              <q-icon name="bookmark" size="48px" color="primary" class="q-mb-md" />
              <h3 class="text-h6 text-weight-bold q-mb-sm">Marcadores</h3>
              <p class="text-grey-7">
                Salve seus versículos favoritos e organize-os em coleções personalizadas.
              </p>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-4">
          <q-card class="feature-card text-center" flat bordered>
            <q-card-section>
              <q-icon name="dark_mode" size="48px" color="primary" class="q-mb-md" />
              <h3 class="text-h6 text-weight-bold q-mb-sm">Modo Noturno</h3>
              <p class="text-grey-7">
                Leia confortavelmente em qualquer ambiente com o modo escuro disponível.
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Quick Access Section -->
    <div class="quick-access-section">
      <h2 class="text-h4 text-center text-weight-bold q-mb-lg">
        Acesso Rápido
      </h2>
      
      <div class="row q-gutter-md">
        <div class="col-12 col-md-6">
          <q-card 
            class="quick-access-card cursor-pointer" 
            flat 
            bordered
            @click="navigateToBook('Salmos')"
          >
            <q-card-section class="row items-center">
              <q-icon name="music_note" size="40px" color="primary" class="q-mr-md" />
              <div>
                <h3 class="text-h6 text-weight-bold q-mb-xs">Salmos</h3>
                <p class="text-grey-7">150 capítulos de louvor e adoração</p>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card 
            class="quick-access-card cursor-pointer" 
            flat 
            bordered
            @click="navigateToBook('João')"
          >
            <q-card-section class="row items-center">
              <q-icon name="auto_stories" size="40px" color="primary" class="q-mr-md" />
              <div>
                <h3 class="text-h6 text-weight-bold q-mb-xs">Evangelho de João</h3>
                <p class="text-grey-7">21 capítulos sobre a vida de Jesus</p>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card 
            class="quick-access-card cursor-pointer" 
            flat 
            bordered
            @click="navigateToBook('Provérbios')"
          >
            <q-card-section class="row items-center">
              <q-icon name="psychology" size="40px" color="primary" class="q-mr-md" />
              <div>
                <h3 class="text-h6 text-weight-bold q-mb-xs">Provérbios</h3>
                <p class="text-grey-7">31 capítulos de sabedoria prática</p>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card 
            class="quick-access-card cursor-pointer" 
            flat 
            bordered
            @click="navigateToBook('Romanos')"
          >
            <q-card-section class="row items-center">
              <q-icon name="auto_stories" size="40px" color="primary" class="q-mr-md" />
              <div>
                <h3 class="text-h6 text-weight-bold q-mb-xs">Romanos</h3>
                <p class="text-grey-7">16 capítulos sobre a justificação pela fé</p>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Translation Selector -->
    <div class="translation-section q-mb-lg">
      <TranslationSelector @translation-changed="onTranslationChanged" />
    </div>

    <!-- Daily Verse Section -->
    <div class="daily-verse-section q-mt-xl">
      <DailyVerse />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import DailyVerse from 'components/DailyVerse.vue'
import TranslationSelector from 'components/TranslationSelector.vue'

const router = useRouter()

function startReading() {
  // Navegar para a página da Bíblia
  router.push('/bible')
}

function navigateToBook(bookName) {
  const slug = bookName.toLowerCase().replace(/\s+/g, '-')
  router.push(`/book/${slug}`)
}

function onTranslationChanged(translationCode) {
  console.log('Tradução alterada para:', translationCode)
  // Aqui você pode implementar lógica adicional quando a tradução mudar
  // Por exemplo, recarregar dados, atualizar cache, etc.
}
</script>

<style scoped>
.hero-section {
  padding: 60px 0;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.feature-card {
  transition: transform 0.2s ease-in-out;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.quick-access-card {
  transition: all 0.2s ease-in-out;
}

.quick-access-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

</style>
