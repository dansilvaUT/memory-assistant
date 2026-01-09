// This file is server-only and should never be imported by client code
/// <reference types="@prisma/client" />

let prismaInstance: any = null

export async function getPrismaClient() {
  if (!prismaInstance) {
    const { PrismaClient } = await import('@prisma/client')
    const { PrismaPg } = await import('@prisma/adapter-pg')
    const pg = await import('pg')

    const pool = new pg.default.Pool({
      connectionString: process.env.DATABASE_URL,
    })

    const adapter = new PrismaPg(pool)

    prismaInstance = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    })
  }

  return prismaInstance
}
