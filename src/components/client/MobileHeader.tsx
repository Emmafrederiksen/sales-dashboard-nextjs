'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="lg:hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-sidebar">
        <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-light rounded-lg flex items-center justify-center text-white text-sm font-bold">
                I
            </div>
            <span className="text-white text-sm font-medium">Insight</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="bg-sidebar px-3 pb-4">
          <p className="text-xs text-gray-500 uppercase tracking-widest px-2 mb-2 pt-2">
            Menu
          </p>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center px-3 py-2 rounded-lg text-xs transition-colors mb-1 ${
                pathname === item.href
                  ? 'bg-primary-light/25 text-accent-purple font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <p className="text-xs text-gray-500 uppercase tracking-widest px-2 mb-2 mt-3">
            System
          </p>
          {systemItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center px-3 py-2 rounded-lg text-xs transition-colors mb-1 ${
                pathname === item.href
                  ? 'bg-primary-light/25 text-accent-purple font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}