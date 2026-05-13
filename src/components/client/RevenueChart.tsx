'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { supabase } from '@/lib/supabase'

interface MonthlyData {
  month: string
  omsætning: number
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']

export default function RevenueChart() {
  const [data, setData] = useState<MonthlyData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data: orders } = await supabase
        .from('orders')
        .select('amount, created_at')
        .order('created_at', { ascending: true })

      if (!orders) return

      // Gruppér per måned
      const monthly: Record<string, number> = {}
      orders.forEach((order) => {
        const date = new Date(order.created_at)
        const key = `${date.getFullYear()}-${date.getMonth()}`
        monthly[key] = (monthly[key] || 0) + order.amount
      })

      // Konverter til array med månedsnavn
      const result = Object.entries(monthly).map(([key, total]) => {
        const [year, month] = key.split('-')
        return {
          month: `${MONTHS[parseInt(month)]} ${year.slice(2)}`,
          omsætning: total,
        }
      })

      setData(result)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-4 h-full">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="h-40 bg-gray-100 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 h-full">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-card-title text-gray-900">Omsætning over tid</h2>
        <p className="text-xs text-gray-400 mt-0.5">Månedlig omsætning</p>
      </div>

      {/* Graf */}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value) => [`${Number(value).toLocaleString('da-DK')} kr`, 'Omsætning']}
            contentStyle={{
                fontSize: '12px',
                borderRadius: '8px',
                border: '1px solid #F3F4F6',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            />
          <Bar 
            dataKey="omsætning" 
            fill="#26215C"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}