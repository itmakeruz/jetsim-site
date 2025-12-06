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
  getRegionGroups: (type: string | null = null) => {
    const params: {
      type?: string | null;
    } = {};

    if (type) params.type = type;

    return axios.get("/region-group?size=12", { params });
  },
  getById: (id: string | number) => axios.get(`/region-group/${id}`),
  getRegionById: (id: string | number) => axios.get(`/region/plans/${id}`),
  getRegions: (
    searchTerm: string | null,
    page: number = 1,
    type: string | null = null
  ) => {
    const params: {
      search?: string | null;
      page?: number;
      type?: string | null;
    } = {};

    if (searchTerm) params.search = searchTerm;
    if (page > 1) params.page = page;
    if (type) params.type = type;

    return axios.get("/region?size=12", { params });
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
  getStaticOrders: () => axios.get("/order/static"),
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
