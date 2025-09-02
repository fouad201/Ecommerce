// components/PopularStrip.jsx
import Image from "next/image";
import Link from "next/link";
import styles from "./PopularStrip.module.css";

const tiles = [
  { title: "Popular Products", img: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
  { title: "iPad Pro", img: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg" },
  { title: "Samsung Galaxy", img: "https://fakestoreapi.com/img/81OaXWNfRnL._AC_SX679_.jpg" },
  { title: "Macbook Pro", img: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg" },
];

export default function PopularStrip() {
  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={styles.grid}>
          {tiles.map((t, i) => (
            <div key={i} className={styles.tile}>
              <Image className={styles.media} src={t.img} alt={t.title} width={800} height={600} />
              <div className={styles.tileBody}>
                <h3 className={styles.tileTitle}>{t.title}</h3>
                <p className={styles.tileDesc}>
                  Great performance, multitasking and ease of use.
                </p>
                <Link href="/shop"><button className={styles.cta}>Shop Now</button></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
