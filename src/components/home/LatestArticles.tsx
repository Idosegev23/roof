'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Tables } from '@/lib/database.types'

type Article = Tables<'articles'> & {
  profiles: { role: string } | null
}

export function LatestArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from('articles')
        .select(`
          *,
          profiles (role)
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(6)

      if (data) {
        setArticles(data as Article[])
      }
      setLoading(false)
    }

    fetchArticles()
  }, [supabase])

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-title text-brand-dark mb-4">המאמרים החדשים</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-title text-brand-dark mb-4">המאמרים החדשים</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            הישאר מעודכן עם הכתבות והמאמרים החדשים ביותר בתחום הנדל״ן והשקעות
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              אין מאמרים פורסמו עדיין
            </div>
            <Button variant="outline">
              <Link href="/admin">
                לפאנל הניהול
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

            <div className="text-center">
              <Button variant="outline" size="lg" className="font-button">
                <Link href="/articles" className="flex items-center">
                  צפה בכל המאמרים
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
