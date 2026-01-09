import { json } from '@tanstack/react-router'
import prisma from '../../lib/prisma'

// POST - Complete a session
export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json()
    const { sessionId } = body

    if (!sessionId) {
      return json({ error: 'sessionId is required' }, { status: 400 })
    }

    const session = await prisma.memorySession.update({
      where: { id: sessionId },
      data: {
        status: 'completed',
        completedAt: new Date(),
      },
    })

    return json({ session })
  } catch (error) {
    console.error('Error completing session:', error)
    return json({ error: 'Failed to complete session' }, { status: 500 })
  }
}
