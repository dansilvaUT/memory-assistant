import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'
import { useEffect } from 'react'

export const Route = createFileRoute('/dashboard')({ component: Dashboard })

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate({ to: '/login' })
    }
  }, [user, navigate])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-400">Ready to capture some memories?</p>
          </div>
          <button
            onClick={logout}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-2">0</h3>
            <p className="text-gray-400">Memories Captured</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-2">0</h3>
            <p className="text-gray-400">Interview Sessions</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-2">0</h3>
            <p className="text-gray-400">Media Items</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Start Your First Memory Session
            </h2>
            <p className="text-gray-400 mb-6">
              Let's begin capturing your precious moments through guided questions
            </p>
            <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50">
              Start Interview
            </button>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Browse Questions
            </h2>
            <p className="text-gray-400 mb-6">
              Explore the questions that will guide your memory journey
            </p>
            <a
              href="/questions"
              className="inline-block px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
            >
              View All Questions
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
