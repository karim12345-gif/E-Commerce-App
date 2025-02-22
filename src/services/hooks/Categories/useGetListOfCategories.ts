// services/hooks/Products.ts
import axios, { AxiosResponse } from "axios"
import { CategoriesApi } from "../../api"
import { useQuery } from "@tanstack/react-query"
import { Category } from "~/src/types/app";



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

export const useGetListOfCategories = () => {
  return useQuery({
    queryKey: ['GetListOfCategories'],
    queryFn: () => GetListOfCategories(),
  })
}