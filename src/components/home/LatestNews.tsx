import Link from 'next/link'

// חדשות וכתבות אחרונות
const latestArticles = [
  {
    id: 1,
    title: "בנק ישראל מעלה ריבית: מה המשמעות למשכנתאות?",
    summary: "ניתוח מקיף של החלטת בנק ישראל והשפעתה על לווי דירות ושוק הנדל״ן",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop",
    category: "כלכלה",
    author: "רונן כהן",
    publishedAt: "לפני שעה",
    readTime: "6 דקות",
    isHot: true
  },
  {
    id: 2,
    title: "פרויקט יוקרה חדש בהרצליה פיתוח עם מחירים מ-8 מיליון ₪",
    summary: "פרויקט מגורים יוקרתי חדש עם נוף לים ושירותים מתקדמים",
    image: "https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?w=400&h=250&fit=crop",
    category: "פרויקטים חדשים",
    author: "מיכל לוי",
    publishedAt: "לפני 3 שעות",
    readTime: "4 דקות",
    isHot: false
  },
  {
    id: 3,
    title: "מחקר: אלו הערים עם הפוטנציאל הגבוה ביותר להשקעה ב-2024",
    summary: "דירוג ערים על פי פוטנציאל עליית ערך ותשואה למשקיעים",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
    category: "מחקרים",
    author: "ד״ר אלון שפירא",
    publishedAt: "לפני 5 שעות",
    readTime: "8 דקות",
    isHot: true
  },
  {
    id: 4,
    title: "טרנדים חדשים בעיצוב דירות: מה צפוי ב-2024",
    summary: "הטרנדים החמים בעיצוב פנים שמשפיעים על ערך הנכסים",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
    category: "עיצוב ואדריכלות",
    author: "טליה רוזן",
    publishedAt: "לפני 8 שעות",
    readTime: "5 דקות",
    isHot: false
  },
  {
    id: 5,
    title: "חוק התכנון החדש: איך זה ישפיע על מחירי הדירות?",
    summary: "ניתוח משפטי וכלכלי של החוק החדש והשלכותיו על השוק",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
    category: "חקיקה ותקנות",
    author: "עו״ד דני אברמוביץ",
    publishedAt: "לפני יום",
    readTime: "10 דקות",
    isHot: false
  },
  {
    id: 6,
    title: "השוואת מחירים: תל אביב מול לונדון ומול ניו יורק",
    summary: "מחירי הנדל״ן בישראל לעומת ערים גדולות בעולם - תמונת מצב",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop",
    category: "השוואות בין-לאומיות",
    author: "יואב מנדלסון",
    publishedAt: "לפני יום",
    readTime: "7 דקות",
    isHot: false
  }
]

export function LatestNews() {
  return (
    <section className="py-xxl bg-framework-white">
      <div className="container max-w-screen-xl mx-auto px-m">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-xxl">
          <div>
            <h2 className="text-h2-mobile md:text-h2-desktop font-bold text-framework-primary-dark mb-s">
              חדשות ועדכונים
            </h2>
            <p className="text-body text-framework-gray-medium">
              הכתבות והחדשות האחרונות מעולם הנדל״ן
            </p>
          </div>
          
          {/* View All Link */}
          <Link
            href="/articles"
            className="hidden md:inline-flex items-center gap-s text-framework-accent-cta hover:text-framework-primary-dark transition-colors font-semibold"
          >
            צפה בכל הכתבות
            <span className="text-lg">←</span>
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-l">
          {latestArticles.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.id}`}
              className="group"
            >
              <article className="card-base border border-framework-gray-light hover:border-framework-accent-cta transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                
                {/* Article Image */}
                <div className="relative mb-m">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-input"
                  />
                  
                  {/* Hot Badge */}
                  {article.isHot && (
                    <div className="absolute top-s right-s bg-framework-error text-framework-white px-s py-xs rounded-input text-caption font-semibold flex items-center gap-xs">
                      <span className="font-bold">▲</span>
                      חם
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute bottom-s right-s bg-framework-white/90 text-framework-primary-dark px-s py-xs rounded-input text-caption font-medium backdrop-blur-sm">
                    {article.category}
                  </div>
                </div>

                {/* Article Content */}
                <div>
                  <h3 className="text-h3-mobile font-semibold text-framework-primary-dark mb-s leading-tight group-hover:text-framework-accent-cta transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-body text-framework-gray-medium leading-relaxed mb-m line-clamp-3">
                    {article.summary}
                  </p>

                  {/* Article Meta */}
                  <div className="flex items-center justify-between text-caption text-framework-gray-medium">
                    <div className="flex items-center gap-m">
                      <div className="flex items-center gap-xs">
                        <span className="text-framework-accent-cta font-bold">◐</span>
                        {article.author}
                      </div>
                      <div className="flex items-center gap-xs">
                        <span className="text-framework-accent-cta font-bold">○</span>
                        {article.publishedAt}
                      </div>
                    </div>
                    <div className="text-framework-accent-cta font-medium">
                      {article.readTime}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center mt-l md:hidden">
          <Link
            href="/articles"
            className="inline-flex items-center gap-s btn-secondary rounded-button px-l py-m font-semibold"
          >
            צפה בכל הכתבות
            <span className="text-lg">←</span>
          </Link>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-xxl">
          <div className="bg-gradient-to-l from-framework-accent-cta/10 via-framework-accent-cta/5 to-transparent rounded-card p-xxl border border-framework-accent-cta/20">
            <div className="max-w-2xl">
              <h3 className="text-h3-mobile font-bold text-framework-primary-dark mb-m">
                עדכונים יומיים למייל
              </h3>
              <p className="text-body text-framework-gray-medium mb-l">
                קבל את החדשות והכתבות החשובות ביותר מעולם הנדל״ן ישירות למייל שלך
              </p>
              
              <div className="flex flex-col sm:flex-row gap-m">
                <input
                  type="email"
                  placeholder="הכנס כתובת מייל"
                  className="input-base flex-1 text-body"
                />
                <button className="btn-primary rounded-button px-l py-m font-semibold whitespace-nowrap">
                  הרשמה לעדכונים
                </button>
              </div>
              
              <div className="text-caption text-framework-gray-medium mt-s">
                ללא ספאם, ניתן לבטל בכל עת
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
