import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Sidebar from '@/components/server/Sidebar'
import MobileHeader from '@/components/client/MobileHeader'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Insight Dashboard',
  description: 'Salgsdashboard for tøjwebshop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da">
      <body className={`${inter.variable} font-sans bg-gray-50 text-gray-900 antialiased`}>
        <div className="flex min-h-screen">
          
          {/* Sidebar */}
          <Sidebar />
          
          <div className="flex-1 flex flex-col min-w-0">
            {/* Mobile header – kun synlig på mobil */}
            <MobileHeader />
            
            <main className="flex-1 p-4 lg:p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}