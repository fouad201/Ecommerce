// components/ProductCard.jsx
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import styles from "./ProductCard.module.css";

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 .001 3.999A2 2 0 0 0 17 18ZM6.3 5l-.3-2H3v2h1.6l2.1 10.4A2 2 0 0 0 8.7 17h8.9a2 2 0 0 0 1.96-1.6L21 7H7.1l-.2-1.1L6.3 5Zm13 2-1.3 6.5a.5.5 0 0 1-.5.4H8.7a.5.5 0 0 1-.49-.4L7.2 7H19.3Z"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0-2a8 8 0 1 0 5.29 14.03l4.84 4.84 1.41-1.41-4.84-4.84A8 8 0 0 0 10 2Z"/>
    </svg>
  );
}

export default function ProductCard({ product }) {
  const { id, title, price, image } = product;

  return (
    <article className={styles.card}>
      <Link href={`/product/${id}`} className={styles.thumbWrap}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </Link>

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.price}>{`$${price}`}</div>

      <div className={styles.actions}>
        <AddToCartButton product={{ id, title, price, image }} className={styles.btn}>
          <span className={styles.btnContent}>
            <CartIcon />
            Add to Cart
          </span>
        </AddToCartButton>

        <Link href={`/product/${id}`} className={styles.secondaryBtn}>
          <span className={styles.btnContent}>
            <SearchIcon />
            Product Details
          </span>
        </Link>
      </div>
    </article>
  );
}
