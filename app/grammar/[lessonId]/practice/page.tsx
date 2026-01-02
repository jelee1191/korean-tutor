'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getLessonById, getExercisesByLesson } from '@/data/grammar'
import { useGrammarProgress } from '@/lib/useGrammarProgress'
import ExerciseContainer from '@/components/grammar/ExerciseContainer'

export default function PracticePage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = params.lessonId as string

  const { isLoaded } = useGrammarProgress()
  const [sessionComplete, setSessionComplete] = useState(false)
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 })

  const lesson = getLessonById(lessonId)
  const exercises = getExercisesByLesson(lessonId)

  if (!lesson || exercises.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Exercises Found</h1>
          <button
            onClick={() => router.push(`/grammar/${lessonId}`)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Lesson
          </button>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
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
          onClick={() => router.push(`/grammar/${lessonId}`)}
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
          lessonId={lessonId}
          onComplete={handleComplete}
        />
      </div>
    </div>
  )
}
