'use client'

// מקורות נתונים אמיתיים לנדל"ן
export interface RealEstateMetric {
  value: number
  change: number
  label: string
  unit: string
  trend: 'up' | 'down'
  chartData: number[]
  lastUpdated: Date
}

export interface RealEstateData {
  averagePricePerSqm: RealEstateMetric
  propertiesForSale: RealEstateMetric
  mortgageRate: RealEstateMetric
  transactionsThisMonth: RealEstateMetric
}

// פונקציה לשליפת נתונים אמיתיים מ-APIs שונים
export async function fetchRealEstateData(): Promise<RealEstateData> {
  try {
    // לעת עתה משתמשים בנתונים סימולטיביים ריאליסטיים
    // בעתיד ניתן לשלב APIs אמיתיים
    console.log('מעדכן נתוני נדל״ן...')
    
    // סימולציה של זמן טעינה מה-API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const priceChange = generateRealisticChange(-2, 5)
    const listingChange = generateRealisticChange(-10, 3)
    const rateChange = generateRealisticChange(-0.5, 0.5)
    const transactionChange = generateRealisticChange(-5, 15)
    
    return {
      averagePricePerSqm: {
        value: generateRealisticPrice(),
        change: priceChange,
        label: 'מחיר ממוצע למ"ר',
        unit: '₪',
        trend: priceChange > 0 ? 'up' : 'down',
        chartData: generatePriceHistory(),
        lastUpdated: new Date()
      },
      propertiesForSale: {
        value: generateRealisticListings(),
        change: listingChange,
        label: 'נכסים למכירה',
        unit: '',
        trend: listingChange > 0 ? 'up' : 'down',
        chartData: generateListingHistory(),
        lastUpdated: new Date()
      },
      mortgageRate: {
        value: 4.85 + generateRealisticChange(-0.2, 0.2),
        change: rateChange,
        label: 'ריבית משכנתאות',
        unit: '%',
        trend: rateChange > 0 ? 'up' : 'down',
        chartData: generateRateHistory(),
        lastUpdated: new Date()
      },
      transactionsThisMonth: {
        value: generateRealisticTransactions(),
        change: transactionChange,
        label: 'עסקאות החודש',
        unit: '',
        trend: transactionChange > 0 ? 'up' : 'down',
        chartData: generateTransactionHistory(),
        lastUpdated: new Date()
      }
    }
  } catch (error) {
    console.error('שגיאה בשליפת נתונים:', error)
    // במקרה של שגיאה, נחזיר נתונים סימולטיביים
    return getFallbackData()
  }
}

// הערה: לעתיד ניתן לשלב APIs אמיתיים:
// 1. Bank of Israel API - לנתוני ריבית
// 2. Central Bureau of Statistics API - לנתוני עסקאות
// 3. מקורות נוספים לנתוני שוק הנדל״ן

// פונקציות יצירת נתונים ריאליסטיים
function generateRealisticPrice(): number {
  const basePrice = 28000
  const variation = (Math.random() - 0.5) * 2000
  return Math.round(basePrice + variation)
}

function generateRealisticChange(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100
}

function generateRealisticListings(): number {
  const base = 15000
  const variation = Math.random() * 3000
  return Math.round(base + variation)
}

function generateRealisticTransactions(): number {
  const base = 2500
  const variation = Math.random() * 800
  return Math.round(base + variation)
}

// פונקציות ליצירת נתוני חודש אחרון (30 נקודות)
function generatePriceHistory(): number[] {
  const current = generateRealisticPrice()
  const basePrice = current - 1000
  
  return Array.from({ length: 30 }, (_, i) => {
    // מגמה כללית עולה עם תנודות יומיות
    const trend = (i * 35) // עליה הדרגתית
    const dailyVariation = (Math.random() - 0.5) * 800 // תנודות יומיות
    const weeklyPattern = Math.sin(i / 7 * Math.PI) * 200 // דפוס שבועי
    
    return Math.round(basePrice + trend + dailyVariation + weeklyPattern)
  })
}

function generateListingHistory(): number[] {
  const current = generateRealisticListings()
  const baseListings = current + 2000
  
  return Array.from({ length: 30 }, (_, i) => {
    // מגמה יורדת עם תנודות
    const trend = -(i * 60) // ירידה הדרגתית במלאי
    const dailyVariation = (Math.random() - 0.5) * 400
    const weeklyPattern = Math.cos(i / 7 * Math.PI) * 300
    
    return Math.round(baseListings + trend + dailyVariation + weeklyPattern)
  })
}

function generateRateHistory(): number[] {
  const current = 4.85
  const baseRate = current - 0.4
  
  return Array.from({ length: 30 }, (_, i) => {
    // עליה הדרגתית בריבית
    const trend = (i * 0.013)
    const dailyVariation = (Math.random() - 0.5) * 0.1
    const weeklyPattern = Math.sin(i / 10 * Math.PI) * 0.05
    
    return Math.round((baseRate + trend + dailyVariation + weeklyPattern) * 100) / 100
  })
}

function generateTransactionHistory(): number[] {
  const current = generateRealisticTransactions()
  const baseTransactions = current - 800
  
  return Array.from({ length: 30 }, (_, i) => {
    // עליה הדרגתית בעסקאות
    const trend = (i * 25)
    const dailyVariation = (Math.random() - 0.5) * 200
    const weeklyPattern = Math.sin(i / 7 * Math.PI) * 150
    
    return Math.round(baseTransactions + trend + dailyVariation + weeklyPattern)
  })
}

// נתונים חלופיים במקרה של שגיאה
function getFallbackData(): RealEstateData {
  return {
    averagePricePerSqm: {
      value: 28750,
      change: 2.3,
      label: 'מחיר ממוצע למ"ר',
      unit: '₪',
      trend: 'up',
      chartData: [28200, 28300, 28450, 28600, 28750],
      lastUpdated: new Date()
    },
    propertiesForSale: {
      value: 15847,
      change: -5.2,
      label: 'נכסים למכירה',
      unit: '',
      trend: 'down',
      chartData: [16720, 16450, 16200, 16000, 15847],
      lastUpdated: new Date()
    },
    mortgageRate: {
      value: 4.85,
      change: 0.15,
      label: 'ריבית משכנתאות',
      unit: '%',
      trend: 'up',
      chartData: [4.70, 4.72, 4.78, 4.82, 4.85],
      lastUpdated: new Date()
    },
    transactionsThisMonth: {
      value: 2847,
      change: 12.5,
      label: 'עסקאות החודש',
      unit: '',
      trend: 'up',
      chartData: [2530, 2620, 2710, 2780, 2847],
      lastUpdated: new Date()
    }
  }
}

// Cache לנתונים (עדכון כל שעה)
let cachedData: RealEstateData | null = null
let lastFetch: Date | null = null

export async function getCachedRealEstateData(): Promise<RealEstateData> {
  const now = new Date()
  const oneHour = 60 * 60 * 1000
  
  // בדיקה אם צריך לעדכן את המטמון
  if (!cachedData || !lastFetch || (now.getTime() - lastFetch.getTime()) > oneHour) {
    console.log('מעדכן נתוני נדל״ן...')
    cachedData = await fetchRealEstateData()
    lastFetch = now
  }
  
  return cachedData
}
