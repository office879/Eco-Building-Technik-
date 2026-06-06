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
  "hero.eyebrow":     { DE: "KI-Gebäudeautomation · A+++ Hochleistungsgeräte", EN: "AI Building Automation · A+++ High-Performance", RU: "ИИ-автоматизация зданий · A+++", UA: "ШІ-автоматизація будівель · A+++" },
  "hero.subtitle":    {
    DE: "ECO Building Technik plant, liefert und integriert modernste A+++ Wärmepumpen und Energiesysteme — kombiniert mit KI-gestützter Steuerung über KNX, BACnet und Modbus. Bis zu 30 % weniger Energieverbrauch, BIM-integriert, dauerhaft optimiert.",
    EN: "ECO Building Technik plans, supplies and integrates state-of-the-art A+++ heat pumps and energy systems — combined with AI-driven control via KNX, BACnet and Modbus. Up to 30 % less energy consumption, BIM-integrated, continuously optimised.",
    RU: "ECO Building Technik проектирует, поставляет и интегрирует современные тепловые насосы A+++ и энергосистемы — с управлением на базе ИИ через KNX, BACnet и Modbus. До 30 % меньше энергопотребление, BIM-интеграция, постоянная оптимизация.",
    UA: "ECO Building Technik проєктує, постачає та інтегрує сучасні теплові насоси A+++ та енергосистеми — з керуванням на основі ШІ через KNX, BACnet та Modbus. До 30 % менше енергоспоживання, BIM-інтеграція, постійна оптимізація.",
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

  // About page
  "about.eyebrow":      { DE: "Über uns", EN: "About us", RU: "О нас", UA: "Про нас" },
  "about.h1.1":         { DE: "Der Fachbetrieb für", EN: "The specialist for", RU: "Специалисты по", UA: "Спеціалісти з" },
  "about.h1.italic":    { DE: "nachhaltige", EN: "sustainable", RU: "устойчивым", UA: "сталим" },
  "about.h1.2":         { DE: "Gebäudetechnik.", EN: "building technology.", RU: "инженерным системам.", UA: "інженерним системам." },
  "about.intro":        {
    DE: "ECO Building Technik ist Ihr Partner für A+++ Wärmepumpen, Gas-Brennwertgeräte und intelligente Smart Home Systemintegration in Ebreichsdorf, Österreich. Mit persönlicher Beratung, präziser Planung und erstklassiger Installation realisieren wir Ihre Vision einer nachhaltigen Zukunft.",
    EN: "ECO Building Technik is your partner for A+++ heat pumps, gas condensing units and intelligent smart home system integration in Ebreichsdorf, Austria. With personal consultation, precise planning and first-class installation, we realize your vision of a sustainable future.",
    RU: "ECO Building Technik — ваш партнёр по тепловым насосам A+++, газовым конденсационным котлам и интеллектуальной интеграции систем умного дома в Эбрайхсдорфе, Австрия. С персональной консультацией, точным планированием и первоклассной установкой мы воплощаем ваше видение устойчивого будущего.",
    UA: "ECO Building Technik — ваш партнер з теплових насосів A+++, газових конденсаційних котлів та інтелектуальної інтеграції систем розумного дому в Ебрайхсдорфі, Австрія. З персональною консультацією, точним плануванням та першокласним монтажем ми втілюємо ваше бачення сталого майбутнього.",
  },
  "about.mission":      { DE: "Unsere Mission", EN: "Our mission", RU: "Наша миссия", UA: "Наша місія" },
  "about.h2.1":         { DE: "Technik, die sich für", EN: "Technology that pays off for", RU: "Технологии, которые выгодны", UA: "Технології, що окупаються для" },
  "about.h2.2":         { DE: "Menschen und", EN: "people and", RU: "людям и", UA: "людей та" },
  "about.h2.italic":    { DE: "Umwelt lohnt.", EN: "the environment.", RU: "окружающей среде.", UA: "довкілля." },
  "about.missionText":  {
    DE: "Wir glauben, dass nachhaltige Gebäudetechnik weder kompromissbehaftet noch kompliziert sein muss. Jedes Projekt wird individuell geplant — von der Heizlastberechnung bis zur Smart-Home-Integration.",
    EN: "We believe that sustainable building technology must be neither compromised nor complicated. Every project is planned individually — from heat load calculation to smart home integration.",
    RU: "Мы убеждены, что устойчивые инженерные системы не должны быть ни компромиссными, ни сложными. Каждый проект планируется индивидуально — от расчёта тепловых нагрузок до интеграции умного дома.",
    UA: "Ми переконані, що сталі інженерні системи не повинні бути ні компромісними, ні складними. Кожен проєкт плануємо індивідуально — від розрахунку теплових навантажень до інтеграції розумного дому.",
  },
  "about.cta":          { DE: "Jetzt beraten lassen", EN: "Get consultation now", RU: "Получить консультацию", UA: "Отримати консультацію" },
  "about.values":       { DE: "Unsere Werte", EN: "Our values", RU: "Наши ценности", UA: "Наші цінності" },
  "about.v1.title":     { DE: "Nachhaltig", EN: "Sustainable", RU: "Устойчиво", UA: "Стало" },
  "about.v1.desc":      { DE: "A+++ Produkte, erneuerbare Energie, CO₂-arme Technik.", EN: "A+++ products, renewable energy, low-CO₂ technology.", RU: "Продукты A+++, возобновляемая энергия, низкоуглеродные технологии.", UA: "Продукти A+++, відновлювана енергія, низьковуглецеві технології." },
  "about.v2.title":     { DE: "Persönlich", EN: "Personal", RU: "Персонально", UA: "Персонально" },
  "about.v2.desc":      { DE: "Direkte Beratung, feste Ansprechpartner, kein Call-Center.", EN: "Direct consultation, dedicated contacts, no call center.", RU: "Прямая консультация, личный менеджер, без колл-центра.", UA: "Пряма консультація, особистий менеджер, без колл-центру." },
  "about.v3.title":     { DE: "Qualität", EN: "Quality", RU: "Качество", UA: "Якість" },
  "about.v3.desc":      { DE: "Nur geprüfte Marken, zertifizierte Installateure.", EN: "Only tested brands, certified installers.", RU: "Только проверенные бренды, сертифицированные монтажники.", UA: "Лише перевірені бренди, сертифіковані монтажники." },
  "about.v4.title":     { DE: "Alles aus einer Hand", EN: "All from one source", RU: "Всё в одних руках", UA: "Усе з одних рук" },
  "about.v4.desc":      { DE: "Planung, Lieferung, Installation & Service.", EN: "Planning, delivery, installation & service.", RU: "Планирование, доставка, монтаж и сервис.", UA: "Планування, постачання, монтаж та сервіс." },

  // Contact page
  "contact.eyebrow":    { DE: "Kontakt", EN: "Contact", RU: "Контакты", UA: "Контакти" },
  "contact.h1.1":       { DE: "Reden wir über", EN: "Let's talk about", RU: "Поговорим о", UA: "Поговоримо про" },
  "contact.h1.2":       { DE: "Ihr", EN: "your", RU: "вашем", UA: "ваш" },
  "contact.h1.italic":  { DE: "Projekt.", EN: "project.", RU: "проекте.", UA: "проєкт." },
  "contact.intro":      {
    DE: "Kostenlose Beratung und persönliche Angebotserstellung. Wir antworten innerhalb von 24 Stunden.",
    EN: "Free consultation and personalised quote. We respond within 24 hours.",
    RU: "Бесплатная консультация и персональное предложение. Мы отвечаем в течение 24 часов.",
    UA: "Безкоштовна консультація та персональна пропозиція. Відповідаємо протягом 24 годин.",
  },
  "contact.direct":     { DE: "Direktkontakt", EN: "Direct contact", RU: "Прямой контакт", UA: "Прямий контакт" },
  "contact.addressLbl": { DE: "Adresse", EN: "Address", RU: "Адрес", UA: "Адреса" },
  "contact.mobileLbl":  { DE: "Mobil", EN: "Mobile", RU: "Мобильный", UA: "Мобільний" },
  "contact.emailLbl":   { DE: "E-Mail", EN: "Email", RU: "E-mail", UA: "Email" },
  "contact.hoursLbl":   { DE: "Öffnungszeiten", EN: "Opening hours", RU: "Часы работы", UA: "Години роботи" },
  "contact.hours1":     { DE: "Mo–Fr 08:00 — 18:00", EN: "Mon–Fri 08:00 — 18:00", RU: "Пн–Пт 08:00 — 18:00", UA: "Пн–Пт 08:00 — 18:00" },
  "contact.hours2":     { DE: "Sa nach Vereinbarung", EN: "Sat by appointment", RU: "Сб по договорённости", UA: "Сб за домовленістю" },
  "contact.successH1":  { DE: "Danke für Ihre", EN: "Thank you for your", RU: "Спасибо за ваше", UA: "Дякуємо за ваше" },
  "contact.successIt":  { DE: "Nachricht.", EN: "message.", RU: "сообщение.", UA: "повідомлення." },
  "contact.successText":{ DE: "Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen.", EN: "We will get back to you personally within 24 hours.", RU: "Мы свяжемся с вами лично в течение 24 часов.", UA: "Ми зв'яжемося з вами особисто протягом 24 годин." },
  "contact.newMsg":     { DE: "Neue Nachricht", EN: "New message", RU: "Новое сообщение", UA: "Нове повідомлення" },
  "contact.formTitle":  { DE: "Nachricht senden", EN: "Send message", RU: "Отправить сообщение", UA: "Надіслати повідомлення" },
  "contact.namePh":     { DE: "Ihr Name *", EN: "Your name *", RU: "Ваше имя *", UA: "Ваше ім'я *" },
  "contact.emailPh":    { DE: "E-Mail *", EN: "Email *", RU: "E-mail *", UA: "Email *" },
  "contact.phonePh":    { DE: "Telefon", EN: "Phone", RU: "Телефон", UA: "Телефон" },
  "contact.messagePh":  { DE: "Ihre Nachricht *", EN: "Your message *", RU: "Ваше сообщение *", UA: "Ваше повідомлення *" },
  "contact.sending":    { DE: "Senden...", EN: "Sending...", RU: "Отправка...", UA: "Надсилання..." },
  "contact.submit":     { DE: "Nachricht senden", EN: "Send message", RU: "Отправить сообщение", UA: "Надіслати повідомлення" },
  "contact.toastOk":    { DE: "Nachricht gesendet", EN: "Message sent", RU: "Сообщение отправлено", UA: "Повідомлення надіслано" },
  "contact.toastErr":   { DE: "Fehler beim Senden", EN: "Error sending", RU: "Ошибка отправки", UA: "Помилка надсилання" },

  // Energy page
  "energy.eyebrow":     { DE: "Energie-Rechner", EN: "Energy Calculator", RU: "Калькулятор энергии", UA: "Калькулятор енергії" },
  "energy.h1.1":        { DE: "Wie viel", EN: "How much do you", RU: "Сколько вы", UA: "Скільки ви" },
  "energy.h1.italic":   { DE: "sparen", EN: "save", RU: "сэкономите", UA: "заощадите" },
  "energy.h1.2":        { DE: "Sie?", EN: "?", RU: "?", UA: "?" },
  "energy.intro":       {
    DE: "Berechnen Sie Heizlast und jährliche Energiekosten für Ihr Gebäude — und vergleichen Sie, was eine moderne Wärmepumpe bringt.",
    EN: "Calculate heat load and annual energy costs for your building — and compare what a modern heat pump can save.",
    RU: "Рассчитайте тепловую нагрузку и годовые затраты на энергию для вашего здания — и сравните, что даст современный тепловой насос.",
    UA: "Розрахуйте теплове навантаження та річні витрати на енергію для вашої будівлі — та порівняйте, що дасть сучасний тепловий насос.",
  },
  "energy.nextStep":    { DE: "Nächster Schritt", EN: "Next step", RU: "Следующий шаг", UA: "Наступний крок" },
  "energy.h2.1":        { DE: "Lassen Sie uns ein", EN: "Let us create an", RU: "Давайте составим", UA: "Складемо" },
  "energy.h2.italic":   { DE: "individuelles Angebot", EN: "individual offer", RU: "индивидуальное предложение", UA: "індивідуальну пропозицію" },
  "energy.h2.2":        { DE: "erstellen.", EN: "for you.", RU: "для вас.", UA: "для вас." },
  "energy.ctaConsult":  { DE: "Beratung anfragen", EN: "Request consultation", RU: "Запросить консультацию", UA: "Замовити консультацію" },
  "energy.ctaShop":     { DE: "Wärmepumpen entdecken", EN: "Discover heat pumps", RU: "Смотреть тепловые насосы", UA: "Дивитися теплові насоси" },

  // Energy calculator
  "calc.h2.1":          { DE: "Berechnen Sie Ihre", EN: "Calculate your", RU: "Рассчитайте вашу", UA: "Розрахуйте вашу" },
  "calc.h2.italic":     { DE: "Heizkosten-Ersparnis.", EN: "heating cost savings.", RU: "экономию на отоплении.", UA: "економію на опаленні." },
  "calc.buildingType":  { DE: "Gebäudetyp", EN: "Building type", RU: "Тип здания", UA: "Тип будівлі" },
  "calc.area":          { DE: "Wohnfläche", EN: "Living area", RU: "Жилая площадь", UA: "Житлова площа" },
  "calc.source":        { DE: "Aktuelle Energiequelle", EN: "Current energy source", RU: "Текущий источник энергии", UA: "Поточне джерело енергії" },
  "calc.result":        { DE: "Ergebnis", EN: "Result", RU: "Результат", UA: "Результат" },
  "calc.heatLoad":      { DE: "Heizlast", EN: "Heat load", RU: "Тепловая нагрузка", UA: "Теплове навантаження" },
  "calc.recommended":   { DE: "Empfohlen", EN: "Recommended", RU: "Рекомендовано", UA: "Рекомендовано" },
  "calc.annualKwh":     { DE: "Jahresverbrauch", EN: "Annual consumption", RU: "Годовое потребление", UA: "Річне споживання" },
  "calc.currentCost":   { DE: "Kosten aktuell", EN: "Current cost", RU: "Текущая стоимость", UA: "Поточна вартість" },
  "calc.withWp":        { DE: "Mit Wärmepumpe", EN: "With heat pump", RU: "С тепловым насосом", UA: "З тепловим насосом" },
  "calc.year":          { DE: "/Jahr", EN: "/year", RU: "/год", UA: "/рік" },
  "calc.savingYear":    { DE: "Ersparnis/Jahr", EN: "Savings/year", RU: "Экономия/год", UA: "Економія/рік" },
  "calc.type.altbau":   { DE: "Altbau", EN: "Old building", RU: "Старая постройка", UA: "Стара забудова" },
  "calc.type.altbauSub":{ DE: "bis 1995", EN: "before 1995", RU: "до 1995", UA: "до 1995" },
  "calc.type.neubau":   { DE: "Neubau", EN: "New build", RU: "Новостройка", UA: "Новобудова" },
  "calc.type.neubauSub":{ DE: "ab 1995", EN: "after 1995", RU: "с 1995", UA: "з 1995" },
  "calc.type.kfw":      { DE: "KfW", EN: "Low-energy", RU: "Энергоэффективный", UA: "Енергоефективний" },
  "calc.type.kfwSub":   { DE: "Effizienzhaus", EN: "Efficiency house", RU: "Эффективный дом", UA: "Ефективний дім" },
  "calc.type.passiv":   { DE: "Passivhaus", EN: "Passive house", RU: "Пассивный дом", UA: "Пасивний дім" },
  "calc.type.passivSub":{ DE: " ", EN: " ", RU: " ", UA: " " },
  "calc.src.strom":     { DE: "Strom", EN: "Electric", RU: "Электричество", UA: "Електрика" },
  "calc.src.gas":       { DE: "Gas", EN: "Gas", RU: "Газ", UA: "Газ" },
  "calc.src.oel":       { DE: "Öl", EN: "Oil", RU: "Мазут", UA: "Мазут" },
  "calc.src.waermepumpe":{ DE: "Wärmepumpe", EN: "Heat pump", RU: "Тепловой насос", UA: "Тепловий насос" },

  // Cookie banner
  "cookie.title":       { DE: "Cookies", EN: "Cookies", RU: "Cookie", UA: "Cookie" },
  "cookie.heading":     { DE: "Diese Website verwendet Cookies.", EN: "This website uses cookies.", RU: "Этот сайт использует cookie.", UA: "Цей сайт використовує cookie." },
  "cookie.text":        {
    DE: "Wir nutzen ausschließlich technisch notwendige Cookies (Session, Sprach-Präferenz). Keine Tracker, kein Drittanbieter-Marketing.",
    EN: "We only use technically necessary cookies (session, language preference). No trackers, no third-party marketing.",
    RU: "Мы используем только технически необходимые cookie (сессия, языковые предпочтения). Без трекеров и стороннего маркетинга.",
    UA: "Ми використовуємо лише технічно необхідні cookie (сесія, мовні налаштування). Без трекерів та стороннього маркетингу.",
  },
  "cookie.accept":      { DE: "Verstanden", EN: "Got it", RU: "Принять", UA: "Прийняти" },
  "cookie.readMore":    { DE: "Datenschutz lesen", EN: "Read privacy policy", RU: "Политика конфиденциальности", UA: "Політика конфіденційності" },
  "cookie.close":       { DE: "Schließen", EN: "Close", RU: "Закрыть", UA: "Закрити" },
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
