import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .limit(5)

  console.log('Data:', data)
  console.log('Error:', error)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}