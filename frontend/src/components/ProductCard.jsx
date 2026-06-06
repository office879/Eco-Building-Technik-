import React from "react";
import { Link } from "react-router-dom";
import { Plus, ArrowUpRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

const CAT_LABELS = {
  "waermepumpen": "Wärmepumpen",
  "gas-brennwert": "Gas-Brennwert",
  "smart-home": "Smart Home",
  "beleuchtung": "Beleuchtung",
  "energiemanagement": "Energiemanagement",
  "wasser": "Wasser",
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} zur Anfrage hinzugefügt`);
  };

  return (
    <Link
      to={`/shop/${product.slug}`}
      className="product-card group"
      data-testid={`product-card-${product.slug}`}
    >
      <div className="img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && (
          <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-semibold bg-white text-[#0B1736]" data-testid={`badge-${product.slug}`}>
            {product.badge}
          </div>
        )}
        <div className="absolute top-4 right-4 w-9 h-9 border border-white/30 bg-[#0B1736]/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={14} />
        </div>
      </div>
      <div className="p-6">
        <div className="eyebrow mb-3">{CAT_LABELS[product.category] || product.category}</div>
        <h3 className="font-display text-lg leading-tight tracking-tight mb-3 group-hover:opacity-80 transition-opacity">
          {product.name}
        </h3>
        <p className="text-sm text-white/55 line-clamp-2 mb-5 leading-relaxed">
          {product.short_description}
        </p>
        <div className="flex items-center justify-between pt-5 border-t border-white/10">
          <div className="flex flex-col">
            <span className="text-[11px] tracking-[0.12em] uppercase text-white/45">{product.price_note}</span>
            {product.price_note && /€|EUR|\d/.test(product.price_note) && !/netto/i.test(product.price_note) && (
              <span className="text-[9px] tracking-[0.15em] uppercase text-white/30 mt-0.5">Netto · zzgl. 20 % MwSt.</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            data-testid={`add-to-cart-${product.slug}`}
            className="flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase font-semibold text-white hover:opacity-80 transition-opacity"
          >
            <Plus size={13} strokeWidth={2}/> Anfrage
          </button>
        </div>
      </div>
    </Link>
  );
}
