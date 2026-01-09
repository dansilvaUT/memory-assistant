// Server-side database operations
// These are called from the client and execute on the server

'use server'

import type { PrismaClient } from '@prisma/client'

// Lazy initialize Prisma to ensure it's only loaded on the server
let prismaInstance: PrismaClient | null = null

const getPrisma = async () => {
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

export async function saveMemory(data: {
  userId: string
  questionId: string
  questionPrompt: string
  answerText: string
  category: string
}) {
  try {
    const prisma = await getPrisma()
    const { userId, questionId, questionPrompt, answerText, category } = data

    // Create or get the current session
    let session = await prisma.memorySession.findFirst({
      where: {
        userId,
        status: 'in_progress',
      },
      orderBy: {
        startedAt: 'desc',
      },
    })

    if (!session) {
      session = await prisma.memorySession.create({
        data: {
          userId,
          status: 'in_progress',
          category: category || null,
        },
      })
    }

    // Check if this memory already exists (for updates)
    const existingMemory = await prisma.memory.findFirst({
      where: {
        userId,
        sessionId: session.id,
        questionId,
      },
    })

    let memory
    if (existingMemory) {
      // Update existing memory
      memory = await prisma.memory.update({
        where: { id: existingMemory.id },
        data: { answerText },
      })
    } else {
      // Create new memory
      memory = await prisma.memory.create({
        data: {
          userId,
          sessionId: session.id,
          questionId,
          questionPrompt,
          answerText,
        },
      })
    }

    // Track answered question
    await prisma.answeredQuestion.upsert({
      where: {
        sessionId_questionId: {
          sessionId: session.id,
          questionId,
        },
      },
      create: {
        sessionId: session.id,
        questionId,
      },
      update: {},
    })

    return { success: true, memory, sessionId: session.id }
  } catch (error) {
    console.error('Error saving memory:', error)
    throw new Error('Failed to save memory')
  }
}

export async function getMemories(userId: string) {
  try {
    const prisma = await getPrisma()
    const memories = await prisma.memory.findMany({
      where: { userId },
      include: {
        session: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const sessions = await prisma.memorySession.findMany({
      where: { userId },
      include: {
        memories: true,
        answeredQuestions: true,
      },
      orderBy: {
        startedAt: 'desc',
      },
    })

    return { memories, sessions }
  } catch (error) {
    console.error('Error fetching memories:', error)
    throw new Error('Failed to fetch memories')
  }
}

export async function completeSession(sessionId: string) {
  try {
    const prisma = await getPrisma()
    const session = await prisma.memorySession.update({
      where: { id: sessionId },
      data: {
        status: 'completed',
        completedAt: new Date(),
      },
    })

    return { success: true, session }
  } catch (error) {
    console.error('Error completing session:', error)
    throw new Error('Failed to complete session')
  }
}
