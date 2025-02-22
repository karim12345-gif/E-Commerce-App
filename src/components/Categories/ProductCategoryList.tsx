import { Card, CardContent } from '~/src/components/ui/card/card';
import { Product } from '~/src/types/app';

type ProductCategoryProps = {
  products: Product[];
};

export const ProductCategoryList = ({ products }: ProductCategoryProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {products?.length > 0 ? (
        products.map(product => (
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
  );
};
