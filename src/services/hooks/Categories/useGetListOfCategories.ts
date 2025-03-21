// import { CategoriesApi } from "../../api"
// import { Category } from "~/src/types/app";
// import axios, { AxiosResponse } from "axios"
// import { useQuery } from "@tanstack/react-query"


// /**
// * Fetches the complete list of product categories from the API
// * 
// * @returns {Promise<Category[]>} - Promise resolving to an array of categories
// */

// const GetListOfCategories = async (): Promise<Category[]> => {
//     try {
//       const response: AxiosResponse<{data: Category[]}> = await axios.get(
//         CategoriesApi.getListOfProductCategories(),
//       );
  
//       return response.data.data
//     } catch (error) {
//       console.error('Error fetching categories:', error); 
//       throw error;
//     }
//   };

//   /**
// * Custom hook that provides access to the list of product categories
// * Uses React Query for data fetching, caching, and state management
// * 
// * @returns {UseQueryResult<Category[]>} - React Query result with categories data
// */

// export const useGetListOfCategories = () => {
//   return useQuery({
//     queryKey: ['GetListOfCategories'], // this is a unique identifier for this query in the cache
//     queryFn: () => GetListOfCategories(),
//   })
// }



import { CategoriesApi } from "../../api";
import { Category } from "~/src/types/app";
import { useQuery } from "@tanstack/react-query";

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
      cache: "force-cache", 
      next: { revalidate: 300 }, // 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const json = await response.json();
    return json.data; 
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

/**
 * React Query hook for retrieving the list of product categories.
 * This handles client side caching, background refetching, and retries.
 * 
 * @returns {UseQueryResult<Category[]>} 
 */
export const useGetListOfCategories = () => {
  return useQuery({
    queryKey: ["GetListOfCategories"],
    queryFn: getListOfCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, // retry  twice if the request has failed before 
  });
};