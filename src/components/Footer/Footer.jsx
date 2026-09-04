import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* About */}
            <div className="footer-section">
              <h4>About AK Store</h4>
              <p>
                Your trusted online marketplace for quality products. We bring the
                best shopping experience to Pakistan.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <Facebook size={20} />
                </a>
                <a href="#" className="social-link">
                  <Twitter size={20} />
                </a>
                <a href="#" className="social-link">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <button onClick={() => navigate('/')}>Home</button>
                </li>
                <li>
                  <button onClick={() => navigate('/products')}>Products</button>
                </li>
                <li>
                  <button onClick={() => navigate('/cart')}>Cart</button>
                </li>
                <li>
                  <button onClick={() => navigate('/login')}>Login</button>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-section">
              <h4>Customer Service</h4>
              <ul className="footer-links">
                <li>
                  <button>About Us</button>
                </li>
                <li>
                  <button>Contact Us</button>
                </li>
                <li>
                  <button>Privacy Policy</button>
                </li>
                <li>
                  <button>Terms & Conditions</button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-section">
              <h4>Contact Us</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <Phone size={18} />
                  <span>+92 300 1234567</span>
                </div>
                <div className="contact-item">
                  <Mail size={18} />
                  <span>info@akstore.com</span>
                </div>
                <div className="contact-item">
                  <MapPin size={18} />
                  <span>Karachi, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <p>&copy; {currentYear} AK Store. All rights reserved.</p>
            <p>Made with ❤️ for Pakistan</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
