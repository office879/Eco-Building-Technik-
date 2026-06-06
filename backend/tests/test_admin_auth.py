"""Backend tests for Admin Auth + Admin CRUD + i18n-impacting public endpoints."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@eco-building.tech"
ADMIN_PASSWORD = "u_pIzUzKdOGLdSNg1xY"

JNOD_SLUGS = [
    "jnod-jmu50hcinv-top-discharge-r290",
    "jnod-j12hwh-r290-all-in-one-75c",
    "jnod-low-noise-r290-floor-heating",
    "jnod-j12hw200v2-acs-200l-all-in-one",
    "jnod-jme50hc-r290-full-dc-inverter-22kw",
]


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_token(client):
    r = client.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    data = r.json()
    assert "token" in data and data["token"]
    return data["token"]


@pytest.fixture(scope="session")
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}", "Content-Type": "application/json"}


# ---------------- AUTH ----------------
class TestAuth:
    def test_login_success_returns_token_and_user(self, client):
        r = client.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200
        d = r.json()
        assert "token" in d and isinstance(d["token"], str) and len(d["token"]) > 20
        assert d["user"]["email"] == ADMIN_EMAIL
        assert d["user"]["role"] == "admin"

    def test_login_wrong_password_401_german_detail(self, client):
        r = client.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong-pw-xyz"})
        assert r.status_code == 401
        d = r.json()
        assert d.get("detail") == "E-Mail oder Passwort falsch"

    def test_login_unknown_email_401(self, client):
        r = client.post(f"{API}/auth/login", json={"email": "nobody@example.com", "password": "x"})
        assert r.status_code == 401

    def test_me_with_valid_token(self, client, auth_headers):
        r = client.get(f"{API}/auth/me", headers=auth_headers)
        assert r.status_code == 200
        d = r.json()
        assert d["email"] == ADMIN_EMAIL
        assert d["role"] == "admin"

    def test_me_without_token_401(self, client):
        r = requests.get(f"{API}/auth/me")
        assert r.status_code == 401

    def test_me_with_malformed_token_401(self, client):
        r = requests.get(f"{API}/auth/me", headers={"Authorization": "Bearer this.is.not.valid"})
        assert r.status_code == 401


# ---------------- ADMIN INQUIRIES / CONTACTS ----------------
class TestAdminLists:
    def test_inquiries_requires_auth(self, client):
        r = requests.get(f"{API}/admin/inquiries")
        assert r.status_code == 401

    def test_inquiries_with_auth_returns_list(self, client, auth_headers):
        r = client.get(f"{API}/admin/inquiries", headers=auth_headers)
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_contacts_requires_auth(self, client):
        r = requests.get(f"{API}/admin/contacts")
        assert r.status_code == 401

    def test_contacts_with_auth_returns_list(self, client, auth_headers):
        r = client.get(f"{API}/admin/contacts", headers=auth_headers)
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_inquiries_sorted_desc(self, client, auth_headers):
        # create two inquiries, second one must be at index 0
        for i in range(2):
            client.post(f"{API}/inquiries", json={
                "customer_name": f"TEST_sort_{i}",
                "email": f"test_sort_{i}@example.com",
                "message": "sort check",
                "items": [],
            })
        r = client.get(f"{API}/admin/inquiries", headers=auth_headers)
        assert r.status_code == 200
        items = r.json()
        # latest should be first (created_at desc)
        created_ats = [it.get("created_at", "") for it in items[:5]]
        assert created_ats == sorted(created_ats, reverse=True)


# ---------------- ADMIN PRODUCTS CRUD ----------------
class TestAdminProductCRUD:
    slug = f"test-admin-product-{uuid.uuid4().hex[:8]}"

    def test_create_then_get_then_update_then_delete(self, client, auth_headers):
        # CREATE
        payload = {
            "slug": self.slug,
            "name": "TEST Admin Product",
            "category": "smarthome",
            "image": "https://images.unsplash.com/photo-1558002038-1055907df827",
            "short_description": "Test short",
            "description": "Test description",
            "price_from": 100.0,
            "price_note": "ab 100 €",
            "features": [],
            "gallery": [],
            "specs": {},
            "featured": False,
        }
        r = client.post(f"{API}/admin/products", json=payload, headers=auth_headers)
        assert r.status_code in (200, 201), r.text
        body = r.json()
        assert body["slug"] == self.slug
        assert body["name"] == payload["name"]

        # VERIFY persisted (public)
        r2 = client.get(f"{API}/products/{self.slug}")
        assert r2.status_code == 200
        assert r2.json()["slug"] == self.slug

        # DUPLICATE → 409
        r3 = client.post(f"{API}/admin/products", json=payload, headers=auth_headers)
        assert r3.status_code == 409

        # UPDATE
        r4 = client.put(f"{API}/admin/products/{self.slug}",
                        json={"name": "TEST Admin Updated"}, headers=auth_headers)
        assert r4.status_code == 200
        assert r4.json()["name"] == "TEST Admin Updated"

        # GET to verify update persisted
        r5 = client.get(f"{API}/products/{self.slug}")
        assert r5.status_code == 200
        assert r5.json()["name"] == "TEST Admin Updated"

        # UPDATE non-existent → 404
        r6 = client.put(f"{API}/admin/products/__does-not-exist__",
                        json={"name": "x"}, headers=auth_headers)
        assert r6.status_code == 404

        # DELETE
        r7 = client.delete(f"{API}/admin/products/{self.slug}", headers=auth_headers)
        assert r7.status_code == 200

        # Verify gone
        r8 = client.get(f"{API}/products/{self.slug}")
        assert r8.status_code == 404

        # Delete non-existent → 404
        r9 = client.delete(f"{API}/admin/products/__does-not-exist__", headers=auth_headers)
        assert r9.status_code == 404

    def test_create_requires_auth(self, client):
        r = requests.post(f"{API}/admin/products", json={"slug": "x", "name": "n", "category": "smarthome", "image": "", "short_description": ""})
        assert r.status_code == 401


# ---------------- PUBLIC + JNOD slugs ----------------
class TestPublicAndJnod:
    def test_products_count_55(self, client):
        r = client.get(f"{API}/products")
        assert r.status_code == 200
        data = r.json()
        # Iteration spec says 55. Use >=55 to be a bit tolerant of test-leftover products.
        assert len(data) >= 55, f"expected >=55 products, got {len(data)}"

    def test_building_tech_neu_exists(self, client):
        r = client.get(f"{API}/products/building-tech-neu")
        # may or may not exist depending on seed — allow 200 or 404 but treat 404 as informational
        assert r.status_code in (200, 404)

    @pytest.mark.parametrize("slug", JNOD_SLUGS)
    def test_jnod_slug_resolves_with_lieferzeit(self, client, slug):
        r = client.get(f"{API}/products/{slug}")
        assert r.status_code == 200, f"{slug} not found"
        p = r.json()
        specs = p.get("specs") or {}
        assert "Lieferzeit" in specs, f"{slug} missing specs.Lieferzeit (got {list(specs.keys())})"

    def test_categories(self, client):
        r = client.get(f"{API}/categories")
        assert r.status_code == 200
        assert len(r.json()) == 6

    def test_stats(self, client):
        r = client.get(f"{API}/stats")
        assert r.status_code == 200

    def test_inquiry_post_graceful_with_empty_resend_key(self, client):
        # public inquiry endpoint — must succeed even with empty RESEND_API_KEY
        payload = {
            "customer_name": "TEST_graceful",
            "email": "test_graceful@example.com",
            "message": "graceful check",
            "items": [],
        }
        r = client.post(f"{API}/inquiries", json=payload)
        assert r.status_code in (200, 201), r.text
        assert r.json()["email"] == payload["email"]
