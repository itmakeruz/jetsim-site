import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import type { ReactNode } from "react";
import type {
  Tariff,
  Region,
  CartResponse,
  CartItemFromAPI,
} from "../types/api";
import { cartAPI } from "../services/api.service";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

interface CartItem {
  id: string; // unique identifier for cart item
  serverItemId: number; // actual item ID from server response
  region: Region;
  plan: Tariff;
  quantity: number;
  name: string;
  flag: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartResponse: CartResponse | null;
  addToCart: (region: Region, plan: Tariff) => Promise<void>;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  fetchCartFromServer: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();
  const hasSyncedRef = useRef(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartResponse, setCartResponse] = useState<CartResponse | null>(null);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (cartResponse) {
      localStorage.setItem("cartResponse", JSON.stringify(cartResponse));
    }
  }, [cartResponse]);

  // Fetch cart from server when user logs in (only once)
  useEffect(() => {
    if (isAuthenticated && !hasSyncedRef.current) {
      hasSyncedRef.current = true;
      fetchCartFromServer();
    } else if (!isAuthenticated) {
      // Reset sync flag when user logs out
      hasSyncedRef.current = false;
    }
  }, [isAuthenticated]);

  const addToCart = async (region: Region, plan: Tariff) => {
    console.log(region, plan);

    if (isAuthenticated) {
      try {
        await cartAPI.addToBasket({
          tariff_id: plan.id,
          quantity: 1,
          region_id: region.id,
        });

        // Refresh cart from server after adding
        await fetchCartFromServer();
        toast.success("Item added to cart successfully!");
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Failed to add item to cart"
        );
        console.error("Error adding to cart:", error);
      }
    } else {
      toast.error("Please login to add items to cart");
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = async (itemId: string) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (!item) return;

    if (isAuthenticated) {
      try {
        await cartAPI.decreaseItemFromBasket({
          item_id: item.serverItemId.toString(),
        });

        // Refresh cart from server after updating
        await fetchCartFromServer();
        toast.success("Cart updated successfully!");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to update cart");
        console.error("Error updating cart:", error);
      }
    } else {
      toast.error("Please login to update cart");
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const fetchCartFromServer = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await cartAPI.getCart();
      const cartData: CartResponse = response.data;

      if (cartData.success) {
        // Save raw API response to localStorage
        setCartResponse(cartData);

        if (cartData.data.items.length > 0) {
          // Convert API cart items to local cart format for display
          const serverCartItems: CartItem[] = cartData.data.items.map(
            (item: CartItemFromAPI) => ({
              id: `${item.region.id}-${item.tariff.id}`, // Using region_id and tariff_id as unique identifier
              serverItemId: item.id, // Store the actual server item ID
              region: {
                id: item.region.id,
                name: item.region.name,
                image: item.region.image,
                status: "ACTIVE" as const,
                created_at: "",
                tariffs: [],
              },
              plan: {
                id: item.tariff.id,
                name: item.tariff.type.name,
                title: item.tariff.type.name,
                status: "ACTIVE" as const,
                is_popular: false,
                is_4g: item.tariff.is_4g,
                is_5g: item.tariff.is_5g,
                quantity_sms: item.tariff.quantity_sms,
                quantity_minute: item.tariff.quantity_minute,
                quantity_internet: item.tariff.quantity_internet,
                validity_period: item.tariff.validity_period,
                price_sell: item.tariff.price_sell,
                type: {
                  id: item.tariff.type.id,
                  name: item.tariff.type.name,
                },
                regions: [],
                created_at: "",
              },
              quantity: item.quantity,
              name: item.region.name,
              flag: item.region.image,
            })
          );

          // Replace localStorage cart with server cart
          setCartItems(serverCartItems);
        } else {
          // Server cart is empty, clear local cart
          setCartItems([]);
        }
      }
    } catch (error: any) {
      console.error("Error fetching cart from server:", error);
    }
  };

  const refreshCart = async () => {
    if (isAuthenticated) {
      await fetchCartFromServer();
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.plan.price_sell * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartResponse,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        fetchCartFromServer,
        refreshCart,
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
