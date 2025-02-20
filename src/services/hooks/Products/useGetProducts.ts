// services/hooks/Products.ts
import axios, { AxiosResponse } from "axios"
import { ProductsApi } from "../../api"
import { useQuery } from "@tanstack/react-query"
import { IProductList } from "~/src/interfaces/products"

interface ApiResponse {
  data: IProductList[];
}

const GetListOfProducts = async (): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await axios.get(
    ProductsApi.getProducts(),
  )
  
  return response.data
}

export const useGetListOfProducts = () => {
  return useQuery({
    queryKey: ['GetListOfProducts'],
    queryFn: () => GetListOfProducts(),
  })
}