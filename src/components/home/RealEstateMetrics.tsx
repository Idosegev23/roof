'use client'

import { useState, useEffect } from 'react'
import { getCachedRealEstateKPIs } from '@/lib/israelRealEstateAPI'

// רכיב גרף חודש אחרון - מקצה לקצה
function MiniChart({ data, trend }: { data: number[], trend: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  // נקודות מקצה לקצה
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100 // מקצה לקצה
    const y = 90 - ((value - min) / range) * 80 // יותר גובה לגרף
    return `${x},${y}`
  }).join(' ')
  
  // צבעים בהתאם למגמה
  const strokeColor = trend === 'up' ? '#D94188' : '#EF4444'
  const fillColor = trend === 'up' ? 'rgba(217, 65, 136, 0.1)' : 'rgba(239, 68, 68, 0.1)'
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className="w-full h-full"> {/* גרף ממלא את כל הקונטיינר */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        preserveAspectRatio="none" 
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* גרדיאנט למילוי עדין יותר */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: strokeColor, stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: strokeColor, stopOpacity: 0.02 }} />
          </linearGradient>
        </defs>
        
        {/* אזור מתחת לקו - מכסה את כל הקונטיינר מקצה לקצה */}
        <polygon
          points={`0,100 ${points} 100,100`}
          fill={`url(#${gradientId})`}
        />
        
        {/* הקו העיקרי - עדין יותר */}
        <polyline
          points={points}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.6"
        />
        
        {/* נקודה אחרונה מודגשת */}
        {data.length > 0 && (
          <circle
            cx={((data.length - 1) / (data.length - 1)) * 100}
            cy={90 - ((data[data.length - 1] - min) / range) * 80}
            r="1.5"
            fill={strokeColor}
            fillOpacity="0.8"
          />
        )}
      </svg>
    </div>
  )
}

// נתוני אזורים חמים
const hotAreas = [
  { name: 'תל אביב מרכז', priceChange: +8.5, avgPrice: 45200 },
  { name: 'הרצליה פיתוח', priceChange: +12.3, avgPrice: 52800 },
  { name: 'רמת גן', priceChange: +6.7, avgPrice: 28900 },
  { name: 'נתניה', priceChange: +15.2, avgPrice: 19400 },
  { name: 'באר שבע', priceChange: +18.9, avgPrice: 12600 }
]

interface KPIDisplay {
  value: number
  change: number
  label: string
  unit: string
  trend: 'up' | 'down'
  chartData: number[]
}

export function RealEstateMetrics() {
  const [currentTime, setCurrentTime] = useState('')
  const [kpiData, setKpiData] = useState<KPIDisplay[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // עדכון שעה בזמן אמת
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleString('he-IL', {
        hour: '2-digit',
        minute: '2-digit'
      }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // טעינת נתונים אמיתיים מ-APIs ישראליים
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        console.log('🏠 טוען נתוני נדל״ן מ-APIs ישראליים...')
        
        const kpis = await getCachedRealEstateKPIs()
        
        // המרה לפורמט תצוגה עם גרפים סימולטיביים
        const displayData: KPIDisplay[] = [
          {
            value: kpis.avg_price_sqm.value,
            change: kpis.avg_price_sqm.change_pct,
            label: 'מחיר ממוצע למ"ר',
            unit: '₪',
            trend: kpis.avg_price_sqm.change_pct > 0 ? 'up' : 'down',
            chartData: generateChartData(kpis.avg_price_sqm.value, kpis.avg_price_sqm.change_pct)
          },
          {
            value: kpis.active_properties.value,
            change: kpis.active_properties.change_pct,
            label: 'נכסים למכירה',
            unit: '',
            trend: kpis.active_properties.change_pct > 0 ? 'up' : 'down',
            chartData: generateChartData(kpis.active_properties.value, kpis.active_properties.change_pct)
          },
          {
            value: kpis.mortgage_rate.value,
            change: kpis.mortgage_rate.change_pct,
            label: 'ריבית משכנתאות',
            unit: '%',
            trend: kpis.mortgage_rate.change_pct > 0 ? 'up' : 'down',
            chartData: generateChartData(kpis.mortgage_rate.value, kpis.mortgage_rate.change_pct, 'rate')
          },
          {
            value: kpis.transactions.value,
            change: kpis.transactions.change_pct,
            label: 'עסקאות החודש',
            unit: '',
            trend: kpis.transactions.change_pct > 0 ? 'up' : 'down',
            chartData: generateChartData(kpis.transactions.value, kpis.transactions.change_pct)
          }
        ]
        
        setKpiData(displayData)
        console.log('✅ נתוני נדל״ן אמיתיים נטענו בהצלחה')
      } catch (error) {
        console.error('❌ שגיאה בטעינת נתונים:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
    
    // עדכון כל שעה
    const interval = setInterval(loadData, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // פונקציה ליצירת נתוני גרף על בסיס הערך והשינוי
  const generateChartData = (currentValue: number, changePercent: number, type: string = 'normal'): number[] => {
    const points = 30
    const data: number[] = []
    
    for (let i = 0; i < points; i++) {
      const progress = i / (points - 1)
      const baseValue = currentValue * (1 - changePercent / 100)
      const trendValue = baseValue + (currentValue - baseValue) * progress
      
      // הוספת רעש ריאליסטי
      const noise = type === 'rate' ? 
        (Math.random() - 0.5) * 0.1 : 
        (Math.random() - 0.5) * (currentValue * 0.02)
        
      data.push(trendValue + noise)
    }
    
    return data
  }

  const formatNumber = (num: number, unit: string) => {
    if (unit === '%') {
      return num.toFixed(2) // ריבית עם 2 ספרות אחרי הנקודה
    }
    if (unit === '₪') {
      return num.toLocaleString('he-IL') // מחיר עם פסיקים
    }
    return num.toLocaleString('he-IL') // מספרים אחרים עם פסיקים
  }

  return (
    <section className="pt-32 pb-8 bg-black border-b" style={{borderBottomColor: 'rgba(217, 65, 136, 0.2)'}}>
      <div className="container max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* כותרת קומפקטית - מובייל פירסט */}
        <div className="text-center mb-6">
          <h2 className="text-lg md:text-xl font-light text-white mb-1">
            מדדי השוק <span style={{color: '#D94188'}} className="font-ultralight">Live</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-white/50 text-xs font-ultralight">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            עדכון: {currentTime}
          </div>
        </div>

        {/* גריד מדדים קומפקטי - 2 עמודות במובייל */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {isLoading ? (
            // מצב טעינה
            Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-lg p-3 md:p-4 border animate-pulse"
                style={{borderColor: 'rgba(217, 65, 136, 0.3)'}}
              >
                <div className="h-3 bg-white/20 rounded mb-2"></div>
                <div className="h-6 bg-white/20 rounded mb-2"></div>
                <div className="h-3 bg-white/20 rounded mb-2"></div>
                <div className="h-8 bg-white/10 rounded"></div>
              </div>
            ))
          ) : (
            kpiData?.map((metric, index) => (
            <div 
              key={index}
              className="relative bg-white/5 backdrop-blur-xl rounded-lg p-3 md:p-4 border hover:bg-white/10 transition-all duration-300 overflow-hidden"
              style={{borderColor: 'rgba(217, 65, 136, 0.3)'}}
            >
              {/* גרף ברקע - מקצה לקצה */}
              <div className="absolute inset-0 opacity-30 -m-3 md:-m-4">
                <MiniChart data={metric.chartData} trend={metric.trend} />
              </div>

              {/* תוכן מעל הגרף */}
              <div className="relative z-10">
                {/* כותרת המדד */}
                <div className="text-white/70 text-xs font-ultralight mb-1 uppercase tracking-wide">
                  {metric.label}
                </div>

                {/* הערך העיקרי */}
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-base md:text-lg font-light text-white">
                    {metric.unit === '₪' && '₪'}
                    {formatNumber(metric.value, metric.unit)}
                    {metric.unit !== '₪' && metric.unit && ` ${metric.unit}`}
                  </span>
                </div>

                {/* שינוי באחוזים - מדויק יותר */}
                <div className={`flex items-center gap-1 text-xs font-light ${
                  metric.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  <span className="text-xs">
                    {metric.change > 0 ? '▲' : '▼'}
                  </span>
                  <span>
                    {metric.change > 0 ? '+' : ''}{metric.change.toFixed(2)}%
                  </span>
                  <span className="text-white/40 text-xs mr-1">מהחודש הקודם</span>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
        
        {/* מקור הנתונים */}
        <div className="text-center mt-4">
          <p className="text-white/40 text-xs font-ultralight">
            מקור הנתונים: הלשכה המרכזית לסטטיסטיקה ובנק ישראל
          </p>
        </div>
      </div>
    </section>
  )
}
