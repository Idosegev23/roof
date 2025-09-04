"use client"
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type ArticleEditorProps = {
  article?: {
    id: string
    title: string
    seo_title: string | null
    seo_description: string | null
    category: string | null
    cover_image: string | null
    status: string
  }
  content?: {
    id: string
    blocks: any
  } | null
}

const categories = [
  { value: 'residential', label: 'נדל״ן למגורים' },
  { value: 'offices', label: 'נדל״ן משרדי' },
  { value: 'investments', label: 'נדל״ן להשקעה' },
]

export default function ArticleEditor({ article, content }: ArticleEditorProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isPending, startTransition] = useTransition()

  const [title, setTitle] = useState(article?.title ?? '')
  const [seoTitle, setSeoTitle] = useState(article?.seo_title ?? '')
  const [seoDescription, setSeoDescription] = useState(article?.seo_description ?? '')
  const [category, setCategory] = useState(article?.category ?? 'residential')
  const [coverImage, setCoverImage] = useState(article?.cover_image ?? '')
  const [status, setStatus] = useState(article?.status ?? 'draft')
  const [blocks, setBlocks] = useState<string>(
    content?.blocks ? JSON.stringify(content.blocks, null, 2) : '[]'
  )
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  const handleSave = async (publish = false) => {
    setError('')
    setSuccess('')
    if (!title.trim()) {
      setError('יש להזין כותרת')
      return
    }
    let parsedBlocks: any = []
    try {
      parsedBlocks = blocks ? JSON.parse(blocks) : []
    } catch (e) {
      setError('מבנה הבלוקים אינו JSON תקין')
      return
    }

    startTransition(async () => {
      // upsert article
      const articlePayload = {
        title: title.trim(),
        seo_title: seoTitle || null,
        seo_description: seoDescription || null,
        category: category || null,
        cover_image: coverImage || null,
        status: publish ? 'published' : status,
      } as const

      let articleId = article?.id
      if (articleId) {
        const { error: upErr } = await supabase
          .from('articles')
          .update(articlePayload)
          .eq('id', articleId)
        if (upErr) {
          setError(upErr.message)
          return
        }
      } else {
        const { data: inserted, error: insErr } = await supabase
          .from('articles')
          .insert(articlePayload)
          .select('id')
          .single()
        if (insErr || !inserted) {
          setError(insErr?.message || 'שגיאה ביצירת כתבה')
          return
        }
        articleId = inserted.id
      }

      // upsert content
      if (articleId) {
        const { error: contErr } = await supabase
          .from('article_content')
          .upsert({
            article_id: articleId,
            blocks: parsedBlocks,
          })
        if (contErr) {
          setError(contErr.message)
          return
        }
      }

      setSuccess(publish ? 'הכתבה פורסמה בהצלחה' : 'הטיוטה נשמרה')
      // נווט לעמוד העריכה של הכתבה
      if (articleId && !article?.id) {
        router.replace(`/admin/articles/${articleId}`)
      }
    })
  }

  return (
    <div className="space-y-6">
      {error && <div className="p-3 border border-red-500/50 text-red-300">{error}</div>}
      {success && <div className="p-3 border border-emerald-500/50 text-emerald-300">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">כותרת</label>
            <input
              className="w-full bg-white/5 border border-white/10 p-3 text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="כותרת הכתבה"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">SEO Title</label>
            <input
              className="w-full bg-white/5 border border-white/10 p-3 text-white"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="כותרת SEO"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">SEO Description</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 p-3 text-white min-h-[80px]"
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="תיאור SEO"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">תוכן (JSON blocks)</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 p-3 text-white min-h-[260px] font-mono text-sm"
              value={blocks}
              onChange={(e) => setBlocks(e.target.value)}
              placeholder='[ { "type": "paragraph", "data": { "text": "..." } } ]'
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">קטגוריה</label>
            <select
              className="w-full bg-white/5 border border-white/10 p-3 text-white"
              value={category ?? ''}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">תמונת שער (URL)</label>
            <input
              className="w-full bg-white/5 border border-white/10 p-3 text-white"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">סטטוס</label>
            <select
              className="w-full bg-white/5 border border-white/10 p-3 text-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">טיוטה</option>
              <option value="published">פורסם</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleSave(false)}
              disabled={isPending}
              className="px-4 py-2 bg-white/10 border border-white/20 hover:bg-white/15 text-white"
            >
              שמור טיוטה
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={isPending}
              className="px-4 py-2 bg-[#D94188] text-white hover:opacity-90"
            >
              פרסם
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


