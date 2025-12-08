import { create } from "zustand";
import type { Tariff, Region, CartResponse } from "../types/api";
import { cartAPI } from "../services/api.service";
import { useAuthStore } from "./authStore";

interface CartItem {
  region: Region;
  tariff: Tariff;
  quantity: number;
}

interface LocalStorageCartItem {
  tariff: Tariff;
  quantity: number;
  region: Region;
}

interface CartStore {
  cartItems: CartItem[];
  mySimCount: number;
  initializeCart: () => Promise<void>;
  addToCart: (region: Region, tariff: Tariff) => Promise<void>;
  removeFromCart: (region: Region, tariff: Tariff) => Promise<void>;
  clearCart: () => void;
  setMySimCount: (count: number) => void;
  setCartItems: (items: CartItem[]) => void;
}

const getLocalStorageCart = (): LocalStorageCartItem[] => {
  const cart = localStorage.getItem("cartItems");
  return cart ? JSON.parse(cart) : [];
};

export const useCartStore = create<CartStore>((set) => {
  const fetchCartFromServer = async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) return;

    const localStorageCart = getLocalStorageCart();

    try {
      if (localStorageCart.length > 0) {
        const syncedCart = await syncLocalStorageCart();
        if (syncedCart?.data?.success) {
          set({ cartItems: syncedCart?.data?.data?.items });
        }
      } else {
        const response = await cartAPI.getCart();
        const cartData: CartResponse = response.data;
        if (cartData.success) {
          set({ cartItems: cartData?.data?.items });
        }
      }
    } catch (error: any) {
      console.error("Error fetching cart from server:", error);
    }
  };

  const syncLocalStorageCart = async () => {
    const localStorageCart = getLocalStorageCart();

    if (localStorageCart.length === 0) {
      return;
    }

    try {
      localStorage.removeItem("cartItems");
      return await cartAPI.addToBasketFromCache(
        localStorageCart.map((item) => ({
          tariff_id: item.tariff.id,
          quantity: item.quantity,
          region_id: item.region.id,
        }))
      );
    } catch (error: any) {
      console.error("Error syncing cart:", error);
      return null;
    }
  };

  const addToLocalStorageCart = (region: Region, tariff: Tariff) => {
    const localStorageCart = getLocalStorageCart();
    const existingItemIndex = localStorageCart.findIndex(
      (item) => item.tariff.id === tariff.id && item.region.id === region.id
    );
    if (existingItemIndex >= 0) {
      localStorageCart[existingItemIndex].quantity += 1;
    } else {
      localStorageCart.push({
        tariff,
        region,
        quantity: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(localStorageCart));
    set({ cartItems: localStorageCart });
  };

  return {
    cartItems: getLocalStorageCart(),
    mySimCount: 0,

    initializeCart: async () => {
      const { isAuthenticated } = useAuthStore.getState();
      if (isAuthenticated) {
        await fetchCartFromServer();
      }
    },

    addToCart: async (region: Region, tariff: Tariff) => {
      const { isAuthenticated } = useAuthStore.getState();
      if (isAuthenticated) {
        try {
          const response = await cartAPI.addToBasket({
            tariff_id: tariff.id,
            quantity: 1,
          });
          set({ cartItems: response.data?.data?.items });
        } catch (error: any) {
          console.error("Error adding to cart:", error);
        }
      } else {
        addToLocalStorageCart(region, tariff);
      }
    },

    removeFromCart: async (region: Region, tariff: Tariff) => {
      const { isAuthenticated } = useAuthStore.getState();
      if (isAuthenticated) {
        try {
          const response = await cartAPI.decreaseItemFromBasket({
            tariff_id: tariff.id,
            quantity: 1,
          });
          set({ cartItems: response.data?.data?.items });
        } catch (error: any) {
          console.error("Error removing from cart:", error);
        }
      } else {
        const localStorageCart = getLocalStorageCart();
        const updatedCart = localStorageCart
          .map((item) => {
            if (item.region.id === region.id && item.tariff.id === tariff.id) {
              if (item.quantity > 0) {
                return { ...item, quantity: item.quantity - 1 };
              }
            }
            return item;
          })
          .filter(
            (item) =>
              !(
                item.region.id === region.id &&
                item.tariff.id === tariff.id &&
                item.quantity === 0
              )
          );
        set({ cartItems: updatedCart });
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    },

    clearCart: () => {
      const { isAuthenticated } = useAuthStore.getState();
      set({ cartItems: [] });
      if (!isAuthenticated) {
        localStorage.removeItem("cartItems");
      }
    },

    setMySimCount: (count: number) => set({ mySimCount: count }),

    setCartItems: (items: CartItem[]) => set({ cartItems: items }),
  };
});

// Computed values as selectors
export const useCartCount = () => {
  return useCartStore((state) =>
    state.cartItems.reduce((total, item) => total + item.quantity, 0)
  );
};

export const useCartTotal = () => {
  return useCartStore((state) =>
    state.cartItems.reduce(
      (total, item) => total + item.tariff.price_sell * item.quantity,
      0
    )
  );
};
