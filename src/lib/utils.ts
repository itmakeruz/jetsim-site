import type { cartTariff } from "@/types/api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getLocalStorageCart = (): cartTariff[] => {
  try {
    return JSON.parse(localStorage.getItem("cartItems") || "[]");
  } catch {
    return [];
  }
};
export function formatNumber(num: number) {
  return num.toLocaleString("ru-RU");
}
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("ru-RU");
}
