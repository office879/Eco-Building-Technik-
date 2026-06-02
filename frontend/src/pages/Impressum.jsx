import React from "react";
import { useT } from "../context/I18nContext";

export default function Impressum() {
  const t = useT();

  return (
    <div className="pt-32 pb-20" data-testid="impressum-page">
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 py-12 border-b border-white/10">
        <div className="eyebrow mb-6">{t({ DE: "Rechtliches", EN: "Legal", RU: "Правовая информация", UA: "Юридична інформація" })}</div>
        <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[0.95]">
          {t({ DE: "Impressum.", EN: "Imprint.", RU: "Импрессум.", UA: "Імпресум." })}
        </h1>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="eyebrow mb-5">{t({ DE: "Firmensitz", EN: "Company HQ", RU: "Юридический адрес", UA: "Юридична адреса" })}</div>
            <div className="font-display text-2xl mb-4 leading-tight">ECO BUILDING TECHNIK GMBH</div>
            <div className="text-sm text-white/75 leading-relaxed space-y-1">
              <div>Seepromenade 109</div>
              <div>AT-2384 Ebreichsdorf</div>
              <div>{t({ DE: "Österreich", EN: "Austria", RU: "Австрия", UA: "Австрія" })}</div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-10">
            <Block label={t({ DE: "Kontakt", EN: "Contact", RU: "Контакт", UA: "Контакт" })}>
              <Row k={t({ DE: "Mobil", EN: "Mobile", RU: "Моб.", UA: "Моб." })} v={<a href="tel:+436643289599" className="hover:text-white">+43 / 0664 328 95 99</a>}/>
              <Row k="E-Mail" v={<a href="mailto:office@eco-building.tech" className="hover:text-white">office@eco-building.tech</a>}/>
              <Row k={t({ DE: "Internet", EN: "Web", RU: "Сайт", UA: "Сайт" })} v={<a href="https://www.eco-building.tech" target="_blank" rel="noreferrer" className="hover:text-white">www.eco-building.tech</a>}/>
            </Block>

            <Block label={t({ DE: "Unternehmensgegenstand", EN: "Business activity", RU: "Деятельность", UA: "Діяльність" })}>
              <p className="text-sm text-white/75 leading-relaxed">
                {t({
                  DE: "Planung, Lieferung und Installation nachhaltiger Gebäudetechnik — Wärmepumpen, Gas-Brennwertgeräte, Smart Home, Beleuchtung, Energiemanagement und Wassertechnik.",
                  EN: "Planning, supply and installation of sustainable building technology — heat pumps, gas condensing boilers, smart home, lighting, energy management and water technology.",
                  RU: "Проектирование, поставка и установка устойчивых инженерных систем — тепловые насосы, газовые конденсационные котлы, умный дом, освещение, энергоменеджмент и водные технологии.",
                  UA: "Проектування, постачання та встановлення стійкої інженерної техніки — теплові насоси, газові конденсаційні котли, розумний дім, освітлення, енергоменеджмент і водні технології.",
                })}
              </p>
            </Block>

            <Block label={t({ DE: "Anwendbare Rechtsvorschriften", EN: "Applicable law", RU: "Применимое право", UA: "Застосовне право" })}>
              <p className="text-sm text-white/75 leading-relaxed">
                {t({
                  DE: "Es gelten die Gewerbeordnung (GewO) sowie die einschlägigen Vorschriften des österreichischen Rechts. Zuständige Aufsichtsbehörde: Bezirkshauptmannschaft Baden.",
                  EN: "The Austrian Trade Code (GewO) and applicable Austrian law apply. Supervisory authority: District Administration Baden.",
                  RU: "Применяется Австрийский торговый кодекс (GewO) и соответствующие нормы австрийского права. Надзорный орган: Окружная администрация Бадена.",
                  UA: "Застосовується Австрійський торговий кодекс (GewO) та відповідні норми австрійського права. Наглядовий орган: Окружна адміністрація Бадена.",
                })}
              </p>
            </Block>

            <Block label={t({ DE: "Haftungsausschluss", EN: "Liability disclaimer", RU: "Отказ от ответственности", UA: "Відмова від відповідальності" })}>
              <p className="text-sm text-white/75 leading-relaxed">
                {t({
                  DE: "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.",
                  EN: "Despite careful content review we cannot accept liability for external links. The respective operators are solely responsible for the content of linked pages.",
                  RU: "Несмотря на тщательную проверку содержимого, мы не несем ответственности за внешние ссылки. Ответственность за содержание ссылок несут их операторы.",
                  UA: "Незважаючи на ретельну перевірку контенту, ми не несемо відповідальності за зовнішні посилання. Відповідальність за вміст несуть лише оператори зв’язаних сторінок.",
                })}
              </p>
            </Block>

            <Block label={t({ DE: "Urheberrecht", EN: "Copyright", RU: "Авторское право", UA: "Авторське право" })}>
              <p className="text-sm text-white/75 leading-relaxed">
                {t({
                  DE: "Alle Inhalte dieser Website (Texte, Bilder, Grafiken, Logos) unterliegen dem Urheberrecht. Jede Verwertung außerhalb der engen Grenzen des Urheberrechtsgesetzes bedarf der schriftlichen Zustimmung.",
                  EN: "All content on this site (text, images, graphics, logos) is protected by copyright. Any use outside the narrow limits of copyright law requires written consent.",
                  RU: "Все материалы данного сайта (тексты, изображения, графика, логотипы) защищены авторским правом. Любое использование за пределами законных рамок требует письменного согласия.",
                  UA: "Усі матеріали цього сайту (тексти, зображення, графіка, логотипи) захищені авторським правом. Будь-яке використання за межами законних рамок потребує письмової згоди.",
                })}
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
