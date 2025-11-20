import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bibliaalmeida.app',
  appName: 'Bíblia Sagrada Almeida',
  // IMPORTANTE: 
  // - Use '.next' se usar server.url (URL do servidor)
  // - Use 'out' se usar build estática (sem server.url)
  webDir: '.next',
  server: {
    // OPÇÃO 1: Usar URL do app publicado (RECOMENDADO)
    // Descomente e coloque a URL do seu app:
    // url: 'https://SEU-DOMINIO.vercel.app',
    // cleartext: false
    
    // OPÇÃO 2: Para desenvolvimento local (descomente para testar)
    // url: 'http://10.0.2.2:3010', // IP do emulador Android para localhost
    // cleartext: true,
    
    // OPÇÃO 3: Usar build estática local (comente server acima)
    // Se usar build estática, não precisa de server.url
  },
  android: {
    allowMixedContent: true,
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#1e40af",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
    }
  }
};

export default config;

