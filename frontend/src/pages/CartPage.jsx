import { Link } from 'react-router-dom';
import StatusMessage from '../components/StatusMessage.jsx';
import { useCart } from '../context/CartContext.jsx';
import { calculateItemSubtotal } from '../utils/cart.js';

export default function CartPage() {
  const { cart, total, itemCount, cartMessage, setQuantity, removeFromCart } = useCart();

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">YOUR ORDER</p><h1>Shopping cart</h1></div>
      <StatusMessage type={cartMessage.startsWith('Only') ? 'error' : 'info'}>{cartMessage}</StatusMessage>
      {cart.length === 0 ? (
        <div className="empty-state"><h2>Your cart is empty</h2><Link className="button" to="/">Browse products</Link></div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.productId}>
                <div><h2>{item.name}</h2><p>₱{item.price.toLocaleString('en-PH')} each</p></div>
                <div className="quantity-field">
                  <span>Quantity</span>
                  <div className="quantity-control">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => setQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.quantity}
                      aria-label={`Quantity of ${item.name}`}
                      onChange={(event) => setQuantity(item.productId, Number(event.target.value))}
                    />
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => setQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                  {item.quantity >= item.stock && <small className="stock-note">Max {item.stock} in stock</small>}
                </div>
                <strong>₱{calculateItemSubtotal(item).toLocaleString('en-PH')}</strong>
                <button className="danger" onClick={() => removeFromCart(item.productId)}>Remove</button>
              </article>
            ))}
          </div>
          <aside className="summary">
            <h2>Order summary</h2>
            <p><span>Items</span><strong>{itemCount}</strong></p>
            <p className="summary-total"><span>Total</span><strong>₱{total.toLocaleString('en-PH')}</strong></p>
            <Link className="button full" to="/checkout">Proceed to checkout</Link>
          </aside>
        </div>
      )}
    </section>
  );
}
