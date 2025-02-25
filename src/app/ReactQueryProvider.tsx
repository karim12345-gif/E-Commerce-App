import { useRouter } from 'next/navigation';
import { ErrorResponse } from '../types/app';
import { ReactQueryProviderProps } from '../interfaces';
import { ResponseModelHelper } from '../services/helpers/ResponseModelHelpers';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * React Query Provider component that wraps the application with TanStack Query
 * for data fetching and state management
 *
 * @param {ReactQueryProviderProps} props - Component props containing children
 * @returns {JSX.Element} - QueryClientProvider wrapped around children
 */

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const router = useRouter();

  // Initialize Query Client with configuration
  const queryClient = new QueryClient({
    // Set up query cache with global error handling
    queryCache: new QueryCache({
      // Handle API errors globally across the application
      // Uses ResponseModelHelper to process errors and navigate as needed
      onError: (error: unknown) => ResponseModelHelper(error as ErrorResponse, router.push),
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        retry: false,
      },
    },
  });

  // Provide the QueryClient to all child components
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
