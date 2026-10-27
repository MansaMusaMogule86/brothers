# BROTHERS BOUTIQUE GYM — Private World Dubai

Ultra-luxury digital private club and bespoke training sanctuary experience for Brothers Boutique Gym in Dubai, UAE.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** (dev server & production build)
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **Motion** (animations), **Three.js** (3D experience), **Lucide React** (icons), **qrcode** (member entry QR)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional for the client app)
#    Copy .env.example to .env and fill in values if needed
cp .env.example .env

# 3. Start the dev server on http://localhost:3000
npm run dev
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server on port 3000 (host 0.0.0.0) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Type-check with `tsc --noEmit` |
| `npm run clean` | Remove `dist/` and `server.js` artifacts |

## Project Structure

```
├── index.html                  # Entry HTML (fonts, meta, root mount)
├── vite.config.ts              # Vite + Tailwind + React plugins, "@" alias
├── public/
│   ├── branding/logo/          # Brand logo mark (used in navbar & footer)
│   ├── images/hero/            # Cinematic hero photograph (clean crop + provided master)
│   └── assets/                 # Static assets & reference media
└── src/
    ├── main.tsx                # React entry point
    ├── App.tsx                 # Root component, page routing state
    ├── index.css               # Tailwind v4 theme & global styles
    ├── components/             # Navbar, Footer, DNA, Passport, Concierge, 3D, ...
    ├── pages/                  # Home, Experiences, Service Detail, Membership, Contact, Privacy
    ├── data/brothersContent.ts # Sanctuary info, experiences, tiers, mocks
    └── types/index.ts          # Shared TypeScript types
```
