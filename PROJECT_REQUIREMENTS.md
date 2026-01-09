# Memory Capture App - Project Requirements

## Project Overview
An intelligent memory capture application that guides users through a conversational interview experience to document their life stories, experiences, and precious moments. The app uses AI to provide smart suggestions and enhance written content, making memory preservation engaging and meaningful.

## Problem Statement
People want to preserve their memories and stories but often struggle with:
- Not knowing where to start or what to write
- Difficulty organizing memories chronologically
- Lack of engaging tools that make memory capture feel natural
- Missing context or details in their recollections

## Solution
A guided interview application that:
- Presents one thoughtful question at a time in a conversational flow
- Provides AI-powered suggestions for what to write
- Helps users enhance and expand their written memories
- Supports rich media (photos, audio, video) to complement text
- Organizes memories on a timeline

---

## Tech Stack

### Frontend & Backend
- **TanStack Start** - Full-stack React framework with built-in server functions
- **React** - UI components
- **TypeScript** - Type safety

### Database
- **PostgreSQL** - Relational database for structured memory storage
- **Prisma** or **Drizzle ORM** - Database toolkit and ORM

### AI Integration
- **Anthropic Claude API** - For smart suggestions and text enhancement

### Styling
- **Tailwind CSS** - Modern minimal design system
- **Framer Motion** or similar - Smooth animations for engaging UX

### Authentication
- **Clerk** or **Auth.js** or **Custom JWT** - User authentication and session management

### File Storage
- **Cloudinary** or **Uploadthing** or **AWS S3** - For photos, audio, and video uploads

---

## Core Features

### 1. User Authentication
- Sign up / Login
- User profile management
- Secure session handling

### 2. Interview Experience
- **Conversational Flow**: One question at a time
- **Question Types**:
  - Open-ended prompts ("Tell me about your childhood home")
  - Specific questions ("What was your first job?")
  - Time-based prompts ("What were you doing in 1995?")
  - Event-based ("Describe your wedding day")
- **Progress Tracking**: Show progress through interview
- **Save & Continue**: Pause and resume anytime

### 3. AI Assistant Features
- **Smart Suggestions**:
  - AI analyzes partial answers and suggests ways to expand
  - Offers relevant follow-up questions based on context
  - Suggests missing details users might want to include
- **Auto-Enhance Text**:
  - Improve grammar and readability while preserving voice
  - Expand brief notes into fuller narratives
  - Help users articulate memories more clearly

### 4. Rich Media Support
- **Text**: Primary memory content
- **Photos**: Upload and attach images
- **Audio**: Record or upload audio clips
- **Video**: Upload video memories
- Each media type stored and associated with memory entries

### 5. Timeline Organization
- Memories organized chronologically
- Visual timeline view showing life periods
- Filter by date ranges, decades, or life stages
- Tag memories with dates/periods

### 6. Memory Management
- View all captured memories
- Edit existing memories
- Delete memories
- Export memories (PDF, JSON)

---

## User Flow

### First-Time User
1. Land on homepage with compelling value proposition
2. Sign up / Create account
3. Onboarding: Brief intro to how the app works
4. Start first interview session

### Interview Session
1. Welcome screen: Choose focus (general life story, specific event, time period)
2. Question appears with clean, minimal interface
3. User begins typing answer
4. AI assistant appears with subtle suggestions
5. User can:
   - Accept/ignore suggestions
   - Ask AI to enhance their text
   - Add photos/audio/video
   - Skip question
   - Go back to previous question
6. Progress to next question
7. Session complete screen: Review and save

### Dashboard
1. Timeline view of all memories
2. Quick stats (number of memories, media items, etc.)
3. Start new interview button
4. Browse/search existing memories

---

## Database Schema

### Users
- id (UUID)
- email
- name
- created_at
- updated_at

### MemorySessions
- id (UUID)
- user_id (FK)
- title
- description
- started_at
- completed_at
- status (in_progress, completed, archived)

### Memories
- id (UUID)
- session_id (FK)
- user_id (FK)
- question_prompt
- answer_text
- enhanced_text (optional)
- date_of_memory (when the memory occurred)
- created_at
- updated_at

### MediaItems
- id (UUID)
- memory_id (FK)
- type (photo, audio, video)
- url
- file_name
- file_size
- uploaded_at

### Questions
- id (UUID)
- category
- prompt_text
- order
- is_active

---

## AI Integration Details

### Claude API Integration
- Use Anthropic Claude API (claude-3-5-sonnet or claude-3-opus)
- **Smart Suggestions Endpoint**: Analyze partial text and return suggestions
- **Text Enhancement Endpoint**: Take user's raw text and return enhanced version
- **Follow-up Questions**: Generate contextual follow-up questions

### Prompt Engineering
- System prompts that maintain user's authentic voice
- Context-aware suggestions based on previous answers
- Respectful and empathetic tone

---

## Development Phases

### Phase 1: Foundation (MVP for Hackathon)
- [ ] Set up TanStack Start project
- [ ] Configure PostgreSQL database
- [ ] Set up Prisma/Drizzle ORM
- [ ] Create database schema and migrations
- [ ] Implement basic authentication
- [ ] Build question flow UI (one question at a time)
- [ ] Text input and basic saving to database
- [ ] Timeline view of saved memories

### Phase 2: AI Integration
- [ ] Set up Anthropic Claude API
- [ ] Build AI suggestion feature
- [ ] Build text enhancement feature
- [ ] Add loading states and error handling

### Phase 3: Rich Media
- [ ] Set up file upload service (Uploadthing/Cloudinary)
- [ ] Photo upload and display
- [ ] Audio recording/upload
- [ ] Video upload
- [ ] Media gallery view

### Phase 4: Polish & Enhancement
- [ ] Refine UI/UX with animations
- [ ] Add onboarding flow
- [ ] Implement memory editing
- [ ] Add export functionality
- [ ] Performance optimization
- [ ] Mobile responsive design

---

## Success Metrics (for Hackathon Demo)
- Users can complete a full interview session
- AI suggestions appear and are helpful
- Memories are saved and viewable on timeline
- At least one type of media upload works
- Clean, engaging UI that demonstrates the concept

---

## Technical Considerations

### Performance
- Lazy load media items
- Optimize AI API calls (debounce suggestions)
- Cache frequently accessed data

### Security
- Secure authentication
- Validate file uploads (type, size)
- Sanitize user input
- Protect API routes

### Scalability (Future)
- PostgreSQL can handle growth
- CDN for media files
- Rate limiting on AI endpoints

---

## Nice-to-Have Features (Post-Hackathon)
- Share memories with family members
- Collaborative memory books
- Voice-to-text for audio memories
- AI-generated memory prompts based on user's history
- Print/physical book creation
- Social features (commenting, reactions)

---

## Design Inspiration
- Modern minimal aesthetic
- Generous white space
- Smooth transitions between questions
- Subtle AI assistant presence (not intrusive)
- Clean typography
- Calming color palette (blues, greens, soft neutrals)

---

## Project Name Ideas
- MemoryThread
- Recall
- StoryKeeper
- Chronicle
- Memoir
- LifeLines
- Remembrance
- Timeless

---

**Last Updated**: January 9, 2026
**Team**: [Your Team Name]
**Hackathon**: [Hackathon Name]
