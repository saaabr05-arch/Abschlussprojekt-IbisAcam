export interface Highlight {
  id: string
  created_at: string
  user_id: string
  title: string
  description: string
  image_url?: string
}

export interface QuizResult {
  id: string
  created_at: string
  user_id: string
  score: number
  total_questions: number
  quiz_type: string
}
