import { Suspense } from 'react' // Importér Suspense fra React for at håndtere asynkrone komponenter

import KPICards from '@/components/server/KPICards'
import FilterBar from '@/components/client/FilterBar'
import OrdersTable from '@/components/server/OrdersTable'
import CategoryList from '@/components/client/CategoryList'
import RevenueChart from '@/components/client/RevenueChart'


type Period = 'week' | 'month' | 'quarter' | 'year'

interface PageProps {
  searchParams: Promise<{ period?: string }>
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

      {/* Graf og kategori side om side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <CategoryList />
        </div>
      </div>

      {/* Ordrer Tabel */}
      <OrdersTable />
    </div>
  )
}