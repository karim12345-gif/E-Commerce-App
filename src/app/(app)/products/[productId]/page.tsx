'use client';

import { useParams } from 'next/navigation';
import { useGetProductById } from '~/src/services/hooks/Products';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductPageDetailPresenter } from '~/src/components/Product/ProductPageDetail';
import { ButtonLoading } from '~/src/components/ui/buttonLoader';

export default function ProductPageDetail() {
  const params = useParams();
  const router = useRouter();
  const { data: product, isLoading } = useGetProductById(params.productId as string);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
  };

  if (isLoading) {
    return (
      <div className='container mx-auto p-6 flex justify-center items-center min-h-[50vh]'>
        <ButtonLoading />
      </div>
    );
  }

  if (!product) {
    return (
      <div className='container mx-auto p-6'>
        <div className='text-center space-y-4'>
          <h1 className='text-2xl font-bold'>Product Not Found</h1>
          <Button onClick={() => router.back()}>Return to Products</Button>
        </div>
      </div>
    );
  }

  return (
    <ProductPageDetailPresenter
      product={product}
      selectedImageIndex={selectedImageIndex}
      onImageSelect={setSelectedImageIndex}
      onBack={() => router.back()}
      onAddToCart={handleAddToCart}
    />
  );
}
