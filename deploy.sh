#!/usr/bin/env bash
# ============================================================================
# ECO Building Technik — Self-Server Deploy-Script
# ============================================================================
# Verwendung:  cd /var/www/eco-building && ./deploy.sh
#
# Was es macht:
#   1. git pull (neuer Code)
#   2. Backend: pip install -r requirements.txt
#   3. Frontend: yarn install + yarn build
#   4. supervisor restart eco-backend
#   5. nginx/caddy reload
#   6. Health-Check
# ============================================================================
set -euo pipefail

ROOT="${ROOT:-/var/www/eco-building}"
BACKEND_SUPERVISOR_NAME="${BACKEND_SUPERVISOR_NAME:-eco-backend}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:8001/api/health}"
WEBSERVER="${WEBSERVER:-nginx}"   # nginx | caddy

bold() { printf "\033[1;36m%s\033[0m\n" "$*"; }
ok()   { printf "\033[1;32m✔ %s\033[0m\n" "$*"; }
warn() { printf "\033[1;33m⚠ %s\033[0m\n" "$*"; }
fail() { printf "\033[1;31m✖ %s\033[0m\n" "$*"; exit 1; }

cd "$ROOT" || fail "Verzeichnis $ROOT nicht gefunden"

bold "1/6 · git pull"
if [ -d .git ]; then
    git pull --ff-only
    ok "Code aktualisiert"
else
    warn "Kein git-Repo — überspringe git pull"
fi

bold "2/6 · Backend-Dependencies"
cd "$ROOT/backend"
if [ ! -d venv ]; then
    bold "  · venv anlegen"
    python3.11 -m venv venv || python3 -m venv venv
fi
source venv/bin/activate
pip install -q -U pip wheel
pip install -q -r requirements.txt
deactivate
ok "Backend-Dependencies aktualisiert"

bold "3/6 · Frontend-Build"
cd "$ROOT/frontend"
yarn install --frozen-lockfile
CI=true GENERATE_SOURCEMAP=false yarn build
ok "Frontend gebaut → $ROOT/frontend/build/"

bold "4/6 · Supervisor: restart $BACKEND_SUPERVISOR_NAME"
sudo supervisorctl restart "$BACKEND_SUPERVISOR_NAME"
sleep 2
sudo supervisorctl status "$BACKEND_SUPERVISOR_NAME" | grep -q RUNNING && ok "Backend läuft" || fail "Backend nicht RUNNING — siehe /var/log/eco-backend.err.log"

bold "5/6 · Webserver reload ($WEBSERVER)"
case "$WEBSERVER" in
    nginx)
        sudo nginx -t && sudo systemctl reload nginx
        ok "nginx reload"
        ;;
    caddy)
        sudo systemctl reload caddy
        ok "caddy reload"
        ;;
    *)
        warn "Unbekannter Webserver: $WEBSERVER — bitte manuell reload"
        ;;
esac

bold "6/6 · Health-Check"
for i in 1 2 3 4 5; do
    if curl -fsS --max-time 5 "$HEALTH_URL" > /dev/null 2>&1; then
        ok "Health-Check OK ($HEALTH_URL)"
        echo
        ok "DEPLOY ERFOLGREICH 🚀"
        exit 0
    fi
    warn "Versuch $i/5 fehlgeschlagen, warte 2 s …"
    sleep 2
done
fail "Health-Check fehlgeschlagen — Backend prüfen mit: sudo supervisorctl tail $BACKEND_SUPERVISOR_NAME stderr"
