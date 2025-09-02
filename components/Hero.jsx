"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import styles from "./Hero.module.css";

/**
 * Hero Carousel (infinite loop + autoplay) — مفاتيح فريدة وميمو
 */
export default function Hero({ products = [], intervalMs = 2800 }) {
  // memoized arrays
  const base = useMemo(
    () => (Array.isArray(products) ? products.slice(0, 6) : []),
    [products]
  );
  const extended = useMemo(
    () => (base.length > 1 ? [base[base.length - 1], ...base, base[0]] : base),
    [base]
  );

  const trackRef = useRef(null);
  const paused = useRef(false);

  // نبدأ من أول سلايد حقيقي
  const [index, setIndex] = useState(base.length > 1 ? 1 : 0);
  const [animate, setAnimate] = useState(true);

  // لو طول الـ base اتغير، ارجع لأول سلايد حقيقي
  useEffect(() => {
    setIndex(base.length > 1 ? 1 : 0);
  }, [base.length]);

  // Autoplay
  useEffect(() => {
    if (extended.length <= 1) return;
    const id = setInterval(() => {
      if (!paused.current) setIndex((i) => i + 1);
    }, intervalMs);
    return () => clearInterval(id);
  }, [extended.length, intervalMs]);

  // تحريك المسار
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = animate ? "transform .55s ease" : "none";
    el.style.transform = `translateX(-${index * 100}%)`;
  }, [index, animate]);

  // معالجة اللوب عند الانتقال لنهاية/بداية الـ clones
  useEffect(() => {
    const el = trackRef.current;
    if (!el || extended.length <= 1) return;

    const onEnd = () => {
      if (index === 0) {
        setAnimate(false);
        setIndex(extended.length - 2); // آخر سلايد حقيقي
      } else if (index === extended.length - 1) {
        setAnimate(false);
        setIndex(1); // أول سلايد حقيقي
      }
    };
    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [index, extended.length]);

  // إعادة تفعيل transition بعد القفزة الفورية
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  const onEnter = () => {
    paused.current = true;
  };
  const onLeave = () => {
    paused.current = false;
  };

  const short = (t) => (t && t.length > 220 ? t.slice(0, 217) + "..." : t || "");
  const hasNav = base.length > 1;

  return (
    <section className={styles.hero} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="container">
        <div className={styles.carousel}>
          {hasNav && (
            <>
              <button
                className={`${styles.arrow} ${styles.prev}`}
                onClick={() => setIndex((i) => i - 1)}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                className={`${styles.arrow} ${styles.next}`}
                onClick={() => setIndex((i) => i + 1)}
                aria-label="Next"
              >
                ›
              </button>
            </>
          )}

          <div className={styles.track} ref={trackRef}>
            {(extended.length ? extended : [{}]).map((p, i) => (
              <div key={`slide-${i}-${p.id ?? "x"}`} className={styles.slide}>
                {/* LEFT */}
                <div className={styles.left}>
                  <div className={styles.kicker}>{p.category || "product"}</div>
                  <h1 className={styles.h1}>{p.title || "Featured product"}</h1>
                  <div className={styles.desc}>{short(p.description)}</div>
                  {typeof p.price === "number" && <div className={styles.price}>${p.price}</div>}
                  <div className={styles.ctaRow}>
                    {p.id ? (
                      <>
                        <Link href={`/product/${p.id}`}>
                          <button className={styles.btn}>Shop Now</button>
                        </Link>
                        <AddToCartButton
                          product={{ id: p.id, title: p.title, price: p.price, image: p.image }}
                          className={styles.btnGhost}
                        >
                          Add to Cart
                        </AddToCartButton>
                      </>
                    ) : (
                      <Link href="/shop">
                        <button className={styles.btn}>Shop Now</button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className={styles.right}>
                  {p.image ? (
                    <Image
                      className={styles.phone}
                      src={p.image}
                      alt={p.title || "product"}
                      width={900}
                      height={900}
                      priority={i === 1}
                    />
                  ) : (
                    <div className={styles.phone} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {hasNav && (
          <div className={styles.dots}>
            {base.map((_, i) => (
              <span
                key={`dot-${i}`}
                className={`${styles.dot} ${i + 1 === index ? styles.dotActive : ""}`}
                onClick={() => setIndex(i + 1)}
                aria-hidden
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
