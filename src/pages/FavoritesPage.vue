<template>
  <q-page class="q-pa-md">
    <!-- Header -->
    <div class="page-header text-center q-mb-xl">
      <q-icon 
        name="favorite" 
        size="80px" 
        color="primary" 
        class="q-mb-md"
      />
      <h1 class="text-h3 text-weight-bold text-primary q-mb-sm">
        Favoritos
      </h1>
      <p class="text-h6 text-grey-7">
        Seus versículos favoritos para consulta rápida
      </p>
    </div>

    <!-- Conteúdo -->
    <div class="content-section">
      <q-card flat bordered class="empty-state-card">
        <q-card-section class="text-center q-py-xl">
          <q-icon name="favorite_border" size="60px" color="grey-5" class="q-mb-md" />
          <h3 class="text-h6 text-grey-6 q-mb-sm">Nenhum favorito ainda</h3>
          <p class="text-grey-5 q-mb-lg">
            Marque versículos como favoritos durante sua leitura para vê-los aqui
          </p>
          <q-btn 
            color="primary" 
            label="Ir para a Bíblia" 
            icon="auto_stories"
            @click="goToBible"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToBible() {
  router.push('/bible')
}
</script>

<style scoped>
.page-header {
  padding: 40px 0;
}

.empty-state-card {
  background: rgba(25, 118, 210, 0.02);
  border: 2px dashed var(--q-primary);
}

@media (max-width: 600px) {
  .page-header {
    padding: 20px 0;
  }
}
</style>
