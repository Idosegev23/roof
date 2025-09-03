'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Send } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface LeadFormProps {
  articleId: string
}

export function LeadForm({ articleId }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Insert lead into database
      const { error: dbError } = await supabase
        .from('leads')
        .insert({
          article_id: articleId,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message
        })

      if (dbError) {
        throw dbError
      }

      // Get webhook settings
      const { data: settings } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'webhook_leads')
        .single()

      // Send to webhook if configured
      if (settings?.value && typeof settings.value === 'object' && 'url' in settings.value && 'enabled' in settings.value) {
        const webhookConfig = settings.value as { url: string; enabled: boolean }
        if (webhookConfig.enabled && webhookConfig.url) {
          try {
            await fetch(webhookConfig.url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...formData,
                article_id: articleId,
                created_at: new Date().toISOString()
              })
            })
          } catch (webhookError) {
            console.error('Webhook error:', webhookError)
            // Don't fail the form submission if webhook fails
          }
        }
      }

      toast.success('תודה על פנייתך! נחזור אליך בהקדם')
      setFormData({ name: '', phone: '', email: '', message: '' })
    } catch (error) {
      console.error('Error submitting lead:', error)
      toast.error('שגיאה בשליחת הטופס. נסה שוב')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">שם מלא *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="הזן את שמך המלא"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">טלפון *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="050-123-4567"
            required
            disabled={isLoading}
            dir="ltr"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">אימייל</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          disabled={isLoading}
          dir="ltr"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">הודעה</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="כתב הודעה או שאלה..."
          rows={4}
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-brand-accent hover:bg-brand-accent/90 font-button"
        disabled={isLoading}
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            שולח...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            שלח פנייה
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        * שדות חובה. המידע שלך מוגן ולא יועבר לצדדים שלישיים
      </p>
    </form>
  )
}
