import React from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { CURRENCY } from '../../utils/constants';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, onBuyNow, layout = 'grid' }) => {
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  if (layout === 'cart') {
    return (
      <div className="cart-item card">
        <div className="cart-item-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="cart-item-content">
          <h4>{product.name}</h4>
          <p className="text-sm text-gray-600">{product.category}</p>
          <div className="flex justify-between align-center mt-2">
            <div>
              <p className="font-bold text-primary">
                {CURRENCY} {product.price.toLocaleString()}
              </p>
              {product.oldPrice && (
                <p className="text-sm text-gray-500 line-through">
                  {CURRENCY} {product.oldPrice.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        {discountPercent > 0 && (
          <div className="discount-badge">{discountPercent}% OFF</div>
        )}
        {product.featured && <div className="featured-badge">⭐ Featured</div>}
        <div className="product-overlay">
          <button className="btn btn-primary btn-sm" onClick={onAddToCart}>
            <ShoppingCart size={18} />
            Add to Cart
          </button>
          <button className="btn btn-secondary btn-sm" onClick={onBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
      <div className="product-info">
        <h5 className="product-name">{product.name}</h5>
        <p className="product-category text-sm text-gray-500">
          {product.category}
        </p>
        <div className="product-price-section">
          <div className="price-group">
            <span className="price font-bold text-primary">
              {CURRENCY} {product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="old-price text-gray-500 line-through text-sm">
                {CURRENCY} {product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        {product.quantity <= 5 && product.quantity > 0 && (
          <p className="stock-warning text-sm text-warning">
            Only {product.quantity} left
          </p>
        )}
        {product.quantity === 0 && (
          <p className="text-sm text-danger font-semibold">Out of Stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
