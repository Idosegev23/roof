import { createClient } from '@/lib/supabase/server'

export default async function AdminLeads() {
  const supabase = await createClient()
  const { data: leads } = await supabase
    .from('leads')
    .select('id,name,phone,email,article_id,created_at')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-light">ניהול לידים</h1>

      <div className="border border-white/10">
        <div className="hidden md:grid grid-cols-6 gap-4 p-3 border-b border-white/10 text-white/60 text-sm">
          <div>שם</div>
          <div>טלפון</div>
          <div>דוא&quot;ל</div>
          <div>כתבה</div>
          <div>תאריך</div>
          <div></div>
        </div>
        <div className="divide-y divide-white/10">
          {leads?.map((l) => (
            <div key={l.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-3 items-center">
              <div className="text-white">{l.name}</div>
              <div className="text-white/80">{l.phone}</div>
              <div className="text-white/60">{l.email || '-'}</div>
              <div className="text-white/60">{l.article_id || '-'}</div>
              <div className="text-white/50">{new Date(l.created_at || '').toLocaleDateString('he-IL')}</div>
              <div className="text-right text-white/50 text-sm">#{l.id.slice(0,8)}</div>
            </div>
          ))}
          {(!leads || leads.length === 0) && (
            <div className="p-6 text-white/60">אין לידים להצגה</div>
          )}
        </div>
      </div>
    </div>
  )
}


