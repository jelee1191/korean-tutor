'use client'

import { useState, useEffect, useCallback } from 'react'
import { UserProgress } from '@/types'
import {
  loadProgress,
  saveProgress,
  updateWordProgress,
  getWordsForReview,
  clearAllProgress,
} from './storage'
import {
  loadProgressFromSupabase,
  saveProgressToSupabase,
  migrateLocalStorageToSupabase,
} from './supabaseStorage'
import { useAuth } from './AuthContext'

export const useProgress = () => {
  const { user } = useAuth()
  const [progress, setProgress] = useState<Record<string, UserProgress>>({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasMigrated, setHasMigrated] = useState(false)

  // Load progress (from Supabase if logged in, otherwise localStorage)
  useEffect(() => {
    const loadData = async () => {
      if (user) {
        // User is logged in - load from Supabase
        const supabaseProgress = await loadProgressFromSupabase()

        // Check if we need to migrate localStorage data
        if (!hasMigrated) {
          const localProgress = loadProgress()
          const hasLocalData = Object.keys(localProgress).length > 0
          const hasSupabaseData = Object.keys(supabaseProgress).length > 0

          if (hasLocalData && !hasSupabaseData) {
            // Migrate localStorage to Supabase
            try {
              await migrateLocalStorageToSupabase(localProgress)
              setProgress(localProgress)
              setHasMigrated(true)
            } catch (error) {
              console.error('Migration failed:', error)
              setProgress(supabaseProgress)
            }
          } else {
            setProgress(supabaseProgress)
          }
        } else {
          setProgress(supabaseProgress)
        }
      } else {
        // Not logged in - use localStorage
        const localProgress = loadProgress()
        setProgress(localProgress)
      }
      setIsLoaded(true)
    }

    loadData()
  }, [user, hasMigrated])

  // Save progress (to Supabase if logged in, otherwise localStorage)
  useEffect(() => {
    if (isLoaded && !user) {
      // Only save to localStorage if not logged in
      saveProgress(progress)
    }
  }, [progress, isLoaded, user])

  const recordAnswer = useCallback(async (wordId: string, isCorrect: boolean) => {
    setProgress(prev => {
      const updated = updateWordProgress(wordId, isCorrect, prev[wordId])
      const newProgress = {
        ...prev,
        [wordId]: updated,
      }

      // Save to Supabase if logged in
      if (user) {
        saveProgressToSupabase(wordId, updated)
      }

      return newProgress
    })
  }, [user])

  const getWordProgress = useCallback(
    (wordId: string): UserProgress | undefined => {
      return progress[wordId]
    },
    [progress]
  )

  const getDueWords = useCallback((): string[] => {
    return getWordsForReview(progress)
  }, [progress])

  const resetProgress = useCallback(() => {
    clearAllProgress()
    setProgress({})
  }, [])

  const getStats = useCallback(() => {
    const allProgress = Object.values(progress)
    const totalWords = allProgress.length
    const masteredWords = allProgress.filter(p => p.level >= 4).length
    const learningWords = allProgress.filter(p => p.level > 0 && p.level < 4).length
    const newWords = allProgress.filter(p => p.level === 0).length

    const totalCorrect = allProgress.reduce((sum, p) => sum + p.timesCorrect, 0)
    const totalIncorrect = allProgress.reduce((sum, p) => sum + p.timesIncorrect, 0)
    const accuracy = totalCorrect + totalIncorrect > 0
      ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100)
      : 0

    return {
      totalWords,
      masteredWords,
      learningWords,
      newWords,
      accuracy,
      dueForReview: getDueWords().length,
    }
  }, [progress, getDueWords])

  return {
    progress,
    isLoaded,
    recordAnswer,
    getWordProgress,
    getDueWords,
    resetProgress,
    getStats,
  }
}
