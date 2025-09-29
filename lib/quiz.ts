import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function saveQuizResult(score, totalQuestions) {
  const supabase = createClientComponentClient()
  
  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      // If not logged in, store results temporarily and redirect to login
      sessionStorage.setItem('pendingQuizResult', JSON.stringify({
        score,
        totalQuestions,
        quiz_type: 'bmw_car_selector'
      }))
      window.location.href = '/auth/login'
      return
    }

    // Save the quiz result
    const { error } = await supabase
      .from('quiz_results')
      .insert([
        {
          score,
          total_questions: totalQuestions,
          quiz_type: 'bmw_car_selector',
          user_id: session.user.id
        }
      ])

    if (error) throw error

    // Redirect to highlights page to add the recommended car
    window.location.href = '/protected/highlights'
  } catch (error) {
    console.error('Error saving quiz result:', error)
  }
}
