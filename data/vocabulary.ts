import { Word } from '@/types'

export const vocabulary: Word[] = [
  // Greetings (10 words)
  {
    id: 'greet-01',
    korean: '안녕하세요',
    english: 'hello (formal)',
    category: 'greetings',
    notes: 'Most common formal greeting'
  },
  {
    id: 'greet-02',
    korean: '안녕',
    english: 'hi (casual)',
    category: 'greetings',
    notes: 'Use with friends or younger people'
  },
  {
    id: 'greet-03',
    korean: '안녕히 가세요',
    english: 'goodbye (to someone leaving)',
    category: 'greetings',
    notes: 'Said by person staying'
  },
  {
    id: 'greet-04',
    korean: '안녕히 계세요',
    english: 'goodbye (when you are leaving)',
    category: 'greetings',
    notes: 'Said by person leaving'
  },
  {
    id: 'greet-05',
    korean: '감사합니다',
    english: 'thank you (formal)',
    category: 'greetings',
    notes: 'Polite thank you'
  },
  {
    id: 'greet-06',
    korean: '고맙습니다',
    english: 'thank you',
    category: 'greetings',
    notes: 'Slightly less formal than 감사합니다'
  },
  {
    id: 'greet-07',
    korean: '죄송합니다',
    english: 'I\'m sorry (formal)',
    category: 'greetings',
    notes: 'Apologizing formally'
  },
  {
    id: 'greet-08',
    korean: '미안해요',
    english: 'I\'m sorry',
    category: 'greetings',
    notes: 'Casual apology'
  },
  {
    id: 'greet-09',
    korean: '환영합니다',
    english: 'welcome',
    category: 'greetings',
    notes: 'Welcoming someone'
  },
  {
    id: 'greet-10',
    korean: '잘 지냈어요?',
    english: 'how have you been?',
    category: 'greetings',
    notes: 'Asking about someone\'s wellbeing'
  },

  // Numbers (10 words) - Native Korean numbers 1-10
  {
    id: 'num-01',
    korean: '하나',
    english: 'one',
    category: 'numbers',
    notes: 'Native Korean number'
  },
  {
    id: 'num-02',
    korean: '둘',
    english: 'two',
    category: 'numbers',
    notes: 'Native Korean number'
  },
  {
    id: 'num-03',
    korean: '셋',
    english: 'three',
    category: 'numbers',
    notes: 'Native Korean number'
  },
  {
    id: 'num-04',
    korean: '넷',
    english: 'four',
    category: 'numbers',
    notes: 'Native Korean number'
  },
  {
    id: 'num-05',
    korean: '다섯',
    english: 'five',
    category: 'numbers',
    notes: 'Native Korean number'
  },
  {
    id: 'num-06',
    korean: '여섯',
    english: 'six',
    category: 'numbers',
    notes: 'Native Korean number'
  },
  {
    id: 'num-07',
    korean: '일곱',
    english: 'seven',
    category: 'numbers',
    notes: 'Native Korean number'
  },
  {
    id: 'num-08',
    korean: '여덟',
    english: 'eight',
    category: 'numbers',
    notes: 'Native Korean number'
  },
  {
    id: 'num-09',
    korean: '아홉',
    english: 'nine',
    category: 'numbers',
    notes: 'Native Korean number'
  },
  {
    id: 'num-10',
    korean: '열',
    english: 'ten',
    category: 'numbers',
    notes: 'Native Korean number'
  },

  // Food (15 words)
  {
    id: 'food-01',
    korean: '밥',
    english: 'rice, meal',
    category: 'food',
    notes: 'Can mean cooked rice or meal in general'
  },
  {
    id: 'food-02',
    korean: '물',
    english: 'water',
    category: 'food'
  },
  {
    id: 'food-03',
    korean: '김치',
    english: 'kimchi',
    category: 'food',
    notes: 'Traditional fermented vegetables'
  },
  {
    id: 'food-04',
    korean: '고기',
    english: 'meat',
    category: 'food'
  },
  {
    id: 'food-05',
    korean: '야채',
    english: 'vegetables',
    category: 'food'
  },
  {
    id: 'food-06',
    korean: '과일',
    english: 'fruit',
    category: 'food'
  },
  {
    id: 'food-07',
    korean: '빵',
    english: 'bread',
    category: 'food'
  },
  {
    id: 'food-08',
    korean: '우유',
    english: 'milk',
    category: 'food'
  },
  {
    id: 'food-09',
    korean: '커피',
    english: 'coffee',
    category: 'food'
  },
  {
    id: 'food-10',
    korean: '차',
    english: 'tea',
    category: 'food'
  },
  {
    id: 'food-11',
    korean: '맥주',
    english: 'beer',
    category: 'food'
  },
  {
    id: 'food-12',
    korean: '소주',
    english: 'soju',
    category: 'food',
    notes: 'Traditional Korean liquor'
  },
  {
    id: 'food-13',
    korean: '국',
    english: 'soup',
    category: 'food'
  },
  {
    id: 'food-14',
    korean: '라면',
    english: 'ramen, instant noodles',
    category: 'food'
  },
  {
    id: 'food-15',
    korean: '치킨',
    english: 'fried chicken',
    category: 'food',
    notes: 'Very popular Korean-style fried chicken'
  },

  // Common Verbs (15 words)
  {
    id: 'verb-01',
    korean: '가다',
    english: 'to go',
    category: 'verbs',
    notes: 'Dictionary form'
  },
  {
    id: 'verb-02',
    korean: '오다',
    english: 'to come',
    category: 'verbs'
  },
  {
    id: 'verb-03',
    korean: '먹다',
    english: 'to eat',
    category: 'verbs'
  },
  {
    id: 'verb-04',
    korean: '마시다',
    english: 'to drink',
    category: 'verbs'
  },
  {
    id: 'verb-05',
    korean: '자다',
    english: 'to sleep',
    category: 'verbs'
  },
  {
    id: 'verb-06',
    korean: '일어나다',
    english: 'to wake up, get up',
    category: 'verbs'
  },
  {
    id: 'verb-07',
    korean: '보다',
    english: 'to see, watch',
    category: 'verbs'
  },
  {
    id: 'verb-08',
    korean: '듣다',
    english: 'to hear, listen',
    category: 'verbs'
  },
  {
    id: 'verb-09',
    korean: '말하다',
    english: 'to speak, say',
    category: 'verbs'
  },
  {
    id: 'verb-10',
    korean: '읽다',
    english: 'to read',
    category: 'verbs'
  },
  {
    id: 'verb-11',
    korean: '쓰다',
    english: 'to write',
    category: 'verbs'
  },
  {
    id: 'verb-12',
    korean: '공부하다',
    english: 'to study',
    category: 'verbs'
  },
  {
    id: 'verb-13',
    korean: '일하다',
    english: 'to work',
    category: 'verbs'
  },
  {
    id: 'verb-14',
    korean: '살다',
    english: 'to live',
    category: 'verbs'
  },
  {
    id: 'verb-15',
    korean: '사랑하다',
    english: 'to love',
    category: 'verbs'
  },

  // Adjectives (10 words)
  {
    id: 'adj-01',
    korean: '좋다',
    english: 'to be good',
    category: 'adjectives',
    notes: 'Korean adjectives are conjugated like verbs'
  },
  {
    id: 'adj-02',
    korean: '나쁘다',
    english: 'to be bad',
    category: 'adjectives'
  },
  {
    id: 'adj-03',
    korean: '크다',
    english: 'to be big',
    category: 'adjectives'
  },
  {
    id: 'adj-04',
    korean: '작다',
    english: 'to be small',
    category: 'adjectives'
  },
  {
    id: 'adj-05',
    korean: '많다',
    english: 'to be many, much',
    category: 'adjectives'
  },
  {
    id: 'adj-06',
    korean: '적다',
    english: 'to be few, little',
    category: 'adjectives'
  },
  {
    id: 'adj-07',
    korean: '예쁘다',
    english: 'to be pretty',
    category: 'adjectives'
  },
  {
    id: 'adj-08',
    korean: '잘생기다',
    english: 'to be handsome',
    category: 'adjectives'
  },
  {
    id: 'adj-09',
    korean: '재미있다',
    english: 'to be fun, interesting',
    category: 'adjectives'
  },
  {
    id: 'adj-10',
    korean: '어렵다',
    english: 'to be difficult',
    category: 'adjectives'
  },

  // Family (10 words)
  {
    id: 'fam-01',
    korean: '가족',
    english: 'family',
    category: 'family'
  },
  {
    id: 'fam-02',
    korean: '어머니',
    english: 'mother (formal)',
    category: 'family'
  },
  {
    id: 'fam-03',
    korean: '아버지',
    english: 'father (formal)',
    category: 'family'
  },
  {
    id: 'fam-04',
    korean: '엄마',
    english: 'mom',
    category: 'family',
    notes: 'Casual form'
  },
  {
    id: 'fam-05',
    korean: '아빠',
    english: 'dad',
    category: 'family',
    notes: 'Casual form'
  },
  {
    id: 'fam-06',
    korean: '형',
    english: 'older brother (for males)',
    category: 'family',
    notes: 'Used by males only'
  },
  {
    id: 'fam-07',
    korean: '누나',
    english: 'older sister (for males)',
    category: 'family',
    notes: 'Used by males only'
  },
  {
    id: 'fam-08',
    korean: '오빠',
    english: 'older brother (for females)',
    category: 'family',
    notes: 'Used by females only'
  },
  {
    id: 'fam-09',
    korean: '언니',
    english: 'older sister (for females)',
    category: 'family',
    notes: 'Used by females only'
  },
  {
    id: 'fam-10',
    korean: '동생',
    english: 'younger sibling',
    category: 'family',
    notes: 'Gender neutral'
  },

  // Time (10 words)
  {
    id: 'time-01',
    korean: '오늘',
    english: 'today',
    category: 'time'
  },
  {
    id: 'time-02',
    korean: '어제',
    english: 'yesterday',
    category: 'time'
  },
  {
    id: 'time-03',
    korean: '내일',
    english: 'tomorrow',
    category: 'time'
  },
  {
    id: 'time-04',
    korean: '지금',
    english: 'now',
    category: 'time'
  },
  {
    id: 'time-05',
    korean: '아침',
    english: 'morning',
    category: 'time'
  },
  {
    id: 'time-06',
    korean: '점심',
    english: 'lunch, noon',
    category: 'time'
  },
  {
    id: 'time-07',
    korean: '저녁',
    english: 'dinner, evening',
    category: 'time'
  },
  {
    id: 'time-08',
    korean: '밤',
    english: 'night',
    category: 'time'
  },
  {
    id: 'time-09',
    korean: '주',
    english: 'week',
    category: 'time'
  },
  {
    id: 'time-10',
    korean: '년',
    english: 'year',
    category: 'time'
  },

  // Places (10 words)
  {
    id: 'place-01',
    korean: '집',
    english: 'house, home',
    category: 'places'
  },
  {
    id: 'place-02',
    korean: '학교',
    english: 'school',
    category: 'places'
  },
  {
    id: 'place-03',
    korean: '회사',
    english: 'company, office',
    category: 'places'
  },
  {
    id: 'place-04',
    korean: '병원',
    english: 'hospital',
    category: 'places'
  },
  {
    id: 'place-05',
    korean: '식당',
    english: 'restaurant',
    category: 'places'
  },
  {
    id: 'place-06',
    korean: '가게',
    english: 'store, shop',
    category: 'places'
  },
  {
    id: 'place-07',
    korean: '은행',
    english: 'bank',
    category: 'places'
  },
  {
    id: 'place-08',
    korean: '공원',
    english: 'park',
    category: 'places'
  },
  {
    id: 'place-09',
    korean: '도서관',
    english: 'library',
    category: 'places'
  },
  {
    id: 'place-10',
    korean: '공항',
    english: 'airport',
    category: 'places'
  },

  // Pronouns (5 words)
  {
    id: 'pron-01',
    korean: '나',
    english: 'I, me (casual)',
    category: 'pronouns'
  },
  {
    id: 'pron-02',
    korean: '저',
    english: 'I, me (formal)',
    category: 'pronouns'
  },
  {
    id: 'pron-03',
    korean: '너',
    english: 'you (casual)',
    category: 'pronouns',
    notes: 'Only use with close friends or younger people'
  },
  {
    id: 'pron-04',
    korean: '우리',
    english: 'we, us, our',
    category: 'pronouns'
  },
  {
    id: 'pron-05',
    korean: '이것',
    english: 'this',
    category: 'pronouns'
  },

  // Common Phrases (10 words)
  {
    id: 'phrase-01',
    korean: '네',
    english: 'yes',
    category: 'common-phrases'
  },
  {
    id: 'phrase-02',
    korean: '아니요',
    english: 'no',
    category: 'common-phrases'
  },
  {
    id: 'phrase-03',
    korean: '괜찮아요',
    english: 'it\'s okay, I\'m fine',
    category: 'common-phrases'
  },
  {
    id: 'phrase-04',
    korean: '잘 먹겠습니다',
    english: 'I will eat well',
    category: 'common-phrases',
    notes: 'Said before eating'
  },
  {
    id: 'phrase-05',
    korean: '잘 먹었습니다',
    english: 'I ate well',
    category: 'common-phrases',
    notes: 'Said after eating'
  },
  {
    id: 'phrase-06',
    korean: '얼마예요?',
    english: 'how much is it?',
    category: 'common-phrases'
  },
  {
    id: 'phrase-07',
    korean: '어디예요?',
    english: 'where is it?',
    category: 'common-phrases'
  },
  {
    id: 'phrase-08',
    korean: '뭐예요?',
    english: 'what is it?',
    category: 'common-phrases'
  },
  {
    id: 'phrase-09',
    korean: '주세요',
    english: 'please give me',
    category: 'common-phrases',
    notes: 'Used when ordering or requesting'
  },
  {
    id: 'phrase-10',
    korean: '화이팅',
    english: 'fighting! (encouragement)',
    category: 'common-phrases',
    notes: 'Borrowed from English, means "you can do it!"'
  },
]

export const getWordsByCategory = (category: string): Word[] => {
  return vocabulary.filter(word => word.category === category)
}

export const getAllCategories = (): string[] => {
  const categories = new Set(vocabulary.map(word => word.category))
  return Array.from(categories).sort()
}

export const getWordById = (id: string): Word | undefined => {
  return vocabulary.find(word => word.id === id)
}
