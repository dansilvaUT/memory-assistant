// Temporary localStorage-based storage for testing
// This bypasses the server function issues with Prisma

interface Memory {
  id: string
  userId: string
  sessionId: string
  questionId: string
  questionPrompt: string
  answerText: string
  createdAt: string
}

interface Session {
  id: string
  userId: string
  status: string
  startedAt: string
  completedAt: string | null
  category: string | null
  memories: Memory[]
}

const STORAGE_KEY = 'memory-assistant-data'

function getData() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : { memories: [], sessions: [] }
}

function saveData(data: { memories: Memory[]; sessions: Session[] }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function saveMemory(params: {
  userId: string
  questionId: string
  questionPrompt: string
  answerText: string
  category: string
}) {
  const data = getData()

  // Find or create session
  let session = data.sessions.find(
    (s: Session) => s.userId === params.userId && s.status === 'in_progress'
  )

  if (!session) {
    session = {
      id: `session_${Date.now()}`,
      userId: params.userId,
      status: 'in_progress',
      startedAt: new Date().toISOString(),
      completedAt: null,
      category: params.category,
      memories: [],
    }
    data.sessions.push(session)
  }

  // Check if memory exists
  const existingMemoryIndex = data.memories.findIndex(
    (m: Memory) =>
      m.userId === params.userId &&
      m.sessionId === session.id &&
      m.questionId === params.questionId
  )

  const memory: Memory = {
    id: existingMemoryIndex >= 0 ? data.memories[existingMemoryIndex].id : `memory_${Date.now()}`,
    userId: params.userId,
    sessionId: session.id,
    questionId: params.questionId,
    questionPrompt: params.questionPrompt,
    answerText: params.answerText,
    createdAt: existingMemoryIndex >= 0 ? data.memories[existingMemoryIndex].createdAt : new Date().toISOString(),
  }

  if (existingMemoryIndex >= 0) {
    data.memories[existingMemoryIndex] = memory
  } else {
    data.memories.push(memory)
  }

  // Update session memories
  const sessionIndex = data.sessions.findIndex((s: Session) => s.id === session.id)
  data.sessions[sessionIndex].memories = data.memories.filter((m: Memory) => m.sessionId === session.id)

  saveData(data)

  return { success: true, memory, sessionId: session.id }
}

export function getMemories(userId: string) {
  const data = getData()

  const memories = data.memories.filter((m: Memory) => m.userId === userId)
  const sessions = data.sessions.filter((s: Session) => s.userId === userId)

  return { memories, sessions }
}

export function completeSession(sessionId: string) {
  const data = getData()

  const sessionIndex = data.sessions.findIndex((s: Session) => s.id === sessionId)
  if (sessionIndex >= 0) {
    data.sessions[sessionIndex].status = 'completed'
    data.sessions[sessionIndex].completedAt = new Date().toISOString()
    saveData(data)
  }

  return { success: true }
}
