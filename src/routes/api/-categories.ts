import { json } from '@tanstack/react-router'
import { getCategories, getQuestionsByCategory } from '../../data/questions'

export function GET() {
  const categories = getCategories()

  const categoriesWithCounts = categories.map((category) => ({
    name: category,
    count: getQuestionsByCategory(category).length,
    label: formatCategoryLabel(category),
  }))

  return json({ categories: categoriesWithCounts })
}

function formatCategoryLabel(category: string): string {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
