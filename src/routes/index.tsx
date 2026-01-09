import { createFileRoute, Link } from '@tanstack/react-router'
import { Heart, Sparkles, Clock, Users } from 'lucide-react'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const features = [
    {
      icon: <Heart className="w-12 h-12 text-blue-600" />,
      title: 'Capture Precious Moments',
      description: 'Preserve your life stories through guided conversations and thoughtful prompts.',
    },
    {
      icon: <Sparkles className="w-12 h-12 text-blue-600" />,
      title: 'AI-Powered Assistance',
      description: 'Smart suggestions help you articulate memories and remember forgotten details.',
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: 'Timeline Organization',
      description: 'Organize memories chronologically to see your life story unfold.',
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: 'Interview Loved Ones',
      description: 'Help family members and friends document their precious memories.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Capture Your Life Stories
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            An AI-powered memory assistant that helps you preserve precious moments through guided interviews
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-lg shadow-sm"
            >
              Start Capturing Memories
            </Link>
            <Link
              to="/login"
              className="px-10 py-4 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-lg transition-colors text-lg border-2 border-blue-600"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Why Memory Assistant?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-10 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to preserve your memories?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join us today and start capturing the stories that matter most
          </p>
          <Link
            to="/signup"
            className="inline-block px-10 py-4 bg-white hover:bg-gray-100 text-blue-600 font-bold rounded-lg transition-colors text-lg shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  )
}
