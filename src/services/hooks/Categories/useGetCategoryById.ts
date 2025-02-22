import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CategoriesApi } from 'src/services/api';
import { Product } from '~/src/types/app';

interface ApiResponse {
  success: boolean;
  message: string;
  data: Product;
}

const GetCategoryById = async (id?: string): Promise<Product | null> => {
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