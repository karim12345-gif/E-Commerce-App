'use client';

import { Button } from '~/src/components/ui/buttons/button';
import { ErrorImage } from './error-image';
import { useRouter } from 'next/navigation';

const Error404 = () => {
  const router = useRouter();
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

        <ErrorImage src='/images/pages/500.png' alt='500 Internal Server Error' />

        <div className='space-x-4'>
          <Button onClick={handleGoHome} variant='destructive' size='default' className='px-6 py-3 bg-red-600 text-white'>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
