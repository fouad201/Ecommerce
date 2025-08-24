import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api";
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    }
    loadProduct();
  }, [id]);

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
          <div className="price">${product.price}</div>
          <p className="description">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
