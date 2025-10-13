import axios from "../config/api";

// Auth API'lar
export const authAPI = {
  sendOtp: (data: { email: string }) => axios.post("/auth/send-otp", data),
  confirmEmail: (data: { email: string; confirm_code: string }) =>
    axios.post("/auth/confirm-email", data),
  getProfile: () => axios.get("/auth/me"),
};

// Region/Tariff API'lar
export const regionAPI = {
  getCategories: () => axios.get("/region/category"),
  getById: (id: string | number) => axios.get(`/region/${id}`),
  getRegions: () => axios.get("/region/admin"),
};

// Boshqa API'larni qo'shishingiz mumkin
export const userAPI = {
  // getProfile: () => axios.get("/user/profile"),
  // updateProfile: (data: any) => axios.put("/user/profile", data),
};

// Yagona default export - barcha API'larni birlashtiradi
const api = {
  auth: authAPI,
  region: regionAPI,
  user: userAPI,
};

export default api;
