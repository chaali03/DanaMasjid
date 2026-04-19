// Prisma client with fallback for build time
let PrismaClient: any

try {
  // Try to import PrismaClient
  const prismaModule = require('@prisma/client')
  PrismaClient = prismaModule.PrismaClient
  
  // Check if DATABASE_URL is set - if not, use mock to avoid crash
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not found, using mock Prisma Client')
    throw new Error('DATABASE_URL missing')
  }
} catch (error) {
  // Fallback for build time when Prisma client is not generated yet
  console.warn('Prisma Client not available, using mock')
  PrismaClient = class MockPrismaClient {
    masjidRegistration = {
      create: async () => ({ id: 'mock-id' }),
      findUnique: async () => null,
      findMany: async () => [],
      findFirst: async () => null,
      update: async () => ({ id: 'mock-id' }),
      count: async () => 0,
      delete: async () => ({ id: 'mock-id' })
    }
    registrationToken = {
      create: async (data: any) => ({ id: 'mock-id', token: data?.data?.token || 'mock-token', ...data?.data }),
      findUnique: async () => null,
      findFirst: async () => null,
      update: async () => ({ id: 'mock-id' }),
      delete: async () => ({ id: 'mock-id' }),
      count: async () => 0
    }
    user = {
      create: async () => ({ id: 'mock-id' }),
      findUnique: async () => null,
      findFirst: async () => null,
      update: async () => ({ id: 'mock-id' }),
      delete: async () => ({ id: 'mock-id' })
    }
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
