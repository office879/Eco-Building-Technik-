import React from "react";

export default function Datenschutz() {
  return (
    <div className="pt-32 pb-20" data-testid="datenschutz-page">
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 py-12 border-b border-white/10">
        <div className="eyebrow mb-6">Rechtliches</div>
        <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[0.95]">
          Datenschutz<span className="italic-accent">-erklärung.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base text-white/65 leading-relaxed">
          Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Erklärung informiert
          Sie gemäß DSGVO über Art, Umfang und Zweck der Datenverarbeitung.
        </p>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 md:sticky md:top-32 md:self-start">
            <div className="eyebrow mb-5">Verantwortlich</div>
            <div className="text-sm leading-relaxed text-white/80">
              <div className="font-display text-base mb-2 text-white">ECO BUILDING TECHNIK GMBH</div>
              Seepromenade 109<br/>
              AT-2384 Ebreichsdorf<br/>
              <a href="tel:+436643289599" className="hover:text-white">+43 / 0664 328 95 99</a><br/>
              <a href="mailto:office@eco-building.tech" className="hover:text-white">office@eco-building.tech</a>
            </div>
          </div>

          <div className="md:col-span-8 space-y-10">
            <Section title="01 — Erhebung allgemeiner Informationen">
              Bei jedem Zugriff auf unsere Website werden automatisch Informationen wie Browsertyp,
              verwendetes Betriebssystem, Referrer-URL, IP-Adresse und Uhrzeit der Anfrage erfasst.
              Diese Daten werden nicht mit anderen Datenquellen zusammengeführt und ausschließlich zur
              Sicherstellung des störungsfreien Betriebs sowie zur Optimierung verwendet.
            </Section>

            <Section title="02 — Kontaktformular und Anfragekorb">
              Wenn Sie uns per Kontaktformular oder Anfragekorb Anfragen zukommen lassen, werden Ihre
              Angaben (Name, E-Mail, Telefon, Nachricht) zwecks Bearbeitung gespeichert. Eine Weitergabe
              an Dritte erfolgt nicht. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung).
            </Section>

            <Section title="03 — Cookies">
              Wir nutzen ausschließlich technisch notwendige Cookies: Session-Cookie, Sprach-Präferenz
              und Cookie-Hinweis-Bestätigung. Kein Tracking, kein Drittanbieter-Marketing.
            </Section>

            <Section title="04 — Ihre Rechte (Art. 15–22 DSGVO)">
              Sie haben das Recht auf <strong>Auskunft</strong>, <strong>Berichtigung</strong>,
              <strong> Löschung</strong>, <strong>Einschränkung</strong> der Verarbeitung,
              <strong> Datenübertragbarkeit</strong> und <strong>Widerspruch</strong>. Wenden Sie sich dafür
              jederzeit unter <a href="mailto:office@eco-building.tech" className="underline">office@eco-building.tech</a> an uns.
            </Section>

            <Section title="05 — Beschwerderecht">
              Sie können Beschwerde bei der Österreichischen Datenschutzbehörde einlegen
              (<a href="https://www.dsb.gv.at" target="_blank" rel="noreferrer" className="underline">dsb.gv.at</a>).
            </Section>

            <Section title="06 — Speicherdauer">
              Personenbezogene Daten werden nur so lange gespeichert, wie es für die Erfüllung der jeweiligen
              Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen dies vorschreiben (max. 7 Jahre
              gemäß BAO/UGB).
            </Section>

            <Section title="07 — SSL-Verschlüsselung">
              Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte
              eine SSL-/TLS-Verschlüsselung.
            </Section>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="font-display text-xl md:text-2xl tracking-tight mb-4">{title}</h2>
      <p className="text-sm md:text-base text-white/70 leading-relaxed">{children}</p>
    </div>
  );
}
