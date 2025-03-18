'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '~/src/components/ui/buttons/button';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '~/src/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { calculateCartTotal } from '~/src/lib/utils';
import { EmptyCartMessage } from '../checkout';

export function CartSheet() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const calculateTotal = useMemo(() => {
    return calculateCartTotal(cart);
  }, [cart]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything until client-side hydration is complete
  if (!isMounted) {
    return null;
  }

  // set it to true its clicked
  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const handleCheckout = () => {
    // Closes the sheet after a short delay to allow for navigation
    setTimeout(() => {
      closeSheet();
    }, 100);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        {/* open the cart sheet */}
        <Button variant='outline' size='icon' className='relative ml-auto' onClick={openSheet}>
          <ShoppingCart className='h-5 w-5' />
          {cart?.length > 0 && (
            <span
              className='absolute -top-4 -right-5 bg-red-500 text-white 
              rounded-full h-5 w-5 flex items-center justify-center text-xs'
            >
              {cart?.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className='w-full sm:max-w-md'>
        <SheetHeader>
          <SheetTitle className='text-lg sm:text-xl'>Shopping Cart</SheetTitle>
        </SheetHeader>

        {cart?.length === 0 ? (
          <EmptyCartMessage />
        ) : (
          <>
            <div className='overflow-y-auto max-h-[calc(100vh-250px)] space-y-4 py-4'>
              {cart?.map(item => (
                <div
                  key={item.id}
                  className='flex flex-col sm:flex-row items-center border-b pb-4 space-y-4 sm:space-y-0 sm:space-x-4'
                >
                  <div className='relative w-20 h-20 bg-gray-100 rounded-lg'>
                    {item ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        loading='lazy'
                        className='object-cover rounded-lg'
                        sizes='(max-width: 80px) 100vw, 80px'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center'>
                        <span className='text-gray-400 text-xs'>Image not available</span>
                      </div>
                    )}
                  </div>
                  <div className='flex-grow text-center sm:text-left'>
                    <h3 className='font-semibold text-sm sm:text-base'>{item.name}</h3>
                    <p className='text-gray-600 text-sm sm:text-base'>${item.price.toFixed(2)}</p>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Button
                      aria-label='decrease quantity'
                      variant='outline'
                      size='icon'
                      className='h-8 w-8'
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className='h-3 w-3' />
                    </Button>
                    <span className='text-sm sm:text-base'>{item.quantity}</span>
                    <Button
                      aria-label='update Quantity'
                      variant='outline'
                      size='icon'
                      className='h-8 w-8'
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className='h-3 w-3' />
                    </Button>
                    <Button
                      aria-label='remove from cart'
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8'
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className='h-4 w-4 text-red-500' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-4 border-t pt-4'>
              <div className='flex justify-between mb-4'>
                <span className='font-semibold text-sm sm:text-base'>Total:</span>
                <span className='text-sm sm:text-base'>${calculateTotal.toFixed(2)}</span>
              </div>
              <Link href='/checkout'>
                <Button className='w-full text-sm sm:text-base' onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </Link>
              <Button variant='destructive' className='w-full mt-2 text-sm sm:text-base' onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
