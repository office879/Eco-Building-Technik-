/**
 * Category-specific video spotlight configurations.
 * Each video carefully chosen for product relevance.
 * Customize DE/EN copy here without touching the component.
 */

export const CATEGORY_VIDEOS = {
  "waermepumpen": {
    youtube_id: "wC1jZ6PJ990",
    eyebrow_de: "Wärmepumpen · Hi-Efficiency",
    eyebrow_en: "Heat Pumps · Hi-Efficiency",
    title_de: "Heizen mit", italic_de: "Luft.",
    title_en: "Heating with", italic_en: "Air.",
    subtitle_de:
      "R290 Propan · A+++ Energieklasse · COP bis 5,2. ECO-zertifizierte Wärmepumpen heizen, kühlen und liefern Warmwasser — auch bei −25 °C Außentemperatur.",
    subtitle_en:
      "R290 propane · A+++ class · COP up to 5.2. ECO-certified heat pumps heat, cool and provide hot water — even at −25 °C outdoor temperature.",
    cta_de: "Wärmepumpen-Shop",
    cta_en: "Heat Pump Shop",
    accent: "#ff8a4c",
    pills: [
      { de: "R290 Propan · A+++", en: "R290 Propane · A+++" },
      { de: "COP bis 5,2", en: "COP up to 5.2" },
      { de: "Heizen + Kühlen + WW", en: "Heat + Cool + DHW" },
      { de: "Bis −25 °C einsetzbar", en: "Down to −25 °C" },
    ],
  },

  "gas-brennwert": {
    youtube_id: "hT9AyrKaq0E",
    eyebrow_de: "Gas-Brennwert · Vollkondensierend",
    eyebrow_en: "Gas Boilers · Full Condensing",
    title_de: "Effizienz auf", italic_de: "1 m².",
    title_en: "Efficiency on", italic_en: "1 m².",
    subtitle_de:
      "Wandhängende Gas-Brennwertkessel von 24 bis 35 kW. Bis zu 109 % Wirkungsgrad, WLAN-App-Steuerung und vollintegrierte Sicherheit für Häuser bis 420 m².",
    subtitle_en:
      "Wall-mounted gas condensing boilers from 24 to 35 kW. Up to 109 % efficiency, Wi-Fi app control and fully integrated safety for homes up to 420 m².",
    cta_de: "Gas-Brennwert-Shop",
    cta_en: "Gas Boiler Shop",
    accent: "#ffd166",
    pills: [
      { de: "Bis 109 % Wirkungsgrad", en: "Up to 109 % efficiency" },
      { de: "WLAN-App-Steuerung", en: "Wi-Fi app control" },
      { de: "Modular 24–35 kW", en: "Modular 24–35 kW" },
      { de: "Kompakte Wandmontage", en: "Compact wall-mount" },
    ],
  },

  "smart-home": {
    youtube_id: "mYiSfFVnz3U",
    eyebrow_de: "Smart Home · Hi-Tech Living",
    eyebrow_en: "Smart Home · Hi-Tech Living",
    title_de: "Vernetztes", italic_de: "Wohnen.",
    title_en: "Connected", italic_en: "Living.",
    subtitle_de:
      "WiFi · Zigbee 3.0 · Matter. Über 200 Smart-Devices steuern Sie zentral mit App, Stimme oder Automation. Komplettes Setup in Aktion.",
    subtitle_en:
      "WiFi · Zigbee 3.0 · Matter. Control 200+ smart devices centrally via app, voice or automation. Full setup in action.",
    cta_de: "Smart Home Shop",
    cta_en: "Smart Home Shop",
    accent: "#22d3ee",
    pills: [
      { de: "WiFi · Zigbee · Matter", en: "WiFi · Zigbee · Matter" },
      { de: "App & Sprachsteuerung", en: "App & voice control" },
      { de: "Szenen-Automation", en: "Scene automation" },
      { de: "Lokales Edge-Processing", en: "Local edge processing" },
    ],
  },

  "beleuchtung": {
    youtube_id: "5MNgigfFpB0",
    eyebrow_de: "Beleuchtung · RGB · Tunable White",
    eyebrow_en: "Lighting · RGB · Tunable White",
    title_de: "Licht in", italic_de: "Stimmung.",
    title_en: "Light in", italic_en: "Mood.",
    subtitle_de:
      "Smart LED-Spots, RGB-Streifen und Deckenleuchten mit 16 Mio. Farben, App-Sync, Sprachsteuerung und Musik-Modus. Tageslicht und Szenen perfekt orchestriert.",
    subtitle_en:
      "Smart LED spots, RGB strips and ceiling lights with 16 M colors, app sync, voice control and music mode. Daylight and scenes perfectly orchestrated.",
    cta_de: "Beleuchtungs-Shop",
    cta_en: "Lighting Shop",
    accent: "#c084fc",
    pills: [
      { de: "16 Mio. Farben", en: "16 M colors" },
      { de: "TV & Musik-Sync", en: "TV & music sync" },
      { de: "Tunable White 2200–6500 K", en: "Tunable white 2200–6500 K" },
      { de: "Energiespar-Klasse A", en: "Energy class A" },
    ],
  },

  "energiemanagement": {
    youtube_id: "vhno896wwJo",
    eyebrow_de: "Energiemanagement · PV-Ready",
    eyebrow_en: "Energy Management · PV-Ready",
    title_de: "Strom aus", italic_de: "Sonne.",
    title_en: "Power from", italic_en: "Sun.",
    subtitle_de:
      "PV-Speicher, Hybrid-Wechselrichter und intelligente Lastmanagement-Systeme. Eigenverbrauch maximieren, Netzeinspeisung optimieren — kompatibel mit Wärmepumpen und Wallbox.",
    subtitle_en:
      "PV storage, hybrid inverters and intelligent load management systems. Maximize self-consumption, optimize feed-in — compatible with heat pumps and wallbox.",
    cta_de: "Energie-Shop",
    cta_en: "Energy Shop",
    accent: "#facc15",
    pills: [
      { de: "PV-Speicher 5–20 kWh", en: "PV storage 5–20 kWh" },
      { de: "Hybrid-Wechselrichter", en: "Hybrid inverter" },
      { de: "Wallbox-Integration", en: "Wallbox integration" },
      { de: "Modbus + KNX", en: "Modbus + KNX" },
    ],
  },

  "wasser": {
    youtube_id: "-W65jKwcE2w",
    eyebrow_de: "Wasser · 5-Stufen-Reinigung",
    eyebrow_en: "Water · 5-Stage Purification",
    title_de: "Reines", italic_de: "Trinkwasser.",
    title_en: "Pure", italic_en: "Drinking Water.",
    subtitle_de:
      "Umkehrosmose, Edelstahl-Filtersysteme und Smart-Wassersensoren. Bis 99,9 % Schadstoffreduktion, App-Überwachung und automatische Leckage-Erkennung im ganzen Haus.",
    subtitle_en:
      "Reverse osmosis, stainless steel filter systems and smart water sensors. Up to 99.9 % contaminant reduction, app monitoring and automatic leak detection throughout the house.",
    cta_de: "Wasser-Shop",
    cta_en: "Water Shop",
    accent: "#38bdf8",
    pills: [
      { de: "99,9 % Reinheit", en: "99.9 % purity" },
      { de: "Edelstahl 304/316", en: "Stainless 304/316" },
      { de: "App-Monitoring", en: "App monitoring" },
      { de: "Auto Leck-Stop", en: "Auto leak stop" },
    ],
  },
};

export const getCategoryVideo = (key) => CATEGORY_VIDEOS[key] || null;
