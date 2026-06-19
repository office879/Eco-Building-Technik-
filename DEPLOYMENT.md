# ECO Building Technik — Deployment Guide

Komplettes Setup für den Self-Hosted Production-Deploy.
**Stack:** FastAPI (Python 3.11+) + React (Node 18+) + MongoDB 6+

---

## 1 · Architektur-Übersicht

```
                          ┌──────────────────┐
                          │  NGINX / Caddy   │  ← Port 80/443 (TLS)
                          │   Reverse-Proxy  │
                          └────────┬─────────┘
              ┌────────────────────┼────────────────────┐
              │ /  →               │ /api/  →           │
              ▼                    ▼                    │
     ┌─────────────────┐   ┌─────────────────┐         │
     │  Static React   │   │ FastAPI/Uvicorn │         │
     │   (build/)      │   │   :8001         │         │
     └─────────────────┘   └────────┬────────┘         │
                                    │                   │
                                    ▼                   │
                          ┌──────────────────┐         │
                          │   MongoDB :27017 │         │
                          └──────────────────┘         │
```

---

## 2 · Server-Voraussetzungen

| Komponente | Mindest-Version | Empfehlung |
|---|---|---|
| OS | Ubuntu 22.04 LTS / Debian 12 | Ubuntu 24.04 LTS |
| Python | 3.11 | 3.12 |
| Node.js | 18 LTS | 20 LTS |
| Yarn | 1.22 | latest |
| MongoDB | 6.0 | 7.0 |
| RAM | 2 GB | 4 GB |
| Disk | 20 GB SSD | 50 GB SSD |
| Reverse Proxy | nginx / Caddy | Caddy (auto-TLS) |

---

## 3 · Server-Vorbereitung (Ubuntu 22.04/24.04)

```bash
# System aktualisieren
sudo apt update && sudo apt upgrade -y

# Build-Tools + Git
sudo apt install -y git curl build-essential

# Python 3.11+
sudo apt install -y python3.11 python3.11-venv python3-pip

# Node 20 + Yarn
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo corepack enable
sudo corepack prepare yarn@stable --activate

# MongoDB 7
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg] \
  https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl enable --now mongod

# Supervisor (zum Daemon-Management)
sudo apt install -y supervisor

# Nginx (oder Caddy für auto-TLS)
sudo apt install -y nginx certbot python3-certbot-nginx
```

---

## 4 · Code deployen

```bash
# Code auf den Server bringen (z.B. via Save-to-GitHub im Emergent-UI)
sudo mkdir -p /var/www/eco-building
sudo chown $USER:$USER /var/www/eco-building
cd /var/www/eco-building
git clone <YOUR_GITHUB_REPO_URL> .
```

---

## 5 · Backend Setup

```bash
cd /var/www/eco-building/backend
python3.11 -m venv venv
source venv/bin/activate
pip install -U pip wheel
pip install -r requirements.txt
```

### Backend `.env` anpassen

Datei: `/var/www/eco-building/backend/.env`

```bash
# === Pflicht ===
MONGO_URL=mongodb://localhost:27017
DB_NAME=eco_building_prod

# === CORS (deine Domain eintragen!) ===
CORS_ORIGINS=https://eco-building.tech,https://www.eco-building.tech

# === JWT (mit `openssl rand -hex 64` generieren) ===
JWT_SECRET=<HIER-EINEN-64-ZEICHEN-RANDOM-STRING>
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=720

# === Admin-Login (initial seed) ===
ADMIN_EMAIL=office@eco-building.tech
ADMIN_PASSWORD=<DEIN-STARKES-PASSWORT>

# === Stripe (LIVE-Keys bei Production) ===
# Test-Keys: https://dashboard.stripe.com/test/apikeys
# Live-Keys: https://dashboard.stripe.com/apikeys
STRIPE_API_KEY=sk_live_...

# === Resend (für Mail-Benachrichtigungen) ===
# https://resend.com/api-keys
RESEND_API_KEY=re_...
RESEND_FROM=ECO Building Technik <office@eco-building.tech>
RESEND_TO=office@eco-building.tech
```

**Hinweis:** `RESEND_API_KEY` darf leer bleiben — Mails werden dann übersprungen, der Rest läuft.

### Backend testen
```bash
cd /var/www/eco-building/backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001
# Browser: http://<server-ip>:8001/api/health → {"status":"ok"}
# Ctrl+C zum Beenden
```

---

## 6 · Frontend Setup

```bash
cd /var/www/eco-building/frontend
yarn install
```

### Frontend `.env` anpassen

Datei: `/var/www/eco-building/frontend/.env`

```bash
# Pflicht: Deine öffentliche Domain (mit https!)
REACT_APP_BACKEND_URL=https://eco-building.tech
```

### Production-Build erstellen
```bash
cd /var/www/eco-building/frontend
yarn build
# Erstellt /var/www/eco-building/frontend/build/ mit index.html + static/
```

---

## 7 · Supervisor — Backend als Daemon

Datei: `/etc/supervisor/conf.d/eco-backend.conf`

```ini
[program:eco-backend]
command=/var/www/eco-building/backend/venv/bin/uvicorn server:app --host 0.0.0.0 --port 8001 --workers 2
directory=/var/www/eco-building/backend
user=www-data
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stderr_logfile=/var/log/eco-backend.err.log
stdout_logfile=/var/log/eco-backend.out.log
environment=PATH="/var/www/eco-building/backend/venv/bin:/usr/bin:/bin"
```

```bash
sudo chown -R www-data:www-data /var/www/eco-building
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start eco-backend
sudo supervisorctl status
```

---

## 8 · Nginx Reverse-Proxy

Datei: `/etc/nginx/sites-available/eco-building.tech`

```nginx
server {
    listen 80;
    server_name eco-building.tech www.eco-building.tech;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name eco-building.tech www.eco-building.tech;

    # TLS — wird von certbot ausgefüllt
    ssl_certificate     /etc/letsencrypt/live/eco-building.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/eco-building.tech/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;

    # Security
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header Referrer-Policy strict-origin-when-cross-origin;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    client_max_body_size 50M;

    # Static React build
    root /var/www/eco-building/frontend/build;
    index index.html;

    # Cache-Bust für static assets
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 90s;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/eco-building.tech /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# TLS-Zertifikat generieren (Let's Encrypt)
sudo certbot --nginx -d eco-building.tech -d www.eco-building.tech
```

**Alternative: Caddy** (auto-TLS, viel einfacher)

Datei: `/etc/caddy/Caddyfile`

```caddy
eco-building.tech, www.eco-building.tech {
    root * /var/www/eco-building/frontend/build
    encode gzip
    file_server

    handle /api/* {
        reverse_proxy 127.0.0.1:8001
    }

    handle {
        try_files {path} /index.html
        file_server
    }
}
```

```bash
sudo systemctl reload caddy
# Fertig — Caddy zieht Let's Encrypt automatisch.
```

---

## 9 · MongoDB-Sicherheit (Production)

```bash
# Admin-User anlegen
mongosh
> use admin
> db.createUser({
    user: "ecoAdmin",
    pwd: "<STARKES-PASSWORT>",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  })
> exit

# Authentifizierung aktivieren
sudo sed -i 's/#security:/security:\n  authorization: enabled/' /etc/mongod.conf
sudo systemctl restart mongod
```

`MONGO_URL` in `/var/www/eco-building/backend/.env` aktualisieren:
```
MONGO_URL=mongodb://ecoAdmin:<PASSWORT>@localhost:27017/?authSource=admin
```

```bash
sudo supervisorctl restart eco-backend
```

---

## 10 · Initialer Daten-Seed

Beim ersten Start liest der Backend leere DB und seedet automatisch:
- 64 Produkte (Wärmepumpen, Smart Home, Wasser, etc.)
- 6 Kategorien
- Admin-User (aus `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

Logs prüfen:
```bash
sudo supervisorctl tail -f eco-backend stdout
# "Seeded N products" + "Admin user created" sollten erscheinen
```

---

## 11 · Stripe Webhook (optional, für Production)

Wenn du Stripe-Webhook-Events (z.B. payment success) verarbeiten willst:

1. Stripe Dashboard → Developers → Webhooks → Add endpoint
2. URL: `https://eco-building.tech/api/checkout/webhook`
3. Events: `checkout.session.completed`, `payment_intent.succeeded`
4. Webhook-Secret in `.env`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
5. `sudo supervisorctl restart eco-backend`

---

## 12 · Backup-Strategie

```bash
# MongoDB-Dump tägliches Cron
sudo crontab -e
0 3 * * * mongodump --db eco_building_prod --out /backup/$(date +\%Y\%m\%d) --gzip

# Aufräumen (>30 Tage löschen)
0 4 * * * find /backup -maxdepth 1 -type d -mtime +30 -exec rm -rf {} \;
```

---

## 13 · Health-Check & Monitoring

```bash
# Manuell
curl https://eco-building.tech/api/health
# → {"status":"ok"}

# Uptime-Monitoring (z.B. UptimeRobot, Healthchecks.io)
# Endpoint: https://eco-building.tech/api/health
# Interval: 5 min
```

---

## 14 · Update-Workflow

```bash
cd /var/www/eco-building
git pull

# Backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
sudo supervisorctl restart eco-backend

# Frontend
cd ../frontend
yarn install
yarn build
sudo systemctl reload nginx     # oder caddy
```

---

## 15 · Checkliste Go-Live

- [ ] Server-Ressourcen ausreichend (2 GB RAM minimum)
- [ ] Domain auf Server-IP gepointet (A-Record)
- [ ] MongoDB läuft mit Authentifizierung
- [ ] Backend `.env` mit echten Werten ausgefüllt (kein "..."-Platzhalter)
- [ ] `JWT_SECRET` zufällig generiert (64 Zeichen)
- [ ] `ADMIN_PASSWORD` stark gewählt (kein "admin123")
- [ ] `CORS_ORIGINS` auf deine echte Domain gesetzt
- [ ] Stripe **Live**-Keys (statt Test) in `.env`
- [ ] Resend `RESEND_API_KEY` + Domain in Resend-Dashboard verifiziert
- [ ] Frontend `REACT_APP_BACKEND_URL` auf https://eco-building.tech
- [ ] Frontend Build erstellt (`yarn build`)
- [ ] Nginx/Caddy konfiguriert + TLS aktiv
- [ ] Supervisor läuft + autostart aktiv
- [ ] Initial-Seed-Logs geprüft → 64 Produkte + Admin
- [ ] Admin-Login funktioniert: https://eco-building.tech/admin/login
- [ ] Probekauf in Stripe-Test-Mode getestet
- [ ] Backup-Cron eingerichtet
- [ ] Uptime-Monitoring aktiv

---

## 16 · Standard-Logins (DEV)

In `/app/memory/test_credentials.md` hinterlegt:
- Admin: `office@eco-building.tech` / `<aus .env>`

**Vor Production: ADMIN_PASSWORD und JWT_SECRET ändern!**

---

## 17 · Troubleshooting

| Problem | Lösung |
|---|---|
| Backend startet nicht | `sudo tail -f /var/log/eco-backend.err.log` — meist Mongo-Connection oder ENV fehlt |
| Frontend zeigt 404 auf Direktlink | Nginx-`try_files` fehlt — siehe SPA-Fallback in `location /` |
| Stripe Checkout-Button leitet auf 404 | `success_url` / `cancel_url` in Stripe noch auf Test-Domain. Stripe Dashboard → Settings prüfen. |
| Login funktioniert nicht | `JWT_SECRET` muss identisch sein zwischen Restarts. Wenn geändert → alle Tokens ungültig |
| Mails kommen nicht an | Resend-Domain verifiziert? `RESEND_FROM` muss zu einer verifizierten Domain gehören |
| CORS-Error in Browser | `CORS_ORIGINS` muss deine exakte Frontend-URL enthalten (mit https://) |
| Bilder laden nicht | Externe URLs (Unsplash, Alibaba) — von Server aus erreichbar? `curl -I <image-url>` testen |

---

## 18 · Production-Hardening (optional, empfohlen)

```bash
# Firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Fail2Ban
sudo apt install -y fail2ban

# Mongo nicht von außen erreichbar
sudo sed -i 's/bindIp:.*/bindIp: 127.0.0.1/' /etc/mongod.conf
sudo systemctl restart mongod

# Automatische Sicherheits-Updates
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

**Stand: 06.06.2026**

Bei Fragen oder Problemen: stelle die Frage im Emergent-Chat — ich helfe gerne weiter.
