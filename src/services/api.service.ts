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

// Cart API'lar
export const cartAPI = {
  getCart: () => axios.get("/order/cart"),
  addToBasket: (data: {
    tariff_id: number;
    quantity: number;
    region_id: number;
  }) => axios.post("/order/add-to-basket", data),
  addToBasketFromCache: (
    data: {
      tariff_id: number;
      quantity: number;
      region_id: number;
    }[]
  ) => axios.post("/order/add-items", data),
  decreaseItemFromBasket: (data: {
    tariff_id: number;
    quantity: number;
    region_id: number;
  }) => axios.post("/order/decrease-item-from-basket", data),
  removeItemFromBasket: (data: { item_id: string }) =>
    axios.post("/order/remove-item-from-basket", data),

  postESIM: () => axios.post("/order/esim"),
};

// Boshqa API'larni qo'shishingiz mumkin
export const userAPI = {
  // getProfile: () => axios.get("/user/profile"),
  updateUser: (data: FormData) => axios.post("/users", data),
  deleteAccount: () => axios.delete("/users/delete-account"),
  deleteProfileImage: (userId: number) =>
    axios.delete(`/users/delete-profile-image/${userId}`),
};

// Yagona default export - barcha API'larni birlashtiradi
const api = {
  auth: authAPI,
  region: regionAPI,
  tariff: tariffAPI,
  cart: cartAPI,
  user: userAPI,
};

export default api;
