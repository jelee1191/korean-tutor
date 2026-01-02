import { getAllGrammarLessons } from '@/lib/supabaseContent'
import GrammarClient from './grammar/GrammarClient'

export default async function HomePage() {
  // Fetch lessons at build time
  const lessons = await getAllGrammarLessons()

  // Pass data to client component
  return <GrammarClient lessons={lessons} />
}

// Force static generation
export const dynamic = 'force-static'
