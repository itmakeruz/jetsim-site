// config/api.ts
import axios from "axios";
import { APP_ROUTES } from "../router/path";
import i18n from "../i18n";

export const url = import.meta.env.VITE_API_URL

export const $api = axios.create({
  baseURL: url
});

$api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = APP_ROUTES.AUTH;
    }
    return Promise.reject(error);
  }
);

$api.defaults.headers.common["Accept"] = "application/json";
$api.defaults.headers.common["Content-Type"] = "application/json";
$api.defaults.headers.common["lang"] = i18n.resolvedLanguage;

export const tokenName = "token";

export const initApp = () => {
  const token = localStorage.getItem(tokenName);
  $api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : "";
};

export const setToken = (token: string) => {
  localStorage.setItem(tokenName, token);
  $api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeToken = () => {
  localStorage.removeItem(tokenName);
  $api.defaults.headers.common.Authorization = "";
};
