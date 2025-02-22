import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CartItem } from "../interfaces/cart";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calculate the cart tool price 
export const calculateCartTotal = (cart: CartItem[]): number => {
  return Array.isArray(cart) 
    ? cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    : 0;
};
