import Link from 'next/link'
import { getFeaturedArticles } from '@/lib/mockArticles'

export function BentoGrid() {
  // קבלת כל הכתבות הזמינות - דינמי
  const articles = getFeaturedArticles(20) // מקסימום 20, אבל יכול להיות פחות
  
  const getCategoryDisplayName = (cat: string) => {
    switch(cat) {
      case 'residential': return 'נדל״ן למגורים'
      case 'offices': return 'נדל״ן משרדי'  
      case 'investments': return 'נדל״ן להשקעה'
      default: return cat
    }
  }

  // אם אין כתבות, לא מציגים כלום
  if (articles.length === 0) {
    return null
  }

  return (
    <section className="pt-xxxl pb-xxl bg-black">
      <div className="container max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-l text-center">
          <h2 className="text-h1-mobile md:text-h1-desktop font-light text-white mb-s">
            הכותרות החמות
          </h2>
          <p className="text-body text-white/60 font-ultralight">
            הכתבות הכי נקראות השבוע
          </p>
        </div>

        {/* Uniform, auto-fit grid fills rows without gaps and stays symmetrical */}
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))] gap-4 md:gap-6">
          {articles.slice(0, 10).map((article, index) => (
            <div key={article.id} className="relative h-[220px] md:h-[260px] overflow-hidden group">
              {/* תמונת רקע */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${article.cover_image})` }}
              ></div>
              {/* אוברליי */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              {/* תוכן */}
              <div className="relative h-full flex flex-col justify-end p-4">
                {index === 0 && (
                  <div className="mb-2">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-framework-accent-cta/20 text-framework-accent-cta border border-framework-accent-cta/30">
                      🔥 חם ביותר
                    </span>
                  </div>
                )}
                <div className="mb-1">
                  <span className="text-framework-accent-cta text-xs font-medium uppercase tracking-wider">
                    {getCategoryDisplayName(article.category)}
                  </span>
                </div>
                <h3 className={`font-light text-white leading-tight group-hover:text-framework-accent-cta transition-colors duration-200 ${index === 0 ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}>
                  <Link href={`/article/${article.id}`}>{article.title}</Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}