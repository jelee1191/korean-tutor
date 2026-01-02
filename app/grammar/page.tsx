import { getAllGrammarLessons } from '@/lib/supabaseContent'
import GrammarClient from './GrammarClient'

export default async function GrammarPage() {
  // Fetch data at build time
  const lessons = await getAllGrammarLessons()

  // Pass data to client component
  return <GrammarClient lessons={lessons} />
}

// Force static generation
export const dynamic = 'force-static'
