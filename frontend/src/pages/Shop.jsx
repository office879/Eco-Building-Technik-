import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import SmartHomeFeature from "../components/SmartHomeFeature";
import { fetchProducts, fetchCategories } from "../lib/api";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("cat") || "all";
    setActive(cat);
  }, [location.search]);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()]).then(([p, c]) => {
      setProducts(p); setCats(c); setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let list = products;
    if (active !== "all") list = list.filter((p) => p.category === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.short_description.toLowerCase().includes(q));
    }
    return list;
  }, [products, active, search]);

  const setCat = (key) => {
    if (key === "all") navigate("/shop");
    else navigate(`/shop?cat=${key}`);
  };

  return (
    <div className="pt-32 pb-20" data-testid="shop-page">
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 border-b border-white/10">
        <div className="eyebrow mb-6">Shop · {products.length} Produkte</div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95]">
          Produkt<span className="italic-accent">katalog.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base md:text-lg text-white/65 leading-relaxed">
          Premium-Gebäudetechnik von A+++ Wärmepumpen bis Zigbee 3.0 Smart Home.
          Alle Produkte auf Anfrage mit kostenloser Fachberatung und individuellem Angebot.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center gap-5 mb-8">
          <div className="eyebrow shrink-0">Kategorie</div>
          <div className="flex-1 flex flex-wrap gap-2">
            <button onClick={() => setCat("all")} className={`btn-pill ${active === "all" ? "active" : ""}`} data-testid="filter-all">Alle</button>
            {cats.map((c) => (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                data-testid={`filter-${c.key}`}
                className={`btn-pill ${active === c.key ? "active" : ""}`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <div className="relative shrink-0">
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Suchen..."
              className="bg-transparent border border-white/15 hover:border-white/30 focus:border-white text-sm px-4 py-3 w-full md:w-64 outline-none transition-colors"
              data-testid="shop-search"
            />
            {search && (
              <button onClick={()=>setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                <X size={14}/>
              </button>
            )}
          </div>
        </div>
      </section>

      {active === "smart-home" && <SmartHomeFeature/>}

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {loading ? (
          <div className="py-24 text-center text-white/50 text-sm tracking-[0.15em] uppercase" data-testid="shop-loading">Lade Produkte...</div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center text-white/50" data-testid="shop-empty">Keine Produkte gefunden.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {filtered.map((p) => <ProductCard key={p.id} product={p}/>)}
          </div>
        )}
      </section>
    </div>
  );
}
