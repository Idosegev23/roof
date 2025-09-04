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

        {/* Dynamic Bento Grid - ללא חללים ריקים */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px]">
          
          {articles.map((article, index) => {
            // לוגיקה דינמית לגודל הפריט
            let colSpan = 'col-span-1'
            let rowSpan = 'row-span-1'
            
            // הכתבה הראשונה תמיד גדולה
            if (index === 0) {
              colSpan = 'col-span-2 md:col-span-3 lg:col-span-3'
              rowSpan = 'row-span-2'
            }
            // כל 5 כתבות, אחת תהיה רחבה יותר
            else if ((index - 1) % 5 === 0 && articles.length > index + 1) {
              colSpan = 'col-span-2 md:col-span-2 lg:col-span-2'
            }
            // כל 7 כתבות, אחת תהיה גבוהה יותר
            else if ((index - 1) % 7 === 0) {
              rowSpan = 'row-span-2'
            }

            return (
              <div key={article.id} className={`${colSpan} ${rowSpan}`}>
                <div className="group relative h-full overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                  {/* תמונת רקע */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${article.cover_image})`,
                    }}
                  ></div>
                  
                  {/* אוברליי */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* תוכן */}
                  <div className="relative h-full flex flex-col justify-end p-4">
                    {/* באדג' חם רק לכתבה הראשונה */}
                    {index === 0 && (
                      <div className="mb-3">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-framework-accent-cta/20 text-framework-accent-cta border border-framework-accent-cta/30">
                          🔥 חם ביותר
                        </span>
                      </div>
                    )}
                    
                    {/* קטגוריה */}
                    <div className="mb-2">
                      <span className="text-framework-accent-cta text-xs font-medium uppercase tracking-wider">
                        {getCategoryDisplayName(article.category)}
                      </span>
                    </div>
                    
                    {/* כותרת - גודל דינמי לפי גודל הפריט */}
                    <h3 className={`font-light text-white mb-2 leading-tight group-hover:text-framework-accent-cta transition-colors duration-200 ${
                      index === 0 ? 'text-xl md:text-2xl lg:text-3xl' : 
                      colSpan.includes('2') ? 'text-lg md:text-xl' : 'text-sm md:text-base'
                    }`}>
                      <Link href={`/article/${article.id}`}>
                        {article.title}
                      </Link>
                    </h3>

                    {/* תקציר רק לכתבה הראשונה */}
                    {index === 0 && (
                      <p className="text-white/80 mb-3 font-ultralight leading-relaxed text-sm">
                        {article.seo_description}
                      </p>
                    )}
                    
                    {/* תאריך */}
                    <div className="text-white/60 text-xs font-ultralight">
                      {new Date(article.created_at).toLocaleDateString('he-IL')}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}