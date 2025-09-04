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

        {/* Symmetric Bento Grid - סימטרי מבחוץ, אסימטרי מבפנים */}
        <div className="aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
          <div className="grid grid-cols-6 grid-rows-6 md:grid-cols-8 md:grid-rows-6 lg:grid-cols-12 lg:grid-rows-6 gap-2 md:gap-4 h-full">
            
            {articles.slice(0, 12).map((article, index) => {
              // לוגיקה דינמית לגודל הפריט - חישוב מדויק לסגירת הגריד
              let colSpan = 'col-span-1'
              let rowSpan = 'row-span-1'
              
              // חלוקה חכמה שמבטיחה סגירה סימטרית
              if (index === 0) {
                // כתבה ראשית - גדולה
                colSpan = 'col-span-3 md:col-span-4 lg:col-span-6'
                rowSpan = 'row-span-3 md:row-span-3 lg:row-span-3'
              }
              else if (index === 1) {
                colSpan = 'col-span-3 md:col-span-2 lg:col-span-3'
                rowSpan = 'row-span-2 md:row-span-2 lg:row-span-2'
              }
              else if (index === 2) {
                colSpan = 'col-span-3 md:col-span-2 lg:col-span-3'
                rowSpan = 'row-span-1 md:row-span-1 lg:row-span-1'
              }
              else if (index === 3) {
                colSpan = 'col-span-2 md:col-span-2 lg:col-span-2'
                rowSpan = 'row-span-2 md:row-span-2 lg:row-span-2'
              }
              else if (index === 4) {
                colSpan = 'col-span-1 md:col-span-2 lg:col-span-2'
                rowSpan = 'row-span-1 md:row-span-1 lg:row-span-1'
              }
              else if (index === 5) {
                colSpan = 'col-span-1 md:col-span-2 lg:col-span-2'
                rowSpan = 'row-span-1 md:row-span-1 lg:row-span-1'
              }
              else {
                // שאר הכתבות - גודל רגיל
                colSpan = 'col-span-1 md:col-span-1 lg:col-span-2'
                rowSpan = 'row-span-1'
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
                        colSpan.includes('3') ? 'text-lg md:text-xl' : 'text-sm md:text-base'
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
      </div>
    </section>
  )
}