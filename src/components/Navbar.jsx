import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../state/CartContext.jsx";
import { useAuth } from "../state/AuthContext.jsx";
import "./Navbar.css"; //

export default function Navbar() {
  const { cart } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav className="nav">
      <div className="row">
        <Link to="/" className="brand">
          <img src="/src/assets/logo.svg" alt="ShopStyle Logo" />
          <span>ShopStyle</span>
        </Link>
        <Link to="/cart" className="cart-link">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 5L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Cart</span>
          {cart.length > 0 && <span className="badge">{cart.length}</span>}
        </Link>
      </div>
      <div className="row">
        {isLoggedIn ? (
          <>
            <span className="small">Logged in</span>
            <button
              className="btn"
              onClick={() => {
                logout();
                nav("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
