import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let prisma: PrismaClient | null = null

try {
  const useJsonOnly = process.env.USE_JSON_ONLY === 'true'

  if (!useJsonOnly && process.env.DATABASE_URL) {
    const client = globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    })

    const connectPromise = client.$connect()
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('DB_CONNECT_TIMEOUT')), 1000)
    })

    Promise.race([connectPromise, timeoutPromise])
      .then(() => {
        prisma = client
        if (process.env.NODE_ENV !== 'production') {
          globalForPrisma.prisma = client
        }
      })
      .catch((err) => {
        console.warn('⚠️ Banco indisponível, usando dados JSON:', err?.message || err)
        prisma = null
      })
  } else {
    console.log('ℹ️ Modo JSON ativado. Banco não será utilizado.')
    prisma = null
  }
} catch (error) {
  console.error('⚠️ Erro ao preparar Prisma. Usando dados JSON:', error)
  prisma = null
}

export { prisma }
