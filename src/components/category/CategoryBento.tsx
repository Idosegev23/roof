import Link from 'next/link'

type Article = {
  id: string
  title: string
  seo_description: string
  category: string
  cover_image: string
  created_at: string
  status: string
}

interface CategoryBentoProps {
  articles: Article[]
  categoryTitle: string
}

export function CategoryBento({ articles, categoryTitle }: CategoryBentoProps) {
  if (articles.length === 0) {
    return (
      <div 
        className="text-center py-20 mx-4"
        style={{
          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="text-white/80 mb-4 text-xl font-light">
          אין כתבות להצגה עדיין
        </div>
        <p className="text-white/60 font-light">כתבות חדשות יתווספו בקרוב</p>
      </div>
    )
  }

  return (
    <section className="py-12 pb-16 md:pb-20 lg:pb-24">
      <div className="container mx-auto px-4">
        {/* כותרת הקטגוריה */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            כתבות {categoryTitle}
          </h2>
          <p className="text-white/60 font-light">
            {articles.length} כתבות זמינות בקטגוריה זו
          </p>
        </div>

        {/* Symmetric Bento Grid - סימטרי מבחוץ, אסימטרי מבפנים */}
        <div className="aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 grid-rows-6 gap-2 md:gap-4 h-full">
            
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
                      {/* קטגוריה */}
                      <div className="mb-2">
                        <span className="text-framework-accent-cta text-xs font-medium uppercase tracking-wider">
                          {categoryTitle}
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