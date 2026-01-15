import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useChord } from "../hooks/useChord";

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

export function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const chord = useChord();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track checkout started on mount
  useEffect(() => {
    if (chord && items.length > 0) {
      chord.trackCheckoutStarted({
        checkout: {
          checkoutType: "standard",
          orderId: `order-${Date.now()}`,
          products: items.map((item) => ({
            ...item.product,
            quantity: item.quantity,
          })),
          value: totalPrice,
          shipping: 0,
        },
      });
    }
  }, [chord, items, totalPrice]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (chord) {
      chord.track("Order Completed", {
        order_id: `order-${Date.now()}`,
        total: totalPrice,
        shipping: 0,
        products: items.map((item) => ({
          product_id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          sku: item.product.sku,
          quantity: item.quantity,
        })),
      });
    }

    clearCart();
    navigate("/order-confirmation");
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="checkout-form">
          <section className="form-section">
            <h2>Contact Information</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </section>

          <section className="form-section">
            <h2>Shipping Address</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Payment Information</h2>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </section>

          <button
            type="submit"
            className="place-order-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : `Place Order - $${totalPrice.toFixed(2)}`}
          </button>
        </form>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {items.map((item) => (
              <div key={item.product.id} className="summary-item">
                <img src={item.product.images[0]} alt={item.product.name} />
                <div>
                  <p>{item.product.name}</p>
                  <p className="quantity">Qty: {item.quantity}</p>
                </div>
                <p className="item-total">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="summary-totals">
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
          </div>
        </div>
      </div>
    </div>
  );
}
