import { ProductsApi } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { HttpError, ProductListResponse } from "~/src/types/app";


/**
 * Fetches the complete list of products using native fetch
 * with support for caching, revalidation, and SSR in Next.js
 *
 * @returns {Promise<ProductListResponse>} 
 */
const getListOfProducts = async (): Promise<ProductListResponse> => {
  try {
    const response = await fetch(ProductsApi.getProducts(), {
      cache: 'force-cache', // Use 'force-cache' for SSG-like behavior
      next: { revalidate: 300 }, // ISR: Revalidate every 5 minutes
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

    const json: ProductListResponse = await response.json();

    if (!json.success || !json.data) {
      const error: HttpError = new Error(json.message || 'Invalid response');
      error.response = {
        status: 400,
        data: json,
      };
      throw error;
    }

    return json;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error;
  }
};

/**
 * React Query hook for retrieving the product list
 */
export const useGetListOfProducts = () => {
  return useQuery({
    queryKey: ['GetListOfProducts'],
    queryFn: getListOfProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
