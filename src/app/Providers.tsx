'use client';

import { ReactNode, Suspense } from 'react';
import { CartProvider } from '../context/CartContext';
import ReactQueryProvider from './ReactQueryProvider';
import ErrorBoundary from './error-boundry';
import { ButtonLoading } from '../components/ui/buttons/buttonLoader';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Providers({ children }: { children: ReactNode }) {
  // const isDev = process.env.NODE_ENV === 'development';
  return (
    <ErrorBoundary>
      <CartProvider>
        <Suspense fallback={<ButtonLoading />}>
          <ReactQueryProvider>
            {children}
            {/* make it true to check the state and follow, i'll make it false so it the TanStack dev tools is hiddne  */}
            {/* {isDev && <ReactQueryDevtools initialIsOpen={true} buttonPosition='bottom-right' />} */}
          </ReactQueryProvider>
        </Suspense>
      </CartProvider>
    </ErrorBoundary>
  );
}
