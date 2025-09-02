// components/CartButton.jsx
"use client";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "./cart/CartContext";
import styles from "./CartButton.module.css";

export default function CartButton({ onClick }) {
  const { count } = useCart();
  return (
    <button className={styles.btn} aria-label="Cart" onClick={onClick}>
      <FiShoppingCart />
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </button>
  );
}
