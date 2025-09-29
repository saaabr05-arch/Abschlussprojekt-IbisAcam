import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'

export function AddHighlight() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('Not authenticated')
      }

      const { error } = await supabase
        .from('highlights')
        .insert([
          {
            title,
            description,
            image_url: imageUrl,
            user_id: session.user.id
          }
        ])

      if (error) throw error

      // Reset form
      setTitle('')
      setDescription('')
      setImageUrl('')
      
      // Refresh the page to show new highlight
      window.location.reload()
    } catch (error) {
      console.error('Error adding highlight:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Add New Highlight</h3>
        
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <Input
          type="url"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Highlight'}
        </Button>
      </form>
    </Card>
  )
}
