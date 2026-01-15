import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { products } from "../data/products";
import { useChord } from "../hooks/useChord";
import { useCart } from "../contexts/CartContext";

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const chord = useChord();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  // Track product view on mount
  useEffect(() => {
    if (chord && product) {
      chord.trackProductViewed({
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
          variantId: product.sku,
        },
        cart: {},
      });
    }
  }, [chord, product]);

  if (!product) {
    return (
      <div className="not-found">
        <h1>Product Not Found</h1>
        <Link to="/">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    if (chord) {
      chord.trackProductAdded({
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
          variantId: product.sku,
        },
        cart: {},
      });
    }
  };

  return (
    <div className="product-page">
      <Link to="/" className="back-link">
        ← Back to Shop
      </Link>
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.images[0]} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <span className="product-brand">{product.brand}</span>
          <h1>{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-categories">
            {product.categories.map((category) => (
              <span key={category} className="category-tag">
                {category}
              </span>
            ))}
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
