import { Link } from "react-router-dom";
import { useEffect } from "react";
import { products } from "../data/products";
import { useChord } from "../hooks/useChord";

export function HomePage() {
  const chord = useChord();

  useEffect(() => {
    if (chord) {
      chord.page();
    }
  }, [chord]);

  const handleProductClick = (product: (typeof products)[0]) => {
    if (chord) {
      chord.trackProductClicked({
        product: {
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            sku: product.sku,
            brand: product.brand,
            categories: product.categories,
            description: product.description,
            images: product.images,
          },
          quantity: 1,
          variantId: product.id,
        },
        cart: {},
      });
    }
  };

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Plant Shop</h1>
      </section>

      <section className="products-section">
        <h2>Featured Plants</h2>
        <div className="products-grid">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-image">
                <img src={product.images[0]} alt={product.name} />
              </div>
              <div className="product-info">
                <span className="product-brand">{product.brand}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
