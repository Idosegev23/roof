import Link from 'next/link'

// מערכת קטגוריות ראשונית - נדל"ן למגורים, נדל"ן משרדי, נדל"ן להשקעה
const categories = [
  {
    id: 'residential',
    title: 'נדל״ן למגורים',
    description: 'כתבות, ניתוחים וחדשות על שוק הדיור והמגורים',
    articleCount: 156
  },
  {
    id: 'offices',
    title: 'נדל״ן משרדי',
    description: 'כל מה שקשור לנכסים מסחריים ומשרדים להשכרה',
    articleCount: 89
  },
  {
    id: 'investments',
    title: 'נדל״ן להשקעה',
    description: 'אסטרטגיות השקעה, הזדמנויות ועצות למשקיעים',
    articleCount: 134
  }
]

export function CategoryGrid() {
  return (
    <section className="py-l bg-black border-b" style={{borderBottomColor: 'rgba(217, 65, 136, 0.2)'}}>
      <div className="container max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Categories - 2 שורות במובייל, שורה אחת בדסקטופ */}
        <div className="grid grid-cols-3 md:flex md:justify-center md:items-center gap-4 md:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="text-center md:whitespace-nowrap text-body font-light text-white hover:text-framework-accent-cta transition-colors duration-200 relative group"
            >
              {category.title}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-framework-accent-cta scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


