'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useCallback } from 'react';
import { Button } from '~/src/components/ui/buttons/button';
import { Card, CardContent, CardFooter } from '~/src/components/ui/card/card';
import { useCart } from '~/src/context/CartContext';
import { toast } from '~/src/hooks/use-toast';
import { Product } from '~/src/types/app';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  // Memoize the image URL and priceInfo to prevent recalculation on re-renders
  const imageUrl = useMemo(() => {
    return Array.isArray(product.images) ? product.images[0] : product.images;
  }, [product.images]);

  // price info
  const priceInfo = Array.isArray(product.price) ? product.price[0] : product.price;

  // adding items to cart
  // Memoized function to prevent unnecessary re-renders
  const handleAddToCart = useCallback(async () => {
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: priceInfo?.amount || 0,
        image: imageUrl || '',
      });

      toast({
        title: 'Success',
        description: `${product.name} added to cart`,
        variant: 'default',
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart',
        variant: 'destructive',
        duration: 1000,
      });
      console.error('Add to cart error:', error);
    }
  }, [addToCart, product.id, product.name, priceInfo?.amount, imageUrl]);

  return (
    <Card>
      <div className='relative aspect-square'>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={product.name}
            width={350}
            height={350}
            className='object-cover'
            quality={50}
            unoptimized={false}
          />
        )}
      </div>

      <CardContent className='p-4'>
        <h3 className='font-semibold'>{product.name}</h3>
        <p className='mt-2 font-medium text-lg'>
          {priceInfo?.currency} {priceInfo?.amount}
        </p>
      </CardContent>

      <CardFooter className='p-4 pt-0 flex gap-2'>
        <Button className='flex-1' onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Link href={`/products/${product.id}`} className='flex-1'>
          <Button variant='outline' className='w-full'>
            View
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
