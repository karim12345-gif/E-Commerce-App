import { CategoriesApi } from "../../api"
import { Category } from "~/src/types/app";
import axios, { AxiosResponse } from "axios"
import { useQuery } from "@tanstack/react-query"


/**
* Fetches the complete list of product categories from the API
* 
* @returns {Promise<Category[]>} - Promise resolving to an array of categories
*/

const GetListOfCategories = async (): Promise<Category[]> => {
    try {
      const response: AxiosResponse<{data: Category[]}> = await axios.get(
        CategoriesApi.getListOfProductCategories(),
      );
  
      return response.data.data
    } catch (error) {
      console.error('Error fetching categories:', error); 
      throw error;
    }
  };

  /**
* Custom hook that provides access to the list of product categories
* Uses React Query for data fetching, caching, and state management
* 
* @returns {UseQueryResult<Category[]>} - React Query result with categories data
*/

export const useGetListOfCategories = () => {
  return useQuery({
    queryKey: ['GetListOfCategories'], // this is a unique identifier for this query in the cache
    queryFn: () => GetListOfCategories(),
  })
}