'use client'

import { useState } from 'react'
import { Word } from '@/types'
import { useProgress } from '@/lib/useProgress'

interface WordsClientProps {
  vocabulary: Word[]
  categories: string[]
}

export default function WordsClient({ vocabulary, categories }: WordsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { getWordProgress } = useProgress()

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
    if (level === 0) return 'from-gray-400 to-gray-500'
    if (level === 1) return 'from-red-400 to-red-500'
    if (level === 2) return 'from-orange-400 to-orange-500'
    if (level === 3) return 'from-yellow-400 to-yellow-500'
    if (level === 4) return 'from-lime-400 to-lime-500'
    return 'from-green-400 to-emerald-500'
  }

  const getLevelText = (level: number): string => {
    if (level === 0) return 'New'
    if (level >= 4) return 'Mastered'
    return 'Learning'
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Word Bank
            </h1>
            <p className="text-gray-600 font-medium">
              Browse all {vocabulary.length} vocabulary words
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search Korean or English..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 font-medium shadow-lg transition-all"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:scale-105 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-200'
                : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-200'
                  : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200'
              }`}
            >
              {formatCategory(category)}
            </button>
          ))}
        </div>
      </div>

      {/* Word Grid */}
      <div className="grid gap-4">
        {filteredWords.length === 0 ? (
          <div className="text-center py-16 bg-white/50 rounded-2xl border-2 border-dashed border-gray-300">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 font-medium">No words found</p>
          </div>
        ) : (
          filteredWords.map(word => {
            const level = getProgressLevel(word.id)
            return (
              <div
                key={word.id}
                className="group bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-indigo-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="text-4xl font-black text-gray-900">
                        {word.korean}
                      </span>
                      <span className="text-2xl text-gray-600 font-semibold">
                        {word.english}
                      </span>
                    </div>
                    {word.notes && (
                      <p className="text-sm text-gray-600 mb-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                        💡 {word.notes}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-700 rounded-full border border-indigo-200">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {formatCategory(word.category)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getLevelColor(level)} flex items-center justify-center font-black text-white text-2xl shadow-lg transform group-hover:scale-110 transition-transform`}
                    >
                      {level}
                    </div>
                    <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {getLevelText(level)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Results Count */}
      {filteredWords.length > 0 && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full shadow-lg border border-gray-200">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-bold text-gray-700">
              Showing {filteredWords.length} word{filteredWords.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
