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

  // Quantity oshirish (+) — login qilganda ham optimistic: avval UI yangilanadi, keyin API
  increaseQuantity: async (tariff: Tariff) => {
    const { isAuthenticated } = useAuthStore.getState();
    const { selectedTariffs, setSelectedTariffs } = get();

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
        } as cartTariff,
      ]);
    }

    if (isAuthenticated) {
      try {
        await cartAPI.addToBasket({
          tariff_id: tariff.id,
          quantity: 1,
        });
      } catch (error) {
        console.error("Error increasing quantity:", error);
        // Xato bo'lsa optimistic o'zgartirishni qaytarish kerak (rollback)
        const { selectedTariffs: current } = get();
        const prev = current.find((t) => t.id === tariff.id);
        if (prev) {
          const rollbackQty = Math.max(0, (prev.quantity || 1) - 1);
          if (rollbackQty === 0) {
            setSelectedTariffs(current.filter((t) => t.id !== tariff.id));
          } else {
            setSelectedTariffs(
              current.map((t) =>
                t.id === tariff.id
                  ? { ...t, quantity: rollbackQty, total_amount: t.price_sell * rollbackQty }
                  : t
              )
            );
          }
        }
      }
    }
  },

  // Quantity kamaytirish (-) — login qilganda ham optimistic
  decreaseQuantity: async (tariff: Tariff) => {
    const { isAuthenticated } = useAuthStore.getState();
    const { selectedTariffs, setSelectedTariffs } = get();

    const foundTariff = selectedTariffs.find((t) => t.id === tariff.id);
    if (!foundTariff) return;

    const currentCount = foundTariff.quantity || 1;

    if (currentCount <= 1) {
      const updated = selectedTariffs.filter((t) => t.id !== tariff.id);
      setSelectedTariffs(updated);
      if (isAuthenticated) {
        try {
          await cartAPI.decreaseItemFromBasket({
            tariff_id: tariff.id,
            quantity: 1,
          });
        } catch (error) {
          console.error("Error decreasing quantity:", error);
          setSelectedTariffs(selectedTariffs);
        }
      }
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

    if (isAuthenticated) {
      try {
        await cartAPI.decreaseItemFromBasket({
          tariff_id: tariff.id,
          quantity: 1,
        });
      } catch (error) {
        console.error("Error decreasing quantity:", error);
        setSelectedTariffs(selectedTariffs);
      }
    }
  },
}));
