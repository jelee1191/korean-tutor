import { getAllVocabulary } from '@/lib/supabaseContent'
import DashboardClient from './DashboardClient'

export default async function Dashboard() {
  // Fetch vocabulary count at build time
  const vocabulary = await getAllVocabulary()
  const totalVocabulary = vocabulary.length

  // Pass data to client component
  return <DashboardClient totalVocabulary={totalVocabulary} />
}

// Force static generation
export const dynamic = 'force-static'
