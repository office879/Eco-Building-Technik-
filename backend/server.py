from fastapi import FastAPI, APIRouter, HTTPException, Depends, BackgroundTasks
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

from auth import (
    LoginRequest, LoginResponse, UserOut,
    verify_password, create_access_token, make_require_admin, seed_admin,
)
from email_service import send_inquiry_email
from stripe_routes import init_stripe_routes

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
    video_url: Optional[str] = None
    youtube_id: Optional[str] = None
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


# === Seed data (extracted to seed_products.py for maintainability) ===
from seed_products import SEED_PRODUCTS, IMG_HEATPUMP, IMG_SMART, IMG_SOLAR, IMG_THERMO, IMG_BOILER, IMG_SWITCH, IMG_LED, IMG_WATER, IMG_BATTERY, IMG_METER  # noqa: E402,F401



# ============ Routes ============
@api_router.get("/")
async def root():
    return {"service": "ECO Building Technik API", "version": "1.0"}


@api_router.get("/health")
async def health():
    """Lightweight health-check for uptime monitoring & deploy.sh."""
    try:
        # ping mongo
        await db.command("ping")
        return {"status": "ok", "db": "connected"}
    except Exception as e:
        return {"status": "degraded", "db": "error", "error": str(e)[:120]}


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
async def create_inquiry(data: InquiryCreate, background_tasks: BackgroundTasks):
    obj = Inquiry(**data.model_dump())
    doc = obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.inquiries.insert_one(doc)
    # Fire-and-forget email notification
    background_tasks.add_task(send_inquiry_email, doc)
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


# ============ Auth ============
require_admin = make_require_admin(db)


@api_router.post("/auth/login", response_model=LoginResponse)
async def login(data: LoginRequest):
    email = data.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(data.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="E-Mail oder Passwort falsch")
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Keine Admin-Berechtigung")
    token = create_access_token(user["id"], user["email"])
    return LoginResponse(
        token=token,
        user=UserOut(id=user["id"], email=user["email"], name=user.get("name", "Admin"), role=user.get("role", "admin")),
    )


@api_router.get("/auth/me", response_model=UserOut)
async def me(user: dict = Depends(require_admin)):
    return UserOut(id=user["id"], email=user["email"], name=user.get("name", "Admin"), role=user.get("role", "admin"))


@api_router.post("/auth/logout")
async def logout(user: dict = Depends(require_admin)):
    # Stateless JWT — client just discards token.
    return {"ok": True}


# ============ Admin: Inquiries & Contacts ============
@api_router.get("/admin/inquiries")
async def admin_list_inquiries(user: dict = Depends(require_admin)):
    docs = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


@api_router.delete("/admin/inquiries/{inquiry_id}")
async def admin_delete_inquiry(inquiry_id: str, user: dict = Depends(require_admin)):
    res = await db.inquiries.delete_one({"id": inquiry_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Anfrage nicht gefunden")
    return {"ok": True}


@api_router.get("/admin/contacts")
async def admin_list_contacts(user: dict = Depends(require_admin)):
    docs = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


# ============ Admin: Product CRUD ============
class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    short_description: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    gallery: Optional[List[str]] = None
    video_url: Optional[str] = None
    youtube_id: Optional[str] = None
    specs: Optional[dict] = None
    features: Optional[List[str]] = None
    featured: Optional[bool] = None
    badge: Optional[str] = None
    price_from: Optional[float] = None
    price_note: Optional[str] = None


@api_router.post("/admin/products", response_model=Product)
async def admin_create_product(data: Product, user: dict = Depends(require_admin)):
    if await db.products.find_one({"slug": data.slug}):
        raise HTTPException(status_code=409, detail="Slug existiert bereits")
    doc = data.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.products.insert_one(doc)
    return data


@api_router.put("/admin/products/{slug}", response_model=Product)
async def admin_update_product(slug: str, data: ProductUpdate, user: dict = Depends(require_admin)):
    existing = await db.products.find_one({"slug": slug}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Produkt nicht gefunden")
    update = {k: v for k, v in data.model_dump(exclude_unset=True).items() if v is not None}
    if update:
        await db.products.update_one({"slug": slug}, {"$set": update})
    merged = {**existing, **update}
    if isinstance(merged.get("created_at"), str):
        merged["created_at"] = datetime.fromisoformat(merged["created_at"])
    return merged


@api_router.delete("/admin/products/{slug}")
async def admin_delete_product(slug: str, user: dict = Depends(require_admin)):
    res = await db.products.delete_one({"slug": slug})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Produkt nicht gefunden")
    return {"ok": True}


app.include_router(api_router)
app.include_router(init_stripe_routes(db), prefix="/api")

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
    # Seed admin user
    await seed_admin(db)
    # Seed products
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
