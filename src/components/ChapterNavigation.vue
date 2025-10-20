<template>
  <div class="chapter-navigation">
    <q-card flat bordered class="navigation-card">
      <q-card-section class="row items-center justify-between">
        <div class="col-auto">
          <q-btn
            flat
            icon="chevron_left"
            label="Capítulo Anterior"
            @click="goToPreviousChapter"
            :disable="!hasPreviousChapter"
            color="primary"
          />
        </div>
        
        <div class="col text-center">
          <div class="text-h6 text-weight-bold text-primary">
            {{ bookName }} {{ currentChapter }}
          </div>
          <div class="text-caption text-grey-6">
            Capítulo {{ currentChapter }} de {{ totalChapters }}
          </div>
        </div>
        
        <div class="col-auto">
          <q-btn
            flat
            icon-right="chevron_right"
            label="Próximo Capítulo"
            @click="goToNextChapter"
            :disable="!hasNextChapter"
            color="primary"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  bookName: {
    type: String,
    required: true
  },
  currentChapter: {
    type: Number,
    required: true
  },
  totalChapters: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['previous-chapter', 'next-chapter'])

const hasPreviousChapter = computed(() => props.currentChapter > 1)
const hasNextChapter = computed(() => props.currentChapter < props.totalChapters)

function goToPreviousChapter() {
  if (hasPreviousChapter.value) {
    emit('previous-chapter')
  }
}

function goToNextChapter() {
  if (hasNextChapter.value) {
    emit('next-chapter')
  }
}
</script>

<style scoped>
.navigation-card {
  margin: 16px 0;
  background: linear-gradient(135deg, #faf8f5 0%, #f5f2ed 100%);
}

.body--dark .navigation-card {
  background: linear-gradient(135deg, var(--q-dark-page) 0%, #2C1810 100%);
}

@media (max-width: 600px) {
  .navigation-card .q-card-section {
    padding: 12px;
  }
  
  .navigation-card .q-btn {
    font-size: 12px;
  }
  
  .navigation-card .text-h6 {
    font-size: 1.1rem;
  }
}
</style>
