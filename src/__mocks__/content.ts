import { vi } from 'vitest';
import type { CartContextType } from '~/src/interfaces/cart';

export const mockCartContext: CartContextType = {
  cart: [],
  addToCart: vi.fn(),
  removeFromCart: vi.fn(),
  updateQuantity: vi.fn(),
  clearCart: vi.fn(),
};