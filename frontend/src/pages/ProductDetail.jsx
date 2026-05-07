import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Check, ArrowRight } from "lucide-react";
import { fetchProduct, fetchProducts } from "../lib/api";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { toast } from "sonner";

const CAT_LABELS = {
  "waermepumpen": "Wärmepumpen",
  "gas-brennwert": "Gas-Brennwert",
  "smart-home": "Smart Home",
  "beleuchtung": "Beleuchtung",
  "energiemanagement": "Energiemanagement",
  "wasser": "Wasser",
};

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchProduct(slug)
      .then(async (p) => {
        setProduct(p);
        const all = await fetchProducts({ category: p.category });
        setRelated(all.filter((x) => x.slug !== p.slug).slice(0, 4));
      })
      .catch(() => navigate("/shop"))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) {
    return <div className="pt-32 pb-16 text-center text-zinc-500 font-mono" data-testid="pd-loading">LADEN...</div>;
  }
  if (!product) return null;

  const handleAdd = () => {
    addItem(product, qty);
    toast.success(`${qty}× ${product.name} zur Anfrage hinzugefügt`);
  };

  return (
    <div className="pt-24 pb-16" data-testid="product-detail-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-[#00FF66] mb-8" data-testid="back-to-shop">
          <ArrowLeft size={14}/> Zurück zum Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-900 border border-zinc-900">
          {/* Gallery */}
          <div className="lg:col-span-7 bg-black">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 bg-[#0A0A0A] p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="eyebrow">{CAT_LABELS[product.category]}</span>
              {product.badge && <span className="pill pill-green">{product.badge}</span>}
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4">
              {product.name}
            </h1>
            <p className="text-zinc-400 leading-relaxed">{product.short_description}</p>

            <div className="mt-8 space-y-2">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <Check size={14} className="text-[#00FF66] shrink-0"/>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-zinc-900 pt-8">
              <div className="font-mono text-xs text-zinc-500 mb-2">PREIS</div>
              <div className="font-display text-2xl font-medium mb-1">{product.price_note}</div>
              <div className="text-xs text-zinc-500">Individuelles Angebot inkl. Förderung & Installation</div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center border border-zinc-800">
                <button onClick={()=>setQty(Math.max(1, qty-1))} className="w-10 h-12 hover:bg-zinc-900" data-testid="pd-qty-minus">−</button>
                <span className="w-10 text-center font-mono" data-testid="pd-qty">{qty}</span>
                <button onClick={()=>setQty(qty+1)} className="w-10 h-12 hover:bg-zinc-900" data-testid="pd-qty-plus">+</button>
              </div>
              <button onClick={handleAdd} className="btn-primary flex-1 justify-center" data-testid="pd-add-to-cart">
                <Plus size={16}/> Zur Anfrage
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-900 border-x border-b border-zinc-900">
          <div className="lg:col-span-7 bg-[#0A0A0A] p-8 lg:p-12">
            <div className="eyebrow mb-4">Beschreibung</div>
            <p className="text-zinc-300 leading-relaxed whitespace-pre-line">{product.description}</p>
          </div>
          <div className="lg:col-span-5 bg-black p-8 lg:p-12">
            <div className="eyebrow mb-4">Technische Daten</div>
            <dl className="divide-y divide-zinc-900">
              {Object.entries(product.specs || {}).map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 text-sm">
                  <dt className="text-zinc-500">{k}</dt>
                  <dd className="font-mono text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">Passende Produkte.</h2>
              <Link to={`/shop?cat=${product.category}`} className="text-sm text-[#00FF66] hover:underline inline-flex items-center gap-1" data-testid="see-all-cat">
                Alle {CAT_LABELS[product.category]} <ArrowRight size={14}/>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
              {related.map((p) => <ProductCard key={p.id} product={p}/>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
