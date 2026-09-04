import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useProductStore, useCartStore } from '../../store/useStore';
import { getProducts, getCategories } from '../../services/db';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loading from '../../components/Loading/Loading';
import './ProductsPage.css';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setProducts, filteredProducts, categories, setCategories, setSearchQuery, setSelectedCategory, selectedCategory } = useProductStore();
  const { addToCart } = useCartStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await getProducts();
        const categoriesData = await getCategories();
        setProducts(productsData);
        setCategories(categoriesData);

        const searchQuery = searchParams.get('search');
        if (searchQuery) {
          setSearchQuery(searchQuery);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setProducts, setCategories, searchParams, setSearchQuery]);

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

  if (loading) return <Loading fullScreen message="Loading products..." />;

  return (
    <div className="products-page">
      <Navbar />

      <div className="products-container">
        <div className="container">
          <h1 className="page-title">All Products</h1>

          <div className="products-layout">
            {/* Sidebar Filters */}
            <aside className="filters-sidebar">
              <div className="filter-section">
                <h4>Categories</h4>
                <div className="category-filters">
                  <button
                    className={`filter-btn ${!selectedCategory ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Products
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`filter-btn ${selectedCategory === category.name ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="products-main">
              {filteredProducts.length > 0 ? (
                <div className="products-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={() => handleAddToCart(product)}
                      onBuyNow={() => handleBuyNow(product)}
                    />
                  ))}
                </div>
              ) : (
                <div className="no-products">
                  <p>No products found. Try adjusting your filters.</p>
                  <button className="btn btn-primary" onClick={() => setSelectedCategory(null)}>
                    View All Products
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
