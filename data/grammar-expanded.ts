import {
  GrammarLesson,
  Exercise,
  MultipleChoiceExercise,
  FillInBlankExercise,
  SentenceBuildingExercise,
  GrammarProgress
} from '@/types'

// EXPANDED Grammar lessons for Chapters 1-2
// Research-backed: 10-15 exercises per concept, progressive difficulty, varied contexts

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

In Korean, particles are small words attached to nouns to show their grammatical function. The topic particles **은** and **는** are among the most fundamental in Korean grammar.

## What is a "Topic"?

The topic is what the sentence is **about** - it sets the context or theme. Think of it as answering "Speaking of..."
- 저**는** 학생입니다 = "Speaking of me, I'm a student"
- 한국어**는** 재미있어요 = "Speaking of Korean, it's interesting"

## The Rule: Consonant vs Vowel

This is simple but requires attention to the **final sound** of the preceding word:

- **은** - After words ending with a **consonant** (받침)
  - 이것**은** (this + 은) - 것 ends with ㅅ consonant
  - 선생님**은** (teacher + 은) - 님 ends with ㅁ consonant
  - 책**은** (book + 은) - 책 ends with ㄱ consonant

- **는** - After words ending with a **vowel** (no 받침)
  - 저**는** (I + 는) - 저 ends with ㅓ vowel
  - 나**는** (I casual + 는) - 나 ends with ㅏ vowel
  - 우리**는** (we + 는) - 리 ends with ㅣ vowel

## Topic vs Subject (은/는 vs 이/가)

This is a KEY concept in Korean:
- **Topic (은/는)** = what we're talking about (broader context)
- **Subject (이/가)** = who/what is doing the action (specific actor)

Example:
- 저**는** 한국 사람입니다 (I'm Korean - general statement about me)
- 저**가** 학생입니다 (I'm the one who's a student - emphasizing "me" specifically)

For now, focus on 은/는. We'll learn 이/가 later.

## Common Patterns

1. **Self-introduction**: 저는 [name]입니다
2. **Describing things**: [thing]은/는 [description]입니다
3. **Stating facts**: [topic]은/는 [information]

## Common Mistakes to Avoid

❌ 저은 (wrong - 저 ends with vowel)
✅ 저는 (correct)

❌ 책는 (wrong - 책 ends with consonant)
✅ 책은 (correct)

## Memory Tip

Listen for the sound: If you can add another syllable smoothly without a consonant cluster, it ends in a vowel (use 는). If it feels "complete" or ends in a hard stop, it's a consonant (use 은).`,
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
      },
      {
        korean: '선생님은 한국 사람입니다',
        english: 'The teacher is Korean',
        breakdown: [
          { korean: '선생님', english: 'teacher', role: 'subject' },
          { korean: '은', english: 'topic marker', role: 'particle' },
          { korean: '한국 사람', english: 'Korean person', role: 'other' },
          { korean: '입니다', english: 'is (formal)', role: 'verb' }
        ]
      },
      {
        korean: '한국어는 재미있습니다',
        english: 'Korean is interesting',
        breakdown: [
          { korean: '한국어', english: 'Korean language', role: 'subject' },
          { korean: '는', english: 'topic marker', role: 'particle' },
          { korean: '재미있습니다', english: 'is interesting', role: 'verb' }
        ]
      },
      {
        korean: '친구는 미국 사람입니다',
        english: 'My friend is American',
        breakdown: [
          { korean: '친구', english: 'friend', role: 'subject' },
          { korean: '는', english: 'topic marker', role: 'particle' },
          { korean: '미국 사람', english: 'American person', role: 'other' },
          { korean: '입니다', english: 'is (formal)', role: 'verb' }
        ]
      }
    ],
    relatedWordIds: ['ch1-014', 'ch1-015', 'ch1-024', 'ch1-021', 'ch1-022'],
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

In Korean, **이다** is the "copula" - the verb that means "to be" when identifying or equating things. It's similar to "am/is/are" in English, but ONLY when used with nouns.

## What Does 이다 Do?

이다 connects two nouns to say "A is B":
- 저는 학생**이다** = I am a student
- 이것은 책**이다** = This is a book

**Important**: 이다 is for **nouns only**. For adjectives (happy, big, good), Korean uses different verbs.

## Three Politeness Levels

Korean has a complex honorific system. For 이다, you'll use three main forms:

### 1. Formal Polite: 입니다 / 습니다
Use with: strangers, customers, elders, formal situations
- 저는 학생**입니다** (I am a student)
- 선생님**입니다** (I am a teacher)
- 한국 사람**입니다** (I am Korean)

### 2. Informal Polite: 이에요 / 예요
Use with: friends, peers, casual but polite situations
- **이에요** after consonants: 학생**이에요**
- **예요** after vowels: 의사**예요**

Examples:
- 저는 학생**이에요** (I'm a student - casual polite)
- 저는 의사**예요** (I'm a doctor - casual polite)

### 3. Casual: 이야 / 야
Use with: close friends, younger people (not covered in detail here)

## The Pattern

**[Topic]은/는 [Noun]입니다**

Breaking it down:
1. State the topic with 은/는
2. Add the noun (what the topic is)
3. Attach 입니다 (formal) or 이에요/예요 (casual polite)

## Formal vs Informal: When to Use What?

**Use 입니다 when:**
- Meeting someone for the first time
- In business/professional settings
- Speaking to elders or authority figures
- Giving presentations
- Writing formal documents

**Use 이에요/예요 when:**
- Chatting with classmates
- Talking to friends (but being polite)
- Casual conversations with peers
- When the situation is relaxed but respectful

## Common Patterns

1. **Introducing yourself**: 저는 [name]입니다
2. **Stating your job**: 저는 [job]입니다
3. **Identifying objects**: 이것은 [noun]입니다
4. **Nationality**: 저는 [country] 사람입니다

## Common Mistakes

❌ 저는 행복입니다 (trying to use with adjective)
✅ 저는 행복해요 (adjectives need 하다 or other forms)

❌ 학생예요 (wrong - 학생 ends with consonant)
✅ 학생이에요 (correct)

❌ 의사이에요 (wrong - 의사 ends with vowel)
✅ 의사예요 (correct)`,
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
      },
      {
        korean: '선생님은 한국 사람입니다',
        english: 'The teacher is Korean',
        breakdown: [
          { korean: '선생님', english: 'teacher', role: 'subject' },
          { korean: '은', english: 'topic marker', role: 'particle' },
          { korean: '한국 사람', english: 'Korean person', role: 'other' },
          { korean: '입니다', english: 'is (formal)', role: 'verb' }
        ]
      },
      {
        korean: '친구는 학생이에요',
        english: 'My friend is a student (casual polite)',
        breakdown: [
          { korean: '친구', english: 'friend', role: 'subject' },
          { korean: '는', english: 'topic marker', role: 'particle' },
          { korean: '학생', english: 'student', role: 'other' },
          { korean: '이에요', english: 'is (casual polite)', role: 'verb' }
        ]
      },
      {
        korean: '저는 의사예요',
        english: 'I am a doctor (casual polite)',
        breakdown: [
          { korean: '저', english: 'I (humble)', role: 'subject' },
          { korean: '는', english: 'topic marker', role: 'particle' },
          { korean: '의사', english: 'doctor', role: 'other' },
          { korean: '예요', english: 'am (casual polite)', role: 'verb' }
        ]
      }
    ],
    relatedWordIds: ['ch1-001', 'ch1-014', 'ch1-024', 'ch1-037', 'ch1-038'],
  },

  {
    id: 'gram-01-03',
    title: 'Question Words',
    titleKorean: '의문사',
    chapter: 1,
    order: 3,
    description: 'Learn basic Korean question words',
    difficulty: 'beginner',
    explanation: `# Question Words (의문사)

Korean question words are remarkably straightforward compared to English. You don't need to change word order - just replace the unknown part with the question word!

## Core Question Words

### 1. 누구 (nugu) - Who
- 누구입니까? (Who is it? - formal)
- 이 사람은 누구예요? (Who is this person?)
- 누구의 책이에요? (Whose book is it?)

### 2. 무엇 / 뭐 (mueot / mwo) - What
- 무엇 = formal/written
- 뭐 = casual/spoken (more common)

Examples:
- 이것은 무엇입니까? (What is this? - formal)
- 이게 뭐예요? (What's this? - casual)

### 3. 어디 (eodi) - Where
- 어디입니까? (Where is it?)
- 어디에 있어요? (Where is it located?)
- 어디에서 왔어요? (Where are you from?)

### 4. 언제 (eonje) - When
- 언제 왔어요? (When did you come?)
- 언제입니까? (When is it?)

### 5. 왜 (wae) - Why
- 왜요? (Why? - short form)
- 왜 안 왔어요? (Why didn't you come?)

### 6. 어떻게 (eotteoke) - How
- 어떻게 해요? (How do you do it?)
- 어떻게 가요? (How do you go?)

## Making Questions: The Magic of 까?

In formal speech, add **-까?** to make questions:
- Statement: 학생입니다 (am a student)
- Question: 학생입니까? (are you a student?)

For 이다 (copula):
- 입니다 → 입니까?
- 이에요 → 이에요?

## Word Order: Super Simple!

**No word order change needed!** Just replace the unknown part:

Statement: 저는 **학생**입니다 (I am a **student**)
Question: 당신은 **누구**입니까? (You are **who**? = Who are you?)

Statement: 이것은 **책**입니다 (This is a **book**)
Question: 이것은 **무엇**입니까? (This is **what**? = What is this?)

## Politeness Levels for Questions

Formal: 무엇입니까? (What is it?)
Casual polite: 뭐예요? (What is it?)
Very casual: 뭐야? (What?)

## Common Question Patterns

1. **Identity**: 누구입니까? (Who is it?)
2. **Object identification**: 이것은 무엇입니까? (What is this?)
3. **Location**: 어디입니까? (Where is it?)
4. **Reason**: 왜요? (Why?)

## Pro Tip: Rising Intonation

Even without special question markers, rising intonation at the end can make any statement a question:
- 학생이에요? (Student? / Are you a student?)
- 한국 사람이에요? (Korean? / Are you Korean?)`,
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
      },
      {
        korean: '누구입니까?',
        english: 'Who is it?',
        breakdown: [
          { korean: '누구', english: 'who', role: 'subject' },
          { korean: '입니까', english: 'is? (formal question)', role: 'verb' }
        ]
      },
      {
        korean: '어디에 있어요?',
        english: 'Where is it?',
        breakdown: [
          { korean: '어디', english: 'where', role: 'other' },
          { korean: '에', english: 'at/in (location)', role: 'particle' },
          { korean: '있어요', english: 'exists/is', role: 'verb' }
        ]
      },
      {
        korean: '이 사람은 누구예요?',
        english: 'Who is this person?',
        breakdown: [
          { korean: '이 사람', english: 'this person', role: 'subject' },
          { korean: '은', english: 'topic marker', role: 'particle' },
          { korean: '누구', english: 'who', role: 'other' },
          { korean: '예요', english: 'is? (casual polite)', role: 'verb' }
        ]
      },
      {
        korean: '이게 뭐예요?',
        english: 'What is this? (casual)',
        breakdown: [
          { korean: '이게', english: 'this (contracted)', role: 'subject' },
          { korean: '뭐', english: 'what (casual)', role: 'other' },
          { korean: '예요', english: 'is? (casual polite)', role: 'verb' }
        ]
      }
    ],
    relatedWordIds: ['ch1-030', 'ch1-031', 'ch1-032', 'ch1-033', 'ch1-034'],
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

One of the most challenging aspects of Korean for beginners is that Korean has **TWO completely different number systems**, and you must use the right one depending on the context.

## Why Two Systems?

- **Native Korean numbers** (고유어 수): Ancient Korean counting system (하나, 둘, 셋...)
- **Sino-Korean numbers** (한자어 수): Borrowed from Chinese (일, 이, 삼...)

Think of it like English using both "one, two, three" AND "first, second, third" - except in Korean, the two systems are used for completely different purposes.

## 1. Native Korean Numbers (하나, 둘, 셋...)

**Full list 1-10:**
- 하나 (hana) = 1
- 둘 (dul) = 2
- 셋 (set) = 3
- 넷 (net) = 4
- 다섯 (daseot) = 5
- 여섯 (yeoseot) = 6
- 일곱 (ilgop) = 7
- 여덟 (yeodeol) = 8
- 아홉 (ahop) = 9
- 열 (yeol) = 10

**When to use Native Korean:**
1. **Age** (with 살)
   - 스무 살 (20 years old)
   - 스물다섯 살 (25 years old)

2. **Hours** (with 시)
   - 두 시 (2 o'clock)
   - 열한 시 (11 o'clock)

3. **Counting objects** with counters (명, 개, 마리, etc.)
   - 사람 세 명 (3 people)
   - 사과 다섯 개 (5 apples)

4. **Generally: Numbers 1-99**
   - Native Korean only goes up to 99
   - After that, you MUST use Sino-Korean

**Important**: Numbers 11-19 are combinations:
- 열하나 (11) = 열 (10) + 하나 (1)
- 열둘 (12) = 열 (10) + 둘 (2)
- 열다섯 (15) = 열 (10) + 다섯 (5)

## 2. Sino-Korean Numbers (일, 이, 삼...)

**Full list 1-10:**
- 일 (il) = 1
- 이 (i) = 2
- 삼 (sam) = 3
- 사 (sa) = 4
- 오 (o) = 5
- 육 (yuk) = 6
- 칠 (chil) = 7
- 팔 (pal) = 8
- 구 (gu) = 9
- 십 (sip) = 10

**When to use Sino-Korean:**
1. **Minutes** (with 분)
   - 삼십 분 (30 minutes)
   - 오십오 분 (55 minutes)

2. **Money** (with 원)
   - 천 원 (1,000 won)
   - 만 원 (10,000 won)

3. **Dates** (months, days)
   - 일월 (January) = month 1
   - 삼월 (March) = month 3
   - 십오일 (15th day)

4. **Phone numbers**
   - 공일공 (010) = 0-1-0

5. **Large numbers** (100+)
   - 백 (100)
   - 천 (1,000)
   - 만 (10,000)

## The Time Example: 두 시 삼십 분

This perfectly shows both systems:
- **두 시** = 2 o'clock (Native for hours)
- **삼십 분** = 30 minutes (Sino for minutes)

## Memory Tricks

**Native Korean = Human-related**
- Age, hours, counting people/things you can see

**Sino-Korean = Abstract/System**
- Money, dates, phone numbers, minutes, large numbers

**Critical Rule**: You CANNOT mix them incorrectly:
- ❌ 일 시 (wrong - using Sino for hours)
- ✅ 한 시 (correct - using Native for hours)

- ❌ 하나 분 (wrong - using Native for minutes)
- ✅ 일 분 (correct - using Sino for minutes)

## Quick Decision Guide

Ask yourself:
1. Is it age? → Native
2. Is it time (hours)? → Native
3. Is it counting visible objects? → Native
4. Is it money? → Sino
5. Is it minutes? → Sino
6. Is it a date? → Sino
7. Is it over 99? → Sino (no choice!)`,
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
      },
      {
        korean: '두 시 삼십 분',
        english: '2:30',
        breakdown: [
          { korean: '두', english: '2 (native)', role: 'other' },
          { korean: '시', english: 'o\'clock', role: 'other' },
          { korean: '삼십', english: '30 (sino)', role: 'other' },
          { korean: '분', english: 'minute', role: 'other' }
        ]
      },
      {
        korean: '학생 다섯 명',
        english: '5 students',
        breakdown: [
          { korean: '학생', english: 'student', role: 'other' },
          { korean: '다섯', english: '5 (native)', role: 'other' },
          { korean: '명', english: 'counter (people)', role: 'other' }
        ]
      },
      {
        korean: '삼월 십오일',
        english: 'March 15th',
        breakdown: [
          { korean: '삼월', english: 'March (month 3)', role: 'other' },
          { korean: '십오일', english: '15th day', role: 'other' }
        ]
      }
    ],
    relatedWordIds: ['ch2-001', 'ch2-002', 'ch2-003', 'ch2-011', 'ch2-012'],
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

In Korean, you can't just say "three books" or "two people." You need a **counter word** (also called classifier) that matches what you're counting. This is similar to English phrases like "two *sheets* of paper" or "three *head* of cattle."

## The Basic Pattern

**[Noun] + [Number] + [Counter]**

Examples:
- 사람 세 **명** (person-three-[people counter] = 3 people)
- 책 두 **권** (book-two-[book counter] = 2 books)
- 사과 다섯 **개** (apple-five-[thing counter] = 5 apples)

## Common Counters You Must Know

### 1. 명/분 - People
- **명** = casual/neutral counter for people
  - 학생 세 명 (3 students)
  - 친구 다섯 명 (5 friends)

- **분** = respectful counter for people
  - 선생님 두 분 (2 teachers)
  - 손님 세 분 (3 guests)

**Rule**: Use 분 when referring to people you should respect.

### 2. 개 - General Objects/Things
The most versatile counter - use when you're not sure:
- 사과 두 개 (2 apples)
- 의자 네 개 (4 chairs)
- 가방 한 개 (1 bag)

### 3. 마리 - Animals
- 고양이 세 마리 (3 cats)
- 개 두 마리 (2 dogs)
- 새 다섯 마리 (5 birds)

### 4. 권 - Books/Volumes
- 책 한 권 (1 book)
- 소설 두 권 (2 novels)

### 5. 병 - Bottles
- 물 한 병 (1 bottle of water)
- 맥주 두 병 (2 bottles of beer)

### 6. 잔 - Cups/Glasses
- 커피 한 잔 (1 cup of coffee)
- 물 두 잔 (2 glasses of water)

### 7. 장 - Flat Objects
- 종이 한 장 (1 sheet of paper)
- 사진 두 장 (2 photographs)
- 티켓 세 장 (3 tickets)

### 8. 대 - Vehicles/Machines
- 차 한 대 (1 car)
- 컴퓨터 두 대 (2 computers)

## CRITICAL: Number Changes Before Counters

Native Korean numbers **change form** when used with counters:

**Original → Before Counter**
- 하나 (one) → **한** 개
- 둘 (two) → **두** 개
- 셋 (three) → **세** 개
- 넷 (four) → **네** 개
- 스물 (twenty) → **스무** 명

Examples:
- ❌ 하나 개 (wrong)
- ✅ 한 개 (correct - "one thing")

- ❌ 둘 명 (wrong)
- ✅ 두 명 (correct - "two people")

**Exception**: 다섯, 여섯, 일곱, 여덟, 아홉, 열 stay the same!

## Word Order Options

You can say it two ways:

**Option 1**: [Noun] + [Number + Counter]
- 학생 세 명 (students-3-people = 3 students)
- 책 두 권 (books-2-books = 2 books)

**Option 2**: [Number + Counter] + 의 + [Noun]
- 세 명의 학생 (3-people of students = 3 students)
- 두 권의 책 (2-books of books = 2 books)

**Note**: Option 1 is more common in speech.

## Using with "있다" (to exist/have)

**[Noun] [Number] [Counter]가/이 있습니다**
- 학생 다섯 명**이** 있습니다 (There are 5 students)
- 의자 네 개**가** 있어요 (There are 4 chairs)

## Common Mistakes

❌ 세 사람 (trying to count without a counter)
✅ 세 명 or 사람 세 명 (using the proper counter)

❌ 하나 명 (not changing 하나 to 한)
✅ 한 명 (correct form)

❌ 책 이 개 (using Sino-Korean numbers with counters)
✅ 책 두 개 (use Native Korean with counters)

## Memory Tip: Matching Counters

Think about the **shape or category**:
- People/animals → living things (명/분, 마리)
- Flat things → 장
- Containers → 병, 잔
- Written materials → 권

When in doubt, use 개 (it works for most physical objects)!`,
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
      },
      {
        korean: '사과 세 개 주세요',
        english: 'Give me 3 apples please',
        breakdown: [
          { korean: '사과', english: 'apple', role: 'object' },
          { korean: '세 개', english: '3 (thing counter)', role: 'other' },
          { korean: '주세요', english: 'please give', role: 'verb' }
        ]
      },
      {
        korean: '책 두 권',
        english: '2 books',
        breakdown: [
          { korean: '책', english: 'book', role: 'other' },
          { korean: '두', english: '2 (native)', role: 'other' },
          { korean: '권', english: 'counter (books)', role: 'other' }
        ]
      },
      {
        korean: '커피 한 잔 주세요',
        english: 'One cup of coffee please',
        breakdown: [
          { korean: '커피', english: 'coffee', role: 'object' },
          { korean: '한 잔', english: '1 cup', role: 'other' },
          { korean: '주세요', english: 'please give', role: 'verb' }
        ]
      },
      {
        korean: '고양이 네 마리',
        english: '4 cats',
        breakdown: [
          { korean: '고양이', english: 'cat', role: 'other' },
          { korean: '네', english: '4 (native)', role: 'other' },
          { korean: '마리', english: 'counter (animals)', role: 'other' }
        ]
      }
    ],
    relatedWordIds: ['ch2-021', 'ch2-022', 'ch2-023', 'ch2-024', 'ch2-025'],
  },
  {
    id: 'gram-02-03',
    title: 'Telling Time in Korean',
    titleKorean: '시간 말하기',
    chapter: 2,
    order: 3,
    description: 'Learn how to tell time using both number systems',
    difficulty: 'beginner',
    explanation: `# Telling Time in Korean

Telling time in Korean perfectly demonstrates why you need to master BOTH number systems - you'll use both in a single time expression!

## The Basic Pattern

**[Native Number] + 시 + [Sino Number] + 분**

- 시 (shi) = o'clock/hour
- 분 (bun) = minute

## Hours: Native Korean Only

Use Native Korean numbers (1-12) with 시:

**1:00 - 12:00**
- 한 시 (1 o'clock) - NOT 일 시
- 두 시 (2 o'clock)
- 세 시 (3 o'clock)
- 네 시 (4 o'clock)
- 다섯 시 (5 o'clock)
- 여섯 시 (6 o'clock)
- 일곱 시 (7 o'clock)
- 여덟 시 (8 o'clock)
- 아홉 시 (9 o'clock)
- 열 시 (10 o'clock)
- 열한 시 (11 o'clock)
- 열두 시 (12 o'clock)

## Minutes: Sino-Korean Only

Use Sino-Korean numbers (0-59) with 분:
- 일 분 (1 minute)
- 오 분 (5 minutes)
- 십 분 (10 minutes)
- 이십 분 (20 minutes)
- 삼십 분 (30 minutes)
- 사십 분 (40 minutes)
- 오십 분 (50 minutes)

## Combining Hours and Minutes

**Examples:**
- 2:15 = 두 시 십오 분
  - 두 (Native 2) + 시
  - 십오 (Sino 15) + 분

- 7:30 = 일곱 시 삼십 분
  - 일곱 (Native 7) + 시
  - 삼십 (Sino 30) + 분

- 11:45 = 열한 시 사십오 분
  - 열한 (Native 11) + 시
  - 사십오 (Sino 45) + 분

## Shortcuts and Alternatives

### Half Past (30 minutes)
- 반 (ban) = half
- 두 시 반 = 2:30 (instead of 두 시 삼십 분)
- 일곱 시 반 = 7:30

### On the hour
You can drop 분 when it's exactly on the hour:
- 세 시 = 3:00 (instead of 세 시 영 분)

### Minutes before the hour
- [Sino number] 분 전 = [number] minutes before
- 두 시 십 분 전 = 10 minutes before 2 = 1:50

## AM/PM

**오전** (ojeon) = AM/morning
**오후** (ohu) = PM/afternoon

- 오전 아홉 시 = 9:00 AM
- 오후 세 시 = 3:00 PM
- 오후 열한 시 삼십 분 = 11:30 PM

## Common Patterns

**What time is it?**
- 지금 몇 시예요? (What time is it now?)

**At what time?**
- 몇 시에? (At what time?)

**At [time]**
- [time] + 에
- 두 시에 (at 2 o'clock)
- 세 시 반에 (at 3:30)

## Examples in Context

1. **몇 시에 만나요?** (What time should we meet?)
   - 세 시에 만나요 (Let's meet at 3)

2. **지금 몇 시예요?** (What time is it now?)
   - 지금 다섯 시 십오 분이에요 (It's 5:15 now)

3. **수업이 몇 시에 시작해요?** (What time does class start?)
   - 오전 아홉 시에 시작해요 (It starts at 9 AM)

## Common Mistakes

❌ 일 시 (using Sino for hours)
✅ 한 시 (using Native for hours)

❌ 두 시 하나 분 (using Native for minutes)
✅ 두 시 일 분 (using Sino for minutes)

❌ 이 시 삼십 분 (mixing wrong)
✅ 두 시 삼십 분 (correct mix)

## Pro Tips

1. **Always use Native for hours** (1-12)
2. **Always use Sino for minutes** (0-59)
3. **Learn 반 (half)** - it's used constantly
4. **Practice common times**:
   - 아홉 시 (9:00 - work/school start)
   - 열두 시 (12:00 - lunch time)
   - 여섯 시 (6:00 - dinner time)`,
    examples: [
      {
        korean: '두 시 삼십 분',
        english: '2:30',
        breakdown: [
          { korean: '두', english: '2 (native)', role: 'other' },
          { korean: '시', english: 'o\'clock', role: 'other' },
          { korean: '삼십', english: '30 (sino)', role: 'other' },
          { korean: '분', english: 'minute', role: 'other' }
        ]
      },
      {
        korean: '오후 일곱 시 십오 분',
        english: '7:15 PM',
        breakdown: [
          { korean: '오후', english: 'PM', role: 'other' },
          { korean: '일곱', english: '7 (native)', role: 'other' },
          { korean: '시', english: 'o\'clock', role: 'other' },
          { korean: '십오', english: '15 (sino)', role: 'other' },
          { korean: '분', english: 'minute', role: 'other' }
        ]
      },
      {
        korean: '열한 시 반',
        english: '11:30',
        breakdown: [
          { korean: '열한', english: '11 (native)', role: 'other' },
          { korean: '시', english: 'o\'clock', role: 'other' },
          { korean: '반', english: 'half (30 min)', role: 'other' }
        ]
      },
      {
        korean: '지금 몇 시예요?',
        english: 'What time is it now?',
        breakdown: [
          { korean: '지금', english: 'now', role: 'other' },
          { korean: '몇', english: 'what/how many', role: 'other' },
          { korean: '시', english: 'o\'clock', role: 'other' },
          { korean: '예요', english: 'is (casual polite)', role: 'verb' }
        ]
      },
      {
        korean: '세 시에 만나요',
        english: 'Let\'s meet at 3 o\'clock',
        breakdown: [
          { korean: '세', english: '3 (native)', role: 'other' },
          { korean: '시', english: 'o\'clock', role: 'other' },
          { korean: '에', english: 'at (time marker)', role: 'particle' },
          { korean: '만나요', english: 'meet (polite)', role: 'verb' }
        ]
      }
    ],
    relatedWordIds: ['ch4-001', 'ch4-002', 'ch4-006', 'ch4-007', 'ch4-040'],
  },
]

// ============================================================================
// EXERCISES - Research-backed: 10-15 exercises per concept for mastery
// Progressive difficulty, varied exercise types, contextual learning
// ============================================================================

export const grammarExercises: Exercise[] = [
  // ========================================
  // LESSON 1: Topic Particles (은/는) - 12 exercises
  // ========================================

  // Basic recognition exercises (difficulty 1)
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
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'Choose the correct topic particle',
    question: '친구___ 학생입니다. (My friend is a student)',
    options: ['은', '는', '이', '가'],
    correctIndex: 1,
    explanation: '친구 ends with a vowel (ㅜ), so we use 는'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-01-01-004',
    lessonId: 'gram-01-01',
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'Choose the correct topic particle',
    question: '책___ 재미있습니다. (The book is interesting)',
    options: ['은', '는', '이', '가'],
    correctIndex: 0,
    explanation: '책 ends with a consonant (ㄱ), so we use 은'
  } as MultipleChoiceExercise,

  // Fill-in-the-blank exercises (difficulty 2)
  {
    id: 'ex-gram-01-01-005',
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
    id: 'ex-gram-01-01-006',
    lessonId: 'gram-01-01',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Fill in the correct particle',
    sentence: '나{blank} 의사입니다.',
    correctAnswer: '는',
    acceptableAnswers: [],
    explanation: '나 ends with a vowel (ㅏ), so we use 는'
  } as FillInBlankExercise,

  {
    id: 'ex-gram-01-01-007',
    lessonId: 'gram-01-01',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Fill in the correct particle',
    sentence: '한국어{blank} 어렵습니다.',
    correctAnswer: '는',
    acceptableAnswers: [],
    explanation: '한국어 ends with a vowel (ㅓ), so we use 는'
  } as FillInBlankExercise,

  {
    id: 'ex-gram-01-01-008',
    lessonId: 'gram-01-01',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Fill in the correct particle',
    sentence: '학교{blank} 크습니다.',
    correctAnswer: '는',
    acceptableAnswers: [],
    explanation: '학교 ends with a vowel (ㅗ), so we use 는'
  } as FillInBlankExercise,

  // Sentence building exercises (difficulty 3)
  {
    id: 'ex-gram-01-01-009',
    lessonId: 'gram-01-01',
    type: 'sentence_building',
    difficulty: 3,
    instruction: 'Arrange the words to make a sentence',
    words: ['저', '는', '학생', '입니다', '이', '선생님'],
    correctOrder: [0, 1, 2, 3],
    englishPrompt: 'I am a student',
    explanation: 'Pattern: Topic + 는 + noun + 입니다'
  } as SentenceBuildingExercise,

  {
    id: 'ex-gram-01-01-010',
    lessonId: 'gram-01-01',
    type: 'sentence_building',
    difficulty: 3,
    instruction: 'Arrange the words to make a sentence',
    words: ['이것', '은', '사과', '입니다', '는', '바나나'],
    correctOrder: [0, 1, 2, 3],
    englishPrompt: 'This is an apple',
    explanation: 'Pattern: Topic + 은 + noun + 입니다 (이것 ends with consonant)'
  } as SentenceBuildingExercise,

  // Advanced recognition (difficulty 2-3)
  {
    id: 'ex-gram-01-01-011',
    lessonId: 'gram-01-01',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'Choose the correct topic particle',
    question: '컴퓨터___ 비쌉니다. (The computer is expensive)',
    options: ['은', '는', '이', '가'],
    correctIndex: 1,
    explanation: '컴퓨터 ends with a vowel (ㅓ), so we use 는'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-01-01-012',
    lessonId: 'gram-01-01',
    type: 'multiple_choice',
    difficulty: 3,
    instruction: 'Which sentence is correct?',
    question: 'How do you say "The movie is fun"?',
    options: ['영화는 재미있습니다', '영화은 재미있습니다', '영화가 재미있습니다', '영화이 재미있습니다'],
    correctIndex: 0,
    explanation: '영화 ends with a vowel (ㅏ), so we use 는 for the topic particle'
  } as MultipleChoiceExercise,

  // ========================================
  // LESSON 2: The Copula (이다) - 12 exercises
  // ========================================

  // Basic formal form exercises (difficulty 1)
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
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'Choose the correct copula form',
    question: '이것은 책___. (This is a book - formal)',
    options: ['이다', '입니다', '이에요', '예요'],
    correctIndex: 1,
    explanation: 'Use 입니다 for formal polite identification'
  } as MultipleChoiceExercise,

  // Informal polite form exercises (difficulty 2)
  {
    id: 'ex-gram-01-02-003',
    lessonId: 'gram-01-02',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'Choose the correct informal polite ending',
    question: '저는 학생___. (I am a student - casual polite)',
    options: ['입니다', '이에요', '예요', '이다'],
    correctIndex: 1,
    explanation: '학생 ends with consonant (ㄴ), so use 이에요 for casual polite'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-01-02-004',
    lessonId: 'gram-01-02',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'Choose the correct informal polite ending',
    question: '저는 의사___. (I am a doctor - casual polite)',
    options: ['입니다', '이에요', '예요', '이다'],
    correctIndex: 2,
    explanation: '의사 ends with vowel (ㅏ), so use 예요 for casual polite'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-01-02-005',
    lessonId: 'gram-01-02',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'Choose the correct informal polite ending',
    question: '친구는 선생님___. (My friend is a teacher - casual polite)',
    options: ['입니다', '이에요', '예요', '이다'],
    correctIndex: 1,
    explanation: '선생님 ends with consonant (ㅁ), so use 이에요'
  } as MultipleChoiceExercise,

  // Fill-in-the-blank exercises (difficulty 2)
  {
    id: 'ex-gram-01-02-006',
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
    id: 'ex-gram-01-02-007',
    lessonId: 'gram-01-02',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Complete with casual polite copula',
    sentence: '저는 한국 사람{blank}',
    correctAnswer: '이에요',
    acceptableAnswers: [],
    explanation: '사람 ends with ㅁ (consonant), so use 이에요'
  } as FillInBlankExercise,

  {
    id: 'ex-gram-01-02-008',
    lessonId: 'gram-01-02',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Complete with casual polite copula',
    sentence: '이것은 카메라{blank}',
    correctAnswer: '예요',
    acceptableAnswers: [],
    explanation: '카메라 ends with ㅏ (vowel), so use 예요'
  } as FillInBlankExercise,

  // Sentence building exercises (difficulty 2-3)
  {
    id: 'ex-gram-01-02-009',
    lessonId: 'gram-01-02',
    type: 'sentence_building',
    difficulty: 2,
    instruction: 'Build a complete sentence',
    words: ['저는', '미국', '사람', '입니다', '한국', '이에요'],
    correctOrder: [0, 1, 2, 3],
    englishPrompt: 'I am American (formal)',
    explanation: 'Pattern: Topic + noun + 입니다 (formal)'
  } as SentenceBuildingExercise,

  {
    id: 'ex-gram-01-02-010',
    lessonId: 'gram-01-02',
    type: 'sentence_building',
    difficulty: 3,
    instruction: 'Build a complete sentence',
    words: ['친구는', '학생', '이에요', '입니다', '의사', '예요'],
    correctOrder: [0, 1, 2],
    englishPrompt: 'My friend is a student (casual polite)',
    explanation: '학생 ends with consonant, so use 이에요'
  } as SentenceBuildingExercise,

  // Mixed difficulty exercises
  {
    id: 'ex-gram-01-02-011',
    lessonId: 'gram-01-02',
    type: 'multiple_choice',
    difficulty: 3,
    instruction: 'Which is the most appropriate?',
    question: 'When meeting your friend\'s parents for the first time, how should you say "I am a student"?',
    options: ['저는 학생이야', '저는 학생이에요', '저는 학생입니다', '나는 학생이다'],
    correctIndex: 2,
    explanation: 'Use formal 입니다 when meeting elders or in formal situations'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-01-02-012',
    lessonId: 'gram-01-02',
    type: 'multiple_choice',
    difficulty: 3,
    instruction: 'Which sentence is grammatically correct?',
    question: 'How do you say "This is a camera" (casual polite)?',
    options: ['이것은 카메라이에요', '이것은 카메라예요', '이것은 카메라입니다', '이것은 카메라이다'],
    correctIndex: 1,
    explanation: '카메라 ends with vowel (ㅏ), so use 예요'
  } as MultipleChoiceExercise,

  // ========================================
  // LESSON 3: Question Words - 12 exercises
  // ========================================

  // Basic question word recognition (difficulty 1)
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
    difficulty: 1,
    instruction: 'Choose the correct question word for "who"',
    question: 'Who are you? = ___입니까?',
    options: ['무엇', '누구', '어디', '왜'],
    correctIndex: 1,
    explanation: '누구 means "who" in Korean'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-01-03-003',
    lessonId: 'gram-01-03',
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'Choose the correct question word for "where"',
    question: 'Where is it? = ___입니까?',
    options: ['누구', '무엇', '어디', '언제'],
    correctIndex: 2,
    explanation: '어디 means "where" in Korean'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-01-03-004',
    lessonId: 'gram-01-03',
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'Choose the correct question word for "when"',
    question: 'When is it? = ___입니까?',
    options: ['어디', '언제', '왜', '어떻게'],
    correctIndex: 1,
    explanation: '언제 means "when" in Korean'
  } as MultipleChoiceExercise,

  // Fill-in-the-blank exercises (difficulty 2)
  {
    id: 'ex-gram-01-03-005',
    lessonId: 'gram-01-03',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Fill in with the question word for "where"',
    sentence: '{blank}입니까? (Where is it?)',
    correctAnswer: '어디',
    acceptableAnswers: [],
    explanation: '어디 means "where" in Korean'
  } as FillInBlankExercise,

  {
    id: 'ex-gram-01-03-006',
    lessonId: 'gram-01-03',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Fill in with the question word for "why"',
    sentence: '{blank}요? (Why?)',
    correctAnswer: '왜',
    acceptableAnswers: [],
    explanation: '왜 means "why" in Korean'
  } as FillInBlankExercise,

  {
    id: 'ex-gram-01-03-007',
    lessonId: 'gram-01-03',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Fill in with the question word for "what"',
    sentence: '이것은 {blank}입니까?',
    correctAnswer: '무엇',
    acceptableAnswers: ['뭐'],
    explanation: '무엇 (or 뭐 for casual) means "what"'
  } as FillInBlankExercise,

  {
    id: 'ex-gram-01-03-008',
    lessonId: 'gram-01-03',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Fill in with the question word for "who"',
    sentence: '이 사람은 {blank}예요?',
    correctAnswer: '누구',
    acceptableAnswers: [],
    explanation: '누구 means "who" in Korean'
  } as FillInBlankExercise,

  // Context and usage exercises (difficulty 2-3)
  {
    id: 'ex-gram-01-03-009',
    lessonId: 'gram-01-03',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'Choose the correct question',
    question: 'How do you ask "How do you do it?" in Korean?',
    options: ['왜 해요?', '언제 해요?', '어떻게 해요?', '어디에서 해요?'],
    correctIndex: 2,
    explanation: '어떻게 means "how" in Korean'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-01-03-010',
    lessonId: 'gram-01-03',
    type: 'multiple_choice',
    difficulty: 3,
    instruction: 'Choose the appropriate question',
    question: 'Someone says "저는 학생입니다". What question were they answering?',
    options: ['어디입니까?', '누구입니까?', '무엇입니까?', '언제입니까?'],
    correctIndex: 1,
    explanation: 'They were answering "Who are you?" (누구입니까?)'
  } as MultipleChoiceExercise,

  // Sentence building (difficulty 3)
  {
    id: 'ex-gram-01-03-011',
    lessonId: 'gram-01-03',
    type: 'sentence_building',
    difficulty: 3,
    instruction: 'Build the question',
    words: ['이것은', '무엇', '입니까', '누구', '어디', '예요'],
    correctOrder: [0, 1, 2],
    englishPrompt: 'What is this? (formal)',
    explanation: 'Pattern: Topic + question word + 입니까'
  } as SentenceBuildingExercise,

  {
    id: 'ex-gram-01-03-012',
    lessonId: 'gram-01-03',
    type: 'multiple_choice',
    difficulty: 3,
    instruction: 'What\'s the casual form?',
    question: 'How do you ask "What is this?" casually?',
    options: ['이것은 무엇입니까?', '이게 뭐예요?', '이것은 누구예요?', '이게 어디예요?'],
    correctIndex: 1,
    explanation: '이게 뭐예요? is the casual polite way to ask "What is this?"'
  } as MultipleChoiceExercise,

  // ========================================
  // LESSON 4: Number Systems - 12 exercises
  // ========================================

  // Basic system recognition (difficulty 1)
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
    difficulty: 1,
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
    difficulty: 1,
    instruction: 'Which number system for hours?',
    question: 'To say "3 o\'clock", which numbers do you use?',
    options: ['Native Korean', 'Sino-Korean', 'Either one', 'Neither'],
    correctIndex: 0,
    explanation: 'Hours use native Korean numbers'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-01-004',
    lessonId: 'gram-02-01',
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'Which number system for minutes?',
    question: 'To say "30 minutes", which numbers do you use?',
    options: ['Native Korean', 'Sino-Korean', 'Either one', 'Neither'],
    correctIndex: 1,
    explanation: 'Minutes use Sino-Korean numbers'
  } as MultipleChoiceExercise,

  // Application exercises (difficulty 2)
  {
    id: 'ex-gram-02-01-005',
    lessonId: 'gram-02-01',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'Choose the correct time expression',
    question: 'How do you say "2:30"?',
    options: ['이 시 삼십 분', '두 시 삼십 분', '이 시 서른 분', '두 시 서른 분'],
    correctIndex: 1,
    explanation: 'Hours use native (두), minutes use Sino-Korean (삼십)'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-01-006',
    lessonId: 'gram-02-01',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'Choose the correct expression',
    question: 'How do you say "I am 15 years old"?',
    options: ['저는 십오 살입니다', '저는 열다섯 살입니다', '저는 일오 살입니다', '저는 하나다섯 살입니다'],
    correctIndex: 1,
    explanation: 'Age uses native Korean: 열다섯 (15)'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-01-007',
    lessonId: 'gram-02-01',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'Choose the correct expression',
    question: 'How do you say "5000 won"?',
    options: ['다섯천 원', '오천 원', '다섯 천 원', '오 천 원'],
    correctIndex: 1,
    explanation: 'Money uses Sino-Korean: 오천 (5000)'
  } as MultipleChoiceExercise,

  // Fill-in-the-blank (difficulty 2-3)
  {
    id: 'ex-gram-02-01-008',
    lessonId: 'gram-02-01',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Fill in with the correct number word',
    sentence: '저는 {blank} 살입니다. (I am 10 years old)',
    correctAnswer: '열',
    acceptableAnswers: [],
    explanation: 'Use native Korean 열 (10) for age'
  } as FillInBlankExercise,

  {
    id: 'ex-gram-02-01-009',
    lessonId: 'gram-02-01',
    type: 'fill_in_blank',
    difficulty: 3,
    instruction: 'Fill in with the correct number',
    sentence: '{blank} 시 십오 분 (3:15)',
    correctAnswer: '세',
    acceptableAnswers: [],
    explanation: 'Use native Korean 세 (3) for hours'
  } as FillInBlankExercise,

  // Advanced mixed exercises (difficulty 3)
  {
    id: 'ex-gram-02-01-010',
    lessonId: 'gram-02-01',
    type: 'multiple_choice',
    difficulty: 3,
    instruction: 'Which is correct?',
    question: 'How do you say "11:45"?',
    options: ['십일 시 사십오 분', '열한 시 사십오 분', '열하나 시 마흔다섯 분', '십일 시 마흔다섯 분'],
    correctIndex: 1,
    explanation: 'Hours: native 열한 (11), minutes: Sino 사십오 (45)'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-01-011',
    lessonId: 'gram-02-01',
    type: 'multiple_choice',
    difficulty: 3,
    instruction: 'Choose the correct expression',
    question: 'How do you say "March 15th"?',
    options: ['세월 열다섯일', '삼월 십오일', '세월 십오일', '삼월 열다섯일'],
    correctIndex: 1,
    explanation: 'Dates use Sino-Korean: 삼월 (March) 십오일 (15th)'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-01-012',
    lessonId: 'gram-02-01',
    type: 'sentence_building',
    difficulty: 3,
    instruction: 'Build the sentence',
    words: ['저는', '스물', '살입니다', '이십', '세', '네'],
    correctOrder: [0, 1, 2],
    englishPrompt: 'I am 20 years old',
    explanation: 'Use native Korean 스물 (20) with 살 for age'
  } as SentenceBuildingExercise,

  // ========================================
  // LESSON 5: Counter Words - 12 exercises
  // ========================================

  // Basic counter recognition (difficulty 1)
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
    difficulty: 1,
    instruction: 'Choose the correct counter for animals',
    question: '고양이 두 ___ (2 cats)',
    options: ['개', '명', '마리', '권'],
    correctIndex: 2,
    explanation: '마리 is the counter for animals'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-02-003',
    lessonId: 'gram-02-02',
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'Choose the correct counter for books',
    question: '책 한 ___ (1 book)',
    options: ['개', '명', '마리', '권'],
    correctIndex: 3,
    explanation: '권 is the counter for books'
  } as MultipleChoiceExercise,

  // Number changes before counters (difficulty 2)
  {
    id: 'ex-gram-02-02-004',
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
    id: 'ex-gram-02-02-005',
    lessonId: 'gram-02-02',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'What is the correct form?',
    question: 'How do you say "two people"?',
    options: ['둘 명', '두 명', '이 명', '듀 명'],
    correctIndex: 1,
    explanation: '둘 changes to 두 before counters'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-02-006',
    lessonId: 'gram-02-02',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'What is the correct form?',
    question: 'How do you say "four cats"?',
    options: ['넷 마리', '네 마리', '사 마리', '사마리'],
    correctIndex: 1,
    explanation: '넷 changes to 네 before counters'
  } as MultipleChoiceExercise,

  // Fill-in-the-blank exercises (difficulty 2)
  {
    id: 'ex-gram-02-02-007',
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
    id: 'ex-gram-02-02-008',
    lessonId: 'gram-02-02',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Fill in with the correct counter',
    sentence: '물 한 {blank} (1 bottle of water)',
    correctAnswer: '병',
    acceptableAnswers: [],
    explanation: '병 is the counter for bottles'
  } as FillInBlankExercise,

  {
    id: 'ex-gram-02-02-009',
    lessonId: 'gram-02-02',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Fill in with the correct number + counter',
    sentence: '커피 {blank} (one cup of coffee)',
    correctAnswer: '한 잔',
    acceptableAnswers: [],
    explanation: '한 (changed from 하나) + 잔 (cup counter)'
  } as FillInBlankExercise,

  // Sentence building and advanced (difficulty 3)
  {
    id: 'ex-gram-02-02-010',
    lessonId: 'gram-02-02',
    type: 'sentence_building',
    difficulty: 3,
    instruction: 'Build the sentence',
    words: ['사람', '다섯', '명', '있습니다', '개', '여섯'],
    correctOrder: [0, 1, 2, 3],
    englishPrompt: 'There are 5 people',
    explanation: 'Pattern: Noun + number + counter + verb'
  } as SentenceBuildingExercise,

  {
    id: 'ex-gram-02-02-011',
    lessonId: 'gram-02-02',
    type: 'multiple_choice',
    difficulty: 3,
    instruction: 'Which is correct?',
    question: 'How do you say "3 sheets of paper"?',
    options: ['종이 셋 개', '종이 세 개', '종이 세 장', '종이 삼 장'],
    correctIndex: 2,
    explanation: '장 is the counter for flat objects, 세 is the correct form'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-02-012',
    lessonId: 'gram-02-02',
    type: 'multiple_choice',
    difficulty: 3,
    instruction: 'Choose the respectful form',
    question: 'How do you say "2 teachers" (respectful)?',
    options: ['선생님 두 명', '선생님 두 분', '선생님 이 명', '선생님 이 분'],
    correctIndex: 1,
    explanation: '분 is the respectful counter for people, used for teachers'
  } as MultipleChoiceExercise,

  // ========================================
  // LESSON 6: Telling Time - 12 exercises
  // ========================================

  // Basic hours (difficulty 1)
  {
    id: 'ex-gram-02-03-001',
    lessonId: 'gram-02-03',
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'Choose the correct way to say the hour',
    question: 'How do you say "1 o\'clock"?',
    options: ['일 시', '한 시', '하나 시', '일시'],
    correctIndex: 1,
    explanation: 'Use native Korean 한 시 (not Sino-Korean 일)'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-03-002',
    lessonId: 'gram-02-03',
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'Choose the correct way to say the hour',
    question: 'How do you say "5 o\'clock"?',
    options: ['오 시', '다섯 시', '닷 시', '오시'],
    correctIndex: 1,
    explanation: 'Use native Korean 다섯 시 for hours'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-03-003',
    lessonId: 'gram-02-03',
    type: 'multiple_choice',
    difficulty: 1,
    instruction: 'Choose the correct way to say minutes',
    question: 'How do you say "10 minutes"?',
    options: ['열 분', '십 분', '열분', '십분'],
    correctIndex: 1,
    explanation: 'Use Sino-Korean 십 분 (not native 열) for minutes'
  } as MultipleChoiceExercise,

  // Combined time expressions (difficulty 2)
  {
    id: 'ex-gram-02-03-004',
    lessonId: 'gram-02-03',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'Choose the correct time',
    question: 'How do you say "3:15"?',
    options: ['삼 시 십오 분', '세 시 십오 분', '세 시 열다섯 분', '삼 시 열다섯 분'],
    correctIndex: 1,
    explanation: 'Hours: native 세, minutes: Sino 십오'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-03-005',
    lessonId: 'gram-02-03',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'Choose the correct time',
    question: 'How do you say "7:45"?',
    options: ['일곱 시 사십오 분', '칠 시 사십오 분', '일곱 시 마흔다섯 분', '칠 시 마흔다섯 분'],
    correctIndex: 0,
    explanation: 'Hours: native 일곱, minutes: Sino 사십오'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-03-006',
    lessonId: 'gram-02-03',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'Choose the correct time',
    question: 'How do you say "2:30"?',
    options: ['이 시 삼십 분', '두 시 삼십 분', '두 시 반', '이 시 반'],
    correctIndex: 2,
    explanation: '두 시 반 uses 반 (half) as a shortcut for 30 minutes'
  } as MultipleChoiceExercise,

  // Fill-in-the-blank (difficulty 2)
  {
    id: 'ex-gram-02-03-007',
    lessonId: 'gram-02-03',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Fill in the hour',
    sentence: '{blank} 시 (12 o\'clock)',
    correctAnswer: '열두',
    acceptableAnswers: [],
    explanation: 'Use native Korean 열두 (12) for hours'
  } as FillInBlankExercise,

  {
    id: 'ex-gram-02-03-008',
    lessonId: 'gram-02-03',
    type: 'fill_in_blank',
    difficulty: 2,
    instruction: 'Fill in the minutes',
    sentence: '세 시 {blank} 분 (3:25)',
    correctAnswer: '이십오',
    acceptableAnswers: [],
    explanation: 'Use Sino-Korean 이십오 (25) for minutes'
  } as FillInBlankExercise,

  // AM/PM exercises (difficulty 2-3)
  {
    id: 'ex-gram-02-03-009',
    lessonId: 'gram-02-03',
    type: 'multiple_choice',
    difficulty: 2,
    instruction: 'Choose the correct expression',
    question: 'How do you say "9:00 AM"?',
    options: ['오전 구 시', '오전 아홉 시', '오후 아홉 시', '오후 구 시'],
    correctIndex: 1,
    explanation: '오전 (AM) + native 아홉 시'
  } as MultipleChoiceExercise,

  {
    id: 'ex-gram-02-03-010',
    lessonId: 'gram-02-03',
    type: 'fill_in_blank',
    difficulty: 3,
    instruction: 'Fill in the complete time',
    sentence: '{blank} (7:30 PM)',
    correctAnswer: '오후 일곱 시 반',
    acceptableAnswers: ['오후 일곱 시 삼십 분'],
    explanation: '오후 (PM) + 일곱 시 반 (or 일곱 시 삼십 분)'
  } as FillInBlankExercise,

  // Sentence building (difficulty 3)
  {
    id: 'ex-gram-02-03-011',
    lessonId: 'gram-02-03',
    type: 'sentence_building',
    difficulty: 3,
    instruction: 'Build the time expression',
    words: ['오전', '열한', '시', '십오', '분', '오후'],
    correctOrder: [0, 1, 2, 3, 4],
    englishPrompt: '11:15 AM',
    explanation: 'Pattern: 오전 + native hour + 시 + Sino minutes + 분'
  } as SentenceBuildingExercise,

  {
    id: 'ex-gram-02-03-012',
    lessonId: 'gram-02-03',
    type: 'multiple_choice',
    difficulty: 3,
    instruction: 'Choose the complete question and answer',
    question: 'A: 지금 몇 시예요? B: ___',
    options: ['지금 세 시입니다', '세 시예요', '오후 세 시 이십 분이에요', '다 맞음 (all correct)'],
    correctIndex: 3,
    explanation: 'All are grammatically correct ways to answer "What time is it?"'
  } as MultipleChoiceExercise,
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
