'use client'

import { useState, useEffect, useMemo } from 'react'
import { SentenceBuildingExercise } from '@/types'

interface SentenceBuilderProps {
  exercise: SentenceBuildingExercise
  onAnswer: (isCorrect: boolean) => void
}

export default function SentenceBuilder({ exercise, onAnswer }: SentenceBuilderProps) {
  const [selectedWords, setSelectedWords] = useState<number[]>([])
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Shuffle words once when exercise loads
  const shuffledIndices = useMemo(() => {
    const indices = Array.from({ length: exercise.words.length }, (_, i) => i)
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]]
    }
    return indices
  }, [exercise.id])

  // Reset state when exercise changes
  useEffect(() => {
    setSelectedWords([])
    setHasAnswered(false)
    setIsCorrect(false)
  }, [exercise.id])

  const availableIndices = Array.from({ length: exercise.words.length }, (_, i) => i)
    .filter(i => !selectedWords.includes(i))

  const handleWordClick = (index: number) => {
    if (hasAnswered) return

    if (selectedWords.includes(index)) {
      // Remove word from selected
      setSelectedWords(selectedWords.filter(i => i !== index))
    } else {
      // Add word to selected
      setSelectedWords([...selectedWords, index])
    }
  }

  const handleCheck = () => {
    if (hasAnswered || selectedWords.length !== exercise.correctOrder.length) return

    const correct = JSON.stringify(selectedWords) === JSON.stringify(exercise.correctOrder)

    setIsCorrect(correct)
    setHasAnswered(true)
  }

  const handleNext = () => {
    onAnswer(isCorrect)
  }

  const handleReset = () => {
    if (hasAnswered) return
    setSelectedWords([])
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Instruction */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-xl">
        <div className="text-white/80 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
          {exercise.instruction}
        </div>
        <div className="text-base sm:text-xl font-bold text-white mb-2 sm:mb-3">
          Translate: {exercise.englishPrompt}
        </div>
        {exercise.hint && !hasAnswered && (
          <div className="mt-2 sm:mt-3 text-white/70 text-xs sm:text-sm italic">
            💡 Hint: {exercise.hint}
          </div>
        )}
      </div>

      {/* Building Area */}
      <div className="bg-white rounded-xl p-3 sm:p-6 mb-3 sm:mb-4 shadow-lg min-h-[80px] sm:min-h-[100px]">
        <div className="text-xs sm:text-sm text-gray-500 mb-2 font-medium">Your sentence:</div>
        <div className="flex flex-wrap gap-2 min-h-[40px] sm:min-h-[60px]">
          {selectedWords.length === 0 ? (
            <div className="text-gray-400 italic">Tap words below to build your sentence...</div>
          ) : (
            selectedWords.map((wordIndex, position) => (
              <button
                key={position}
                onClick={() => handleWordClick(wordIndex)}
                disabled={hasAnswered}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-bold transition-all ${
                  hasAnswered
                    ? isCorrect
                      ? 'bg-green-100 text-green-700 border-2 border-green-500'
                      : exercise.correctOrder[position] === wordIndex
                        ? 'bg-green-100 text-green-700 border-2 border-green-500'
                        : 'bg-red-100 text-red-700 border-2 border-red-500'
                    : 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300 hover:bg-indigo-200 cursor-pointer hover:scale-105'
                }`}
              >
                {exercise.words[wordIndex]}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Available Words */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 sm:p-6 mb-3 sm:mb-4 shadow-inner">
        <div className="text-xs sm:text-sm text-gray-600 mb-2 font-medium">Available words:</div>
        <div className="flex flex-wrap gap-2">
          {availableIndices.length === 0 && !hasAnswered ? (
            <div className="text-gray-400 italic text-sm">All words used! Check your answer or reset.</div>
          ) : availableIndices.length === 0 && hasAnswered ? (
            <div className="text-gray-400 italic text-sm">-</div>
          ) : (
            shuffledIndices
              .filter(idx => availableIndices.includes(idx))
              .map((wordIndex) => (
                <button
                  key={wordIndex}
                  onClick={() => handleWordClick(wordIndex)}
                  disabled={hasAnswered}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white hover:bg-indigo-50 border-2 border-gray-300 hover:border-indigo-400 rounded-lg text-sm sm:text-base font-bold text-gray-700 transition-all hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {exercise.words[wordIndex]}
                </button>
              ))
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {!hasAnswered && (
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={handleReset}
            disabled={selectedWords.length === 0}
            className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
          >
            Reset
          </button>
          <button
            onClick={handleCheck}
            disabled={selectedWords.length !== exercise.correctOrder.length}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all hover:scale-105 shadow-lg disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
          >
            Check Answer
          </button>
        </div>
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
                <p className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                {!isCorrect && (
                  <div className="mb-2 sm:mb-3">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Correct order:</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exercise.correctOrder.map((wordIndex, i) => (
                        <span key={i} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-green-100 text-green-700 rounded-lg font-bold text-xs sm:text-sm">
                          {exercise.words[wordIndex]}
                        </span>
                      ))}
                    </div>
                  </div>
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
