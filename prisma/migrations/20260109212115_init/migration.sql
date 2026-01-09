-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memory_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "category" TEXT,
    "currentQuestionId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'in_progress',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "memory_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memories" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT,
    "questionId" TEXT NOT NULL,
    "questionPrompt" TEXT NOT NULL,
    "answerText" TEXT NOT NULL,
    "enhancedText" TEXT,
    "dateOfMemory" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "memories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_items" (
    "id" TEXT NOT NULL,
    "memoryId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER,
    "mimeType" TEXT,
    "caption" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answered_questions" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answered_questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "memory_sessions_userId_idx" ON "memory_sessions"("userId");

-- CreateIndex
CREATE INDEX "memory_sessions_status_idx" ON "memory_sessions"("status");

-- CreateIndex
CREATE INDEX "memories_userId_idx" ON "memories"("userId");

-- CreateIndex
CREATE INDEX "memories_sessionId_idx" ON "memories"("sessionId");

-- CreateIndex
CREATE INDEX "memories_dateOfMemory_idx" ON "memories"("dateOfMemory");

-- CreateIndex
CREATE INDEX "media_items_memoryId_idx" ON "media_items"("memoryId");

-- CreateIndex
CREATE INDEX "media_items_type_idx" ON "media_items"("type");

-- CreateIndex
CREATE INDEX "answered_questions_sessionId_idx" ON "answered_questions"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "answered_questions_sessionId_questionId_key" ON "answered_questions"("sessionId", "questionId");

-- AddForeignKey
ALTER TABLE "memory_sessions" ADD CONSTRAINT "memory_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memories" ADD CONSTRAINT "memories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memories" ADD CONSTRAINT "memories_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "memory_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_items" ADD CONSTRAINT "media_items_memoryId_fkey" FOREIGN KEY ("memoryId") REFERENCES "memories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answered_questions" ADD CONSTRAINT "answered_questions_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "memory_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
