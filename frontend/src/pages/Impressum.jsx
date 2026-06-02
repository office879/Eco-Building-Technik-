import React from "react";

export default function Impressum() {
  return (
    <div className="pt-32 pb-20" data-testid="impressum-page">
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 py-12 border-b border-white/10">
        <div className="eyebrow mb-6">Rechtliches</div>
        <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[0.95]">
          Impressum.
        </h1>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 py-16 prose-invert">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="eyebrow mb-5">Firmensitz</div>
            <div className="font-display text-2xl mb-4 leading-tight">ECO BUILDING TECHNIK GMBH</div>
            <div className="text-sm text-white/75 leading-relaxed space-y-1">
              <div>Seepromenade 109</div>
              <div>AT-2384 Ebreichsdorf</div>
              <div>Österreich</div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-10">
            <Block label="Kontakt">
              <Row k="Mobil" v={<a href="tel:+436643289599" className="hover:text-white">+43 / 0664 328 95 99</a>}/>
              <Row k="E-Mail" v={<a href="mailto:office@eco-building.tech" className="hover:text-white">office@eco-building.tech</a>}/>
              <Row k="Internet" v={<a href="https://www.eco-building.tech" target="_blank" rel="noreferrer" className="hover:text-white">www.eco-building.tech</a>}/>
            </Block>

            <Block label="Unternehmensgegenstand">
              <p className="text-sm text-white/75 leading-relaxed">
                Planung, Lieferung und Installation nachhaltiger Gebäudetechnik —
                Wärmepumpen, Gas-Brennwertgeräte, Smart Home, Beleuchtung, Energiemanagement und Wassertechnik.
              </p>
            </Block>

            <Block label="Anwendbare Rechtsvorschriften">
              <p className="text-sm text-white/75 leading-relaxed">
                Es gelten die Gewerbeordnung (GewO) sowie die einschlägigen Vorschriften des österreichischen Rechts.
                Zuständige Aufsichtsbehörde: Bezirkshauptmannschaft Baden.
              </p>
            </Block>

            <Block label="Haftungsausschluss">
              <p className="text-sm text-white/75 leading-relaxed">
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
                Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
              </p>
            </Block>

            <Block label="Urheberrecht">
              <p className="text-sm text-white/75 leading-relaxed">
                Alle Inhalte dieser Website (Texte, Bilder, Grafiken, Logos) unterliegen dem Urheberrecht.
                Jede Verwertung außerhalb der engen Grenzen des Urheberrechtsgesetzes bedarf der schriftlichen Zustimmung.
              </p>
            </Block>
          </div>
        </div>
      </section>
    </div>
  );
}

function Block({ label, children }) {
  return (
    <div>
      <div className="eyebrow mb-4">{label}</div>
      <div>{children}</div>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex justify-between py-3 border-b border-white/10 text-sm">
      <span className="text-white/55">{k}</span>
      <span className="text-white/90">{v}</span>
    </div>
  );
}
