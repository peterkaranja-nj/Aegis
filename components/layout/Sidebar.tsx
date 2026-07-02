'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, ArrowLeftRight, BarChart2, Wallet,
  Users, Link2, UserCheck, Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { icon: LayoutDashboard, href: '/dashboard',                label: 'Overview' },
  { icon: ArrowLeftRight,  href: '/dashboard/transactions',   label: 'Transactions' },
  { icon: BarChart2,       href: '/dashboard/analytics',      label: 'Analytics' },
  { icon: Wallet,          href: '/dashboard/wallets',        label: 'Wallets' },
  { icon: Users,           href: '/dashboard/customers',      label: 'Customers' },
  { icon: Link2,           href: '/dashboard/payment-links',  label: 'Payment Links' },
  { icon: UserCheck,       href: '/dashboard/team',           label: 'Team' },
]

// Aside has 8px horizontal padding, so inner width when collapsed = 72 - 16 = 56px.
// To center an 18px icon in 56px: (56 - 18) / 2 = 19px paddingLeft on the item.
const PL_COLLAPSED = 19
const PL_EXPANDED  = 14

export function Sidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(false)

  const pl = expanded ? PL_EXPANDED : PL_COLLAPSED

  const itemStyle = (isActive: boolean): React.CSSProperties => ({
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: pl,
    gap: 10,
    transition: 'padding-left 0.25s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
  })

  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: expanded ? 160 : 0,
    opacity: expanded ? 1 : 0,
    transition: 'max-width 0.25s ease, opacity 0.15s ease',
  }

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        width: expanded ? 208 : 72,
        background: 'var(--color-sidebar)',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 8px 16px',
        gap: 4,
        flexShrink: 0,
        position: 'relative',
        zIndex: 20,
        margin: '12px 0 12px 12px',
        overflow: 'hidden',
        transition: 'width 0.25s ease',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          textDecoration: 'none',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          paddingLeft: 6,
        }}
      >
        {/* Yin-yang favicon mark */}
        <svg width="40" height="40" viewBox="0 0 32 32" style={{ minWidth: 40, flexShrink: 0, filter: 'drop-shadow(0 4px 8px rgba(37,211,102,0.45))' }}>
          <circle cx="16" cy="16" r="15" fill="#111111"/>
          <path d="M16,1 A15,15 0 0,1 16,31 A7.5,7.5 0 0,0 16,16 A7.5,7.5 0 0,1 16,1 Z" fill="#25D366"/>
          <circle cx="16" cy="8.5" r="2.5" fill="#111111"/>
          <circle cx="16" cy="23.5" r="2.5" fill="#25D366"/>
        </svg>
        <span style={{
          fontFamily: "'Rubik Dirt', cursive",
          color: '#25D366', fontSize: 17, letterSpacing: '0.06em',
          whiteSpace: 'nowrap', overflow: 'hidden',
          maxWidth: expanded ? 120 : 0,
          opacity: expanded ? 1 : 0,
          transition: 'max-width 0.25s ease, opacity 0.15s ease',
          textShadow: '0 0 12px rgba(37,211,102,0.5)',
        }}>
          AEGIS
        </span>
      </Link>

      {/* Nav items */}
      {NAV.map(item => {
        const isActive = item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href)
        const Icon = item.icon
        return (
          <div key={item.href} title={expanded ? undefined : item.label}>
            <Link href={item.href} style={{ textDecoration: 'none' }}>
              <div className={cn('nav-item', isActive && 'active')} style={itemStyle(isActive)}>
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} style={{ minWidth: 18, flexShrink: 0 }} />
                <span style={labelStyle}>{item.label}</span>
              </div>
            </Link>
          </div>
        )
      })}

      <div style={{ flex: 1 }} />

      {/* Settings */}
      <div title={expanded ? undefined : 'Settings'}>
        <Link href="/dashboard/settings" style={{ textDecoration: 'none' }}>
          <div
            className={cn('nav-item', pathname === '/dashboard/settings' && 'active')}
            style={itemStyle(pathname === '/dashboard/settings')}
          >
            <Settings size={18} strokeWidth={2} style={{ minWidth: 18, flexShrink: 0 }} />
            <span style={labelStyle}>Settings</span>
          </div>
        </Link>
      </div>

      {/* Avatar */}
      <div
        style={{
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          paddingLeft: pl,
          transition: 'padding-left 0.25s ease',
          cursor: 'pointer',
        }}
        title={expanded ? undefined : 'Peter Karanja'}
      >
        <div style={{
          width: 36, height: 36, minWidth: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg,#667eea,#764ba2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 12, fontWeight: 700,
          border: '2px solid rgba(255,255,255,0.12)',
          flexShrink: 0,
        }}>PK</div>
        <div style={{
          overflow: 'hidden',
          maxWidth: expanded ? 140 : 0,
          opacity: expanded ? 1 : 0,
          transition: 'max-width 0.25s ease, opacity 0.15s ease',
        }}>
          <div style={{ color: 'white', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>Peter Karanja</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, whiteSpace: 'nowrap' }}>Admin</div>
        </div>
      </div>
    </aside>
  )
}
