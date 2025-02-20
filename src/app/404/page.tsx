'use client'; // Mark this component as a Client Component

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '~/src/components/ui/button';

const Custom404 = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-50'>
      <div className='p-8 flex flex-col items-center text-center'>
        {/* Error Text Section */}
        <div className='flex flex-col items-center mb-6'>
          <h1 className='text-6xl font-extrabold text-red-500 mb-2'>404</h1>
          <h5 className='text-2xl font-medium text-gray-700 mb-2'>Page Not Found ⚠️</h5>
          <p className='text-lg text-gray-500 mb-4'>We couldn’t find the page you are looking for.</p>
        </div>

        {/* Error Image */}
        <div className='mb-6'>
          <Image src='/images/pages/404.png' alt='404 Page Not Found' width={300} height={300} className='mx-auto mb-8' />
        </div>

        {/* Back to Home Button */}
        <Button onClick={handleGoHome} variant='default' size='default' className='px-6 py-3 bg-blue-600 text-white'>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Custom404;
