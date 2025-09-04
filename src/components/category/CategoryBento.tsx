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
  // מקבלים רק את הכתבות הראשונות (עד 6 לבנטו)
  const bentoArticles = articles.slice(0, 6)

  if (bentoArticles.length === 0) {
    return (
      <div 
        className="text-center py-20"
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
            {bentoArticles.length} כתבות זמינות בקטגוריה זו
          </p>
        </div>

        {/* Bento Grid - קווים ישירים */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[200px]">
          
          {/* כתבה ראשית - גדולה */}
          {bentoArticles[0] && (
            <div className="col-span-12 md:col-span-8 row-span-2">
              <div className="group relative h-full overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                {/* תמונת רקע */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${bentoArticles[0].cover_image})`,
                  }}
                ></div>
                
                {/* אוברליי כהה */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* תוכן */}
                <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                  {/* כותרת */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 leading-tight group-hover:text-framework-accent-cta transition-colors duration-200">
                    <Link href={`/article/${bentoArticles[0].id}`}>
                      {bentoArticles[0].title}
                    </Link>
                  </h3>
                  
                  {/* תקציר */}
                  <p className="text-white/80 mb-4 font-ultralight leading-relaxed">
                    {bentoArticles[0].seo_description}
                  </p>
                  
                  {/* תאריך */}
                  <div className="text-white/60 text-sm font-ultralight">
                    {new Date(bentoArticles[0].created_at).toLocaleDateString('he-IL')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* כתבות צדדיות */}
          {bentoArticles.slice(1, 3).length > 0 && (
            <div className="col-span-12 md:col-span-4 grid grid-cols-1 gap-4 md:gap-6">
              {bentoArticles.slice(1, 3).map((article) => (
                <div key={article.id} className="group relative h-full overflow-hidden transition-all duration-300 hover:scale-[1.02]">
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
                    <h4 className="text-lg font-light text-white mb-2 leading-tight group-hover:text-framework-accent-cta transition-colors duration-200">
                      <Link href={`/article/${article.id}`}>
                        {article.title}
                      </Link>
                    </h4>
                    <div className="text-white/60 text-xs font-ultralight">
                      {new Date(article.created_at).toLocaleDateString('he-IL')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* שורה תחתונה - כתבות נוספות */}
          {bentoArticles.slice(3, 6).map((article) => (
            <div key={article.id} className="col-span-6 md:col-span-4">
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
                  <h4 className="text-sm md:text-base font-light text-white mb-2 leading-tight group-hover:text-framework-accent-cta transition-colors duration-200">
                    <Link href={`/article/${article.id}`}>
                      {article.title}
                    </Link>
                  </h4>
                  <div className="text-white/60 text-xs font-ultralight">
                    {new Date(article.created_at).toLocaleDateString('he-IL')}
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
