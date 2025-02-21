'use client';

import { useParams } from 'next/navigation';
import { useGetProductById } from '~/src/services/hooks/Products';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductPageDetailPresenter } from '~/src/components/Product/ProductPageDetail';
import { ButtonLoading } from '~/src/components/ui/buttonLoader';
import { useCart } from '~/src/context';
import { useToast } from '~/src/hooks/use-toast';

export default function ProductPageDetail() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { data: product, isLoading } = useGetProductById(params.productId as string);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price.amount,
        image: product.images[0],
      });

      toast({
        title: 'Success',
        description: `${product.name} has been added to your cart`,
        variant: 'default', // Green toast for success
      });
    } catch (error) {
      toast({
        title: 'error',
        description: 'Failed to add item to cart. Please try again.',
        variant: 'destructive', // Red toast for error
      });

      console.error('Add to cart error:', error);
    }
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
