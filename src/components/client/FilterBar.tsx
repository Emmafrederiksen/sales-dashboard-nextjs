'use client'

import { useRouter, useSearchParams } from 'next/navigation'

type Period = 'week' | 'month' | 'quarter' | 'year'

const filters: { label: string; value: Period }[] = [
  { label: 'Uge', value: 'week' },
  { label: 'Måned', value: 'month' },
  { label: 'Kvartal', value: 'quarter' },
  { label: 'År', value: 'year' },
]

export default function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPeriod = searchParams.get('period') || 'month'

  function handleFilter(period: Period) {
    router.push(`/?period=${period}`)
  }

  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleFilter(filter.value)}
          className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
            currentPeriod === filter.value
              ? 'bg-white text-gray-900 font-medium shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}