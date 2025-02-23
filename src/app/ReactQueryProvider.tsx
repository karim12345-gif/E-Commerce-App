import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ResponseModelHelper } from '../services/helpers/ResponseModelHelpers';
import { ReactQueryProviderProps } from '../interfaces';
import { ErrorResponse } from '../types/app';

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const router = useRouter();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: unknown) => ResponseModelHelper(error as ErrorResponse, router.push),
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        retry: false,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
