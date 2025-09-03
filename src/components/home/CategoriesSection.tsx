import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building, Briefcase, TrendingUp, ArrowLeft } from 'lucide-react'

const categories = [
  {
    id: 'residential',
    title: 'דירות מגורים',
    description: 'כל מה שצריך לדעת על קניה, מכירה והשכרת דירות מגורים',
    icon: Building,
    color: 'bg-blue-500',
    articles: 45
  },
  {
    id: 'offices',
    title: 'משרדים ומסחר',
    description: 'השקעות במשרדים, חללי מסחר ונכסים עסקיים',
    icon: Briefcase,
    color: 'bg-green-500',
    articles: 28
  },
  {
    id: 'investments',
    title: 'השקעות נדל״ן',
    description: 'אסטרטגיות השקעה, ניתוח שוק וטיפים למשקיעים',
    icon: TrendingUp,
    color: 'bg-purple-500',
    articles: 32
  }
]

export function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-title text-brand-dark mb-4">קטגוריות מאמרים</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            חקור את התחומים השונים בעולם הנדל״ן ומצא בדיוק את המידע שאתה מחפש
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${category.color} rounded-full mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-title text-brand-dark mb-3">
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="text-sm text-gray-500 mb-6">
                    {category.articles} מאמרים
                  </div>

                  <Button variant="outline" className="group-hover:bg-brand-accent group-hover:text-white group-hover:border-brand-accent transition-all">
                    <Link href={`/category/${category.id}`} className="flex items-center">
                      צפה במאמרים
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-brand-dark rounded-16 p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-title mb-4">
            מעוניין בייעוץ אישי?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            קבל ייעוץ מקצועי ואישי מרווני פרידן, מומחה הנדל״ן עם ניסיון של מעל 15 שנה בתחום
          </p>
          <Button size="lg" className="bg-brand-accent hover:bg-brand-accent/90 font-button">
            צור קשר עכשיו
          </Button>
        </div>
      </div>
    </section>
  )
}
