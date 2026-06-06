/**
 * Category-specific technical explainer configuration.
 * Replaces the previous YouTube-based category videos with custom-built
 * technical schematics + 4-step process + spec table — fully bilingual (DE/EN/RU/UA).
 *
 * Each category provides:
 *   - schematic: string identifier mapped to a custom SVG diagram in CategoryTechExplainer
 *   - accent: brand-accent color
 *   - copy: eyebrow / title / italic / subtitle / cta (4 languages)
 *   - steps: 4-step process (label + short technical description, 4 languages)
 *   - specs: 4–6 key parameters (label + value + unit)
 */

const L = (de, en, ru, ua) => ({ DE: de, EN: en, RU: ru, UA: ua });

export const CATEGORY_TECH = {
  waermepumpen: {
    accent: "#ff8a4c",
    schematic: "heat-pump-cycle",
    eyebrow: L("Wärmepumpe · Kältekreislauf", "Heat Pump · Refrigerant Cycle", "Тепловой насос · Холодильный цикл", "Тепловий насос · Холодильний цикл"),
    title: L("Wie eine", "How a", "Как работает", "Як працює"),
    italic: L("Wärmepumpe", "Heat Pump", "Тепловой насос", "Тепловий насос"),
    subtitle: L(
      "R290-Propan transportiert Umweltwärme aus der Luft ins Heizsystem. Vier Komponenten — ein geschlossener Thermodynamik-Kreislauf, der bis −25 °C effizient arbeitet.",
      "R290 propane transports ambient heat from the air into your heating system. Four components — one closed thermodynamic cycle, operating efficiently down to −25 °C.",
      "Хладагент R290 переносит тепло из воздуха в систему отопления. Четыре компонента — один замкнутый термодинамический цикл, эффективный до −25 °C.",
      "Холодоагент R290 переносить тепло з повітря в систему опалення. Чотири компоненти — один замкнений термодинамічний цикл, ефективний до −25 °C."
    ),
    cta: L("Wärmepumpen ansehen", "View heat pumps", "Смотреть тепловые насосы", "Дивитися теплові насоси"),
    steps: [
      {
        num: "01",
        label: L("Verdampfer", "Evaporator", "Испаритель", "Випарник"),
        desc: L(
          "Kältemittel R290 verdampft bei niedrigem Druck und nimmt Wärme aus der Außenluft auf (auch bei −25 °C).",
          "R290 refrigerant evaporates at low pressure and absorbs heat from outdoor air (even at −25 °C).",
          "Хладагент R290 испаряется при низком давлении, забирая тепло из наружного воздуха (даже при −25 °C).",
          "Холодоагент R290 випаровується за низького тиску, поглинаючи тепло з повітря (навіть при −25 °C)."
        ),
      },
      {
        num: "02",
        label: L("Kompressor", "Compressor", "Компрессор", "Компресор"),
        desc: L(
          "Inverter-Kompressor verdichtet das Gas — Druck und Temperatur steigen auf bis zu 75 °C.",
          "Inverter compressor compresses the gas — pressure and temperature rise to 75 °C.",
          "Инверторный компрессор сжимает газ — давление и температура поднимаются до 75 °C.",
          "Інверторний компресор стискає газ — тиск і температура зростають до 75 °C."
        ),
      },
      {
        num: "03",
        label: L("Kondensator", "Condenser", "Конденсатор", "Конденсатор"),
        desc: L(
          "Heißes Gas gibt Wärme an das Heizwasser ab und kondensiert zurück zu Flüssigkeit.",
          "Hot gas releases heat into the heating water and condenses back to liquid.",
          "Горячий газ передаёт тепло теплоносителю и конденсируется в жидкость.",
          "Гарячий газ передає тепло теплоносієві та конденсується у рідину."
        ),
      },
      {
        num: "04",
        label: L("Expansionsventil", "Expansion Valve", "Дроссель", "Дросель"),
        desc: L(
          "Druckabbau kühlt das Kältemittel — der Kreislauf beginnt von vorne. COP bis 5,2.",
          "Pressure drop cools the refrigerant — cycle restarts. COP up to 5.2.",
          "Снижение давления охлаждает хладагент — цикл начинается заново. COP до 5,2.",
          "Зниження тиску охолоджує холодоагент — цикл починається заново. COP до 5,2."
        ),
      },
    ],
    specs: [
      { label: L("Kältemittel", "Refrigerant", "Хладагент", "Холодоагент"), value: "R290", unit: L("Propan", "Propane", "Пропан", "Пропан") },
      { label: L("Energieklasse", "Energy class", "Класс энергоэффективности", "Клас енергоефективності"), value: "A+++", unit: "ErP" },
      { label: L("COP (Effizienz)", "COP (efficiency)", "COP (эффективность)", "COP (ефективність)"), value: "5,2", unit: "W/W" },
      { label: L("Min. Außentemp.", "Min. outdoor temp.", "Мин. наружная темп.", "Мін. зовнішня темп."), value: "−25", unit: "°C" },
      { label: L("Schalldruck", "Sound pressure", "Уровень шума", "Рівень шуму"), value: "35", unit: "dB(A)" },
      { label: L("Heiztemperatur", "Flow temperature", "Темп. подачи", "Темп. подачі"), value: "75", unit: "°C" },
    ],
  },

  "gas-brennwert": {
    accent: "#ffd166",
    schematic: "condensing-boiler",
    eyebrow: L("Gas-Brennwert · Vollkondensation", "Gas Condensing · Full Recovery", "Газовый конденсационный · Полная конденсация", "Газовий конденсаційний · Повна конденсація"),
    title: L("Effizienz durch", "Efficiency via", "Эффективность за счёт", "Ефективність завдяки"),
    italic: L("Kondensation.", "Condensation.", "Конденсации.", "Конденсації."),
    subtitle: L(
      "Brennwertkessel nutzen die Verbrennungswärme UND die Kondensationswärme des Wasserdampfs im Abgas. Wirkungsgrade bis 109 % (Hu) durch zweistufige Wärmerückgewinnung.",
      "Condensing boilers use both the combustion heat AND the condensation heat of water vapour in flue gas. Efficiencies up to 109 % (LHV) via two-stage heat recovery.",
      "Конденсационные котлы используют не только тепло сгорания, но и тепло конденсации водяного пара в дымовых газах. КПД до 109 % (Hu).",
      "Конденсаційні котли використовують не лише тепло згоряння, а й тепло конденсації водяної пари у димових газах. ККД до 109 % (Hu)."
    ),
    cta: L("Gas-Brennwert ansehen", "View gas boilers", "Смотреть газовые котлы", "Дивитися газові котли"),
    steps: [
      {
        num: "01",
        label: L("Brenner", "Burner", "Горелка", "Пальник"),
        desc: L("Modulierender Vormischbrenner verbrennt Erd-/Flüssiggas zu CO₂ + H₂O bei ~1100 °C.", "Modulating premix burner combusts natural/LPG gas to CO₂ + H₂O at ~1100 °C.", "Модулирующая горелка предварительного смешения сжигает газ до CO₂ + H₂O при ~1100 °C.", "Модулюючий пальник попереднього змішування спалює газ до CO₂ + H₂O при ~1100 °C."),
      },
      {
        num: "02",
        label: L("Primär-Wärmetauscher", "Primary Heat Exchanger", "Первичный теплообменник", "Первинний теплообмінник"),
        desc: L("Edelstahl-Tauscher überträgt die Verbrennungswärme (~80 %) an das Heizwasser.", "Stainless-steel exchanger transfers combustion heat (~80 %) to the heating water.", "Теплообменник из нержавеющей стали передаёт ~80 % тепла теплоносителю.", "Теплообмінник з нержавійки передає ~80 % тепла теплоносію."),
      },
      {
        num: "03",
        label: L("Kondensation", "Condensation", "Конденсация", "Конденсація"),
        desc: L("Abgas kühlt unter Taupunkt (~57 °C), Wasserdampf kondensiert und gibt 11 % Zusatzenergie frei.", "Flue gas cools below dew point (~57 °C), water vapour condenses and releases 11 % extra energy.", "Дымовые газы охлаждаются ниже точки росы (~57 °C), пар конденсируется и отдаёт 11 % доп. энергии.", "Димові гази охолоджуються нижче точки роси (~57 °C), пара конденсується і віддає 11 % доп. енергії."),
      },
      {
        num: "04",
        label: L("Wirkungsgrad 109 %", "Efficiency 109 %", "КПД 109 %", "ККД 109 %"),
        desc: L("Summe aus Verbrennung + Kondensation = bis 109 % bezogen auf Heizwert (Hu).", "Sum of combustion + condensation = up to 109 % based on lower heating value (LHV).", "Сумма горения + конденсация = до 109 % от низшей теплоты сгорания (Hu).", "Сума горіння + конденсація = до 109 % від нижчої теплоти згоряння (Hu)."),
      },
    ],
    specs: [
      { label: L("Leistung", "Output", "Мощность", "Потужність"), value: "24–35", unit: "kW" },
      { label: L("Wirkungsgrad", "Efficiency", "КПД", "ККД"), value: "109", unit: "% (Hu)" },
      { label: L("Modulation", "Modulation", "Модуляция", "Модуляція"), value: "1:10", unit: "" },
      { label: L("NOx-Klasse", "NOx class", "Класс NOx", "Клас NOx"), value: "6", unit: "EN 15502" },
      { label: L("Energieklasse", "Energy class", "Класс энергоэффективности", "Клас енергоефективності"), value: "A", unit: "ErP" },
      { label: L("Steuerung", "Control", "Управление", "Керування"), value: "WiFi", unit: "App" },
    ],
  },

  "smart-home": {
    accent: "#22d3ee",
    schematic: "smart-home-mesh",
    video: "https://customer-assets.emergentagent.com/job_royal-bautraeger/artifacts/axlia9er_ECO%20BuildingTechnikGmbH%20%281%29.mp4",
    videoPoster: "https://images.unsplash.com/photo-1770843244931-9e6d4d1055be?crop=entropy&cs=srgb&fm=jpg&w=1600&q=85",
    eyebrow: L("Smart Home · Mesh-Netzwerk", "Smart Home · Mesh Network", "Умный дом · Mesh-сеть", "Розумний дім · Mesh-мережа"),
    title: L("Drei Protokolle,", "Three Protocols,", "Три протокола,", "Три протоколи,"),
    italic: L("ein System.", "one system.", "одна система.", "одна система."),
    subtitle: L(
      "Zigbee 3.0, Wi-Fi 6 und Matter koexistieren in einem Edge-Hub. Über 200 Geräte werden lokal verarbeitet — ohne Cloud-Zwang, mit AES-128-Verschlüsselung und Sub-Sekunden-Reaktion.",
      "Zigbee 3.0, Wi-Fi 6 and Matter coexist in one edge hub. 200+ devices processed locally — no mandatory cloud, AES-128 encryption, sub-second response.",
      "Zigbee 3.0, Wi-Fi 6 и Matter сосуществуют в одном edge-хабе. 200+ устройств обрабатываются локально — без обязательного облака, шифрование AES-128, реакция меньше секунды.",
      "Zigbee 3.0, Wi-Fi 6 та Matter співіснують в одному edge-хабі. 200+ пристроїв обробляються локально — без обов'язкової хмари, шифрування AES-128, реакція менше секунди."
    ),
    cta: L("Smart Home ansehen", "View Smart Home", "Смотреть умный дом", "Дивитися розумний дім"),
    steps: [
      {
        num: "01",
        label: L("Edge-Hub", "Edge Hub", "Edge-хаб", "Edge-хаб"),
        desc: L("Zentrale Steuerung mit ARM-Cortex-A55, 2 GB RAM. Verarbeitet alle Szenen lokal ohne Cloud.", "Central control with ARM Cortex-A55, 2 GB RAM. Processes all scenes locally without cloud.", "Центральное управление на ARM Cortex-A55, 2 ГБ RAM. Все сценарии — локально.", "Центральне керування на ARM Cortex-A55, 2 ГБ RAM. Усі сценарії — локально."),
      },
      {
        num: "02",
        label: L("Zigbee 3.0 Mesh", "Zigbee 3.0 Mesh", "Zigbee 3.0 Mesh", "Zigbee 3.0 Mesh"),
        desc: L("2,4-GHz-Funkprotokoll mit Selbstheilung. Jedes Gerät verstärkt das Netz — Reichweite >100 m im Haus.", "2.4 GHz radio protocol with self-healing. Every device extends the network — range >100 m in-house.", "Радиопротокол 2,4 ГГц с самовосстановлением. Каждое устройство усиливает сеть — дальность >100 м.", "Радіопротокол 2,4 ГГц із самовідновленням. Кожен пристрій підсилює мережу — дальність >100 м."),
      },
      {
        num: "03",
        label: L("Matter / Wi-Fi 6", "Matter / Wi-Fi 6", "Matter / Wi-Fi 6", "Matter / Wi-Fi 6"),
        desc: L("Hochbandbreite-Geräte (Kameras, Hub-Speaker) via Wi-Fi 6. Matter sorgt für Cross-Vendor-Kompatibilität.", "High-bandwidth devices (cameras, smart speakers) via Wi-Fi 6. Matter ensures cross-vendor compatibility.", "Высокоскоростные устройства (камеры, динамики) через Wi-Fi 6. Matter — совместимость между вендорами.", "Високошвидкісні пристрої (камери, динаміки) через Wi-Fi 6. Matter — сумісність між вендорами."),
      },
      {
        num: "04",
        label: L("App + Sprache", "App + Voice", "Приложение + голос", "Застосунок + голос"),
        desc: L("iOS-/Android-App und Sprachsteuerung (Alexa, Google, Siri). Szenen-Automation per Drag & Drop.", "iOS/Android app and voice control (Alexa, Google, Siri). Scene automation via drag & drop.", "Приложение iOS/Android и голосовое управление (Alexa, Google, Siri). Сцены — drag & drop.", "Застосунок iOS/Android та голосове керування (Alexa, Google, Siri). Сцени — drag & drop."),
      },
    ],
    specs: [
      { label: L("Protokolle", "Protocols", "Протоколы", "Протоколи"), value: "3", unit: "Zigbee · WiFi · Matter" },
      { label: L("Geräte (max.)", "Devices (max.)", "Устройств (макс.)", "Пристроїв (макс.)"), value: "200+", unit: "" },
      { label: L("Verschlüsselung", "Encryption", "Шифрование", "Шифрування"), value: "AES-128", unit: "" },
      { label: L("Reaktionszeit", "Response time", "Время реакции", "Час реакції"), value: "<1", unit: "s" },
      { label: L("Reichweite (Mesh)", "Range (mesh)", "Дальность (mesh)", "Дальність (mesh)"), value: ">100", unit: "m" },
      { label: L("Lokales Edge", "Local edge", "Локальное edge", "Локальне edge"), value: "100", unit: "%" },
    ],
  },

  beleuchtung: {
    accent: "#c084fc",
    schematic: "lighting-spectrum",
    eyebrow: L("Beleuchtung · LED-Spektrum", "Lighting · LED Spectrum", "Освещение · LED-спектр", "Освітлення · LED-спектр"),
    title: L("Licht in jeder", "Light in every", "Свет в каждом", "Світло в кожному"),
    italic: L("Stimmung.", "Mood.", "Настроении.", "Настрої."),
    subtitle: L(
      "Tunable White (2200–6500 K) imitiert den Tageslicht-Verlauf. RGB-Kanäle mischen 16 Mio. Farben aus drei Dioden. Alles synchron zu TV, Musik und circadianem Rhythmus.",
      "Tunable White (2200–6500 K) mimics daylight progression. RGB channels mix 16 M colors from three LED dies. All synced to TV, music and circadian rhythm.",
      "Tunable White (2200–6500 K) имитирует ход дневного света. RGB-каналы создают 16 млн цветов из трёх диодов. Синхронизация с ТВ, музыкой и циркадным ритмом.",
      "Tunable White (2200–6500 K) імітує хід денного світла. RGB-канали створюють 16 млн кольорів із трьох діодів. Синхронізація з ТБ, музикою та циркадним ритмом."
    ),
    cta: L("Beleuchtung ansehen", "View Lighting", "Смотреть освещение", "Дивитися освітлення"),
    steps: [
      {
        num: "01",
        label: L("LED-Chip", "LED Chip", "LED-чип", "LED-чип"),
        desc: L("Drei separate Dioden (R/G/B) + Tunable-White-Diode auf einem Substrat — 50 000 h Lebensdauer.", "Three separate dies (R/G/B) + tunable-white die on one substrate — 50,000 h lifespan.", "Три раздельных диода (R/G/B) + Tunable-White-диод на одной подложке — 50 000 ч.", "Три окремих діоди (R/G/B) + Tunable-White-діод на одній підкладці — 50 000 год."),
      },
      {
        num: "02",
        label: L("Tunable White", "Tunable White", "Tunable White", "Tunable White"),
        desc: L("Mischverhältnis warmweiß ⇄ kaltweiß steuert Farbtemperatur 2200–6500 K (CRI >90).", "Mix ratio warm ⇄ cool white controls color temperature 2200–6500 K (CRI >90).", "Соотношение тёплый ⇄ холодный белый — 2200–6500 K (CRI >90).", "Співвідношення теплий ⇄ холодний білий — 2200–6500 K (CRI >90)."),
      },
      {
        num: "03",
        label: L("RGB-Mischung", "RGB Mixing", "RGB-смешение", "RGB-змішування"),
        desc: L("PWM-Dimmung auf jeden Kanal — 16 Mio. Farben mit 0,1 % Auflösung. Flimmerfrei (>3 kHz).", "PWM dimming per channel — 16 M colors at 0.1 % resolution. Flicker-free (>3 kHz).", "ШИМ-диммирование каждого канала — 16 млн цветов с разрешением 0,1 %. Без мерцания (>3 кГц).", "ШІМ-димування кожного каналу — 16 млн кольорів з роздільністю 0,1 %. Без мерехтіння (>3 кГц)."),
      },
      {
        num: "04",
        label: L("Sync & Szenen", "Sync & Scenes", "Синхронизация и сцены", "Синхронізація та сцени"),
        desc: L("App-Sync mit TV, Musik, Wecker. Circadiane Automatik = Tageslicht-Simulation auch ohne Fenster.", "App sync with TV, music, alarm. Circadian automation = daylight simulation even without windows.", "Sync с ТВ, музыкой, будильником. Циркадная автоматика = моделирование света без окон.", "Sync із ТБ, музикою, будильником. Циркадна автоматика = моделювання світла без вікон."),
      },
    ],
    specs: [
      { label: L("Farbtemperatur", "Color temp.", "Цветовая температура", "Колірна температура"), value: "2200–6500", unit: "K" },
      { label: L("Farben", "Colors", "Цветов", "Кольорів"), value: "16 M", unit: "RGB" },
      { label: L("Farbwiedergabe", "Color rendering", "Цветопередача", "Кольоропередача"), value: ">90", unit: "CRI" },
      { label: L("Lebensdauer", "Lifespan", "Срок службы", "Термін служби"), value: "50 000", unit: "h" },
      { label: L("PWM-Frequenz", "PWM frequency", "PWM-частота", "PWM-частота"), value: ">3", unit: "kHz" },
      { label: L("Energieklasse", "Energy class", "Класс энергоэффективности", "Клас енергоефективності"), value: "A", unit: "ErP" },
    ],
  },

  energiemanagement: {
    accent: "#facc15",
    schematic: "energy-flow",
    eyebrow: L("Energiemanagement · PV-Hybrid", "Energy Management · PV Hybrid", "Энергоменеджмент · PV-Гибрид", "Енергоменеджмент · PV-Гібрид"),
    title: L("Eigenverbrauch", "Self-Consumption", "Самопотребление", "Самоспоживання"),
    italic: L("maximieren.", "maximised.", "по максимуму.", "по максимуму."),
    subtitle: L(
      "Hybrid-Wechselrichter koordinieren PV, Batterie, Netz und Verbraucher (Wärmepumpe, Wallbox). KI-basierte Lastvorhersage hebt Eigenverbrauch auf 80 %+.",
      "Hybrid inverters coordinate PV, battery, grid and loads (heat pump, wallbox). AI-based load forecasting raises self-consumption to 80 %+.",
      "Гибридные инверторы координируют PV, батарею, сеть и потребителей (тепловой насос, Wallbox). ИИ-прогноз нагрузки повышает самопотребление до 80 %+.",
      "Гібридні інвертори координують PV, батарею, мережу та споживачів (тепловий насос, Wallbox). ШІ-прогноз навантаження підвищує самоспоживання до 80 %+."
    ),
    cta: L("Energie-System ansehen", "View energy system", "Смотреть энергосистему", "Дивитися енергосистему"),
    steps: [
      {
        num: "01",
        label: L("PV-Module", "PV Modules", "PV-модули", "PV-модулі"),
        desc: L("Monokristalline Module liefern Gleichstrom (DC) bei ~400 V — Wirkungsgrad bis 22,8 %.", "Monocrystalline modules deliver DC at ~400 V — efficiency up to 22.8 %.", "Монокристаллические модули дают постоянный ток (DC) ~400 В — КПД до 22,8 %.", "Монокристалічні модулі дають постійний струм (DC) ~400 В — ККД до 22,8 %."),
      },
      {
        num: "02",
        label: L("Hybrid-Inverter", "Hybrid Inverter", "Гибридный инвертор", "Гібридний інвертор"),
        desc: L("Wandelt DC → AC (230 V) und steuert gleichzeitig Batterie-Laden und Netz-Einspeisung.", "Converts DC → AC (230 V) and simultaneously controls battery charging and grid feed-in.", "Преобразует DC → AC (230 В), одновременно управляя зарядом батареи и подачей в сеть.", "Перетворює DC → AC (230 В), одночасно керуючи зарядом батареї та подачею в мережу."),
      },
      {
        num: "03",
        label: L("LiFePO₄-Speicher", "LiFePO₄ Storage", "LiFePO₄-накопитель", "LiFePO₄-накопичувач"),
        desc: L("Sicheres Lithium-Eisen-Phosphat, 5–20 kWh, 6000+ Zyklen, 95 % Round-Trip-Effizienz.", "Safe lithium iron phosphate, 5–20 kWh, 6,000+ cycles, 95 % round-trip efficiency.", "Безопасный литий-железо-фосфат, 5–20 кВт·ч, 6000+ циклов, КПД 95 %.", "Безпечний літій-залізо-фосфат, 5–20 кВт·год, 6000+ циклів, ККД 95 %."),
      },
      {
        num: "04",
        label: L("Lastmanagement", "Load Management", "Управление нагрузкой", "Керування навантаженням"),
        desc: L("Modbus + KNX priorisieren Wärmepumpe & Wallbox bei PV-Überschuss — Eigenverbrauch 80 %+.", "Modbus + KNX prioritise heat pump & wallbox during PV surplus — self-consumption 80 %+.", "Modbus + KNX приоритизируют тепловой насос и Wallbox при избытке PV — самопотребление 80 %+.", "Modbus + KNX пріоритизують тепловий насос та Wallbox при надлишку PV — самоспоживання 80 %+."),
      },
    ],
    specs: [
      { label: L("Speicher", "Storage", "Накопитель", "Накопичувач"), value: "5–20", unit: "kWh" },
      { label: L("Zellchemie", "Cell chemistry", "Химия ячеек", "Хімія комірок"), value: "LiFePO₄", unit: "" },
      { label: L("Zyklen", "Cycles", "Циклов", "Циклів"), value: "6 000+", unit: "100 % DoD" },
      { label: L("Round-Trip", "Round-trip", "Round-Trip", "Round-Trip"), value: "95", unit: "%" },
      { label: L("Schnittstellen", "Interfaces", "Интерфейсы", "Інтерфейси"), value: "Modbus", unit: "+ KNX" },
      { label: L("Eigenverbrauch", "Self-consumption", "Самопотребление", "Самоспоживання"), value: "80+", unit: "%" },
    ],
  },

  wasser: {
    accent: "#38bdf8",
    schematic: "water-filter",
    eyebrow: L("Wasser · 5-Stufen-Filter", "Water · 5-Stage Filter", "Вода · 5-ступенчатый фильтр", "Вода · 5-ступеневий фільтр"),
    title: L("Reines", "Pure", "Чистая", "Чиста"),
    italic: L("Trinkwasser.", "Drinking Water.", "Питьевая вода.", "Питна вода."),
    subtitle: L(
      "Fünf Filterstufen kaskadieren: PP-Sediment → Aktivkohle → Umkehrosmose → Remineralisierung → UV-Sterilisation. Reduziert Schadstoffe um bis zu 99,9 % bei 75 GPD Durchsatz.",
      "Five filter stages cascade: PP sediment → activated carbon → reverse osmosis → remineralization → UV sterilization. Reduces contaminants up to 99.9 % at 75 GPD throughput.",
      "Пять ступеней фильтрации каскадом: PP-осадок → активированный уголь → обратный осмос → реминерализация → УФ-стерилизация. Удаление загрязнений до 99,9 % при 75 GPD.",
      "П'ять ступенів фільтрації каскадом: PP-осад → активоване вугілля → зворотний осмос → ремінералізація → УФ-стерилізація. Видалення забруднень до 99,9 % при 75 GPD."
    ),
    cta: L("Wasser-Systeme ansehen", "View water systems", "Смотреть водные системы", "Дивитися водні системи"),
    steps: [
      {
        num: "01",
        label: L("PP-Sediment", "PP Sediment", "PP-осадок", "PP-осад"),
        desc: L("5-μm-Polypropylen-Filter entfernt Sand, Rost und sichtbare Schwebstoffe.", "5 µm polypropylene filter removes sand, rust and visible suspended matter.", "5-мкм PP-фильтр удаляет песок, ржавчину и видимые взвеси.", "5-мкм PP-фільтр видаляє пісок, іржу та видимі завислі речовини."),
      },
      {
        num: "02",
        label: L("Aktivkohle", "Activated Carbon", "Активированный уголь", "Активоване вугілля"),
        desc: L("CTO-Block bindet Chlor, Pestizide, Geruch und Geschmackstoffe.", "CTO block binds chlorine, pesticides, odour and taste compounds.", "CTO-блок связывает хлор, пестициды, запахи и привкусы.", "CTO-блок зв'язує хлор, пестициди, запахи та присмаки."),
      },
      {
        num: "03",
        label: L("Umkehrosmose", "Reverse Osmosis", "Обратный осмос", "Зворотний осмос"),
        desc: L("0,0001-μm-Membran entfernt Schwermetalle, Bakterien, Viren, Mikroplastik (>99 %).", "0.0001 µm membrane removes heavy metals, bacteria, viruses, microplastics (>99 %).", "Мембрана 0,0001 мкм удаляет тяж. металлы, бактерии, вирусы, микропластик (>99 %).", "Мембрана 0,0001 мкм видаляє важкі метали, бактерії, віруси, мікропластик (>99 %)."),
      },
      {
        num: "04",
        label: L("Mineralisierung + UV", "Remineralization + UV", "Минерализация + УФ", "Мінералізація + УФ"),
        desc: L("Mineralfilter setzt Ca/Mg zurück, UV-LED sterilisiert auf 99,99 % Keimreduktion.", "Mineral filter adds Ca/Mg back, UV LED sterilises to 99.99 % germ reduction.", "Минеральный фильтр добавляет Ca/Mg, УФ-LED стерилизует до 99,99 %.", "Мінеральний фільтр додає Ca/Mg, УФ-LED стерилізує до 99,99 %."),
      },
    ],
    specs: [
      { label: L("Filterstufen", "Filter stages", "Ступеней фильтрации", "Ступенів фільтрації"), value: "5", unit: "" },
      { label: L("Membran-Größe", "Membrane size", "Размер мембраны", "Розмір мембрани"), value: "0,0001", unit: "µm" },
      { label: L("Schadstoff-Reduktion", "Contaminant reduction", "Снижение загрязнений", "Зниження забруднень"), value: "99,9", unit: "%" },
      { label: L("Durchsatz", "Throughput", "Производительность", "Продуктивність"), value: "75", unit: "GPD" },
      { label: L("Tank", "Tank", "Бак", "Бак"), value: "11", unit: "L" },
      { label: L("UV-Reduktion", "UV reduction", "УФ-снижение", "УФ-зниження"), value: "99,99", unit: "%" },
    ],
  },
};

export const getCategoryTech = (key) => CATEGORY_TECH[key] || null;
