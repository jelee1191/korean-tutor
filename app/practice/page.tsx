'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Flashcard from '@/components/Flashcard'
import { vocabulary, getWordById } from '@/data/vocabulary'
import { useProgress } from '@/lib/useProgress'

export default function PracticePage() {
  const router = useRouter()
  const { getDueWords, recordAnswer, isLoaded } = useProgress()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sessionWords, setSessionWords] = useState<string[]>([])
  const [sessionComplete, setSessionComplete] = useState(false)

  useEffect(() => {
    if (!isLoaded) return

    const dueWords = getDueWords()

    if (dueWords.length === 0) {
      const randomWords = [...vocabulary]
        .sort(() => Math.random() - 0.5)
        .slice(0, 20)
        .map(w => w.id)
      setSessionWords(randomWords)
    } else {
      const wordsToReview = [...dueWords]
      if (wordsToReview.length < 10) {
        const newWords = vocabulary
          .filter(w => !dueWords.includes(w.id))
          .sort(() => Math.random() - 0.5)
          .slice(0, 10 - wordsToReview.length)
          .map(w => w.id)
        wordsToReview.push(...newWords)
      }
      setSessionWords(wordsToReview)
    }
  }, [isLoaded, getDueWords])

  const handleAnswer = (isCorrect: boolean) => {
    const currentWordId = sessionWords[currentIndex]
    recordAnswer(currentWordId, isCorrect)

    if (currentIndex < sessionWords.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setSessionComplete(true)
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (sessionWords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-xl text-gray-600 mb-4">No words available</div>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all"
        >
          Go to Dashboard
        </button>
      </div>
    )
  }

  if (sessionComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center border border-gray-200/50">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Session Complete!
          </h2>
          <p className="text-2xl text-gray-600 mb-8 font-medium">
            You reviewed {sessionWords.length} words
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setCurrentIndex(0)
                setSessionComplete(false)
                window.location.reload()
              }}
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 font-bold text-lg shadow-xl transform hover:scale-105 transition-all"
            >
              Practice Again
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl hover:from-gray-600 hover:to-gray-700 font-bold text-lg shadow-xl transform hover:scale-105 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentWord = getWordById(sessionWords[currentIndex])

  if (!currentWord) {
    return <div>Error: Word not found</div>
  }

  const progress = ((currentIndex + 1) / sessionWords.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Practice Session
          </h2>
          <div className="text-right">
            <div className="text-3xl font-black text-gray-900">
              {currentIndex + 1}
              <span className="text-gray-400 text-2xl"> / {sessionWords.length}</span>
            </div>
            <div className="text-sm text-gray-500 font-medium">Words Completed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 shadow-lg"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <Flashcard word={currentWord} onAnswer={handleAnswer} />

      {/* Category Badge */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm text-gray-700 rounded-full text-sm font-bold shadow-lg border border-gray-200/50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {currentWord.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </div>
      </div>
    </div>
  )
}
