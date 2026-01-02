import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      user_progress: {
        Row: {
          id: string
          user_id: string
          word_id: string
          level: number
          next_review: string
          times_correct: number
          times_incorrect: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          word_id: string
          level: number
          next_review: string
          times_correct: number
          times_incorrect: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          word_id?: string
          level?: number
          next_review?: string
          times_correct?: number
          times_incorrect?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
