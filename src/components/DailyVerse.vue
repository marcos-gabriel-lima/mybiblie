<template>
  <q-card class="daily-verse-card" flat bordered>
    <q-card-section class="text-center">
      <q-icon name="wb_sunny" size="40px" color="amber" class="q-mb-md" />
      <h3 class="text-h5 text-weight-bold q-mb-md">Versículo do Dia</h3>
      
      <div class="verse-content">
        <div v-if="loading" class="text-center q-py-md">
          <q-spinner-dots size="30px" color="primary" />
          <p class="q-mt-sm text-grey-6">Carregando...</p>
        </div>
        <div v-else>
          <blockquote class="text-h6 text-italic text-grey-8 q-mb-md bible-quote">
            "{{ currentVerse.text }}"
          </blockquote>
          <p class="text-grey-6 text-weight-medium">
            {{ currentVerse.reference }}
          </p>
        </div>
      </div>
      
      <div class="q-mt-md">
        <q-btn 
          flat 
          color="primary" 
          label="Compartilhar" 
          icon="share"
          @click="shareVerse"
        />
        <q-btn 
          flat 
          color="secondary" 
          label="Marcar" 
          icon="bookmark"
          @click="bookmarkVerse"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getVerse } from '../services/bibleApi.js'

// Versículos inspiradores para o dia
const dailyVerses = [
  { reference: 'João 3:16' },
  { reference: 'Provérbios 3:5' },
  { reference: 'Jeremias 29:11' },
  { reference: 'Filipenses 4:13' },
  { reference: 'Salmos 23:1' },
  { reference: 'Lucas 1:37' },
  { reference: 'Romanos 8:28' }
]

const currentVerse = ref({
  text: 'Carregando versículo do dia...',
  reference: 'João 3:16'
})

const loading = ref(true)
const error = ref(false)

// Carregar versículo do dia da API
async function loadDailyVerse() {
  try {
    loading.value = true
    error.value = false
    
    const today = new Date()
    const dayOfWeek = today.getDay()
    const verseIndex = dayOfWeek % dailyVerses.length
    const selectedReference = dailyVerses[verseIndex].reference
    
    const apiData = await getVerse(selectedReference)
    
    currentVerse.value = {
      text: apiData.text,
      reference: apiData.reference
    }
  } catch (err) {
    console.error('Erro ao carregar versículo do dia:', err)
    error.value = true
    // Fallback para versículo local
    currentVerse.value = {
      text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
      reference: 'João 3:16'
    }
  } finally {
    loading.value = false
  }
}

function shareVerse() {
  if (navigator.share) {
    navigator.share({
      title: 'Versículo do Dia',
      text: `"${currentVerse.value.text}" - ${currentVerse.value.reference}`,
      url: window.location.href
    })
  } else {
    // Fallback para navegadores que não suportam Web Share API
    const text = `"${currentVerse.value.text}" - ${currentVerse.value.reference}`
    navigator.clipboard.writeText(text).then(() => {
      // Aqui você poderia mostrar uma notificação de sucesso
      console.log('Versículo copiado para a área de transferência!')
    })
  }
}

function bookmarkVerse() {
  // Implementar sistema de marcadores
  console.log('Versículo marcado:', currentVerse.value)
  // Aqui você poderia salvar no localStorage ou enviar para uma API
}

onMounted(() => {
  loadDailyVerse()
})

</script>

<style scoped>
.daily-verse-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border: 2px solid var(--q-secondary);
}

.body--dark .daily-verse-card {
  background: linear-gradient(135deg, var(--q-dark-page) 0%, #2C1810 100%);
  border-color: var(--q-secondary);
}

.verse-content {
  max-width: 600px;
  margin: 0 auto;
}

.bible-quote {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 600px) {
  .bible-quote {
    font-size: 1rem;
  }
  
  .daily-verse-card .q-btn {
    font-size: 12px;
    padding: 8px 12px;
  }
}
</style>
