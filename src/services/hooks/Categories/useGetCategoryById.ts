import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CategoriesApi } from 'src/services/api';
import { IProductList } from '~/src/interfaces/products';

interface ApiResponse {
  success: boolean;
  message: string;
  data: IProductList;
}

const GetCategoryById = async (id?: string): Promise<IProductList | null> => {
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

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ['GetCategoryById', id],
    queryFn: () => GetCategoryById(id),
    retry: 1,
    staleTime: 300000
  });
};