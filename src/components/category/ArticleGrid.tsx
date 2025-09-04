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
      <div 
        className="text-center py-20 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="text-white/80 mb-4 text-xl font-light">
          לא נמצאו מאמרים בקטגוריה &quot;{category}&quot;
        </div>
        <p className="text-white/60 font-light">נסה לחפש במונחים אחרים או צפה בקטגוריות אחרות</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <div 
          key={article.id} 
          className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
        >
          <div 
            className="rounded-2xl overflow-hidden backdrop-blur-lg transition-all duration-300 hover:shadow-2xl"
            style={{
              background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {article.cover_image && (
              <div className="aspect-video bg-gray-900/50 overflow-hidden">
                <img
                  src={article.cover_image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="mb-4">
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-light text-white"
                  style={{
                    backgroundColor: '#D94188',
                    boxShadow: '0 2px 8px rgba(217, 65, 136, 0.3)',
                  }}
                >
                  {article.category || 'כללי'}
                </span>
              </div>
              
              <h3 className="text-xl font-light text-white mb-3 group-hover:text-framework-primary transition-colors duration-200 leading-relaxed">
                <Link href={`/article/${article.id}`}>
                  {article.title}
                </Link>
              </h3>

              {article.seo_description && (
                <p className="text-white/70 mb-6 line-clamp-2 font-light leading-relaxed">
                  {article.seo_description}
                </p>
              )}

              <div className="flex items-center justify-between text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-light">
                    {new Date(article.created_at || '').toLocaleDateString('he-IL')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-light">רווני פרידן</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
