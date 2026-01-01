'use client'

import { useState } from 'react'
import { Word } from '@/types'

interface FlashcardProps {
  word: Word
  onAnswer: (isCorrect: boolean) => void
  showAnswer?: boolean
}

export default function Flashcard({ word, onAnswer, showAnswer = false }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(showAnswer)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleAnswer = (isCorrect: boolean) => {
    onAnswer(isCorrect)
    setIsFlipped(false)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Flashcard */}
      <div
        className="relative h-80 mb-8 cursor-pointer perspective"
        onClick={handleFlip}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front of card */}
          <div
            className="absolute w-full h-full backface-hidden bg-white border-2 border-gray-300 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-6xl font-bold text-gray-900 mb-4">
              {word.korean}
            </div>
            <div className="text-sm text-gray-500 mt-4">
              Click to reveal answer
            </div>
          </div>

          {/* Back of card */}
          <div
            className="absolute w-full h-full backface-hidden bg-blue-50 border-2 border-blue-300 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="text-4xl font-bold text-gray-900 mb-6">
              {word.english}
            </div>
            {word.notes && (
              <div className="text-sm text-gray-600 text-center max-w-md">
                {word.notes}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Answer Buttons */}
      {isFlipped && (
        <div className="flex gap-4 justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleAnswer(false)
            }}
            className="px-8 py-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-md"
          >
            Still Learning
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleAnswer(true)
            }}
            className="px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-md"
          >
            Know It!
          </button>
        </div>
      )}
    </div>
  )
}
