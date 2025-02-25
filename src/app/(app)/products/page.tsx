import dynamic from 'next/dynamic';
import { getProducts } from '~/src/services/server';
import { Product } from '~/src/types/app';

// Dynamically import the ProductCard component with SSR disabled for better performance
const ProductCard = dynamic(() => import('~/src/components/Product').then(mod => mod.ProductCard), {
  ssr: false,
});

export default async function ProductsPage() {
  // Fetch products data from the server
  const { data: products = [] } = await getProducts();

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Products Page</h1>
      {products.length === 0 ? (
        <div className='text-center py-10'>
          <p className='text-lg'>No products available.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: 'Products Page',
    description: 'View our collection of products',
  };
}
