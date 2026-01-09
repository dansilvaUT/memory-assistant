# Memory Assistant

An intelligent memory capture application that guides users through a conversational interview experience to document their life stories, experiences, and precious moments.

**🚀 Currently in active development for a hackathon!**

## Current Features

✅ **Conversational Interview Flow** - One question at a time for natural memory capture
✅ **Progress Tracking** - Visual progress bar and question counter
✅ **localStorage Storage** - Client-side persistence (temporary for testing)
✅ **Mock Authentication** - Simple login/signup for demos
✅ **Mobile Responsive** - Optimized for iPhone and Android devices
✅ **Dashboard** - View saved memories and session statistics
✅ **Clean UI** - FamilySearch-inspired design with Tailwind CSS

## Planned Features

⏳ **AI-Powered Assistance** - Smart suggestions using Anthropic Claude (coming soon)
⏳ **Rich Media Support** - Photos, audio, and video uploads
⏳ **PostgreSQL Database** - Persistent server-side storage
⏳ **Timeline Organization** - Chronological memory viewing
⏳ **Real Authentication** - Secure user accounts

## Tech Stack

- **Framework**: TanStack Start (Full-stack React)
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL with Prisma ORM (configured, using localStorage for now)
- **Storage**: localStorage (temporary testing solution)
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
memory-assistant/
├── src/
│   ├── routes/          # Application routes
│   └── components/      # React components
├── public/              # Static assets
├── PROJECT_REQUIREMENTS.md  # Detailed project requirements
└── package.json
```

## Quick Start

### Prerequisites

- **Node.js** v20.x or higher
- **npm** v10.x or higher
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/dansilvaUT/memory-assistant.git
cd memory-assistant

# Install dependencies
npm install

# Create environment file (optional - uses localStorage by default)
cp .env.example .env

# Start the development server
npm run dev
```

The app will be available at **http://localhost:3000** 🎉

### That's it!

The app uses localStorage for storage, so no database setup is required for testing. Just start coding!

**For detailed setup instructions**, see [SETUP.md](./SETUP.md)

## Development Workflow

### For Contributors

1. **Pull latest changes** before starting work:
   ```bash
   git pull origin main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and commit regularly:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

4. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub for review

### Branch Naming Convention

- `feature/` - New features (e.g., `feature/ai-suggestions`)
- `fix/` - Bug fixes (e.g., `fix/login-error`)
- `docs/` - Documentation updates
- `refactor/` - Code refactoring

### Commit Message Guidelines

Write clear, concise commit messages:
- Use present tense ("Add feature" not "Added feature")
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Keep first line under 50 characters
- Add detailed description if needed

Examples:
```
Add AI suggestion component
Fix timeline rendering issue
Update database schema for media items
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests with Vitest

## Project Documentation

See [PROJECT_REQUIREMENTS.md](./PROJECT_REQUIREMENTS.md) for:
- Detailed project overview
- Complete feature list
- Database schema
- Development phases
- Design guidelines

## Getting API Keys

### Anthropic Claude API
1. Sign up at [https://console.anthropic.com](https://console.anthropic.com)
2. Navigate to API Keys section
3. Create a new API key
4. Add to your `.env` file

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Issues
- Ensure PostgreSQL is running: `pg_isready`
- Check your DATABASE_URL in `.env`
- Verify database exists: `psql -l`

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Contributing

Both contributors should:
1. Communicate about who's working on what to avoid conflicts
2. Pull latest changes frequently
3. Create feature branches for all work
4. Write clear commit messages
5. Test changes before pushing
6. Review each other's pull requests

## Team

- Contributor 1: [Name]
- Contributor 2: [Name]

## Hackathon Timeline

- **Kickoff**: [Date]
- **Submission**: [Date]
- **Demo**: [Date]

## TanStack Start Resources

- [TanStack Router Documentation](https://tanstack.com/router)
- [TanStack Query Documentation](https://tanstack.com/query)
- [TanStack Store Documentation](https://tanstack.com/store)

## License

This project is created for [Hackathon Name] hackathon.

---

Built with TanStack Start 🚀
