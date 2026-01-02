'use client'

import { useState, useEffect, useCallback } from 'react'
import { GrammarProgress } from '@/types'
import {
  loadGrammarProgress,
  saveGrammarProgress,
  updateExerciseProgress,
  markLessonComplete as markLessonCompleteStorage,
  getExercisesForReview,
  clearAllGrammarProgress,
} from './grammarStorage'
import { useAuth } from './AuthContext'

export const useGrammarProgress = () => {
  const { user } = useAuth()
  const [progress, setProgress] = useState<Record<string, GrammarProgress>>({})
  const [isLoaded, setIsLoaded] = useState(false)

  // Load progress from localStorage initially
  // TODO: Add Supabase integration later
  useEffect(() => {
    const loadData = async () => {
      if (user) {
        // TODO: Load from Supabase when implemented
        const localProgress = loadGrammarProgress()
        setProgress(localProgress)
      } else {
        // Not logged in - use localStorage
        const localProgress = loadGrammarProgress()
        setProgress(localProgress)
      }
      setIsLoaded(true)
    }

    loadData()
  }, [user])

  // Save progress to localStorage
  useEffect(() => {
    if (isLoaded && !user) {
      // Only save to localStorage if not logged in
      saveGrammarProgress(progress)
    }
    // TODO: Save to Supabase when user is logged in
  }, [progress, isLoaded, user])

  const recordExerciseAnswer = useCallback(async (
    exerciseId: string,
    lessonId: string,
    isCorrect: boolean
  ) => {
    const key = `${lessonId}:${exerciseId}`
    setProgress(prev => {
      const updated = updateExerciseProgress(exerciseId, lessonId, isCorrect, prev[key])
      const newProgress = { ...prev, [key]: updated }

      // TODO: Save to Supabase if user is logged in

      return newProgress
    })
  }, [user])

  const markLessonComplete = useCallback(async (lessonId: string) => {
    const key = `lesson:${lessonId}`
    setProgress(prev => {
      const updated = markLessonCompleteStorage(lessonId, prev[key])
      const newProgress = { ...prev, [key]: updated }

      // TODO: Save to Supabase if user is logged in

      return newProgress
    })
  }, [user])

  const getExerciseProgress = useCallback(
    (exerciseId: string, lessonId: string): GrammarProgress | undefined => {
      return progress[`${lessonId}:${exerciseId}`]
    },
    [progress]
  )

  const isLessonCompleted = useCallback(
    (lessonId: string): boolean => {
      return progress[`lesson:${lessonId}`]?.completed || false
    },
    [progress]
  )

  const getDueExercises = useCallback((): string[] => {
    return getExercisesForReview(progress)
  }, [progress])

  const getGrammarStats = useCallback(() => {
    const exerciseProgress = Object.entries(progress)
      .filter(([key]) => key.includes(':ex-'))
      .map(([, p]) => p)

    const lessonProgress = Object.entries(progress)
      .filter(([key]) => key.startsWith('lesson:'))
      .map(([, p]) => p)

    const totalCorrect = exerciseProgress.reduce((sum, p) => sum + p.timesCorrect, 0)
    const totalIncorrect = exerciseProgress.reduce((sum, p) => sum + p.timesIncorrect, 0)
    const accuracy = totalCorrect + totalIncorrect > 0
      ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100)
      : 0

    return {
      totalExercisesAttempted: exerciseProgress.length,
      masteredExercises: exerciseProgress.filter(p => p.level >= 4).length,
      learningExercises: exerciseProgress.filter(p => p.level > 0 && p.level < 4).length,
      newExercises: exerciseProgress.filter(p => p.level === 0).length,
      lessonsCompleted: lessonProgress.filter(p => p.completed).length,
      dueForReview: getDueExercises().length,
      accuracy
    }
  }, [progress, getDueExercises])

  const resetProgress = useCallback(() => {
    clearAllGrammarProgress()
    setProgress({})
  }, [])

  return {
    progress,
    isLoaded,
    recordExerciseAnswer,
    markLessonComplete,
    getExerciseProgress,
    isLessonCompleted,
    getDueExercises,
    getGrammarStats,
    resetProgress,
  }
}
