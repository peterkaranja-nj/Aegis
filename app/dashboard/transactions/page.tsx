'use client'
import { useState, useMemo } from 'react'
import { Search, Download, Filter, MoreHorizontal } from 'lucide-react'
import { TRANSACTIONS } from '@/lib/data'
import { formatCurrency, statusColor } from '@/lib/utils'

const STATUSES = ['all', 'paid', 'pending', 'overdue']
const CATEGORIES = ['All Categories', 'Subscription', 'Design', 'Income', 'Food', 'Music', 'Entertainment', 'Cloud', 'Dev Tools', 'Productivity']

export default function TransactionsPage() {
  const [search, setSearch]     = useState('')
  const [status, setStatus]     = useState('all')
  const [category, setCategory] = useState('All Categories')
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useMemo(() => TRANSACTIONS.filter(t => {
    if (status !== 'all' && t.status !== status) return false
    if (category !== 'All Categories' && t.category !== category) return false
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.id.toLowerCase().includes(search.toLowerCase())) return false
    return true
  }), [search, status, category])

  const toggleSelect = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const toggleAll = () => setSelected(s => s.length === filtered.length ? [] : filtered.map(t => t.id))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)' }} />
          <input
            className="input"
            placeholder="Search transactions…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 36 }}
          />
        </div>

        {/* Status filter tabs */}
        <div style={{ display: 'flex', background: 'var(--color-border-light)', borderRadius: 10, padding: 3, gap: 2 }}>
          {STATUSES.map(s => (
            <button key={s} onClick={() => setStatus(s)} style={{
              padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              border: 'none', transition: 'all 0.2s ease', textTransform: 'capitalize',
              background: status === s ? 'var(--color-card)' : 'transparent',
              color: status === s ? 'var(--color-text)' : 'var(--color-text-2)',
              boxShadow: status === s ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}>{s}</button>
          ))}
        </div>

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="input"
          style={{ width: 160 }}
        >
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>

        {selected.length > 0 && (
          <span style={{ fontSize: 12, color: 'var(--color-text-2)', fontWeight: 500 }}>
            {selected.length} selected
          </span>
        )}

        <button className="btn btn-secondary" style={{ gap: 6, marginLeft: 'auto' }}>
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="card anim-fade-up">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>
                <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} style={{ cursor: 'pointer' }} />
              </th>
              <th>Merchant</th>
              <th>Transaction ID</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} onClick={() => toggleSelect(t.id)} style={{ background: selected.includes(t.id) ? 'rgba(0,200,150,0.04)' : undefined }}>
                <td onClick={e => e.stopPropagation()}>
                  <input type="checkbox" checked={selected.includes(t.id)} onChange={() => toggleSelect(t.id)} style={{ cursor: 'pointer' }} />
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: t.logoBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{t.logo}</div>
                    <span style={{ fontWeight: 600 }}>{t.name}</span>
                  </div>
                </td>
                <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--color-text-2)' }}>{t.id}</td>
                <td><span className="badge badge-gray" style={{ fontSize: 11 }}>{t.category}</span></td>
                <td style={{ fontWeight: 700, color: t.amount > 0 ? 'var(--color-green-dark)' : 'var(--color-text)', fontSize: 14 }}>
                  {t.amount > 0 ? '+' : ''}{formatCurrency(t.amount)}
                </td>
                <td style={{ fontSize: 12, color: 'var(--color-text-2)' }}>{t.date}</td>
                <td><span className={`badge ${statusColor(t.status)}`} style={{ fontSize: 11 }}>{t.status}</span></td>
                <td>
                  <button style={{ width: 28, height: 28, borderRadius: 7, border: '1px solid var(--color-border)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={e => e.stopPropagation()}>
                    <MoreHorizontal size={14} color="var(--color-text-3)" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--color-text-3)', fontSize: 14 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
            No transactions match your filters
          </div>
        )}

        {/* Pagination */}
        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: 'var(--color-text-2)' }}>Showing {filtered.length} of {TRANSACTIONS.length} transactions</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {['←', '1', '2', '3', '→'].map((p, i) => (
              <button key={i} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--color-border)', background: p === '1' ? 'var(--color-green)' : 'var(--color-card)', color: p === '1' ? 'white' : 'var(--color-text-2)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
