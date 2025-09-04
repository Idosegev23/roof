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
    color: 'bg-blue-500'
  },
  offices: {
    title: 'נדל״ן משרדי',
    description: 'השקעות במשרדים, חללי מסחר ונכסים עסקיים',
    icon: Briefcase,
    color: 'bg-green-500'
  },
  investments: {
    title: 'נדל״ן להשקעה',
    description: 'אסטרטגיות השקעה, ניתוח שוק וטיפים למשקיעים',
    icon: TrendingUp,
    color: 'bg-purple-500'
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Category Header */}
        <section className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${category.color} rounded-full mb-6`}>
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-title text-brand-dark mb-4">
                {category.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {category.description}
              </p>

              <div className="text-sm text-gray-500">
                {articles?.length || 0} מאמרים בקטגוריה זו
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <CategoryFilters 
              category={slug} 
              currentSearch={searchParamsResolved.search as string}
            />
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-8">
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
