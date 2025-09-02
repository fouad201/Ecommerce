// components/cart/CartContext.jsx
"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "cart.v1";

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE": {
      const items = Array.isArray(action.payload) ? action.payload : [];
      return { ...state, items };
    }
    case "ADD": {
      const { item, qty = 1 } = action.payload;
      const idx = state.items.findIndex((i) => i.id === item.id);
      let items;
      if (idx >= 0) {
        items = state.items.map((i, k) =>
          k === idx ? { ...i, quantity: Math.min(99, (i.quantity || 0) + qty) } : i
        );
      } else {
        items = [...state.items, { id: item.id, title: item.title, price: item.price, image: item.image, quantity: qty }];
      }
      return { ...state, items };
    }
    case "SET_QTY": {
      const { id, qty } = action.payload;
      const q = Math.max(1, Math.min(99, qty));
      const items = state.items.map((i) => (i.id === id ? { ...i, quantity: q } : i));
      return { ...state, items };
    }
    case "REMOVE": {
      const id = action.payload;
      const items = state.items.filter((i) => i.id !== id);
      return { ...state, items };
    }
    case "CLEAR": {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // Hydrate from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", payload: JSON.parse(raw) });
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  const count = useMemo(() => state.items.reduce((a, b) => a + (b.quantity || 0), 0), [state.items]);
  const total = useMemo(() => state.items.reduce((s, i) => s + i.price * (i.quantity || 0), 0), [state.items]);

  const api = useMemo(
    () => ({
      items: state.items,
      count,
      total,
      add: (item, qty = 1) => dispatch({ type: "ADD", payload: { item, qty } }),
      remove: (id) => dispatch({ type: "REMOVE", payload: id }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [state.items, count, total]
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider />");
  return ctx;
}
