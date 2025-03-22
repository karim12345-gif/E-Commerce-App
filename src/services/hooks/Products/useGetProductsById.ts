import { useQuery } from '@tanstack/react-query';
import { ProductsApi } from 'src/services/api';
import { ProductResponse, Product, HttpError } from '~/src/types/app';

/**
 * Fetches a product by its ID using native fetch.
 * 
 * @param {string | undefined} id - Product ID
 * @returns {Promise<Product | null>} - Product data or null
 */
const getProductById = async (id?: string): Promise<Product | null> => {
  if (!id) return null;

  try {
    const response = await fetch(ProductsApi.getProductById(id), {
      cache: 'no-store', // Always fetch fresh data (SSR-like behavior)
    });


    // If the response is not OK, throw an error
    if (!response.ok) {
      const error: HttpError = new Error(`HTTP Error: ${response.status}`);
      error.response = {
        status: response.status,
        data: {
          message: `Failed to fetch category: ${response.status}`,
        },
      };
      throw error;
    }

    const json: ProductResponse = await response.json();

    // If the response is not successful or the data is missing, throw an error
    if (!json.success || !json.data) {
      const error: HttpError = new Error(json.message || 'Invalid response');
      error.response = {
        status: 400,
        data: json,
      };
      throw error;
    }

    return json.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

/**
 * React Query hook to fetch a product by its ID
 * 
 * @param {string} id - Product ID
 * @returns {UseQueryResult<Product | null>} - React Query result
 */
export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ['GetProductById', id],
    queryFn: () => getProductById(id),
    enabled: !!id, // Prevents query from running if ID is undefined or empty
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
