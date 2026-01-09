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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Interview Questions</h1>
          <p className="text-gray-400 text-lg">
            Browse the questions that will guide your memory capture journey
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              All Questions
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
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
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            <p className="text-gray-400 mt-4">Loading questions...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-cyan-400 font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        {question.category}
                      </span>
                      {question.tags && (
                        <div className="flex gap-2">
                          {question.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-gray-500 bg-slate-700/50 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-lg text-white font-medium mb-3">{question.prompt}</p>
                    {question.followUpPrompts && question.followUpPrompts.length > 0 && (
                      <div className="mt-4 pl-4 border-l-2 border-slate-600">
                        <p className="text-sm text-gray-400 font-medium mb-2">Follow-up prompts:</p>
                        <ul className="space-y-1">
                          {question.followUpPrompts.map((followUp, idx) => (
                            <li key={idx} className="text-sm text-gray-500">
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
          <div className="text-center py-12">
            <p className="text-gray-400">No questions found in this category.</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Question Database Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <p className="text-2xl font-bold text-cyan-400">{questions.length}</p>
              <p className="text-sm text-gray-400">
                {selectedCategory ? 'In Category' : 'Total Questions'}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cyan-400">{categories.length}</p>
              <p className="text-sm text-gray-400">Categories</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cyan-400">
                {questions.filter((q) => q.followUpPrompts && q.followUpPrompts.length > 0).length}
              </p>
              <p className="text-sm text-gray-400">With Follow-ups</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cyan-400">
                {questions.reduce((acc, q) => acc + (q.followUpPrompts?.length || 0), 0)}
              </p>
              <p className="text-sm text-gray-400">Total Prompts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
