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
      // No due words, show random selection
      const randomWords = [...vocabulary]
        .sort(() => Math.random() - 0.5)
        .slice(0, 20)
        .map(w => w.id)
      setSessionWords(randomWords)
    } else {
      // Show due words first, then add some new ones if needed
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
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (sessionWords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-xl text-gray-600 mb-4">No words available</div>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Go to Dashboard
        </button>
      </div>
    )
  }

  if (sessionComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Practice Session Complete!
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          You reviewed {sessionWords.length} words
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setCurrentIndex(0)
              setSessionComplete(false)
              // Refresh session words
              window.location.reload()
            }}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
          >
            Practice Again
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const currentWord = getWordById(sessionWords[currentIndex])

  if (!currentWord) {
    return <div>Error: Word not found</div>
  }

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-900">Practice Session</h2>
          <span className="text-lg text-gray-600">
            {currentIndex + 1} / {sessionWords.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / sessionWords.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <Flashcard word={currentWord} onAnswer={handleAnswer} />

      {/* Category Badge */}
      <div className="text-center mt-8">
        <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
          {currentWord.category.replace('-', ' ')}
        </span>
      </div>
    </div>
  )
}
