import { notFound } from 'next/navigation'
import { CategoryBento } from '@/components/category/CategoryBento'
import { CategoryFilters } from '@/components/category/CategoryFilters'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Building, Briefcase, TrendingUp } from 'lucide-react'
import { Metadata } from 'next'
import { getArticlesByCategory } from '@/lib/mockArticles'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const categoryData = {
  residential: {
    title: 'נדל״ן למגורים',
    description: 'כל מה שצריך לדעת על קניה, מכירה והשכרת דירות מגורים',
    icon: Building,
    backgroundColor: '#D94188',
    accentColor: '#D94188',
    bannerImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=600&q=80'
  },
  offices: {
    title: 'נדל״ן משרדי',
    description: 'השקעות במשרדים, חללי מסחר ונכסים עסקיים',
    icon: Briefcase,
    backgroundColor: '#3B82F6',
    accentColor: '#3B82F6',
    bannerImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=600&q=80'
  },
  investments: {
    title: 'נדל״ן להשקעה',
    description: 'אסטרטגיות השקעה, ניתוח שוק וטיפים למשקיעים',
    icon: TrendingUp,
    backgroundColor: '#8B5CF6',
    accentColor: '#8B5CF6',
    bannerImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=600&q=80'
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

  // Get mock articles for this category (sorted newest first)
  let articles = getArticlesByCategory(slug).sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
  
  // Apply search filter if provided
  if (searchParamsResolved.search && typeof searchParamsResolved.search === 'string') {
    const searchTerm = searchParamsResolved.search.toLowerCase()
    articles = articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm) ||
      article.seo_description.toLowerCase().includes(searchTerm)
    )
  }

  const IconComponent = category.icon

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main>
        {/* Category Banner - ממדים 1920x600 */}
        <section className="relative h-[400px] md:h-[600px] overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${category.bannerImage})`,
            }}
          ></div>
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto px-4">
              {/* Icon */}
              <div 
                className="inline-flex items-center justify-center w-20 h-20 mb-6 transition-transform hover:scale-110"
                style={{
                  backgroundColor: category.backgroundColor,
                  boxShadow: `0 8px 32px ${category.accentColor}40`,
                }}
              >
                <IconComponent className="h-10 w-10 text-white" />
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
                {category.title}
              </h1>
              
              {/* Description */}
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                {category.description}
              </p>

              {/* Articles count */}
              <div 
                className="inline-block px-6 py-3 text-white font-light"
                style={{
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                {articles?.length || 0} מאמרים זמינים
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="relative py-8 bg-black">
          <div className="container mx-auto px-4">
            <div 
              className="max-w-4xl mx-auto p-6"
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

        {/* Category Bento - כתבות הקטגוריה בלבד */}
        <CategoryBento 
          articles={articles || []} 
          categoryTitle={category.title}
        />
      </main>
      
      <Footer />
    </div>
  )
}
