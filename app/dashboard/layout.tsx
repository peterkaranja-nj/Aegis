'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { ThemeProvider } from '@/components/layout/ThemeProvider'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard':               'Overview',
  '/dashboard/transactions':  'Transactions',
  '/dashboard/analytics':     'Analytics',
  '/dashboard/wallets':       'Wallets',
  '/dashboard/customers':     'Customers',
  '/dashboard/payment-links': 'Payment Links',
  '/dashboard/team':          'Team',
  '/dashboard/settings':      'Settings',
}

function DashboardInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const title = PAGE_TITLES[pathname] ?? 'AEGIS'
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--color-page)' }}>
      {mobileOpen && <div className="mobile-backdrop" onClick={() => setMobileOpen(false)} />}
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Topbar title={title} onMenuClick={() => setMobileOpen(o => !o)} />
        <main className="r-main" style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DashboardInner>{children}</DashboardInner>
    </ThemeProvider>
  )
}
