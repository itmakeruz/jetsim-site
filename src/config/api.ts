import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor - token va language qo'shish
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Language header qo'shish
  const lang = localStorage.getItem("lang") || "ru";
  config.headers["lang"] = lang;

  // FormData bo'lmasa Content-Type ni application/json qilish
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  config.headers["Accept"] = "application/json";

  return config;
});

// Response interceptor - 401 xatolarda faqat logout
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token soxta yoki muddati o'tgan - faqat tozalash, redirect yo'q
      localStorage.removeItem("token");
      // Store'ni reset qilish uchun event dispatch qilamiz
      window.dispatchEvent(new Event("unauthorized"));
    }
    return Promise.reject(error);
  }
);

export const tokenName = "token";

export const setToken = (token: string) => {
  localStorage.setItem(tokenName, token);
};

export const removeToken = () => {
  localStorage.removeItem(tokenName);
};

export default instance;
