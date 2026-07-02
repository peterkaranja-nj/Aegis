'use client'
import { useState } from 'react'
import { User, Lock, Bell, Key, CreditCard, Users, Eye, EyeOff } from 'lucide-react'

const TABS = [
  { id:'profile',       label:'Profile',       icon: User },
  { id:'security',      label:'Security',      icon: Lock },
  { id:'notifications', label:'Notifications', icon: Bell },
  { id:'api',           label:'API Keys',      icon: Key },
  { id:'billing',       label:'Billing',       icon: CreditCard },
]

const API_KEYS = [
  { name:'Production key', key:'aegis_live_sk_9f2a••••••••••••••••••••••••', type:'live' },
  { name:'Test key',       key:'aegis_test_sk_3b7c••••••••••••••••••••••••', type:'test' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showKey, setShowKey] = useState<Record<string, boolean>>({})

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
      {/* Sidebar */}
      <div className="card card-p-sm" style={{ height: 'fit-content' }}>
        {TABS.map(tab => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 10, cursor: 'pointer',
              border: 'none', background: activeTab === tab.id ? 'var(--color-green-light)' : 'transparent',
              color: activeTab === tab.id ? 'var(--color-green-dark)' : 'var(--color-text-2)',
              fontWeight: activeTab === tab.id ? 600 : 500, fontSize: 13,
              textAlign: 'left', transition: 'all 0.15s ease',
              marginBottom: 2,
            }}>
              <Icon size={15} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {activeTab === 'profile' && (
          <div className="card card-p anim-fade-in">
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 20 }}>Profile Settings</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--color-border-light)' }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 20, fontWeight: 800 }}>PK</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text)', marginBottom: 2 }}>Peter Karanja</div>
                <div style={{ fontSize: 13, color: 'var(--color-text-2)' }}>Admin · peter@aegis.finance</div>
              </div>
              <button className="btn btn-secondary">Change photo</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              {[
                { label:'First name', value:'William', placeholder:'First name' },
                { label:'Last name',  value:'Blake',   placeholder:'Last name' },
                { label:'Email',      value:'william@aegis.finance', placeholder:'Email' },
                { label:'Company',    value:'Aegis Finance Ltd',      placeholder:'Company' },
                { label:'Phone',      value:'+44 20 7946 0123',       placeholder:'Phone' },
                { label:'Timezone',   value:'Europe/London',           placeholder:'Timezone' },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-2)', marginBottom: 6 }}>{f.label}</label>
                  <input className="input" defaultValue={f.value} placeholder={f.placeholder} />
                </div>
              ))}
            </div>
            <button className="btn btn-primary">Save changes</button>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="card card-p anim-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)' }}>API Keys</h3>
              <button className="btn btn-primary btn-sm">+ Generate new key</button>
            </div>
            {API_KEYS.map(k => (
              <div key={k.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: 'var(--color-border-light)', borderRadius: 12, marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-2)', marginBottom: 4 }}>{k.name}</div>
                  <code style={{ fontSize: 13, color: 'var(--color-text)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {showKey[k.name] ? k.key.replace(/•+/, '••••••••••••••••') : k.key}
                  </code>
                </div>
                <span className={`badge ${k.type === 'live' ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: 11 }}>{k.type}</span>
                <button onClick={() => setShowKey(s => ({...s, [k.name]: !s[k.name]}))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-3)' }}>
                  {showKey[k.name] ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button className="btn btn-secondary btn-sm">Copy</button>
                <button className="btn btn-danger btn-sm">Revoke</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="card card-p anim-fade-in">
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 20 }}>Security Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label:'Change password', desc:'Update your account password', action:'Update password' },
                { label:'Two-factor authentication', desc:'Add an extra layer of security to your account', action:'Enable 2FA' },
                { label:'Active sessions', desc:'Manage devices where you are signed in', action:'View sessions' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: 'var(--color-border-light)', borderRadius: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)', marginBottom: 3 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-2)' }}>{s.desc}</div>
                  </div>
                  <button className="btn btn-secondary btn-sm">{s.action}</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="card card-p anim-fade-in">
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 20 }}>Notification Preferences</h3>
            {[
              { label:'Payment received',    desc:'Get notified when a payment is received', on:true },
              { label:'Payment failed',      desc:'Get notified when a payment fails',       on:true },
              { label:'New customer signup', desc:'Alert when a new customer signs up',      on:false },
              { label:'Weekly digest',       desc:'Summary of your week every Monday',       on:true },
              { label:'Security alerts',     desc:'Critical account activity alerts',        on:true },
            ].map(n => (
              <div key={n.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--color-border-light)' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)', marginBottom: 2 }}>{n.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-3)' }}>{n.desc}</div>
                </div>
                <div style={{ width: 44, height: 24, borderRadius: 99, background: n.on ? 'var(--color-green)' : 'var(--color-border)', position: 'relative', cursor: 'pointer', transition: 'background 0.2s ease' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: n.on ? 22 : 2, transition: 'left 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="card card-p anim-fade-in">
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 20 }}>Billing & Plan</h3>
            <div style={{ background: 'var(--color-green)', borderRadius: 14, padding: 20, color: 'white', marginBottom: 16 }}>
              <div style={{ fontSize: 11, opacity: 0.75, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Current plan</div>
              <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>Pro — $49/month</div>
              <div style={{ fontSize: 13, opacity: 0.75 }}>Renews 1 July 2024 · 2,847 of unlimited customers</div>
            </div>
            <button className="btn btn-secondary">Upgrade to Enterprise</button>
          </div>
        )}
      </div>
    </div>
  )
}
