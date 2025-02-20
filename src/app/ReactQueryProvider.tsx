'use client';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ResponseModelHelper } from '../services/helpers/ResponseModelHelpers';
import { ReactQueryProviderProps } from '../interfaces';

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const queryClient = new QueryClient({
    //** query cache will fetch data and store it and when called it will get the result from stored cache this improves performance */
    queryCache: new QueryCache({
      onError: (error: unknown) => ResponseModelHelper(error),
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        retry: false,
      },
    },
  });

  return (
    // ** children is the component that will be wrapped by the QueryClientProvider
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
