import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [{ data: leadsCount }, { data: articlesCount }] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }),
  ])

  const { data: latestArticles } = await supabase
    .from('articles')
    .select('id,title,status,created_at,category')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 border border-white/10">
          <div className="text-white/60 text-sm mb-2">סה"כ לידים</div>
          <div className="text-3xl font-light">{leadsCount?.length ?? 0}</div>
        </div>
        <div className="p-6 border border-white/10">
          <div className="text-white/60 text-sm mb-2">סה"כ כתבות</div>
          <div className="text-3xl font-light">{articlesCount?.length ?? 0}</div>
        </div>
        <div className="p-6 border border-white/10">
          <div className="text-white/60 text-sm mb-2">סטטוס</div>
          <div className="text-3xl font-light">מחובר</div>
        </div>
      </div>

      <div className="border border-white/10">
        <div className="p-4 border-b border-white/10">כתבות אחרונות</div>
        <div className="divide-y divide-white/10">
          {latestArticles?.map((a) => (
            <div key={a.id} className="p-4 flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-white">{a.title}</div>
                <div className="text-white/50 text-sm">{a.category} · {new Date(a.created_at || '').toLocaleDateString('he-IL')}</div>
              </div>
              <div className="text-white/60 text-sm">{a.status}</div>
            </div>
          ))}
          {(!latestArticles || latestArticles.length === 0) && (
            <div className="p-6 text-white/60">אין נתונים להצגה</div>
          )}
        </div>
      </div>
    </div>
  )
}


