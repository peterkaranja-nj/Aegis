'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { TrendingUp, TrendingDown, Plus, Send, ArrowUpRight, ChevronRight } from 'lucide-react'
import {
  TRANSACTIONS, CURRENCIES, INCOME_DATA, EXPENSE_DATA,
  WALLETS, type Transaction
} from '@/lib/data'
import { formatCurrency, statusColor } from '@/lib/utils'
import { IncomeAreaChart, ExpenseMiniBar, DonutSmall } from '@/components/charts/Charts'

function AnimatedNumber({ target, prefix = '$' }: { target: number, prefix?: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    const duration = 1200
    const steps = 60
    const increment = target / steps
    let current = 0
    ref.current = setInterval(() => {
      current += increment
      if (current >= target) { setDisplay(target); clearInterval(ref.current!) }
      else setDisplay(Math.round(current))
    }, duration / steps)
    return () => clearInterval(ref.current!)
  }, [target])
  return <span>{prefix}{display.toLocaleString()}</span>
}

const QUICK_STATS = [
  { label: 'Total Balance',   value: 20670,  prefix: '$', delta: '+4.2%',  up: true  },
  { label: 'Monthly Income',  value: 21000,  prefix: '$', delta: '+12.5%', up: true  },
  { label: 'Monthly Spend',   value: 8640,   prefix: '$', delta: '-3.1%',  up: false },
  { label: 'Success Rate',    value: 98,     prefix: '',  delta: '+0.3%',  up: true, suffix: '%' },
]

const TRANSFER_CONTACTS = [
  { initials: 'SJ', color: '#7C3AED', name: 'Sarah' },
  { initials: 'MC', color: '#0369A1', name: 'Marcus' },
  { initials: 'JO', color: '#047857', name: 'James' },
  { initials: 'AP', color: '#BE185D', name: 'Aisha' },
]

export default function OverviewPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* Row 1: KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {QUICK_STATS.map((s, i) => (
          <div key={s.label} className={`card card-p anim-fade-up delay-${i + 1}`} style={{ cursor: 'default' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-2)' }}>{s.label}</span>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: s.up ? 'var(--color-green-light)' : 'var(--color-red-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {s.up ? <TrendingUp size={14} color="var(--color-green-dark)" /> : <TrendingDown size={14} color="#B91C1C" />}
              </div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em', lineHeight: 1 }}>
              <AnimatedNumber target={s.value} prefix={s.prefix} />
              {s.suffix}
            </div>
            <div className={`delta ${s.up ? 'delta-up' : 'delta-down'}`} style={{ marginTop: 8, fontSize: 11 }}>
              {s.delta} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Balance + Income chart + Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 300px', gap: 14 }}>

        {/* Balance card (green) */}
        <div className="anim-fade-up delay-1" style={{
          background: 'var(--color-green)', borderRadius: 16, padding: 20,
          color: 'white', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ position: 'absolute', top: -24, right: -24, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', bottom: -16, left: 40, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Balance</div>
            <div style={{ fontSize: 30, fontWeight: 900, marginTop: 6, letterSpacing: '-0.03em', lineHeight: 1 }}>
              $20,670 <span style={{ fontSize: 14, fontWeight: 500, opacity: 0.7 }}>USD</span>
            </div>
            <div style={{ fontSize: 12, opacity: 0.65, marginTop: 4 }}>Across all accounts</div>
          </div>

          {/* Mini donut progress */}
          <div style={{ margin: '16px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ width: '68%', height: '100%', background: 'white', borderRadius: 99 }} />
            </div>
            <span style={{ fontSize: 12, opacity: 0.75 }}>68% of limit</span>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 'auto', position: 'relative' }}>
            <button className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', justifyContent: 'center' }}>
              <ArrowUpRight size={13} /> Deposit
            </button>
            <button className="btn" style={{ flex: 1, background: 'white', color: '#009970', justifyContent: 'center', fontWeight: 700 }}>
              <Send size={13} /> Send
            </button>
          </div>
        </div>

        {/* Income chart */}
        <div className="card card-p anim-fade-up delay-2" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)' }}>Income Overview</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-2)', marginTop: 2 }}>6-month revenue trend</div>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span className="badge badge-green" style={{ fontSize: 11 }}>▲ Month</span>
              <span className="delta delta-up" style={{ fontSize: 11 }}>+$3,221</span>
            </div>
          </div>
          <div style={{ flex: 1, height: 180 }}>
            <IncomeAreaChart data={INCOME_DATA} />
          </div>
        </div>

        {/* Right col: credit cards + quick transfer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Credit cards */}
          <div className="card card-p-sm anim-fade-up delay-1">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)' }}>Your Cards</span>
              <button style={{ width: 26, height: 26, borderRadius: 8, border: '1.5px dashed var(--color-border)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-3)', fontSize: 16 }}>+</button>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div className="credit-card" style={{ background: 'linear-gradient(135deg,#1a1a2e,#16213e)' }}>
                <div className="cc-chip" />
                <div className="cc-number">•••• •••• •••• 7777</div>
                <div className="cc-bottom">
                  <div><div className="cc-amount">$2,981</div><div className="cc-expiry">20/26</div></div>
                  <div style={{ fontSize: 13, fontWeight: 900, color: 'white', letterSpacing: '0.05em' }}>VISA</div>
                </div>
              </div>
              <div className="credit-card" style={{ background: 'linear-gradient(135deg,#0F2027,#203A43)' }}>
                <div className="cc-chip" style={{ background: 'linear-gradient(135deg,#e8a020,#c47800)' }} />
                <div className="cc-number">•••• •••• •••• 1888</div>
                <div className="cc-bottom">
                  <div><div className="cc-amount">$520</div><div className="cc-expiry">18/25</div></div>
                  <div style={{ fontSize: 9, fontWeight: 900, color: 'white' }}>MASTERCARD</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick transfer */}
          <div className="card card-p-sm anim-fade-up delay-2">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)' }}>Quick Transfer</span>
              <Link href="/wallets" style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-green-dark)', textDecoration: 'none' }}>View all</Link>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              {TRANSFER_CONTACTS.map(c => (
                <button key={c.initials} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 700, transition: 'transform 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  >{c.initials}</div>
                  <span style={{ fontSize: 9, color: 'var(--color-text-3)' }}>{c.name}</span>
                </button>
              ))}
              <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--color-border-light)', border: '1.5px dashed var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-3)', fontSize: 20 }}>+</div>
                <span style={{ fontSize: 9, color: 'var(--color-text-3)' }}>Add</span>
              </button>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-border-light)', borderRadius: 10, padding: '8px 12px' }}>
              <span style={{ fontSize: 16 }}>🇬🇧</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', flex: 1 }}>$2,760</span>
              <button className="btn btn-primary btn-sm">Send →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Mini income + Expenses + FX */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        {/* Income donut */}
        <div className="card card-p-sm anim-fade-up delay-2">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Income</div>
            <div style={{ width: 56, height: 56, position: 'relative' }}>
              <DonutSmall pct={75} color="var(--color-green)" />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--color-text)' }}>75%</div>
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>$1,400</div>
          <div className="delta delta-up" style={{ marginTop: 6, fontSize: 11 }}>+8.2% this month</div>
        </div>

        {/* Expense mini bar */}
        <div className="card card-p-sm anim-fade-up delay-3">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Expenses</div>
            <span className="badge badge-green" style={{ fontSize: 10 }}>Week</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>$2,080</div>
          <div style={{ height: 70, marginTop: 8 }}>
            <ExpenseMiniBar data={EXPENSE_DATA} />
          </div>
        </div>

        {/* FX rates mini */}
        <div className="card card-p-sm anim-fade-up delay-4">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)' }}>FX Rates</span>
            <Link href="/wallets" style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-green-dark)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 2 }}>All <ChevronRight size={12} /></Link>
          </div>
          {CURRENCIES.slice(0, 3).map(c => (
            <div key={c.code} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid var(--color-border-light)' }}>
              <span style={{ fontSize: 16 }}>{c.flag}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', flex: 1 }}>{c.code}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)' }}>{c.rate}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: c.up ? 'var(--color-green-dark)' : '#B91C1C' }}>{c.delta}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 4: Transactions + FX full */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 14 }}>

        {/* Recent transactions */}
        <div className="card card-p anim-fade-up delay-3">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)' }}>Recent Transactions</span>
            <Link href="/transactions" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: 'var(--color-green-dark)', textDecoration: 'none' }}>
              View all <ChevronRight size={13} />
            </Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Merchant</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.slice(0, 6).map(t => (
                <tr key={t.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 10, background: t.logoBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{t.logo}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{t.category}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, color: t.amount > 0 ? 'var(--color-green-dark)' : 'var(--color-text)' }}>
                    {t.amount > 0 ? '+' : ''}{formatCurrency(t.amount)}
                  </td>
                  <td style={{ color: 'var(--color-text-2)', fontSize: 12 }}>{t.date}</td>
                  <td><span className={`badge ${statusColor(t.status)}`} style={{ fontSize: 10 }}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Currencies market full */}
        <div className="card card-p anim-fade-up delay-4">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)' }}>Currencies Market</span>
          </div>
          {CURRENCIES.map((c, i) => (
            <div key={c.code} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', borderBottom: i < CURRENCIES.length - 1 ? '1px solid var(--color-border-light)' : 'none' }}>
              <span style={{ fontSize: 20 }}>{c.flag}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{c.code}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{c.name}</div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)' }}>{c.rate}</span>
              <span style={{ fontSize: 12, fontWeight: 600, minWidth: 52, textAlign: 'right', color: c.up ? 'var(--color-green-dark)' : '#B91C1C' }}>{c.delta}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
