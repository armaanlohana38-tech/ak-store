import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useStore';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CURRENCY, DELIVERY_CHARGES, FREE_DELIVERY_ABOVE } from '../../utils/constants';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_CHARGES;
  const total = subtotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <Navbar />
        <div className="empty-cart">
          <div className="container">
            <div className="empty-state">
              <div className="empty-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Start shopping to add items to your cart</p>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/products')}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Navbar />

      <div className="cart-container">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>

          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items-section">
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="cart-item-details">
                      <h5
                        className="cart-item-name"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        {item.name}
                      </h5>
                      <p className="cart-item-category">{item.category}</p>
                      <p className="cart-item-price">
                        {CURRENCY} {item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="cart-item-quantity">
                      <label>Qty:</label>
                      <div className="qty-controls-cart">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="qty-btn-cart"
                        >
                          <Minus size={16} />
                        </button>
                        <input type="number" value={item.quantity} readOnly />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="qty-btn-cart"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-subtotal">
                      <div className="subtotal-value">
                        {CURRENCY} {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>

                <div className="summary-row">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>{CURRENCY} {subtotal.toLocaleString()}</span>
                </div>

                <div className="summary-row">
                  <span>Delivery Charges</span>
                  <span>
                    {deliveryCharge === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      `${CURRENCY} ${deliveryCharge.toLocaleString()}`
                    )}
                  </span>
                </div>

                {deliveryCharge === 0 && (
                  <p className="free-delivery-msg">✓ Free delivery on this order</p>
                )}

                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Total</span>
                  <span>{CURRENCY} {total.toLocaleString()}</span>
                </div>

                <button className="btn btn-primary btn-lg btn-block" onClick={() => navigate('/checkout')}>
                  Proceed to Checkout
                </button>

                <button
                  className="btn btn-outline btn-block mt-2"
                  onClick={() => navigate('/products')}
                >
                  Continue Shopping
                </button>

                <button className="btn btn-danger btn-sm btn-block mt-2" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
