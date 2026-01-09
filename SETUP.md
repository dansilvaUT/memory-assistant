# Memory Assistant - Setup Guide

A memory capture application built for a hackathon using TanStack Start, React, and PostgreSQL.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v20.x or higher (currently using v20.19.5)
- **npm** v10.x or higher
- **PostgreSQL** v14 or higher (optional - currently using localStorage for testing)
- **Git**

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/dansilvaUT/memory-assistant.git
cd memory-assistant
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database (optional - currently using localStorage)
DATABASE_URL="postgresql://username@localhost:5432/memory_assistant"

# Application
NODE_ENV=development
```

### 4. Database Setup (Optional)

**Note:** The app currently uses localStorage for storage during testing. Database integration is available but optional.

If you want to use PostgreSQL:

```bash
# Create the database
createdb memory_assistant

# Run migrations
npm run db:push

# Generate Prisma client
npm run db:generate
```

### 5. Start Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:3000**

## Project Structure

```
memory-assistant/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx    # Mock authentication
│   ├── data/
│   │   └── questions.ts       # Interview questions
│   ├── lib/
│   │   ├── local-storage.ts   # LocalStorage storage (current)
│   │   ├── server-functions.ts # Server functions (Prisma - WIP)
│   │   └── prisma.ts          # Prisma client setup
│   ├── routes/
│   │   ├── __root.tsx         # Root layout
│   │   ├── index.tsx          # Landing page
│   │   ├── login.tsx          # Login page
│   │   ├── signup.tsx         # Signup page
│   │   ├── dashboard.tsx      # Dashboard with stats
│   │   ├── interview.tsx      # Interview flow
│   │   └── questions.tsx      # Browse questions
│   ├── routeTree.gen.ts       # Auto-generated routes
│   └── styles.css             # Global styles
├── .env                       # Environment variables
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript config
└── vite.config.ts             # Vite configuration
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server on port 3000

# Database (optional)
npm run db:push          # Push schema changes to database
npm run db:generate      # Generate Prisma client
npm run db:studio        # Open Prisma Studio

# Build
npm run build            # Build for production
npm start                # Start production server
```

## Key Features

### Current Implementation

✅ **Mock Authentication** - localStorage-based user sessions
✅ **Interview Flow** - One-question-at-a-time with progress tracking
✅ **localStorage Storage** - Client-side memory persistence
✅ **3 Test Questions** - Reduced from 20 for easier testing
✅ **Mobile Responsive** - Optimized for iPhone/Android
✅ **Dashboard** - View memories and session stats

### Database Schema (Optional)

The app includes a PostgreSQL schema with:
- **Users** - User accounts
- **MemorySessions** - Interview sessions
- **Memories** - Individual memory entries
- **MediaItems** - Attached photos/videos
- **AnsweredQuestions** - Tracking answered questions

## Storage Options

### Current: localStorage (For Testing)

The app currently uses `src/lib/local-storage.ts` for storage:

```typescript
import { saveMemory, getMemories, completeSession } from '../lib/local-storage'
```

**Pros:**
- Works immediately without database setup
- Great for testing and demos
- No server-side issues

**Cons:**
- Data stored in browser only
- Cleared if browser data is cleared
- Not suitable for production

### Future: PostgreSQL with Prisma

To switch to database storage, update imports:

```typescript
import { saveMemory, getMemories, completeSession } from '../lib/server-functions'
```

**Note:** There are currently some issues with Prisma in TanStack Start server functions that need to be resolved.

## Authentication

Currently using **mock authentication** stored in localStorage:

- **Login:** Any email/password combination works
- **Signup:** Creates a mock user in localStorage
- **Session:** Persisted in `localStorage` under key `memory-assistant-user`

For production, replace with a real authentication provider (e.g., Clerk, Auth0, NextAuth).

## Mobile Optimization

The app is optimized for mobile devices:

- Responsive layout with `sm:` and `md:` breakpoints
- Touch-friendly buttons with `touch-manipulation`
- Proper viewport configuration
- Mobile-first design approach

## Known Issues

1. **Prisma Server Functions** - Prisma Client has issues loading in TanStack Start server functions due to CommonJS/ESM compatibility. Currently bypassed with localStorage.

2. **Node Version Warning** - Some TanStack Start packages prefer Node v22.12.0+, but the app works fine with v20.19.5.

3. **Questions Reduced** - Only 3 questions active for testing (originally 20).

## Contributing

### Setting Up for Development

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly on both desktop and mobile
5. Commit with clear messages: `git commit -m "Add: feature description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request

### Code Style

- Use **TypeScript** for type safety
- Follow **React functional components** with hooks
- Use **Tailwind CSS** for styling
- Keep components **small and focused**
- Write **clear commit messages**

### Testing Checklist

Before submitting a PR:

- [ ] Runs without errors locally
- [ ] Works on mobile (iPhone/Android)
- [ ] All routes load correctly
- [ ] Interview flow completes successfully
- [ ] Dashboard displays saved memories
- [ ] No TypeScript errors
- [ ] Code follows existing patterns

## Tech Stack

- **Framework:** TanStack Start (React)
- **Routing:** TanStack Router
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL with Prisma ORM
- **Storage (Current):** localStorage
- **Icons:** Lucide React
- **Language:** TypeScript

## Support & Issues

If you encounter issues:

1. Check this setup guide
2. Review existing GitHub issues
3. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

## License

This is a hackathon project. Check with the repository owner for licensing details.

---

**Happy coding!** 🚀

For questions, reach out to the repository maintainers.
