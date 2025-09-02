// components/QtyAddToCart.jsx
"use client";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";

export default function QtyAddToCart({ product }) {
  const [qty, setQty] = useState(1);

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <input
        type="number"
        min={1}
        max={99}
        value={qty}
        onChange={(e) =>
          setQty(
            Math.max(
              1,
              Math.min(99, parseInt(e.target.value || "1", 10))
            )
          )
        }
        style={{
          width: 72,
          padding: "8px 10px",
          border: "1px solid #e5e7eb",
          borderRadius: 10,
        }}
      />

      <AddToCartButton
        product={product}
        qty={qty}
        className="add-btn"
      >
        Add to Cart
      </AddToCartButton>
    </div>
  );
}
