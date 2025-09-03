import Link from 'next/link'

// נתוני כתבות לבנטו גריד
const bentoArticles = [
  // הכתבה הכי נקראת - הכי גדולה
  {
    id: 1,
    title: "מחירי הדירות בתל אביב: עליה דרמטית של 15% ב-2024",
    summary: "דוח מקיף על המגמות החדשות בשוק הנדל״ן הישראלי ומה שמחכה לקונים ב-2025",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    category: "ניתוח שוק",
    readTime: "8 דקות",
    isHot: true,
    size: "large"
  },
  {
    id: 2,
    title: "השקעה במשרדים: המדריך המלא לשנת 2024",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    category: "השקעות",
    readTime: "5 דקות",
    size: "medium"
  },
  {
    id: 3,
    title: "פרויקטי יוקרה חדשים בהרצליה פיתוח",
    image: "https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?w=400&h=200&fit=crop",
    category: "פרויקטים",
    readTime: "3 דקות",
    size: "small"
  },
  {
    id: 4,
    title: "מגמות חדשות בשוק הנדל״ן המסחרי",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop",
    category: "מסחר",
    readTime: "4 דקות",
    size: "small"
  },
  {
    id: 5,
    title: "איך לבחור דירה ראשונה: טיפים מקצועיים",
    image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400&h=300&fit=crop",
    category: "מגורים",
    readTime: "6 דקות",
    size: "medium"
  },
  {
    id: 6,
    title: "התחדשות עירונית: הזדמנויות חדשות בתל אביב",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=200&fit=crop",
    category: "התחדשות",
    readTime: "5 דקות",
    size: "medium"
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
            הכתבות הכי נקראות השבוע
          </p>
        </div>

        {/* Bento Grid Layout - מלא את כל המקום */}
        <div className="grid grid-cols-12 gap-3 auto-rows-min">
          
          {/* הכתבה הראשית - תופסת 8 עמודות */}
          <Link 
            href={`/article/${bentoArticles[0].id}`}
            className="group col-span-12 md:col-span-8 relative overflow-hidden bg-gradient-to-br from-framework-primary-dark to-gray-800 border-2 border-framework-accent-cta hover:scale-[1.005] transition-all duration-300 h-[320px]"
          >
            <img
              src={bentoArticles[0].image}
              alt={bentoArticles[0].title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              {bentoArticles[0].isHot && (
                <div className="inline-flex items-center gap-2 bg-framework-accent-cta text-white px-3 py-1 text-sm font-semibold mb-3 rounded-full">
                  <span className="font-bold">●</span>
                  חם עכשיו
                </div>
              )}
              <div className="text-sm text-white/70 mb-2">{bentoArticles[0].category}</div>
              <h3 className="text-xl md:text-2xl font-bold leading-tight mb-3">
                {bentoArticles[0].title}
              </h3>
              <p className="text-white/80 mb-4 line-clamp-2 hidden md:block">
                {bentoArticles[0].summary}
              </p>
              <div className="text-sm text-white/60">
                {bentoArticles[0].readTime} קריאה
              </div>
            </div>
          </Link>

          {/* כתבה צדדית ימנית */}
          <Link 
            href={`/article/${bentoArticles[1].id}`}
            className="group col-span-12 md:col-span-4 relative overflow-hidden bg-white border-2 border-framework-accent-cta hover:shadow-lg hover:scale-[1.005] transition-all duration-300 h-[320px]"
          >
            <img
              src={bentoArticles[1].image}
              alt={bentoArticles[1].title}
              className="w-full h-1/2 object-cover"
            />
            <div className="p-4 h-1/2 flex flex-col justify-between">
              <div>
                <div className="text-xs text-framework-accent-cta font-semibold mb-2">{bentoArticles[1].category}</div>
                <h3 className="text-sm font-bold text-framework-primary-dark leading-tight mb-2 line-clamp-3">
                  {bentoArticles[1].title}
                </h3>
              </div>
              <div className="text-xs text-framework-gray-medium">
                {bentoArticles[1].readTime}
              </div>
            </div>
          </Link>

          {/* 4 כתבות קטנות בשורה */}
          <Link 
            href={`/article/${bentoArticles[2].id}`}
            className="group col-span-6 md:col-span-3 relative overflow-hidden bg-white border-2 border-framework-accent-cta hover:shadow-lg hover:scale-[1.005] transition-all duration-300 h-[160px]"
          >
            <img
              src={bentoArticles[2].image}
              alt={bentoArticles[2].title}
              className="w-full h-2/3 object-cover"
            />
            <div className="p-3 h-1/3">
              <div className="text-xs text-framework-accent-cta font-semibold mb-1">{bentoArticles[2].category}</div>
              <h3 className="text-xs font-bold text-framework-primary-dark leading-tight line-clamp-2">
                {bentoArticles[2].title}
              </h3>
            </div>
          </Link>

          <Link 
            href={`/article/${bentoArticles[3].id}`}
            className="group col-span-6 md:col-span-3 relative overflow-hidden bg-white border-2 border-framework-accent-cta hover:shadow-lg hover:scale-[1.005] transition-all duration-300 h-[160px]"
          >
            <img
              src={bentoArticles[3].image}
              alt={bentoArticles[3].title}
              className="w-full h-2/3 object-cover"
            />
            <div className="p-3 h-1/3">
              <div className="text-xs text-framework-accent-cta font-semibold mb-1">{bentoArticles[3].category}</div>
              <h3 className="text-xs font-bold text-framework-primary-dark leading-tight line-clamp-2">
                {bentoArticles[3].title}
              </h3>
            </div>
          </Link>

          <Link 
            href={`/article/${bentoArticles[4].id}`}
            className="group col-span-6 md:col-span-3 relative overflow-hidden bg-white border-2 border-framework-accent-cta hover:shadow-lg hover:scale-[1.005] transition-all duration-300 h-[160px]"
          >
            <img
              src={bentoArticles[4].image}
              alt={bentoArticles[4].title}
              className="w-full h-2/3 object-cover"
            />
            <div className="p-3 h-1/3">
              <div className="text-xs text-framework-accent-cta font-semibold mb-1">{bentoArticles[4].category}</div>
              <h3 className="text-xs font-bold text-framework-primary-dark leading-tight line-clamp-2">
                {bentoArticles[4].title}
              </h3>
            </div>
          </Link>

          <Link 
            href={`/article/${bentoArticles[5].id}`}
            className="group col-span-6 md:col-span-3 relative overflow-hidden bg-gradient-to-r from-blue-900 to-purple-900 border-2 border-framework-accent-cta hover:scale-[1.005] transition-all duration-300 h-[160px]"
          >
            <img
              src={bentoArticles[5].image}
              alt={bentoArticles[5].title}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
              <div className="text-xs text-white/70 mb-1">{bentoArticles[5].category}</div>
              <h3 className="text-xs font-bold leading-tight">
                {bentoArticles[5].title}
              </h3>
            </div>
          </Link>

        </div>
      </div>
    </section>
  )
}