import { NextResponse } from 'next/server'
import { getCachedRealEstateKPIs } from '@/lib/israelRealEstateAPI'

export const revalidate = 3600 // ISR-like cache (1h)

export async function GET() {
  try {
    const data = await getCachedRealEstateKPIs()
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 's-maxage=1800, stale-while-revalidate=3600',
      },
    })
  } catch (e) {
    // fallback data already happens inside lib; double-guard
    return NextResponse.json({
      avg_price_sqm: { value: 28750, change_pct: 2.3 },
      active_properties: { value: 15847, change_pct: -5.2 },
      mortgage_rate: { value: 4.85, change_pct: 0.15 },
      transactions: { value: 2847, change_pct: 12.5 },
    })
  }
}


