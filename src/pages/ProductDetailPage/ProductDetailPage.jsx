import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartStore, useProductStore } from '../../store/useStore';
import { getProductById } from '../../services/db';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import { ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { CURRENCY } from '../../utils/constants';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.quantity > 0) {
      addToCart(product, quantity);
      alert(`${quantity} x ${product.name} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product && product.quantity > 0) {
      addToCart(product, quantity);
      navigate('/checkout');
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.quantity) setQuantity(quantity + 1);
  };

  if (loading) return <Loading fullScreen message="Loading product..." />;
  if (!product) return <Loading fullScreen message="Product not found" />;

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="product-detail-page">
      <Navbar />

      <div className="product-detail-container">
        <div className="container">
          <div className="breadcrumb">
            <button onClick={() => navigate('/')}>Home</button>
            <span>/</span>
            <button onClick={() => navigate('/products')}>{product.category}</button>
            <span>/</span>
            <span>{product.name}</span>
          </div>

          <div className="product-detail-content">
            {/* Product Image */}
            <div className="product-image-section">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image-large" />
                {discountPercent > 0 && (
                  <div className="discount-badge-large">{discountPercent}% OFF</div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info-section">
              <div className="product-header">
                <h1>{product.name}</h1>
                <p className="product-category">{product.category}</p>
              </div>

              {/* Price Section */}
              <div className="price-section">
                <div className="price-display">
                  <span className="current-price">
                    {CURRENCY} {product.price.toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <span className="old-price">
                      {CURRENCY} {product.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {discountPercent > 0 && (
                  <span className="discount-text">Save {CURRENCY} {(product.oldPrice - product.price).toLocaleString()}</span>
                )}
              </div>

              {/* Stock Status */}
              <div className="stock-section">
                {product.quantity > 0 ? (
                  <p className="stock-available">
                    ✓ In Stock ({product.quantity} available)
                  </p>
                ) : (
                  <p className="stock-unavailable">✕ Out of Stock</p>
                )}
              </div>

              {/* Description */}
              <div className="description-section">
                <h4>Product Details</h4>
                <p>{product.description}</p>
              </div>

              {/* Quantity Selector */}
              {product.quantity > 0 && (
                <div className="quantity-section">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button className="qty-btn" onClick={decreaseQuantity}>
                      <Minus size={18} />
                    </button>
                    <input type="number" value={quantity} readOnly className="qty-input" />
                    <button className="qty-btn" onClick={increaseQuantity}>
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="action-buttons">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleAddToCart}
                  disabled={product.quantity === 0}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  className="btn btn-secondary btn-lg"
                  onClick={handleBuyNow}
                  disabled={product.quantity === 0}
                >
                  Buy Now
                </button>
                <button className="btn btn-outline btn-lg">
                  <Heart size={20} />
                  Wishlist
                </button>
              </div>

              {/* Additional Info */}
              <div className="additional-info">
                <div className="info-item">
                  <span className="info-label">Category:</span>
                  <span className="info-value">{product.category}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">SKU:</span>
                  <span className="info-value">{product.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
