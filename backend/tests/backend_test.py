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


def test_health_endpoint(client):
    r = client.get(f"{API}/health")
    assert r.status_code == 200, r.text
    j = r.json()
    assert j.get("status") == "ok"
    assert j.get("db") == "connected"


def test_featured_products_exactly_8(client):
    r = client.get(f"{API}/products", params={"featured": "true"})
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 8, f"expected exactly 8 featured, got {len(data)}"


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
def test_products_list_seeded_64(client):
    r = client.get(f"{API}/products")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 64, f"expected 64 products, got {len(data)}"
    # validate fields
    p = data[0]
    for k in ("id", "slug", "name", "category", "price_from"):
        assert k in p


# --- New ECO Warmwasser products (iteration 4) ---
NEW_ECO_SLUGS = [
    "eco-luft-wasser-wp-wifi",
    "eco-all-in-one-warmwasser-boiler",
    "eco-luft-wasser-wp-warmwasser",
    "eco-r290-full-inverter-luft-wasser",
    "eco-heizung-kuehlung-haushalts-warmwasser",
]


@pytest.mark.parametrize("slug", NEW_ECO_SLUGS)
def test_new_eco_product_detail(client, slug):
    r = client.get(f"{API}/products/{slug}")
    assert r.status_code == 200, f"{slug} -> {r.status_code}"
    p = r.json()
    assert p["slug"] == slug
    assert "name" in p and isinstance(p["name"], str) and len(p["name"]) > 0
    assert "image" in p
    # specs is a dict mapping label -> value; features is a list
    assert "specs" in p and isinstance(p["specs"], dict) and len(p["specs"]) > 0
    assert "features" in p and isinstance(p["features"], list) and len(p["features"]) > 0
    assert "price_note" in p or "price_from" in p


def test_all_new_eco_slugs_in_list(client):
    r = client.get(f"{API}/products")
    assert r.status_code == 200
    slugs = {p["slug"] for p in r.json()}
    for s in NEW_ECO_SLUGS:
        assert s in slugs, f"missing slug {s}"


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


# --- Stripe Checkout ---
def test_stripe_checkout_session_creates_with_valid_cart(client):
    payload = {
        "items": [{"slug": "eco-r290-full-inverter-luft-wasser", "quantity": 1}],
        "origin_url": BASE_URL,
        "customer_email": "test_stripe@example.com",
    }
    r = client.post(f"{API}/checkout/session", json=payload)
    assert r.status_code == 200, f"got {r.status_code}: {r.text}"
    data = r.json()
    assert "url" in data and data["url"].startswith("http")
    assert "session_id" in data and len(data["session_id"]) > 0
    # Now poll status
    sid = data["session_id"]
    r2 = client.get(f"{API}/checkout/status/{sid}")
    assert r2.status_code == 200, r2.text
    s = r2.json()
    assert "status" in s
    assert "payment_status" in s


def test_stripe_checkout_empty_cart_rejected(client):
    r = client.post(f"{API}/checkout/session", json={"items": [], "origin_url": BASE_URL})
    assert r.status_code in (400, 422)


def test_stripe_checkout_invalid_slug_400(client):
    r = client.post(f"{API}/checkout/session", json={
        "items": [{"slug": "does-not-exist-xyz", "quantity": 1}],
        "origin_url": BASE_URL,
    })
    assert r.status_code == 400
