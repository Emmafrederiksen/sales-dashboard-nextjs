import NavItem from '@/components/client/NavItem'
import Link from 'next/link'

const navItems = [
  { label: 'Dashboard', href: '/' },
  { label: 'Ordrer', href: '/orders' },
  { label: 'Kunder', href: '/customers' },
  { label: 'Analyse', href: '/analytics' },
  { label: 'Produkter', href: '/products' },
]

const systemItems = [
  { label: 'Indstillinger', href: '/settings' },
  { label: 'Hjælp', href: '/help' },
]

export default function Sidebar() {
  return (
    <aside className="w-56 h-screen sticky top-0 bg-sidebar flex flex-col py-5 shrink-0">
      
      {/* Logo */}
      <Link href="/" className="px-5 mb-6 flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="w-7 h-7 bg-primary-light rounded-lg flex items-center justify-center text-white text-sm font-bold">
          I
        </div>
        <span className="text-white text-sm font-medium">Insight</span>
      </Link>

      {/* Navigation */}
      <nav className="px-3 flex-1">
        <p className="text-xs text-gray-500 uppercase tracking-widest px-2 mb-2">
          Menu
        </p>
        {navItems.map((item) => (
          <NavItem key={item.href} href={item.href} label={item.label} />
        ))}
      </nav>

      {/* System */}
      <div className="px-3">
        <p className="text-xs text-gray-500 uppercase tracking-widest px-2 mb-2">
          System
        </p>
        {systemItems.map((item) => (
          <NavItem key={item.href} href={item.href} label={item.label}/>
        ))}
      </div>

    </aside>
  )
}