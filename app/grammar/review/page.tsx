'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { getExerciseById } from '@/data/grammar'
import { useGrammarProgress } from '@/lib/useGrammarProgress'
import ExerciseContainer from '@/components/grammar/ExerciseContainer'

export default function ReviewPage() {
  const router = useRouter()
  const { isLoaded, getDueExercises } = useGrammarProgress()
  const [sessionComplete, setSessionComplete] = useState(false)
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 })

  const dueExerciseIds = useMemo(() => {
    if (!isLoaded) return []
    return getDueExercises()
  }, [isLoaded, getDueExercises])

  const exercises = useMemo(() => {
    return dueExerciseIds
      .map(id => getExerciseById(id))
      .filter(ex => ex !== undefined)
  }, [dueExerciseIds])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (exercises.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="max-w-2xl text-center bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-6xl mb-6">✨</div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            All Caught Up!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            No exercises are due for review right now. Great work!
          </p>
          <button
            onClick={() => router.push('/grammar')}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg"
          >
            Back to Grammar
          </button>
        </div>
      </div>
    )
  }

  const handleComplete = (stats: { correct: number; total: number }) => {
    setSessionStats(stats)
    setSessionComplete(true)
  }

  const accuracy = sessionStats.total > 0
    ? Math.round((sessionStats.correct / sessionStats.total) * 100)
    : 0

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">
              Review Complete!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              You've reviewed all due exercises
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                <div className="text-4xl font-black text-green-600 mb-2">
                  {sessionStats.correct}
                </div>
                <div className="text-gray-600">Correct</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
                <div className="text-4xl font-black text-purple-600 mb-2">
                  {sessionStats.total}
                </div>
                <div className="text-gray-600">Total</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                <div className="text-4xl font-black text-blue-600 mb-2">
                  {accuracy}%
                </div>
                <div className="text-gray-600">Accuracy</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/grammar')}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg"
              >
                Back to Grammar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.push('/grammar')}
          className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2"
        >
          ← Back to Grammar
        </button>

        {/* Review Title */}
        <div className="text-center mb-8">
          <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            SRS Review Session
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Grammar Review
          </h1>
          <p className="text-gray-600">
            {exercises.length} exercises due for review
          </p>
        </div>

        {/* Exercise Container */}
        <ExerciseContainer
          exercises={exercises}
          lessonId="review"
          onComplete={handleComplete}
        />
      </div>
    </div>
  )
}
