import { create } from 'zustand';

// Cart Store
export const useCartStore = create((set, get) => ({
  cart: [],
  cartTotal: 0,

  // Add product to cart
  addToCart: (product, quantity = 1) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      let newCart;

      if (existingItem) {
        newCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...state.cart, { ...product, quantity }];
      }

      return { cart: newCart };
    });
  },

  // Remove product from cart
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    }));
  },

  // Update quantity
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }

    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  // Clear cart
  clearCart: () => {
    set({ cart: [] });
  },

  // Get cart subtotal
  getSubtotal: () => {
    const state = get();
    return state.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  // Get cart item count
  getItemCount: () => {
    const state = get();
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  },
}));

// Auth Store
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  loading: true,

  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin' || false,
      loading: false,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      loading: false,
    });
  },

  setLoading: (loading) => {
    set({ loading });
  },
}));

// Products Store
export const useProductStore = create((set, get) => ({
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  loading: false,
  error: null,

  setProducts: (products) => {
    set({ products });
    get().filterProducts();
  },

  setCategories: (categories) => {
    set({ categories });
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().filterProducts();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().filterProducts();
  },

  filterProducts: () => {
    const state = get();
    let filtered = state.products.filter((p) => p.enabled !== false);

    // Filter by category
    if (state.selectedCategory) {
      filtered = filtered.filter(
        (p) => p.category === state.selectedCategory
      );
    }

    // Filter by search query
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    set({ filteredProducts: filtered });
  },

  getProductById: (id) => {
    return get().products.find((p) => p.id === id);
  },

  setLoading: (loading) => {
    set({ loading });
  },

  setError: (error) => {
    set({ error });
  },
}));

// Orders Store
export const useOrderStore = create((set, get) => ({
  orders: [],
  filteredOrders: [],
  selectedOrder: null,
  statusFilter: null,
  searchQuery: '',
  loading: false,

  setOrders: (orders) => {
    set({ orders });
    get().filterOrders();
  },

  setSelectedOrder: (order) => {
    set({ selectedOrder: order });
  },

  setStatusFilter: (status) => {
    set({ statusFilter: status });
    get().filterOrders();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().filterOrders();
  },

  filterOrders: () => {
    const state = get();
    let filtered = [...state.orders];

    // Filter by status
    if (state.statusFilter) {
      filtered = filtered.filter((o) => o.status === state.statusFilter);
    }

    // Filter by search (Order ID or customer name)
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.id.toLowerCase().includes(query) ||
          o.customerName.toLowerCase().includes(query) ||
          o.customerPhone.includes(query)
      );
    }

    set({ filteredOrders: filtered });
  },

  getOrderById: (id) => {
    return get().orders.find((o) => o.id === id);
  },

  setLoading: (loading) => {
    set({ loading });
  },
}));

// UI Store
export const useUIStore = create((set) => ({
  sidebarOpen: false,
  mobileMenuOpen: false,
  notifications: [],

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  toggleMobileMenu: () => {
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }));
  },

  closeMobileMenu: () => {
    set({ mobileMenuOpen: false });
  },

  closeSidebar: () => {
    set({ sidebarOpen: false });
  },
}));
