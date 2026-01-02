'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GrammarLesson, Exercise } from '@/types'
import { useGrammarProgress } from '@/lib/useGrammarProgress'
import ExerciseContainer from '@/components/grammar/ExerciseContainer'

interface PracticeClientProps {
  lesson: GrammarLesson
  exercises: Exercise[]
}

export default function PracticeClient({ lesson, exercises }: PracticeClientProps) {
  const router = useRouter()
  const { isLoaded, markLessonComplete } = useGrammarProgress()
  const [sessionComplete, setSessionComplete] = useState(false)
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 })

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    )
  }

  const handleComplete = async (stats: { correct: number; total: number }) => {
    // Calculate accuracy percentage
    const accuracy = stats.total > 0
      ? (stats.correct / stats.total) * 100
      : 0

    // Auto-mark lesson as complete when all exercises are done with accuracy
    await markLessonComplete(lesson.id, accuracy)

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
              Practice Complete!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Great work on {lesson.title}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
                <div className="text-4xl font-black text-indigo-600 mb-2">
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
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
                <div className="text-4xl font-black text-green-600 mb-2">
                  {accuracy}%
                </div>
                <div className="text-gray-600">Accuracy</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-8 rounded-xl transition-all hover:scale-105"
              >
                Practice Again
              </button>
              <button
                onClick={() => router.push('/grammar')}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg"
              >
                Continue Learning
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
          onClick={() => router.push(`/grammar/${lesson.id}`)}
          className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2"
        >
          ← Back to Lesson
        </button>

        {/* Lesson Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            {lesson.title}
          </h1>
          <p className="text-gray-600">Practice Exercises</p>
        </div>

        {/* Exercise Container */}
        <ExerciseContainer
          exercises={exercises}
          lessonId={lesson.id}
          onComplete={handleComplete}
        />
      </div>
    </div>
  )
}
