import { create } from "zustand";
import type { Tariff } from "@/types/api";
import { cartAPI } from "@/services/api.service";
import { useAuthStore } from "./authStore";

interface TariffStore {
  selectedTariff: Tariff | null;
  setSelectedTariff: (tariff: Tariff | null) => void;
  selectedTariffs: Tariff[];
  setSelectedTariffs: (tariffs: Tariff[]) => void;
  syncToAPI: () => Promise<void>;
  fetchCartFromAPI: () => Promise<void>;
  increaseQuantity: (tariffId: number) => Promise<void>;
  decreaseQuantity: (tariffId: number) => Promise<void>;
}

const getLocalStorageCart = (): Tariff[] => {
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
        quantity: tariff.count || 1,
      }));

      await cartAPI.addToBasketFromCache(itemsToSync);

      // localStorage'ni tozalash
      localStorage.removeItem("cartItems");
    } catch (error) {
      console.error("Error syncing cart to API:", error);
    }
  },

  // API'dan cart ma'lumotlarini olish
  fetchCartFromAPI: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) return;

    try {
      const response = await cartAPI.getCart();
      const cartData = response.data.data;

      if (!cartData || !cartData.items) {
        set({ selectedTariffs: [] });
        return;
      }

      // API response'dan Tariff[] formatiga transform qilish
      const transformedTariffs: Tariff[] = cartData.items.map((item: any) => {
        const tariff = item.tariff;
        const region = item.region;

        // region_group yaratish
        // Avval tariff.regions'dan birinchi regionni olish (to'liq ma'lumot bo'lishi mumkin)
        const firstRegion =
          tariff.regions && tariff.regions.length > 0
            ? tariff.regions[0]
            : null;

        const regionGroup = {
          id: firstRegion?.id || region?.id || 0,
          name: firstRegion?.name || region?.name || "",
          image: firstRegion?.image || region?.image || "",
          min_price: tariff.price_sell || 0,
          created_at: "",
          regions: tariff.regions || [],
        };

        return {
          id: tariff.id,
          name: tariff.name || String(item.name || ""),
          title: tariff.name || String(item.name || ""),
          status: "ACTIVE" as const,
          is_popular: false,
          is_4g: tariff.is_4g || false,
          is_5g: tariff.is_5g || false,
          quantity_sms: tariff.quantity_sms || 0,
          quantity_minute: tariff.quantity_minute || 0,
          quantity_internet: tariff.quantity_internet || 0,
          validity_period: tariff.validity_period || 0,
          price_sell: tariff.price_sell || item.price || 0,
          type: {
            id: 0,
            name: "",
          },
          regions: tariff.regions || [],
          created_at: "",
          region_group: regionGroup,
          count: item.quantity || 1,
          itemId: item.id, // Cart item ID ni saqlash
        };
      });

      set({ selectedTariffs: transformedTariffs });
    } catch (error) {
      console.error("Error fetching cart from API:", error);
      // Xatolik bo'lsa, bo'sh array qo'yish
      set({ selectedTariffs: [] });
    }
  },

  // Quantity oshirish (+)
  increaseQuantity: async (tariffId: number) => {
    const { isAuthenticated } = useAuthStore.getState();
    const { selectedTariffs } = get();

    const tariff = selectedTariffs.find((t) => t.id === tariffId);
    if (!tariff) return;

    if (isAuthenticated) {
      // API'ga jo'natish
      try {
        await cartAPI.addToBasket({
          tariff_id: tariffId,
          quantity: 1,
        });
        // API'dan yangi cart ma'lumotlarini olish
        await get().fetchCartFromAPI();
      } catch (error) {
        console.error("Error increasing quantity:", error);
      }
    } else {
      // localStorage'ga saqlash
      const newQuantity = (tariff.count || 1) + 1;
      const updated = selectedTariffs.map((t) =>
        t.id === tariffId ? { ...t, count: newQuantity } : t
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

    const currentCount = tariff.count || 1;

    if (isAuthenticated) {
      // API'ga jo'natish
      try {
        // Agar count 1 bo'lsa, item'ni to'liq o'chirish
        if (currentCount <= 1 && tariff.itemId) {
          await cartAPI.removeItemFromBasket({
            item_id: String(tariff.itemId),
          });
        } else {
          await cartAPI.decreaseItemFromBasket({
            tariff_id: tariffId,
            quantity: 1,
          });
        }
        // API'dan yangi cart ma'lumotlarini olish
        await get().fetchCartFromAPI();
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
        t.id === tariffId ? { ...t, count: newQuantity } : t
      );
      set({ selectedTariffs: updated });
      localStorage.setItem("cartItems", JSON.stringify(updated));
    }
  },
}));
