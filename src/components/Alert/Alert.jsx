import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import './Alert.css';

const Alert = ({ type = 'info', title, message, onClose }) => {
  const icons = {
    error: <AlertCircle size={20} />,
    success: <CheckCircle size={20} />,
    info: <Info size={20} />,
    warning: <AlertTriangle size={20} />,
  };

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-icon">{icons[type]}</div>
      <div className="alert-content">
        {title && <h5 className="alert-title">{title}</h5>}
        {message && <p className="alert-message">{message}</p>}
      </div>
      {onClose && (
        <button className="alert-close" onClick={onClose}>×</button>
      )}
    </div>
  );
};

export default Alert;
