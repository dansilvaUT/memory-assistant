import { json } from '@tanstack/react-router'
import { questions, getQuestionsByCategory, getRandomQuestion, getCategories } from '../../data/questions'

export function GET({ request }: { request: Request }) {
  const url = new URL(request.url)
  const category = url.searchParams.get('category')
  const random = url.searchParams.get('random')
  const id = url.searchParams.get('id')

  // Get specific question by ID
  if (id) {
    const question = questions.find((q) => q.id === id)
    if (!question) {
      return json({ error: 'Question not found' }, { status: 404 })
    }
    return json({ question })
  }

  // Get random question
  if (random === 'true') {
    const question = getRandomQuestion(category || undefined)
    return json({ question })
  }

  // Get questions by category
  if (category) {
    const categoryQuestions = getQuestionsByCategory(category)
    return json({ questions: categoryQuestions, count: categoryQuestions.length })
  }

  // Get all questions
  const activeQuestions = questions.filter((q) => q.isActive)
  return json({ questions: activeQuestions, count: activeQuestions.length })
}
