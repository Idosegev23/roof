import { createClient } from '@/lib/supabase/server'
import ArticleEditor from '@/components/admin/ArticleEditor'
import { Tables } from '@/lib/database.types'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  const { data: content } = await supabase
    .from('article_content')
    .select('id,blocks')
    .eq('article_id', id)
    .single()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-light">עריכת כתבה</h1>
      <ArticleEditor 
        article={article as Tables<'articles'> | undefined}
        content={content as (Pick<Tables<'article_content'>, 'id' | 'blocks'>) | null}
      />
    </div>
  )
}


