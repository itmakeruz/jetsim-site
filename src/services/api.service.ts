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
  getRegions: (
    categoryId: number | null,
    searchTerm: string | null,
    page: number = 1
  ) => {
    const params: {
      category_id?: number | null;
      search?: string | null;
      page?: number;
    } = {};

    if (categoryId) params.category_id = categoryId;
    if (searchTerm) params.search = searchTerm;
    if (page > 1) params.page = page;

    return axios.get("/region", { params });
  },
};

export const tariffAPI = {
  getTariffs: () => axios.get("/tariff"),
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
  tariff: tariffAPI,
  user: userAPI,
};

export default api;
