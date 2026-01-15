import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useChord } from "../hooks/useChord";

export function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const chord = useChord();

  // Track cart view on mount
  useEffect(() => {
    if (chord && items.length > 0) {
      chord.trackCartViewed({
        cart: {
          cartId: "cart-001",
          currency: "USD",
          products: items.map((item) => ({
            ...item.product,
            quantity: item.quantity,
          })),
          value: totalPrice,
        },
      });
    }
  }, [chord, items, totalPrice]);

  const handleRemove = (productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    if (item && chord) {
      chord.trackProductRemoved({
        lineItem: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          sku: item.product.sku,
          brand: item.product.brand,
          quantity: item.quantity,
        },
        cart: {},
      });
    }
    removeFromCart(productId);
  };

  if (items.length === 0) {
    return (
      <div className="cart-page empty">
        <h1>Your Cart</h1>
        <p>Your cart is empty</p>
        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.product.id} className="cart-item">
              <img src={item.product.images[0]} alt={item.product.name} />
              <div className="cart-item-info">
                <h3>{item.product.name}</h3>
                <p className="cart-item-brand">{item.product.brand}</p>
                <p className="cart-item-price">
                  ${item.product.price.toFixed(2)}
                </p>
              </div>
              <div className="cart-item-quantity">
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.product.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
