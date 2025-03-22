import { ApiResponseCategory, Category, HttpError } from '~/src/types/app';
import { useQuery } from '@tanstack/react-query';
import { CategoriesApi } from "../../api";


/**
 * 
 * Fetches the complete list of product categories from the API
 * Now this approach takes advantage of Next.js App Router features like:
 * - Static caching with `force-cache` for SSG like behavior and `revalidate` for ISR like behavior
 * 
 * @returns {Promise<Category[]>} 
 */
const getListOfCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(CategoriesApi.getListOfProductCategories(), {
      cache: 'force-cache',
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const error: HttpError = new Error(`HTTP Error: ${response.status}`);
      error.response = {
        status: response.status,
        data: {
          message: `Failed to fetch categories: ${response.status}`,
        },
      };
      throw error;
    }

    const json: ApiResponseCategory = await response.json();

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
    console.error('Normalized fetch error:', error);
    throw error;
  }
};



export const useGetListOfCategories = () => {
  return useQuery({
    queryKey: ['GetListOfCategories'],
    queryFn: getListOfCategories,
    staleTime: 5 * 60 * 1000,
    retry: 2, // Retry twice if the query fails
  });
};
