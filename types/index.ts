export interface Word {
  id: string
  korean: string        // 안녕하세요
  english: string       // hello (formal)
  category: string      // greetings
  notes?: string        // usage context, example sentences
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
