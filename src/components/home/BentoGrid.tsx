import Link from 'next/link'
import { getFeaturedArticles } from '@/lib/mockArticles'

// המרת המאמרים המוקאפ לפורמט Bento Grid
const mockArticles = getFeaturedArticles(6)

const bentoArticles = [
  // הכתבה הכי נקראת - הכי גדולה
  {
    id: mockArticles[0]?.id || 'featured-1',
    title: mockArticles[0]?.title || "דוח שוק נדל״ן 2024 - המדד החדש של מחירי הדיירות",
    summary: mockArticles[0]?.seo_description || "דוח מקיף על מצב שוק הנדל״ן בישראל ותחזיות לרבעון הקרוב",
    image: mockArticles[0]?.cover_image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    category: "ניתוח שוק",
    readTime: "8 דקות",
    isHot: true,
    size: "large"
  },
  {
    id: mockArticles[1]?.id || 'residential-1',
    title: mockArticles[1]?.title || "המדריך המלא לקניית דירה ראשונה בישראל",
    image: mockArticles[1]?.cover_image || "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop",
    category: "נדל״ן למגורים",
    readTime: "5 דקות",
    size: "medium"
  },
  {
    id: mockArticles[2]?.id || 'offices-1',
    title: mockArticles[2]?.title || "המשרדים הזולים ביותר במרכז הארץ",
    image: mockArticles[2]?.cover_image || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop",
    category: "נדל״ן משרדי",
    readTime: "3 דקות",
    size: "small"
  },
  {
    id: mockArticles[3]?.id || 'investments-1',
    title: mockArticles[3]?.title || "השקעה בנדל״ן בחו״ל - הזדמנויות בברלין ולונדון",
    image: mockArticles[3]?.cover_image || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=200&fit=crop",
    category: "נדל״ן להשקעה",
    readTime: "4 דקות",
    size: "small"
  },
  {
    id: mockArticles[4]?.id || 'residential-2',
    title: mockArticles[4]?.title || "שכונות חמות בתל אביב - איפה כדאי לקנות עכשיו?",
    image: mockArticles[4]?.cover_image || "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    category: "נדל״ן למגורים",
    readTime: "6 דקות",
    size: "medium"
  },
  {
    id: mockArticles[5]?.id || 'featured-2',
    title: mockArticles[5]?.title || "פרויקט TAMA 38 בחיפה - הזדמנות זהב לדיירים",
    image: mockArticles[5]?.cover_image || "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=200&fit=crop",
    category: "התחדשות עירונית",
    readTime: "4 דקות",
    size: "small"
  }
]

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

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 h-[800px] md:h-[600px]">
          
          {/* כתבה ראשית - גדולה */}
          <div className="col-span-12 md:col-span-8 row-span-2">
            <div className="group relative h-full rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
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

          {/* כתבות צדדיות - 4 קטנות */}
          <div className="col-span-12 md:col-span-4 grid grid-cols-1 gap-4 md:gap-6">
            {bentoArticles.slice(1, 3).map((article) => (
              <div key={article.id} className="group relative h-[190px] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]">
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

          {/* שורה תחתונה - 3 כתבות בינוניות */}
          {bentoArticles.slice(3, 6).map((article) => (
            <div key={article.id} className="col-span-12 md:col-span-4">
              <div className="group relative h-[190px] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]">
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
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}