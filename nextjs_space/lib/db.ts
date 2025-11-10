import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Criar Prisma Client apenas se DATABASE_URL estiver configurado
let prisma: PrismaClient | null = null

try {
  if (process.env.DATABASE_URL) {
    prisma = globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    })
    
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prisma
    }
  } else {
    console.log('⚠️ DATABASE_URL não configurado. Aplicação funcionará apenas com dados JSON.')
  }
} catch (error) {
  console.error('⚠️ Erro ao inicializar Prisma Client. Aplicação funcionará apenas com dados JSON:', error)
  prisma = null
}

// Exportar prisma que pode ser null (usar com try/catch)
export { prisma }
