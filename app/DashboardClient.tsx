'use client'

import Link from 'next/link'
import { useProgress } from '@/lib/useProgress'

interface DashboardClientProps {
  totalVocabulary: number
}

export default function DashboardClient({ totalVocabulary }: DashboardClientProps) {
  const { isLoaded } = useProgress()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-3xl text-white font-bold">한</span>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/practice"
          className="group relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 transform transition-all hover:scale-105 hover:shadow-3xl"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative text-white">
            <div className="text-5xl mb-3">📚</div>
            <h3 className="text-2xl font-black mb-2">Flashcards</h3>
            <p className="text-sm text-purple-100 font-medium">
              Practice flashcards
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-white font-semibold text-sm">
              Start
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </Link>

        <Link
          href="/grammar"
          className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-3xl shadow-2xl p-8 transform transition-all hover:scale-105 hover:shadow-3xl"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative text-white">
            <div className="text-5xl mb-3">✏️</div>
            <h3 className="text-2xl font-black mb-2">Lessons</h3>
            <p className="text-sm text-green-100 font-medium">
              Learn Korean lessons
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-white font-semibold text-sm">
              Learn
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </Link>

        <Link
          href="/words"
          className="group relative overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-3xl shadow-2xl p-8 transform transition-all hover:scale-105 hover:shadow-3xl"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative text-white">
            <div className="text-5xl mb-3">📖</div>
            <h3 className="text-2xl font-black mb-2">Vocab</h3>
            <p className="text-sm text-blue-100 font-medium">
              Explore {totalVocabulary} vocab
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-white font-semibold text-sm">
              Browse
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
