import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore, useCartStore } from '../../store/useStore';
import { getProducts, getCategories, subscribeToProducts, subscribeToCategories } from '../../services/db';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loading from '../../components/Loading/Loading';
import { CURRENCY } from '../../utils/constants';
import { ChevronRight, Zap } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { setProducts, products, setCategories, categories, selectedCategory, setSelectedCategory } = useProductStore();
  const { addToCart } = useCartStore();
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await getProducts();
        const categoriesData = await getCategories();
        setProducts(productsData);
        setCategories(categoriesData);
        
        setFeaturedProducts(productsData.filter(p => p.featured).slice(0, 8));
        setLatestProducts(productsData.slice(0, 8));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setProducts, setCategories]);

  const handleAddToCart = (product) => {
    if (product.quantity > 0) {
      addToCart(product, 1);
      alert(`${product.name} added to cart!`);
    }
  };

  const handleBuyNow = (product) => {
    if (product.quantity > 0) {
      addToCart(product, 1);
      navigate('/checkout');
    }
  };

  if (loading) return <Loading fullScreen message="Loading AK Store..." />;

  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to AK Store</h1>
          <p className="hero-subtitle">Your trusted online marketplace in Pakistan</p>
          <button className="btn btn-secondary btn-lg" onClick={() => navigate('/products')}>
            Shop Now <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section py-6">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.slice(0, 6).map((category) => (
              <div
                key={category.id}
                className="category-card"
                onClick={() => {
                  setSelectedCategory(category.name);
                  navigate('/products');
                }}
              >
                <div className="category-icon">📦</div>
                <h5>{category.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="featured-section py-6">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">⭐ Featured Products</h2>
              <button className="view-all-btn" onClick={() => navigate('/products')}>
                View All <ChevronRight size={18} />
              </button>
            </div>
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onBuyNow={() => handleBuyNow(product)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Promo Section */}
      <section className="promo-section py-6">
        <div className="container">
          <div className="promo-card">
            <div className="promo-content">
              <Zap className="promo-icon" size={40} />
              <h3>Limited Time Offers</h3>
              <p>Get up to 50% discount on selected items</p>
              <button className="btn btn-secondary" onClick={() => navigate('/products')}>
                Shop Deals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products */}
      {latestProducts.length > 0 && (
        <section className="latest-section py-6">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">🆕 Latest Arrivals</h2>
              <button className="view-all-btn" onClick={() => navigate('/products')}>
                View All <ChevronRight size={18} />
              </button>
            </div>
            <div className="products-grid">
              {latestProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onBuyNow={() => handleBuyNow(product)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="features-section py-6">
        <div className="container">
          <h2 className="section-title text-center">Why Choose AK Store?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h5>Fast Delivery</h5>
              <p>Quick and reliable delivery across Pakistan</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h5>Secure Payment</h5>
              <p>Safe and encrypted payment options</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h5>Easy Returns</h5>
              <p>Hassle-free returns within 30 days</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h5>24/7 Support</h5>
              <p>Dedicated customer support team</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
