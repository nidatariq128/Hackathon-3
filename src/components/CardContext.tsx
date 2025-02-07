"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Cart Item Interface
interface CartItem {
  imageUrl: string | undefined;
  name: string | undefined;
  id: string;
  productName: string;
  price: string;
  quantity: number;
  image: string;
}

// Wishlist Item Interface (similar to CartItem but without quantity)
interface WishlistItem {
  imageUrl: string | undefined;
  name: string | undefined;
  id: string;
  productName: string;
  price: string;
  image: string;
}

// Cart Context Type
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

// Wishlist Context Type
interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Cart Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, product];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) => {
      return prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Wishlist Provider
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const addToWishlist = (product: WishlistItem) => {
    setWishlist((prevWishlist) => {
      const existingItem = prevWishlist.find(item => item.id === product.id);
      if (existingItem) {
        return prevWishlist;  // Item already exists, do nothing
      } else {
        return [...prevWishlist, product];  // Add item to wishlist
      }
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter(item => item.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom Hooks for Cart and Wishlist
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
