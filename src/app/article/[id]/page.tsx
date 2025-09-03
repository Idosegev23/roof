import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ArticleContent } from '@/components/article/ArticleContent'
import { LeadForm } from '@/components/article/LeadForm'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Calendar, User, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

interface ArticlePageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: article } = await supabase
    .from('articles')
    .select('title, seo_title, seo_description, cover_image')
    .eq('id', id)
    .eq('status', 'published')
    .single()

  if (!article) {
    return {
      title: 'מאמר לא נמצא',
    }
  }

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || `קרא את המאמר "${article.title}" באתר רווני פרידן`,
    openGraph: {
      title: article.seo_title || article.title,
      description: article.seo_description || '',
      images: article.cover_image ? [article.cover_image] : [],
    }
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch article with content
  const { data: article } = await supabase
    .from('articles')
    .select(`
      *,
      article_content (blocks),
      profiles (role)
    `)
    .eq('id', id)
    .eq('status', 'published')
    .single()

  if (!article) {
    notFound()
  }

  const content = article.article_content?.[0]?.blocks || []

  return (
    <div className="min-h-screen bg-framework-background-light">
      <Header />
      
      <main>
        {/* Article Header */}
        <section className="bg-framework-white py-xxl">
          <div className="container max-w-4xl mx-auto px-m">
            
            {/* Category Badge */}
            <div className="mb-m">
              <span className="inline-block bg-framework-accent-cta text-framework-white px-m py-xs rounded-button text-caption font-semibold">
                {article.category || 'כללי'}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-h1-mobile md:text-h1-desktop font-bold text-framework-primary-dark mb-m leading-tight">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-m mb-l">
              <div className="flex items-center gap-l text-caption text-framework-gray-medium">
                <div className="flex items-center gap-xs">
                  <User className="h-4 w-4" />
                  <span>צוות Roof</span>
                </div>
                <div className="flex items-center gap-xs">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(article.created_at || '').toLocaleDateString('he-IL')}
                  </span>
                </div>
              </div>
              
              <button className="btn-secondary rounded-button px-m py-s">
                <Share2 className="h-4 w-4 ml-xs" />
                שתף
              </button>
            </div>

            {/* Cover Image */}
            {article.cover_image && (
              <div className="aspect-video rounded-card overflow-hidden shadow-card">
                <img
                  src={article.cover_image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* Article Content */}
        <section className="bg-framework-white py-xxl">
          <div className="container max-w-4xl mx-auto px-m">
            <div className="prose prose-lg max-w-none text-framework-primary-dark">
              <ArticleContent blocks={content} />
            </div>
          </div>
        </section>

        {/* Lead Form - המרכז של הכתבה */}
        <section className="py-xxl bg-gradient-to-l from-framework-accent-cta/10 via-framework-accent-cta/5 to-framework-background-light border-y-2 border-framework-accent-cta/20">
          <div className="container max-w-2xl mx-auto px-m">
            <div className="card-base border-2 border-framework-accent-cta/30 bg-framework-white">
              
              {/* CTA Header */}
              <div className="text-center mb-l">
                                        <div className="inline-block bg-framework-accent-cta text-framework-white px-m py-xs rounded-button text-caption font-bold mb-m">
                          ◆ קבל ייעוץ מקצועי
                        </div>
                <h3 className="text-h2-mobile md:text-h2-desktop font-bold text-framework-primary-dark mb-s">
                  מעוניין בפרטים נוספים?
                </h3>
                <p className="text-body text-framework-gray-medium leading-relaxed">
                  השאר פרטים ומומחה הנדל״ן שלנו יחזור אליך עם ייעוץ מותאם אישית 
                  ותשובות לכל השאלות שלך בנושא זה
                </p>
              </div>

              {/* הטופס עצמו */}
              <LeadForm articleId={article.id} />
              
              {/* Trust Indicators */}
              <div className="mt-l pt-l border-t border-framework-gray-light">
                <div className="flex items-center justify-center gap-l text-caption text-framework-gray-medium">
                  <div className="flex items-center gap-xs">
                    <span className="w-2 h-2 bg-framework-success rounded-full"></span>
                    ייעוץ ללא עלות
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="w-2 h-2 bg-framework-success rounded-full"></span>
                    מענה תוך 24 שעות
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="w-2 h-2 bg-framework-success rounded-full"></span>
                    ללא התחייבות
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author/Company Info */}
        <section className="py-xxl bg-framework-white">
          <div className="container max-w-4xl mx-auto px-m">
            <div className="card-base border border-framework-gray-light">
              <div className="text-center">
                <h3 className="text-h3-mobile font-bold text-framework-primary-dark mb-m">
                  המומחים שלנו כאן בשבילך
                </h3>
                <p className="text-body text-framework-gray-medium leading-relaxed mb-l">
                  צוות Roof מורכב ממומחי נדל״ן מנוסים הפועלים בשוק הישראלי יותר מעשור. 
                  אנחנו כאן לעזור לך לקבל החלטות נכונות ומושכלות בכל הקשור להשקעה בנדל״ן.
                </p>
                <div className="flex justify-center">
                  <button className="btn-primary rounded-button px-l py-m font-semibold">
                    פנה אלינו לייעוץ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
