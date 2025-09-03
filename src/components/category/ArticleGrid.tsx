import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, User } from 'lucide-react'
import { Tables } from '@/lib/database.types'

type Article = Tables<'articles'> & {
  profiles: { role: string } | null
}

interface ArticleGridProps {
  articles: Article[]
  category: string
}

export function ArticleGrid({ articles, category }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-500 mb-4 text-lg">
          לא נמצאו מאמרים בקטגוריה &quot;{category}&quot;
        </div>
        <p className="text-gray-400">נסה לחפש במונחים אחרים או צפה בקטגוריות אחרות</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <Card key={article.id} className="group hover:shadow-lg transition-shadow">
          {article.cover_image && (
            <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <CardContent className="p-6">
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full text-sm font-medium">
                {article.category || 'כללי'}
              </span>
            </div>
            
            <h3 className="text-xl font-title text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">
              <Link href={`/article/${article.id}`}>
                {article.title}
              </Link>
            </h3>

            {article.seo_description && (
              <p className="text-gray-600 mb-4 line-clamp-2">
                {article.seo_description}
              </p>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(article.created_at || '').toLocaleDateString('he-IL')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>רווני פרידן</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
