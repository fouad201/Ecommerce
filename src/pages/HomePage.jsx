import { useEffect, useState } from "react";
import api from "../lib/api";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard.jsx";
import "./HomePage.css";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setStatus("loading");
        const { data } = await api.get("/products");
        if (mounted) {
          setProducts(data);
          setStatus("idle");
        }
      } catch (e) {
        setStatus("error");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Hero />
      <div className="container">
        <h2>All Products</h2>
        {status === "loading" && <p>Loading products…</p>}
        {status === "error" && <p>Couldn’t load products. Try again.</p>}
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </>
  );
}
