import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "ecobt_cart_v1";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) { /* ignore */ }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.product_id === product.id);
      if (found) {
        return prev.map((i) =>
          i.product_id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [
        ...prev,
        {
          product_id: product.id,
          slug: product.slug,
          name: product.name,
          image: product.image,
          category: product.category,
          price_from: product.price_from ?? null,
          quantity: qty,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.product_id !== id));
  const updateQty = (id, qty) =>
    setItems((prev) =>
      prev.map((i) => (i.product_id === id ? { ...i, quantity: Math.max(1, qty) } : i))
    );
  const clear = () => setItems([]);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((s, i) => s + i.quantity, 0),
      addItem,
      removeItem,
      updateQty,
      clear,
      isOpen,
      setIsOpen,
    }),
    [items, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
