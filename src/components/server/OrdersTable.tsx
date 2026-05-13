import { supabase } from '@/lib/supabase'
import OrdersSearch from '@/components/client/OrdersSearch'

async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      amount,
      status,
      created_at,
      customers (name),
      products (name)
    `)
    .order('id', { ascending: false })
    .limit(8)

  if (error) return null
  return data
}

export default async function OrdersTable() {
  const orders = await getOrders()
  if (!orders) return null

  return <OrdersSearch orders={orders as any} />
}