// components/Footer.jsx
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <div className={styles.brand}>cyber</div>
            <p>We are a modern tech store located on the internet. Our boutique studio offers more than that.</p>
          </div>
          <div>
            <div className={styles.h}>Services</div>
            <Link href="#" className={styles.link}>Bonus program</Link>
            <Link href="#" className={styles.link}>Gift cards</Link>
            <Link href="#" className={styles.link}>Service contracts</Link>
            <Link href="#" className={styles.link}>Payment</Link>
          </div>
          <div>
            <div className={styles.h}>Assistance to the buyer</div>
            <Link href="#" className={styles.link}>Find an order</Link>
            <Link href="#" className={styles.link}>Terms of delivery</Link>
            <Link href="#" className={styles.link}>Guarantee</Link>
            <Link href="#" className={styles.link}>FAQ</Link>
          </div>
          <div>
            <div className={styles.h}>Company</div>
            <Link href="/about" className={styles.link}>About us</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
            <Link href="/blog" className={styles.link}>Blog</Link>
          </div>
        </div>
        <div className={styles.copy}>© {new Date().getFullYear()} Cyber Store. All rights reserved.</div>
      </div>
    </footer>
  );
}
