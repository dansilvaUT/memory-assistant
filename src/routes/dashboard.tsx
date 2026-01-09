import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'
import { useEffect } from 'react'

export const Route = createFileRoute('/dashboard')({ component: Dashboard })

function Dashboard() {
  const { user, logout, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: '/login' })
    }
  }, [user, isLoading, navigate])

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
            <h3 className="text-3xl sm:text-2xl font-bold text-gray-900 mb-2">0</h3>
            <p className="text-gray-600 text-sm sm:text-base">Memories Captured</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-3xl sm:text-2xl font-bold text-gray-900 mb-2">0</h3>
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
      </div>
    </div>
  )
}
