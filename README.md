# 🌱 Nandee Agrotech — WhatsApp-First E-Commerce Platform

Production-ready Next.js 14 e-commerce website for Nandee Agrotech — an Indian agriculture company selling Seeds, Organic Farming Products, Irrigation Systems, and Farm Machinery.

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** components
- **Lucide React** icons
- **next/image** for optimized images
- **Poppins** font (400, 500, 600, 700)

## Project Structure

```
/app
  /layout.tsx          # Root layout with providers
  /page.tsx            # Homepage (to be built in Phase 3)
  /(shop)              # Shop routes
  /(account)           # User account routes
  /(seller)            # Seller/admin dashboard routes

/components
  /layout              # Header, Footer, MegaMenu, MobileNav
  /shared              # ProductCard, FilterSidebar, etc.
  /home                # Homepage sections
  /product             # Product detail components
  /seller              # Seller dashboard components

/lib
  /config.ts           # Site configuration (env-driven: WHATSAPP_NUMBER, SITE_NAME, etc.)
  /utils               # Utility functions (whatsapp, formatPrice, etc.)
  /data                # Mock data (products, categories, brands)
  /types               # TypeScript types

/contexts              # React contexts (WishlistContext, AuthContext)
/hooks                 # Custom React hooks
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Configuration

Configuration is read from **environment variables** (recommended) with fallbacks in `lib/config.ts`. For production, set env vars in your host (Vercel, Netlify, etc.) or use `.env.local` for local builds.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Yes (for live) | WhatsApp number, no + or spaces (e.g. `919876543210`) |
| `NEXT_PUBLIC_SITE_NAME` | No | Site name (default: Nandee Agrotech) |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL for sitemap/SEO (default: https://nandiagrotech.com) |
| `NEXT_PUBLIC_SITE_TAGLINE` | No | Tagline for meta and UI |
| `NEXT_PUBLIC_SUPPORT_PHONE` | No | Optional landline/support number (e.g. `+91-80-XXXX-XXXX`). If set, shown on bulk-orders; otherwise a generic WhatsApp CTA is shown. |

**Example `.env.local`** (create from this, do not commit):

```
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_SITE_NAME=Nandee Agrotech
NEXT_PUBLIC_SITE_URL=https://nandiagrotech.com
NEXT_PUBLIC_SUPPORT_PHONE=+91-80-1234-5678
```

## Before going live (client handoff)

1. **Set environment variables** with real WhatsApp number, site URL, and optional support phone (see Configuration above).
2. **Replace product/category content** in `lib/data/` with real data or connect to your CMS/API.
3. **Build and test**: `npm run build && npm run start`
4. **Deploy** to Vercel, Netlify, or your host; configure env vars in the dashboard.

## Build Status

✅ **Phase 1 Complete** — Project scaffolding, design system, mock data (20 products), contexts, and utilities.

## Features

- WhatsApp-first commerce (no cart, no checkout)
- 4 product categories: Seeds, Organic, Irrigation, Machinery
- Distributor program integration
- Bulk order management
- Wishlist (localStorage)
- Seller/admin dashboard
- Mobile-responsive design

## Brand Colors

- Primary: #2E7D32 (deep green)
- Primary Light: #4CAF50
- Primary Dark: #1B5E20
- Accent: #6D4C41 (earth brown)
- WhatsApp: #25D366
- Offer: #FF8F00 (saffron orange)

---

Built for nandiagrotech.com — Empowering Indian Farmers 🇮🇳
