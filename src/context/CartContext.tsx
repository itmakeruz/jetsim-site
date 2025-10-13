import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface Plan {
  type: string;
  traffic: string;
  cost: string;
  network: string[];
  status: string;
}

interface CartItem {
  country: string;
  plan: Plan;
  flag: string; 
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (country: string, plan: Plan, flag: string) => void; 
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (country: string, plan: Plan, flag: string) => {
    if (!cartItems.some((item) => item.country === country && item.plan.type === plan.type)) {
      setCartItems((prevItems) => [...prevItems, { country, plan, flag }]);
    }
  };

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartCount }}>
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