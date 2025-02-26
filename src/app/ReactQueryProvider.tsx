'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ErrorResponse } from '../types/app';
import { ReactQueryProviderProps } from '../interfaces';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ResponseModelHelper } from '../services/helpers/ResponseModelHelpers';

/**
 * React Query Provider component that wraps the application with TanStack Query
 * for data fetching and state management
 *
 * @param {ReactQueryProviderProps} props - Component props containing children
 * @returns {JSX.Element} - QueryClientProvider wrapped around children
 */
const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current returnUrl from search params or use current path
  const getCurrentReturnUrl = () => {
    const returnUrlParam = searchParams.get('returnUrl');
    return returnUrlParam || pathname || '/';
  };

  // Creating a new client for each session to avoid shared state across requests
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // Set up query cache with global error handling
        queryCache: new QueryCache({
          // Handle API errors globally across the application
          onError: (error: unknown) => {
            ResponseModelHelper(error as ErrorResponse, router.push, {
              showToast: true,
              returnUrl: getCurrentReturnUrl(),
            });
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            retry: false,
          },
          mutations: {
            // Global error handler for mutations
            onError: (error: unknown) => {
              ResponseModelHelper(error as ErrorResponse, router.push, {
                showToast: true,
                returnUrl: getCurrentReturnUrl(),
              });
            },
          },
        },
      }),
  );

  // Provide the QueryClient to all child components
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
