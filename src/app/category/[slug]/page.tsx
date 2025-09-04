import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ArticleGrid } from '@/components/category/ArticleGrid'
import { CategoryFilters } from '@/components/category/CategoryFilters'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Building, Briefcase, TrendingUp } from 'lucide-react'
import { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const categoryData = {
  residential: {
    title: 'נדל״ן למגורים',
    description: 'כל מה שצריך לדעת על קניה, מכירה והשכרת דירות מגורים',
    icon: Building,
    gradient: 'from-framework-primary/20 to-framework-accent/10',
    accentColor: '#D94188'
  },
  offices: {
    title: 'נדל״ן משרדי',
    description: 'השקעות במשרדים, חללי מסחר ונכסים עסקיים',
    icon: Briefcase,
    gradient: 'from-blue-500/20 to-framework-primary/10',
    accentColor: '#3B82F6'
  },
  investments: {
    title: 'נדל״ן להשקעה',
    description: 'אסטרטגיות השקעה, ניתוח שוק וטיפים למשקיעים',
    icon: TrendingUp,
    gradient: 'from-purple-500/20 to-framework-primary/10',
    accentColor: '#8B5CF6'
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = categoryData[slug as keyof typeof categoryData]
  
  if (!category) {
    return {
      title: 'קטגוריה לא נמצאה',
    }
  }

  return {
    title: `${category.title} - רווני פרידן`,
    description: category.description,
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const searchParamsResolved = await searchParams
  
  const category = categoryData[slug as keyof typeof categoryData]
  
  if (!category) {
    notFound()
  }

  const supabase = await createClient()
  
  // Build query with filters
  let query = supabase
    .from('articles')
    .select(`
      *,
      profiles (role)
    `)
    .eq('status', 'published')
    .eq('category', slug)
    .order('created_at', { ascending: false })

  // Apply search filter if provided
  if (searchParamsResolved.search && typeof searchParamsResolved.search === 'string') {
    query = query.or(`title.ilike.%${searchParamsResolved.search}%,seo_description.ilike.%${searchParamsResolved.search}%`)
  }

  const { data: articles } = await query

  const IconComponent = category.icon

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main>
        {/* Category Hero - Glassmorphism Style */}
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}></div>
          
          {/* Glassmorphism overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(10px)',
            }}
          ></div>
          
          <div className="relative container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              {/* Icon with glassmorphism */}
              <div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 transition-transform hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${category.accentColor}30`,
                  boxShadow: `0 8px 32px ${category.accentColor}20`,
                }}
              >
                <IconComponent className="h-10 w-10" style={{ color: category.accentColor }} />
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight">
                {category.title}
              </h1>
              
              {/* Description */}
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                {category.description}
              </p>

              {/* Articles count - Glassmorphism badge */}
              <div 
                className="inline-block px-6 py-3 rounded-full text-white/90 font-light"
                style={{
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {articles?.length || 0} מאמרים זמינים
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section - Glassmorphism */}
        <section className="relative py-8">
          <div className="container mx-auto px-4">
            <div 
              className="max-w-4xl mx-auto p-6 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <CategoryFilters 
                category={slug} 
                currentSearch={searchParamsResolved.search as string}
              />
            </div>
          </div>
        </section>

        {/* Articles Grid Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <ArticleGrid 
              articles={articles || []} 
              category={category.title}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
