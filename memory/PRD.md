# ECO Building Technik — PRD

## Problem Statement
User: "https://building-technik.com mach diese Seite neu moderner besser mit Shop und Beschreibung für Kunden"
User preference: "Mach das hochmoderne" (ultra-modern).

## Brand & Identity
- ECO Building Technik, Fachbetrieb in Ebreichsdorf, Österreich
- Nachhaltige Gebäudetechnik: A+++ Wärmepumpen, Gas-Brennwert, Smart Home, Beleuchtung, Energiemanagement, Wasser
- Kontakt: Seepromenade 109, AT-2384 Ebreichsdorf · +43 664 328 95 99 · office@eco-building.tech

## Design System (per design_agent)
- Dark mode (#0A0A0A) + Signal Green (#00FF66) accents
- Cabinet Grotesk (headings) + Manrope (body) + JetBrains Mono (labels/numbers)
- Swiss/High-Contrast grid with sharp edges (rounded-none), 1px zinc-800 borders
- Grain overlay + radial green glow backgrounds

## Architecture
- Backend: FastAPI + MongoDB (motor). Routes under `/api`: `/products`, `/products/{slug}`, `/categories`, `/inquiries`, `/contact`, `/stats`
- 34 products seeded on startup across 6 categories
- Frontend: React 19 + React Router 7 + Tailwind + shadcn (Toaster sonner) + lucide-react
- Cart via React Context + localStorage

## Implemented (2026-02-07)
- [x] Dark ultra-modern design system (Cabinet Grotesk + Manrope, green accents)
- [x] Sticky glassmorphism header + navigation
- [x] Cinematic Hero with grid frame and stats panel
- [x] Marquee trust badges (A+++, Förderung 5.000€, 14T Rückgabe, Beratung)
- [x] 6-Category section (Wärmepumpen, Gas-Brennwert, Smart Home, Beleuchtung, Energiemanagement, Wasser)
- [x] Featured products strip on Home
- [x] Energy Calculator (heat load, annual cost, savings vs heat pump)
- [x] FAQ accordion
- [x] Shop page with category filter + search
- [x] Product Detail page with specs, features, related products
- [x] Anfragekorb (Cart Drawer) with 2-step inquiry form → POST /api/inquiries
- [x] Contact page with form → POST /api/contact
- [x] About page with values
- [x] Footer with address/phone/email
- [x] Sonner toast notifications

## P1 Backlog
- B2B Login (JWT) with tiered pricing
- Admin dashboard (products CRUD, inquiries inbox)
- Multi-language (EN)
- Stripe / Payment checkout
- Email notifications on inquiries (SendGrid/Resend)
- Blog / CMS for content marketing
- Product image gallery (multiple images)
- SEO structured data (JSON-LD)

## P2
- Cookie consent banner
- Analytics integration
- Project gallery (installed references)
- Newsletter signup
