export interface Transaction {
  id: string; name: string; logo: string; logoBg: string;
  amount: number; date: string; status: 'paid' | 'pending' | 'overdue'; category: string;
}
export interface Customer {
  id: string; name: string; email: string; initials: string; color: string;
  volume: number; transactions: number; status: 'active' | 'suspended'; risk: 'low' | 'medium' | 'high'; joined: string;
}
export interface Wallet {
  currency: string; flag: string; balance: number; pending: number; symbol: string;
  color: string; gradient: string;
}

export const TRANSACTIONS: Transaction[] = [
  { id:'TXN-001', name:'Apple TV+',   logo:'🍎', logoBg:'#1C1C1E', amount:-10.00,  date:'14 Apr 2024', status:'paid',    category:'Subscription' },
  { id:'TXN-002', name:'Dribbble',    logo:'◉',  logoBg:'#EA4C89', amount:-18.00,  date:'16 Apr 2024', status:'pending', category:'Design' },
  { id:'TXN-003', name:'Upwork',      logo:'U',  logoBg:'#14A800', amount:+84.00,  date:'26 Apr 2024', status:'paid',    category:'Income' },
  { id:'TXN-004', name:'Eaty',        logo:'🍔', logoBg:'#FF6B35', amount:-28.00,  date:'30 Apr 2024', status:'overdue', category:'Food' },
  { id:'TXN-005', name:'Spotify',     logo:'♪',  logoBg:'#1DB954', amount:-9.99,   date:'01 May 2024', status:'paid',    category:'Music' },
  { id:'TXN-006', name:'Netflix',     logo:'N',  logoBg:'#E50914', amount:-15.99,  date:'03 May 2024', status:'paid',    category:'Entertainment' },
  { id:'TXN-007', name:'Figma',       logo:'◈',  logoBg:'#A259FF', amount:-20.00,  date:'05 May 2024', status:'paid',    category:'Design' },
  { id:'TXN-008', name:'Stripe',      logo:'S',  logoBg:'#635BFF', amount:+240.00, date:'07 May 2024', status:'paid',    category:'Income' },
  { id:'TXN-009', name:'AWS',         logo:'☁',  logoBg:'#FF9900', amount:-89.50,  date:'10 May 2024', status:'paid',    category:'Cloud' },
  { id:'TXN-010', name:'GitHub',      logo:'◉',  logoBg:'#24292E', amount:-4.00,   date:'12 May 2024', status:'pending', category:'Dev Tools' },
  { id:'TXN-011', name:'Vercel',      logo:'▲',  logoBg:'#000000', amount:-20.00,  date:'13 May 2024', status:'paid',    category:'Cloud' },
  { id:'TXN-012', name:'Linear',      logo:'◆',  logoBg:'#5E6AD2', amount:-8.00,   date:'14 May 2024', status:'paid',    category:'Productivity' },
]

export const CUSTOMERS: Customer[] = [
  { id:'C-001', name:'Sarah Johnson',  email:'sarah@example.com',  initials:'SJ', color:'#7C3AED', volume:12400,  transactions:47, status:'active',    risk:'low',    joined:'Jan 2024' },
  { id:'C-002', name:'Marcus Chen',    email:'marcus@example.com', initials:'MC', color:'#0369A1', volume:8750,   transactions:23, status:'active',    risk:'low',    joined:'Feb 2024' },
  { id:'C-003', name:'Aisha Patel',    email:'aisha@example.com',  initials:'AP', color:'#BE185D', volume:3200,   transactions:11, status:'suspended', risk:'high',   joined:'Mar 2024' },
  { id:'C-004', name:'James Okonkwo',  email:'james@example.com',  initials:'JO', color:'#047857', volume:31000,  transactions:89, status:'active',    risk:'low',    joined:'Nov 2023' },
  { id:'C-005', name:'Elena Vasquez',  email:'elena@example.com',  initials:'EV', color:'#B45309', volume:5600,   transactions:18, status:'active',    risk:'medium', joined:'Apr 2024' },
  { id:'C-006', name:'Daniel Park',    email:'daniel@example.com', initials:'DP', color:'#0F766E', volume:19400,  transactions:62, status:'active',    risk:'low',    joined:'Dec 2023' },
]

export const WALLETS: Wallet[] = [
  { currency:'USD', flag:'🇺🇸', balance:12840.50, pending:340.00, symbol:'$', color:'#00C896', gradient:'linear-gradient(135deg,#059669,#047857)' },
  { currency:'EUR', flag:'🇪🇺', balance:4320.00,  pending:0,      symbol:'€', color:'#7C3AED', gradient:'linear-gradient(135deg,#7C3AED,#5B21B6)' },
  { currency:'GBP', flag:'🇬🇧', balance:2980.20,  pending:125.00, symbol:'£', color:'#0369A1', gradient:'linear-gradient(135deg,#0369A1,#075985)' },
  { currency:'KES', flag:'🇰🇪', balance:529000,   pending:0,      symbol:'KES ', color:'#B45309', gradient:'linear-gradient(135deg,#D97706,#B45309)' },
]

export const CURRENCIES = [
  { flag:'🇺🇸', code:'USD', name:'US Dollar',       rate:'105.27', delta:'+11.45', up:true },
  { flag:'🇪🇺', code:'EUR', name:'Euro',             rate:'1.0956',  delta:'-0.03',  up:false },
  { flag:'🇬🇧', code:'GBP', name:'Pound Sterling',   rate:'0.7894',  delta:'+0.12',  up:true },
  { flag:'🇰🇪', code:'KES', name:'Kenya Shilling',   rate:'129.50',  delta:'-0.80',  up:false },
  { flag:'🇯🇵', code:'JPY', name:'Japanese Yen',     rate:'149.82',  delta:'+0.34',  up:true },
]

export const REVENUE_DATA = {
  labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  revenue:[8200,9400,7800,12100,10500,14200,11800,13500,15200,12800,16400,18100],
  expenses:[6100,7200,6400,8900,7800,9600,8400,9100,10200,8700,11200,12400],
}

export const INCOME_DATA = {
  labels:['Jan','Feb','Mar','Apr','May','Jun'],
  values:[12000,15000,11000,18000,14000,21000],
}

export const EXPENSE_DATA = {
  labels:['M','T','W','T','F','S','S'],
  values:[400,800,600,1200,900,1400,750],
  highlight:5,
}

export const TEAM_MEMBERS = [
  { name:'Peter Karanja',   email:'peter@aegis.finance',   role:'Admin',   initials:'PK', color:'#7C3AED', status:'active',   last:'Just now' },
  { name:'Priya Sharma',    email:'priya@aegis.finance',   role:'Editor',  initials:'PS', color:'#BE185D', status:'active',   last:'2h ago' },
  { name:'Tom Eriksen',     email:'tom@aegis.finance',     role:'Viewer',  initials:'TE', color:'#0369A1', status:'active',   last:'Yesterday' },
  { name:'Nadia Osei',      email:'nadia@aegis.finance',   role:'Editor',  initials:'NO', color:'#047857', status:'invited',  last:'Pending' },
]

export const PAYMENT_LINKS = [
  { id:'PL-001', name:'Product Launch Sale',  amount:49.99, currency:'USD', clicks:142, conversions:67, created:'01 May 2024', expires:'31 May 2024', active:true },
  { id:'PL-002', name:'Annual Subscription',  amount:299.00,currency:'USD', clicks:89,  conversions:31, created:'15 Apr 2024', expires:'15 Jul 2024', active:true },
  { id:'PL-003', name:'Consulting Session',   amount:150.00,currency:'USD', clicks:34,  conversions:12, created:'10 Mar 2024', expires:'10 Jun 2024', active:false },
  { id:'PL-004', name:'Workshop Access',      amount:75.00, currency:'USD', clicks:201, conversions:89, created:'20 Apr 2024', expires:'20 May 2024', active:true },
]

export const FUNNEL_DATA = [
  { label:'Initiated',     n:10000, pct:100 },
  { label:'Authenticated', n:9420,  pct:94 },
  { label:'Processing',    n:8100,  pct:81 },
  { label:'Succeeded',     n:7830,  pct:78 },
  { label:'Settled',       n:7650,  pct:76 },
]

export const COUNTRIES_DATA = [
  { flag:'🇺🇸', name:'United States', value:31200, pct:74 },
  { flag:'🇬🇧', name:'United Kingdom', value:12400, pct:42 },
  { flag:'🇰🇪', name:'Kenya',          value:8750,  pct:29 },
  { flag:'🇩🇪', name:'Germany',        value:6200,  pct:21 },
  { flag:'🇳🇬', name:'Nigeria',        value:4100,  pct:14 },
]
