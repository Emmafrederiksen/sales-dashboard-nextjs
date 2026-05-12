import KPICards from '@/components/server/KPICards'

type Period = 'week' | 'month' | 'quarter' | 'year'

interface PageProps {
  searchParams: { period?: string }
}

export default function DashboardPage({ searchParams }: PageProps) {
  const period = (searchParams.period as Period) || 'month'

  return (
    <div>
      {/* Topbar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium text-gray-900">Dashboard</h1>
          <p className="text-xs text-gray-400 mt-0.5">Opdateret i dag</p>
        </div>
      </div>

      {/* KPI Kort */}
      <KPICards period={period} />
    </div>
  )
}