import { Suspense } from 'react' // Importér Suspense fra React for at håndtere asynkrone komponenter

import KPICards from '@/components/server/KPICards'
import FilterBar from '@/components/client/FilterBar'

type Period = 'week' | 'month' | 'quarter' | 'year'

interface PageProps {
  searchParams: { period?: string }
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams
  const period = (params.period as Period) || 'month'

  console.log('Period:', period)

  return (
    <div>
      {/* Topbar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium text-gray-900">Dashboard</h1>
          <p className="text-xs text-gray-400 mt-0.5">Opdateret i dag</p>
        </div>
        <Suspense fallback={<div className="h-8 w-48 bg-gray-100 rounded-lg animate-pulse" />}>
          <FilterBar />
        </Suspense>
      </div>

      {/* KPI Kort */}
      <KPICards period={period} />
    </div>
  )
}