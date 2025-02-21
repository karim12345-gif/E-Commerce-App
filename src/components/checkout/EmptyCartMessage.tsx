import { ShoppingBag } from 'lucide-react';

export const EmptyCartMessage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh]'>
      <ShoppingBag className='h-16 w-16 text-gray-300 mb-4' />
      <h2 className='text-2xl font-semibold mb-2'>Your cart is empty</h2>
      <p className='text-gray-600'>Add some items to your cart to checkout</p>
    </div>
  );
};
