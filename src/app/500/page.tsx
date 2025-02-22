'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '~/src/components/ui/button';

const Custom500 = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <html>
      <body>
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
              {/* <Button onClick={() => reset()} variant='default' size='default' className='px-6 py-3'>
                Try Again
              </Button> */}
              <Button onClick={handleGoHome} variant='destructive' size='default' className='px-6 py-3 bg-red-600 text-white'>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Custom500;
