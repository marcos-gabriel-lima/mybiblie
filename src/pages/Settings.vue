<template>
  <q-page class="q-pa-md">
    <div class="q-mb-md">
      <h4 class="text-h4 q-mb-sm">Configurações</h4>
      <p class="text-grey-6">Personalize sua experiência de leitura</p>
    </div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">Aparência</div>
        
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Tamanho da fonte</q-item-label>
              <q-item-label caption>Escolha o tamanho ideal para leitura</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn-toggle
                v-model="fontSize"
                :options="[
                  { label: 'Pequeno', value: 'small' },
                  { label: 'Médio', value: 'medium' },
                  { label: 'Grande', value: 'large' }
                ]"
                color="primary"
                @update:model-value="updateFontSize"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Tema</q-item-label>
              <q-item-label caption>Escolha entre tema claro ou escuro</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn-toggle
                v-model="theme"
                :options="[
                  { label: 'Claro', value: 'light' },
                  { label: 'Escuro', value: 'dark' }
                ]"
                color="primary"
                @update:model-value="updateTheme"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">Idioma</div>
        
        <q-list>
          <q-item clickable @click="showLanguageDialog = true">
            <q-item-section>
              <q-item-label>Idioma da interface</q-item-label>
              <q-item-label caption>{{ currentLanguageLabel }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="chevron_right" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">Dados Offline</div>
        
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Capítulos salvos</q-item-label>
              <q-item-label caption>{{ offlineStats?.chaptersCount || 0 }} capítulos</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Favoritos</q-item-label>
              <q-item-label caption>{{ offlineStats?.favoritesCount || 0 }} versículos</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Última sincronização</q-item-label>
              <q-item-label caption>{{ formatDate(offlineStats?.lastSync) }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-btn
                color="primary"
                label="Pré-carregar Capítulos Populares"
                @click="preloadChapters"
                :loading="isPreloading"
                :disable="!isOnline"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-btn
                color="negative"
                label="Limpar Dados Offline"
                @click="clearOfflineData"
                :disable="!offlineStats?.hasOfflineData"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- Language Dialog -->
    <q-dialog v-model="showLanguageDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Selecionar Idioma</div>
        </q-card-section>

        <q-card-section>
          <q-list>
            <q-item clickable v-close-popup @click="changeLanguage('pt-BR')">
              <q-item-section avatar>
                <q-icon name="flag" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>🇧🇷 Português</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="changeLanguage('en-US')">
              <q-item-section avatar>
                <q-icon name="flag" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>🇺🇸 English</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="changeLanguage('es-ES')">
              <q-item-section avatar>
                <q-icon name="flag" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>🇪🇸 Español</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useOfflineStatus } from '../hooks/useBibleApi'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'SettingsPage',

  setup() {
    const { locale } = useI18n()
    const $q = useQuasar()
    const { offlineStats, preloadPopularChapters, clearOfflineData, isOnline } = useOfflineStatus()
    
    const fontSize = ref('medium')
    const theme = ref('light')
    const showLanguageDialog = ref(false)
    const isPreloading = ref(false)

    const currentLanguageLabel = computed(() => {
      const labels = {
        'pt-BR': '🇧🇷 Português',
        'en-US': '🇺🇸 English',
        'es-ES': '🇪🇸 Español'
      }
      return labels[locale.value] || 'Português'
    })

    const changeLanguage = (lang) => {
      locale.value = lang
    }

    const updateFontSize = (size) => {
      // Implementar mudança de tamanho da fonte
      console.log('Font size changed to:', size)
    }

    const updateTheme = (newTheme) => {
      $q.dark.set(newTheme === 'dark')
    }

    const preloadChapters = async () => {
      isPreloading.value = true
      try {
        await preloadPopularChapters()
        $q.notify({
          type: 'positive',
          message: 'Capítulos pré-carregados com sucesso!'
        })
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Erro ao pré-carregar capítulos'
        })
      } finally {
        isPreloading.value = false
      }
    }

    const clearOfflineData = async () => {
      $q.dialog({
        title: 'Confirmar',
        message: 'Tem certeza que deseja limpar todos os dados offline? Esta ação não pode ser desfeita.',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await clearOfflineData()
          $q.notify({
            type: 'positive',
            message: 'Dados offline limpos com sucesso!'
          })
        } catch (error) {
          $q.notify({
            type: 'negative',
            message: 'Erro ao limpar dados offline'
          })
        }
      })
    }

    const formatDate = (date) => {
      if (!date) return 'Nunca'
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(date))
    }

    return {
      fontSize,
      theme,
      showLanguageDialog,
      isPreloading,
      currentLanguageLabel,
      offlineStats,
      isOnline,
      changeLanguage,
      updateFontSize,
      updateTheme,
      preloadChapters,
      clearOfflineData,
      formatDate
    }
  }
})
</script>
