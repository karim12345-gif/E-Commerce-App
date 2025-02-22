'use client';

import { useParams } from 'next/navigation';
import { useGetProductById } from '~/src/services/hooks/Products';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonLoading } from '~/src/components/ui/buttons/buttonLoader';
import { useCart } from '~/src/context';
import { useToast } from '~/src/hooks/use-toast';
import Custom404 from '~/src/app/404/page';
import { ProductPageDetailPresenter } from '~/src/components/Product';

export default function ProductPageDetail() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { data: product, isLoading, error } = useGetProductById(params.productId as string);
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
        variant: 'default',
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: 'error',
        description: 'Failed to add item to cart. Please try again.',
        variant: 'destructive',
        duration: 1000,
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
      <div>
        <Custom404 />
      </div>
    );
  }

  if (error) {
    // This will trigger the nearest error.tsx
    throw error;
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
