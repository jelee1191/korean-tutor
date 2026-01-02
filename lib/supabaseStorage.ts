import { UserProgress } from '@/types'
import { supabase } from './supabase'
import { getNextReviewDate } from './storage'

export const loadProgressFromSupabase = async (): Promise<Record<string, UserProgress>> => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')

    if (error) throw error

    const progress: Record<string, UserProgress> = {}

    if (data) {
      data.forEach((row) => {
        progress[row.word_id] = {
          wordId: row.word_id,
          level: row.level,
          nextReview: new Date(row.next_review),
          timesCorrect: row.times_correct,
          timesIncorrect: row.times_incorrect,
        }
      })
    }

    return progress
  } catch (error) {
    console.error('Failed to load progress from Supabase:', error)
    return {}
  }
}

export const saveProgressToSupabase = async (
  wordId: string,
  progress: UserProgress
): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      console.error('No user logged in')
      return
    }

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        word_id: wordId,
        level: progress.level,
        next_review: progress.nextReview.toISOString(),
        times_correct: progress.timesCorrect,
        times_incorrect: progress.timesIncorrect,
      }, {
        onConflict: 'user_id,word_id'
      })

    if (error) throw error
  } catch (error) {
    console.error('Failed to save progress to Supabase:', error)
  }
}

export const migrateLocalStorageToSupabase = async (
  localProgress: Record<string, UserProgress>
): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      console.error('No user logged in')
      return
    }

    // Convert local progress to Supabase format
    const progressArray = Object.entries(localProgress).map(([wordId, progress]) => ({
      user_id: user.id,
      word_id: wordId,
      level: progress.level,
      next_review: progress.nextReview.toISOString(),
      times_correct: progress.timesCorrect,
      times_incorrect: progress.timesIncorrect,
    }))

    if (progressArray.length === 0) return

    // Batch insert/update
    const { error } = await supabase
      .from('user_progress')
      .upsert(progressArray, {
        onConflict: 'user_id,word_id'
      })

    if (error) throw error

    console.log(`Successfully migrated ${progressArray.length} words to Supabase`)
  } catch (error) {
    console.error('Failed to migrate localStorage to Supabase:', error)
    throw error
  }
}
