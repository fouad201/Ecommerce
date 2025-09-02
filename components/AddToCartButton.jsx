// components/AddToCartButton.jsx
"use client";
import { useCart } from "./cart/CartContext";

export default function AddToCartButton({ product, qty = 1, className, children }) {
  const { add } = useCart();
  const onClick = () => add(product, qty);
  return (
    <button onClick={onClick} className={className || ""} aria-label="Add to cart">
      {children || "Add to Cart"}
    </button>
  );
}
