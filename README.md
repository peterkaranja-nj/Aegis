# AEGIS

Enterprise-grade fintech dashboard built with Next.js 15, React 19, and Tailwind CSS v4.

## Stack

- **Next.js 15** — App Router
- **React 19** — with Server Components
- **Tailwind CSS v4** — utility-first styling
- **Recharts** — data visualisation
- **Framer Motion** — animations
- **Lucide React** — icons

## Structure

```
app/
  dashboard/        # route group — overview, transactions, analytics, wallets, customers, team, settings
  layout.tsx        # root layout + metadata
  globals.css       # design tokens & component styles
components/
  layout/           # Sidebar, Topbar, ThemeProvider
  charts/           # chart wrappers
  ui/               # shared UI (CommandPalette, …)
lib/
  data.ts           # mock data
  utils.ts          # helpers
```

## Dev

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
```
