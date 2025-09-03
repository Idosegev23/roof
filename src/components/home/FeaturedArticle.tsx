import Link from 'next/link'

// כתבה נבחרת
const featuredArticle = {
  id: 'featured',
  title: "מדריך מקיף: איך לבחור דירה ראשונה ב-2024",
  summary: "כל מה שצריך לדעת לפני רכישת דירה ראשונה - החל מהכנת תקציב, דרך בחירת אזור, ועד לסגירת העסקה. מדריך מפורט עם טיפים מעשיים ממומחי הנדל״ן המובילים בישראל.",
  content: "רכישת דירה ראשונה היא צעד משמעותי בחיים, ויש להתכונן אליו בקפידה. במאמר זה נסקור את כל השלבים החשובים בתהליך...",
  image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
  category: "מדריכים",
  author: "שרה גולדמן",
  publishedAt: "לפני יום",
  readTime: "12 דקות קריאה",
  tags: ["דירה ראשונה", "מדריך קניה", "משכנתא", "השקעה"]
}

export function FeaturedArticle() {
  return (
    <section className="py-xxl bg-framework-background-light">
      <div className="container max-w-screen-xl mx-auto px-m">
        
        {/* Section Header */}
        <div className="text-center mb-xxl">
          <div className="inline-block bg-framework-accent-cta text-framework-white px-m py-xs rounded-button text-caption font-semibold mb-m">
            ◆ כתבה נבחרת השבוע
          </div>
          <h2 className="text-h2-mobile md:text-h2-desktop font-bold text-framework-primary-dark">
            המאמר הכי קרוא השבוע
          </h2>
        </div>

        {/* Featured Article Card */}
        <div className="card-base max-w-4xl mx-auto overflow-hidden">
          <div className="grid md:grid-cols-2 gap-l">
            
            {/* Image */}
            <div className="relative">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-64 md:h-full object-cover rounded-input"
              />
              
              {/* Category Badge */}
              <div className="absolute top-m right-m">
                <span className="bg-framework-accent-cta text-framework-white px-m py-xs rounded-button text-caption font-semibold">
                  {featuredArticle.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between py-m">
              
              {/* Article Header */}
              <div>
                <h3 className="text-h2-mobile md:text-h2-desktop font-bold text-framework-primary-dark mb-m leading-tight">
                  {featuredArticle.title}
                </h3>

                <p className="text-body text-framework-gray-medium leading-relaxed mb-l">
                  {featuredArticle.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-s mb-l">
                  {featuredArticle.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-xs bg-framework-gray-light text-framework-primary-dark px-s py-xs rounded-input text-caption"
                    >
                      <span className="text-framework-accent-cta font-bold">◉</span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Article Footer */}
              <div>
                {/* Meta Info */}
                <div className="flex items-center gap-l text-caption text-framework-gray-medium mb-l">
                  <div className="flex items-center gap-xs">
                    <span className="text-framework-accent-cta font-bold">◐</span>
                    {featuredArticle.author}
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="text-framework-accent-cta font-bold">○</span>
                    {featuredArticle.publishedAt}
                  </div>
                  <div className="hidden sm:block">
                    {featuredArticle.readTime}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/article/${featuredArticle.id}`}
                  className="inline-flex items-center gap-s btn-primary rounded-button px-l py-m font-semibold hover:scale-105 transition-transform"
                >
                  קרא את המדריך המלא
                  <span className="text-xl">←</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-xxl">
          <p className="text-body text-framework-gray-medium mb-m">
            רוצה להישאר מעודכן עם הכתבות החדשות ביותר?
          </p>
          <button className="btn-secondary rounded-button px-l py-m font-semibold">
            הרשמה לעדכונים
          </button>
        </div>
      </div>
    </section>
  )
}
