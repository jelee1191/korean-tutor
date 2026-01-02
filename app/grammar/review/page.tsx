import { getAllExercises } from '@/lib/supabaseContent'
import ReviewClient from './ReviewClient'

export default async function ReviewPage() {
  // Fetch all exercises at build time
  const exercises = await getAllExercises()

  // Pass to client component which will filter by due date
  return <ReviewClient allExercises={exercises} />
}

// Force static generation
export const dynamic = 'force-static'
