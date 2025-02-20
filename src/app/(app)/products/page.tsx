'use client';

import { ProductCard } from '~/src/components/Product/ProductCard';
import { ButtonLoading } from '~/src/components/ui/buttonLoader';
import { IProductList } from '~/src/interfaces/products';
import { useGetListOfProducts } from '~/src/services/hooks/Products';

export default function ProductsPage() {
  const { data: listOfProducts, isLoading } = useGetListOfProducts();

  if (isLoading) {
    return (
      <div className='container mx-auto p-6 flex justify-center items-center min-h-[50vh]'>
        <ButtonLoading />
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Products Page:</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {listOfProducts?.data.map((product: IProductList) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}
