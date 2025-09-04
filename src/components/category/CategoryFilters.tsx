'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, SortAsc } from 'lucide-react'

interface CategoryFiltersProps {
  category: string
  currentSearch?: string
}

export function CategoryFilters({ category, currentSearch }: CategoryFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(currentSearch || '')
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim())
    } else {
      params.delete('search')
    }
    
    router.push(`/category/${category}?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearchTerm('')
    router.push(`/category/${category}`)
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex-1 max-w-md">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="חפש מאמרים..."
            className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-framework-primary focus:ring-framework-primary"
            style={{
              backdropFilter: 'blur(10px)',
            }}
          />
        </form>
      </div>

      <div className="flex items-center gap-3">
        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/80 hover:text-white transition-all duration-200 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Filter className="h-4 w-4" />
          <span className="text-sm font-light">סינון</span>
        </button>
        
        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/80 hover:text-white transition-all duration-200 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <SortAsc className="h-4 w-4" />
          <span className="text-sm font-light">מיון</span>
        </button>
        
        {currentSearch && (
          <button 
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:text-white transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: '#D94188',
              boxShadow: '0 4px 16px rgba(217, 65, 136, 0.3)',
            }}
          >
            <span className="text-sm font-light">נקה סינונים</span>
          </button>
        )}
      </div>
    </div>
  )
}
