'use client';

import { ProductCard } from '~/src/components/ui/ProductCard';
import { IProductList } from '~/src/interfaces/products';
import { useGetListOfProducts } from '~/src/services/hooks/Products';

export default function ProductsPage() {
  const { data: listOfProducts, isLoading } = useGetListOfProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Our Products</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {listOfProducts?.data.map((product: IProductList) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}
