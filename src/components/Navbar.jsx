import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../state/CartContext";
import { useAuth } from "../state/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { cart } = useCart();
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="nav">
      {/* Left side - Logo + Cart */}
      <div className="nav-left">
        <Link to="/" className="brand">
          <img src="/favicon.svg" alt="Luxify Logo" />
          <span>Luxify</span>
        </Link>

        <Link to="/cart" className="cart-btn">
          <ShoppingCart className="cart-icon" />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          <span className="cart-text">Cart</span>
        </Link>
      </div>

      {/* Right side - Auth */}
      <div className="nav-right">
        {isLoggedIn ? (
          <button className="btn logout-btn" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
