import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ChordProvider } from "./contexts/ChordProvider";
import { CartProvider } from "./contexts/CartContext";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ChordProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="products/:id" element={<ProductPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </ChordProvider>
    </BrowserRouter>
  );
}

export default App;
