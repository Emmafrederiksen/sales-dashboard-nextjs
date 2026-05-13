'use client'

import { useState } from 'react'

interface Order {
  id: number
  amount: number
  status: string
  created_at: string
  customers: { name: string } | null
  products: { name: string } | null
}

interface OrdersSearchProps {
  orders: Order[]
}

export default function OrdersSearch({ orders }: OrdersSearchProps) {
  const [search, setSearch] = useState('')

  const filtered = orders.filter((order) => {
    const query = search.toLowerCase()
    return (
        order.customers?.name?.toLowerCase().includes(query) ||
        order.products?.name?.toLowerCase().includes(query) ||
        order.id.toString().includes(query)
    )
  })

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div>
            <h2 className="text-card-title text-gray-900">Seneste ordrer</h2>
            <p className="text-xs text-gray-400 mt-0.5">
            Viser {filtered.length} af {orders.length} transaktioner
            </p>
        </div>

        {/* Søgefelt */}
        <input
            type="text"
            placeholder="Søg ordre, kunde eller produkt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary-light placeholder-gray-400"
        />
        </div>

        {/* Tabel – scroll på mobil */}
        <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
            <thead>
                <tr>
                <th className="text-table-header text-gray-400 uppercase text-left pb-3">Ordre</th>
                <th className="text-table-header text-gray-400 uppercase text-left pb-3">Kunde</th>
                <th className="text-table-header text-gray-400 uppercase text-left pb-3">Produkt</th>
                <th className="text-table-header text-gray-400 uppercase text-left pb-3">Beløb</th>
                <th className="text-table-header text-gray-400 uppercase text-left pb-3">Status</th>
                <th className="text-table-header text-gray-400 uppercase text-left pb-3">Dato</th>
                </tr>
             </thead>
             <tbody>
                {filtered.length === 0 ? (
                <tr>
                    <td colSpan={6} className="py-8 text-center text-xs text-gray-400">
                    Ingen ordrer matcher din søgning
                    </td>
                </tr>
                ) : (
                filtered.map((order) => (
                    <tr key={order.id} className="border-t border-gray-50">
                    <td className="py-3 text-xs text-gray-400">#{order.id}</td>
                    <td className="py-3">
                        <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-accent-purple flex items-center justify-center text-primary text-xs font-medium shrink-0">
                            {order.customers?.name?.charAt(0)}
                        </div>
                        <span className="text-xs text-gray-700">
                            {order.customers?.name}
                        </span>
                        </div>
                    </td>
                    <td className="py-3 text-xs text-gray-700">
                        {order.products?.name}
                    </td>
                    <td className="py-3 text-xs font-medium text-gray-900">
                        {order.amount.toLocaleString('da-DK')} kr
                    </td>
                    <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'completed'
                            ? 'bg-accent-green text-kpi-green'
                            : 'bg-accent-amber text-kpi-amber'
                        }`}>
                        {order.status === 'completed' ? 'Gennemført' : 'Afventer'}
                        </span>
                    </td>
                    <td className="py-3 text-xs text-gray-400">
                        {new Date(order.created_at).toLocaleDateString('da-DK')}
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    )
}