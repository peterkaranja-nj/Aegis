'use client'
import { useState } from 'react'
import { TrendingUp, TrendingDown, Users, Zap } from 'lucide-react'
import { REVENUE_DATA, FUNNEL_DATA, COUNTRIES_DATA } from '@/lib/data'
import { RevenueBarChart, PaymentMethodsDonut, MultiLineChart } from '@/components/charts/Charts'

const KPI = [
  { label: 'Total Revenue',    value: '$84,231', delta: '+12.5%', up: true,  icon: TrendingUp },
  { label: 'Transactions',     value: '2,847',   delta: '+8.2%',  up: true,  icon: Zap },
  { label: 'Avg Order Value',  value: '$29.59',  delta: '-2.1%',  up: false, icon: TrendingDown },
  { label: 'Active Customers', value: '2,641',   delta: '+5.3%',  up: true,  icon: Users },
]

const PAYMENT_METHODS = [
  { name: 'Card',          value: 58, color: '#00C896' },
  { name: 'Bank Transfer', value: 27, color: '#7C3AED' },
  { name: 'Crypto',        value: 15, color: '#F59E0B' },
]

const chartData = REVENUE_DATA.labels.map((l, i) => ({
  month: l, revenue: REVENUE_DATA.revenue[i], expenses: REVENUE_DATA.expenses[i],
}))

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'monthly' | 'weekly'>('monthly')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {KPI.map((k, i) => {
          const Icon = k.icon
          return (
            <div key={k.label} className={`card card-p anim-fade-up delay-${i+1}`}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-2)' }}>{k.label}</span>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: k.up ? 'var(--color-green-light)' : 'var(--color-red-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={14} color={k.up ? 'var(--color-green-dark)' : '#B91C1C'} />
                </div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em', lineHeight: 1 }}>{k.value}</div>
              <div className={`delta ${k.up ? 'delta-up' : 'delta-down'}`} style={{ marginTop: 8, fontSize: 11 }}>{k.delta} vs last month</div>
            </div>
          )
        })}
      </div>

      {/* Revenue + Payment Methods */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
        <div className="card card-p anim-fade-up delay-2">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)' }}>Revenue vs Expenses</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-2)', marginTop: 2 }}>Full year overview</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['monthly','weekly'].map(p => (
                <button key={p} onClick={() => setPeriod(p as any)} style={{ padding: '5px 12px', borderRadius: 8, border: `1.5px solid ${period === p ? 'var(--color-green)' : 'var(--color-border)'}`, background: period === p ? 'var(--color-green-light)' : 'transparent', color: period === p ? 'var(--color-green-dark)' : 'var(--color-text-2)', fontSize: 12, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            {[['Revenue','#00C896','solid'],['Expenses','#7C3AED','dashed']].map(([n,c,s]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--color-text-2)' }}>
                <div style={{ width: 20, height: 2, background: c, borderStyle: s as any, borderWidth: 1, borderColor: c }} />
                {n}
              </div>
            ))}
          </div>
          <div style={{ height: 240 }}>
            <RevenueBarChart data={REVENUE_DATA} />
          </div>
        </div>

        <div className="card card-p anim-fade-up delay-3">
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 16 }}>Payment Methods</div>
          <div style={{ height: 180 }}>
            <PaymentMethodsDonut data={PAYMENT_METHODS} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
            {PAYMENT_METHODS.map(m => (
              <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 9, height: 9, borderRadius: 2, background: m.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--color-text)', flex: 1 }}>{m.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)' }}>{m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Countries + Funnel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className="card card-p anim-fade-up delay-4">
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 16 }}>Revenue by Country</div>
          {COUNTRIES_DATA.map(c => (
            <div key={c.name} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 16 }}>{c.flag}</span>
                  <span style={{ fontSize: 13, color: 'var(--color-text)' }}>{c.name}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)' }}>${c.value.toLocaleString()}</span>
              </div>
              <div className="progress">
                <div className="progress-fill" style={{ width: `${c.pct}%`, background: 'var(--color-green)' }} />
              </div>
            </div>
          ))}
        </div>

        <div className="card card-p anim-fade-up delay-5">
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 16 }}>Conversion Funnel</div>
          {FUNNEL_DATA.map((f, i) => (
            <div key={f.label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: 'var(--color-text-2)' }}>{f.label}</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)' }}>{f.n.toLocaleString()}</span>
                  <span style={{ fontSize: 12, color: 'var(--color-text-3)' }}>{f.pct}%</span>
                </div>
              </div>
              <div className="progress">
                <div className="progress-fill" style={{ width: `${f.pct}%`, background: i < 2 ? 'var(--color-green)' : i < 4 ? 'var(--color-purple)' : 'var(--color-amber)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
