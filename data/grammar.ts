import {
  GrammarLesson,
  Exercise,
  MultipleChoiceExercise,
  FillInBlankExercise,
  SentenceBuildingExercise,
  GrammarProgress
} from '@/types'

// Grammar lessons organized by chapter
export const grammarLessons: GrammarLesson[] = [
  // Chapter 1: Basic Greetings - Grammar
  {
    id: 'gram-01-01',
    title: 'Topic Particles (은/는)',
    titleKorean: '주제 조사',
    chapter: 1,
    order: 1,
    description: 'Learn how to mark the topic of a sentence',
    difficulty: 'beginner',
    explanation: `# Topic Particles: 은 and 는

In Korean, particles are attached to nouns to indicate their grammatical role. The topic particles **은** and **는** mark what the sentence is about - the topic.

## When to use which:
- **은** - After words ending with a **consonant**
- **는** - After words ending with a **vowel**

## Examples:
- 저**는** 학생입니다 (I am a student) - 저 ends with vowel ㅓ
- 이것**은** 책입니다 (This is a book) - 이것 ends with consonant ㅅ
- 선생님**은** 한국 사람입니다 (The teacher is Korean) - 선생님 ends with consonant ㅁ

## Topic vs Subject:
The topic particle indicates what we're talking about, setting the general theme of the sentence. It's different from the subject particle (이/가) which we'll learn later.`,
    examples: [
      {
        korean: '저는 학생입니다',
        english: 'I am a student',
        breakdown: [
          { korean: '저', english: 'I (humble)', role: 'subject' },
          { korean: '는', english: 'topic marker', role: 'particle' },
          { korean: '학생', english: 'student', role: 'other' },
          { korean: '입니다', english: 'am/is (formal)', role: 'verb' }
        ]
      },
      {
        korean: '이것은 책입니다',
        english: 'This is a book',
        breakdown: [
          { korean: '이것', english: 'this', role: 'subject' },
          { korean: '은', english: 'topic marker', role: 'particle' },
          { korean: '책', english: 'book', role: 'other' },
          { korean: '입니다', english: 'is (formal)', role: 'verb' }
        ]
      }
    ],
    relatedWordIds: ['ch1-014', 'ch1-015', 'ch1-024'],
  },
  {
    id: 'gram-01-02',
    title: 'The Copula (이다)',
    titleKorean: '서술격 조사',
    chapter: 1,
    order: 2,
    description: 'Learn the Korean "to be" verb for identification',
    difficulty: 'beginner',
    explanation: `# The Copula: 이다 (to be)

In Korean, 이다 is used to identify or equate things, similar to "am/is/are" in English when used with nouns.

## Formal Polite Form: 입니다
Use this in formal situations, with strangers, or people older than you.

- 저는 학생**입니다** (I am a student)
- 이것은 책**입니다** (This is a book)

## Informal Polite Form: 이에요/예요
Used in casual but polite conversation:
- **이에요** - After consonants: 학생이에요 (am a student)
- **예요** - After vowels: 의사예요 (am a doctor)

## Pattern:
[Topic]는/은 [Noun]입니다/이에요/예요`,
    examples: [
      {
        korean: '저는 미국 사람입니다',
        english: 'I am American',
        breakdown: [
          { korean: '저', english: 'I (humble)', role: 'subject' },
          { korean: '는', english: 'topic marker', role: 'particle' },
          { korean: '미국 사람', english: 'American (person)', role: 'other' },
          { korean: '입니다', english: 'am (formal)', role: 'verb' }
        ]
      }
    ],
    relatedWordIds: ['ch1-001', 'ch1-014', 'ch1-024'],
  },
  {
    id: 'gram-01-03',
    title: 'Question Words',
    titleKorean: '의문사',
    chapter: 1,
    order: 3,
    description: 'Learn basic Korean question words',
    difficulty: 'beginner',
    explanation: `# Question Words

Korean question words are straightforward and don't require word order changes like English.

## Common Question Words:
- **누구** (nugu) - who
- **무엇/뭐** (mueot/mwo) - what
- **어디** (eodi) - where
- **언제** (eonje) - when
- **왜** (wae) - why
- **어떻게** (eotteoke) - how

## Making Questions:
Simply add **?** or the polite ending **까?** to make a question:

- 이것은 무엇입니까? (What is this?)
- 누구입니까? (Who is it?)

The question word replaces the part you're asking about:
- 저는 학생입니다 → 누구입니까? (I am a student → Who is it?)`,
    examples: [
      {
        korean: '이것은 무엇입니까?',
        english: 'What is this?',
        breakdown: [
          { korean: '이것', english: 'this', role: 'subject' },
          { korean: '은', english: 'topic marker', role: 'particle' },
          { korean: '무엇', english: 'what', role: 'other' },
          { korean: '입니까', english: 'is? (formal question)', role: 'verb' }
        ]
      }
    ],
    relatedWordIds: ['ch1-030', 'ch1-031', 'ch1-032', 'ch1-033'],
  },

  // Chapter 2: Numbers - Grammar
  {
    id: 'gram-02-01',
    title: 'Native vs Sino-Korean Numbers',
    titleKorean: '고유어 수와 한자어 수',
    chapter: 2,
    order: 1,
    description: 'Learn when to use native Korean vs Chinese-origin numbers',
    difficulty: 'beginner',
    explanation: `# Two Number Systems in Korean

Korean has **two** number systems that are used in different situations:

## 1. Native Korean Numbers (하나, 둘, 셋...)
Use for:
- **Age** (with 살): 스무 살 (20 years old)
- **Hours** (with 시): 두 시 (2 o'clock)
- **Counting objects** (with counters): 사람 세 명 (3 people)
- Generally: numbers 1-99

## 2. Sino-Korean Numbers (일, 이, 삼...)
Use for:
- **Minutes** (with 분): 삼십 분 (30 minutes)
- **Money**: 천 원 (1000 won)
- **Dates**: 삼월 (March)
- **Phone numbers**: 공일공 (010)
- **Large numbers**: 100 and above

## Example:
"At 2:30" = 두 시 삼십 분
- 두 (native for hour)
- 삼십 (sino for minutes)

## Memory Tip:
Native Korean numbers are only used up to 99. After that, use Sino-Korean!`,
    examples: [
      {
        korean: '저는 스물다섯 살입니다',
        english: 'I am 25 years old',
        breakdown: [
          { korean: '저', english: 'I', role: 'subject' },
          { korean: '는', english: 'topic marker', role: 'particle' },
          { korean: '스물다섯 살', english: '25 years old (native)', role: 'other' },
          { korean: '입니다', english: 'am', role: 'verb' }
        ]
      },
      {
        korean: '이천이십오 원',
        english: '2025 won',
        breakdown: [
          { korean: '이천이십오', english: '2025 (sino-korean)', role: 'other' },
          { korean: '원', english: 'won (currency)', role: 'other' }
        ]
      }
    ],
    relatedWordIds: ['ch2-001', 'ch2-002', 'ch2-003', 'ch2-004', 'ch2-005'],
  },
  {
    id: 'gram-02-02',
    title: 'Counter Words',
    titleKorean: '단위 명사',
    chapter: 2,
    order: 2,
    description: 'Learn how to count different types of objects',
    difficulty: 'beginner',
    explanation: `# Counter Words (Classifiers)

In Korean, you can't just say "three books" - you need a **counter word** (classifier) that matches what you're counting.

## Pattern:
**[Noun] [Number] [Counter]**

## Common Counters:
- **명/분** - people (명 casual, 분 respectful)
- **개** - things, objects
- **마리** - animals
- **권** - books
- **병** - bottles
- **잔** - cups/glasses
- **장** - flat things (paper, tickets)

## Important Changes:
Native Korean numbers change before counters:
- 하나 → **한** 개 (one thing)
- 둘 → **두** 개 (two things)
- 셋 → **세** 개 (three things)
- 넷 → **네** 개 (four things)
- 스물 → **스무** 명 (20 people)

## Examples:
- 사람 세 명 (3 people)
- 책 두 권 (2 books)
- 물 한 병 (1 bottle of water)`,
    examples: [
      {
        korean: '학생 다섯 명이 있습니다',
        english: 'There are 5 students',
        breakdown: [
          { korean: '학생', english: 'student', role: 'subject' },
          { korean: '다섯 명', english: '5 (people counter)', role: 'other' },
          { korean: '이', english: 'subject marker', role: 'particle' },
          { korean: '있습니다', english: 'exist/are', role: 'verb' }
        ]
      }
    ],
    relatedWordIds: ['ch2-021', 'ch2-022', 'ch2-023', 'ch2-024'],
  },
]

// Exercises for each lesson
export const grammarExercises: Exercise[] = [
  // Exercises for gram-01-01 (Topic Particles)
  {
    id: 'ex-gram-01-01-001',
    lessonId: 'gram-01-01',
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'Choose the correct topic particle',
    question: '저___ 미국 사람입니다. (I am American)',
    options: ['은', '는', '이', '가'],
    correctIndex: 1,
    explanation: '저 ends with a vowel (ㅓ), so we use 는'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-01-01-002',
    lessonId: 'gram-01-01',
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'Choose the correct topic particle',
    question: '선생님___ 한국 사람입니다. (The teacher is Korean)',
    options: ['은', '는', '이', '가'],
    correctIndex: 0,
    explanation: '선생님 ends with a consonant (ㅁ), so we use 은'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-01-01-003',
    lessonId: 'gram-01-01',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Fill in the correct particle',
    sentence: '이것{blank} 책입니다.',
    correctAnswer: '은',
    acceptableAnswers: [],
    explanation: '이것 ends with a consonant (ㅅ), so we use 은'
  } as FillInBlankExercise,

  {
    id: 'ex-gram-01-01-004',
    lessonId: 'gram-01-01',
    type: 'sentence_building',
    difficulty: 3,
    instruction: 'Arrange the words to make a sentence',
    words: ['저', '는', '학생', '입니다'],
    correctOrder: [0, 1, 2, 3],
    englishPrompt: 'I am a student',
    explanation: 'Korean word order: Topic + topic particle + noun + copula'
  } as SentenceBuildingExercise,

  // Exercises for gram-01-02 (Copula)
  {
    id: 'ex-gram-01-02-001',
    lessonId: 'gram-01-02',
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'What is the formal ending for 이다?',
    question: '저는 의사___. (I am a doctor - formal)',
    options: ['이에요', '예요', '입니다', '이다'],
    correctIndex: 2,
    explanation: '입니다 is the formal polite form of the copula'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-01-02-002',
    lessonId: 'gram-01-02',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Complete with the formal copula',
    sentence: '이것은 책{blank}',
    correctAnswer: '입니다',
    acceptableAnswers: [],
    explanation: 'Use 입니다 for formal polite speech'
  } as FillInBlankExercise,

  {
    id: 'ex-gram-01-02-003',
    lessonId: 'gram-01-02',
    type: 'sentence_building',
    difficulty: 2,
    instruction: 'Build a complete sentence',
    words: ['저는', '미국', '사람', '입니다'],
    correctOrder: [0, 1, 2, 3],
    englishPrompt: 'I am American',
    explanation: 'Pattern: [Topic] + [Noun] + 입니다'
  } as SentenceBuildingExercise,

  // Exercises for gram-01-03 (Question Words)
  {
    id: 'ex-gram-01-03-001',
    lessonId: 'gram-01-03',
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'Choose the correct question word for "what"',
    question: 'This is what? = 이것은 ___입니까?',
    options: ['누구', '무엇', '어디', '언제'],
    correctIndex: 1,
    explanation: '무엇 means "what" in Korean'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-01-03-002',
    lessonId: 'gram-01-03',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'Choose the correct question word for "who"',
    question: 'Who are you? = ___입니까?',
    options: ['무엇', '누구', '어디', '왜'],
    correctIndex: 1,
    explanation: '누구 means "who" in Korean'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-01-03-003',
    lessonId: 'gram-01-03',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Fill in with the question word for "where"',
    sentence: '{blank}입니까? (Where is it?)',
    correctAnswer: '어디',
    acceptableAnswers: [],
    explanation: '어디 means "where" in Korean'
  } as FillInBlankExercise,

  // Exercises for gram-02-01 (Number Systems)
  {
    id: 'ex-gram-02-01-001',
    lessonId: 'gram-02-01',
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'Which number system for age?',
    question: 'To say "I am 20 years old", which numbers do you use?',
    options: ['Native Korean (하나, 둘, 셋...)', 'Sino-Korean (일, 이, 삼...)', 'Either one', 'Neither'],
    correctIndex: 0,
    explanation: 'Age uses native Korean numbers with 살'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-01-002',
    lessonId: 'gram-02-01',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'Which number system for money?',
    question: 'To say "1000 won", which numbers do you use?',
    options: ['Native Korean', 'Sino-Korean', 'Either one', 'Neither'],
    correctIndex: 1,
    explanation: 'Money uses Sino-Korean numbers'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-01-003',
    lessonId: 'gram-02-01',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'Choose the correct time expression',
    question: 'How do you say "2:30"?',
    options: ['이 시 삼십 분', '두 시 삼십 분', '이 시 서른 분', '두 시 서른 분'],
    correctIndex: 1,
    explanation: 'Hours use native (두), minutes use Sino-Korean (삼십)'
  } as MultipleChoiceExercise,

  // Exercises for gram-02-02 (Counters)
  {
    id: 'ex-gram-02-02-001',
    lessonId: 'gram-02-02',
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'Choose the correct counter for people',
    question: '학생 세 ___ (3 students)',
    options: ['개', '명', '마리', '권'],
    correctIndex: 1,
    explanation: '명 is the counter for people'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-02-002',
    lessonId: 'gram-02-02',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'What is the correct form?',
    question: 'How do you say "one thing"?',
    options: ['하나 개', '한 개', '일 개', '첫 개'],
    correctIndex: 1,
    explanation: '하나 changes to 한 before counters'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-02-003',
    lessonId: 'gram-02-02',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Fill in with the correct counter',
    sentence: '책 두 {blank} (2 books)',
    correctAnswer: '권',
    acceptableAnswers: [],
    explanation: '권 is the counter for books'
  } as FillInBlankExercise,

  {
    id: 'ex-gram-02-02-004',
    lessonId: 'gram-02-02',
    type: 'sentence_building',
    difficulty: 3,
    instruction: 'Build the sentence',
    words: ['사람', '다섯', '명', '있습니다'],
    correctOrder: [0, 1, 2, 3],
    englishPrompt: 'There are 5 people',
    explanation: 'Pattern: Noun + Number + Counter + Verb'
  } as SentenceBuildingExercise,
]

// Helper functions (following vocabulary.ts pattern)
export const getLessonsByChapter = (chapter: number): GrammarLesson[] => {
  return grammarLessons
    .filter(lesson => lesson.chapter === chapter)
    .sort((a, b) => a.order - b.order)
}

export const getLessonById = (id: string): GrammarLesson | undefined => {
  return grammarLessons.find(lesson => lesson.id === id)
}

export const getExercisesByLesson = (lessonId: string): Exercise[] => {
  return grammarExercises.filter(ex => ex.lessonId === lessonId)
}

export const getExerciseById = (id: string): Exercise | undefined => {
  return grammarExercises.find(ex => ex.id === id)
}

export const getAllGrammarLessons = (): GrammarLesson[] => {
  return grammarLessons.sort((a, b) =>
    a.chapter === b.chapter ? a.order - b.order : a.chapter - b.chapter
  )
}

export const getDueGrammarExercises = (
  progress: Record<string, GrammarProgress>
): string[] => {
  const now = new Date()
  return Object.values(progress)
    .filter(p => p.exerciseId && p.nextReview <= now)
    .map(p => p.exerciseId!)
}
