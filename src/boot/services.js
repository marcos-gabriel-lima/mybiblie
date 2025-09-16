import { boot } from 'quasar/wrappers'
import { databaseService } from '../services/database'
import { offlineSyncService } from '../services/offlineSync'

export default boot(async () => {
  try {
    // Inicializar banco de dados
    await databaseService.init()
    console.log('Database initialized')
    
    // Inicializar serviço offline
    console.log('Offline service initialized')
  } catch (error) {
    console.error('Error initializing services:', error)
  }
})
