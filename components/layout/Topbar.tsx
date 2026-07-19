'use client'
import { useState } from 'react'
import { Search, Moon, Sun, Bell, Menu } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { CommandPalette } from '../ui/CommandPalette'

interface TopbarProps { title: string; onMenuClick?: () => void }

export function Topbar({ title, onMenuClick }: TopbarProps) {
  const { theme, toggle } = useTheme()
  const [cmdOpen, setCmdOpen] = useState(false)

  return (
    <>
      <header style={{
        height: 64, flexShrink: 0,
        background: theme === 'dark' ? 'rgba(21,24,33,0.85)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid var(--color-border)`,
        display: 'flex', alignItems: 'center',
        padding: '0 20px', gap: 12,
      }}>
        {/* Hamburger — shown only on mobile via CSS */}
        <button
          className="hamburger-btn"
          onClick={onMenuClick}
          style={{
            width: 36, height: 36, borderRadius: 10,
            border: '1px solid var(--color-border)',
            background: 'var(--color-card)',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
          aria-label="Open menu"
        >
          <Menu size={16} color="var(--color-text-2)" />
        </button>

        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', flex: 1, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </h1>

        {/* Search trigger — hidden on mobile */}
        <button
          className="topbar-search"
          onClick={() => setCmdOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--color-input-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 10, padding: '8px 14px',
            width: 220, cursor: 'pointer',
            transition: 'all 0.15s ease', flexShrink: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-text-3)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        >
          <Search size={14} color="var(--color-text-3)" />
          <span style={{ fontSize: 13, color: 'var(--color-text-3)', flex: 1, textAlign: 'left' }}>Search…</span>
          <span style={{ fontSize: 11, color: 'var(--color-text-3)', background: 'var(--color-border-light)', padding: '2px 6px', borderRadius: 5, fontFamily: 'monospace' }}>⌘K</span>
        </button>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button
            onClick={toggle}
            style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--color-border)', background: 'var(--color-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s ease' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} color="var(--color-text-2)" /> : <Moon size={15} color="var(--color-text-2)" />}
          </button>

          <button style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--color-border)', background: 'var(--color-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }} aria-label="Notifications">
            <Bell size={15} color="var(--color-text-2)" />
            <span style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: '50%', background: '#EF4444', border: '1.5px solid var(--color-card)' }} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 10, padding: '5px 12px 5px 5px', cursor: 'pointer' }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700 }}>PK</div>
            <span className="topbar-user-name" style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>Peter Karanja</span>
          </div>
        </div>
      </header>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  )
}
