'use client'

import { useState, useEffect } from 'react'
import { MultipleChoiceExercise } from '@/types'

interface MultipleChoiceProps {
  exercise: MultipleChoiceExercise
  onAnswer: (isCorrect: boolean) => void
}

export default function MultipleChoice({ exercise, onAnswer }: MultipleChoiceProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)

  // Reset state when exercise changes
  useEffect(() => {
    setSelectedIndex(null)
    setHasAnswered(false)
  }, [exercise.id])

  const handleSelect = (index: number) => {
    if (hasAnswered) return

    setSelectedIndex(index)
    setHasAnswered(true)
  }

  const handleNext = () => {
    const isCorrect = selectedIndex === exercise.correctIndex
    onAnswer(isCorrect)
  }

  const getButtonStyle = (index: number) => {
    if (!hasAnswered) {
      return 'bg-white hover:bg-indigo-50 border-2 border-gray-200 hover:border-indigo-300'
    }

    if (index === exercise.correctIndex) {
      return 'bg-green-100 border-2 border-green-500'
    }

    if (index === selectedIndex) {
      return 'bg-red-100 border-2 border-red-500'
    }

    return 'bg-gray-100 border-2 border-gray-300 opacity-50'
  }

  const getButtonIcon = (index: number) => {
    if (!hasAnswered) return null

    if (index === exercise.correctIndex) {
      return <span className="text-green-600 text-2xl">✓</span>
    }

    if (index === selectedIndex) {
      return <span className="text-red-600 text-2xl">✗</span>
    }

    return null
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Question */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 mb-8 shadow-xl">
        <div className="text-white/80 text-sm font-medium mb-2">
          {exercise.instruction}
        </div>
        <div className="text-3xl font-bold text-white">
          {exercise.question}
        </div>
        {exercise.hint && !hasAnswered && (
          <div className="mt-4 text-white/70 text-sm italic">
            💡 Hint: {exercise.hint}
          </div>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {exercise.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={hasAnswered}
            className={`${getButtonStyle(index)} p-6 rounded-xl transition-all text-left text-xl font-semibold flex items-center justify-between ${
              !hasAnswered ? 'hover:scale-105 cursor-pointer' : 'cursor-default'
            }`}
          >
            <span className="text-gray-800">{option}</span>
            {getButtonIcon(index)}
          </button>
        ))}
      </div>

      {/* Explanation (shown after answer) */}
      {hasAnswered && (
        <>
          <div className={`rounded-xl p-6 mb-6 ${
            selectedIndex === exercise.correctIndex ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
          }`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">
                {selectedIndex === exercise.correctIndex ? '✓' : '✗'}
              </span>
              <div>
                <p className="font-semibold text-lg mb-2">
                  {selectedIndex === exercise.correctIndex ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-gray-700">{exercise.explanation}</p>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg"
          >
            Next Exercise →
          </button>
        </>
      )}
    </div>
  )
}
