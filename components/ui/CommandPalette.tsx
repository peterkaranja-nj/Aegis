'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, LayoutDashboard, ArrowLeftRight, BarChart2, Wallet, Users, Link2, UserCheck, Settings } from 'lucide-react'

const COMMANDS = [
  { group: 'Pages', items: [
    { icon: LayoutDashboard, label: 'Overview',       desc: 'Dashboard home',    href: '/',               kbd: 'G O' },
    { icon: ArrowLeftRight,  label: 'Transactions',   desc: 'Payment history',   href: '/transactions',   kbd: 'G T' },
    { icon: BarChart2,       label: 'Analytics',      desc: 'Charts & reports',  href: '/analytics',      kbd: 'G A' },
    { icon: Wallet,          label: 'Wallets',        desc: 'Multi-currency',    href: '/wallets',        kbd: 'G W' },
    { icon: Users,           label: 'Customers',      desc: 'User management',   href: '/customers',      kbd: 'G C' },
    { icon: Link2,           label: 'Payment Links',  desc: 'Create & share',    href: '/payment-links',  kbd: '' },
    { icon: UserCheck,       label: 'Team',           desc: 'Members & roles',   href: '/team',           kbd: '' },
    { icon: Settings,        label: 'Settings',       desc: 'Account & API keys',href: '/settings',       kbd: '' },
  ]},
]

interface Props { open: boolean; onClose: () => void }

export function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const allItems = COMMANDS.flatMap(g => g.items)
  const filtered = query
    ? allItems.filter(i => i.label.toLowerCase().includes(query.toLowerCase()) || i.desc.toLowerCase().includes(query.toLowerCase()))
    : allItems

  useEffect(() => {
    if (open) { setQuery(''); setSelected(0); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open ? onClose() : null }
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, filtered.length - 1))
      if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, 0))
      if (e.key === 'Enter' && filtered[selected]) { router.push(filtered[selected].href); onClose() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, selected, filtered, onClose, router])

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '14vh',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 560, background: 'var(--color-card)',
          borderRadius: 18, overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.25), 0 0 0 1px var(--color-border)',
          animation: 'fadeUp 0.2s ease both',
        }}
      >
        {/* Search input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: '1px solid var(--color-border)' }}>
          <Search size={17} color="var(--color-text-3)" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0) }}
            placeholder="Search pages, transactions, customers…"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: 15, color: 'var(--color-text)', fontFamily: 'Inter, sans-serif',
            }}
          />
          <button
            onClick={onClose}
            style={{ fontSize: 11, color: 'var(--color-text-3)', background: 'var(--color-border-light)', padding: '3px 8px', borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: 'monospace' }}
          >esc</button>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 380, overflowY: 'auto', padding: 8 }}>
          {!query && COMMANDS.map(group => (
            <div key={group.group}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '8px 10px 4px' }}>
                {group.group}
              </div>
              {group.items.map((item, i) => {
                const globalIdx = allItems.indexOf(item)
                const Icon = item.icon
                return (
                  <div
                    key={item.href}
                    onClick={() => { router.push(item.href); onClose() }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px', borderRadius: 10, cursor: 'pointer',
                      background: globalIdx === selected ? 'var(--color-border-light)' : 'transparent',
                      transition: 'background 0.1s ease',
                    }}
                    onMouseEnter={() => setSelected(globalIdx)}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: 'var(--color-green-light)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Icon size={15} color="var(--color-green-dark)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{item.desc}</div>
                    </div>
                    {item.kbd && (
                      <span style={{ fontSize: 11, color: 'var(--color-text-3)', background: 'var(--color-border-light)', padding: '2px 6px', borderRadius: 5, fontFamily: 'monospace' }}>
                        {item.kbd}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
          {query && filtered.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.href}
                onClick={() => { router.push(item.href); onClose() }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '10px', borderRadius: 10, cursor: 'pointer',
                  background: i === selected ? 'var(--color-border-light)' : 'transparent',
                }}
                onMouseEnter={() => setSelected(i)}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={15} color="var(--color-green-dark)" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{item.desc}</div>
                </div>
              </div>
            )
          })}
          {query && filtered.length === 0 && (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-3)', fontSize: 13 }}>
              No results for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid var(--color-border)', padding: '10px 18px', display: 'flex', gap: 16 }}>
          {[['↑↓','navigate'],['↵','select'],['esc','close']].map(([kbd, label]) => (
            <div key={kbd} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--color-text-3)' }}>
              <kbd style={{ background: 'var(--color-border-light)', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace' }}>{kbd}</kbd>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
