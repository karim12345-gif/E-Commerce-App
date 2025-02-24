// services/hooks/Products.ts
import axios, { AxiosResponse } from "axios"
import { ProductsApi } from "../../api"
import { useQuery } from "@tanstack/react-query"
import { Product } from "~/src/types/app";

interface ApiResponse {
  data: Product[];
}


const GetListOfProducts = async (): Promise<ApiResponse> => {
 try{
  const response: AxiosResponse<ApiResponse> = await axios.get(
    ProductsApi.getProducts(),
  )
  
  return response.data
 }catch (error) {
   throw error
 }
}

export const useGetListOfProducts = () => {
  return useQuery({
    queryKey: ['GetListOfProducts'],
    queryFn: () => GetListOfProducts(),
       // Optional: enable fallback for client-side rendering
    enabled: typeof window !== 'undefined'
  })
}