'use client'

import { useState } from 'react'
import { Exercise } from '@/types'
import MultipleChoice from './exercises/MultipleChoice'
import FillInBlank from './exercises/FillInBlank'
import SentenceBuilder from './exercises/SentenceBuilder'
import { useGrammarProgress } from '@/lib/useGrammarProgress'

interface ExerciseContainerProps {
  exercises: Exercise[]
  lessonId: string
  onComplete: (stats: { correct: number; total: number }) => void
}

export default function ExerciseContainer({ exercises, lessonId, onComplete }: ExerciseContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 })
  const { recordExerciseAnswer } = useGrammarProgress()

  const currentExercise = exercises[currentIndex]
  const progress = ((currentIndex) / exercises.length) * 100

  const handleAnswer = async (isCorrect: boolean) => {
    // Record the answer in progress system
    await recordExerciseAnswer(currentExercise.id, lessonId, isCorrect)

    // Update session stats
    setSessionStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }))

    // Move to next exercise or complete
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onComplete({
        correct: sessionStats.correct + (isCorrect ? 1 : 0),
        total: exercises.length
      })
    }
  }

  const renderExercise = () => {
    switch (currentExercise.type) {
      case 'multiple_choice':
        return <MultipleChoice exercise={currentExercise} onAnswer={handleAnswer} />
      case 'fill_in_blank':
        return <FillInBlank exercise={currentExercise} onAnswer={handleAnswer} />
      case 'sentence_building':
        return <SentenceBuilder exercise={currentExercise} onAnswer={handleAnswer} />
      default:
        return <div>Unknown exercise type</div>
    }
  }

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Exercise {currentIndex + 1} of {exercises.length}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {sessionStats.correct}/{sessionStats.total} correct
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current Exercise */}
      {renderExercise()}

      {/* Difficulty Badge */}
      <div className="mt-8 text-center">
        <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
          currentExercise.difficulty === 1 ? 'bg-green-100 text-green-700' :
          currentExercise.difficulty === 2 ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {currentExercise.difficulty === 1 ? 'Easy' :
           currentExercise.difficulty === 2 ? 'Medium' : 'Hard'}
        </span>
      </div>
    </div>
  )
}
