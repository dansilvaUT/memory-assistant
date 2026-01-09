# Memory Assistant

An intelligent memory capture application that guides users through a conversational interview experience to document their life stories, experiences, and precious moments.

## Features

- **Conversational Interview Flow**: One question at a time approach for natural memory capture
- **AI-Powered Assistance**: Smart suggestions and text enhancement using Anthropic Claude
- **Rich Media Support**: Photos, audio, and video uploads
- **Timeline Organization**: Memories organized chronologically
- **Modern UI**: Clean, minimal design with smooth animations

## Tech Stack

- **Frontend & Backend**: TanStack Start (Full-stack React framework)
- **Database**: PostgreSQL
- **AI**: Anthropic Claude API
- **Authentication**: TBD (Clerk/Auth.js/Custom JWT)
- **File Storage**: TBD (Cloudinary/Uploadthing/AWS S3)
- **Styling**: Tailwind CSS (already configured)

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

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **PostgreSQL**: v14 or higher
- **Git**: For version control

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-github-repo-url>
cd memory-assistant
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/memory_assistant"

# Anthropic Claude API
ANTHROPIC_API_KEY="your-api-key-here"

# Other environment variables will be added as needed
```

**Important**: Never commit the `.env` file to the repository. It's already included in `.gitignore`.

### 4. Database Setup

```bash
# Create the database
createdb memory_assistant

# Run migrations (once we set up Prisma/Drizzle)
# npm run db:migrate
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

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
