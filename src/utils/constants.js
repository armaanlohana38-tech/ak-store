// Currency
export const CURRENCY = '₨';
export const CURRENCY_CODE = 'PKR';

// Order Status
export const ORDER_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

export const ORDER_STATUS_COLORS = {
  Pending: '#f97316',
  Confirmed: '#3b82f6',
  Processing: '#8b5cf6',
  Shipped: '#06b6d4',
  Delivered: '#10b981',
  Cancelled: '#ef4444',
};

// Payment Methods
export const PAYMENT_METHOD = {
  COD: 'Cash on Delivery',
  ONLINE: 'Online Payment',
};

// Delivery Charges
export const DELIVERY_CHARGES = 199; // PKR
export const FREE_DELIVERY_ABOVE = 2000; // PKR

// Admin Role
export const ADMIN_ROLE = 'admin';
export const CUSTOMER_ROLE = 'customer';

// Routes
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_CONFIRMATION: '/order-confirmation/:orderId',
  LOGIN: '/login',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_ANALYTICS: '/admin/analytics',
};
