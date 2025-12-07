import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Tariff, Region, CartResponse } from "../types/api";
import { cartAPI } from "../services/api.service";
import { useAuthStore } from "../store/authStore";

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

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (region: Region, tariff: Tariff) => Promise<void>;
  removeFromCart: (region: Region, tariff: Tariff) => void;
  clearCart: () => void;
  cartCount: number;
  mySimCount: number;
  cartTotal: number;
  setMySimCount: any;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const getLocalStorageCart = (): LocalStorageCartItem[] => {
    const cart = localStorage.getItem("cartItems");
    return cart ? JSON.parse(cart) : [];
  };
  const { isAuthenticated } = useAuthStore();
  const [cartItems, setCartItems] = useState<CartItem[]>(getLocalStorageCart());
  const [mySimCount, setMySimCount] = useState<number>(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartFromServer();
    }
  }, [isAuthenticated]);

  const addToCart = async (region: Region, tariff: Tariff) => {
    if (isAuthenticated) {
      try {
        const response = await cartAPI.addToBasket({
          tariff_id: tariff.id,
          quantity: 1,
          region_id: region.id,
        });
        setCartItems(response.data?.data?.items);
      } catch (error: any) {
        console.error("Error adding to cart:", error);
      }
    } else {
      addToLocalStorageCart(region, tariff);
    }
  };

  const removeFromCart = async (region: Region, tariff: Tariff) => {
    if (isAuthenticated) {
      try {
        const response = await cartAPI.decreaseItemFromBasket({
          tariff_id: tariff.id,
          quantity: 1,
          region_id: region.id,
        });
        setCartItems(response.data?.data?.items);
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
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  const clearCart = () => {
    setCartItems([]);
    if (!isAuthenticated) {
      localStorage.removeItem("cartItems");
    }
  };

  const fetchCartFromServer = async () => {
    if (!isAuthenticated) return;
    const localStorageCart = getLocalStorageCart();

    try {
      if (localStorageCart.length > 0) {
        const syncedCart = await syncLocalStorageCart();
        if (syncedCart?.data?.success) {
          setCartItems(syncedCart?.data?.data?.items);
        }
      } else {
        const response = await cartAPI.getCart();
        const cartData: CartResponse = response.data;
        if (cartData.success) {
          setCartItems(cartData?.data?.items);
        }
      }
    } catch (error: any) {
      console.error("Error fetching cart from server:", error);
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
    setCartItems(localStorageCart);
  };

  // const loadCartFromLocalStorage = () => {
  //   const localStorageCart = getLocalStorageCart();
  //   setCartItems(localStorageCart);
  // };

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

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.tariff.price_sell * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        mySimCount,
        setMySimCount,
        cartTotal,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
