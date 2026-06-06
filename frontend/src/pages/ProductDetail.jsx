import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Check, ArrowRight } from "lucide-react";
import { fetchProduct, fetchProducts } from "../lib/api";
import { useCart } from "../context/CartContext";
import { useLang } from "../context/I18nContext";
import ProductCard from "../components/ProductCard";
import { toast } from "sonner";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { t } = useLang();
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

  if (loading) return <div className="pt-40 pb-20 text-center text-white/50 text-sm tracking-[0.15em] uppercase">{t("pd.loading")}</div>;
  if (!product) return null;

  const catLabel = t(`cat.${product.category}`, product.category);

  const handleAdd = () => {
    addItem(product, qty);
    toast.success(`${qty}× ${product.name} ${t("pd.toastAdded")}`);
  };

  return (
    <div className="pt-32 pb-20" data-testid="product-detail-page">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <Link to="/shop" className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-white/55 hover:text-white mb-10" data-testid="back-to-shop">
          <ArrowLeft size={13}/> {t("pd.back")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/10">
          <div className="lg:col-span-7 bg-[#0E1A3E] border-b lg:border-b-0 lg:border-r border-white/10">
            {product.youtube_id ? (
              <div className="aspect-[4/3] relative overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${product.youtube_id}?rel=0&modestbranding=1&iv_load_policy=3&controls=1&showinfo=0&color=white&playsinline=1`}
                  title={product.name}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  data-testid="product-youtube"
                />
              </div>
            ) : product.video_url ? (
              <div className="aspect-[4/3] relative overflow-hidden bg-black">
                <video
                  src={product.video_url}
                  poster={product.image}
                  controls
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                  data-testid="product-video"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 p-10 lg:p-14">
            <div className="flex items-center gap-3 mb-7 flex-wrap">
              <span className="eyebrow">{catLabel}</span>
              {product.badge && <span className="inline-flex items-center px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-semibold bg-white text-[#0B1736]">{product.badge}</span>}
            </div>

            <h1 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.05] mb-5">
              {product.name}
            </h1>
            <p className="text-white/65 leading-relaxed">{product.short_description}</p>

            <div className="mt-10 space-y-3">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <Check size={14} strokeWidth={2.5} className="text-white shrink-0"/>
                  <span className="text-white/85">{f}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 border-t border-white/10 pt-8">
              <div className="eyebrow mb-3">{t("pd.price")}</div>
              <div className="font-display text-2xl mb-2" data-testid="pd-price">{product.price_note}</div>
              <div className="text-xs text-emerald-300/80 tracking-wider uppercase mb-1" data-testid="pd-netto">{t("pd.netto")}</div>
              <div className="text-xs text-white/55">{t("pd.priceNote")}</div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center border border-white/20">
                <button onClick={()=>setQty(Math.max(1, qty-1))} className="w-11 h-12 hover:bg-white/5" data-testid="pd-qty-minus">−</button>
                <span className="w-10 text-center text-sm" data-testid="pd-qty">{qty}</span>
                <button onClick={()=>setQty(qty+1)} className="w-11 h-12 hover:bg-white/5" data-testid="pd-qty-plus">+</button>
              </div>
              <button onClick={handleAdd} className="btn-primary flex-1 justify-center" data-testid="pd-add-to-cart">
                <Plus size={14}/> {t("pd.addToCart")}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border-x border-b border-white/10">
          <div className="lg:col-span-7 p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="eyebrow mb-5">{t("pd.description")}</div>
            <p className="text-white/75 leading-relaxed whitespace-pre-line text-base">{product.description}</p>
          </div>
          <div className="lg:col-span-5 p-10 lg:p-14">
            <div className="eyebrow mb-5">{t("pd.specs")}</div>
            <dl className="divide-y divide-white/10">
              {Object.entries(product.specs || {}).map(([k, v]) => (
                <div key={k} className="flex justify-between py-4 text-sm">
                  <dt className="text-white/55">{k}</dt>
                  <dd className="text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-display text-3xl md:text-4xl tracking-tight">{t("pd.related1")} <span className="italic-accent">{t("pd.related2")}</span></h2>
              <Link to={`/shop?cat=${product.category}`} className="text-[11px] tracking-[0.15em] uppercase border-b border-white/40 pb-1 hover:border-white inline-flex items-center gap-2" data-testid="see-all-cat">
                {t("pd.seeAllIn")} {catLabel} <ArrowRight size={12}/>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
              {related.map((p) => <ProductCard key={p.id} product={p}/>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
