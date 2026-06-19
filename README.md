# ECO Building Technik — Webshop & Admin

Full-Stack Webshop für ECO Building Technik GmbH (Wien).
KI-Systemintegrator für Gebäudeautomation, A+++ Wärmepumpen, Smart Home, Energiemanagement.

## Tech-Stack
- **Backend:** FastAPI (Python 3.11+), MongoDB, Motor, JWT-Auth
- **Frontend:** React 19, Tailwind CSS, shadcn/ui, Lucide Icons
- **Payments:** Stripe Checkout (Netto + 20 % MwSt. server-side)
- **Mail:** Resend
- **i18n:** DE · EN · RU · UA (komplett)

## Features
- 64 Produkte in 6 Kategorien (Wärmepumpen, Gas-Brennwert, Smart Home, Beleuchtung, Energiemanagement, Wasser)
- Animierte SVG-Tech-Schaltbilder pro Kategorie (proprietär, kein YouTube)
- ECO Building Technik Original-Film auf Smart Home
- Stripe Checkout + Anfragekorb-Workflow parallel
- Admin-Dashboard (Anfragen / Kontakte / Produkte)
- Mehrsprachiges Cookie-Banner, Energie-Rechner, Legal-Pages (Impressum/Datenschutz/AGB)
- Brand-Positionierung: "Spezialisierter KI-Systemintegrator" (596 WP-Projekte, 1 Mio. m², 56 Partner)

## Quick Start (lokal)

```bash
# Backend
cd backend
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # → Werte ausfüllen
uvicorn server:app --reload --host 0.0.0.0 --port 8001

# Frontend
cd frontend
yarn install
cp .env.example .env  # → REACT_APP_BACKEND_URL setzen
yarn start
```

App ist erreichbar auf:
- Frontend: http://localhost:3000
- Backend: http://localhost:8001/api/health

## Deployment auf eigenen Server
👉 **Siehe [DEPLOYMENT.md](./DEPLOYMENT.md)** — komplette Schritt-für-Schritt-Anleitung für Ubuntu Server inkl. Nginx, Supervisor, MongoDB-Auth und Stripe-Webhook.

## Repository-Struktur

```
/app
├── backend/                  # FastAPI
│   ├── server.py             # Haupt-API + Routes + Product-Seed
│   ├── auth.py               # JWT-Auth
│   ├── stripe_routes.py      # Stripe Checkout
│   ├── email_service.py      # Resend
│   ├── requirements.txt
│   └── .env.example
├── frontend/                 # React
│   ├── src/
│   │   ├── pages/            # Home, Shop, ProductDetail, ...
│   │   ├── components/       # Header, Footer, CategoryTechExplainer, ...
│   │   ├── context/          # I18n, Cart, Auth
│   │   └── config/categoryTech.js  # Tech-Schema-Inhalte (DE/EN/RU/UA)
│   ├── package.json
│   └── .env.example
├── memory/
│   ├── PRD.md                # Product Requirements & Changelog
│   ├── test_credentials.md   # Admin-Login (intern)
│   └── RESEND_SETUP.md
├── test_reports/             # Test-Iterationen
└── DEPLOYMENT.md             # ← Produktions-Deploy-Guide
```

## Production-Readiness

| Check | Status |
|---|---|
| Lint (Python) | ✅ 0 Errors |
| Lint (JavaScript) | ✅ 0 Blocking |
| Production-Build | ✅ 159 kB JS / 12 kB CSS (gzipped) |
| Backend Tests | ✅ 42/42 Pass |
| Frontend E2E | ✅ Alle Flows |
| Image-Audit | ✅ 64/64 Bilder valid |
| i18n Coverage | ✅ DE/EN/RU/UA komplett |
| Hardcoded Secrets | ✅ Keine |
| ENV-Konfiguration | ✅ Vollständig externalisiert |
| Deployment Agent | ✅ PASS |

Letzte Verifikation: **iteration_5.json** (0 Issues).

## Lizenz
Proprietary © 2026 ECO Building Technik GmbH
