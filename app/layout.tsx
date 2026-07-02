import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AEGIS Fintech Dashboard',
  description: 'Enterprise-grade financial management platform.',
}
export const viewport: Viewport = { themeColor: '#25D366' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Rubik+Dirt&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
