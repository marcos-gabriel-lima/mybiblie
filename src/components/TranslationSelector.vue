<template>
  <q-card flat bordered class="translation-selector">
    <q-card-section>
      <div class="row items-center q-gutter-md">
        <q-icon name="translate" size="24px" color="primary" />
        <div class="col">
          <div class="text-subtitle2 text-weight-medium">Tradução</div>
          <div class="text-caption text-grey-6">{{ currentTranslation.name }}</div>
        </div>
        <q-btn
          flat
          round
          icon="settings"
          color="primary"
          @click="showSelector = true"
        />
      </div>
    </q-card-section>

    <q-dialog v-model="showSelector" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Escolher Tradução</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list>
            <q-item
              v-for="(translation, code) in availableTranslations"
              :key="code"
              clickable
              v-close-popup
              @click="selectTranslation(code)"
              :class="{ 'bg-primary-1': selectedTranslation === code }"
            >
              <q-item-section>
                <q-item-label>{{ translation.name }}</q-item-label>
                <q-item-label caption>{{ translation.description }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon
                  v-if="selectedTranslation === code"
                  name="check"
                  color="primary"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { AVAILABLE_TRANSLATIONS, getTranslationConfig } from '../services/bibleApi.js'
import { APP_CONFIG } from '../config/appConfig.js'

const emit = defineEmits(['translation-changed'])

const showSelector = ref(false)
const selectedTranslation = ref('almeida')

const availableTranslations = computed(() => AVAILABLE_TRANSLATIONS)
const currentTranslation = computed(() => getTranslationConfig(selectedTranslation.value))

function selectTranslation(code) {
  selectedTranslation.value = code
  emit('translation-changed', code)
  
  // Salvar preferência no localStorage
  localStorage.setItem('preferred-translation', code)
}

// Carregar tradução salva
onMounted(() => {
  const savedTranslation = localStorage.getItem('preferred-translation')
  if (savedTranslation && AVAILABLE_TRANSLATIONS[savedTranslation]) {
    selectedTranslation.value = savedTranslation
  } else {
    selectedTranslation.value = APP_CONFIG.reading.defaultTranslation
  }
})
</script>

<style scoped>
.translation-selector {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.body--dark .translation-selector {
  background: rgba(0, 0, 0, 0.3);
}
</style>
