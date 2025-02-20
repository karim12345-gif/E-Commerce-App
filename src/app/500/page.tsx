'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';
import { Button } from '~/src/components/ui/button';

// Note the specific error props type from Next.js
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-50'>
      <div className='p-8 flex flex-col items-center text-center'>
        <div className='flex flex-col items-center mb-6'>
          <h1 className='text-6xl font-extrabold text-red-500 mb-2'>500</h1>
          <h5 className='text-2xl font-medium text-gray-700 mb-2'>Internal server error 👨🏻‍💻</h5>
          <p className='text-lg text-gray-500 mb-4'>Oops, something went wrong!</p>
        </div>

        <div className='mb-6'>
          <Image
            src='/images/pages/500.png'
            alt='500 Internal Server Error'
            width={300}
            height={300}
            className='mx-auto mb-8'
          />
        </div>

        <div className='space-x-4'>
          <Button onClick={() => reset()} variant='default' size='default' className='px-6 py-3'>
            Try Again
          </Button>
          <Button onClick={handleGoHome} variant='destructive' size='default' className='px-6 py-3 bg-red-600 text-white'>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
