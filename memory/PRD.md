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

### v4 (2026-06-06) — i18n Rollout Shop / ProductDetail / Footer / ProductCard
- [x] **Shop.jsx**: Headline, Subtitle, Netto-Disclaimer, Kategorie-Label, Such-Placeholder, Loading/Empty, Kategorie-Filter (cat.* keys) — alle 4 Sprachen (DE/EN/RU/UA)
- [x] **ProductDetail.jsx**: Back-Link, Preis-Section, Netto-Hinweis, Beschreibung/Specs-Header, "Zur Anfrage"-CTA, Related-Title, Toast-Message
- [x] **Footer.jsx**: Company-Description, Tags, Navigation, Kontakt-Labels (Adresse/Mobil/E-Mail/Web), Copyright, Impressum/Datenschutz/AGB
- [x] **ProductCard.jsx**: Kategorie-Label via `cat.${category}`, "Anfrage"-Button, Netto-Hinweis, Toast
- [x] Neue Dictionary-Keys: `shop.*`, `pd.*`, `card.*`, `footer.*`, fehlende Kategorien (`gas-brennwert`, `beleuchtung`, `energiemanagement`)
- [x] Verifiziert via Screenshots DE/EN/RU/UA

### v5 (2026-06-06) — i18n Rollout About / Contact / Energy / Cookie-Banner
- [x] **About.jsx**: Eyebrow, H1 (mit Italic-Accent-Split), Intro, Mission-Section, CTA "Get consultation now", 4 Werte-Cards (Nachhaltig/Persönlich/Qualität/Aus einer Hand) — DE/EN/RU/UA
- [x] **Contact.jsx**: Eyebrow, H1, Intro, Direktkontakt-Labels (Adresse/Mobil/E-Mail/Öffnungszeiten), Formular (Placeholder, Submit-Button, Sending-State), Success-View ("Danke für Ihre Nachricht."), Toast-Messages (Erfolg/Fehler)
- [x] **EnergyPage.jsx** + **EnergyCalculator.jsx**: Hero, Calculator-Labels (Gebäudetyp/Wohnfläche/Energiequelle/Ergebnis/Heizlast/Empfohlen/Jahresverbrauch/Kosten aktuell/Mit Wärmepumpe/Ersparnis), Gebäudetypen (Altbau/Neubau/KfW/Passivhaus) + Subs, Energiequellen (Strom/Gas/Öl/Wärmepumpe), Next-Step-CTA
- [x] **CookieBanner.jsx**: Title, Heading, Text, Accept-Button, Read-Privacy-Link, Close-Aria-Label
- [x] Neue Dictionary-Keys: ~90 zusätzliche Einträge (`about.*`, `contact.*`, `energy.*`, `calc.*`, `cookie.*`)
- [x] **Testing-Agent v3 verifiziert** (iteration_3.json): Alle Translation-Keys lösen sich auf, Language-Switcher persistiert, Cookie-Banner-Accept schreibt localStorage, Energy-Calculator-Interaktionen funktionieren, kein Regress auf Shop/PD/Footer/Header

### v6 (2026-06-06) — Tech-Explainer (YouTube weg) + Content-Integration + 5 neue ECO-Produkte
- [x] **YouTube-Videos auf Kategorien-Seiten entfernt** → ersetzt durch proprietären `CategoryTechExplainer.jsx` mit eigenen animierten SVG-Schaltbildern pro Kategorie: Wärmepumpen-Kältekreislauf (R290, COP 5.2), Gas-Brennwertkessel (109% Wirkungsgrad), Smart-Home-Mesh (Edge-Hub + Devices), LED-Spektrum (Tunable White + RGB), Energieflow (PV → Inverter → Speicher → Verbraucher), 5-Stufen-Wasserfilter
- [x] Jede Kategorie hat: animiertes SVG-Schema, 4-Schritt-Prozess mit Tech-Details, 6-Feld Spec-Tabelle, voll mehrsprachig DE/EN/RU/UA
- [x] **5 neue Warmwasser-Produkte** importiert von www.eco-building.tech/category/warmwasser-wärmepumpen: Luft-Wasser-WP mit WiFi (€ 2.986), All-in-One Boiler (€ 1.299, 100/200/300L), Luft-Wasser-WP zur WW (€ 890, 82/102/149L), R290 Full Inverter (€ 4.510), Heizung+Kühlung+WW (€ 3.286, 12/16 kW). **Total Produkte: 64**.
- [x] **Brand-Positionierung von eco-building.tech integriert**: Hero-Subtitle erwähnt KI-Steuerung + KNX/BACnet/Modbus + 30% Energieverbrauch, Intro-Section umgebaut zu "Spezialisierter KI-Systemintegrator. Kein Installationsbetrieb." mit echten Stats 596/1 Mio./56
- [x] **Marquee** aktualisiert mit "KI-optimierte Steuerung", "596 Wärmepumpen-Projekte", "BIM-integriert", "KNX · BACnet · Modbus"
- [x] **Image-Audit**: 1 Zero-Byte-Bild gefunden (smart-panel-ceiling-speakers-set) → durch Unsplash-Foto ersetzt, in DB und SEED_PRODUCTS aktualisiert. Alle 64 Bilder laden jetzt korrekt.
- [x] **Obsolete YouTube-Files entfernt**: `CategoryVideoFeature.jsx`, `config/categoryVideos.js`
- [x] **Testing-Agent v3 verifiziert** (iteration_4.json): Backend 39/39 Tests pass, alle 5 neuen Slugs liefern 200, Tech-Explainer rendert auf allen 6 Kategorien (kein YouTube-iframe), i18n DE/EN/RU/UA bestätigt, 0 Issues

## P1/P2 Backlog (remaining)
- Bulk-Import von Alibaba/Kronoterm Produkt-URLs (User-Wunsch: ~20 weitere URLs offen, **User stellt URL-Liste später bereit**). **Empfehlung**: über Admin-Dashboard manuell einpflegen oder dedizierten Import-Endpoint bauen.
- Optional: AdminDashboard, AdminLogin, CheckoutSuccess, CheckoutCancel, CartDrawer i18n nachziehen (aktuell DE)
- Resend API-Key beschaffen + Domain verifizieren für echte Mail-Zustellung an `office@eco-building.tech`
- Refactor: `server.py` (1250 Zeilen) in `routes/`, `models/`, `seed/` aufsplitten
- 401-Interceptor in `api.js` der bei abgelaufenem Token localStorage räumt
- Bild-404s (Squirrel M30, Smart LED-Streifen/Deckenleuchte/Lampe) ersetzen
