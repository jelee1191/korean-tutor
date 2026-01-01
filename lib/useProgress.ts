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

export const useProgress = () => {
  const [progress, setProgress] = useState<Record<string, UserProgress>>({})
  const [isLoaded, setIsLoaded] = useState(false)

  // Load progress from localStorage on mount
  useEffect(() => {
    const loaded = loadProgress()
    setProgress(loaded)
    setIsLoaded(true)
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      saveProgress(progress)
    }
  }, [progress, isLoaded])

  const recordAnswer = useCallback((wordId: string, isCorrect: boolean) => {
    setProgress(prev => {
      const updated = updateWordProgress(wordId, isCorrect, prev[wordId])
      return {
        ...prev,
        [wordId]: updated,
      }
    })
  }, [])

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
