'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, Heart, ArrowLeft, Bed, Car, Ruler, MapPin, Star } from 'lucide-react'

const featuredProperties = [
  {
    id: 1,
    title: "פנטהאוס יוקרתי בלב תל אביב",
    location: "רוטשילד, תל אביב",
    price: "₪8,500,000",
    pricePerSqm: "₪42,500/מ״ר",
    bedrooms: 5,
    bathrooms: 3,
    parking: 2,
    area: 200,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
    tag: "בלעדי",
    rating: 4.9,
    views: 1247,
    isNew: true
  },
  {
    id: 2,
    title: "משרדים מפוארים במגדל חדש",
    location: "רמת גן - בורסה",
    price: "₪12,000,000",
    pricePerSqm: "₪30,000/מ״ר",
    bedrooms: null,
    bathrooms: 4,
    parking: 8,
    area: 400,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    tag: "השקעה",
    rating: 4.8,
    views: 892,
    isNew: false
  },
  {
    id: 3,
    title: "דירת גן בשכונה שקטה",
    location: "רמת אביב, תל אביב",
    price: "₪4,200,000",
    pricePerSqm: "₪28,000/מ״ר",
    bedrooms: 4,
    bathrooms: 2,
    parking: 1,
    area: 150,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    tag: "מומלץ",
    rating: 4.7,
    views: 654,
    isNew: true
  }
]

export function FeaturedProperties() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-title text-brand-dark mb-4">
            נכסים בולטים השבוע
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            הזדמנויות השקעה יוצאות דופן שנבחרו בקפידה על ידי המומחים שלנו
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white border-0">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay with icons */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={`${
                      property.tag === 'בלעדי' ? 'bg-red-500' :
                      property.tag === 'השקעה' ? 'bg-green-500' :
                      'bg-blue-500'
                    } text-white border-0`}>
                      {property.tag}
                    </Badge>
                    {property.isNew && (
                      <Badge className="bg-brand-accent text-white border-0">
                        חדש
                      </Badge>
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm border-0 hover:bg-white/30"
                      onClick={() => toggleFavorite(property.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(property.id)
                            ? 'text-red-500 fill-red-500'
                            : 'text-white'
                        }`}
                      />
                    </Button>
                  </div>

                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {property.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {property.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-title text-brand-dark mb-2 group-hover:text-brand-accent transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 ml-1" />
                    {property.location}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-brand-accent">
                      {property.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      {property.pricePerSqm}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    {property.bedrooms && (
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        {property.bedrooms}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Car className="h-4 w-4" />
                      {property.parking}
                    </div>
                    <div className="flex items-center gap-1">
                      <Ruler className="h-4 w-4" />
                      {property.area}מ״ר
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-button">
                  פרטים מלאים
                  <ArrowLeft className="h-4 w-4 mr-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="font-button">
            צפה בכל הנכסים
            <ArrowLeft className="h-5 w-5 mr-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
