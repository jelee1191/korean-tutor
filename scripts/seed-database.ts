#!/usr/bin/env ts-node

/**
 * Seed Script: Migrate Vocabulary and Grammar from TypeScript to Supabase
 *
 * Usage:
 *   1. Add SUPABASE_SERVICE_ROLE_KEY to .env.local (get from Supabase dashboard)
 *   2. Run: npx ts-node scripts/seed-database.ts
 *
 * This script:
 *   - Reads data from data/vocabulary.ts and data/grammar.ts
 *   - Transforms it to match the database schema
 *   - Upserts to Supabase (idempotent - safe to run multiple times)
 */

import { createClient } from '@supabase/supabase-js'
import { chapters, vocabulary } from '../data/vocabulary.ts'
import { grammarLessons, grammarExercises } from '../data/grammar.ts'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing environment variables')
  console.error('   Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  console.error('   Add SUPABASE_SERVICE_ROLE_KEY to .env.local (get from Supabase dashboard)')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedChapters() {
  console.log('\n📚 Seeding chapters...')

  const chaptersData = chapters.map(ch => ({
    number: ch.number,
    title: ch.title,
    description: ch.description,
    word_count: ch.wordCount
  }))

  const { data, error } = await supabase
    .from('chapters')
    .upsert(chaptersData, { onConflict: 'number' })

  if (error) {
    console.error('❌ Error seeding chapters:', error)
    throw error
  }

  console.log(`✅ Seeded ${chaptersData.length} chapters`)
}

async function seedVocabulary() {
  console.log('\n📝 Seeding vocabulary...')

  const { data, error } = await supabase
    .from('vocabulary')
    .upsert(vocabulary, { onConflict: 'id' })

  if (error) {
    console.error('❌ Error seeding vocabulary:', error)
    throw error
  }

  console.log(`✅ Seeded ${vocabulary.length} vocabulary words`)
}

async function seedGrammarLessons() {
  console.log('\n📖 Seeding grammar lessons...')

  const lessonsData = grammarLessons.map(lesson => ({
    id: lesson.id,
    title: lesson.title,
    title_korean: lesson.titleKorean,
    chapter: lesson.chapter,
    order: lesson.order,
    description: lesson.description,
    explanation: lesson.explanation,
    examples: lesson.examples,
    related_word_ids: lesson.relatedWordIds,
    difficulty: lesson.difficulty,
    prerequisites: lesson.prerequisites || []
  }))

  const { data, error } = await supabase
    .from('grammar_lessons')
    .upsert(lessonsData, { onConflict: 'id' })

  if (error) {
    console.error('❌ Error seeding grammar lessons:', error)
    throw error
  }

  console.log(`✅ Seeded ${lessonsData.length} grammar lessons`)
}

async function seedGrammarExercises() {
  console.log('\n✏️  Seeding grammar exercises...')

  const exercisesData = grammarExercises.map(exercise => {
    // Extract base fields
    const { id, lessonId, type, difficulty, instruction, hint } = exercise as any

    // Everything else goes into the JSONB 'data' column
    const { id: _, lessonId: __, type: ___, difficulty: ____, instruction: _____, hint: ______, ...typeSpecificData } = exercise as any

    return {
      id,
      lesson_id: lessonId,
      type,
      difficulty,
      instruction,
      hint: hint || null,
      data: typeSpecificData
    }
  })

  const { data, error } = await supabase
    .from('grammar_exercises')
    .upsert(exercisesData, { onConflict: 'id' })

  if (error) {
    console.error('❌ Error seeding grammar exercises:', error)
    throw error
  }

  console.log(`✅ Seeded ${exercisesData.length} grammar exercises`)
}

async function main() {
  console.log('🌱 Starting database seed...')
  console.log(`📍 Supabase URL: ${supabaseUrl}`)

  try {
    await seedChapters()
    await seedVocabulary()
    await seedGrammarLessons()
    await seedGrammarExercises()

    console.log('\n✅ ✅ ✅ Database seeding completed successfully! ✅ ✅ ✅')
    console.log('\n📋 Summary:')
    console.log(`   - ${chapters.length} chapters`)
    console.log(`   - ${vocabulary.length} vocabulary words`)
    console.log(`   - ${grammarLessons.length} grammar lessons`)
    console.log(`   - ${grammarExercises.length} grammar exercises`)
    console.log('\n💡 Next steps:')
    console.log('   1. Verify data in Supabase dashboard')
    console.log('   2. Run the app and test data fetching')

  } catch (error) {
    console.error('\n❌ Seeding failed:', error)
    process.exit(1)
  }
}

main()
