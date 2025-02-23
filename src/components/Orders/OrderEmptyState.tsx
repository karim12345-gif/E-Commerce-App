'use client';

import { Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/buttons/button';

export const OrderNotFound = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className='text-center py-12 bg-gray-100 rounded-lg'>
      <Package className='mx-auto mb-4 h-12 w-12 text-gray-500' />
      <p className='text-xl text-gray-600'>No orders found here!</p>
      <div className='space-x-4 mt-2 justify-center items-center'>
        <Button onClick={handleGoHome} variant='destructive' size='default' className='px-6 py-3 bg-red-600 text-white'>
          Back to Home
        </Button>
      </div>
    </div>
  );
};
