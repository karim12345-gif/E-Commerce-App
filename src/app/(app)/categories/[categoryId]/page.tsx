'use client';

import dynamic from 'next/dynamic';
import { Button } from '~/src/components/ui/buttons/button';
import { useParams, useRouter } from 'next/navigation';
import { ButtonLoading } from '~/src/components/ui/buttons/buttonLoader';
import { useGetListOfProducts } from '~/src/services/hooks/Products';
import { useGetCategoryById } from '~/src/services/hooks/Categories';

const CategoryHeader = dynamic(() => import('~/src/components/Categories').then(mod => mod.CategoryHeader), {
  ssr: false,
});

const ProductCategoryList = dynamic(() => import('~/src/components/Categories').then(mod => mod.ProductCategoryList), {
  ssr: false,
});

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

  // If category is not found, show error ( could create a septate component and call it better )
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

  // Make sure we have products data -- also here could be created and be reused in the future if needed
  if (!products?.data || products.data.length === 0) {
    return (
      <div className='flex justify-center items-center min-h-[50vh]'>
        <div className='text-center text-gray-600'>
          <p className='text-xl mb-4'>No products available.</p>
          <p className='text-sm text-gray-500'>Check back later or explore other categories.</p>
        </div>
      </div>
    );
  }

  // Filter products for this category
  const categoryProducts = products.data.filter(product => product.categories?.includes(category.slug ?? ''));

  return (
    <div className='container mx-auto py-8 px-4'>
      {/* Category Header */}
      <CategoryHeader name={category.name} description={category.description} />

      {/* Products Grid */}
      <ProductCategoryList products={categoryProducts} />
    </div>
  );
}
