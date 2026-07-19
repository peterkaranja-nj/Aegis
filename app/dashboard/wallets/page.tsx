import { ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react'
import { WALLETS, TRANSACTIONS } from '@/lib/data'
import { statusColor } from '@/lib/utils'

export default function WalletsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div className="r-grid-2">
        {WALLETS.map((w, i) => (
          <div key={w.currency} className={`wallet-card anim-fade-up delay-${i+1}`} style={{ background: w.gradient }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, position: 'relative', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 28 }}>{w.flag}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{w.currency} Wallet</div>
                  <div style={{ fontSize: 11, opacity: 0.5 }}>Available balance</div>
                </div>
              </div>
              <button style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: 9, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                Transfer
              </button>
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1, position: 'relative' }}>
              {w.symbol}{w.balance.toLocaleString()}
            </div>
            {w.pending > 0 && (
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 6, position: 'relative' }}>
                Pending: {w.symbol}{w.pending.toLocaleString()}
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, marginTop: 20, position: 'relative', flexWrap: 'wrap' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                <ArrowUpRight size={13} /> Send
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                <ArrowDownLeft size={13} /> Receive
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-secondary anim-fade-up delay-3" style={{ alignSelf: 'flex-start', gap: 8 }}>
        <Plus size={15} /> Add new wallet
      </button>

      <div className="card card-p anim-fade-up delay-4">
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 14 }}>Recent Activity</div>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr><th>Merchant</th><th>Wallet</th><th>Amount</th><th>Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              {TRANSACTIONS.slice(0, 8).map(t => (
                <tr key={t.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 10, background: t.logoBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{t.logo}</div>
                      <div><div style={{ fontWeight: 600 }}>{t.name}</div><div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{t.id}</div></div>
                    </div>
                  </td>
                  <td><span className="badge badge-blue" style={{ fontSize: 11 }}>USD</span></td>
                  <td style={{ fontWeight: 700, color: t.amount > 0 ? 'var(--color-green-dark)' : 'var(--color-text)' }}>
                    {t.amount > 0 ? '+' : ''}{Math.abs(t.amount).toFixed(2)}
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--color-text-2)' }}>{t.date}</td>
                  <td><span className={`badge ${statusColor(t.status)}`} style={{ fontSize: 11 }}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
