import { Link2, Plus, Copy, ExternalLink, BarChart2 } from 'lucide-react'
import { PAYMENT_LINKS } from '@/lib/data'

export default function PaymentLinksPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 2 }}>Payment Links</h2>
          <p style={{ fontSize: 13, color: 'var(--color-text-2)' }}>Create shareable links to accept one-time or recurring payments.</p>
        </div>
        <button className="btn btn-primary btn-lg" style={{ gap: 8 }}>
          <Plus size={15} /> Create Link
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
        {PAYMENT_LINKS.map((link, i) => (
          <div key={link.id} className={`card card-p card-hover anim-fade-up delay-${i+1}`} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--color-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link2 size={18} color="var(--color-green-dark)" />
              </div>
              <span className={`badge ${link.active ? 'badge-green' : 'badge-gray'}`} style={{ fontSize: 11 }}>
                {link.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>{link.name}</h3>
            <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 12 }}>
              ${link.amount} <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-2)' }}>{link.currency}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              {[
                { label: 'Clicks',       value: link.clicks },
                { label: 'Conversions',  value: link.conversions },
                { label: 'Created',      value: link.created },
                { label: 'Expires',      value: link.expires },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--color-border-light)', borderRadius: 8, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)' }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Conv rate bar */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: 'var(--color-text-3)' }}>Conversion rate</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text)' }}>
                  {Math.round((link.conversions / link.clicks) * 100)}%
                </span>
              </div>
              <div className="progress">
                <div className="progress-fill" style={{ width: `${Math.round((link.conversions / link.clicks) * 100)}%`, background: 'var(--color-green)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center', gap: 5 }}>
                <Copy size={12} /> Copy link
              </button>
              <button className="btn btn-ghost btn-sm" style={{ gap: 5 }}>
                <BarChart2 size={12} /> Stats
              </button>
              <button className="btn btn-ghost btn-sm" style={{ gap: 5 }}>
                <ExternalLink size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
