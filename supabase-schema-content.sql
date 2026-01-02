-- ============================================
-- CONTENT TABLES FOR KOREAN TUTOR
-- ============================================
-- This schema stores vocabulary and grammar content.
-- Content is public read-only data (not user-specific).
-- Fetched at build time for static generation.

-- ============================================
-- CHAPTERS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.chapters (
  number INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  word_count INTEGER NOT NULL DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- VOCABULARY TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.vocabulary (
  id TEXT PRIMARY KEY,                    -- Format: 'ch1-001', 'ch2-015'
  korean TEXT NOT NULL,                   -- Korean word/phrase
  english TEXT NOT NULL,                  -- English translation
  chapter INTEGER NOT NULL REFERENCES public.chapters(number),
  category TEXT NOT NULL,                 -- e.g., 'greeting', 'verb', 'noun'
  notes TEXT,                             -- Optional usage notes
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_vocabulary_chapter ON public.vocabulary(chapter);
CREATE INDEX IF NOT EXISTS idx_vocabulary_category ON public.vocabulary(category);

-- ============================================
-- GRAMMAR LESSONS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.grammar_lessons (
  id TEXT PRIMARY KEY,                    -- Format: 'gram-01-01', 'gram-02-03'
  title TEXT NOT NULL,                    -- e.g., "Topic Particles (은/는)"
  title_korean TEXT NOT NULL,             -- e.g., "주제 조사"
  chapter INTEGER NOT NULL REFERENCES public.chapters(number),
  "order" INTEGER NOT NULL,               -- Order within chapter (1, 2, 3...)
  description TEXT NOT NULL,              -- Brief summary
  explanation TEXT NOT NULL,              -- Full markdown explanation
  examples JSONB NOT NULL DEFAULT '[]',   -- Array of GrammarExample objects
  related_word_ids TEXT[] DEFAULT '{}',   -- Links to vocabulary (e.g., ['ch1-014'])
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  prerequisites TEXT[] DEFAULT '{}',      -- IDs of prerequisite lessons
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_grammar_lessons_chapter ON public.grammar_lessons(chapter);
CREATE INDEX IF NOT EXISTS idx_grammar_lessons_order ON public.grammar_lessons(chapter, "order");

-- ============================================
-- GRAMMAR EXERCISES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.grammar_exercises (
  id TEXT PRIMARY KEY,                    -- Format: 'ex-gram-01-01-001'
  lesson_id TEXT NOT NULL REFERENCES public.grammar_lessons(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('multiple_choice', 'fill_in_blank', 'sentence_building')),
  difficulty INTEGER NOT NULL CHECK (difficulty BETWEEN 1 AND 3),
  instruction TEXT NOT NULL,
  hint TEXT,
  data JSONB NOT NULL,                    -- Type-specific fields (question, options, etc.)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_grammar_exercises_lesson ON public.grammar_exercises(lesson_id);
CREATE INDEX IF NOT EXISTS idx_grammar_exercises_type ON public.grammar_exercises(type);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Content is public read-only data, so we disable RLS
-- (much simpler than creating public read policies)

ALTER TABLE public.chapters DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.grammar_lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.grammar_exercises DISABLE ROW LEVEL SECURITY;

-- ============================================
-- UPDATE TRIGGERS
-- ============================================
-- Automatically update the updated_at timestamp

CREATE TRIGGER update_chapters_updated_at
  BEFORE UPDATE ON public.chapters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vocabulary_updated_at
  BEFORE UPDATE ON public.vocabulary
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grammar_lessons_updated_at
  BEFORE UPDATE ON public.grammar_lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grammar_exercises_updated_at
  BEFORE UPDATE ON public.grammar_exercises
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- JSONB STRUCTURE EXAMPLES
-- ============================================

-- examples JSONB in grammar_lessons:
-- [
--   {
--     "korean": "저는 학생입니다",
--     "english": "I am a student",
--     "breakdown": [
--       { "korean": "저", "english": "I (humble)", "role": "subject" },
--       { "korean": "는", "english": "topic marker", "role": "particle" }
--     ]
--   }
-- ]

-- data JSONB for multiple_choice exercise:
-- {
--   "question": "저___ 미국 사람입니다.",
--   "options": ["은", "는", "이", "가"],
--   "correctIndex": 1,
--   "explanation": "저 ends with a vowel..."
-- }

-- data JSONB for fill_in_blank exercise:
-- {
--   "sentence": "이것{blank} 책입니다.",
--   "correctAnswer": "은",
--   "acceptableAnswers": [],
--   "explanation": "이것 ends with a consonant..."
-- }

-- data JSONB for sentence_building exercise:
-- {
--   "words": ["저", "는", "학생", "입니다"],
--   "correctOrder": [0, 1, 2, 3],
--   "englishPrompt": "I am a student",
--   "explanation": "Pattern: Topic + particle + noun + copula"
-- }
