'use client';


import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CartItem } from "../interfaces/cart";
import { Order } from "../types/app";
import { useRouter } from "next/navigation";

export const useGoHome = () => {
  const router = useRouter();
  return () => router.push("/");
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calculate the cart tool price 
export const calculateCartTotal = (cart: CartItem[]): number => {
  return Array.isArray(cart) 
    ? cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    : 0;
};


// Helper function to safely convert timestamp to localeString
export const formatDate = (timestamp?: Date | string | null): string => {
  if (!timestamp) return 'N/A';

  // If it's already a Date object
  if (timestamp instanceof Date) {
    return timestamp.toLocaleDateString();
  }

  // If it's a string, try to create a Date
  try {
    return new Date(timestamp).toLocaleDateString();
  } catch {
    return 'N/A';
  }
};


export const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600';
      case 'PENDING':
        return 'text-yellow-600';
      case 'CANCELLED':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };