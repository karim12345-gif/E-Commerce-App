'use client';
import dynamic from 'next/dynamic';
import { ProductPageSkeleton } from '~/src/components/Product';
import { useGetListOfProducts } from '~/src/services/hooks/Products';

// Dynamically import the ProductCard component
const ProductCard = dynamic(() => import('~/src/components/Product').then(mod => mod.ProductCard), {
  ssr: false,
});

export default function ProductsPage() {
  const { data: products, isLoading } = useGetListOfProducts();

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Products Page</h1>
      {!products?.data.length ? (
        <div className='text-center py-10'>
          <p className='text-lg'>No products available.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.data.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
