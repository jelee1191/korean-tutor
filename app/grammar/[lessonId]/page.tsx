import { getAllGrammarLessons, getLessonById } from '@/lib/supabaseContent'
import { notFound } from 'next/navigation'
import LessonClient from './LessonClient'

// Generate all lesson pages at build time
export async function generateStaticParams() {
  const lessons = await getAllGrammarLessons()

  return lessons.map(lesson => ({
    lessonId: lesson.id
  }))
}

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  // Await params in Next.js 15+
  const { lessonId } = await params

  // Fetch lesson data at build time
  const lesson = await getLessonById(lessonId)

  if (!lesson) {
    notFound()
  }

  // Pass lesson data to client component
  return <LessonClient lesson={lesson} />
}

// Force static generation
export const dynamic = 'force-static'
