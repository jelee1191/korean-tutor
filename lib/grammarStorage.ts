import { GrammarProgress } from '@/types'

const STORAGE_KEY = 'korean-tutor-grammar-progress'

// Helper to safely access localStorage (returns null on server or in SSR)
const getLocalStorage = () => {
  if (typeof window === 'undefined') return null
  return window.localStorage
}

export const loadGrammarProgress = (): Record<string, GrammarProgress> => {
  const storage = getLocalStorage()
  if (!storage) return {}

  try {
    const data = storage.getItem(STORAGE_KEY)
    if (!data) return {}

    const parsed = JSON.parse(data)

    // Convert date strings back to Date objects
    Object.keys(parsed).forEach(key => {
      if (parsed[key].nextReview) {
        parsed[key].nextReview = new Date(parsed[key].nextReview)
      }
      if (parsed[key].lastAttemptDate) {
        parsed[key].lastAttemptDate = new Date(parsed[key].lastAttemptDate)
      }
    })

    return parsed
  } catch (error) {
    console.error('Failed to load grammar progress:', error)
    return {}
  }
}

export const saveGrammarProgress = (progress: Record<string, GrammarProgress>): void => {
  const storage = getLocalStorage()
  if (!storage) return

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error('Failed to save grammar progress:', error)
  }
}

export const updateExerciseProgress = (
  exerciseId: string,
  lessonId: string,
  isCorrect: boolean,
  currentProgress?: GrammarProgress
): GrammarProgress => {
  const now = new Date()

  if (!currentProgress) {
    // New exercise
    return {
      lessonId,
      exerciseId,
      level: isCorrect ? 1 : 0,
      nextReview: getNextReviewDate(isCorrect ? 1 : 0),
      timesCorrect: isCorrect ? 1 : 0,
      timesIncorrect: isCorrect ? 0 : 1,
      completed: false,
      lastAttemptDate: now
    }
  }

  // Update existing progress
  const newLevel = isCorrect
    ? Math.min(currentProgress.level + 1, 5)
    : Math.max(currentProgress.level - 1, 0)

  return {
    ...currentProgress,
    level: newLevel,
    nextReview: getNextReviewDate(newLevel),
    timesCorrect: currentProgress.timesCorrect + (isCorrect ? 1 : 0),
    timesIncorrect: currentProgress.timesIncorrect + (isCorrect ? 0 : 1),
    lastAttemptDate: now
  }
}

export const markLessonComplete = (
  lessonId: string,
  accuracy: number,
  currentProgress?: GrammarProgress
): GrammarProgress => {
  const now = new Date()

  return {
    lessonId,
    exerciseId: undefined,
    level: currentProgress?.level || 0,
    nextReview: currentProgress?.nextReview || now,
    timesCorrect: currentProgress?.timesCorrect || 0,
    timesIncorrect: currentProgress?.timesIncorrect || 0,
    completed: true,
    lastAttemptDate: now,
    lessonAccuracy: Math.round(accuracy)
  }
}

// SRS intervals in days based on level (same as vocabulary)
const SRS_INTERVALS = [
  0,    // Level 0: review immediately
  1,    // Level 1: 1 day
  3,    // Level 2: 3 days
  7,    // Level 3: 1 week
  14,   // Level 4: 2 weeks
  30,   // Level 5: 1 month
]

export const getNextReviewDate = (level: number): Date => {
  const days = SRS_INTERVALS[level] || 0
  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + days)
  return nextReview
}

export const getExercisesForReview = (progress: Record<string, GrammarProgress>): string[] => {
  const now = new Date()
  return Object.entries(progress)
    .filter(([key, p]) => key.includes(':ex-') && p.nextReview <= now)
    .map(([key]) => key.split(':')[1]) // Extract exerciseId from key
}

export const clearAllGrammarProgress = (): void => {
  const storage = getLocalStorage()
  if (!storage) return

  storage.removeItem(STORAGE_KEY)
}

/**
 * Get number of stars for a lesson
 * 0 stars: not completed
 * 1 star: completed with < 100% accuracy
 * 3 stars: completed with 100% accuracy
 */
export const getLessonStars = (lessonId: string, progress: Record<string, GrammarProgress>): number => {
  const lessonProgress = progress[lessonId]

  if (!lessonProgress || !lessonProgress.completed) {
    return 0
  }

  if (lessonProgress.lessonAccuracy === 100) {
    return 3
  }

  return 1
}

/**
 * Get overall star statistics
 */
export const getStarStats = (progress: Record<string, GrammarProgress>, totalLessons: number) => {
  const completedLessons = Object.values(progress).filter(p => p.completed && !p.exerciseId)

  const totalStars = completedLessons.reduce((sum, lesson) => {
    if (lesson.lessonAccuracy === 100) return sum + 3
    return sum + 1
  }, 0)

  const threeStars = completedLessons.filter(lesson => lesson.lessonAccuracy === 100).length

  return {
    totalStars,
    maxStars: totalLessons,
    threeStars,
    maxThreeStars: totalLessons
  }
}
