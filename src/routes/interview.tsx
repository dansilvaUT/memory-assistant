import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { questions } from '../data/questions'
import { ChevronLeft, ChevronRight, Save } from 'lucide-react'
import { saveMemory, completeSession } from '../lib/server-functions'

export const Route = createFileRoute('/interview')({ component: InterviewPage })

function InterviewPage() {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  useEffect(() => {
    // Only redirect if loading is done and there's no user
    if (!isLoading && !user) {
      navigate({ to: '/login' })
    }
  }, [user, isLoading, navigate])

  useEffect(() => {
    // Load saved answer for current question
    if (currentQuestion && answers[currentQuestion.id]) {
      setCurrentAnswer(answers[currentQuestion.id])
    } else {
      setCurrentAnswer('')
    }
  }, [currentQuestionIndex, currentQuestion, answers])

  // Show loading state while checking authentication
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

  const handleSaveAndNext = async () => {
    // Save current answer to database
    if (currentAnswer.trim() && user) {
      setIsSaving(true)
      try {
        const result = await saveMemory({
          data: {
            userId: user.id,
            questionId: currentQuestion.id,
            questionPrompt: currentQuestion.prompt,
            answerText: currentAnswer,
            category: currentQuestion.category,
          },
        })

        if (result.sessionId && !sessionId) {
          setSessionId(result.sessionId)
        }

        // Store in local state too
        setAnswers((prev) => ({
          ...prev,
          [currentQuestion.id]: currentAnswer,
        }))
      } catch (error) {
        console.error('Error saving memory:', error)
        alert('Failed to save memory. Please try again.')
        setIsSaving(false)
        return
      }
      setIsSaving(false)
    }

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // Complete the session
      if (sessionId) {
        try {
          await completeSession({
            data: { sessionId },
          })
        } catch (error) {
          console.error('Error completing session:', error)
        }
      }
      alert('Interview complete! Your memories have been saved.')
      navigate({ to: '/dashboard' })
    }
  }

  const handlePrevious = () => {
    // Save current answer before going back
    if (currentAnswer.trim()) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: currentAnswer,
      }))
    }

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const answeredCount = Object.keys(answers).length + (currentAnswer.trim() ? 1 : 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {answeredCount} answered
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-10 shadow-sm">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full uppercase tracking-wide">
              {currentQuestion.category}
            </span>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {currentQuestion.prompt}
            </h1>
            {currentQuestion.followUpPrompts && currentQuestion.followUpPrompts.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Consider these follow-up prompts:
                </p>
                <ul className="space-y-2">
                  {currentQuestion.followUpPrompts.map((prompt, idx) => (
                    <li key={idx} className="text-sm text-gray-600 leading-relaxed">
                      • {prompt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Answer Textarea */}
          <div className="mb-8">
            <label htmlFor="answer" className="block text-sm font-semibold text-gray-700 mb-3">
              Your Answer
            </label>
            <textarea
              id="answer"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Take your time... share your memory here..."
              className="w-full px-4 py-4 bg-white border border-gray-300 rounded-lg text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              rows={8}
            />
            <p className="text-sm text-gray-500 mt-2">
              {currentAnswer.length} characters
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 rounded-lg font-semibold transition-colors touch-manipulation"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
            )}

            <button
              onClick={handleSkip}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium transition-colors touch-manipulation"
            >
              Skip for Now
            </button>

            <button
              onClick={handleSaveAndNext}
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-colors shadow-sm touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                'Saving...'
              ) : currentQuestionIndex === questions.length - 1 ? (
                <>
                  <Save className="w-5 h-5" />
                  Complete Interview
                </>
              ) : (
                <>
                  Save & Continue
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Exit Option */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate({ to: '/dashboard' })}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Save progress and exit
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Tip:</strong> Don't worry about perfection. Just write what comes to mind. You
            can always come back and edit your answers later.
          </p>
        </div>
      </div>
    </div>
  )
}
