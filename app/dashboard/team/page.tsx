import { UserPlus, Shield, MoreHorizontal } from 'lucide-react'
import { TEAM_MEMBERS } from '@/lib/data'
import { statusColor } from '@/lib/utils'

const ROLE_COLORS: Record<string, string> = {
  Admin: 'badge-purple', Editor: 'badge-blue', Viewer: 'badge-gray',
}

export default function TeamPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 2 }}>Team Management</h2>
          <p style={{ fontSize: 13, color: 'var(--color-text-2)' }}>Manage access and roles for your team.</p>
        </div>
        <button className="btn btn-primary" style={{ gap: 7 }}>
          <UserPlus size={14} /> Invite member
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
        <div className="card card-p anim-fade-up">
          <table className="data-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {TEAM_MEMBERS.map(m => (
                <tr key={m.email}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{m.initials}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`badge ${ROLE_COLORS[m.role]}`} style={{ fontSize: 11 }}>{m.role}</span></td>
                  <td><span className={`badge ${statusColor(m.status)}`} style={{ fontSize: 11 }}>{m.status}</span></td>
                  <td style={{ fontSize: 12, color: 'var(--color-text-3)' }}>{m.last}</td>
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

        {/* Roles info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card card-p anim-fade-up delay-1">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Shield size={16} color="var(--color-green-dark)" />
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)' }}>Role Permissions</span>
            </div>
            {[
              { role: 'Admin',  perms: ['Full access', 'Manage team', 'API keys', 'Billing'] },
              { role: 'Editor', perms: ['View & edit data', 'Create links', 'Export reports'] },
              { role: 'Viewer', perms: ['Read-only access', 'Download reports'] },
            ].map(r => (
              <div key={r.role} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid var(--color-border-light)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)', marginBottom: 6 }}>{r.role}</div>
                {r.perms.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 10, color: 'var(--color-green-dark)' }}>✓</span>
                    <span style={{ fontSize: 12, color: 'var(--color-text-2)' }}>{p}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
