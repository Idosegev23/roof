import Link from 'next/link'
import { getFeaturedArticles } from '@/lib/mockArticles'

// המרת המאמרים המוקאפ לפורמט Bento Grid - 10 כתבות מובילות מכל הקטגוריות
const mockArticles = getFeaturedArticles(10)

// יצירת bentoArticles דינמית מכל המאמרים הזמינים
const bentoArticles = mockArticles.slice(0, 10).map((article, index) => {
  const getCategoryDisplayName = (cat: string) => {
    switch(cat) {
      case 'residential': return 'נדל״ן למגורים'
      case 'offices': return 'נדל״ן משרדי'  
      case 'investments': return 'נדל״ן להשקעה'
      default: return cat
    }
  }

  return {
    id: article.id,
    title: article.title,
    summary: article.seo_description,
    image: article.cover_image,
    category: getCategoryDisplayName(article.category),
    readTime: `${Math.floor(Math.random() * 5) + 3} דקות`,
    isHot: index === 0, // רק הכתבה הראשונה תהיה "חמה"
    size: index === 0 ? "large" : (index < 3 ? "medium" : "small")
  }
})

export function BentoGrid() {
  return (
    <section className="pt-xxxl pb-xxl bg-black">
      <div className="container max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-l text-center">
          <h2 className="text-h1-mobile md:text-h1-desktop font-light text-white mb-s">
            הכותרות החמות
          </h2>
          <p className="text-body text-white/60 font-ultralight">
            הכתבות הכי נקראות השבוع
          </p>
        </div>

        {/* Bento Grid - קווים ישירים ללא רדיוס */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[180px]">
          
          {/* כתבה ראשית - גדולה */}
          <div className="col-span-12 md:col-span-8 row-span-2">
            <div className="group relative h-full overflow-hidden transition-all duration-500 hover:scale-[1.02]">
              {/* תמונת רקע */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${bentoArticles[0].image})`,
                }}
              ></div>
              
              {/* אוברליי כהה */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* תוכן */}
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                {/* באדג' */}
                {bentoArticles[0].isHot && (
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-framework-accent-cta/20 text-framework-accent-cta border border-framework-accent-cta/30">
                      🔥 חם ביותר
                    </span>
                  </div>
                )}
                
                {/* קטגוריה */}
                <div className="mb-3">
                  <span className="text-framework-accent-cta text-sm font-medium uppercase tracking-wider">
                    {bentoArticles[0].category}
                  </span>
                </div>
                
                {/* כותרת */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 leading-tight group-hover:text-framework-accent-cta transition-colors duration-200">
                  <Link href={`/article/${bentoArticles[0].id}`}>
                    {bentoArticles[0].title}
                  </Link>
                </h3>
                
                {/* תקציר */}
                <p className="text-white/80 mb-4 font-ultralight leading-relaxed">
                  {bentoArticles[0].summary}
                </p>
                
                {/* זמן קריאה */}
                <div className="text-white/60 text-sm font-ultralight">
                  זמן קריאה: {bentoArticles[0].readTime}
                </div>
              </div>
            </div>
          </div>

          {/* כתבות צדדיות */}
          <div className="col-span-12 md:col-span-4 grid grid-cols-1 gap-4 md:gap-6">
            {bentoArticles.slice(1, 3).map((article) => (
              <div key={article.id} className="group relative h-full overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                {/* תמונת רקע */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${article.image})`,
                  }}
                ></div>
                
                {/* אוברליי */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* תוכן */}
                <div className="relative h-full flex flex-col justify-end p-4">
                  <div className="mb-2">
                    <span className="text-framework-accent-cta text-xs font-medium uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-light text-white mb-2 leading-tight group-hover:text-framework-accent-cta transition-colors duration-200">
                    <Link href={`/article/${article.id}`}>
                      {article.title}
                    </Link>
                  </h4>
                  <div className="text-white/60 text-xs font-ultralight">
                    {article.readTime}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* שורה שנייה - כתבות נוספות */}
          {bentoArticles.slice(3, 9).map((article, index) => (
            <div key={article.id} className="col-span-6 md:col-span-3">
              <div className="group relative h-full overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                {/* תמונת רקע */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${article.image})`,
                  }}
                ></div>
                
                {/* אוברליי */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* תוכן */}
                <div className="relative h-full flex flex-col justify-end p-4">
                  <div className="mb-2">
                    <span className="text-framework-accent-cta text-xs font-medium uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-light text-white mb-2 leading-tight group-hover:text-framework-accent-cta transition-colors duration-200">
                    <Link href={`/article/${article.id}`}>
                      {article.title}
                    </Link>
                  </h4>
                  <div className="text-white/60 text-xs font-ultralight">
                    {article.readTime}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* שורה שלישית - כתבה אחרונה רחבה */}
          {bentoArticles[9] && (
            <div className="col-span-12 md:col-span-6">
              <div className="group relative h-full overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                {/* תמונת רקע */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${bentoArticles[9].image})`,
                  }}
                ></div>
                
                {/* אוברליי */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* תוכן */}
                <div className="relative h-full flex flex-col justify-end p-4">
                  <div className="mb-2">
                    <span className="text-framework-accent-cta text-xs font-medium uppercase tracking-wider">
                      {bentoArticles[9].category}
                    </span>
                  </div>
                  <h4 className="text-lg font-light text-white mb-2 leading-tight group-hover:text-framework-accent-cta transition-colors duration-200">
                    <Link href={`/article/${bentoArticles[9].id}`}>
                      {bentoArticles[9].title}
                    </Link>
                  </h4>
                  <div className="text-white/60 text-xs font-ultralight">
                    {bentoArticles[9].readTime}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}