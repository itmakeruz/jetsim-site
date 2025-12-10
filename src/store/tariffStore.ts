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
  increaseQuantity: (tariff: Tariff) => Promise<void>;
  decreaseQuantity: (tariff: Tariff) => Promise<void>;
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
  increaseQuantity: async (tariff: Tariff) => {
    const { isAuthenticated } = useAuthStore.getState();
    const { selectedTariffs, setSelectedTariffs } = get();

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
          t.id === tariff.id
            ? {
                ...t,
                quantity: newQuantity,
                total_amount: t.price_sell * newQuantity,
              }
            : t
        );
        setSelectedTariffs(updated);
      } else {
        setSelectedTariffs([
          ...selectedTariffs,
          {
            ...tariff,
            quantity: 1,
            image: tariff.region_group.image,
            total_amount: tariff.price_sell,
          },
        ]);
      }
    }
  },

  // Quantity kamaytirish (-)
  decreaseQuantity: async (tariff: Tariff) => {
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
        t.id === tariff.id
          ? {
              ...t,
              quantity: newQuantity,
              total_amount: t.price_sell * newQuantity,
            }
          : t
      );
      setSelectedTariffs(updated);
    }
  },
}));
