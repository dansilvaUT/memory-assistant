import { createFileRoute, Link } from '@tanstack/react-router'
import { Heart, Sparkles, Clock, Users } from 'lucide-react'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const features = [
    {
      icon: <Heart className="w-12 h-12 text-cyan-400" />,
      title: 'Capture Precious Moments',
      description: 'Preserve your life stories through guided conversations and thoughtful prompts.',
    },
    {
      icon: <Sparkles className="w-12 h-12 text-cyan-400" />,
      title: 'AI-Powered Assistance',
      description: 'Smart suggestions help you articulate memories and remember forgotten details.',
    },
    {
      icon: <Clock className="w-12 h-12 text-cyan-400" />,
      title: 'Timeline Organization',
      description: 'Organize memories chronologically to see your life story unfold.',
    },
    {
      icon: <Users className="w-12 h-12 text-cyan-400" />,
      title: 'Interview Loved Ones',
      description: 'Help family members and friends document their precious memories.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Capture Your{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Life Stories
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light max-w-3xl mx-auto">
            An AI-powered memory assistant that helps you preserve precious moments through guided interviews
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link
              to="/signup"
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50 text-lg"
            >
              Start Capturing Memories
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Why Memory Assistant?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
