import { ProductCard } from '~/src/components/Product';
import { Product } from '~/src/types/app';

async function getProducts() {
  try {
    // Since we're running on the server during build, use the full URL
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    const url = `${protocol}://${host}/api/products`;

    console.log('Fetching products from:', url);

    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty data instead of throwing
    return { data: [] };
  }
}

export default async function ProductsPage() {
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

// Static generation configuration
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata() {
  return {
    title: 'Products Page',
    description: 'View our collection of products',
  };
}
