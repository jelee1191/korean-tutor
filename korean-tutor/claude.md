# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Korean Tutor is a vocabulary learning web app built with Next.js that uses spaced repetition (SRS) to help users learn Korean vocabulary. The app features chapter-based learning (20 chapters, 50 words each = 1,000 total words), flashcard practice, and progress tracking.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm lint
```

## Architecture

### Data Layer

**Vocabulary Organization** (`data/vocabulary.ts`):
- Chapter-based structure: 20 chapters × 50 words = 1,000 total words
- Each `Word` has: `id`, `korean`, `english`, `chapter` (1-20), `category`, optional `notes`
- Export functions: `getWordsByChapter()`, `getWordById()`, `getAllCategories()`, `getChapterInfo()`
- Chapters 1-4 complete (200 words), Chapters 5-20 planned

**Progress Storage** (dual system):
- **localStorage** (`lib/storage.ts`): Default for unauthenticated users, client-side only
- **Supabase** (`lib/supabaseStorage.ts`): For authenticated users, server-synced
- Hook automatically migrates localStorage → Supabase on first login
- Progress includes: `wordId`, SRS `level` (0-5), `nextReview` date, `timesCorrect`, `timesIncorrect`

### State Management

**useProgress Hook** (`lib/useProgress.ts`):
- Central hook for all progress operations
- Auto-detects auth state and switches between localStorage/Supabase
- Key methods:
  - `recordAnswer(wordId, isCorrect)`: Updates SRS level and schedules next review
  - `getWordProgress(wordId)`: Gets progress for specific word
  - `getDueWords()`: Returns words due for review today
  - `getStats()`: Returns aggregate statistics (total, mastered, learning, accuracy, etc.)
  - `resetProgress()`: Clears all progress
- Must wait for `isLoaded` before rendering progress-dependent UI

**Authentication** (`lib/AuthContext.tsx`):
- React Context wrapping Supabase auth
- Provides `user` and `signOut()` globally
- Used by `useProgress` to determine storage strategy

### Spaced Repetition System

**SRS Levels** (defined in `lib/storage.ts`):
- Level 0: Review immediately (0 days)
- Level 1: Review in 1 day
- Level 2: Review in 3 days
- Level 3: Review in 1 week
- Level 4: Review in 2 weeks
- Level 5: Review in 1 month (mastered)

**Logic**:
- Correct answer: level + 1 (max 5)
- Incorrect answer: level - 1 (min 0)
- `nextReview` date calculated from new level

### Component Structure

**Page Routes**:
- `/` (`app/page.tsx`): Dashboard showing stats and navigation
- `/practice` (`app/practice/page.tsx`): Flashcard practice session
- `/words` (`app/words/page.tsx`): Vocabulary browser with filters

**Components**:
- `Flashcard.tsx`: Card component for practice (no flip animations)
  - Uses `flippedWordId` state pattern to prevent English flash on word changes
  - Integrated Web Speech API for free audio pronunciation
- `AuthModal.tsx`: Login/signup modal (Supabase auth)

### Database Schema

**Supabase Table** (`supabase-schema.sql`):
```sql
user_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  word_id TEXT,
  level INTEGER DEFAULT 0,
  next_review TIMESTAMPTZ,
  times_correct INTEGER DEFAULT 0,
  times_incorrect INTEGER DEFAULT 0,
  UNIQUE(user_id, word_id)
)
```
- Row-Level Security (RLS) enabled - users only see their own progress
- Indexes on `user_id` and `(user_id, next_review)` for performance
- Auto-updating `updated_at` timestamp via trigger

## Key Implementation Patterns

### Adding New Vocabulary

When adding words to `data/vocabulary.ts`:
1. Follow chapter-based ID format: `ch{N}-{XXX}` (e.g., `ch5-001`)
2. Ensure chapter numbers 1-20
3. Maintain 50 words per chapter
4. Include Korean, English, chapter, and category
5. Place chapter data BEFORE the final export functions

### Client-Side Rendering Requirements

All pages using `useProgress` or auth must be client components (`'use client'` directive) because:
- localStorage only available in browser
- Supabase auth requires client context
- Next.js App Router defaults to Server Components

### Progress Tracking Pattern

Always use this pattern in components:
```typescript
const { getStats, isLoaded } = useProgress()

if (!isLoaded) {
  return <Loading />
}

const stats = getStats()
// Use stats...
```

Never access progress before `isLoaded` is true to avoid hydration mismatches.

### Flashcard State Management Pattern

**IMPORTANT**: To prevent visual glitches when changing words, use the `flippedWordId` pattern:
```typescript
const [flippedWordId, setFlippedWordId] = useState<string | null>(null)
const isFlipped = flippedWordId === word.id
```

This ensures:
- English translation only shows when explicitly flipped
- No flash of next word's translation when advancing
- Each word starts unflipped by default

### Audio Implementation

**Web Speech API** (`lib/audio.ts`):
- FREE browser-built-in text-to-speech
- `speakKorean(text, rate)`: Play Korean pronunciation
- `isSpeechAvailable()`: Check browser support
- Quality varies by browser but adequate for learning
- No API costs or external dependencies

## Current State

**Completed**: 4/20 chapters (200 words)
- Chapter 1: Basic Greetings & Introductions
- Chapter 2: Numbers & Counting
- Chapter 3: Family & Relationships
- Chapter 4: Daily Routines & Time

**Remaining**: Chapters 5-20 need vocabulary generation (800 words)

## Pedagogical Approach (Research-Backed)

The app implements evidence-based language learning methods:

### Current Features ✅
1. **Spaced Repetition System**: Scientifically proven to increase retention by 25%+
2. **Active Recall**: Testing (flashcards) proven more effective than passive review (80% vs 30% retention)
3. **Audio Pronunciation**: Multimodal learning improves memory formation

### Planned Features 📋
1. **Example Sentences**: Context-based learning (95-98% comprehensibility principle)
2. **Bidirectional Practice**: English→Korean for production, not just recognition
3. **Typing Practice**: Free-form answers with fuzzy matching (`lib/stringMatching.ts`)
4. **Gamification**: Daily streaks, XP/levels, achievement badges
5. **Mini Grammar Lessons**: Integrated with vocabulary chapters
6. **Pattern Recognition**: Teach common sentence structures and particles

### Cost Considerations
- **Free tier**: Web Speech API audio, fuzzy string matching, all current features
- **Premium features** (future):
  - Google Cloud TTS for native-quality audio: $0.50 one-time for all 1,000 words
  - LLM validation (Gemini Flash): ~$1-5/month for 100 users
  - AI grammar explanations: ~$10-20/month

## Utility Libraries

**Audio** (`lib/audio.ts`):
- `speakKorean(text, rate)`: Browser TTS for Korean pronunciation
- `loadVoices()`: Initialize voice options
- `isSpeechAvailable()`: Feature detection

**String Matching** (`lib/stringMatching.ts`):
- `levenshteinDistance(s1, s2)`: Calculate edit distance for typo detection
- `validateAnswer(userAnswer, correctAnswer)`: Smart validation with 15% typo tolerance
- `normalizeKorean(text)`: Text normalization for comparison
- `highlightDifferences(user, correct)`: Visual feedback for errors

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL + Auth)
- **State**: React hooks (no external state library)
- **Client Storage**: localStorage (fallback)
- **Audio**: Web Speech API (browser built-in, free)
