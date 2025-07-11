import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // або show message
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (data: { email: string; password: string; name: string }) => {
  return API.post("/auth/register", data);
};

export const loginUser = async (data: { email: string; password: string }) => {
  return API.post("/auth/login", data);
};

export const getProducts = (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.append(key, String(value));
    }
  });

  return API.get(`/products?${params.toString()}`);
};

export const getCategories = async () => {
  return API.get(`/categories`);
};

export const addToCart = (productId: string, quantity: number = 1) => {
  return API.post(`/cart/add/${productId}`, { quantity });
};

export const getCart = () => {
  return API.get('/cart');
};

export const removeFromCart = (productId: string) => {
  return API.delete(`/cart/remove/${productId}`);
};

export const decreaseFromCart = (productId: string) => {
  return API.patch(`/cart/decrease/${productId}`);
};

export const clearCart = () => {
  return API.delete('/cart/clear');
};

export default API;