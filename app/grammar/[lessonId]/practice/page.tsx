import { getAllGrammarLessons, getLessonById, getExercisesByLesson } from '@/lib/supabaseContent'
import { notFound } from 'next/navigation'
import PracticeClient from './PracticeClient'

// Generate all practice pages at build time
export async function generateStaticParams() {
  const lessons = await getAllGrammarLessons()

  return lessons.map(lesson => ({
    lessonId: lesson.id
  }))
}

export default async function PracticePage({ params }: { params: Promise<{ lessonId: string }> }) {
  // Await params in Next.js 15+
  const { lessonId } = await params

  // Fetch lesson and exercises at build time
  const lesson = await getLessonById(lessonId)
  const exercises = await getExercisesByLesson(lessonId)

  if (!lesson || exercises.length === 0) {
    notFound()
  }

  // Pass data to client component
  return <PracticeClient lesson={lesson} exercises={exercises} />
}

// Force static generation
export const dynamic = 'force-static'
