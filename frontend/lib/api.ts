import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add userId to headers if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const userId = localStorage.getItem('weverse-user-id');
    if (userId) {
      config.headers['x-user-id'] = userId;
    }
  }
  return config;
});

export const productsAPI = {
  getAll: (category?: string) =>
    api.get('/api/products', { params: category ? { category } : {} }),
  getById: (id: string) => api.get(`/api/products/${id}`),
};

export const authAPI = {
  register: (email: string, password: string, name: string) =>
    api.post('/api/auth/register', { email, password, name }),
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  getMe: () => api.get('/api/auth/me'),
};

export const cartAPI = {
  getCart: () => api.get('/api/cart'),
  addToCart: (productId: string, quantity: number, size: string) =>
    api.post('/api/cart', { productId, quantity, size }),
  removeFromCart: (itemId: string) => api.delete(`/api/cart/${itemId}`),
};

export const checkoutAPI = {
  checkout: (shippingInfo: any, paymentMethod: string) =>
    api.post('/api/checkout', { shippingInfo, paymentMethod }),
};

export default api;
