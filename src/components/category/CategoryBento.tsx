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
    <section className="py-12">
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
            // כל 4 כתבות, אחת תהיה רחבה יותר  
            else if ((index - 1) % 4 === 0 && articles.length > index + 1) {
              colSpan = 'col-span-2 md:col-span-2 lg:col-span-2'
            }
            // כל 6 כתבות, אחת תהיה גבוהה יותר
            else if ((index - 1) % 6 === 0) {
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
                    {/* קטגוריה */}
                    <div className="mb-2">
                      <span className="text-framework-accent-cta text-xs font-medium uppercase tracking-wider">
                        {categoryTitle}
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
