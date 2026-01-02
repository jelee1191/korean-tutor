import { getAllVocabulary, getAllCategories } from '@/lib/supabaseContent'
import WordsClient from './WordsClient'

export default async function WordsPage() {
  // Fetch data at build time
  const vocabulary = await getAllVocabulary()
  const categories = await getAllCategories()

  // Pass data to client component
  return <WordsClient vocabulary={vocabulary} categories={categories} />
}

// Force static generation
export const dynamic = 'force-static'
