'use client';

import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { ButtonLoading } from '~/src/components/ui/buttonLoader';
import { useGetListOfProducts } from '~/src/services/hooks/Products';
import { useGetCategoryById } from '~/src/services/hooks/Categories';
import { CategoryHeader, ProductCategoryList } from '~/src/components/Categories';

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: products, isLoading: productsLoading } = useGetListOfProducts();
  const { data: category, isLoading: categoryLoading } = useGetCategoryById(params.categoryId as string);
  const isLoading = categoryLoading || productsLoading;

  // Show loading state
  if (isLoading) {
    return (
      <div className='container mx-auto p-6 flex justify-center items-center min-h-[50vh]'>
        <ButtonLoading />
      </div>
    );
  }

  // If category is not found, show error
  if (!category) {
    return (
      <div className='container mx-auto p-6'>
        <div className='text-center space-y-4'>
          <h1 className='text-2xl font-bold'>Category Not Found</h1>
          <p className='text-gray-600'>The category you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push('/categories')}>Return to Categories</Button>
        </div>
      </div>
    );
  }

  // Make sure we have products data
  if (!products?.data) {
    return <div className='text-center text-gray-600 mt-8'>No products available.</div>;
  }

  // Filter products for this category
  const categoryProducts = products.data.filter(product => product.categories?.includes(category.slug));

  return (
    <div className='container mx-auto py-8 px-4'>
      {/* Category Header */}
      <CategoryHeader name={category.name} description={category.description} />

      {/* Products Grid */}
      <ProductCategoryList products={categoryProducts} />
    </div>
  );
}
