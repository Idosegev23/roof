'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Building2, MapPin, Calculator, Search, Play } from 'lucide-react'

// Mock market data - would be real API in production
const marketData = {
  avgPriceTLV: "₪18,500",
  monthlyChange: "+2.3%",
  yearlyChange: "+12.8%",
  activeListings: "2,847",
  totalTransactions: "₪8.2B",
  hotAreas: ["תל אביב צפון", "רמת אביב", "פלורנטין"]
}

export function HomeHero() {
  const [currentArea, setCurrentArea] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArea((prev) => (prev + 1) % marketData.hotAreas.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-brand-dark text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-brand-accent/20 rounded-full px-4 py-2 text-sm font-medium">
                <TrendingUp className="h-4 w-4 ml-2 text-brand-accent" />
                שוק הנדל״ן הישראלי עולה ב-{marketData.yearlyChange} השנה
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-title leading-tight">
                הפלטפורמה
                <span className="block text-brand-accent">המקצועית</span>
                <span className="block">לנדל״ן</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                נתונים אמיתיים, ניתוחים מקצועיים והזדמנויות השקעה בזמן אמת
                מהפלטפורמה המובילה בשוק הנדל״ן הישראלי
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white font-button shadow-xl">
                <Play className="h-5 w-5 ml-2" />
                התחל לחקור עכשיו
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 font-button">
                <Calculator className="h-5 w-5 ml-2" />
                מחשבון השקעה
              </Button>
            </div>

            {/* Hot Areas Ticker */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5 text-brand-accent flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">אזורים חמים השבוע</div>
                  <div className="text-lg font-medium transition-all duration-500">
                    {marketData.hotAreas[currentArea]}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Market Dashboard */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-title mb-6 flex items-center">
                <Building2 className="h-6 w-6 ml-2 text-brand-accent" />
                לוח נתונים - שוק תל אביב
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-brand-accent">{marketData.avgPriceTLV}</div>
                    <div className="text-sm text-gray-300">מחיר ממוצע למ״ר</div>
                    <div className="text-xs text-green-400 mt-1">{marketData.monthlyChange} מהחודש שעבר</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-400">{marketData.activeListings}</div>
                    <div className="text-sm text-gray-300">נכסים פעילים</div>
                    <div className="text-xs text-blue-400 mt-1">עדכון: עכשיו</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10 col-span-2">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-yellow-400">{marketData.totalTransactions}</div>
                    <div className="text-sm text-gray-300">סה״כ עסקאות השנה</div>
                    <div className="text-xs text-yellow-400 mt-1">{marketData.yearlyChange} גידול שנתי</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Search */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <h4 className="text-lg font-title text-gray-900 mb-4">חיפוש מהיר</h4>
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="חפש לפי עיר, שכונה או רחוב..."
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-gray-900"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="text-gray-700 border-gray-200 hover:bg-gray-50">
                    מגורים
                  </Button>
                  <Button variant="outline" size="sm" className="text-gray-700 border-gray-200 hover:bg-gray-50">
                    משרדים
                  </Button>
                  <Button variant="outline" size="sm" className="text-gray-700 border-gray-200 hover:bg-gray-50">
                    השקעה
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
