import React from 'react';
import './Header.css';

const Header = ({ title, subtitle, children }) => {
  return (
    <div className="page-header">
      <div className="container">
        <h1 className="header-title">{title}</h1>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

export default Header;
