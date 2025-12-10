import { create } from "zustand";
import type { cartTariff, Tariff } from "@/types/api";
import { cartAPI } from "@/services/api.service";
import { useAuthStore } from "./authStore";
import { getLocalStorageCart } from "@/lib/utils";

interface TariffStore {
  selectedTariff: Tariff | null;
  setSelectedTariff: (tariff: Tariff | null) => void;
  selectedTariffs: cartTariff[];
  setSelectedTariffs: (tariffs: cartTariff[]) => void;
  syncToAPI: () => Promise<void>;
  increaseQuantity: (tariff: cartTariff) => Promise<void>;
  decreaseQuantity: (tariff: cartTariff) => Promise<void>;
}

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
  increaseQuantity: async (tariff: cartTariff) => {
    const { isAuthenticated } = useAuthStore.getState();
    const { selectedTariffs, selectedTariff, setSelectedTariffs } = get();

    if (isAuthenticated) {
      // API'ga jo'natish
      try {
        await cartAPI.addToBasket({
          tariff_id: tariff.id,
          quantity: 1,
        });
      } catch (error) {
        console.error("Error increasing quantity:", error);
      }
    } else {
      const foundTariff = selectedTariffs.find((t) => t.id === tariff.id);
      if (foundTariff) {
        const newQuantity = (foundTariff.quantity || 0) + 1;
        const updated = selectedTariffs.map((t) =>
          t.id === tariff.id ? { ...t, quantity: newQuantity } : t
        );
        setSelectedTariffs(updated);
      } else {
        setSelectedTariffs([
          ...selectedTariffs,
          { ...(selectedTariff as cartTariff), quantity: 1 },
        ]);
      }
    }
  },

  // Quantity kamaytirish (-)
  decreaseQuantity: async (tariff: cartTariff) => {
    const { isAuthenticated } = useAuthStore.getState();
    const { selectedTariffs, setSelectedTariffs } = get();

    const foundTariff = selectedTariffs.find((t) => t.id === tariff.id);
    if (!foundTariff) return;

    const currentCount = foundTariff.quantity || 1;

    if (isAuthenticated) {
      // API'ga jo'natish
      try {
        // Agar count 1 bo'lsa, item'ni to'liq o'chirish uchun removeItemFromBasket ishlatamiz
        await cartAPI.decreaseItemFromBasket({
          tariff_id: tariff.id,
          quantity: 1,
        });
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
    } else {
      // localStorage'ga saqlash
      if (currentCount <= 1) {
        // Agar count 1 bo'lsa, tariffni o'chirish
        const updated = selectedTariffs.filter((t) => t.id !== tariff.id);
        setSelectedTariffs(updated);
        return;
      }

      const newQuantity = currentCount - 1;
      const updated = selectedTariffs.map((t) =>
        t.id === tariff.id ? { ...t, quantity: newQuantity } : t
      );
      setSelectedTariffs(updated);
    }
  },
}));
