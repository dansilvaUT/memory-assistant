import { useState, useEffect } from 'react'
import { Question } from '../types/questions'

interface UseQuestionsOptions {
  category?: string
  random?: boolean
  id?: string
}

interface UseQuestionsReturn {
  questions: Question[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useQuestions(options: UseQuestionsOptions = {}): UseQuestionsReturn {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchQuestions = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (options.category) params.append('category', options.category)
      if (options.random) params.append('random', 'true')
      if (options.id) params.append('id', options.id)

      const response = await fetch(`/api/questions?${params.toString()}`)

      if (!response.ok) {
        throw new Error('Failed to fetch questions')
      }

      const data = await response.json()

      if (data.question) {
        setQuestions([data.question])
      } else if (data.questions) {
        setQuestions(data.questions)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [options.category, options.random, options.id])

  return {
    questions,
    isLoading,
    error,
    refetch: fetchQuestions,
  }
}

interface UseCategoriesReturn {
  categories: Array<{ name: string; count: number; label: string }>
  isLoading: boolean
  error: string | null
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Array<{ name: string; count: number; label: string }>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }
        const data = await response.json()
        setCategories(data.categories)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, isLoading, error }
}
