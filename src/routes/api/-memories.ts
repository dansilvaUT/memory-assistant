import { json } from '@tanstack/react-router'
import prisma from '../../lib/prisma'

// POST - Create a new memory
export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json()
    const { userId, questionId, questionPrompt, answerText, category } = body

    if (!userId || !questionId || !questionPrompt || !answerText) {
      return json({ error: 'Missing required fields' }, { status: 400 })
    }

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

    return json({ memory, sessionId: session.id })
  } catch (error) {
    console.error('Error saving memory:', error)
    return json({ error: 'Failed to save memory' }, { status: 500 })
  }
}

// GET - Get memories for a user
export async function GET({ request }: { request: Request }) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')

    if (!userId) {
      return json({ error: 'userId is required' }, { status: 400 })
    }

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

    return json({ memories, sessions })
  } catch (error) {
    console.error('Error fetching memories:', error)
    return json({ error: 'Failed to fetch memories' }, { status: 500 })
  }
}
