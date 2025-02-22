'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { CartContextType, CartItem } from '../interfaces/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('Cart Item List:');
        // Make sure we return an array or default to empty array
        return savedCart ? JSON.parse(savedCart) || [] : [];
      }
      return [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('Cart Item List:', JSON.stringify(cart));
      }
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart(currentCart => {
      // Add safety check for currentCart
      const safeCart = currentCart || [];

      // Check if product already in cart
      const existingProductIndex = safeCart.findIndex(item => item.id === product.id);

      console.log('Existing Product Index:', existingProductIndex);
      console.log('Current Cart:', safeCart);
      console.log('Adding Product:', product);

      if (existingProductIndex > -1) {
        // If product exists, increase quantity
        const updatedCart = [...safeCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      }

      // If product not in cart, add new item
      return [...safeCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(currentCart => {
      // Add safety check
      const safeCart = currentCart || [];
      return safeCart.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(currentCart => {
      // Add safety check
      const safeCart = currentCart || [];
      return safeCart
        .map(item => (item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item))
        .filter(item => item.quantity > 0);
    });
  };

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
