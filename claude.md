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

**Vocabulary Data** (`data/vocabulary.ts`):
- Chapter-based structure: 20 chapters × 50 words = 1,000 total words
- Each `Word` has: `id`, `korean`, `english`, `chapter` (1-20), `category`, optional `notes`
- Export functions: `getWordsByChapter()`, `getWordById()`, `getAllCategories()`, `getChapterInfo()`
- Chapters 1-4 complete (200 words), Chapters 5-20 planned

**Grammar Data** (`data/grammar.ts`):
- Lesson structure: `GrammarLesson` with explanation, examples, sentence breakdowns
- Exercise types: `MultipleChoiceExercise`, `FillInBlankExercise`, `SentenceBuildingExercise`
- Export functions: `getLessonsByChapter()`, `getLessonById()`, `getExercisesByLesson()`, `getExerciseById()`
- 6 lessons for Chapters 1-2 complete with 20+ exercises

**Progress Storage** (dual system):
- **Vocabulary Progress**:
  - `lib/storage.ts`: localStorage for unauthenticated users
  - `lib/supabaseStorage.ts`: Supabase for authenticated users
  - Progress: `wordId`, SRS `level` (0-5), `nextReview`, `timesCorrect`, `timesIncorrect`
- **Grammar Progress**:
  - `lib/grammarStorage.ts`: localStorage for grammar exercises
  - Same SRS intervals as vocabulary (0, 1, 3, 7, 14, 30 days)
  - Progress: `lessonId`, `exerciseId`, `level`, `nextReview`, `completed`
  - TODO: Supabase integration for authenticated users

### State Management

**useProgress Hook** (`lib/useProgress.ts`):
- Central hook for vocabulary progress operations
- Auto-detects auth state and switches between localStorage/Supabase
- Key methods:
  - `recordAnswer(wordId, isCorrect)`: Updates SRS level and schedules next review
  - `getWordProgress(wordId)`: Gets progress for specific word
  - `getDueWords()`: Returns words due for review today
  - `getStats()`: Returns aggregate statistics (total, mastered, learning, accuracy, etc.)
  - `resetProgress()`: Clears all progress
- Must wait for `isLoaded` before rendering progress-dependent UI

**useGrammarProgress Hook** (`lib/useGrammarProgress.ts`):
- Central hook for grammar progress operations
- Currently localStorage only (Supabase integration TODO)
- Key methods:
  - `recordExerciseAnswer(exerciseId, lessonId, isCorrect)`: Updates exercise SRS level
  - `markLessonComplete(lessonId)`: Marks a lesson as read
  - `getExerciseProgress(exerciseId, lessonId)`: Gets progress for specific exercise
  - `isLessonCompleted(lessonId)`: Checks if lesson has been completed
  - `getDueExercises()`: Returns exercises due for review
  - `getGrammarStats()`: Returns stats (exercisesAttempted, mastered, lessonsCompleted, accuracy)
- Must wait for `isLoaded` before rendering

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
- `/grammar` (`app/grammar/page.tsx`): Grammar lessons hub
- `/grammar/[lessonId]` (`app/grammar/[lessonId]/page.tsx`): Individual lesson view
- `/grammar/[lessonId]/practice` (`app/grammar/[lessonId]/practice/page.tsx`): Exercise practice session
- `/grammar/review` (`app/grammar/review/page.tsx`): SRS review for due grammar exercises

**Vocabulary Components**:
- `Flashcard.tsx`: Card component for practice (no flip animations)
  - Uses `flippedWordId` state pattern to prevent English flash on word changes
  - Integrated Web Speech API for free audio pronunciation
- `AuthModal.tsx`: Login/signup modal (Supabase auth)

**Grammar Components** (`components/grammar/`):
- `LessonView.tsx`: Full lesson display with markdown explanation, examples, and sentence breakdowns
- `ExerciseContainer.tsx`: Exercise session manager with progress tracking
- `exercises/MultipleChoice.tsx`: 4-option multiple choice questions
- `exercises/FillInBlank.tsx`: Fill-in-the-blank with Korean input and fuzzy matching
- `exercises/SentenceBuilder.tsx`: Sentence construction with shuffled words and distractors

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

### Grammar Exercise Reset Pattern

**IMPORTANT**: All exercise components must reset state when the exercise changes:
```typescript
useEffect(() => {
  setSelectedIndex(null)  // or appropriate state reset
  setHasAnswered(false)
  setIsCorrect(false)
}, [exercise.id])
```

This prevents:
- Previous answers carrying over to new questions
- UI state persisting across exercise transitions
- Incorrect validation of new exercises

### Sentence Builder Shuffle Pattern

**IMPORTANT**: Shuffle word order once per exercise using `useMemo`:
```typescript
const shuffledIndices = useMemo(() => {
  const indices = Array.from({ length: exercise.words.length }, (_, i) => i)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]]
  }
  return indices
}, [exercise.id])
```

This ensures:
- Words appear in random order (not sorted)
- Shuffle happens once per exercise (not on every render)
- Users must think about word order, not just select in sequence

### Audio Implementation

**Web Speech API** (`lib/audio.ts`):
- FREE browser-built-in text-to-speech
- `speakKorean(text, rate)`: Play Korean pronunciation
- `isSpeechAvailable()`: Check browser support
- Quality varies by browser but adequate for learning
- No API costs or external dependencies

## Current State

**Vocabulary**: 4/20 chapters (200 words)
- Chapter 1: Basic Greetings & Introductions
- Chapter 2: Numbers & Counting
- Chapter 3: Family & Relationships
- Chapter 4: Daily Routines & Time
- **Remaining**: Chapters 5-20 need vocabulary generation (800 words)

**Grammar Lessons**: 6 lessons (Chapters 1-2) ✅
- Chapter 1: Topic Particles (은/는), Copula (이다), Question Words
- Chapter 2: Native vs Sino-Korean Numbers, Counter Words
- **Features**: Full SRS tracking, 3 exercise types, mobile-optimized UI
- **Remaining**: Chapters 3-20 need grammar lessons

## Pedagogical Approach (Research-Backed)

The app implements evidence-based language learning methods:

### Current Features ✅
1. **Spaced Repetition System**: Full SRS for both vocabulary and grammar exercises
2. **Active Recall**: Flashcards for vocabulary, interactive exercises for grammar
3. **Audio Pronunciation**: Web Speech API for Korean text-to-speech
4. **Grammar Lessons**: 6 lessons with explanations, examples, and sentence breakdowns
5. **Three Exercise Types**:
   - Multiple choice with instant feedback
   - Fill-in-the-blank with Korean input and fuzzy matching
   - Sentence building with shuffled words and distractors
6. **Mobile-Optimized**: Responsive UI designed for iPhone (tested on iPhone 17 Pro)
7. **Manual Progression**: "Next" button advancement instead of auto-advance

### Planned Features 📋
1. **Supabase Integration for Grammar**: Sync grammar progress across devices
2. **More Grammar Lessons**: Add lessons for Chapters 3-20
3. **More Vocabulary**: Complete Chapters 5-20 (800 more words)
4. **Bidirectional Practice**: English→Korean for production, not just recognition
5. **Typing Practice**: Free-form Korean answers with fuzzy matching
6. **Gamification**: Daily streaks, XP/levels, achievement badges
7. **Pattern Recognition**: Common sentence structures and particle usage

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

## Deployment

### Repository Structure
- **GitHub Repository**: https://github.com/jelee1191/korean-tutor
- **Project Root**: All files are at the repository root level (not in a subdirectory)
- **Deployment Platform**: Vercel

### Important Notes
- The git repository is located at `/Users/jonathanlee/Documents/Projects/Korean-tutor/`
- All development work should be done from this root directory
- Files like `package.json`, `next.config.ts`, and source code are at the root level
- Previous nested `korean-tutor/` subdirectory has been removed to fix Vercel build issues

### Recent Changes (2026-01-02)

**Grammar Lesson System Implemented** (Latest):
- Added comprehensive grammar education feature with full SRS
- Created 6 grammar lessons for Chapters 1-2 with 20+ exercises
- Implemented 3 exercise types:
  - Multiple choice: 4-option questions with explanations
  - Fill-in-blank: Korean input with fuzzy matching
  - Sentence building: Word arrangement with shuffled order and distractor words
- Mobile-optimized UI for iPhone 17 Pro (compact spacing, responsive text sizes)
- Manual "Next" button advancement (no auto-advance)
- Grammar hub, lesson pages, practice sessions, and SRS review routes

**Files Created:**
- `data/grammar.ts` - Grammar lessons and exercises data
- `lib/grammarStorage.ts` - localStorage for grammar progress
- `lib/useGrammarProgress.ts` - React hook for grammar progress
- `components/grammar/LessonView.tsx` - Lesson display component
- `components/grammar/ExerciseContainer.tsx` - Exercise session manager
- `components/grammar/exercises/MultipleChoice.tsx`
- `components/grammar/exercises/FillInBlank.tsx`
- `components/grammar/exercises/SentenceBuilder.tsx`
- `app/grammar/page.tsx` - Grammar hub
- `app/grammar/[lessonId]/page.tsx` - Individual lesson page
- `app/grammar/[lessonId]/practice/page.tsx` - Exercise practice
- `app/grammar/review/page.tsx` - SRS review session

**Files Modified:**
- `types/index.ts` - Added grammar lesson and exercise interfaces
- `app/layout.tsx` - Added "Grammar" navigation link, removed subtitle
- `app/page.tsx` - Added grammar stats card, removed subtitle

**Fixed GitHub Repository Structure** (Earlier):
- Resolved duplicate file structure issue
- Added missing files for Vercel build
- Removed nested subdirectory

### Next Steps
- Add Supabase integration for grammar progress (sync across devices)
- Create grammar lessons for Chapters 3-20 (14 more chapters)
- Add vocabulary for Chapters 5-20 (800 more words)
- Consider chapter-integrated learning flow (/learn routes)
