import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, symbol = '$', compact = false): string {
  if (compact && Math.abs(amount) >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(1)}k`
  }
  return `${symbol}${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

export function statusColor(status: string): string {
  return {
    paid: 'badge-green', pending: 'badge-amber', overdue: 'badge-red',
    active: 'badge-green', suspended: 'badge-red', invited: 'badge-blue',
    low: 'badge-green', medium: 'badge-amber', high: 'badge-red',
  }[status] ?? 'badge-gray'
}

export function deltaSign(n: number): string {
  return n >= 0 ? '+' : ''
}
