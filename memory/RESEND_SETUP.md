# Resend E-Mail Setup für ECO Building Technik

## 🎯 Status
- ✅ Code & Integration komplett (siehe `/app/backend/email_service.py`)
- ✅ `BackgroundTasks` Hook in `/api/inquiries` aktiv
- ✅ HTML-E-Mail-Template mit Branding, Produkten, Reply-To fertig
- ⏳ **TODO**: API-Key von Resend in `/app/backend/.env` eintragen

---

## Schritt 1 — Resend-Account anlegen (1 Min)

1. Öffne https://resend.com/signup
2. Registriere dich mit **`office@eco-building.tech`**
3. E-Mail-Bestätigung in deinem Postfach klicken

---

## Schritt 2 — API-Key generieren (1 Min)

1. Im Resend-Dashboard: **API Keys** (links in der Navigation)
2. Klick auf **+ Create API Key**
   - Name: `building-technik-prod`
   - Permission: **Full access** (oder "Sending access")
   - Domain: `All domains`
3. **Klick auf "Add"** → Key kopieren (beginnt mit `re_...`)
   - ⚠️ Wird **nur einmal angezeigt** — sofort sichern!

---

## Schritt 3 — Key in .env eintragen

In `/app/backend/.env`:
```
RESEND_API_KEY="re_DEIN_KEY_HIER"
```

Dann Backend neu starten:
```
sudo supervisorctl restart backend
```

**Test:** Auf der Seite eine Test-Anfrage abschicken — die Mail sollte sofort in deinem Postfach landen.

---

## Schritt 4 — Domain verifizieren (5-15 Min, optional aber empfohlen)

**Ohne Domain-Verifizierung** kann Resend **nur an deine eigene Resend-Account-Adresse** senden (also `office@eco-building.tech`). Das reicht für interne Anfragen-Benachrichtigungen ✓.

**Mit Domain-Verifizierung** kannst du:
- Mails von `noreply@eco-building.tech` o.ä. senden (statt `onboarding@resend.dev`)
- Auch Bestätigungs-Mails an **Kunden** schicken
- Bessere Zustellbarkeit, kein "via resend.dev" in Mailclients

### So verifizierst du `eco-building.tech`:

1. **Resend Dashboard** → **Domains** → **+ Add Domain**
2. Eingabe: `eco-building.tech` → **Add**
3. Resend zeigt dir 3-4 DNS-Records (TXT/MX/CNAME):
   ```
   Type    Name                              Value
   MX      send.eco-building.tech            feedback-smtp.eu-west-1.amazonses.com (Priority 10)
   TXT     send.eco-building.tech            v=spf1 include:amazonses.com ~all
   TXT     resend._domainkey.eco-building... p=MIGfMA0GCSq... (DKIM Public Key)
   TXT     _dmarc.eco-building.tech          v=DMARC1; p=none;
   ```
4. **Bei deinem Domain-Provider** (z.B. World4You, IONOS, GoDaddy):
   - DNS-Verwaltung öffnen
   - Jeden Record exakt so anlegen
5. Zurück bei Resend → **Verify DNS Records** klicken
   - Propagation kann 5-30 Min dauern
6. Nach Verifizierung kannst du in `/app/backend/.env` den Sender ändern:
   ```
   SENDER_EMAIL="anfrage@eco-building.tech"
   ```
   und Backend neu starten.

---

## Schritt 5 — Test mit cURL (nach Key-Einrichtung)

```bash
API_URL=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)

curl -X POST "$API_URL/api/inquiries" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Max Test",
    "email": "office@eco-building.tech",
    "phone": "+43 660 1234567",
    "message": "Bitte um Angebot für JNOD 9kW Wärmepumpe.",
    "items": [
      {"slug":"jnod-j12hwh-r290-all-in-one-75c","name":"JNOD J12HWH","quantity":1}
    ]
  }'
```

Erfolg = `200 OK` + Mail trifft binnen 10 Sek bei dir ein.

---

## 🔧 Troubleshooting

**"Skipping email notification" im Backend-Log?**
→ `RESEND_API_KEY` ist leer oder `.env` wurde nicht neu geladen → Backend neu starten.

**HTTP 403 / "Domain not verified"?**
→ Du sendest `from` einer noch nicht verifizierten Domain. Setze `SENDER_EMAIL="onboarding@resend.dev"` zurück, ODER verifiziere die Domain (Schritt 4).

**Mail kommt nicht an, kein Fehler?**
→ Spam-Ordner prüfen. Bei `onboarding@resend.dev`-Absender im Resend Free Tier kannst du nur an die Account-E-Mail senden.

---

## 📊 Resend Free Tier Limits
- 3.000 E-Mails / Monat gratis
- 100 E-Mails / Tag
- Für 99 % der Kontaktformulare völlig ausreichend
