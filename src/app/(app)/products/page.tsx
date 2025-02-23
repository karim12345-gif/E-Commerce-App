'use client';

import { useGetListOfProducts } from '~/src/services/hooks/Products';
import { Product } from '~/src/types/app';
import dynamic from 'next/dynamic';

// Dynamically import components
const ProductCard = dynamic(() => import('~/src/components/Product').then(mod => mod.ProductCard), {
  ssr: false,
  loading: () => null,
});

const ProductPageSkeleton = dynamic(
  () => import('~/src/components/Product/ProductPageSkeleton').then(mod => mod.ProductPageSkeleton),
  {
    ssr: false,
  },
);

export default function ProductsPage() {
  const { data: listOfProducts, isLoading, isFetching } = useGetListOfProducts();

  // Show skeleton while loading or fetching
  if (isLoading || isFetching || !listOfProducts?.data) {
    return <ProductPageSkeleton />;
  }

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Products Page:</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {listOfProducts.data.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
