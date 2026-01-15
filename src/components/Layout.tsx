import { Link, Outlet } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export function Layout() {
  const { totalItems } = useCart();

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            🌿 Plant Shop
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">
              Shop
            </Link>
            <Link to="/cart" className="nav-link cart-link">
              Cart{" "}
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>
          </nav>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>© 2026 Plant Shop</p>
      </footer>
    </div>
  );
}
