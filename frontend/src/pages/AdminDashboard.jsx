import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Inbox, Package, MessageSquare, LogOut, Trash2, Pencil, Plus, RefreshCcw, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/I18nContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminDashboard() {
  const { user, logout, authHeaders } = useAuth();
  const { t } = useLang();
  const [tab, setTab] = useState("inquiries");

  return (
    <div className="pt-32 pb-20 min-h-screen" data-testid="admin-dashboard">
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8 border-b border-white/10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow mb-3">{t("ad.section")}</div>
            <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[0.95]">
              {t("ad.h1")} <span className="italic-accent">{t("ad.italic")}</span>
            </h1>
            <div className="mt-3 text-white/50 text-xs">{t("ad.loggedIn")} <b className="text-white/80">{user?.email}</b></div>
          </div>
          <button
            onClick={logout}
            className="border border-white/20 px-5 py-2.5 text-xs uppercase tracking-wider hover:bg-white hover:text-[#0B1736] flex items-center gap-2"
            data-testid="admin-logout-btn"
          >
            <LogOut size={14} /> {t("ad.logout")}
          </button>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-8">
        <div className="flex gap-1 border-b border-white/10">
          <Tab id="inquiries" active={tab} setActive={setTab} icon={Inbox} label={t("ad.tab.inquiries")} />
          <Tab id="contacts" active={tab} setActive={setTab} icon={MessageSquare} label={t("ad.tab.contacts")} />
          <Tab id="products" active={tab} setActive={setTab} icon={Package} label={t("ad.tab.products")} />
        </div>

        <div className="py-10">
          {tab === "inquiries" && <InquiriesPanel authHeaders={authHeaders} t={t} />}
          {tab === "contacts" && <ContactsPanel authHeaders={authHeaders} t={t} />}
          {tab === "products" && <ProductsPanel authHeaders={authHeaders} />}
        </div>
      </section>
    </div>
  );
}

const Tab = ({ id, active, setActive, icon: Icon, label }) => (
  <button
    onClick={() => setActive(id)}
    className={`px-5 py-3 text-xs uppercase tracking-wider flex items-center gap-2 border-b-2 -mb-px transition-colors ${
      active === id ? "border-white text-white" : "border-transparent text-white/40 hover:text-white/70"
    }`}
    data-testid={`admin-tab-${id}`}
  >
    <Icon size={14} /> {label}
  </button>
);

// ============ Inquiries ============
function InquiriesPanel({ authHeaders, t }) {
  const [items, setItems] = useState(null);
  const load = async () => {
    setItems(null);
    try {
      const { data } = await axios.get(`${API}/admin/inquiries`, { headers: authHeaders });
      setItems(data);
    } catch {
      toast.error(t("ad.loadErrInq"));
      setItems([]);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!window.confirm(t("ad.deleteConfirm"))) return;
    try {
      await axios.delete(`${API}/admin/inquiries/${id}`, { headers: authHeaders });
      toast.success(t("ad.deleted"));
      load();
    } catch {
      toast.error(t("ad.deleteErr"));
    }
  };

  if (items === null) return <div className="text-white/40 text-sm">{t("ad.loading")}</div>;
  if (items.length === 0) return <Empty label={t("ad.noInquiries")} />;

  return (
    <div className="space-y-4" data-testid="admin-inquiries-list">
      <div className="flex items-center justify-between">
        <div className="text-white/60 text-sm">{items.length} Anfrage{items.length !== 1 ? "n" : ""}</div>
        <button onClick={load} className="text-white/60 hover:text-white text-xs flex items-center gap-1.5"><RefreshCcw size={12}/> {t("ad.reload")}</button>
      </div>
      {items.map((q) => (
        <div key={q.id} className="border border-white/10 p-6" data-testid={`inquiry-${q.id}`}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-white font-medium">{q.customer_name}</div>
              <div className="text-white/60 text-sm mt-1">
                <a href={`mailto:${q.email}`} className="hover:text-white">{q.email}</a>
                {q.phone && <span className="ml-3 text-white/40">· {q.phone}</span>}
                {q.company && <span className="ml-3 text-white/40">· {q.company}</span>}
              </div>
              <div className="text-white/30 text-xs mt-2">{q.created_at}</div>
            </div>
            <button onClick={() => onDelete(q.id)} className="text-white/40 hover:text-red-400" data-testid={`delete-inquiry-${q.id}`}>
              <Trash2 size={16} />
            </button>
          </div>
          {q.message && (
            <div className="mt-4 p-3 bg-white/5 text-sm text-white/80 whitespace-pre-wrap">{q.message}</div>
          )}
          {q.items && q.items.length > 0 && (
            <div className="mt-4">
              <div className="eyebrow text-xs mb-2">Produkte ({q.items.length})</div>
              <ul className="text-white/70 text-sm space-y-1">
                {q.items.map((it, i) => (
                  <li key={i} className="flex justify-between border-b border-white/5 py-1">
                    <span>{it.quantity}× {it.name}</span>
                    <span className="text-white/40 text-xs">{it.slug}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============ Contacts ============
function ContactsPanel({ authHeaders, t }) {
  const [items, setItems] = useState(null);
  useEffect(() => {
    axios.get(`${API}/admin/contacts`, { headers: authHeaders })
      .then((r) => setItems(r.data))
      .catch(() => { toast.error(t("ad.loadErrCon")); setItems([]); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (items === null) return <div className="text-white/40 text-sm">{t("ad.loading")}</div>;
  if (items.length === 0) return <Empty label={t("ad.noContacts")} />;
  return (
    <div className="space-y-4" data-testid="admin-contacts-list">
      {items.map((c, i) => (
        <div key={i} className="border border-white/10 p-6">
          <div className="text-white font-medium">{c.name}</div>
          <div className="text-white/60 text-sm mt-1">
            <a href={`mailto:${c.email}`} className="hover:text-white">{c.email}</a>
            {c.phone && <span className="ml-3 text-white/40">· {c.phone}</span>}
          </div>
          <div className="text-white/30 text-xs mt-2">{c.created_at}</div>
          {c.message && <div className="mt-4 p-3 bg-white/5 text-sm text-white/80 whitespace-pre-wrap">{c.message}</div>}
        </div>
      ))}
    </div>
  );
}

// ============ Products ============
function ProductsPanel({ authHeaders }) {
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState("");
  const [editing, setEditing] = useState(null); // null = none, {} = new, {...} = edit existing

  const load = async () => {
    setItems(null);
    try {
      const { data } = await axios.get(`${API}/products`);
      setItems(data);
    } catch { setItems([]); }
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    if (!items) return [];
    const f = filter.toLowerCase();
    return f ? items.filter((p) => p.name.toLowerCase().includes(f) || p.slug.toLowerCase().includes(f)) : items;
  }, [items, filter]);

  const onDelete = async (slug) => {
    if (!window.confirm(`Produkt "${slug}" wirklich löschen?`)) return;
    try {
      await axios.delete(`${API}/admin/products/${slug}`, { headers: authHeaders });
      toast.success("Gelöscht");
      load();
    } catch (e) {
      toast.error("Löschen fehlgeschlagen");
    }
  };

  if (editing !== null) {
    return (
      <ProductEditor
        initial={editing}
        authHeaders={authHeaders}
        onClose={() => setEditing(null)}
        onSaved={() => { setEditing(null); load(); }}
      />
    );
  }

  if (items === null) return <div className="text-white/40 text-sm">Lädt…</div>;

  return (
    <div className="space-y-4" data-testid="admin-products-panel">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter (Name oder Slug)…"
          className="flex-1 max-w-md bg-transparent border border-white/20 text-white px-3 py-2.5 text-sm focus:border-white/60 outline-none"
          data-testid="product-filter-input"
        />
        <div className="flex gap-2">
          <button onClick={load} className="border border-white/20 px-4 py-2.5 text-xs uppercase tracking-wider hover:bg-white hover:text-[#0B1736] flex items-center gap-2">
            <RefreshCcw size={12}/> Neu laden
          </button>
          <button onClick={() => setEditing({})} className="bg-white text-[#0B1736] px-4 py-2.5 text-xs uppercase tracking-wider hover:bg-white/90 flex items-center gap-2" data-testid="new-product-btn">
            <Plus size={14}/> Neues Produkt
          </button>
        </div>
      </div>
      <div className="text-white/50 text-xs">{filtered.length} / {items.length} Produkte</div>

      <div className="border border-white/10 divide-y divide-white/10">
        {filtered.map((p) => (
          <div key={p.slug} className="flex items-center gap-4 p-4 hover:bg-white/5" data-testid={`product-row-${p.slug}`}>
            <img src={p.image} alt="" className="w-14 h-14 object-cover bg-white/5" />
            <div className="flex-1 min-w-0">
              <div className="text-white truncate">{p.name}</div>
              <div className="text-white/40 text-xs truncate">{p.slug} · {p.category} {p.price_note ? `· ${p.price_note}` : ""}</div>
            </div>
            <button onClick={() => setEditing(p)} className="text-white/60 hover:text-white" title="Bearbeiten" data-testid={`edit-${p.slug}`}>
              <Pencil size={16} />
            </button>
            <button onClick={() => onDelete(p.slug)} className="text-white/40 hover:text-red-400" title="Löschen" data-testid={`delete-${p.slug}`}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {filtered.length === 0 && <div className="p-8 text-center text-white/40 text-sm">Keine Produkte gefunden</div>}
      </div>
    </div>
  );
}

// ============ Product Editor ============
const EMPTY = {
  slug: "", name: "", category: "waermepumpen",
  short_description: "", description: "",
  image: "", gallery: [], video_url: "", youtube_id: "",
  specs: {}, features: [], featured: false, badge: "",
  price_from: null, price_note: "",
};

function ProductEditor({ initial, authHeaders, onClose, onSaved }) {
  const isNew = !initial.slug;
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Coerce types
      const payload = { ...form };
      payload.price_from = payload.price_from === "" || payload.price_from === null ? null : parseFloat(payload.price_from);
      if (typeof payload.gallery === "string") payload.gallery = payload.gallery.split("\n").map((s) => s.trim()).filter(Boolean);
      if (typeof payload.features === "string") payload.features = payload.features.split("\n").map((s) => s.trim()).filter(Boolean);
      if (typeof payload.specs === "string") {
        const obj = {};
        payload.specs.split("\n").forEach((line) => {
          const idx = line.indexOf(":");
          if (idx > 0) obj[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
        });
        payload.specs = obj;
      }

      if (isNew) {
        await axios.post(`${API}/admin/products`, payload, { headers: authHeaders });
        toast.success("Produkt erstellt");
      } else {
        await axios.put(`${API}/admin/products/${initial.slug}`, payload, { headers: authHeaders });
        toast.success("Produkt aktualisiert");
      }
      onSaved();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Speichern fehlgeschlagen");
    } finally {
      setSaving(false);
    }
  };

  // Serialize arrays/object for textarea display
  const galleryStr = Array.isArray(form.gallery) ? form.gallery.join("\n") : form.gallery;
  const featuresStr = Array.isArray(form.features) ? form.features.join("\n") : form.features;
  const specsStr = typeof form.specs === "object" && form.specs !== null
    ? Object.entries(form.specs).map(([k, v]) => `${k}: ${v}`).join("\n")
    : form.specs;

  return (
    <form onSubmit={submit} className="space-y-6" data-testid="product-editor">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">{isNew ? "Neues Produkt" : `Bearbeiten: ${initial.name}`}</h2>
        <button type="button" onClick={onClose} className="text-white/50 hover:text-white" data-testid="close-editor">
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Slug (URL)" required>
          <input required disabled={!isNew} value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls} data-testid="editor-slug"/>
        </Field>
        <Field label="Kategorie" required>
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls} data-testid="editor-category">
            <option value="waermepumpen">Wärmepumpen</option>
            <option value="gas-brennwert">Gas-Brennwert</option>
            <option value="smart-home">Smart Home</option>
            <option value="beleuchtung">Beleuchtung</option>
            <option value="energiemanagement">Energiemanagement</option>
            <option value="wasser">Wasser</option>
          </select>
        </Field>
        <Field label="Name" required wide>
          <input required value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} data-testid="editor-name"/>
        </Field>
        <Field label="Kurzbeschreibung" wide>
          <input value={form.short_description} onChange={(e) => set("short_description", e.target.value)} className={inputCls}/>
        </Field>
        <Field label="Beschreibung" wide>
          <textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} className={inputCls}/>
        </Field>
        <Field label="Hauptbild URL" wide>
          <input value={form.image} onChange={(e) => set("image", e.target.value)} className={inputCls} data-testid="editor-image"/>
        </Field>
        <Field label="Galerie (eine URL pro Zeile)" wide>
          <textarea rows={4} value={galleryStr} onChange={(e) => set("gallery", e.target.value)} className={inputCls}/>
        </Field>
        <Field label="Specs (Format: Key: Value, eine pro Zeile)" wide>
          <textarea rows={6} value={specsStr} onChange={(e) => set("specs", e.target.value)} className={inputCls}/>
        </Field>
        <Field label="Features (eine pro Zeile)" wide>
          <textarea rows={4} value={featuresStr} onChange={(e) => set("features", e.target.value)} className={inputCls}/>
        </Field>
        <Field label="Preis ab (€, optional)">
          <input type="number" step="0.01" value={form.price_from ?? ""} onChange={(e) => set("price_from", e.target.value)} className={inputCls}/>
        </Field>
        <Field label="Preis-Text (z.B. 'ab 2.000 €')">
          <input value={form.price_note} onChange={(e) => set("price_note", e.target.value)} className={inputCls}/>
        </Field>
        <Field label="YouTube ID (optional)">
          <input value={form.youtube_id || ""} onChange={(e) => set("youtube_id", e.target.value)} className={inputCls}/>
        </Field>
        <Field label="Video URL (mp4, optional)">
          <input value={form.video_url || ""} onChange={(e) => set("video_url", e.target.value)} className={inputCls}/>
        </Field>
        <Field label="Badge (z.B. PREMIUM)">
          <input value={form.badge || ""} onChange={(e) => set("badge", e.target.value)} className={inputCls}/>
        </Field>
        <Field label="Featured">
          <label className="flex items-center gap-2 text-sm pt-3">
            <input type="checkbox" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)}/>
            <span>auf Startseite hervorheben</span>
          </label>
        </Field>
      </div>

      <div className="flex gap-3 pt-4 border-t border-white/10">
        <button type="submit" disabled={saving} className="bg-white text-[#0B1736] px-6 py-3 text-xs uppercase tracking-wider hover:bg-white/90 disabled:opacity-50" data-testid="editor-save">
          {saving ? "Speichern…" : (isNew ? "Erstellen" : "Speichern")}
        </button>
        <button type="button" onClick={onClose} className="border border-white/20 px-6 py-3 text-xs uppercase tracking-wider hover:bg-white/10">
          Abbrechen
        </button>
        {!isNew && (
          <Link to={`/shop/${initial.slug}`} target="_blank" className="ml-auto text-white/50 hover:text-white text-xs uppercase tracking-wider self-center">
            Im Shop ansehen →
          </Link>
        )}
      </div>
    </form>
  );
}

const inputCls = "w-full bg-transparent border border-white/20 text-white px-3 py-2.5 text-sm focus:border-white/60 outline-none";

const Field = ({ label, children, wide, required }) => (
  <div className={wide ? "md:col-span-2" : ""}>
    <label className="eyebrow text-xs mb-2 block">
      {label}{required && <span className="text-red-400 ml-1">*</span>}
    </label>
    {children}
  </div>
);

const Empty = ({ label }) => (
  <div className="border border-dashed border-white/15 p-12 text-center text-white/40 text-sm">{label}</div>
);
