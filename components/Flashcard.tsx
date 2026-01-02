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
        className="relative h-96 mb-8 cursor-pointer perspective"
        onClick={handleFlip}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front of card */}
          <div
            className="absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-12 border-4 border-white/20"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-center">
              <div className="text-7xl font-black text-white mb-6 drop-shadow-lg">
                {word.korean}
              </div>
              <div className="inline-flex items-center gap-2 text-white/80 text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Click to reveal
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div
            className="absolute w-full h-full backface-hidden bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-12 border-4 border-white/20"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-6 drop-shadow-lg">
                {word.english}
              </div>
              {word.notes && (
                <div className="text-lg text-white/90 max-w-md bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
                  {word.notes}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Answer Buttons */}
      {isFlipped && (
        <div className="flex gap-4 justify-center animate-fade-in">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleAnswer(false)
            }}
            className="group px-10 py-5 bg-gradient-to-br from-red-500 to-pink-600 text-white font-bold text-lg rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Still Learning
            </div>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleAnswer(true)
            }}
            className="group px-10 py-5 bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold text-lg rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Know It!
            </div>
          </button>
        </div>
      )}

      {!isFlipped && (
        <div className="text-center text-gray-500 text-sm font-medium">
          <div className="inline-flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full shadow-md backdrop-blur-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tap card to flip
          </div>
        </div>
      )}
    </div>
  )
}
