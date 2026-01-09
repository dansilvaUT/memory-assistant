// Server-side database operations
// These are called from the client and execute on the server

import { createServerFn } from '@tanstack/react-start'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

// Lazy initialize Prisma to ensure it's only created once
let prismaInstance: PrismaClient | null = null

const getPrisma = () => {
  if (!prismaInstance) {
    const pool = new pg.Pool({
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

export const saveMemory = createServerFn({ method: 'POST' }).handler(
  async ({
    data,
  }: {
    data: {
      userId: string
      questionId: string
      questionPrompt: string
      answerText: string
      category: string
    }
  }) => {
    try {
      const prisma = getPrisma()
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
)

export const getMemories = createServerFn({ method: 'GET' }).handler(
  async ({ data }: { data: { userId: string } }) => {
    try {
      const prisma = getPrisma()
      const { userId } = data

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
)

export const completeSession = createServerFn({ method: 'POST' }).handler(
  async ({ data }: { data: { sessionId: string } }) => {
    try {
      const prisma = getPrisma()
      const { sessionId } = data

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
)
