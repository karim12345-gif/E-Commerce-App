'use client';

import dynamic from 'next/dynamic';
import { useCart } from '~/src/context';
import { useParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useToast } from '~/src/hooks/use-toast';
import { Error404 } from '~/src/app/(errors)/error/components';
import { useGetProductById } from '~/src/services/hooks/Products';
import { ButtonLoading } from '~/src/components/ui/buttons/buttonLoader';

// Dynamically import the ProductPageDetailPresenter component with SSR disabled
const ProductPageDetailPresenter = dynamic(
  () => import('~/src/components/Product').then(mod => mod.ProductPageDetailPresenter),
  {
    ssr: false,
    loading: () => null,
  },
);

export default function ProductPageDetail() {
  // ** Use states
  const params = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();

  // Fetch product details based on the productId from URL params
  const { data: product, isLoading } = useGetProductById(params.productId as string);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleAddToCart = useCallback(async () => {
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
  }, [addToCart, product, toast]);

  //** Display loading state while fetching product data */
  if (isLoading) {
    return (
      <div className='container mx-auto p-6 flex justify-center items-center min-h-[50vh]'>
        <ButtonLoading />
      </div>
    );
  }

  // Handle error state  if product is not found
  if (!product) {
    return (
      <div>
        <Error404 />
      </div>
    );
  }

  return (
    <ProductPageDetailPresenter
      product={product}
      selectedImageIndex={selectedImageIndex}
      onImageSelect={setSelectedImageIndex}
      onAddToCart={handleAddToCart}
    />
  );
}
