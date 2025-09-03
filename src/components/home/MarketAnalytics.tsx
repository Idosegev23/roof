'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, TrendingDown, Activity, BarChart3, Users, Building2, DollarSign, Percent } from 'lucide-react'

// Mock data - would be real API calls in production
const marketData = {
  overview: [
    { 
      title: "מדד המחירים הכללי", 
      value: "127.8", 
      change: "+3.2%", 
      positive: true,
      description: "עליה מהחודש שעבר"
    },
    { 
      title: "עסקאות החודש", 
      value: "2,847", 
      change: "+12.5%", 
      positive: true,
      description: "לעומת החודש שעבר"
    },
    { 
      title: "ימי מכירה ממוצעים", 
      value: "42", 
      change: "-8.7%", 
      positive: true,
      description: "קיצור זמן מכירה"
    },
    { 
      title: "תשואה שנתית ממוצעת", 
      value: "8.3%", 
      change: "+1.1%", 
      positive: true,
      description: "השקעות דירות מגורים"
    }
  ],
  cities: [
    { name: "תל אביב", avgPrice: "₪19,200", change: "+2.8%", positive: true, volume: 245 },
    { name: "רמת גן", avgPrice: "₪16,800", change: "+3.1%", positive: true, volume: 189 },
    { name: "הרצליה", avgPrice: "₪22,500", change: "+1.9%", positive: true, volume: 156 },
    { name: "פתח תקווה", avgPrice: "₪14,200", change: "+4.2%", positive: true, volume: 298 },
    { name: "ראשון לציון", avgPrice: "₪13,800", change: "-0.5%", positive: false, volume: 203 }
  ]
}

export function MarketAnalytics() {
  const [activeTab, setActiveTab] = useState("overview")
  const [animatedValues, setAnimatedValues] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValues(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-title text-brand-dark mb-4">
            אנליטיקות שוק בזמן אמת
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            נתונים מדויקים ומעודכנים המאפשרים לך לקבל החלטות חכמות ומושכלות
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="overview" className="font-medium">סקירה כללית</TabsTrigger>
            <TabsTrigger value="cities" className="font-medium">עמוד ערים</TabsTrigger>
            <TabsTrigger value="trends" className="font-medium">מגמות</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {marketData.overview.map((metric, index) => (
                <Card key={metric.title} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                        <p className={`text-3xl font-bold transition-all duration-1000 ${
                          animatedValues ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`} style={{ transitionDelay: `${index * 200}ms` }}>
                          {metric.value}
                        </p>
                      </div>
                      <div className={`p-2 rounded-lg ${metric.positive ? 'bg-green-100' : 'bg-red-100'}`}>
                        {metric.positive ? 
                          <TrendingUp className="h-5 w-5 text-green-600" /> : 
                          <TrendingDown className="h-5 w-5 text-red-600" />
                        }
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        metric.positive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </span>
                      <span className="text-sm text-gray-500">{metric.description}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Live Activity Feed */}
            <Card className="bg-gradient-to-r from-brand-dark to-gray-800 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Activity className="h-6 w-6 ml-2 text-brand-accent" />
                  פעילות בזמן אמת
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>נכס חדש בתל אביב צפון - 4.5 חדרים</span>
                    </div>
                    <span className="text-sm text-gray-300">לפני דקה</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span>עסקה נסגרה ברמת גן - ₪3.2M</span>
                    </div>
                    <span className="text-sm text-gray-300">לפני 3 דקות</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span>עדכון מחיר בהרצליה - ירידה של 2%</span>
                    </div>
                    <span className="text-sm text-gray-300">לפני 5 דקות</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cities" className="space-y-6">
            <div className="grid gap-4">
              {marketData.cities.map((city, index) => (
                <Card key={city.name} className="group hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-gradient-to-br from-brand-accent to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {city.name[0]}
                        </div>
                        <div>
                          <h3 className="font-title text-lg text-brand-dark">{city.name}</h3>
                          <p className="text-sm text-gray-500">{city.volume} עסקאות החודש</p>
                        </div>
                      </div>
                      
                      <div className="text-left">
                        <div className="text-2xl font-bold text-brand-dark">{city.avgPrice}</div>
                        <div className="text-sm text-gray-500">מחיר ממוצע למ״ר</div>
                      </div>
                      
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                        city.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {city.positive ? 
                          <TrendingUp className="h-4 w-4" /> : 
                          <TrendingDown className="h-4 w-4" />
                        }
                        <span className="font-medium">{city.change}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 ml-2 text-brand-accent" />
                    תחזית מחירים ל-6 חודשים
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>גרף תחזית מחירים</p>
                      <p className="text-sm">חזה עליה של 6-8% בחצי השנה הקרובה</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 ml-2 text-brand-accent" />
                    ביקוש לפי סוג נכס
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span>דירות 3-4 חדרים</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-blue-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">80%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-green-600" />
                        <span>פנטהאוזים</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-3/5 h-full bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-purple-600" />
                        <span>משרדים</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-2/5 h-full bg-purple-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-brand-accent hover:bg-brand-accent/90 font-button">
            דו״ח שוק מפורט
            <BarChart3 className="h-5 w-5 mr-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
