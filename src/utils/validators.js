// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (Pakistani format)
export const isValidPhone = (phone) => {
  // Accepts: 03001234567, +923001234567, 03001234567, etc.
  const phoneRegex = /^(\+92|0)?[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Password validation (min 8 chars, at least one uppercase, one lowercase, one number)
export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// URL validation
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Price validation
export const isValidPrice = (price) => {
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  return priceRegex.test(price) && parseFloat(price) > 0;
};

// Address validation
export const isValidAddress = (address) => {
  return address && address.trim().length >= 10 && address.trim().length <= 200;
};
