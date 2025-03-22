import { useQuery } from '@tanstack/react-query';
import { CategoriesApi } from 'src/services/api';
import { HttpError, Product, ProductResponse } from '~/src/types/app';

/**
 * Fetches a category by its ID using native fetch.
 * Optimized for Next.js performance and caching.
 * 
 * @param {string | undefined} id - The ID of the category to fetch
 * @returns {Promise<Product | null>} 
 */
const getCategoryById = async (id?: string): Promise<Product | null> => {
  if (!id) return null;

  try {
    // The data might change often or be specific to user actions so it is better to always fetch fresh data
    const response = await fetch(CategoriesApi.getCategoryById(id), {
      cache: "no-store", // SSR-like behavior — always fetch fresh
    });

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
    console.error("Error fetching category by ID:", error);
    throw error;
  }
};

/**
 * React Query hook to fetch category data by ID.
 * 
 * @param {string} id - The ID of the category to fetch
 * @returns {UseQueryResult<Product | null>}
 */
export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ['GetCategoryById', id],
    queryFn: () => getCategoryById(id),
    enabled: !!id, // Prevents the query from running if ID is undefined
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
