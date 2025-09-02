// components/Pagination.jsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Pagination.module.css";

export default function Pagination({ total, perPage = 12 }) {
  const router = useRouter();
  const sp = useSearchParams();
  const current = Math.max(1, parseInt(sp.get("page") || "1", 10));
  const pages = Math.max(1, Math.ceil(total / perPage));

  if (pages <= 1) return null;

  function go(p) {
    const params = new URLSearchParams(sp.toString());
    params.set("page", String(p));
    router.push(`/shop?${params.toString()}`);
  }

  const items = [];
  for (let i = 1; i <= pages; i++) {
    items.push(
      <button key={i}
        onClick={() => go(i)}
        className={`${styles.page} ${i === current ? styles.active : ""}`}
      >
        {i}
      </button>
    );
  }

  return <div className={styles.wrap}>{items}</div>;
}
