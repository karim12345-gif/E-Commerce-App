'use client';

import { ReactNode } from 'react';
import { CartProvider } from '../context/CartContext';
import ReactQueryProvider from './ReactQueryProvider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </CartProvider>
  );
}
