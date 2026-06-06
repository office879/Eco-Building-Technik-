import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";

const STORAGE_KEY = "ecobt_lang_v1";
const DEFAULT_LANG = "DE";
const SUPPORTED = ["DE", "EN", "RU", "UA"];

const I18nContext = createContext(null);

// ============ Translation Dictionary ============
const DICT = {
  // Navigation
  "nav.start":        { DE: "Start", EN: "Home", RU: "Главная", UA: "Головна" },
  "nav.shop":         { DE: "Shop", EN: "Shop", RU: "Магазин", UA: "Магазин" },
  "nav.energy":       { DE: "Energie-Rechner", EN: "Energy Calculator", RU: "Калькулятор энергии", UA: "Калькулятор енергії" },
  "nav.about":        { DE: "Über uns", EN: "About", RU: "О нас", UA: "Про нас" },
  "nav.contact":      { DE: "Kontakt", EN: "Contact", RU: "Контакты", UA: "Контакти" },

  // Common CTAs
  "cta.consult":      { DE: "Beratung anfragen", EN: "Request consultation", RU: "Запросить консультацию", UA: "Замовити консультацію" },
  "cta.discover":     { DE: "Produkte entdecken", EN: "Discover products", RU: "Смотреть продукты", UA: "Дивитися продукти" },
  "cta.cart":         { DE: "Anfragekorb", EN: "Inquiry cart", RU: "Корзина запросов", UA: "Кошик запитів" },
  "cta.inquire":      { DE: "Anfragen", EN: "Inquire", RU: "Запросить", UA: "Запит" },
  "cta.addToCart":    { DE: "Zur Anfrage hinzufügen", EN: "Add to inquiry", RU: "Добавить к запросу", UA: "Додати до запиту" },
  "cta.sendInquiry":  { DE: "Anfrage senden", EN: "Send inquiry", RU: "Отправить запрос", UA: "Надіслати запит" },
  "cta.viewDetails":  { DE: "Details ansehen", EN: "View details", RU: "Подробнее", UA: "Детальніше" },
  "cta.calc":         { DE: "Energie-Rechner", EN: "Energy Calculator", RU: "Калькулятор", UA: "Калькулятор" },

  // Hero
  "hero.eyebrow":     { DE: "Nachhaltige Gebäudetechnik · A+++", EN: "Sustainable Building Technology · A+++", RU: "Устойчивые инженерные системы · A+++", UA: "Сталі інженерні системи · A+++" },
  "hero.subtitle":    {
    DE: "Fachbetrieb für Heizung, Kälte, Lüftung, Smart Home und Energiemanagement — werkseitig geplant, hocheffizient installiert und in nachhaltige Gebäude integriert.",
    EN: "Specialist for heating, cooling, ventilation, smart home and energy management — factory-planned, highly efficiently installed and integrated into sustainable buildings.",
    RU: "Специалисты по отоплению, кондиционированию, вентиляции, умному дому и энергоменеджменту — заводское проектирование, высокоэффективный монтаж и интеграция в устойчивые здания.",
    UA: "Спеціалісти з опалення, кондиціонування, вентиляції, розумного дому та енергоменеджменту — заводське проєктування, високоефективний монтаж та інтеграція в сталі будівлі.",
  },

  // Categories
  "cat.all":              { DE: "Alle Produkte", EN: "All products", RU: "Все продукты", UA: "Усі продукти" },
  "cat.waermepumpen":     { DE: "Wärmepumpen", EN: "Heat pumps", RU: "Тепловые насосы", UA: "Теплові насоси" },
  "cat.smarthome":        { DE: "Smart Home", EN: "Smart Home", RU: "Умный дом", UA: "Розумний дім" },
  "cat.smart-home":       { DE: "Smart Home", EN: "Smart Home", RU: "Умный дом", UA: "Розумний дім" },
  "cat.wasser":           { DE: "Wasser", EN: "Water", RU: "Вода", UA: "Вода" },
  "cat.gasthermen":       { DE: "Gasthermen", EN: "Gas boilers", RU: "Газовые котлы", UA: "Газові котли" },
  "cat.gas-brennwert":    { DE: "Gas-Brennwert", EN: "Gas Condensing", RU: "Газовые конденсационные", UA: "Газові конденсаційні" },
  "cat.beleuchtung":      { DE: "Beleuchtung", EN: "Lighting", RU: "Освещение", UA: "Освітлення" },
  "cat.energiemanagement":{ DE: "Energiemanagement", EN: "Energy Management", RU: "Энергоменеджмент", UA: "Енергоменеджмент" },
  "cat.heizung":          { DE: "Heizung", EN: "Heating", RU: "Отопление", UA: "Опалення" },
  "cat.filter":           { DE: "Filter", EN: "Filters", RU: "Фильтры", UA: "Фільтри" },

  // Shop
  "shop.title":           { DE: "Shop", EN: "Shop", RU: "Магазин", UA: "Магазин" },
  "shop.eyebrowProducts": { DE: "Produkte", EN: "Products", RU: "Продукты", UA: "Продукти" },
  "shop.headline1":       { DE: "Produkt", EN: "Product", RU: "Каталог", UA: "Каталог" },
  "shop.headline2":       { DE: "katalog.", EN: "catalog.", RU: "продуктов.", UA: "продуктів." },
  "shop.subtitle":        {
    DE: "Premium-Gebäudetechnik von A+++ Wärmepumpen bis Zigbee 3.0 Smart Home. Alle Produkte auf Anfrage mit kostenloser Fachberatung und individuellem Angebot.",
    EN: "Premium building technology from A+++ heat pumps to Zigbee 3.0 smart home. All products available on request with free expert consultation and individual offer.",
    RU: "Премиальные инженерные системы — от тепловых насосов A+++ до Zigbee 3.0 умного дома. Все продукты по запросу с бесплатной экспертной консультацией и индивидуальным предложением.",
    UA: "Преміальна інженерна техніка — від теплових насосів A+++ до Zigbee 3.0 розумного дому. Усі продукти на запит з безкоштовною експертною консультацією та індивідуальною пропозицією.",
  },
  "shop.nettoDisclaimer": {
    DE: "Alle Preise verstehen sich Netto · zzgl. 20 % MwSt. (B2B & Fachbetriebs-Konditionen)",
    EN: "All prices are net · plus 20% VAT (B2B & trade conditions)",
    RU: "Все цены указаны нетто · плюс 20% НДС (B2B и условия для специалистов)",
    UA: "Усі ціни вказані нетто · плюс 20% ПДВ (B2B та фахові умови)",
  },
  "shop.categoryLabel":   { DE: "Kategorie", EN: "Category", RU: "Категория", UA: "Категорія" },
  "shop.searchPlaceholder":{ DE: "Suchen...", EN: "Search...", RU: "Поиск...", UA: "Пошук..." },
  "shop.loading":         { DE: "Lade Produkte...", EN: "Loading products...", RU: "Загрузка продуктов...", UA: "Завантаження продуктів..." },
  "shop.empty":           { DE: "Keine Produkte gefunden.", EN: "No products found.", RU: "Продукты не найдены.", UA: "Продуктів не знайдено." },
  "shop.allCategories":   { DE: "Alle", EN: "All", RU: "Все", UA: "Усі" },
  "shop.filter":          { DE: "Filter", EN: "Filter", RU: "Фильтр", UA: "Фільтр" },

  // Product Detail
  "pd.back":              { DE: "Zurück zum Shop", EN: "Back to shop", RU: "Назад в магазин", UA: "Назад до магазину" },
  "pd.loading":           { DE: "Laden...", EN: "Loading...", RU: "Загрузка...", UA: "Завантаження..." },
  "pd.price":             { DE: "Preis", EN: "Price", RU: "Цена", UA: "Ціна" },
  "pd.netto":             { DE: "Netto · zzgl. 20 % MwSt.", EN: "Net · plus 20% VAT", RU: "Нетто · плюс 20% НДС", UA: "Нетто · плюс 20% ПДВ" },
  "pd.priceNote":         {
    DE: "Individuelles Angebot inkl. Förderung & Installation · B2B-Konditionen verfügbar",
    EN: "Individual offer incl. subsidy & installation · B2B conditions available",
    RU: "Индивидуальное предложение, включая субсидии и установку · доступны B2B-условия",
    UA: "Індивідуальна пропозиція з урахуванням субсидій та монтажу · доступні B2B-умови",
  },
  "pd.description":       { DE: "Beschreibung", EN: "Description", RU: "Описание", UA: "Опис" },
  "pd.specs":             { DE: "Technische Daten", EN: "Specifications", RU: "Характеристики", UA: "Характеристики" },
  "pd.addToCart":         { DE: "Zur Anfrage", EN: "Add to inquiry", RU: "В запрос", UA: "До запиту" },
  "pd.related1":          { DE: "Passende", EN: "Related", RU: "Похожие", UA: "Подібні" },
  "pd.related2":          { DE: "Produkte.", EN: "products.", RU: "продукты.", UA: "продукти." },
  "pd.seeAllIn":          { DE: "Alle", EN: "All", RU: "Все", UA: "Усі" },
  "pd.toastAdded":        { DE: "zur Anfrage hinzugefügt", EN: "added to inquiry", RU: "добавлено в запрос", UA: "додано до запиту" },

  // Product Card
  "card.inquire":         { DE: "Anfrage", EN: "Inquire", RU: "Запрос", UA: "Запит" },
  "card.netto":           { DE: "Netto · zzgl. 20 % MwSt.", EN: "Net · plus 20% VAT", RU: "Нетто · плюс 20% НДС", UA: "Нетто · плюс 20% ПДВ" },
  "card.toastAdded":      { DE: "zur Anfrage hinzugefügt", EN: "added to inquiry", RU: "добавлено в запрос", UA: "додано до запиту" },

  // Cart / Inquiry
  "cart.title":       { DE: "Anfragekorb", EN: "Inquiry cart", RU: "Корзина запросов", UA: "Кошик запитів" },
  "cart.empty":       { DE: "Ihr Anfragekorb ist leer.", EN: "Your inquiry cart is empty.", RU: "Корзина пуста.", UA: "Кошик порожній." },
  "cart.checkout":    { DE: "Anfrage abschicken", EN: "Submit inquiry", RU: "Отправить запрос", UA: "Надіслати запит" },

  // Form fields
  "form.name":        { DE: "Name", EN: "Name", RU: "Имя", UA: "Ім'я" },
  "form.email":       { DE: "E-Mail", EN: "Email", RU: "E-mail", UA: "Email" },
  "form.phone":       { DE: "Telefon", EN: "Phone", RU: "Телефон", UA: "Телефон" },
  "form.company":     { DE: "Firma", EN: "Company", RU: "Компания", UA: "Компанія" },
  "form.message":     { DE: "Nachricht", EN: "Message", RU: "Сообщение", UA: "Повідомлення" },

  // Footer
  "footer.companyDesc": {
    DE: "ECO Building Technik GmbH plant, liefert und installiert nachhaltige Gebäudetechnik — von A+++ Wärmepumpen über Gas-Brennwertgeräte bis hin zu Smart-Home- und Energiemanagement-Systemen. Fachbetrieb mit persönlicher Beratung in Ebreichsdorf, Österreich.",
    EN: "ECO Building Technik GmbH plans, supplies and installs sustainable building technology — from A+++ heat pumps through gas condensing units to smart home and energy management systems. Specialist company with personal consulting in Ebreichsdorf, Austria.",
    RU: "ECO Building Technik GmbH проектирует, поставляет и устанавливает устойчивые инженерные системы — от тепловых насосов A+++ до газовых конденсационных котлов, систем умного дома и энергоменеджмента. Специализированная компания с персональной консультацией в Эбрайхсдорфе, Австрия.",
    UA: "ECO Building Technik GmbH проєктує, постачає та встановлює сталі інженерні системи — від теплових насосів A+++ до газових конденсаційних котлів, систем розумного дому та енергоменеджменту. Спеціалізована компанія з персональною консультацією в Ебрайхсдорфі, Австрія.",
  },
  "footer.tag.energy":  { DE: "A+++ Energie", EN: "A+++ Energy", RU: "Энергия A+++", UA: "Енергія A+++" },
  "footer.tag.subsidy": { DE: "Förderung € 5.000", EN: "Subsidy € 5,000", RU: "Субсидия € 5 000", UA: "Субсидія € 5 000" },
  "footer.tag.location":{ DE: "Wien-Österreich", EN: "Vienna-Austria", RU: "Вена-Австрия", UA: "Відень-Австрія" },
  "footer.navigation":  { DE: "Navigation", EN: "Navigation", RU: "Навигация", UA: "Навігація" },
  "footer.contact":     { DE: "Kontakt", EN: "Contact", RU: "Контакты", UA: "Контакти" },
  "footer.address":     { DE: "Adresse", EN: "Address", RU: "Адрес", UA: "Адреса" },
  "footer.mobile":      { DE: "Mobil", EN: "Mobile", RU: "Мобильный", UA: "Мобільний" },
  "footer.web":         { DE: "Internet", EN: "Web", RU: "Сайт", UA: "Сайт" },
  "footer.copyright":   { DE: "Alle Rechte vorbehalten.", EN: "All rights reserved.", RU: "Все права защищены.", UA: "Усі права захищені." },
  "footer.rights":      { DE: "Alle Rechte vorbehalten.", EN: "All rights reserved.", RU: "Все права защищены.", UA: "Усі права захищені." },
  "footer.legal":       { DE: "Rechtliches", EN: "Legal", RU: "Юридическая информация", UA: "Правова інформація" },
  "footer.impressum":   { DE: "Impressum", EN: "Imprint", RU: "Выходные данные", UA: "Вихідні дані" },
  "footer.privacy":     { DE: "Datenschutz", EN: "Privacy", RU: "Конфиденциальность", UA: "Конфіденційність" },
  "footer.terms":       { DE: "AGB", EN: "Terms", RU: "Условия", UA: "Умови" },
};

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState(DEFAULT_LANG);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) setLang(saved);
  }, []);

  const change = (l) => {
    if (!SUPPORTED.includes(l)) return;
    setLang(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const t = useCallback(
    (key, fallback) => {
      const entry = DICT[key];
      if (entry) return entry[lang] || entry.DE || fallback || key;
      return fallback || key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang: change, supported: SUPPORTED, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useLang = () => {
  const c = useContext(I18nContext);
  if (!c) throw new Error("useLang must be used inside I18nProvider");
  return c;
};

/** Returns the translated value for the current language, falling back to DE. */
export const useT = () => {
  const { lang } = useLang();
  return (dict) => (dict && (dict[lang] || dict.DE)) ?? "";
};
