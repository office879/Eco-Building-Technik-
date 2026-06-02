# ECO Building Technik — PRD

## Problem Statement
Original: "https://building-technik.com mach diese Seite neu moderner besser mit Shop und Beschreibung für Kunden"
Iteration 2 (2026-06-02): User provided https://royal-bautraeger.preview.emergentagent.com/partner/building-technik as design template. "übernimm diese seite als vorlage und verwende diese als startseite, baue die gesamte seite so auf auch mit den farben alles gleich"

## Design Direction (v2 - Royalhouse style)
- **Background**: Deep navy `#0B1736`
- **Text**: White `#FFFFFF`, muted `#7B8AAB`
- **Accent**: White (used for active states, button bg, badges)
- **Typography**:
  - Headings: Inter (700/800) tight uppercase tracking
  - Accent words: Instrument Serif Italic (serif italic — "Technik.", "Premium-Produkte.", etc.)
- **Layout**: Editorial, generous whitespace, 1px white/10 borders, numbered cards (01-06)
- **Components**: Language switcher (DE/EN/RU/UA), Cookie banner, "BERATUNG ANFRAGEN" CTA in header
- Sharp edges (rounded-none), no shadows, very minimal

## Brand & Identity
- ECO Building Technik GmbH, Fachbetrieb in Ebreichsdorf, Österreich
- Seepromenade 109, AT-2384 · +43 664 328 95 99 · office@eco-building.tech
- A+++ Wärmepumpen, Gas-Brennwert, Smart Home, Beleuchtung, Energiemanagement, Wasser

## Architecture
- Backend: FastAPI + MongoDB. Routes `/api/products`, `/products/{slug}`, `/categories`, `/inquiries`, `/contact`, `/stats`
- 34 products seeded across 6 categories
- Frontend: React 19 + React Router 7 + Tailwind + shadcn (sonner) + lucide-react
- Cart: React Context + localStorage

## Implemented
### v1 (2026-02-07)
- Initial modern dark site with green neon accents, shop, inquiry cart, energy calculator, FAQ, contact

### v2 (2026-06-02) — Royalhouse-Style Redesign
- [x] Complete restyle: navy `#0B1736` + white + serif italic accents
- [x] New typography: Inter + Instrument Serif Italic
- [x] Header: logo + nav + DE/EN/RU/UA Sprachschalter + Cart icon + "BERATUNG ANFRAGEN" CTA
- [x] Hero: massive uppercase "ECO BUILDING" + italic serif "Technik." + image strip
- [x] Marquee bar with Trust-Items
- [x] Auftrag section (Headline + intro)
- [x] 6 numbered service cards (01-06) linking to shop categories
- [x] Featured products grid
- [x] Split feature with stats grid
- [x] Energy Calculator (redesigned to match style)
- [x] FAQ accordion (redesigned)
- [x] CTA section
- [x] Footer: multi-column with copyright bar
- [x] Cookie banner (bottom-left, localStorage)
- [x] All pages (Home, Shop, ProductDetail, Energy, About, Contact) restyled
- [x] CartDrawer restyled

## Tested
- Backend: 100% (10/10) — all routes functional, contact form posts, products list
- Frontend (v1): ~95% — all flows working
- v2 visual verification via screenshots — matches Royalhouse aesthetic

## P1 Backlog
- B2B Login (JWT) with tiered pricing
- Admin dashboard (products CRUD + inquiries inbox)
- Stripe Checkout (optional)
- Email notifications on inquiries (SendGrid/Resend)
- Multi-language content (EN/RU/UA — currently only switcher UI)
- Impressum & Datenschutz pages
