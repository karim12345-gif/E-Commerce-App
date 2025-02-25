import { Card } from '~/src/components/ui/card/card';
import Image from 'next/image';
import { useMemo } from 'react';
import { CartItem } from '~/src/interfaces/cart';
import { calculateCartTotal } from '~/src/lib/utils';

interface OrderSummaryProps {
  cart: CartItem[];
}

// Order summary component
export const OrderSummary = ({ cart }: OrderSummaryProps) => {
  // calcaulting the total amount
  const calculateTotal = useMemo(() => {
    return calculateCartTotal(cart);
  }, [cart]);

  return (
    <Card className='p-6 lg:order-2'>
      <h2 className='text-xl font-semibold mb-6'>Order Summary</h2>
      <div className='space-y-4'>
        {cart.map(item => (
          <div key={item.id} className='flex items-center space-x-4 py-4 border-b'>
            <div className='relative w-20 h-20 bg-gray-100 rounded-lg'>
              <Image
                src={item.image}
                alt={item.name}
                fill
                className='object-cover rounded-lg'
                sizes='(max-width: 80px) 100vw, 80px'
              />
            </div>
            <div className='flex-grow'>
              <h3 className='font-semibold'>{item.name}</h3>
              <p className='text-gray-600'>
                ${item.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
            <div className='text-right'>
              <p className='font-semibold'>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}

        <div className='space-y-2 pt-4'>
          <div className='flex justify-between text-lg font-bold pt-2'>
            <span>Total</span>
            <span>${calculateTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
