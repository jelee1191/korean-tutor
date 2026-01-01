'use client'

import Link from 'next/link'
import { useProgress } from '@/lib/useProgress'
import { vocabulary } from '@/data/vocabulary'

export default function Dashboard() {
  const { getStats, isLoaded } = useProgress()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  const stats = getStats()
  const totalVocabulary = vocabulary.length

  return (
    <div className="max-w-5xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          한국어 학습
        </h1>
        <p className="text-xl text-gray-600">
          Korean Vocabulary Learning
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {stats.totalWords}
          </div>
          <div className="text-gray-600 font-medium">Words Studied</div>
          <div className="text-sm text-gray-500 mt-1">
            out of {totalVocabulary} total
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="text-4xl font-bold text-green-600 mb-2">
            {stats.masteredWords}
          </div>
          <div className="text-gray-600 font-medium">Mastered</div>
          <div className="text-sm text-gray-500 mt-1">
            Level 4-5
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="text-4xl font-bold text-orange-600 mb-2">
            {stats.dueForReview}
          </div>
          <div className="text-gray-600 font-medium">Due for Review</div>
          <div className="text-sm text-gray-500 mt-1">
            Ready to practice
          </div>
        </div>
      </div>

      {/* Progress Breakdown */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Progress</h2>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">Mastered</span>
              <span className="text-gray-600">{stats.masteredWords} words</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{
                  width: `${stats.totalWords > 0 ? (stats.masteredWords / totalVocabulary) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">Learning</span>
              <span className="text-gray-600">{stats.learningWords} words</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-yellow-500 h-3 rounded-full transition-all"
                style={{
                  width: `${stats.totalWords > 0 ? (stats.learningWords / totalVocabulary) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">Accuracy</span>
              <span className="text-gray-600">{stats.accuracy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${stats.accuracy}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/practice"
          className="block bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105"
        >
          <div className="text-3xl mb-2">📚</div>
          <h3 className="text-2xl font-bold mb-2">Start Practice</h3>
          <p className="text-blue-100">
            {stats.dueForReview > 0
              ? `Review ${stats.dueForReview} words due today`
              : 'Practice vocabulary with flashcards'}
          </p>
        </Link>

        <Link
          href="/words"
          className="block bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105"
        >
          <div className="text-3xl mb-2">📖</div>
          <h3 className="text-2xl font-bold mb-2">Browse Words</h3>
          <p className="text-purple-100">
            Explore all {totalVocabulary} vocabulary words by category
          </p>
        </Link>
      </div>

      {/* Quick Tips */}
      {stats.totalWords === 0 && (
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            👋 Welcome to Korean Tutor!
          </h3>
          <p className="text-blue-800 mb-4">
            Start practicing to build your vocabulary. The app uses spaced repetition to help you remember words effectively.
          </p>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• Click "Start Practice" to begin learning</li>
            <li>• Words you know well will be reviewed less often</li>
            <li>• Words you struggle with will appear more frequently</li>
            <li>• Browse all words in the Word Bank</li>
          </ul>
        </div>
      )}
    </div>
  )
}
