import { Question } from '../types/questions'

export const questions: Question[] = [
  // Testing with just 3 questions for now
  {
    id: 'ch-001',
    category: 'childhood',
    prompt: 'Describe your childhood home. What did it look like, smell like, and feel like?',
    followUpPrompts: [
      'What was your favorite room and why?',
      'What sounds do you remember from that home?',
      'Were there any special traditions or routines in that home?',
    ],
    order: 1,
    isActive: true,
    tags: ['home', 'senses', 'early-life'],
  },
  {
    id: 'ch-002',
    category: 'childhood',
    prompt: 'Tell me about your best friend from childhood. How did you meet and what did you do together?',
    followUpPrompts: [
      'What made your friendship special?',
      'Do you remember a particularly memorable adventure you had together?',
      'Are you still in touch with this person?',
    ],
    order: 2,
    isActive: true,
    tags: ['friendship', 'relationships'],
  },
  {
    id: 'gen-001',
    category: 'general',
    prompt: 'What makes you laugh? Describe a time you laughed so hard you cried.',
    followUpPrompts: [
      'Who were you with?',
      'What was happening?',
      'Do you still laugh about this moment?',
    ],
    order: 3,
    isActive: true,
    tags: ['joy', 'humor', 'happiness'],
  },

  // More questions commented out for testing
  /*
  {
    id: 'ch-003',
    category: 'childhood',
    prompt: 'What was your favorite thing to do after school or on weekends?',
    followUpPrompts: [
      'Who did you usually do this with?',
      'Why was this activity so special to you?',
      'Do you still enjoy similar activities today?',
    ],
    order: 3,
    isActive: true,
    tags: ['hobbies', 'play', 'activities'],
  },

  // Family Questions
  {
    id: 'fam-001',
    category: 'family',
    prompt: 'Describe a typical family dinner or gathering from your childhood.',
    followUpPrompts: [
      'What foods do you remember?',
      'What did people talk about?',
      'What role did you play in these gatherings?',
    ],
    order: 4,
    isActive: true,
    tags: ['traditions', 'food', 'family-time'],
  },
  {
    id: 'fam-002',
    category: 'family',
    prompt: 'Tell me about one of your grandparents. What do you remember most about them?',
    followUpPrompts: [
      'What lessons did they teach you?',
      'Is there a specific story or moment with them that stands out?',
      'What would you want your grandchildren to know about them?',
    ],
    order: 5,
    isActive: true,
    tags: ['grandparents', 'wisdom', 'legacy'],
  },
  {
    id: 'fam-003',
    category: 'family',
    prompt: 'What family traditions were important to you growing up?',
    followUpPrompts: [
      'Which traditions have you continued in your own life?',
      'Why were these traditions meaningful?',
      'Have you started any new traditions?',
    ],
    order: 6,
    isActive: true,
    tags: ['traditions', 'culture', 'continuity'],
  },

  // Education Questions
  {
    id: 'edu-001',
    category: 'education',
    prompt: 'What was your first day of school like? How did you feel?',
    followUpPrompts: [
      'Do you remember your first teacher?',
      'What surprised you about school?',
      'Did you have any fears or worries?',
    ],
    order: 7,
    isActive: true,
    tags: ['school', 'firsts', 'education'],
  },
  {
    id: 'edu-002',
    category: 'education',
    prompt: 'Tell me about a teacher who made a difference in your life.',
    followUpPrompts: [
      'What subject did they teach?',
      'What made them special or memorable?',
      'How did they influence your path?',
    ],
    order: 8,
    isActive: true,
    tags: ['mentors', 'influence', 'learning'],
  },

  // Career Questions
  {
    id: 'car-001',
    category: 'career',
    prompt: 'What was your first job? Describe your first day.',
    followUpPrompts: [
      'What did you learn from that experience?',
      'Who were your colleagues?',
      'How did you feel about earning your own money?',
    ],
    order: 9,
    isActive: true,
    tags: ['work', 'firsts', 'independence'],
  },
  {
    id: 'car-002',
    category: 'career',
    prompt: 'What career achievement are you most proud of?',
    followUpPrompts: [
      'What challenges did you overcome to achieve it?',
      'Who helped you along the way?',
      'How did this achievement change your life or perspective?',
    ],
    order: 10,
    isActive: true,
    tags: ['achievement', 'pride', 'success'],
  },

  // Milestones Questions
  {
    id: 'mil-001',
    category: 'milestones',
    prompt: 'Describe the moment you met your significant other (or a very important person in your life).',
    followUpPrompts: [
      'What were your first impressions?',
      'When did you know this person would be important in your life?',
      'How has this relationship shaped who you are?',
    ],
    order: 11,
    isActive: true,
    tags: ['love', 'relationships', 'connections'],
  },
  {
    id: 'mil-002',
    category: 'milestones',
    prompt: 'Tell me about a time you moved to a new place. What was that experience like?',
    followUpPrompts: [
      'What did you leave behind?',
      'What were you hoping to find?',
      'How did this move change you?',
    ],
    order: 12,
    isActive: true,
    tags: ['change', 'transition', 'growth'],
  },

  // Challenges Questions
  {
    id: 'cha-001',
    category: 'challenges',
    prompt: 'Describe a difficult time in your life and how you got through it.',
    followUpPrompts: [
      'Who or what helped you through this period?',
      'What did you learn about yourself?',
      'How did this experience change your perspective?',
    ],
    order: 13,
    isActive: true,
    tags: ['resilience', 'growth', 'strength'],
  },
  {
    id: 'cha-002',
    category: 'challenges',
    prompt: 'Tell me about a time you failed at something important. What happened and what did you learn?',
    followUpPrompts: [
      'How did you handle the disappointment?',
      'Would you do anything differently now?',
      'How did this failure ultimately serve you?',
    ],
    order: 14,
    isActive: true,
    tags: ['failure', 'lessons', 'perseverance'],
  },

  // Travel Questions
  {
    id: 'tra-001',
    category: 'travel',
    prompt: 'Describe the most memorable trip or vacation you ever took.',
    followUpPrompts: [
      'What made it so special?',
      'Who were you with?',
      'What surprised or delighted you on this trip?',
    ],
    order: 15,
    isActive: true,
    tags: ['adventure', 'exploration', 'joy'],
  },

  // General Life Questions
  {
    id: 'gen-001',
    category: 'general',
    prompt: 'What smell instantly transports you back to a specific memory? Describe that memory.',
    followUpPrompts: [
      'Why do you think this smell is so powerful for you?',
      'What emotions does it bring up?',
      'Where and when do you encounter this smell now?',
    ],
    order: 16,
    isActive: true,
    tags: ['senses', 'memory', 'nostalgia'],
  },
  {
    id: 'gen-002',
    category: 'general',
    prompt: 'What advice would you give to your younger self?',
    followUpPrompts: [
      'At what age would you give this advice?',
      'Why is this advice important?',
      'Did you eventually learn this lesson? How?',
    ],
    order: 17,
    isActive: true,
    tags: ['wisdom', 'reflection', 'lessons'],
  },
  {
    id: 'gen-003',
    category: 'general',
    prompt: 'What makes you laugh? Describe a time you laughed so hard you cried.',
    followUpPrompts: [
      'Who were you with?',
      'What was happening?',
      'Do you still laugh about this moment?',
    ],
    order: 18,
    isActive: true,
    tags: ['joy', 'humor', 'happiness'],
  },
  {
    id: 'gen-004',
    category: 'general',
    prompt: 'What is something you wish you had asked a loved one before they were gone?',
    followUpPrompts: [
      'Why do you wish you had asked this?',
      'What do you think their answer might have been?',
      'Is there anyone you can ask this question to now?',
    ],
    order: 19,
    isActive: true,
    tags: ['regret', 'family', 'loss', 'curiosity'],
  },
  {
    id: 'gen-005',
    category: 'general',
    prompt: 'Describe a moment when you felt truly proud of yourself.',
    followUpPrompts: [
      'What led to this moment?',
      'Who did you share it with?',
      'How does remembering this moment make you feel now?',
    ],
    order: 20,
    isActive: true,
    tags: ['pride', 'achievement', 'self-worth'],
  },
]

// Helper function to get questions by category
export function getQuestionsByCategory(category: string): Question[] {
  return questions.filter((q) => q.category === category && q.isActive)
}

// Helper function to get a random question from a category
export function getRandomQuestion(category?: string): Question {
  const pool = category ? getQuestionsByCategory(category) : questions.filter((q) => q.isActive)
  return pool[Math.floor(Math.random() * pool.length)]
}

// Helper function to get next question in sequence
export function getNextQuestion(currentQuestionId: string, category?: string): Question | null {
  const pool = category ? getQuestionsByCategory(category) : questions.filter((q) => q.isActive)
  const currentIndex = pool.findIndex((q) => q.id === currentQuestionId)

  if (currentIndex === -1 || currentIndex === pool.length - 1) {
    return null // No next question
  }

  return pool[currentIndex + 1]
}

// Get all unique categories
export function getCategories(): string[] {
  return Array.from(new Set(questions.map((q) => q.category)))
}
