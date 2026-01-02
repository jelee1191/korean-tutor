'use client'

import Link from 'next/link'
import { GrammarLesson } from '@/types'
import { useGrammarProgress } from '@/lib/useGrammarProgress'

interface GrammarClientProps {
  lessons: GrammarLesson[]
}

export default function GrammarClient({ lessons }: GrammarClientProps) {
  const { isLoaded, isLessonCompleted, getGrammarStats } = useGrammarProgress()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    )
  }

  const stats = getGrammarStats()

  // Group lessons by chapter
  const lessonsByChapter = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.chapter]) {
      acc[lesson.chapter] = []
    }
    acc[lesson.chapter].push(lesson)
    return acc
  }, {} as Record<number, GrammarLesson[]>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Lessons
          </h1>
          <p className="text-xl text-gray-600">
            Master Korean step by step
          </p>
        </div>

        {/* Due for Review */}
        {stats.dueForReview > 0 && (
          <Link
            href="/grammar/review"
            className="block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl p-6 shadow-xl mb-12 transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-black mb-2">
                  {stats.dueForReview} exercises due for review
                </div>
                <div className="text-green-100">
                  Review now to strengthen your memory
                </div>
              </div>
              <div className="text-4xl">→</div>
            </div>
          </Link>
        )}

        {/* Lessons by Chapter */}
        <div className="space-y-8">
          {Object.entries(lessonsByChapter).map(([chapter, chapterLessons]) => (
            <div key={chapter}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Chapter {chapter}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapterLessons.map((lesson) => {
                  const completed = isLessonCompleted(lesson.id)

                  return (
                    <Link
                      key={lesson.id}
                      href={`/grammar/${lesson.id}`}
                      className="bg-white hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 rounded-xl p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-indigo-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              Lesson {lesson.order}: {lesson.title}
                            </h3>
                            {completed && (
                              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                ✓
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-lg mb-2">{lesson.titleKorean}</p>
                          <p className="text-gray-500 text-sm">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end mt-4">
                        <span className="text-indigo-600 font-semibold">
                          Start Lesson →
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
