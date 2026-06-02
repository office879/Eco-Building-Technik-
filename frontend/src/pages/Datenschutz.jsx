import React from "react";
import { useT } from "../context/I18nContext";

export default function Datenschutz() {
  const t = useT();
  const head = t({
    DE: { eye: "Rechtliches", title1: "Datenschutz", title2: "-erklärung." },
    EN: { eye: "Legal", title1: "Privacy", title2: " Policy." },
    RU: { eye: "Правовая информация", title1: "Политика", title2: " конфиденциальности." },
    UA: { eye: "Юридична інформація", title1: "Політика", title2: " конфіденційності." },
  });
  const intro = t({
    DE: "Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Erklärung informiert Sie gemäß DSGVO über Art, Umfang und Zweck der Datenverarbeitung.",
    EN: "Protecting your personal data is important to us. This policy informs you about the type, scope and purpose of data processing under GDPR.",
    RU: "Защита ваших данных важна для нас. Эта политика информирует о характере, объёме и целях обработки данных согласно GDPR.",
    UA: "Захист ваших персональних даних важливий для нас. Ця політика інформує про характер, обсяг і мету обробки даних відповідно до GDPR.",
  });

  const sections = [
    {
      title: t({ DE: "01 — Erhebung allgemeiner Informationen", EN: "01 — Collection of general information", RU: "01 — Сбор общей информации", UA: "01 — Збір загальної інформації" }),
      body: t({
        DE: "Bei jedem Zugriff auf unsere Website werden automatisch Informationen wie Browsertyp, verwendetes Betriebssystem, Referrer-URL, IP-Adresse und Uhrzeit der Anfrage erfasst. Diese Daten werden nicht mit anderen Datenquellen zusammengeführt und ausschließlich zur Sicherstellung des störungsfreien Betriebs sowie zur Optimierung verwendet.",
        EN: "Each visit automatically records browser type, OS, referrer URL, IP and request time. This data is not merged with other sources and is used solely for stable operation and optimisation.",
        RU: "При каждом посещении автоматически фиксируются тип браузера, ОС, реферер, IP и время запроса. Эти данные не объединяются с другими источниками и используются только для стабильной работы.",
        UA: "Під час кожного відвідування автоматично фіксуються тип браузера, ОС, реферер, IP та час запиту. Ці дані не об’єднуються з іншими джерелами та використовуються лише для стабільної роботи.",
      }),
    },
    {
      title: t({ DE: "02 — Kontaktformular und Anfragekorb", EN: "02 — Contact form and inquiry basket", RU: "02 — Контактная форма и корзина запросов", UA: "02 — Контактна форма та кошик запитів" }),
      body: t({
        DE: "Wenn Sie uns per Kontaktformular oder Anfragekorb Anfragen zukommen lassen, werden Ihre Angaben (Name, E-Mail, Telefon, Nachricht) zwecks Bearbeitung gespeichert. Eine Weitergabe an Dritte erfolgt nicht. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.",
        EN: "If you contact us via form or inquiry basket, your details (name, email, phone, message) are stored to process your request. No third-party sharing. Legal basis: Art. 6(1)(b) GDPR.",
        RU: "При отправке формы или корзины запросов мы сохраняем ваши данные (имя, e-mail, телефон, сообщение) для обработки. Передача третьим лицам не осуществляется. Основание: ст. 6(1)(b) GDPR.",
        UA: "При надсиланні форми чи кошика запитів ми зберігаємо ваші дані (ім’я, e-mail, телефон, повідомлення) для обробки. Передача третім особам не здійснюється. Підстава: ст. 6(1)(b) GDPR.",
      }),
    },
    {
      title: t({ DE: "03 — Cookies", EN: "03 — Cookies", RU: "03 — Cookies", UA: "03 — Cookies" }),
      body: t({
        DE: "Wir nutzen ausschließlich technisch notwendige Cookies: Session-Cookie, Sprach-Präferenz und Cookie-Hinweis-Bestätigung. Kein Tracking, kein Drittanbieter-Marketing.",
        EN: "Only technically necessary cookies are used: session, language preference, cookie consent. No tracking, no third-party marketing.",
        RU: "Используются только технически необходимые cookies: сессия, языковая настройка, подтверждение cookie. Без трекинга и сторонней рекламы.",
        UA: "Використовуються лише технічно необхідні cookies: сесія, мовні налаштування, підтвердження cookie. Без трекінгу та сторонньої реклами.",
      }),
    },
    {
      title: t({ DE: "04 — Ihre Rechte (Art. 15–22 DSGVO)", EN: "04 — Your rights (Art. 15–22 GDPR)", RU: "04 — Ваши права (ст. 15–22 GDPR)", UA: "04 — Ваші права (ст. 15–22 GDPR)" }),
      body: t({
        DE: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Kontakt: office@eco-building.tech.",
        EN: "You have the right to access, rectification, deletion, restriction, data portability and objection. Contact: office@eco-building.tech.",
        RU: "Вы имеете право на доступ, исправление, удаление, ограничение, переносимость и возражение. Контакт: office@eco-building.tech.",
        UA: "Ви маєте право на доступ, виправлення, видалення, обмеження, перенесення та заперечення. Контакт: office@eco-building.tech.",
      }),
    },
    {
      title: t({ DE: "05 — Beschwerderecht", EN: "05 — Right to complain", RU: "05 — Право на жалобу", UA: "05 — Право на скаргу" }),
      body: t({
        DE: "Sie können Beschwerde bei der Österreichischen Datenschutzbehörde (dsb.gv.at) einlegen.",
        EN: "You may lodge a complaint with the Austrian Data Protection Authority (dsb.gv.at).",
        RU: "Вы можете подать жалобу в Австрийский орган по защите данных (dsb.gv.at).",
        UA: "Ви можете подати скаргу до Австрійського органу із захисту даних (dsb.gv.at).",
      }),
    },
    {
      title: t({ DE: "06 — Speicherdauer", EN: "06 — Retention period", RU: "06 — Срок хранения", UA: "06 — Термін зберігання" }),
      body: t({
        DE: "Personenbezogene Daten werden nur so lange gespeichert, wie es für die Erfüllung der jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen dies vorschreiben (max. 7 Jahre).",
        EN: "Personal data is kept only as long as needed for its purpose or required by law (max. 7 years).",
        RU: "Персональные данные хранятся только в течение времени, необходимого для целей или по закону (макс. 7 лет).",
        UA: "Персональні дані зберігаються лише на час, необхідний для цілей або за законом (макс. 7 років).",
      }),
    },
    {
      title: t({ DE: "07 — SSL-Verschlüsselung", EN: "07 — SSL encryption", RU: "07 — SSL-шифрование", UA: "07 — SSL-шифрування" }),
      body: t({
        DE: "Diese Website nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung.",
        EN: "This website uses SSL/TLS encryption for security.",
        RU: "Сайт использует SSL/TLS-шифрование для безопасности.",
        UA: "Сайт використовує SSL/TLS-шифрування для безпеки.",
      }),
    },
  ];

  return (
    <div className="pt-32 pb-20" data-testid="datenschutz-page">
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 py-12 border-b border-white/10">
        <div className="eyebrow mb-6">{head.eye}</div>
        <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[0.95]">
          {head.title1}<span className="italic-accent">{head.title2}</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base text-white/65 leading-relaxed">{intro}</p>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 md:sticky md:top-32 md:self-start">
            <div className="eyebrow mb-5">{t({ DE: "Verantwortlich", EN: "Controller", RU: "Контроллер данных", UA: "Контролер даних" })}</div>
            <div className="text-sm leading-relaxed text-white/80">
              <div className="font-display text-base mb-2 text-white">ECO BUILDING TECHNIK GMBH</div>
              Seepromenade 109<br/>
              AT-2384 Ebreichsdorf<br/>
              <a href="tel:+436643289599" className="hover:text-white">+43 / 0664 328 95 99</a><br/>
              <a href="mailto:office@eco-building.tech" className="hover:text-white">office@eco-building.tech</a>
            </div>
          </div>
          <div className="md:col-span-8 space-y-10">
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="font-display text-xl md:text-2xl tracking-tight mb-4">{s.title}</h2>
                <p className="text-sm md:text-base text-white/70 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
