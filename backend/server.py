from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="ECO Building Technik API")
api_router = APIRouter(prefix="/api")


# ============ Models ============
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    name: str
    category: str
    short_description: str
    description: str
    image: str
    gallery: List[str] = []
    specs: dict = {}
    features: List[str] = []
    featured: bool = False
    badge: Optional[str] = None
    price_from: Optional[float] = None
    price_note: str = "Preis auf Anfrage"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class InquiryItem(BaseModel):
    product_id: str
    name: str
    quantity: int = 1


class InquiryCreate(BaseModel):
    customer_name: str
    email: EmailStr
    phone: Optional[str] = ""
    company: Optional[str] = ""
    message: Optional[str] = ""
    items: List[InquiryItem] = []


class Inquiry(InquiryCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    message: str


class Contact(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ============ Product Data ============
CATEGORIES = [
    {"key": "waermepumpen", "name": "Wärmepumpen", "icon": "flame"},
    {"key": "gas-brennwert", "name": "Gas-Brennwert", "icon": "zap"},
    {"key": "smart-home", "name": "Smart Home", "icon": "home"},
    {"key": "beleuchtung", "name": "Beleuchtung", "icon": "lightbulb"},
    {"key": "energiemanagement", "name": "Energiemanagement", "icon": "battery"},
    {"key": "wasser", "name": "Wasser", "icon": "droplet"},
]

IMG_HEATPUMP = "https://images.unsplash.com/photo-1776860150272-653efc74193c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwxfHxoZWF0JTIwcHVtcCUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3NzgxMjc4MzB8MA&ixlib=rb-4.1.0&q=85"
IMG_SMART = "https://images.unsplash.com/photo-1702495591786-37df7dee310d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwzfHxzbWFydCUyMGhvbWUlMjB0YWJsZXR8ZW58MHx8fHwxNzc4MTI3ODEwfDA&ixlib=rb-4.1.0&q=85"
IMG_SOLAR = "https://images.unsplash.com/photo-1761571740780-d9149a88b759?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsJTIwaG91c2UlMjBtb2Rlcm58ZW58MHx8fHwxNzc4MTI3ODMwfDA&ixlib=rb-4.1.0&q=85"
IMG_THERMO = "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHRoZXJtb3N0YXR8ZW58MHx8fHwxNzc4MTI3ODMwfDA&ixlib=rb-4.1.0&q=85"
IMG_BOILER = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80"
IMG_SWITCH = "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80"
IMG_LED = "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=80"
IMG_WATER = "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1200&q=80"
IMG_BATTERY = "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1200&q=80"
IMG_METER = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80"


SEED_PRODUCTS = [
    # Wärmepumpen
    {"slug": "jnod-a3-12kw", "name": "JNOD A+++ Wärmepumpe 12kW", "category": "waermepumpen",
     "short_description": "Bestseller für Einfamilienhäuser bis 150m². R32 Kältemittel.",
     "description": "Die JNOD 12kW Wärmepumpe vereint höchste Energieeffizienz mit moderner Inverter-Technologie. Perfekt für Einfamilienhäuser bis 150m² Wohnfläche. Das umweltfreundliche R32 Kältemittel und der Smart-Home-fähige Regler machen sie zur ersten Wahl für nachhaltige Heizlösungen.",
     "image": IMG_HEATPUMP, "featured": True, "badge": "BESTSELLER",
     "specs": {"Leistung": "12 kW", "COP (A7/W35)": "4.8", "Energieklasse": "A+++", "Kältemittel": "R32", "Schallpegel": "52 dB(A)", "Geeignet bis": "150 m²"},
     "features": ["Inverter-Technologie", "WiFi & App-Steuerung", "Smart Home kompatibel", "Leiser Betrieb", "5 Jahre Garantie"]},
    {"slug": "jnod-a3-16kw", "name": "JNOD A+++ Wärmepumpe 16kW", "category": "waermepumpen",
     "short_description": "Top-Empfehlung für Häuser bis 200m². Maximale Effizienz A+++.",
     "description": "Unsere Premium-Wärmepumpe für größere Wohnflächen bis 200m². Höchste Effizienzklasse mit zuverlässiger Leistung auch bei -25°C Außentemperatur.",
     "image": IMG_HEATPUMP, "featured": True, "badge": "TOP",
     "specs": {"Leistung": "16 kW", "COP (A7/W35)": "4.9", "Energieklasse": "A+++", "Kältemittel": "R32", "Schallpegel": "54 dB(A)", "Geeignet bis": "200 m²"},
     "features": ["Arbeitet bis -25°C", "WiFi & App", "Modbus Schnittstelle", "PV-Ready", "7 Jahre Garantie Verdichter"]},
    {"slug": "jnod-heating-warmwasser-11", "name": "JNOD Kombi-Wärmepumpe 11 kWh", "category": "waermepumpen",
     "short_description": "Kombinierte Wärmepumpe für Heizung und Warmwasser.",
     "description": "All-in-One Lösung: Heizung + Warmwasser in einem Gerät. A+++ mit Zertifikat und integriertem Pufferspeicher.",
     "image": IMG_HEATPUMP, "featured": True, "badge": "KOMBI",
     "specs": {"Leistung": "11 kW", "Warmwasser": "190 L Puffer", "Energieklasse": "A+++", "Kältemittel": "R32"},
     "features": ["Integrierter Speicher", "Heizung + Warmwasser", "Platzsparend", "PV-fähig"]},
    {"slug": "jnod-monoblock-8kw", "name": "JNOD Monoblock 8kW", "category": "waermepumpen",
     "short_description": "Kompakte Monoblock-Lösung für kleine Häuser & Passivhaus.",
     "description": "Ultra-kompakte Monoblock-Wärmepumpe ideal für Neubau und Passivhäuser bis 100m².",
     "image": IMG_HEATPUMP, "featured": False,
     "specs": {"Leistung": "8 kW", "COP": "5.1", "Energieklasse": "A+++", "Bauart": "Monoblock"},
     "features": ["Monoblock Design", "Schnelle Installation", "Hydraulik-Paket inklusive"]},

    # Gas-Brennwert
    {"slug": "squirrel-m30-25kw", "name": "Squirrel M30 Gas-Boiler 25kW", "category": "gas-brennwert",
     "short_description": "Vollkondensierender Gas-Boiler mit WiFi & App. Bis 200m².",
     "description": "Der Squirrel M30 setzt neue Maßstäbe bei Gas-Brennwertgeräten. Vollkondensierende Technologie, intuitive App-Steuerung und kompaktes Design.",
     "image": IMG_BOILER, "featured": True, "badge": "TOP",
     "specs": {"Leistung": "25 kW", "Wirkungsgrad": "109%", "Energieklasse": "A", "WiFi": "Integriert"},
     "features": ["WiFi & App-Steuerung", "Vollkondensierend", "Modulierend", "Kompakte Bauweise"]},
    {"slug": "squirrel-m30-30kw", "name": "Squirrel M30 Gas-Boiler 30kW", "category": "gas-brennwert",
     "short_description": "Gas-Boiler mit WiFi & App. Für Häuser bis 280m².",
     "description": "30kW Leistung für mittelgroße Häuser mit höchstem Komfort und smarter Steuerung.",
     "image": IMG_BOILER, "featured": True,
     "specs": {"Leistung": "30 kW", "Wirkungsgrad": "109%", "Energieklasse": "A"},
     "features": ["WiFi & App", "Vollkondensierend", "Modulierend", "Niedrige Emissionen"]},
    {"slug": "squirrel-m30-35kw", "name": "Squirrel M30 Gas-Boiler 35kW", "category": "gas-brennwert",
     "short_description": "Vollkondensierend für Häuser bis 420m².",
     "description": "Starke 35kW-Leistung für Mehrfamilienhäuser und große Einfamilienhäuser.",
     "image": IMG_BOILER, "featured": False,
     "specs": {"Leistung": "35 kW", "Wirkungsgrad": "109%", "Energieklasse": "A"},
     "features": ["WiFi & App", "Hohe Leistung", "Effizient modulierend"]},

    # Smart Home - TONGOU
    {"slug": "tongou-switch-1", "name": "TONGOU Smart Switch 1-Gang", "category": "smart-home",
     "short_description": "Der meistverkaufte Smart Switch. Tuya/Smart Life App.",
     "description": "Der beliebteste Smart Switch im TONGOU-Sortiment. Einfache Installation, WiFi, App- und Sprachsteuerung mit Alexa/Google.",
     "image": IMG_SWITCH, "featured": True, "badge": "BESTSELLER",
     "specs": {"Kanäle": "1", "Protokoll": "WiFi 2.4GHz", "Max. Last": "10A", "App": "Tuya/Smart Life"},
     "features": ["Alexa & Google Home", "Timer & Szenen", "Unterputzmontage", "Glas-Front"]},
    {"slug": "tongou-switch-2", "name": "TONGOU Smart Switch 2-Gang", "category": "smart-home",
     "short_description": "Zweifach Smart Switch für Lichtsteuerung per App.",
     "description": "Steuern Sie zwei Schaltkreise unabhängig per App oder Sprache.",
     "image": IMG_SWITCH, "featured": False,
     "specs": {"Kanäle": "2", "Protokoll": "WiFi 2.4GHz", "Max. Last": "10A/Kanal"},
     "features": ["2 unabhängige Kanäle", "App-Steuerung", "Sprachsteuerung"]},
    {"slug": "tongou-switch-3", "name": "TONGOU Smart Switch 3-Gang", "category": "smart-home",
     "short_description": "Dreifach Smart Switch für komplexe Lichtsteuerung.",
     "description": "Für bis zu drei unabhängige Lichtkreise ideal.",
     "image": IMG_SWITCH, "featured": False,
     "specs": {"Kanäle": "3", "Protokoll": "WiFi 2.4GHz"},
     "features": ["3 Kanäle", "Tuya/Smart Life", "Glas-Touch-Oberfläche"]},
    {"slug": "tongou-switch-4", "name": "TONGOU Smart Switch 4-Gang", "category": "smart-home",
     "short_description": "Vierfach Smart Switch für maximale Kontrolle.",
     "description": "Maximum an Flexibilität mit vier unabhängigen Kanälen.",
     "image": IMG_SWITCH, "featured": False,
     "specs": {"Kanäle": "4", "Protokoll": "WiFi 2.4GHz"},
     "features": ["4 unabhängige Kanäle", "Szenen & Timer"]},
    {"slug": "tongou-dimmer", "name": "TONGOU Smart Dimmer Switch", "category": "smart-home",
     "short_description": "Dimmbarer Smart Switch für stufenlose Lichtregelung.",
     "description": "Stufenloses Dimmen per App, Sprache oder Touch.",
     "image": IMG_SWITCH, "featured": True, "badge": "TOP",
     "specs": {"Typ": "Dimmer", "Max. Last": "400W", "Protokoll": "WiFi"},
     "features": ["Stufenloses Dimmen", "Szenen", "App & Sprache"]},
    {"slug": "tongou-curtain", "name": "TONGOU Smart Curtain Switch", "category": "smart-home",
     "short_description": "Für Rolladen- und Jalousiesteuerung.",
     "description": "Motorsteuerung für Rolläden und Jalousien mit Zeitplänen.",
     "image": IMG_SWITCH, "featured": False,
     "specs": {"Typ": "Curtain", "Protokoll": "WiFi"},
     "features": ["Zeitplan", "App-Steuerung", "Sonnenauf-/untergang-Automatik"]},
    {"slug": "tongou-socket", "name": "TONGOU Smart Socket Steckdose", "category": "smart-home",
     "short_description": "Smarte Steckdose mit Strommessung und Timer.",
     "description": "Überwachen und steuern Sie den Stromverbrauch per App.",
     "image": IMG_SWITCH, "featured": False,
     "specs": {"Max. Last": "16A", "Strommessung": "Ja", "Protokoll": "WiFi"},
     "features": ["Energiemessung", "Timer & Szenen", "Schuko-kompatibel"]},
    {"slug": "tongou-thermostat", "name": "TONGOU Smart Thermostat", "category": "smart-home",
     "short_description": "Smartes Thermostat für Heizungssteuerung.",
     "description": "Modernes Thermostat für Fußbodenheizung und Heizkörper.",
     "image": IMG_THERMO, "featured": True, "badge": "TOP",
     "specs": {"Protokoll": "WiFi", "Display": "Touch LCD"},
     "features": ["Wochenprogramm", "Geofencing", "App & Sprache"]},
    {"slug": "tongou-ir", "name": "TONGOU Smart IR Fernbedienung", "category": "smart-home",
     "short_description": "Universelle IR-Fernbedienung für alle Geräte.",
     "description": "Ein Gerät ersetzt alle IR-Fernbedienungen im Haushalt.",
     "image": IMG_SWITCH, "featured": False,
     "specs": {"Reichweite": "8 m", "Protokoll": "WiFi + IR"},
     "features": ["360° IR", "Lernfähig", "App-Integration"]},

    # Smart Home - GIRIER Zigbee
    {"slug": "girier-zigbee-1", "name": "GIRIER Zigbee Switch Modul 1-Gang", "category": "smart-home",
     "short_description": "Zigbee 3.0 Smart Switch Modul für Unterputz-Montage.",
     "description": "Professionelles Zigbee 3.0 Modul für hinter den Schalter. 10A, stabile Mesh-Verbindung.",
     "image": IMG_SWITCH, "featured": True, "badge": "ZIGBEE",
     "specs": {"Protokoll": "Zigbee 3.0", "Kanäle": "1", "Max. Last": "10A"},
     "features": ["Zigbee Mesh", "Unterputz", "Energie-Monitoring"]},
    {"slug": "girier-zigbee-2", "name": "GIRIER Zigbee Switch Modul 2-Gang", "category": "smart-home",
     "short_description": "Zigbee Modul 2-Gang für Unterputz.",
     "description": "Zwei unabhängige Kanäle mit Zigbee 3.0 Mesh.",
     "image": IMG_SWITCH, "featured": False,
     "specs": {"Protokoll": "Zigbee 3.0", "Kanäle": "2"},
     "features": ["Zigbee 3.0", "10A/Kanal", "Unterputz"]},
    {"slug": "girier-zigbee-dimmer", "name": "GIRIER Zigbee Dimmer Modul", "category": "smart-home",
     "short_description": "Zigbee 3.0 Dimmer für stufenlose Lichtregelung.",
     "description": "Unterputz-Dimmer mit Zigbee-Mesh für stabile Steuerung.",
     "image": IMG_SWITCH, "featured": True,
     "specs": {"Protokoll": "Zigbee 3.0", "Max. Last": "10A"},
     "features": ["Zigbee Mesh", "Stufenlos", "Unterputz"]},
    {"slug": "girier-gateway", "name": "GIRIER Zigbee Gateway Hub", "category": "smart-home",
     "short_description": "Zigbee 3.0 Hub mit externer Antenne.",
     "description": "Zentrale Steuerung für bis zu 128 Zigbee-Geräte. Externe Antenne für maximale Reichweite.",
     "image": IMG_SMART, "featured": True, "badge": "HUB",
     "specs": {"Protokoll": "Zigbee 3.0", "Geräte": "bis 128", "Antenne": "Extern"},
     "features": ["128 Geräte", "Externe Antenne", "Lokale Steuerung"]},
    {"slug": "girier-thermostat", "name": "GIRIER Zigbee Thermostat", "category": "smart-home",
     "short_description": "Zigbee Thermostat für Fußbodenheizung.",
     "description": "Für elektrische und wasserbasierte Fußbodenheizungen geeignet.",
     "image": IMG_THERMO, "featured": False,
     "specs": {"Protokoll": "Zigbee 3.0", "Display": "Touch"},
     "features": ["Zigbee Mesh", "Wochenprogramm"]},
    {"slug": "girier-dry-contact", "name": "GIRIER Zigbee Dry Contact Modul", "category": "smart-home",
     "short_description": "Für Garagentore und Tore. 5A.",
     "description": "Potentialfreies Kontaktmodul für Tor- und Garagensteuerung.",
     "image": IMG_SWITCH, "featured": False,
     "specs": {"Protokoll": "Zigbee 3.0", "Max. Last": "5A"},
     "features": ["Potentialfrei", "Tor-Steuerung", "Zigbee Mesh"]},

    # Beleuchtung
    {"slug": "smart-led-e27", "name": "Smart LED-Lampe E27 RGBW", "category": "beleuchtung",
     "short_description": "Farbwechsel-LED mit App-Steuerung.",
     "description": "16 Millionen Farben, dimmbar, energiesparend. Top-Produkt in unserer Beleuchtungs-Kategorie.",
     "image": IMG_LED, "featured": True, "badge": "TOP",
     "specs": {"Fassung": "E27", "Leistung": "9W", "Farben": "RGBW", "Protokoll": "WiFi"},
     "features": ["16 Mio. Farben", "App & Sprache", "Dimmbar", "Energieklasse A+"]},
    {"slug": "smart-led-gu10", "name": "Smart LED-Lampe GU10 RGBW", "category": "beleuchtung",
     "short_description": "Smart LED-Spot mit Farbwechsel.",
     "description": "Kompakter GU10-Spot mit RGBW und App-Steuerung.",
     "image": IMG_LED, "featured": False,
     "specs": {"Fassung": "GU10", "Leistung": "5W", "Farben": "RGBW"},
     "features": ["Farbwechsel", "Dimmbar", "App-Steuerung"]},
    {"slug": "smart-led-strip", "name": "Smart LED-Streifen 5m RGBW", "category": "beleuchtung",
     "short_description": "5m LED-Streifen mit Farbwechsel.",
     "description": "Flexibler 5m LED-Streifen mit App, Sprachsteuerung und Musik-Sync.",
     "image": IMG_LED, "featured": True,
     "specs": {"Länge": "5 m", "LEDs/m": "60", "Farben": "RGBW"},
     "features": ["Musik-Sync", "App & Sprache", "Selbstklebend"]},
    {"slug": "smart-led-ceiling", "name": "Smart LED-Deckenleuchte 36W", "category": "beleuchtung",
     "short_description": "Deckenleuchte mit RGB-Ring und App.",
     "description": "Moderne Deckenleuchte mit Hauptlicht und RGB-Akzent-Ring.",
     "image": IMG_LED, "featured": False,
     "specs": {"Leistung": "36W", "Farben": "Tunable White + RGB"},
     "features": ["RGB-Ring", "Fernbedienung", "App-Steuerung"]},

    # Energiemanagement
    {"slug": "smart-energy-monitor", "name": "Smart Energiemonitor Zählerschrank", "category": "energiemanagement",
     "short_description": "WLAN-Energiemonitor für den Stromzähler.",
     "description": "Direkt im Zählerschrank montiert. Echtzeit-Verbrauch per App.",
     "image": IMG_METER, "featured": True, "badge": "TOP",
     "specs": {"Protokoll": "WiFi", "Phasen": "1-3", "App": "Eigene / Smart Life"},
     "features": ["Echtzeit-Daten", "App-Integration", "Historie & Export"]},
    {"slug": "smart-meter-3phase", "name": "Smart Stromzähler 3-Phasen", "category": "energiemanagement",
     "short_description": "Drehstromzähler mit WLAN für Gewerbe.",
     "description": "Eichfähiger Drehstromzähler mit WLAN und Modbus für Gewerbe.",
     "image": IMG_METER, "featured": False,
     "specs": {"Phasen": "3", "Protokoll": "WiFi + Modbus", "Eichung": "MID"},
     "features": ["Eichfähig", "Modbus", "WiFi"]},
    {"slug": "pv-inverter-5kw", "name": "Smart PV-Wechselrichter 5kW", "category": "energiemanagement",
     "short_description": "Wechselrichter mit Monitoring.",
     "description": "Effizienter Hybrid-Wechselrichter für PV-Anlagen bis 5kW mit Cloud-Monitoring.",
     "image": IMG_SOLAR, "featured": True, "badge": "PV",
     "specs": {"Leistung": "5 kW", "Typ": "Hybrid", "MPPT": "2"},
     "features": ["Hybrid", "Cloud-Monitoring", "Batterie-Ready", "Notstrom-Option"]},
    {"slug": "battery-storage-10kwh", "name": "Smart Batteriespeicher 10kWh", "category": "energiemanagement",
     "short_description": "LiFePO4 Speicher für PV-Überschuss.",
     "description": "Sicherer Lithium-Eisenphosphat Heimspeicher mit 10 kWh Kapazität.",
     "image": IMG_BATTERY, "featured": True, "badge": "TOP",
     "specs": {"Kapazität": "10 kWh", "Chemie": "LiFePO4", "Zyklen": "6000+", "Garantie": "10 Jahre"},
     "features": ["10 Jahre Garantie", "6000+ Zyklen", "Notstromfähig", "Skalierbar"]},

    # Wasser
    {"slug": "smart-water-meter", "name": "Smart Wasserzähler mit WLAN", "category": "wasser",
     "short_description": "Echtzeit-Verbrauchsmessung.",
     "description": "Intelligenter Wasserzähler mit WLAN und App-Integration.",
     "image": IMG_WATER, "featured": True, "badge": "TOP",
     "specs": {"Protokoll": "WiFi", "Anschluss": "DN20", "Eichung": "MID"},
     "features": ["Echtzeit-Daten", "Leckage-Warnung", "App-Statistiken"]},
    {"slug": "smart-water-valve", "name": "Smart Wasserabsperrventil", "category": "wasser",
     "short_description": "Motorisiertes Absperrventil mit Leckage-Erkennung.",
     "description": "Automatisches Absperrventil schließt bei erkannter Leckage sofort.",
     "image": IMG_WATER, "featured": False,
     "specs": {"Anschluss": "DN20/25", "Protokoll": "WiFi / Zigbee"},
     "features": ["Leckageschutz", "App-Steuerung", "Automatik"]},
    {"slug": "flow-heater-18", "name": "Smart Durchlauferhitzer 18kW", "category": "wasser",
     "short_description": "Elektronischer Durchlauferhitzer mit App.",
     "description": "Energieeffizienter elektronischer Durchlauferhitzer mit gradgenauer Regelung.",
     "image": IMG_WATER, "featured": True, "badge": "TOP",
     "specs": {"Leistung": "18 kW", "Regelung": "elektronisch", "App": "Ja"},
     "features": ["Gradgenaue Regelung", "App-Steuerung", "Sparmodus"]},
    {"slug": "water-storage-100", "name": "Smart Warmwasserspeicher 100L", "category": "wasser",
     "short_description": "Elektrischer Warmwasserspeicher mit Smart-Steuerung.",
     "description": "100L Speicher mit intelligenter Temperaturregelung und PV-Überschussladung.",
     "image": IMG_WATER, "featured": False,
     "specs": {"Volumen": "100 L", "Leistung": "2.0 kW"},
     "features": ["PV-Überschuss", "App-Steuerung", "Anti-Legionellen"]},
]


# ============ Routes ============
@api_router.get("/")
async def root():
    return {"service": "ECO Building Technik API", "version": "1.0"}


@api_router.get("/categories")
async def get_categories():
    return CATEGORIES


@api_router.get("/products", response_model=List[Product])
async def get_products(category: Optional[str] = None, featured: Optional[bool] = None):
    query = {}
    if category:
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    products = await db.products.find(query, {"_id": 0}).to_list(500)
    for p in products:
        if isinstance(p.get("created_at"), str):
            p["created_at"] = datetime.fromisoformat(p["created_at"])
    return products


@api_router.get("/products/{slug}", response_model=Product)
async def get_product(slug: str):
    p = await db.products.find_one({"slug": slug}, {"_id": 0})
    if not p:
        raise HTTPException(status_code=404, detail="Produkt nicht gefunden")
    if isinstance(p.get("created_at"), str):
        p["created_at"] = datetime.fromisoformat(p["created_at"])
    return p


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(data: InquiryCreate):
    obj = Inquiry(**data.model_dump())
    doc = obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.inquiries.insert_one(doc)
    return obj


@api_router.post("/contact", response_model=Contact)
async def create_contact(data: ContactCreate):
    obj = Contact(**data.model_dump())
    doc = obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.contacts.insert_one(doc)
    return obj


@api_router.get("/stats")
async def stats():
    total = await db.products.count_documents({})
    return {"products": total, "categories": len(CATEGORIES)}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_seed():
    count = await db.products.count_documents({})
    if count == 0:
        logger.info(f"Seeding {len(SEED_PRODUCTS)} products...")
        docs = []
        for sp in SEED_PRODUCTS:
            p = Product(**sp)
            d = p.model_dump()
            d["created_at"] = d["created_at"].isoformat()
            docs.append(d)
        await db.products.insert_many(docs)
        logger.info("Seed complete.")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
