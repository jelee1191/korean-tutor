/**
 * Supabase Content Layer
 *
 * Server-side functions to fetch vocabulary and grammar content from Supabase.
 * These functions are called at BUILD TIME (not runtime) for static generation.
 *
 * DO NOT use these in client components - they're async server functions.
 */

import { createClient } from '@supabase/supabase-js'
import { Word, Chapter, GrammarLesson, Exercise, MultipleChoiceExercise, FillInBlankExercise, SentenceBuildingExercise } from '@/types'

// Create a server-side Supabase client (no auth needed for public content)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================
// VOCABULARY FUNCTIONS
// ============================================

/**
 * Get all vocabulary words across all chapters
 */
export async function getAllVocabulary(): Promise<Word[]> {
  const { data, error } = await supabase
    .from('vocabulary')
    .select('*')
    .order('chapter', { ascending: true })
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching vocabulary:', error)
    throw error
  }

  return data || []
}

/**
 * Get vocabulary words for a specific chapter
 */
export async function getVocabularyByChapter(chapter: number): Promise<Word[]> {
  const { data, error } = await supabase
    .from('vocabulary')
    .select('*')
    .eq('chapter', chapter)
    .order('id', { ascending: true })

  if (error) {
    console.error(`Error fetching vocabulary for chapter ${chapter}:`, error)
    throw error
  }

  return data || []
}

/**
 * Get a single vocabulary word by ID
 */
export async function getWordById(id: string): Promise<Word | null> {
  const { data, error } = await supabase
    .from('vocabulary')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null
    }
    console.error(`Error fetching word ${id}:`, error)
    throw error
  }

  return data
}

/**
 * Get all unique categories from vocabulary
 */
export async function getAllCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('vocabulary')
    .select('category')

  if (error) {
    console.error('Error fetching categories:', error)
    throw error
  }

  const categories = [...new Set(data?.map(d => d.category) || [])]
  return categories.sort()
}

// ============================================
// CHAPTER FUNCTIONS
// ============================================

/**
 * Get all chapters
 */
export async function getAllChapters(): Promise<Chapter[]> {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .order('number', { ascending: true })

  if (error) {
    console.error('Error fetching chapters:', error)
    throw error
  }

  return data?.map(ch => ({
    number: ch.number,
    title: ch.title,
    description: ch.description,
    wordCount: ch.word_count
  })) || []
}

/**
 * Get chapter info by chapter number
 */
export async function getChapterInfo(chapterNumber: number): Promise<Chapter | null> {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('number', chapterNumber)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    console.error(`Error fetching chapter ${chapterNumber}:`, error)
    throw error
  }

  return {
    number: data.number,
    title: data.title,
    description: data.description,
    wordCount: data.word_count
  }
}

// ============================================
// GRAMMAR LESSON FUNCTIONS
// ============================================

/**
 * Map database row to GrammarLesson type
 */
function mapDbLessonToType(row: any): GrammarLesson {
  return {
    id: row.id,
    title: row.title,
    titleKorean: row.title_korean,
    chapter: row.chapter,
    order: row.order,
    description: row.description,
    explanation: row.explanation,
    examples: row.examples || [],
    relatedWordIds: row.related_word_ids || [],
    prerequisites: row.prerequisites || []
  }
}

/**
 * Get all grammar lessons across all chapters
 */
export async function getAllGrammarLessons(): Promise<GrammarLesson[]> {
  const { data, error } = await supabase
    .from('grammar_lessons')
    .select('*')
    .order('chapter', { ascending: true })
    .order('order', { ascending: true })

  if (error) {
    console.error('Error fetching grammar lessons:', error)
    throw error
  }

  return data?.map(mapDbLessonToType) || []
}

/**
 * Get grammar lessons for a specific chapter
 */
export async function getLessonsByChapter(chapter: number): Promise<GrammarLesson[]> {
  const { data, error } = await supabase
    .from('grammar_lessons')
    .select('*')
    .eq('chapter', chapter)
    .order('order', { ascending: true })

  if (error) {
    console.error(`Error fetching lessons for chapter ${chapter}:`, error)
    throw error
  }

  return data?.map(mapDbLessonToType) || []
}

/**
 * Get a single grammar lesson by ID
 */
export async function getLessonById(id: string): Promise<GrammarLesson | null> {
  const { data, error } = await supabase
    .from('grammar_lessons')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    console.error(`Error fetching lesson ${id}:`, error)
    throw error
  }

  return mapDbLessonToType(data)
}

// ============================================
// GRAMMAR EXERCISE FUNCTIONS
// ============================================

/**
 * Map database row to Exercise type (handles different exercise types)
 */
function mapDbExerciseToType(row: any): Exercise {
  const base = {
    id: row.id,
    lessonId: row.lesson_id,
    type: row.type,
    difficulty: row.difficulty,
    instruction: row.instruction,
    hint: row.hint
  }

  // Merge type-specific data from JSONB column
  return { ...base, ...row.data } as Exercise
}

/**
 * Get all exercises for a specific lesson
 */
export async function getExercisesByLesson(lessonId: string): Promise<Exercise[]> {
  const { data, error } = await supabase
    .from('grammar_exercises')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('id', { ascending: true })

  if (error) {
    console.error(`Error fetching exercises for lesson ${lessonId}:`, error)
    throw error
  }

  return data?.map(mapDbExerciseToType) || []
}

/**
 * Get a single exercise by ID
 */
export async function getExerciseById(id: string): Promise<Exercise | null> {
  const { data, error } = await supabase
    .from('grammar_exercises')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    console.error(`Error fetching exercise ${id}:`, error)
    throw error
  }

  return mapDbExerciseToType(data)
}

/**
 * Get all exercises across all lessons
 */
export async function getAllExercises(): Promise<Exercise[]> {
  const { data, error } = await supabase
    .from('grammar_exercises')
    .select('*')
    .order('lesson_id', { ascending: true })
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching all exercises:', error)
    throw error
  }

  return data?.map(mapDbExerciseToType) || []
}
