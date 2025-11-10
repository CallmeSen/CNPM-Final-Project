import React, { createContext, useState, useEffect } from "react";

// Create the CartContext
export const CartContext = createContext();

// Helper function to get current user ID from token
const getCurrentUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  try {
    // Decode JWT token to get user ID
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id || payload.userId || payload._id || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Helper function to get cart key for current user
const getCartKey = () => {
  const userId = getCurrentUserId();
  return userId ? `cart_${userId}` : 'cart_guest';
};

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const cartKey = getCartKey();
    const savedCart = localStorage.getItem(cartKey);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error loading cart:", error);
    return [];
  }
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cartItems) => {
  try {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCartFromStorage());
  const [currentUserId, setCurrentUserId] = useState(getCurrentUserId());

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  // Listen for storage changes (when user logs in/out in another tab or same page)
  useEffect(() => {
    const handleStorageChange = (e) => {
      // Check if token changed (null means custom event from login/register)
      if (!e.key || e.key === 'token') {
        const newUserId = getCurrentUserId();
        
        // Only reload cart if user actually changed
        if (newUserId !== currentUserId) {
          setCurrentUserId(newUserId);
          setCartItems(loadCartFromStorage());
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [currentUserId]);

  // Function to add item to cart with restaurant info
  const addToCart = (food, restaurantId = null) => {
    const foodWithRestaurant = {
      ...food,
      restaurantId: restaurantId || food.restaurantId
    };
    setCartItems((prevItems) => [...prevItems, foodWithRestaurant]);
  };

  // Function to remove item from cart
  const removeFromCart = (foodId) => {
    setCartItems((prevItems) => prevItems.filter(item => item._id !== foodId));
  };

  // Function to clear cart
  const clearCart = () => {
    setCartItems([]);
    // Also clear from localStorage
    const cartKey = getCartKey();
    localStorage.removeItem(cartKey);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
