import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Filter, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
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
      setProducts(p);
      setCats(c);
      setLoading(false);
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
    <div className="pt-24 pb-16" data-testid="shop-page">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-zinc-900">
        <div className="eyebrow mb-4">Shop · {products.length} Produkte</div>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
          Produkt<span className="text-[#00FF66]">katalog.</span>
        </h1>
        <p className="mt-6 max-w-xl text-zinc-400">
          Premium-Gebäudetechnik von A+++ Wärmepumpen bis Zigbee Smart Home.
          Alle Produkte auf Anfrage mit kostenloser Fachberatung.
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-zinc-500">
            <Filter size={14}/>
            <span className="eyebrow">Kategorie</span>
          </div>
          <div className="flex-1 flex flex-wrap gap-2">
            <FilterChip label="Alle" active={active === "all"} onClick={() => setCat("all")} testId="filter-all"/>
            {cats.map((c) => (
              <FilterChip
                key={c.key}
                label={c.name}
                active={active === c.key}
                onClick={() => setCat(c.key)}
                testId={`filter-${c.key}`}
              />
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suchen..."
              className="input-field !border !border-zinc-800 !rounded-none px-3 w-full md:w-60 bg-black"
              data-testid="shop-search"
            />
            {search && (
              <button onClick={()=>setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                <X size={14}/>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 text-center text-zinc-500 font-mono" data-testid="shop-loading">LADE PRODUKTE...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-zinc-500" data-testid="shop-empty">Keine Produkte gefunden.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p}/>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FilterChip({ label, active, onClick, testId }) {
  return (
    <button
      onClick={onClick}
      data-testid={testId}
      className={`px-4 py-2 text-sm border transition-colors ${
        active
          ? "border-[#00FF66] text-[#00FF66] bg-[#00FF66]/5"
          : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
