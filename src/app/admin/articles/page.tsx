import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminArticles() {
  const supabase = await createClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('id,title,status,category,created_at')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-light">ניהול כתבות</h1>
        <Link href="/admin/articles/new" className="px-4 py-2 bg-[#D94188] text-white">כתבה חדשה</Link>
      </div>

      <div className="border border-white/10">
        <div className="hidden md:grid grid-cols-5 gap-4 p-3 border-b border-white/10 text-white/60 text-sm">
          <div>כותרת</div>
          <div>קטגוריה</div>
          <div>סטטוס</div>
          <div>נוצר</div>
          <div></div>
        </div>

        <div className="divide-y divide-white/10">
          {articles?.map((a) => (
            <div key={a.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-3 items-center">
              <div className="text-white">{a.title}</div>
              <div className="text-white/70">{a.category}</div>
              <div className="text-white/70">{a.status}</div>
              <div className="text-white/50">{new Date(a.created_at || '').toLocaleDateString('he-IL')}</div>
              <div className="text-right">
                <Link href={`/admin/articles/${a.id}`} className="text-[#D94188]">עריכה</Link>
              </div>
            </div>
          ))}
          {(!articles || articles.length === 0) && (
            <div className="p-6 text-white/60">אין כתבות להצגה</div>
          )}
        </div>
      </div>
    </div>
  )
}


