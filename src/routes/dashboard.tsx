import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/dashboard')({ component: Dashboard })

interface Memory {
  id: string
  questionPrompt: string
  answerText: string
  createdAt: string
}

interface Session {
  id: string
  status: string
  startedAt: string
  memories: Memory[]
}

function Dashboard() {
  const { user, logout, isLoading } = useAuth()
  const navigate = useNavigate()
  const [memories, setMemories] = useState<Memory[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: '/login' })
    }
  }, [user, isLoading, navigate])

  useEffect(() => {
    const fetchMemories = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/-memories?userId=${user.id}`)
          const data = await response.json()
          setMemories(data.memories || [])
          setSessions(data.sessions || [])
        } catch (error) {
          console.error('Error fetching memories:', error)
        } finally {
          setLoadingData(false)
        }
      }
    }

    if (user) {
      fetchMemories()
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">Ready to capture some memories?</p>
          </div>
          <button
            onClick={logout}
            className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg transition-colors font-medium touch-manipulation"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-3xl sm:text-2xl font-bold text-gray-900 mb-2">
              {loadingData ? '...' : memories.length}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">Memories Captured</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-3xl sm:text-2xl font-bold text-gray-900 mb-2">
              {loadingData ? '...' : sessions.length}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">Interview Sessions</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-3xl sm:text-2xl font-bold text-gray-900 mb-2">0</h3>
            <p className="text-gray-600 text-sm sm:text-base">Media Items</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Start Your First Memory Session
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
              Let's begin capturing your precious moments through guided questions
            </p>
            <a
              href="/interview"
              className="inline-block w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-colors shadow-sm touch-manipulation text-center"
            >
              Start Interview
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Browse Questions
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
              Explore the questions that will guide your memory journey
            </p>
            <a
              href="/questions"
              className="inline-block w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-semibold rounded-lg transition-colors touch-manipulation"
            >
              View All Questions
            </a>
          </div>
        </div>

        {/* Recent Memories */}
        {memories.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Memories</h2>
            <div className="space-y-4">
              {memories.slice(0, 5).map((memory) => (
                <div
                  key={memory.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <p className="text-sm font-semibold text-blue-600 mb-2">
                    {memory.questionPrompt}
                  </p>
                  <p className="text-gray-700 leading-relaxed line-clamp-3">{memory.answerText}</p>
                  <p className="text-xs text-gray-500 mt-3">
                    {new Date(memory.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              ))}
            </div>
            {memories.length > 5 && (
              <div className="mt-6 text-center">
                <button className="text-blue-600 hover:text-blue-700 font-semibold">
                  View all {memories.length} memories →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
