import { UserProgress } from '@/types'

const STORAGE_KEY = 'korean-tutor-progress'

// Helper to safely access localStorage (returns null on server or in SSR)
const getLocalStorage = () => {
  if (typeof window === 'undefined') return null
  return window.localStorage
}

export const loadProgress = (): Record<string, UserProgress> => {
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
    })

    return parsed
  } catch (error) {
    console.error('Failed to load progress:', error)
    return {}
  }
}

export const saveProgress = (progress: Record<string, UserProgress>): void => {
  const storage = getLocalStorage()
  if (!storage) return

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error('Failed to save progress:', error)
  }
}

export const updateWordProgress = (
  wordId: string,
  isCorrect: boolean,
  currentProgress?: UserProgress
): UserProgress => {
  const now = new Date()

  if (!currentProgress) {
    // New word
    return {
      wordId,
      level: isCorrect ? 1 : 0,
      nextReview: getNextReviewDate(isCorrect ? 1 : 0),
      timesCorrect: isCorrect ? 1 : 0,
      timesIncorrect: isCorrect ? 0 : 1,
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
  }
}

// SRS intervals in days based on level
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

export const getWordsForReview = (progress: Record<string, UserProgress>): string[] => {
  const now = new Date()
  return Object.values(progress)
    .filter(p => p.nextReview <= now)
    .map(p => p.wordId)
}

export const clearAllProgress = (): void => {
  const storage = getLocalStorage()
  if (!storage) return

  storage.removeItem(STORAGE_KEY)
}
