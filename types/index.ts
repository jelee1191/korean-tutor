export interface Word {
  id: string
  korean: string        // 안녕하세요
  english: string       // hello (formal)
  chapter: number       // 1-20
  category: string      // greetings, verbs, etc.
  notes?: string        // usage context, example sentences
}

export interface Chapter {
  number: number
  title: string
  description: string
  wordCount: number
}

export interface UserProgress {
  wordId: string
  level: number         // 0-5 (SRS level)
  nextReview: Date
  timesCorrect: number
  timesIncorrect: number
}

export type Category =
  | 'greetings'
  | 'numbers'
  | 'food'
  | 'verbs'
  | 'adjectives'
  | 'family'
  | 'time'
  | 'places'
  | 'common-phrases'
  | 'pronouns'

// Grammar lesson types
export interface GrammarLesson {
  id: string                    // Format: 'gram-{chapter}-{number}' e.g., 'gram-01-01'
  title: string                 // e.g., "Subject Marking Particles"
  titleKorean: string           // e.g., "주격 조사"
  chapter: number               // Linked to vocabulary chapter (1-20)
  order: number                 // Order within chapter (1, 2, 3...)
  description: string           // Brief summary
  explanation: string           // Full grammar explanation (markdown supported)
  examples: GrammarExample[]    // Example sentences
  relatedWordIds: string[]      // Links to vocabulary (e.g., ['ch1-014', 'ch1-015'])
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  prerequisites?: string[]      // IDs of lessons that should come first
}

export interface GrammarExample {
  korean: string                // Full Korean sentence
  english: string               // English translation
  breakdown?: SentenceBreakdown[] // Word-by-word breakdown
  audioUrl?: string             // Optional audio (future feature)
}

export interface SentenceBreakdown {
  korean: string                // Word or particle
  english: string               // Meaning
  role: 'subject' | 'object' | 'verb' | 'particle' | 'modifier' | 'other'
}

// Exercise types
export type ExerciseType = 'multiple_choice' | 'fill_in_blank' | 'sentence_building'

export interface GrammarExercise {
  id: string                    // Format: 'ex-{lessonId}-{number}' e.g., 'ex-gram-01-01-001'
  lessonId: string              // Parent lesson ID
  type: ExerciseType
  difficulty: 1 | 2 | 3         // 1=easy, 2=medium, 3=hard
  instruction: string           // What to do
  hint?: string                 // Optional hint
}

export interface MultipleChoiceExercise extends GrammarExercise {
  type: 'multiple_choice'
  question: string              // The question or sentence with blank
  options: string[]             // 4 answer options
  correctIndex: number          // Index of correct answer (0-3)
  explanation: string           // Why this is correct
}

export interface FillInBlankExercise extends GrammarExercise {
  type: 'fill_in_blank'
  sentence: string              // Sentence with {blank} placeholder
  correctAnswer: string         // The expected answer
  acceptableAnswers?: string[]  // Alternative correct answers
  explanation: string           // Grammar explanation
}

export interface SentenceBuildingExercise extends GrammarExercise {
  type: 'sentence_building'
  words: string[]               // Scrambled words/particles
  correctOrder: number[]        // Correct indices order
  englishPrompt: string         // English sentence to translate
  explanation: string           // Why this order is correct
}

export type Exercise = MultipleChoiceExercise | FillInBlankExercise | SentenceBuildingExercise

export interface GrammarProgress {
  lessonId: string              // For lesson completion tracking
  exerciseId?: string           // For exercise SRS (null if tracking lesson only)
  level: number                 // 0-5 (SRS level)
  nextReview: Date
  timesCorrect: number
  timesIncorrect: number
  completed: boolean            // Has the lesson been read?
  lastAttemptDate?: Date
}
