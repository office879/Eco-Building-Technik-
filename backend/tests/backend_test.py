"""Backend API tests for ECO Building Technik."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://building-tech-neu.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health / root ---
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    j = r.json()
    assert "service" in j or "message" in j


# --- Categories ---
def test_categories(client):
    r = client.get(f"{API}/categories")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 6
    # validate structure
    assert "key" in data[0] and "name" in data[0]


# --- Products ---
def test_products_list_seeded_34(client):
    r = client.get(f"{API}/products")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 34, f"expected 34 products, got {len(data)}"
    # validate fields
    p = data[0]
    for k in ("id", "slug", "name", "category", "price_from"):
        assert k in p


def test_products_filter_category_waermepumpen(client):
    r = client.get(f"{API}/products", params={"category": "waermepumpen"})
    assert r.status_code == 200
    data = r.json()
    assert len(data) > 0
    assert all(p["category"] == "waermepumpen" for p in data)


def test_products_filter_featured(client):
    r = client.get(f"{API}/products", params={"featured": "true"})
    assert r.status_code == 200
    data = r.json()
    assert len(data) > 0
    assert all(p.get("featured") is True for p in data)


def test_product_detail_jnod(client):
    r = client.get(f"{API}/products/jnod-a3-12kw")
    assert r.status_code == 200
    p = r.json()
    assert p["slug"] == "jnod-a3-12kw"
    assert "name" in p and "price_from" in p


def test_product_detail_invalid_slug(client):
    r = client.get(f"{API}/products/invalid-slug-xyz")
    assert r.status_code == 404


# --- Inquiries ---
def test_post_inquiry(client):
    payload = {
        "customer_name": "TEST_Max Mustermann",
        "email": "test_inquiry@example.com",
        "phone": "+49 170 1234567",
        "message": "Bitte um Angebot",
        "items": [
            {"product_id": "p1", "name": "JNOD A3 12kW", "quantity": 1}
        ],
    }
    r = client.post(f"{API}/inquiries", json=payload)
    assert r.status_code in (200, 201), f"got {r.status_code}: {r.text}"
    data = r.json()
    assert data["email"] == payload["email"]
    assert data["customer_name"] == payload["customer_name"]
    assert "id" in data


# --- Contact ---
def test_post_contact(client):
    payload = {
        "name": "TEST_Anna",
        "email": "test_contact@example.com",
        "phone": "+49 170 9999",
        "message": "Hallo, ich habe eine Frage.",
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code in (200, 201), f"got {r.status_code}: {r.text}"
    data = r.json()
    assert data["email"] == payload["email"]
    assert "id" in data


# --- Stats ---
def test_stats(client):
    r = client.get(f"{API}/stats")
    assert r.status_code == 200
    data = r.json()
    # at least products count
    assert "products" in data or "total_products" in data
