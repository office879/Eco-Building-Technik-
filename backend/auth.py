"""Authentication & Admin module — JWT bearer tokens + bcrypt password hashing."""
import os
import logging
from datetime import datetime, timezone, timedelta
from typing import Optional

import bcrypt
import jwt
from fastapi import HTTPException, Header, Depends
from pydantic import BaseModel, EmailStr

logger = logging.getLogger(__name__)

JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_MINUTES = 60 * 8  # 8 hours, comfortable for admin panel


def _secret() -> str:
    s = os.environ.get("JWT_SECRET")
    if not s:
        raise RuntimeError("JWT_SECRET is not set in environment")
    return s


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_MINUTES),
        "type": "access",
    }
    return jwt.encode(payload, _secret(), algorithm=JWT_ALGORITHM)


def decode_token(token: str) -> dict:
    return jwt.decode(token, _secret(), algorithms=[JWT_ALGORITHM])


# Pydantic models
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    email: EmailStr
    name: str = "Admin"
    role: str = "admin"


class LoginResponse(BaseModel):
    token: str
    user: UserOut


# Dependency to be wired in server.py with the db reference
def make_require_admin(db):
    async def require_admin(authorization: Optional[str] = Header(default=None)) -> dict:
        if not authorization or not authorization.lower().startswith("bearer "):
            raise HTTPException(status_code=401, detail="Authentifizierung erforderlich")
        token = authorization.split(" ", 1)[1].strip()
        try:
            payload = decode_token(token)
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token abgelaufen")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Ungültiges Token")
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Ungültiger Token-Typ")
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
        if not user or user.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Keine Admin-Berechtigung")
        return user

    return require_admin


async def seed_admin(db):
    """Idempotent admin seed. Updates password hash if env-password changed."""
    import uuid
    email = os.environ.get("ADMIN_EMAIL", "admin@example.com").lower().strip()
    password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"email": email})
    if existing is None:
        doc = {
            "id": str(uuid.uuid4()),
            "email": email,
            "password_hash": hash_password(password),
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        await db.users.insert_one(doc)
        logger.info(f"Seeded admin user: {email}")
    elif not verify_password(password, existing.get("password_hash", "")):
        await db.users.update_one(
            {"email": email}, {"$set": {"password_hash": hash_password(password)}}
        )
        logger.info(f"Updated admin password for: {email}")
