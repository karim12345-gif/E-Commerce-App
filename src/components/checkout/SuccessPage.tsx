import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const SuccessPage = () => {
  return (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <div className='text-center'>
        <CheckCircle className='h-16 w-16 text-green-500 mx-auto mb-4' />
        <h1 className='text-2xl font-bold mb-2'>Order Placed Successfully!</h1>
        <p className='text-gray-600 mb-8'>Thank you for your order. We&apos;ll process it right away.</p>
        <Link href='/'>
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};
