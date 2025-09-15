// Configuração para desenvolvimento
if (process.env.NODE_ENV === 'development') {
  // Suprimir aviso do React DevTools
  const originalConsoleWarn = console.warn
  console.warn = (...args) => {
    if (args[0]?.includes?.('Download the React DevTools')) {
      return
    }
    originalConsoleWarn(...args)
  }
}

