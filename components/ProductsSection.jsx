// components/ProductsSection.jsx
import ProductCard from "./ProductCard";
import styles from "./ProductsSection.module.css";

export default function ProductsSection({ title = "New Arrival", products = [] }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.tabs}>
          <div className={`${styles.tab} ${styles.tabActive}`}>{title}</div>
          <div className={styles.tab} aria-hidden>Bestseller</div>
          <div className={styles.tab} aria-hidden>Featured Products</div>
        </div>
        <div className={styles.grid}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
