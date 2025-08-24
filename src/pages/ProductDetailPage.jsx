import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../state/CartContext";
import api from "../lib/api";
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { add } = useCart();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | error | success

  useEffect(() => {
    let mounted = true;

    async function loadProduct() {
      try {
        setStatus("loading");
        const { data } = await api.get(`/products/${id}`);
        if (mounted) {
          setProduct(data);
          setStatus("success");
        }
      } catch (error) {
        if (mounted) setStatus("error");
      }
    }

    loadProduct();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <div className="container">
        <div className="product-detail-skeleton">
          Loading product details...
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container">
        <div className="error-message">
          Failed to load product details. Please try again.
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container">
      <div className="product-detail">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <div className="category">{product.category}</div>
          <div className="price">${product.price.toFixed(2)}</div>
          <p className="description">{product.description}</p>
          <button className="btn" onClick={() => add(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
