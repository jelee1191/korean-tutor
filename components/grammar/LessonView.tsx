'use client'

import { GrammarLesson } from '@/types'
import { speakKorean, isSpeechAvailable } from '@/lib/audio'
import { useState } from 'react'

interface LessonViewProps {
  lesson: GrammarLesson
  isCompleted: boolean
  onStartExercises: () => void
}

export default function LessonView({ lesson, isCompleted, onStartExercises }: LessonViewProps) {
  const [audioAvailable] = useState(isSpeechAvailable())

  const handlePlayExample = (korean: string) => {
    if (audioAvailable) {
      speakKorean(korean, 0.8)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Lesson Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80 text-sm font-medium">Chapter {lesson.chapter} - Lesson {lesson.order}</span>
          {isCompleted && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              ✓ Completed
            </span>
          )}
        </div>
        <h1 className="text-4xl font-black text-white mb-3">{lesson.title}</h1>
        <p className="text-2xl font-bold text-white/90 mb-4">{lesson.titleKorean}</p>
        <p className="text-lg text-white/80">{lesson.description}</p>
      </div>

      {/* Lesson Content */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        {/* Explanation */}
        <div className="prose prose-lg max-w-none mb-8">
          {lesson.explanation.split('\n').map((line, i) => {
            // Handle markdown headings
            if (line.startsWith('## ')) {
              return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-6 mb-4">{line.replace('## ', '')}</h2>
            }
            if (line.startsWith('# ')) {
              return <h1 key={i} className="text-3xl font-bold text-gray-900 mt-8 mb-4">{line.replace('# ', '')}</h1>
            }
            // Handle bold text
            if (line.includes('**')) {
              const parts = line.split('**')
              return (
                <p key={i} className="mb-3 text-gray-700">
                  {parts.map((part, j) =>
                    j % 2 === 1 ? <strong key={j} className="font-bold text-indigo-600">{part}</strong> : part
                  )}
                </p>
              )
            }
            // Handle list items
            if (line.startsWith('- ')) {
              return <li key={i} className="mb-2 text-gray-700 ml-6">{line.replace('- ', '')}</li>
            }
            // Regular paragraph
            if (line.trim()) {
              return <p key={i} className="mb-3 text-gray-700">{line}</p>
            }
            return null
          }).filter(Boolean)}
        </div>

        {/* Examples */}
        {lesson.examples.length > 0 && (
          <div className="border-t pt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Examples</h3>
            <div className="space-y-6">
              {lesson.examples.map((example, idx) => (
                <div key={idx} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-3xl font-bold text-gray-900">{example.korean}</p>
                        {audioAvailable && (
                          <button
                            onClick={() => handlePlayExample(example.korean)}
                            className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition-colors"
                            aria-label="Play audio"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                            </svg>
                          </button>
                        )}
                      </div>
                      <p className="text-lg text-gray-600 italic mb-4">{example.english}</p>

                      {/* Word breakdown */}
                      {example.breakdown && example.breakdown.length > 0 && (
                        <div className="bg-white/60 rounded-lg p-4 space-y-2">
                          <p className="text-sm font-semibold text-gray-500 uppercase mb-3">Word-by-word breakdown:</p>
                          {example.breakdown.map((part, partIdx) => (
                            <div key={partIdx} className="flex items-start gap-3">
                              <span className="font-bold text-indigo-600 min-w-[80px]">{part.korean}</span>
                              <span className="text-gray-600">{part.english}</span>
                              <span className="text-xs text-gray-400 ml-auto">({part.role})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center">
        <button
          onClick={onStartExercises}
          className="w-full max-w-md bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg"
        >
          {isCompleted ? 'Practice Again →' : 'Start Exercises →'}
        </button>
      </div>
    </div>
  )
}
