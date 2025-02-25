import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CategoriesApi } from 'src/services/api';
import { Product } from '~/src/types/app';

interface ApiResponse {
  success: boolean;
  message: string;
  data: Product;
}

/**
* Fetches a category by its ID from the API
* 
* @param {string | undefined} id - The ID of the category to fetch
* @returns {Promise<Product | null>} - The category data or null if not found
*/

const GetCategoryById = async (id?: string): Promise<Product | null> => {

   // Return null  if there are no ID is provided
  if (!id) {
    return null;
  }

  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      CategoriesApi.getCategoryById(id)
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    throw error;
  }
};

/**
* Custom hook that wraps the GetCategoryById function with React Query
* for data fetching, caching, and state management
* 
* @param {string} id - The ID of the category to fetch
* @returns {UseQueryResult} - React Query result object containing data and status
*/

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ['GetCategoryById', id], // Unique key for this query
    queryFn: () => GetCategoryById(id),
    retry: 1, // Retry once if the query fails
    staleTime: 300000  // Consider data fresh for 5 minutes
  });
};