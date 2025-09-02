// components/DiscountsSection.jsx
import ProductCard from "./ProductCard";
import styles from "./DiscountsSection.module.css";

export default function DiscountsSection({ products = [] }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.headerRow}>
          <h2 className={styles.hTitle}>Discounts up to 50%</h2>
          <span className={styles.badge}>Limited time</span>
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
