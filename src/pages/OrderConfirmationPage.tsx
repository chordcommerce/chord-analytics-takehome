import { Link } from "react-router-dom";

export function OrderConfirmationPage() {
  return (
    <div className="confirmation-page">
      <div className="confirmation-content">
        <div className="confirmation-icon">✓</div>
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been placed successfully.</p>
        <p className="order-number">
          Order #: {Math.random().toString(36).substring(2, 10).toUpperCase()}
        </p>
        <p>You will receive an email confirmation shortly.</p>
        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
