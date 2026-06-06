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
  "cat.all":          { DE: "Alle Produkte", EN: "All products", RU: "Все продукты", UA: "Усі продукти" },
  "cat.waermepumpen": { DE: "Wärmepumpen", EN: "Heat pumps", RU: "Тепловые насосы", UA: "Теплові насоси" },
  "cat.smarthome":    { DE: "Smart Home", EN: "Smart Home", RU: "Умный дом", UA: "Розумний дім" },
  "cat.smart-home":   { DE: "Smart Home", EN: "Smart Home", RU: "Умный дом", UA: "Розумний дім" },
  "cat.wasser":       { DE: "Wasser", EN: "Water", RU: "Вода", UA: "Вода" },
  "cat.gasthermen":   { DE: "Gasthermen", EN: "Gas boilers", RU: "Газовые котлы", UA: "Газові котли" },
  "cat.heizung":      { DE: "Heizung", EN: "Heating", RU: "Отопление", UA: "Опалення" },
  "cat.filter":       { DE: "Filter", EN: "Filters", RU: "Фильтры", UA: "Фільтри" },

  // Shop
  "shop.title":       { DE: "Shop", EN: "Shop", RU: "Магазин", UA: "Магазин" },
  "shop.filter":      { DE: "Filter", EN: "Filter", RU: "Фильтр", UA: "Фільтр" },
  "shop.empty":       { DE: "Keine Produkte gefunden.", EN: "No products found.", RU: "Продукты не найдены.", UA: "Продуктів не знайдено." },
  "shop.allCategories": { DE: "Alle", EN: "All", RU: "Все", UA: "Усі" },

  // Product
  "product.specs":    { DE: "Technische Daten", EN: "Specifications", RU: "Характеристики", UA: "Характеристики" },
  "product.features": { DE: "Merkmale", EN: "Features", RU: "Особенности", UA: "Особливості" },
  "product.delivery": { DE: "Lieferzeit", EN: "Delivery time", RU: "Срок поставки", UA: "Термін постачання" },
  "product.gallery":  { DE: "Galerie", EN: "Gallery", RU: "Галерея", UA: "Галерея" },

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
  "footer.rights":    { DE: "Alle Rechte vorbehalten.", EN: "All rights reserved.", RU: "Все права защищены.", UA: "Усі права захищені." },
  "footer.legal":     { DE: "Rechtliches", EN: "Legal", RU: "Юридическая информация", UA: "Правова інформація" },
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
