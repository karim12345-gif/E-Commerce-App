'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useGetListOfProducts } from '~/src/services/hooks/Products';
import { useGetCategoryById } from '~/src/services/hooks/Categories';
import { ButtonLoading } from '~/src/components/ui/buttons/buttonLoader';
import { Error404 } from '~/src/app/(errors)/error/components';

// lazy component
const CategoryHeader = dynamic(() => import('~/src/components/Categories').then(mod => mod.CategoryHeader), {
  ssr: false,
});

const ProductCategoryList = dynamic(() => import('~/src/components/Categories').then(mod => mod.ProductCategoryList), {
  ssr: false,
});

export default function CategoryDetailPage() {
  // Get category ID from the URL parameters
  const params = useParams();
  // Hooks
  const { data: products, isLoading: productsLoading } = useGetListOfProducts();
  const { data: category, isLoading: categoryLoading } = useGetCategoryById(params.categoryId as string);

  // Combined loading state to show a single loader for both data fetches
  const isLoading = categoryLoading || productsLoading;

  // Show loading state
  if (isLoading) {
    return (
      <div className='container mx-auto p-6 flex justify-center items-center min-h-[50vh]'>
        <ButtonLoading />
      </div>
    );
  }

  // Handle error state  if product is not found
  if (!category) {
    return (
      <div>
        <Error404 />
      </div>
    );
  }

  // Handle case where there are no products in the database
  // !! TODO: Consider creating a reusable EmptyState component
  if (!products?.data || products.data.length === 0) {
    return (
      <div className='flex justify-center items-center mt-10 min-h-[50vh]'>
        <div className='text-center text-gray-600'>
          <p className='text-xl mb-4'>No products available.</p>
          <p className='text-sm text-gray-500'>Check back later or explore other categories.</p>
        </div>
      </div>
    );
  }

  // Filter the product list to only show products belonging to the current category
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
