"use client";

import { createContext, useCallback, useEffect, useMemo, useState, ReactNode } from "react";

type CartItem = Record<string, unknown> & {
  _id?: string;
  restaurantId?: string | null;
  quantity?: number;
};

type CartContextValue = {
  cartItems: CartItem[];
  addToCart: (food: CartItem, restaurantId?: string | null) => void;
  removeFromCart: (foodId: string) => void;
  updateQuantity: (foodId: string, quantity: number) => void;
  clearCart: () => void;
};

const defaultContext: CartContextValue = {
  cartItems: [],
  addToCart: () => undefined,
  removeFromCart: () => undefined,
  updateQuantity: () => undefined,
  clearCart: () => undefined,
};

export const CartContext = createContext<CartContextValue>(defaultContext);

const getStorage = () => (typeof window === "undefined" ? null : window.localStorage);

const decodeToken = () => {
  const storage = getStorage();
  if (!storage) return null;

  const token = storage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1] ?? ""));
    return payload?.id || payload?.userId || payload?._id || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const getCartKey = () => {
  const userId = decodeToken();
  return userId ? `cart_${userId}` : "cart_guest";
};

const normaliseCartItems = (items: CartItem[]): CartItem[] =>
  items.map((item) => ({
    ...item,
    quantity: typeof item.quantity === "number" && item.quantity > 0 ? Math.floor(item.quantity) : 1,
  }));

const readCart = (): CartItem[] => {
  const storage = getStorage();
  if (!storage) return [];

  try {
    const saved = storage.getItem(getCartKey());
    if (!saved) return [];
    const parsed = JSON.parse(saved) as CartItem[];
    return Array.isArray(parsed) ? normaliseCartItems(parsed) : [];
  } catch (error) {
    console.error("Error loading cart:", error);
    return [];
  }
};

const persistCart = (items: CartItem[]) => {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(getCartKey(), JSON.stringify(normaliseCartItems(items)));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => readCart());
  const [currentUserId, setCurrentUserId] = useState<string | null>(() => decodeToken());

  useEffect(() => {
    persistCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    const handleStorageChange = () => {
      const newUserId = decodeToken();
      if (newUserId !== currentUserId) {
        setCurrentUserId(newUserId);
        setCartItems(readCart());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [currentUserId]);

  const addToCart = useCallback<CartContextValue["addToCart"]>((food, restaurantId) => {
    setCartItems((prev) => {
      const identityRestaurant = restaurantId ?? (food.restaurantId as string | null | undefined) ?? null;
      const foodId = typeof food._id === "string" && food._id.length > 0 ? food._id : null;

      const existingIndex = prev.findIndex((item) => {
        if (foodId && item._id === foodId) {
          return true;
        }
        if (!foodId) {
          const sameName =
            typeof item.name === "string" &&
            typeof food.name === "string" &&
            item.name.trim().toLowerCase() === food.name.trim().toLowerCase();
          const itemRestaurant = item.restaurantId ?? null;
          const foodRestaurant = identityRestaurant ?? (food.restaurantId ?? null);
          return sameName && itemRestaurant === foodRestaurant;
        }
        return false;
      });

      if (existingIndex !== -1) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        const currentQuantity =
          typeof existing.quantity === "number" && existing.quantity > 0 ? Math.floor(existing.quantity) : 1;

        updated[existingIndex] = {
          ...existing,
          quantity: currentQuantity + 1,
        };

        return updated;
      }

      const initialQuantity =
        typeof food.quantity === "number" && food.quantity > 0 ? Math.floor(food.quantity) : 1;

      return [
        ...prev,
        {
          ...food,
          restaurantId: identityRestaurant,
          quantity: initialQuantity,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback<CartContextValue["removeFromCart"]>((foodId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== foodId));
  }, []);

  const updateQuantity = useCallback<CartContextValue["updateQuantity"]>((foodId, quantity) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item._id !== foodId);
      }
      return prev.map((item) =>
        item._id === foodId ? { ...item, quantity: Math.floor(quantity) } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    const storage = getStorage();
    if (storage) {
      storage.removeItem(getCartKey());
    }
    setCartItems([]);
  }, []);

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }),
    [cartItems, addToCart, removeFromCart, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
