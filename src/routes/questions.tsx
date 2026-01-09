import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuestions, useCategories } from '../hooks/useQuestions'
import { useAuth } from '../contexts/AuthContext'

export const Route = createFileRoute('/questions')({ component: QuestionsPage })

function QuestionsPage() {
  const { user } = useAuth()
  const { categories } = useCategories()
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const { questions, isLoading } = useQuestions({ category: selectedCategory })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Interview Questions</h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Browse the questions that will guide your memory capture journey
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base touch-manipulation ${
                !selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All Questions
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base touch-manipulation ${
                  selectedCategory === category.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Questions List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading questions...</p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm sm:text-base">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                        {question.category}
                      </span>
                      {question.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {question.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-base sm:text-lg text-gray-900 font-medium mb-3 leading-relaxed">{question.prompt}</p>
                    {question.followUpPrompts && question.followUpPrompts.length > 0 && (
                      <div className="mt-4 pl-3 sm:pl-4 border-l-2 border-gray-300">
                        <p className="text-sm text-gray-700 font-medium mb-2">Follow-up prompts:</p>
                        <ul className="space-y-1.5">
                          {question.followUpPrompts.map((followUp, idx) => (
                            <li key={idx} className="text-sm text-gray-600 leading-relaxed">
                              • {followUp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {questions.length === 0 && !isLoading && (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
            <p className="text-gray-600">No questions found in this category.</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 sm:mt-12 bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Question Database Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">{questions.length}</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {selectedCategory ? 'In Category' : 'Total Questions'}
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">{categories.length}</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Categories</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {questions.filter((q) => q.followUpPrompts && q.followUpPrompts.length > 0).length}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">With Follow-ups</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {questions.reduce((acc, q) => acc + (q.followUpPrompts?.length || 0), 0)}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Total Prompts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
