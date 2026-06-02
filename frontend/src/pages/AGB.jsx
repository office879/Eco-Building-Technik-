import React from "react";
import { useT } from "../context/I18nContext";

export default function AGB() {
  const t = useT();

  const sections = [
    {
      title: t({ DE: "§ 1 Geltungsbereich", EN: "§ 1 Scope", RU: "§ 1 Сфера применения", UA: "§ 1 Сфера застосування" }),
      body: t({
        DE: "Diese Allgemeinen Geschäftsbedingungen gelten für sämtliche Verträge zwischen der ECO Building Technik GmbH und ihren Kunden über Lieferung und Montage von Gebäudetechnik-Komponenten, Wärmepumpen, Smart-Home-Systemen und damit verbundenen Dienstleistungen.",
        EN: "These general terms apply to all contracts between ECO Building Technik GmbH and its customers regarding the supply and installation of building technology, heat pumps, smart home systems and related services.",
        RU: "Настоящие общие условия применяются ко всем договорам между ECO Building Technik GmbH и её клиентами о поставке и монтаже инженерной техники, тепловых насосов, систем умного дома и сопутствующих услуг.",
        UA: "Ці загальні умови застосовуються до всіх договорів між ECO Building Technik GmbH та її клієнтами щодо постачання та монтажу інженерної техніки, теплових насосів, систем розумного дому та супутніх послуг.",
      }),
    },
    {
      title: t({ DE: "§ 2 Angebot und Vertragsabschluss", EN: "§ 2 Offer & conclusion of contract", RU: "§ 2 Предложение и заключение договора", UA: "§ 2 Пропозиція та укладення договору" }),
      body: t({
        DE: "Unsere Angebote sind freibleibend. Der Vertrag kommt durch unsere schriftliche Auftragsbestätigung oder mit der Auslieferung der Ware zustande. Anfragen über den Anfragekorb sind unverbindlich.",
        EN: "Our offers are non-binding. A contract is concluded upon our written order confirmation or delivery. Inquiry basket submissions are non-binding.",
        RU: "Наши предложения необязательны. Договор заключается после нашего письменного подтверждения заказа или поставки. Запросы через корзину не обязательны.",
        UA: "Наші пропозиції необов’язкові. Договір укладається після нашого письмового підтвердження або поставки. Запити через кошик є необов’язковими.",
      }),
    },
    {
      title: t({ DE: "§ 3 Preise und Zahlung", EN: "§ 3 Prices & payment", RU: "§ 3 Цены и оплата", UA: "§ 3 Ціни та оплата" }),
      body: t({
        DE: "Alle Preise verstehen sich in Euro inkl. gesetzlicher Mehrwertsteuer, sofern nicht anders angegeben. Zahlungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug fällig. Bei Großprojekten gilt das im individuellen Angebot vereinbarte Zahlungsschema (typisch 30 % Anzahlung, 60 % bei Lieferung, 10 % nach Abnahme).",
        EN: "All prices are in Euro incl. statutory VAT unless stated otherwise. Payment is due within 14 days of invoice without deduction. For large projects, payment terms agreed in the individual offer apply (typically 30% down, 60% on delivery, 10% after handover).",
        RU: "Все цены в евро с НДС, если не указано иное. Оплата в течение 14 дней с даты выставления счёта. Для крупных проектов действуют индивидуальные условия (обычно 30% — аванс, 60% — поставка, 10% — после приёмки).",
        UA: "Усі ціни в євро з ПДВ, якщо не зазначено інше. Оплата протягом 14 днів від дати рахунку. Для великих проєктів діють індивідуальні умови (зазвичай 30% — аванс, 60% — поставка, 10% — після прийому).",
      }),
    },
    {
      title: t({ DE: "§ 4 Lieferung und Montage", EN: "§ 4 Delivery & installation", RU: "§ 4 Поставка и монтаж", UA: "§ 4 Постачання та монтаж" }),
      body: t({
        DE: "Liefertermine sind unverbindlich, sofern nicht ausdrücklich als verbindlich vereinbart. Verzögerungen aufgrund höherer Gewalt oder Lieferengpässen seitens unserer Hersteller berechtigen nicht zum Rücktritt vom Vertrag.",
        EN: "Delivery dates are non-binding unless expressly agreed otherwise. Delays caused by force majeure or supply shortages by our manufacturers do not entitle the customer to withdraw from the contract.",
        RU: "Сроки поставки необязательны, если иное явно не согласовано. Задержки из-за форс-мажора или нехватки поставок производителей не дают права на расторжение.",
        UA: "Терміни постачання необов’язкові, якщо інше прямо не погоджено. Затримки через форс-мажор чи дефіцит постачань виробників не дають права на розірвання.",
      }),
    },
    {
      title: t({ DE: "§ 5 Gewährleistung", EN: "§ 5 Warranty", RU: "§ 5 Гарантия", UA: "§ 5 Гарантія" }),
      body: t({
        DE: "Es gelten die gesetzlichen Gewährleistungsfristen. Bei Wärmepumpen und Gas-Brennwertgeräten gewähren wir zusätzlich eine erweiterte Herstellergarantie gemäß Produktdatenblatt (5–7 Jahre auf Verdichter).",
        EN: "Statutory warranty applies. For heat pumps and gas condensing boilers we provide an extended manufacturer warranty per product data sheet (5–7 years on compressor).",
        RU: "Действуют установленные законом гарантии. Для тепловых насосов и газовых конденсационных котлов предоставляется расширенная гарантия производителя (5–7 лет на компрессор).",
        UA: "Діють встановлені законом гарантії. Для теплових насосів і газових конденсаційних котлів надається розширена гарантія виробника (5–7 років на компресор).",
      }),
    },
    {
      title: t({ DE: "§ 6 Rückgaberecht", EN: "§ 6 Right of withdrawal", RU: "§ 6 Право возврата", UA: "§ 6 Право повернення" }),
      body: t({
        DE: "Verbraucher haben ein 14-tägiges Widerrufsrecht ab Erhalt der Ware. Ausgenommen sind individuell konfigurierte oder bereits montierte Produkte.",
        EN: "Consumers have a 14-day right of withdrawal from receipt. Custom-configured or already installed products are excluded.",
        RU: "Потребители имеют право возврата в течение 14 дней с момента получения. Исключены индивидуально настроенные или уже установленные товары.",
        UA: "Споживачі мають право на повернення протягом 14 днів від отримання. Виключаються індивідуально налаштовані або вже встановлені товари.",
      }),
    },
    {
      title: t({ DE: "§ 7 Eigentumsvorbehalt", EN: "§ 7 Retention of title", RU: "§ 7 Сохранение права собственности", UA: "§ 7 Збереження права власності" }),
      body: t({
        DE: "Die gelieferte Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.",
        EN: "Delivered goods remain our property until full payment is received.",
        RU: "Поставленный товар остаётся нашей собственностью до полной оплаты.",
        UA: "Поставлений товар залишається нашою власністю до повної оплати.",
      }),
    },
    {
      title: t({ DE: "§ 8 Gerichtsstand", EN: "§ 8 Jurisdiction", RU: "§ 8 Подсудность", UA: "§ 8 Підсудність" }),
      body: t({
        DE: "Gerichtsstand ist das sachlich zuständige Gericht in Wien, Österreich. Es gilt österreichisches Recht unter Ausschluss des UN-Kaufrechts.",
        EN: "Place of jurisdiction is the competent court in Vienna, Austria. Austrian law applies, excluding the UN Sales Convention.",
        RU: "Юрисдикция — компетентный суд в Вене, Австрия. Применяется австрийское право без Венской конвенции о купле-продаже.",
        UA: "Юрисдикція — компетентний суд у Відні, Австрія. Застосовується австрійське право без Віденської конвенції про купівлю-продаж.",
      }),
    },
  ];

  const head = t({
    DE: { eye: "Rechtliches", title1: "Allgemeine", title2: " Geschäfts­bedingungen." },
    EN: { eye: "Legal", title1: "Terms &", title2: " Conditions." },
    RU: { eye: "Правовая информация", title1: "Условия", title2: " и положения." },
    UA: { eye: "Юридична інформація", title1: "Умови", title2: " та положення." },
  });

  return (
    <div className="pt-32 pb-20" data-testid="agb-page">
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 py-12 border-b border-white/10">
        <div className="eyebrow mb-6">{head.eye}</div>
        <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[0.95]">
          {head.title1}<span className="italic-accent">{head.title2}</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base text-white/65 leading-relaxed">
          {t({
            DE: "Stand: Februar 2026. Die nachfolgenden Bedingungen gelten ergänzend zu den jeweiligen schriftlichen Verträgen.",
            EN: "As of February 2026. The following terms apply in addition to individual written contracts.",
            RU: "По состоянию на февраль 2026. Условия применяются дополнительно к индивидуальным письменным договорам.",
            UA: "Станом на лютий 2026. Умови застосовуються додатково до індивідуальних письмових договорів.",
          })}
        </p>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 py-16 space-y-10">
        {sections.map((s, i) => (
          <div key={i} className="border-b border-white/10 pb-10 last:border-b-0">
            <h2 className="font-display text-xl md:text-2xl tracking-tight mb-4">{s.title}</h2>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
