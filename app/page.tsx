'use client'

import Link from 'next/link'
import { useProgress } from '@/lib/useProgress'
import { useGrammarProgress } from '@/lib/useGrammarProgress'
import { vocabulary } from '@/data/vocabulary'

export default function Dashboard() {
  const { getStats, isLoaded } = useProgress()
  const { getGrammarStats, isLoaded: grammarLoaded } = useGrammarProgress()

  if (!isLoaded || !grammarLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  const stats = getStats()
  const grammarStats = getGrammarStats()
  const totalVocabulary = vocabulary.length

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-3xl text-white font-bold">한</span>
          </div>
        </div>
        <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          한국어 학습
        </h1>
        <p className="text-2xl text-gray-600 font-light">
          Master Korean vocabulary with smart repetition
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="text-5xl font-black text-white mb-2">
              {stats.totalWords}
            </div>
            <div className="text-blue-100 font-semibold text-lg">Words Studied</div>
            <div className="text-sm text-blue-200 mt-1">
              out of {totalVocabulary} total
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="text-5xl font-black text-white mb-2">
              {stats.masteredWords}
            </div>
            <div className="text-green-100 font-semibold text-lg">Mastered</div>
            <div className="text-sm text-green-200 mt-1">
              Level 4-5
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="text-5xl font-black text-white mb-2">
              {stats.dueForReview}
            </div>
            <div className="text-orange-100 font-semibold text-lg">Due for Review</div>
            <div className="text-sm text-orange-200 mt-1">
              Ready to practice
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          Learning Progress
        </h2>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-3">
              <span className="font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Mastered
              </span>
              <span className="text-gray-600 font-medium">{stats.masteredWords} words</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-500 shadow-lg"
                style={{
                  width: `${stats.totalWords > 0 ? (stats.masteredWords / totalVocabulary) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-3">
              <span className="font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                Learning
              </span>
              <span className="text-gray-600 font-medium">{stats.learningWords} words</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full transition-all duration-500 shadow-lg"
                style={{
                  width: `${stats.totalWords > 0 ? (stats.learningWords / totalVocabulary) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-3">
              <span className="font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                Accuracy
              </span>
              <span className="text-gray-600 font-medium">{stats.accuracy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-4 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${stats.accuracy}%` }}
              />
            </div>
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
            <h3 className="text-2xl font-black mb-2">Practice</h3>
            <p className="text-sm text-purple-100 font-medium">
              {stats.dueForReview > 0
                ? `Review ${stats.dueForReview} words`
                : 'Practice vocabulary'}
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
            <h3 className="text-2xl font-black mb-2">Grammar</h3>
            <p className="text-sm text-green-100 font-medium">
              {grammarStats.lessonsCompleted > 0
                ? `${grammarStats.lessonsCompleted} lessons completed`
                : 'Learn Korean grammar'}
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
            <h3 className="text-2xl font-black mb-2">Words</h3>
            <p className="text-sm text-blue-100 font-medium">
              Explore {totalVocabulary} words
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

      {/* Welcome Tips */}
      {stats.totalWords === 0 && (
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-indigo-200 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
            <span className="text-3xl">👋</span>
            Welcome to Korean Tutor!
          </h3>
          <p className="text-indigo-800 mb-6 text-lg">
            Start practicing to build your vocabulary. The app uses spaced repetition to help you remember words effectively.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-indigo-700">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <div className="font-semibold">Smart Learning</div>
                <div className="text-sm text-indigo-600">Words you know well appear less often</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔄</span>
              <div>
                <div className="font-semibold">Spaced Repetition</div>
                <div className="text-sm text-indigo-600">Optimized review schedule for memory retention</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <div className="font-semibold">Track Progress</div>
                <div className="text-sm text-indigo-600">Monitor your learning journey</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🗂️</span>
              <div>
                <div className="font-semibold">Organized by Category</div>
                <div className="text-sm text-indigo-600">Browse words by topic</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
