// components/CartDrawer.jsx
"use client";

import Image from "next/image";
import styles from "./CartDrawer.module.css";
import { useCart } from "./cart/CartContext";

export default function CartDrawer({ open, onClose }) {
  const { items, setQty, remove, total, clear } = useCart();

  return (
    <>
      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`} onClick={onClose} />
      <aside className={`${styles.panel} ${open ? styles.open : ""}`} aria-hidden={!open}>
        <div className={styles.head}>
          <div className={styles.title}>Your Cart</div>
          <button className={styles.close} onClick={onClose}>Close</button>
        </div>

        <div className={styles.body}>
          {items.length === 0 && <div className={styles.empty}>Your cart is empty</div>}

          {items.map((it) => (
            <div key={it.id} className={styles.item}>
              <div className={styles.thumb}>
                <Image src={it.image} alt={it.title} width={70} height={70} style={{ objectFit: "contain", width: "100%", height: "100%" }}/>
              </div>
              <div className={styles.meta}>
                <div className={styles.name}>{it.title}</div>
                <div className={styles.price}>${(it.price * it.quantity).toFixed(2)}</div>
                <div className={styles.qtyRow}>
                  <label>Qty</label>
                  <input
                    className={styles.qtyInp}
                    type="number" min={1} max={99}
                    value={it.quantity}
                    onChange={(e) => setQty(it.id, parseInt(e.target.value || "1", 10))}
                  />
                  <button className={styles.remove} onClick={() => remove(it.id)}>Remove</button>
                </div>
              </div>
              <div />
            </div>
          ))}
        </div>

        <div className={styles.foot}>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className={styles.checkout}>Checkout</button>
          {items.length > 0 && <button className={styles.clear} onClick={clear}>Clear Cart</button>}
        </div>
      </aside>
    </>
  );
}
