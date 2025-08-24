import { useCart } from "../state/CartContext.jsx";
import "./CartPage.css"; 


export default function CartPage() {
  const { cart, total, setQty, remove, clear } = useCart();

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="card">
              <div className="line">
                <div className="row">
                  <img src={item.image} alt={item.title} style={{ width: 60, height: 60, objectFit: "contain" }} />
                  <div>
                    <div>{item.title}</div>
                    <div className="small">${item.price.toFixed(2)}</div>
                  </div>
                </div>
                <div className="row">
                  <input
                    className="input"
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => setQty(item.id, Number(e.target.value))}
                    style={{ width: 80 }}
                  />
                  <button className="btn" onClick={() => remove(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}

          <div className="line" style={{ marginTop: 16 }}>
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn" onClick={clear}>Clear Cart</button>
            <button className="btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
