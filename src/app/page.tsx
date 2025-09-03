import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { RealEstateMetrics } from '@/components/home/RealEstateMetrics'
import { BentoGrid } from '@/components/home/BentoGrid'
import { CategoryGrid } from '@/components/home/CategoryGrid'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        {/* מדדי נדל"ן בזמן אמת */}
        <RealEstateMetrics />
        
        {/* קטגוריות פשוטות */}
        <CategoryGrid />
        
        {/* כתבות בלייאאוט בנטו */}
        <BentoGrid />
      </main>
      <Footer />
    </div>
  )
}
