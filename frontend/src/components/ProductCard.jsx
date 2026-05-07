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
      className="product-card group block"
      data-testid={`product-card-${product.slug}`}
    >
      <div className="img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && (
          <div className="absolute top-3 left-3 pill pill-green" data-testid={`badge-${product.slug}`}>
            {product.badge}
          </div>
        )}
        <div className="absolute top-3 right-3 w-8 h-8 border border-white/20 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={14} />
        </div>
      </div>
      <div className="p-5">
        <div className="eyebrow mb-2">{CAT_LABELS[product.category] || product.category}</div>
        <h3 className="font-display font-medium text-lg leading-tight tracking-tight mb-2 group-hover:text-[#00FF66] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
          {product.short_description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
          <span className="font-mono text-xs text-zinc-500">{product.price_note}</span>
          <button
            onClick={handleAdd}
            data-testid={`add-to-cart-${product.slug}`}
            className="flex items-center gap-1 text-xs font-semibold text-[#00FF66] hover:text-white transition-colors"
          >
            <Plus size={14} /> ANFRAGE
          </button>
        </div>
      </div>
    </Link>
  );
}
