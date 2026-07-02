'use client'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const GREEN = '#00C896'
const PURPLE = '#7C3AED'
const AMBER = '#F59E0B'
const RED = '#EF4444'
const BLUE = '#3B82F6'

// Custom tooltip
const CustomTooltip = ({ active, payload, label, prefix = '$' }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--color-card)', border: '1px solid var(--color-border)',
      borderRadius: 10, padding: '10px 14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    }}>
      <p style={{ fontSize: 11, color: 'var(--color-text-3)', marginBottom: 6, fontWeight: 600 }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: 'var(--color-text)', fontWeight: 600 }}>{prefix}{p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

export function IncomeAreaChart({ data }: { data: { labels: string[], values: number[] } }) {
  const chartData = data.labels.map((l, i) => ({ month: l, income: data.values[i] }))
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GREEN} stopOpacity={0.2} />
            <stop offset="100%" stopColor={GREEN} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-3)' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-3)' }} tickFormatter={v => `$${v/1000}k`} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="income" stroke={GREEN} strokeWidth={2.5} fill="url(#incomeGrad)" dot={{ r: 4, fill: GREEN, stroke: 'white', strokeWidth: 2 }} activeDot={{ r: 6 }} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function RevenueBarChart({ data }: { data: { labels: string[], revenue: number[], expenses: number[] } }) {
  const chartData = data.labels.map((l, i) => ({ month: l, revenue: data.revenue[i], expenses: data.expenses[i] }))
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={3}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-3)' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-3)' }} tickFormatter={v => `$${v/1000}k`} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="revenue" fill={GREEN} radius={[6,6,0,0]} maxBarSize={28} name="Revenue" />
        <Bar dataKey="expenses" fill="var(--color-border)" radius={[6,6,0,0]} maxBarSize={28} name="Expenses" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function ExpenseMiniBar({ data }: { data: { labels: string[], values: number[], highlight: number } }) {
  const chartData = data.labels.map((l, i) => ({ day: l, value: data.values[i], isHighlight: i === data.highlight }))
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 2, right: 2, left: -30, bottom: 0 }}>
        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-text-3)' }} />
        <YAxis hide />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Bar dataKey="value" radius={[6,6,0,0]} maxBarSize={14}>
          {chartData.map((entry, i) => (
            <Cell key={i} fill={entry.isHighlight ? GREEN : 'var(--color-border)'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function PaymentMethodsDonut({ data }: { data: { name: string, value: number, color: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius="60%" outerRadius="80%"
          dataKey="value" startAngle={90} endAngle={-270} paddingAngle={3}>
          {data.map((entry, i) => <Cell key={i} fill={entry.color} strokeWidth={0} />)}
        </Pie>
        <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 10, fontSize: 13 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function DonutSmall({ pct, color }: { pct: number, color: string }) {
  const data = [{ v: pct }, { v: 100 - pct }]
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius="65%" outerRadius="85%"
          dataKey="v" startAngle={90} endAngle={-270} paddingAngle={2}>
          <Cell fill={color} strokeWidth={0} />
          <Cell fill="var(--color-border)" strokeWidth={0} />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export function MultiLineChart({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-3)' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-3)' }} tickFormatter={v => `$${v/1000}k`} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="revenue" stroke={GREEN} strokeWidth={2.5} dot={false} name="Revenue" />
        <Line type="monotone" dataKey="expenses" stroke={PURPLE} strokeWidth={2} dot={false} strokeDasharray="4 4" name="Expenses" />
      </LineChart>
    </ResponsiveContainer>
  )
}
