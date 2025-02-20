'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '~/src/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';

export function CartSheet() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  console.log('AVailble items in cart', cart);

  const calculateTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything until client-side hydration is complete
  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='relative ml-auto'>
          <ShoppingCart className='h-5 w-5' />
          {cart.length > 0 && (
            <span
              className='absolute -top-4 -right-5 bg-red-500 text-white 
              rounded-full h-5 w-5 flex items-center justify-center text-xs'
            >
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className='w-[400px] sm:w-[540px]'>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-full text-center'>
            <ShoppingCart className='h-16 w-16 text-gray-300 mb-4' />
            <p className='text-gray-600'>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className='overflow-y-auto max-h-[calc(100vh-250px)] space-y-4 py-4'>
              {cart.map(item => (
                <div key={item.id} className='flex items-center border-b pb-4 space-x-4'>
                  <Image src={item.image} alt={item.name} width={80} height={80} className='object-cover rounded-lg' />
                  <div className='flex-grow'>
                    <h3 className='font-semibold'>{item.name}</h3>
                    <p className='text-gray-600'>${item.price.toFixed(2)}</p>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Button variant='outline' size='icon' onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className='h-4 w-4' />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button variant='outline' size='icon' onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => removeFromCart(item.id)}>
                      <Trash2 className='h-4 w-4 text-red-500' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-4 border-t pt-4'>
              <div className='flex justify-between mb-4'>
                <span className='font-semibold'>Total</span>
                <span>${calculateTotal.toFixed(2)}</span>
              </div>
              <Link href='/checkout'>
                <Button className='w-full'>Proceed to Checkout</Button>
              </Link>
              <Button variant='destructive' className='w-full mt-2' onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
