'use client'

import { useRouter } from 'next/navigation'
import { GrammarLesson } from '@/types'
import { useGrammarProgress } from '@/lib/useGrammarProgress'
import LessonView from '@/components/grammar/LessonView'

interface LessonClientProps {
  lesson: GrammarLesson
}

export default function LessonClient({ lesson }: LessonClientProps) {
  const router = useRouter()
  const { isLoaded, isLessonCompleted } = useGrammarProgress()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    )
  }

  const completed = isLessonCompleted(lesson.id)

  const handleStartExercises = () => {
    router.push(`/grammar/${lesson.id}/practice`)
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
          onStartExercises={handleStartExercises}
        />
      </div>
    </div>
  )
}
