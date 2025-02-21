'use client';

import { ReactNode } from 'react';
import { CartProvider } from '../context/CartContext';
import ReactQueryProvider from './ReactQueryProvider';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Providers({ children }: { children: ReactNode }) {
  // const isDev = process.env.NODE_ENV === 'development';
  return (
    <CartProvider>
      <ReactQueryProvider>
        {children}
        {/* make it true to check the state and follow, i'll make it false so it the TanStack dev tools is hiddne  */}
        {/* {isDev && <ReactQueryDevtools initialIsOpen={false} />} */}
      </ReactQueryProvider>
    </CartProvider>
  );
}
