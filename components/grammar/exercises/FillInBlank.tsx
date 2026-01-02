'use client'

import { useState, useEffect } from 'react'
import { FillInBlankExercise } from '@/types'
import { validateAnswer, highlightDifferences } from '@/lib/stringMatching'

interface FillInBlankProps {
  exercise: FillInBlankExercise
  onAnswer: (isCorrect: boolean) => void
}

export default function FillInBlank({ exercise, onAnswer }: FillInBlankProps) {
  const [userAnswer, setUserAnswer] = useState('')
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Reset state when exercise changes
  useEffect(() => {
    setUserAnswer('')
    setHasAnswered(false)
    setIsCorrect(false)
  }, [exercise.id])

  const handleSubmit = () => {
    if (!userAnswer.trim() || hasAnswered) return

    const acceptableAnswers = [exercise.correctAnswer, ...(exercise.acceptableAnswers || [])]
    const correct = acceptableAnswers.some(answer => validateAnswer(userAnswer, answer))

    setIsCorrect(correct)
    setHasAnswered(true)
  }

  const handleNext = () => {
    onAnswer(isCorrect)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  // Split sentence by {blank} placeholder
  const parts = exercise.sentence.split('{blank}')

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Instruction */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-xl">
        <div className="text-white/80 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
          {exercise.instruction}
        </div>
        <div className="text-lg sm:text-2xl font-bold text-white">
          Fill in the blank
        </div>
        {exercise.hint && !hasAnswered && (
          <div className="mt-2 sm:mt-3 text-white/70 text-xs sm:text-sm italic">
            💡 Hint: {exercise.hint}
          </div>
        )}
      </div>

      {/* Sentence with blank */}
      <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg">
        <div className="text-lg sm:text-xl font-bold text-gray-800 flex items-center justify-center flex-wrap gap-2">
          {parts[0] && <span>{parts[0]}</span>}

          {!hasAnswered ? (
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="___"
              className="inline-block px-4 py-2 border-b-4 border-indigo-500 focus:border-purple-500 outline-none text-center min-w-[120px] bg-indigo-50 rounded-t-lg"
              autoFocus
            />
          ) : (
            <span className={`inline-block px-4 py-2 rounded-lg ${
              isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {userAnswer}
            </span>
          )}

          {parts[1] && <span>{parts[1]}</span>}
        </div>
      </div>

      {/* Submit Button */}
      {!hasAnswered && (
        <button
          onClick={handleSubmit}
          disabled={!userAnswer.trim()}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all hover:scale-105 shadow-lg disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
        >
          Check Answer
        </button>
      )}

      {/* Explanation (shown after answer) */}
      {hasAnswered && (
        <>
          <div className={`rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 ${
            isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
          }`}>
            <div className="flex items-start gap-2">
              <span className="text-xl sm:text-2xl">
                {isCorrect ? '✓' : '✗'}
              </span>
              <div className="flex-1">
                <p className="font-semibold text-base sm:text-lg mb-1">
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                {!isCorrect && (
                  <p className="text-sm sm:text-base text-gray-700 mb-1 sm:mb-2">
                    Correct answer: <strong className="text-green-700">{exercise.correctAnswer}</strong>
                  </p>
                )}
                <p className="text-sm sm:text-base text-gray-700">{exercise.explanation}</p>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            Next Exercise →
          </button>
        </>
      )}
    </div>
  )
}
