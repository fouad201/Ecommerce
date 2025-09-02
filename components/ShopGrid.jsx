// components/ShopGrid.jsx
import ProductCard from "./ProductCard";
import styles from "./ShopGrid.module.css";

export default function ShopGrid({ products = [] }) {
  return (
    <>
      <div className={styles.count}>{products.length} product(s) found</div>
      <div className={styles.grid}>
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
