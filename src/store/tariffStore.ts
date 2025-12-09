import { create } from "zustand";
import type { cartTariff, Tariff } from "@/types/api";
import { cartAPI } from "@/services/api.service";
import { useAuthStore } from "./authStore";

interface TariffStore {
  selectedTariff: Tariff | null;
  setSelectedTariff: (tariff: Tariff | null) => void;
  selectedTariffs: cartTariff[];
  setSelectedTariffs: (tariffs: cartTariff[]) => void;
  syncToAPI: () => Promise<void>;
  increaseQuantity: (tariffId: number) => Promise<void>;
  decreaseQuantity: (tariffId: number) => Promise<void>;
}

const getLocalStorageCart = (): cartTariff[] => {
  try {
    return JSON.parse(localStorage.getItem("cartItems") || "[]");
  } catch {
    return [];
  }
};

export const useTariffStore = create<TariffStore>((set, get) => ({
  selectedTariffs: getLocalStorageCart(),
  setSelectedTariffs: (tariffs) => {
    const { isAuthenticated } = useAuthStore.getState();
    set({
      selectedTariffs: tariffs,
    });
    // Faqat login qilmagan bo'lsa localStorage'ga saqlash
    if (!isAuthenticated) {
      localStorage.setItem("cartItems", JSON.stringify(tariffs));
    }
  },
  selectedTariff: null,
  setSelectedTariff: (tariff) =>
    set({
      selectedTariff: tariff,
    }),

  // localStorage'dan API'ga sinxronlash
  syncToAPI: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) return;

    const localStorageCart = getLocalStorageCart();
    if (localStorageCart.length === 0) return;

    try {
      // Format: [{ tariff_id, quantity }]
      const itemsToSync = localStorageCart.map((tariff) => ({
        tariff_id: tariff.id,
        quantity: tariff.quantity || 1,
      }));

      await cartAPI.addToBasketFromCache(itemsToSync);

      // localStorage'ni tozalash
      localStorage.removeItem("cartItems");
    } catch (error) {
      console.error("Error syncing cart to API:", error);
    }
  },

  // Quantity oshirish (+)
  increaseQuantity: async (tariffId: number) => {
    const { isAuthenticated } = useAuthStore.getState();
    const { selectedTariffs } = get();

    if (isAuthenticated) {
      // API'ga jo'natish
      try {
        await cartAPI.addToBasket({
          tariff_id: tariffId,
          quantity: 1,
        });
      } catch (error) {
        console.error("Error increasing quantity:", error);
      }
    } else {
      const tariff = selectedTariffs.find((t) => t.id === tariffId);
      if (!tariff) return;
      // localStorage'ga saqlash
      const newQuantity = (tariff.quantity || 1) + 1;
      const updated = selectedTariffs.map((t) =>
        t.id === tariffId ? { ...t, quantity: newQuantity } : t
      );
      set({ selectedTariffs: updated });
      localStorage.setItem("cartItems", JSON.stringify(updated));
    }
  },

  // Quantity kamaytirish (-)
  decreaseQuantity: async (tariffId: number) => {
    const { isAuthenticated } = useAuthStore.getState();
    const { selectedTariffs } = get();

    const tariff = selectedTariffs.find((t) => t.id === tariffId);
    if (!tariff) return;

    const currentCount = tariff.quantity || 1;

    if (isAuthenticated) {
      // API'ga jo'natish
      try {
        // Agar count 1 bo'lsa, item'ni to'liq o'chirish uchun removeItemFromBasket ishlatamiz
        await cartAPI.decreaseItemFromBasket({
          tariff_id: tariffId,
          quantity: 1,
        });
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
    } else {
      // localStorage'ga saqlash
      if (currentCount <= 1) {
        // Agar count 1 bo'lsa, tariffni o'chirish
        const updated = selectedTariffs.filter((t) => t.id !== tariffId);
        set({ selectedTariffs: updated });
        localStorage.setItem("cartItems", JSON.stringify(updated));
        return;
      }

      const newQuantity = currentCount - 1;
      const updated = selectedTariffs.map((t) =>
        t.id === tariffId ? { ...t, quantity: newQuantity } : t
      );
      set({ selectedTariffs: updated });
      localStorage.setItem("cartItems", JSON.stringify(updated));
    }
  },
}));
