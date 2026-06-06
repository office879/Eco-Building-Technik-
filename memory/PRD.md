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

### v3 (2026-02-08) — Admin Dashboard, Email & i18n
- [x] **5 neue JNOD R290 Wärmepumpen** importiert (JMU50HCINV, J12HWH 75°C, Low-Noise, J12HW200V2 200L, JME50HC) mit +70% Aufschlag und `Lieferzeit` in specs (ca. 15 Werktage). Insgesamt jetzt **55 Produkte**.
- [x] **JWT Auth System** (`/app/backend/auth.py`): bcrypt + PyJWT, 8h Access-Token, `make_require_admin` Dependency, idempotente `seed_admin` beim Backend-Start
- [x] **Resend E-Mail-Integration** (`/app/backend/email_service.py`): Anfrage-Notifications via `BackgroundTasks` → `office@eco-building.tech`. HTML-Mail mit Produkten + Nachricht + Reply-To. Bei leerem `RESEND_API_KEY` graceful skip.
- [x] **Admin Dashboard** (`/admin/login` + `/admin`): 3 Tabs (Anfragen-Inbox / Kontakt-Nachrichten / Produkt-Verwaltung), volle Produkt-CRUD über UI (slug, Kategorie, Beschreibungen, Galerie, Specs als Key:Value-Lines, Features, Preis, Badge, YouTube), Delete-Confirm, Filter
- [x] **AuthContext + ProtectedRoute** Frontend, Token in localStorage `ecobt_admin_token`
- [x] **i18n EN/RU/UA Translation Dictionary** in `I18nContext` (60+ Strings: nav, CTAs, hero, categories, shop, product, cart, form, footer), wired in Header & Home Hero. `t(key)` API für andere Komponenten verfügbar.

## Admin Credentials
- URL: `/admin/login`
- E-Mail: `admin@eco-building.tech`
- Passwort: `u_pIzUzKdOGLdSNg1xY` (gespeichert in `/app/memory/test_credentials.md`)

## Tested (v3)
- Backend: 100% (23/23 pytest in `/app/backend/tests/test_admin_auth.py`) — login, /me, admin inquiries/contacts/products CRUD, JNOD slugs, graceful email skip
- Frontend: 100% — Admin login flow, CRUD UI, ProtectedRoute redirect, EN/RU/UA i18n persistence

## P1/P2 Backlog (remaining)
- Bulk-Import von Alibaba/Kronoterm Produkt-URLs (User-Wunsch: ~30 weitere URLs offen). **Empfehlung**: über Admin-Dashboard manuell einpflegen oder dedizierten Import-Endpoint bauen.
- Komplette Übersetzung der restlichen Seiten (Shop-Filter, ProductDetail-Specs, About, Contact, Footer) — Dictionary-Keys liegen bereit
- Resend API-Key beschaffen + Domain verifizieren für echte Mail-Zustellung an `office@eco-building.tech`
- Refactor: `server.py` (1250 Zeilen) in `routes/`, `models/`, `seed/` aufsplitten
- 401-Interceptor in `api.js` der bei abgelaufenem Token localStorage räumt
- Bild-404s (Squirrel M30, Smart LED-Streifen/Deckenleuchte/Lampe) ersetzen
