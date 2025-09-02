// components/ShopFilters.jsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./ShopFilters.module.css";

export default function ShopFilters({ categories = [] }) {
  const router = useRouter();
  const sp = useSearchParams();

  const init = {
    q: sp.get("q") || "",
    category: sp.get("category") || "",
    min: sp.get("min") || "",
    max: sp.get("max") || "",
  };

  function apply(formData) {
    const q = formData.get("q")?.trim() || "";
    const category = formData.get("category") || "";
    const min = formData.get("min") || "";
    const max = formData.get("max") || "";

    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (category) p.set("category", category);
    if (min) p.set("min", min);
    if (max) p.set("max", max);
    p.set("page", "1"); // reset page

    router.push(`/shop?${p.toString()}`);
  }

  function onSubmit(e) {
    e.preventDefault();
    apply(new FormData(e.currentTarget));
  }

  function clear() {
    router.push("/shop");
  }

  return (
    <div className={styles.wrap}>
      <form onSubmit={onSubmit} className={styles.row}>
        <div>
          <div className={styles.label}>Search</div>
          <input name="q" defaultValue={init.q} placeholder="Search products" className={styles.input}/>
        </div>

        <div>
          <div className={styles.label}>Category</div>
          <select name="category" defaultValue={init.category} className={styles.select}>
            <option value="">All</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <div className={styles.label}>Price Min</div>
          <input name="min" type="number" step="0.01" defaultValue={init.min} className={styles.input}/>
        </div>

        <div>
          <div className={styles.label}>Price Max</div>
          <input name="max" type="number" step="0.01" defaultValue={init.max} className={styles.input}/>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={`${styles.btn} ${styles.primary}`}>Apply</button>
          <button type="button" onClick={clear} className={`${styles.btn} ${styles.ghost}`}>Reset</button>
        </div>
      </form>
    </div>
  );
}
