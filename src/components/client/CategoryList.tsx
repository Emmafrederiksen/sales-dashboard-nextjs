'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Category {
  name: string
  total: number
  percentage: number
}

const categoryColors: Record<string, string> = {
  'Jakker & frakker': 'bg-primary-light',
  'Bukser & jeans': 'bg-kpi-green',
  'Toppe & bluser': 'bg-kpi-amber',
  'Sko & støvler': 'bg-kpi-blue',
  'Accessories': 'bg-kpi-purple',
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('orders')
        .select(`
          amount,
          products (
            categories (name)
          )
        `)

      if (!data) return

      // Gruppér per kategori
      const totals: Record<string, number> = {}
      data.forEach((order: any) => {
        const category = order.products?.categories?.name
        if (category) {
          totals[category] = (totals[category] || 0) + order.amount
        }
      })

      const grandTotal = Object.values(totals).reduce((sum, val) => sum + val, 0)

      const result = Object.entries(totals)
        .map(([name, total]) => ({
          name,
          total,
          percentage: Math.round((total / grandTotal) * 100),
        }))
        .sort((a, b) => b.total - a.total)

      setCategories(result)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-100 rounded w-1/2" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-3 bg-gray-100 rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-card-title text-gray-900">Salg per kategori</h2>
        <p className="text-xs text-gray-400 mt-0.5">Andel af total omsætning</p>
      </div>

      {/* Kategorier */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">{cat.name}</span>
              <span className="font-medium text-gray-900">{cat.percentage}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${categoryColors[cat.name] || 'bg-gray-400'}`}
                style={{ width: `${cat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}