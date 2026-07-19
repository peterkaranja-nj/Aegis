'use client'
import { useState } from 'react'
import { Search, UserPlus, MoreHorizontal } from 'lucide-react'
import { CUSTOMERS } from '@/lib/data'
import { statusColor } from '@/lib/utils'

export default function CustomersPage() {
  const [search, setSearch] = useState('')
  const filtered = CUSTOMERS.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div className="r-grid-3">
        {[
          { label:'Total Customers', value:'2,847', sub:'+127 this month' },
          { label:'Active',          value:'2,641', sub:'92.8% active rate' },
          { label:'Avg LTV',         value:'$1,240', sub:'↑ from $980 last quarter' },
        ].map((k, i) => (
          <div key={k.label} className={`card card-p anim-fade-up delay-${i+1}`}>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-2)', marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em', lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-2)', marginTop: 6 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="card card-p anim-fade-up delay-2">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)' }} />
            <input className="input" placeholder="Search customers…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
          </div>
          <button className="btn btn-primary" style={{ gap: 7, flexShrink: 0 }}>
            <UserPlus size={14} /> Invite
          </button>
        </div>

        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th><th>Email</th><th>Volume</th><th>Transactions</th><th>Risk</th><th>Status</th><th>Joined</th><th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{c.initials}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{c.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--color-text-2)' }}>{c.email}</td>
                  <td style={{ fontWeight: 700 }}>${c.volume.toLocaleString()}</td>
                  <td style={{ color: 'var(--color-text-2)' }}>{c.transactions} txns</td>
                  <td><span className={`badge ${statusColor(c.risk)}`} style={{ fontSize: 11 }}>{c.risk}</span></td>
                  <td><span className={`badge ${statusColor(c.status)}`} style={{ fontSize: 11 }}>{c.status}</span></td>
                  <td style={{ fontSize: 12, color: 'var(--color-text-3)' }}>{c.joined}</td>
                  <td>
                    <button style={{ width: 28, height: 28, borderRadius: 7, border: '1px solid var(--color-border)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MoreHorizontal size={14} color="var(--color-text-3)" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--color-text-3)' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>👤</div>
            No customers found
          </div>
        )}
      </div>
    </div>
  )
}
