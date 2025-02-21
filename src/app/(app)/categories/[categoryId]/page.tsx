'use client';

import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { ButtonLoading } from '~/src/components/ui/buttonLoader';
import { useGetListOfProducts } from '~/src/services/hooks/Products';
import { useGetCategoryById } from '~/src/services/hooks/Categories';

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
      <div className='mb-8'>
        <Button onClick={() => router.push('/categories')}>Back</Button>
        <h1 className='text-3xl font-bold mb-2'>{category.name}</h1>
        <p className='text-gray-600'>{category.description}</p>
      </div>

      {/* Products Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {categoryProducts?.length > 0 ? (
          categoryProducts.map(product => (
            <Card key={product.id}>
              <CardContent className='p-4'>
                <img src={product.images[0]} alt={product.name} className='w-full h-48 object-cover rounded-lg mb-4' />
                <h2 className='text-xl font-semibold mb-2'>{product.name}</h2>
                <p className='text-gray-600 mb-2'>${product.price.amount}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className='col-span-full text-center text-gray-600 mt-8'>No products found in this category.</div>
        )}
      </div>
    </div>
  );
}
