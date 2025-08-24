import { Link } from "react-router-dom";
import { useCart } from "../state/CartContext.jsx";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { add } = useCart();
  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <h3 title={product.title}>{product.title}</h3>
      </Link>
      <div className="small">{product.category}</div>
      <div className="price">${product.price.toFixed(2)}</div>
      <button className="btn" onClick={() => add(product)}>
        Add to Cart
      </button>
    </div>
  );
}
