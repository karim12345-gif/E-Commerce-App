import dynamic from 'next/dynamic';
import { Product } from '~/src/types/app';
import { getProducts } from '~/src/services/server/products';

interface ApiResponse {
  data: Product[];
}

// Dynamically import the ProductCard component
const ProductCard = dynamic(() => import('~/src/components/Product').then(mod => mod.ProductCard), {
  ssr: false,
});

// Server Component (Replaces `getStaticProps`)
export default async function ProductsPage() {
  const products: ApiResponse = await getProducts();

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Products Page</h1>
      {!products.data || products.data.length === 0 ? (
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

// Static Metadata (Like `getStaticProps`)
export function generateMetadata() {
  return {
    title: 'Products Page',
    description: 'View our collection of products',
  };
}
