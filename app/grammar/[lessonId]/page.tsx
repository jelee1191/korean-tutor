'use client'

import { useParams, useRouter } from 'next/navigation'
import { getLessonById } from '@/data/grammar'
import { useGrammarProgress } from '@/lib/useGrammarProgress'
import LessonView from '@/components/grammar/LessonView'

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = params.lessonId as string

  const { isLoaded, isLessonCompleted, markLessonComplete } = useGrammarProgress()

  const lesson = getLessonById(lessonId)

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <button
            onClick={() => router.push('/grammar')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Grammar
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

  const completed = isLessonCompleted(lessonId)

  const handleComplete = async () => {
    await markLessonComplete(lessonId)
  }

  const handleStartExercises = () => {
    router.push(`/grammar/${lessonId}/practice`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.push('/grammar')}
          className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2"
        >
          ← Back to Grammar
        </button>

        <LessonView
          lesson={lesson}
          isCompleted={completed}
          onComplete={handleComplete}
          onStartExercises={handleStartExercises}
        />
      </div>
    </div>
  )
}
