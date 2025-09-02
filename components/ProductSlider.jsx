// components/ProductSlider.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import styles from "./ProductSlider.module.css";

/**
 * سلايدر منتجات أوتوماتيك
 * - Responsive: 1/2/3/4 per view
 * - Auto slide بالصفحات (page = مجموعة عناصر حسب perView)
 * - إيقاف مؤقت عند hover أو لما التبويب مش نشط
 */
export default function ProductSlider({ products = [], title = "Trending Now", intervalMs = 4000 }) {
  const viewportRef = useRef(null);
  const [perView, setPerView] = useState(4);
  const [viewportW, setViewportW] = useState(0);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const pages = useMemo(() => {
    const pv = Math.max(1, perView);
    return Math.max(1, Math.ceil(products.length / pv));
  }, [products.length, perView]);

  // تعيين perView حسب عرض الشاشة
  useEffect(() => {
    function calc() {
      const w = viewportRef.current?.clientWidth || window.innerWidth;
      setViewportW(w);
      if (w < 540) setPerView(1);
      else if (w < 800) setPerView(2);
      else if (w < 1100) setPerView(3);
      else setPerView(4);
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Auto slide
  useEffect(() => {
    if (pages <= 1) return;
    if (paused) return;

    const id = setInterval(() => {
      setPage((p) => (p + 1) % pages);
    }, intervalMs);

    return () => clearInterval(id);
  }, [pages, paused, intervalMs]);

  // Scroll عند تغيير الصفحة
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    vp.scrollTo({ left: page * viewportW, behavior: "smooth" });
  }, [page, viewportW]);

  // إيقاف/تشغيل مع تبويب المتصفح
  useEffect(() => {
    function onVis() { setPaused(document.hidden); }
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const slideW = useMemo(() => {
    // لو عايز تحسب مساحة الفجوة: 12px * (perView - 1)
    const gap = 12;
    return Math.max(120, (viewportW - gap * (perView - 1)) / perView);
  }, [viewportW, perView]);

  function prev() { setPage((p) => (p - 1 + pages) % pages); }
  function next() { setPage((p) => (p + 1) % pages); }

  // لو أقل من صفحة كاملة، نخفي الأسهم والنقاط
  const showNav = pages > 1;

  return (
    <section className={styles.wrap}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <div className={styles.head}>
          <h2 className={styles.title}>{title}</h2>
          {showNav && (
            <div className={styles.nav}>
              <button className={styles.arrow} onClick={prev} aria-label="Previous">‹</button>
              <button className={styles.arrow} onClick={next} aria-label="Next">›</button>
            </div>
          )}
        </div>

        <div className={styles.viewport} ref={viewportRef}>
          <div className={styles.track} style={{ width: "max-content" }}>
            {products.map((p) => (
              <article key={p.id} className={styles.slide} style={{ width: slideW }}>
                <Link href={`/product/${p.id}`}>
                  <div className={styles.thumb}>
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={400}
                      height={400}
                      style={{ objectFit: "contain", width: "100%", height: "100%" }}
                    />
                  </div>
                </Link>
                <div className={styles.title2}>{p.title}</div>
                <div className={styles.row}>
                  <div className={styles.price}>${p.price}</div>
                  <AddToCartButton
                    product={{ id: p.id, title: p.title, price: p.price, image: p.image }}
                    className={styles.btn}
                  >
                    Add
                  </AddToCartButton>
                </div>
              </article>
            ))}
          </div>
        </div>

        {showNav && (
          <div className={styles.dots} aria-hidden>
            {Array.from({ length: pages }).map((_, i) => (
              <span key={i} className={`${styles.dot} ${i === page ? styles.dotActive : ""}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
