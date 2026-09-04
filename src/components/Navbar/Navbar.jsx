import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore, useAuthStore, useUIStore } from '../../store/useStore';
import { logoutUser } from '../../services/auth';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCartStore();
  const { user, isAuthenticated, isAdmin } = useAuthStore();
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      closeMobileMenu();
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
      closeMobileMenu();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate('/')}>
          <div className="logo-icon">AK</div>
          <span>AK Store</span>
        </div>

        {/* Search Bar - Desktop */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <Search size={20} />
          </button>
        </form>

        {/* Right Actions */}
        <div className="navbar-actions">
          {isAuthenticated && !isAdmin && (
            <div className="user-info">
              <span>Welcome, {user?.displayName || 'User'}</span>
            </div>
          )}

          {isAdmin && (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                navigate('/admin/dashboard');
                closeMobileMenu();
              }}
            >
              Admin Panel
            </button>
          )}

          {!isAdmin && (
            <button
              className="cart-btn"
              onClick={() => {
                navigate('/cart');
                closeMobileMenu();
              }}
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
          )}

          {isAuthenticated ? (
            <button className="btn btn-sm btn-danger" onClick={handleLogout}>
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                navigate('/login');
                closeMobileMenu();
              }}
            >
              Login
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mobile-search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <Search size={20} />
          </button>
        </form>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <button
            className="mobile-menu-item"
            onClick={() => {
              navigate('/');
              closeMobileMenu();
            }}
          >
            Home
          </button>
          <button
            className="mobile-menu-item"
            onClick={() => {
              navigate('/products');
              closeMobileMenu();
            }}
          >
            All Products
          </button>
          <button
            className="mobile-menu-item"
            onClick={() => {
              navigate('/cart');
              closeMobileMenu();
            }}
          >
            Cart ({cartItemCount})
          </button>
          {isAuthenticated && (
            <button
              className="mobile-menu-item text-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
