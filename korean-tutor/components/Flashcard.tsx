'use client'

import { useState, useEffect, useRef } from 'react'
import { Word } from '@/types'
import { speakKorean, isSpeechAvailable } from '@/lib/audio'

interface FlashcardProps {
  word: Word
  onAnswer: (isCorrect: boolean) => void
  showAnswer?: boolean
}

export default function Flashcard({ word, onAnswer, showAnswer = false }: FlashcardProps) {
  // Store which word ID is flipped, not just a boolean
  const [flippedWordId, setFlippedWordId] = useState<string | null>(showAnswer ? word.id : null)

  // Check if current word is the one that's flipped
  const isFlipped = flippedWordId === word.id

  const handleFlip = () => {
    if (isFlipped) {
      setFlippedWordId(null)
    } else {
      setFlippedWordId(word.id)
    }
  }

  const handleAnswer = (isCorrect: boolean) => {
    setFlippedWordId(null) // Reset on answer
    onAnswer(isCorrect)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Flashcard */}
      <div
        className="relative h-96 mb-8 cursor-pointer"
        onClick={handleFlip}
      >
        {/* Korean side */}
        <div
          className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-12 border-4 border-white/20"
          style={{ display: isFlipped ? 'none' : 'flex' }}
        >
          <div className="text-center">
            <div className="text-7xl font-black text-white mb-6 drop-shadow-lg">
              {word.korean}
            </div>

            {/* Audio button */}
            {isSpeechAvailable() && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  speakKorean(word.korean)
                }}
                className="mb-4 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full transition-all transform hover:scale-105 backdrop-blur-sm"
                aria-label="Play pronunciation"
              >
                <div className="flex items-center gap-2 text-white font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  Listen
                </div>
              </button>
            )}

            <div className="inline-flex items-center gap-2 text-white/80 text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              Click to reveal
            </div>
          </div>
        </div>

        {/* English side - only render when flipped */}
        {isFlipped && (
          <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-12 border-4 border-white/20">
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
        )}
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
