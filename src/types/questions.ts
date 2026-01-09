export interface Question {
  id: string
  category: QuestionCategory
  prompt: string
  followUpPrompts?: string[]
  order: number
  isActive: boolean
  tags?: string[]
}

export type QuestionCategory =
  | 'childhood'
  | 'family'
  | 'education'
  | 'career'
  | 'relationships'
  | 'milestones'
  | 'achievements'
  | 'challenges'
  | 'hobbies'
  | 'travel'
  | 'general'

export interface QuestionSession {
  id: string
  userId: string
  startedAt: Date
  completedAt?: Date
  currentQuestionId?: string
  answeredQuestions: string[]
  category?: QuestionCategory
}
