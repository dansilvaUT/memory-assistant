# Contributing to Memory Assistant

Thank you for contributing to Memory Assistant! This guide will help you get started.

## Development Setup

See [SETUP.md](./SETUP.md) for detailed setup instructions.

## Workflow

### 1. Before Starting Work

```bash
# Pull latest changes
git pull origin main

# Create a feature branch
git checkout -b feature/your-feature-name
```

### 2. Branch Naming Convention

Use descriptive branch names with prefixes:

- `feature/` - New features
  - Example: `feature/ai-suggestions`
- `fix/` - Bug fixes
  - Example: `fix/login-redirect`
- `docs/` - Documentation updates
  - Example: `docs/setup-guide`
- `refactor/` - Code refactoring
  - Example: `refactor/auth-context`
- `style/` - UI/styling changes
  - Example: `style/mobile-layout`

### 3. Making Changes

```bash
# Make your changes
# Test thoroughly

# Stage changes
git add .

# Commit with clear message
git commit -m "Add: feature description"
```

### 4. Commit Message Guidelines

Write clear, actionable commit messages:

**Format:**
```
Action: Brief description

Optional longer description explaining what and why.
```

**Actions:**
- `Add` - New features or files
- `Fix` - Bug fixes
- `Update` - Modifications to existing features
- `Remove` - Deletions
- `Refactor` - Code restructuring
- `Docs` - Documentation changes
- `Style` - Formatting, CSS changes

**Examples:**
```
Add: localStorage storage solution for testing

Implemented client-side storage to bypass Prisma server function
issues. This allows testing the full interview flow without database
setup requirements.
```

```
Fix: authentication redirect loop on interview page

Added isLoading check to prevent redirect before auth state is loaded.
```

```
Update: mobile responsive spacing on dashboard

Improved touch targets and spacing for better mobile UX.
```

### 5. Push Changes

```bash
# Push to your branch
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to GitHub repository
2. Click "Pull requests" → "New pull request"
3. Select your branch
4. Fill out the PR template:
   - **Title:** Clear, descriptive title
   - **Description:** What, why, and how
   - **Testing:** How you tested the changes
   - **Screenshots:** If UI changes
5. Request review from team members
6. Address feedback
7. Merge when approved

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define interfaces for data structures
- Avoid `any` types when possible
- Use meaningful variable names

```typescript
// Good
interface Memory {
  id: string
  questionPrompt: string
  answerText: string
  createdAt: string
}

// Avoid
const data: any = { ... }
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use destructuring for props

```typescript
// Good
interface InterviewQuestionProps {
  question: Question
  onAnswer: (answer: string) => void
}

function InterviewQuestion({ question, onAnswer }: InterviewQuestionProps) {
  // Component logic
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Use semantic class names for custom CSS
- Keep consistent spacing (4, 6, 8, 12 pattern)

```tsx
// Good - Mobile first with responsive modifiers
<button className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700">
  Save
</button>
```

### File Organization

- Keep related files together
- Use index files for clean imports
- Name files descriptively
- Follow existing patterns

```
src/
├── routes/           # Page components
├── components/       # Reusable components
├── contexts/         # React contexts
├── lib/             # Utilities and helpers
└── data/            # Static data
```

## Testing Checklist

Before submitting a PR, ensure:

### Functionality
- [ ] Feature works as expected
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Handles edge cases
- [ ] Error states handled gracefully

### UI/UX
- [ ] Looks good on desktop (1920x1080)
- [ ] Looks good on mobile (iPhone 13, Android)
- [ ] Touch targets are large enough (44x44px minimum)
- [ ] Loading states visible
- [ ] Responsive at all breakpoints

### Code Quality
- [ ] Follows existing code patterns
- [ ] No duplicate code
- [ ] Comments added for complex logic
- [ ] Unused imports removed
- [ ] Console.logs removed

### Integration
- [ ] Works with existing features
- [ ] Doesn't break other functionality
- [ ] Database schema compatible (if applicable)
- [ ] Environment variables documented

## Common Tasks

### Adding a New Route

1. Create file in `src/routes/your-route.tsx`
2. Export route using `createFileRoute`
3. Add component
4. Test navigation

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/your-route')({
  component: YourComponent
})

function YourComponent() {
  return <div>Your content</div>
}
```

### Adding a New Question

Edit `src/data/questions.ts`:

```typescript
{
  id: 'unique-id',
  category: 'childhood|family|career|general',
  prompt: 'Your question here?',
  followUpPrompts: [
    'Follow up question 1?',
    'Follow up question 2?',
  ],
  order: 4,
  isActive: true,
  tags: ['tag1', 'tag2'],
}
```

### Modifying localStorage Structure

Update `src/lib/local-storage.ts` if changing data structure:

1. Update interfaces
2. Update save/get functions
3. Add migration logic if needed
4. Test with existing data

### Switching to Database

When ready to switch from localStorage to PostgreSQL:

1. Ensure `.env` has `DATABASE_URL`
2. Run `npm run db:push`
3. Update imports in components:
   ```typescript
   // Change from:
   import { saveMemory } from '../lib/local-storage'

   // To:
   import { saveMemory } from '../lib/server-functions'
   ```
4. Test thoroughly

## Communication

### During Development

- Post updates in team chat
- Mention what you're working on
- Ask questions early if stuck
- Coordinate to avoid conflicts

### Code Reviews

- Be respectful and constructive
- Explain your suggestions
- Focus on code, not person
- Approve when ready

## Getting Help

If you're stuck:

1. Check existing documentation
2. Search issues on GitHub
3. Ask in team chat
4. Tag maintainers in PR

## Resources

- [TanStack Start Docs](https://tanstack.com/start/latest)
- [TanStack Router Docs](https://tanstack.com/router/latest)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Happy coding!** 🚀
