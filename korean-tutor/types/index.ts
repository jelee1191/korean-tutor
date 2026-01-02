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
