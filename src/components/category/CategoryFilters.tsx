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
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="חפש מאמרים..."
            className="pr-10"
          />
        </form>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 ml-2" />
          סינון
        </Button>
        <Button variant="outline" size="sm">
          <SortAsc className="h-4 w-4 ml-2" />
          מיון
        </Button>
        {currentSearch && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            נקה סינונים
          </Button>
        )}
      </div>
    </div>
  )
}
