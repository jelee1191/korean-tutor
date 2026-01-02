import { getAllVocabulary } from '@/lib/supabaseContent'
import PracticeClient from './PracticeClient'

export default async function PracticePage() {
  // Fetch all vocabulary at build time
  const vocabulary = await getAllVocabulary()

  // Pass data to client component
  return <PracticeClient vocabulary={vocabulary} />
}

// Force static generation
export const dynamic = 'force-static'
