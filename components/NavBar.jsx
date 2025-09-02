"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch, FiHeart, FiUser, FiMenu, FiX } from "react-icons/fi";
import CartButton from "./CartButton";
import CartDrawer from "./CartDrawer";
import styles from "./NavBar.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q");
    window.location.href = `/shop?q=${encodeURIComponent(q || "")}`;
  }

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.row}`}>
          {/* Brand */}
          <Link href="/" className={styles.brand}>cyber</Link>

          {/* Search (desktop) */}
          <div className={styles.search}>
            <form onSubmit={onSubmit}>
              <FiSearch aria-hidden />
              <input name="q" placeholder="Search" />
              <button type="submit">Search</button>
            </form>
          </div>

          {/* Nav links (desktop) */}
          <nav className={styles.nav} aria-label="Main">
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`${styles.link} ${pathname === l.href ? styles.active : ""}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.iconBtn} aria-label="Wishlist"><FiHeart /></button>
            <CartButton onClick={() => setCartOpen(true)} />
            
            {/* تعديل هنا: حطيت Link بدل button */}
            <Link href="/login" className={styles.iconBtn} aria-label="Account">
              <FiUser />
            </Link>

            <button
              className={`${styles.iconBtn} ${styles.menuBtn}`}
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        <div className={`${styles.mobilePanel} ${open ? styles.mobileOpen : ""}`}>
          <div className="container">
            <div className={styles.mobileInner}>
              <div className={`${styles.mobileSearch} ${styles.search}`}>
                <form onSubmit={onSubmit}>
                  <FiSearch aria-hidden />
                  <input name="q" placeholder="Search products" />
                  <button type="submit">Search</button>
                </form>
              </div>
              <nav className={styles.mobileNav} aria-label="Mobile">
                <ul>
                  {navLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className={`${styles.link} ${pathname === l.href ? styles.active : ""}`}
                        onClick={() => setOpen(false)}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
