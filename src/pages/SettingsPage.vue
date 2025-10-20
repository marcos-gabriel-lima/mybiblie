<template>
  <q-page class="q-pa-md">
    <!-- Header -->
    <div class="page-header text-center q-mb-xl">
      <q-icon 
        name="settings" 
        size="80px" 
        color="primary" 
        class="q-mb-md"
      />
      <h1 class="text-h3 text-weight-bold text-primary q-mb-sm">
        Configurações
      </h1>
      <p class="text-h6 text-grey-7">
        Personalize sua experiência de leitura
      </p>
    </div>

    <!-- Configurações -->
    <div class="settings-section">
      <q-card flat bordered>
        <q-card-section>
          <h2 class="text-h6 text-weight-bold q-mb-md">Aparência</h2>
          
          <div class="setting-item q-mb-md">
            <div class="row items-center">
              <div class="col">
                <div class="text-subtitle2">Modo Escuro</div>
                <div class="text-caption text-grey-6">Alternar entre tema claro e escuro</div>
              </div>
              <div class="col-auto">
                <q-toggle 
                  v-model="darkMode"
                  @update:model-value="toggleDarkMode"
                  color="primary"
                />
              </div>
            </div>
          </div>

          <div class="setting-item q-mb-md">
            <div class="row items-center">
              <div class="col">
                <div class="text-subtitle2">Tamanho da Fonte</div>
                <div class="text-caption text-grey-6">Ajustar o tamanho do texto</div>
              </div>
              <div class="col-auto">
                <q-slider
                  v-model="fontSize"
                  :min="12"
                  :max="24"
                  :step="2"
                  color="primary"
                  style="width: 120px"
                  @update:model-value="saveFontSize"
                />
              </div>
            </div>
            <div class="text-caption text-center q-mt-xs">{{ fontSize }}px</div>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered class="q-mt-md">
        <q-card-section>
          <h2 class="text-h6 text-weight-bold q-mb-md">Leitura</h2>
          
          <div class="setting-item q-mb-md">
            <div class="row items-center">
              <div class="col">
                <div class="text-subtitle2">Tradução</div>
                <div class="text-caption text-grey-6">Escolha a versão da Bíblia</div>
              </div>
              <div class="col-auto">
                <q-select
                  v-model="selectedTranslation"
                  :options="translationOptions"
                  outlined
                  dense
                  style="min-width: 150px"
                  @update:model-value="saveTranslation"
                />
              </div>
            </div>
          </div>

          <div class="setting-item q-mb-md">
            <div class="row items-center">
              <div class="col">
                <div class="text-subtitle2">Notificações</div>
                <div class="text-caption text-grey-6">Lembretes de leitura diária</div>
              </div>
              <div class="col-auto">
                <q-toggle 
                  v-model="notifications"
                  color="primary"
                  @update:model-value="saveNotifications"
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered class="q-mt-md">
        <q-card-section>
          <h2 class="text-h6 text-weight-bold q-mb-md">Sobre</h2>
          
          <div class="about-info">
            <div class="row q-mb-sm">
              <div class="col-4 text-weight-medium">Versão:</div>
              <div class="col-8">1.0.0</div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-4 text-weight-medium">Desenvolvido com:</div>
              <div class="col-8">Quasar Framework + Vue.js</div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-4 text-weight-medium">Licença:</div>
              <div class="col-8">Uso livre</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Estado das configurações
const darkMode = ref(false)
const fontSize = ref(16)
const selectedTranslation = ref('almeida')
const notifications = ref(false)

// Opções de tradução
const translationOptions = [
  { label: 'Almeida Corrigida', value: 'almeida' },
  { label: 'Nova Versão Internacional', value: 'nvi' },
  { label: 'King James Version', value: 'kjv' }
]

// Funções
function toggleDarkMode() {
  $q.dark.toggle()
}

// Carregar configurações salvas
onMounted(() => {
  darkMode.value = $q.dark.isActive
  
  // Carregar configurações do localStorage se existirem
  const savedFontSize = localStorage.getItem('bible-font-size')
  if (savedFontSize) {
    fontSize.value = parseInt(savedFontSize)
  }
  
  const savedTranslation = localStorage.getItem('bible-translation')
  if (savedTranslation) {
    selectedTranslation.value = savedTranslation
  }
  
  const savedNotifications = localStorage.getItem('bible-notifications')
  if (savedNotifications) {
    notifications.value = savedNotifications === 'true'
  }
})

// Salvar configurações automaticamente quando mudarem
function saveFontSize() {
  localStorage.setItem('bible-font-size', fontSize.value.toString())
}

function saveTranslation() {
  localStorage.setItem('bible-translation', selectedTranslation.value)
}

function saveNotifications() {
  localStorage.setItem('bible-notifications', notifications.value.toString())
}
</script>

<style scoped>
.page-header {
  padding: 40px 0;
}

.setting-item {
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.setting-item:last-child {
  border-bottom: none;
}

.about-info {
  background: rgba(25, 118, 210, 0.02);
  padding: 16px;
  border-radius: 8px;
}

@media (max-width: 600px) {
  .page-header {
    padding: 20px 0;
  }
  
  .setting-item .row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .setting-item .col-auto {
    margin-top: 8px;
  }
}
</style>
