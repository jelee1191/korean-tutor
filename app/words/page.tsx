'use client'

import { useState } from 'react'
import { vocabulary, getAllCategories } from '@/data/vocabulary'
import { useProgress } from '@/lib/useProgress'

export default function WordsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { getWordProgress } = useProgress()

  const categories = getAllCategories()

  const filteredWords = vocabulary.filter(word => {
    const matchesCategory = !selectedCategory || word.category === selectedCategory
    const matchesSearch =
      !searchTerm ||
      word.korean.includes(searchTerm) ||
      word.english.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const formatCategory = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const getProgressLevel = (wordId: string): number => {
    const progress = getWordProgress(wordId)
    return progress?.level || 0
  }

  const getLevelColor = (level: number): string => {
    if (level === 0) return 'bg-gray-200'
    if (level === 1) return 'bg-red-200'
    if (level === 2) return 'bg-orange-200'
    if (level === 3) return 'bg-yellow-200'
    if (level === 4) return 'bg-lime-200'
    return 'bg-green-300'
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Word Bank</h1>
        <p className="text-gray-600">Browse all {vocabulary.length} vocabulary words</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search words..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {formatCategory(category)}
            </button>
          ))}
        </div>
      </div>

      {/* Word List */}
      <div className="grid gap-3">
        {filteredWords.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No words found</p>
        ) : (
          filteredWords.map(word => {
            const level = getProgressLevel(word.id)
            return (
              <div
                key={word.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {word.korean}
                      </span>
                      <span className="text-lg text-gray-600">{word.english}</span>
                    </div>
                    {word.notes && (
                      <p className="text-sm text-gray-500 mb-2">{word.notes}</p>
                    )}
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                      {formatCategory(word.category)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-12 h-12 rounded-full ${getLevelColor(level)} flex items-center justify-center font-bold text-gray-800`}
                    >
                      {level}
                    </div>
                    <span className="text-xs text-gray-500">Level</span>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
