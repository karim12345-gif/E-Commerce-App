'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { CartContextType, CartItem } from '../interfaces/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'Cart Item List:';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];

    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      // Parse and validate cart
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        // Strict Validation of Cart Items
        const validatedCart = Array.isArray(parsedCart)
          ? parsedCart.filter(
              item =>
                item &&
                typeof item.id === 'string' &&
                typeof item.name === 'string' &&
                typeof item.price === 'number' &&
                typeof item.image === 'string' &&
                typeof item.quantity === 'number',
            )
          : [];

        console.log('Validated Cart:', validatedCart);
        return validatedCart;
      }

      return [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    // Only update localStorage on client-side
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        console.log('Cart saved to localStorage:', cart);
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart]);

  // Add to Cart
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart(currentCart => {
      // currentCart is an array
      const safeCart = Array.isArray(currentCart) ? currentCart : [];

      const existingProductIndex = safeCart.findIndex(
        item =>
          item.id === product.id && item.name === product.name && item.price === product.price && item.image === product.image,
      );

      console.log('Existing Product Index:', existingProductIndex);

      if (existingProductIndex > -1) {
        const updatedCart = [...safeCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };

        console.log('Updated Cart:', updatedCart);
        console.groupEnd();
        return updatedCart;
      }

      // Add new item
      const newCart = [...safeCart, { ...product, quantity: 1 }];
      console.log('New Cart:', newCart);
      console.groupEnd();
      return newCart;
    });
  };

  // Remove From Cart
  const removeFromCart = (productId: string) => {
    setCart(currentCart => {
      // Add safety check
      const safeCart = currentCart || [];
      return safeCart.filter(item => item.id !== productId);
    });
  };

  // Update
  const updateQuantity = (productId: string, quantity: number) => {
    setCart(currentCart => {
      // Add safety check
      const safeCart = currentCart || [];
      return safeCart
        .map(item => (item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item))
        .filter(item => item.quantity > 0);
    });
  };

  // Clear the items
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart || [],
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
