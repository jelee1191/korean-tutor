# Korean Tutor

A personal Korean vocabulary learning webapp with spaced repetition.

## Features

- **Vocabulary Bank**: Browse 105+ Korean words across 9 categories
- **Flashcard Practice**: Interactive flashcards with flip animation
- **Spaced Repetition System (SRS)**: Smart review scheduling to optimize learning
- **Progress Tracking**: Track your learning progress with detailed statistics
- **Categories**: Greetings, Numbers, Food, Verbs, Adjectives, Family, Time, Places, Pronouns, and Common Phrases

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **localStorage** - Progress persistence (Supabase integration planned for Phase 2)

## Project Structure

```
korean-tutor/
├── app/                  # Next.js app router pages
│   ├── page.tsx         # Dashboard
│   ├── practice/        # Flashcard practice
│   └── words/           # Word bank
├── components/          # React components
│   └── Flashcard.tsx   # Flashcard component
├── data/               # Vocabulary data
│   └── vocabulary.ts   # 105 Korean words
├── lib/                # Utilities and hooks
│   ├── storage.ts      # localStorage utilities
│   └── useProgress.ts  # Progress tracking hook
└── types/              # TypeScript types
    └── index.ts        # Type definitions
```

## How to Use

1. **Dashboard**: View your learning statistics and start practice sessions
2. **Practice**: Review words with flashcards - mark as "Know It" or "Still Learning"
3. **Word Bank**: Browse all vocabulary words, filter by category, or search

## Spaced Repetition System

The app uses a 6-level SRS system:
- Level 0: Review immediately
- Level 1: Review in 1 day
- Level 2: Review in 3 days
- Level 3: Review in 1 week
- Level 4: Review in 2 weeks
- Level 5: Review in 1 month

Words you know well move up levels and appear less frequently. Words you struggle with move down levels and appear more often.

## Future Enhancements (Planned)

- **Phase 2**: Multi-device sync with Supabase
- **Phase 3**: Grammar lessons and explanations
- **Phase 4**: Sentence building exercises

## Deployment

Deploy to Vercel (free):

```bash
vercel
```

Or push to GitHub and connect the repository to Vercel.
