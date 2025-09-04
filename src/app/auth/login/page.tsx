'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOtpLoading, setIsOtpLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        const message = body?.error || 'שגיאה בהתחברות'
        if (res.status === 400) {
          toast.error('פרטי התחברות שגויים. אנא נסה שוב.')
        } else if (res.status >= 500) {
          toast.error('שגיאת שרת בהתחברות. נסה שוב או השתמש בקישור למייל.')
        } else {
          toast.error(message)
        }
        return
      }

      toast.success('התחברת בהצלחה!')
      router.push('/admin')
    } catch (error) {
      toast.error('שגיאה לא צפויה')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMagicLink = async () => {
    if (!email) {
      toast.error('נא להכניס אימייל')
      return
    }
    setIsOtpLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) {
        toast.error('שגיאה בשליחת הקישור: ' + (error?.message || 'נסה שוב'))
      } else {
        toast.success('שלחנו קישור כניסה למייל. בדוק את תיבת הדואר.')
      }
    } catch (e) {
      toast.error('שגיאה לא צפויה')
    } finally {
      setIsOtpLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <Card className="w-full max-w-md shadow-soft">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-title text-brand-dark">
            כניסה למערכת
          </CardTitle>
          <CardDescription>
            הזן את פרטי הכניסה שלך כדי לגשת לפאנל הניהול
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">כתובת אימייל</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={isLoading}
                dir="ltr"
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">סיסמה</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                dir="ltr"
                autoComplete="current-password"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full font-button bg-brand-accent hover:bg-brand-accent/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  מתחבר...
                </>
              ) : (
                'התחבר'
              )}
            </Button>
            <div className="text-center text-sm text-gray-500">או</div>
            <Button 
              type="button"
              onClick={handleMagicLink}
              className="w-full font-button bg-white/10 text-brand-dark hover:bg-white/20"
              disabled={isOtpLoading}
            >
              {isOtpLoading ? 'שולח קישור למייל…' : 'התחברות בקישור למייל'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
