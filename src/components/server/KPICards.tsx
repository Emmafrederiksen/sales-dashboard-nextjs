import { supabase } from '@/lib/supabase'

type Period = 'week' | 'month' | 'quarter' | 'year'

function getDateRange(period: Period) { // Funktion til at beregne datointervallet baseret på den valgte periode
  const now = new Date() 
  
  switch (period) { // Beregn datointervallet baseret på den valgte periode
    case 'week':
      return {
        current: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString(), // Startdato for nuværende uge
        previous: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14).toISOString(), // Startdato for forrige uge
        previousEnd: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString(), // Slutdato for forrige uge
      }
    case 'month':
      return {
        current: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(), // Startdato for nuværende måned
        previous: new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString(), // Startdato for forrige måned
        previousEnd: new Date(now.getFullYear(), now.getMonth(), 0).toISOString(), // Slutdato for forrige måned
      }
    case 'quarter':
      return {
        current: new Date(now.getFullYear(), now.getMonth() - 3, 1).toISOString(), // Startdato for nuværende kvartal
        previous: new Date(now.getFullYear(), now.getMonth() - 6, 1).toISOString(), // Startdato for forrige kvartal
        previousEnd: new Date(now.getFullYear(), now.getMonth() - 3, 0).toISOString(), // Slutdato for forrige kvartal
      }
    case 'year':
      return {
        current: new Date(now.getFullYear(), 0, 1).toISOString(), // Startdato for nuværende år
        previous: new Date(now.getFullYear() - 1, 0, 1).toISOString(), // Startdato for forrige år
        previousEnd: new Date(now.getFullYear(), 0, 0).toISOString(), // Slutdato for forrige år
      }
  }
}

async function getKPIData(period: Period) { // Funktion til at hente KPI-data baseret på den valgte periode
  const range = getDateRange(period) // Hent ordrer for den nuværende periode

  const { data: currentOrders } = await supabase
    .from('orders')
    .select('amount, customer_id')
    .gte('created_at', range.current)

  const { data: lastOrders } = await supabase 
    .from('orders')
    .select('amount, customer_id')
    .gte('created_at', range.previous) 
    .lte('created_at', range.previousEnd)

  if (!currentOrders || !lastOrders) return null

  const totalRevenue = currentOrders.reduce((sum, o) => sum + o.amount, 0) 
  const totalOrders = currentOrders.length
  const uniqueCustomers = new Set(currentOrders.map(o => o.customer_id)).size
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  const lastRevenue = lastOrders.reduce((sum, o) => sum + o.amount, 0)
  const lastTotalOrders = lastOrders.length 
  const lastCustomers = new Set(lastOrders.map(o => o.customer_id)).size
  const lastAvg = lastTotalOrders > 0 ? lastRevenue / lastTotalOrders : 0

  const calcChange = (current: number, last: number) => { // Funktion til at beregne procentvis ændring mellem nuværende og forrige periode
    if (last === 0) return '+0%'
    const change = ((current - last) / last) * 100
    return `${change >= 0 ? '+' : ''}${Math.round(change)}%`
  }

  const isPositive = (current: number, last: number) => current >= last // Funktion til at bestemme om ændringen er positiv eller negativ

  return {
    totalRevenue,
    totalOrders,
    uniqueCustomers,
    avgOrderValue,
    changes: {
      revenue: { value: calcChange(totalRevenue, lastRevenue), positive: isPositive(totalRevenue, lastRevenue) },
      orders: { value: calcChange(totalOrders, lastTotalOrders), positive: isPositive(totalOrders, lastTotalOrders) },
      customers: { value: calcChange(uniqueCustomers, lastCustomers), positive: isPositive(uniqueCustomers, lastCustomers) },
      avgOrder: { value: calcChange(avgOrderValue, lastAvg), positive: isPositive(avgOrderValue, lastAvg) },
    }
  }
}

interface KPICardsProps {
  period: Period // KPICards forventer at få en period prop, som angiver hvilken periode der skal vises data for
}

export default async function KPICards({ period }: KPICardsProps) { // Hovedkomponenten for KPI-kortene, som henter data og viser dem i kortformat
  const data = await getKPIData(period)

  if (!data) return null

  const accentColors = [
    'bg-primary-light',
    'bg-kpi-green',
    'bg-kpi-amber',
    'bg-kpi-blue',
  ]

  const cards = [ // Definer kortdata baseret på de hentede KPI-data, inklusive label, værdi, ændring og om det er et fremhævet kort
    {
      label: 'Omsætning',
      value: `${data.totalRevenue.toLocaleString('da-DK')} kr`,
      change: data.changes.revenue.value,
      positive: data.changes.revenue.positive,
      featured: true,
    },
    {
      label: 'Ordrer',
      value: data.totalOrders.toString(),
      change: data.changes.orders.value,
      positive: data.changes.orders.positive,
      featured: false,
    },
    {
      label: 'Kunder',
      value: data.uniqueCustomers.toString(),
      change: data.changes.customers.value,
      positive: data.changes.customers.positive,
      featured: false,
    },
    {
      label: 'Gns. ordreværdi',
      value: `${Math.round(data.avgOrderValue).toLocaleString('da-DK')} kr`,
      change: data.changes.avgOrder.value,
      positive: data.changes.avgOrder.positive,
      featured: false,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {cards.map((card, index) => (
        <div
          key={card.label}
          className={`rounded-xl border p-4 relative overflow-hidden ${
            card.featured
              ? 'bg-sidebar border-sidebar'
              : 'bg-white border-gray-100'
          }`}
        >
          {/* Accent linje øverst */}
          <div className={`absolute top-0 left-0 right-0 h-0.5 ${accentColors[index]}`} />

          {/* Label */}
          <p className={`text-kpi-label uppercase tracking-wider mb-2 ${
            card.featured ? 'text-gray-400' : 'text-gray-400'
          }`}>
            {card.label}
          </p>

          {/* Værdi */}
          <p className={`text-kpi-value font-medium ${
            card.featured ? 'text-white' : 'text-gray-900'
          }`}>
            {card.value}
          </p>

          {/* Ændring */}
          <p className={`text-xs mt-1 ${
            card.positive ? 'text-kpi-green' : 'text-kpi-red'
          }`}>
            {card.change} vs. sidste periode
          </p>
        </div>
      ))}
    </div>
  )
}