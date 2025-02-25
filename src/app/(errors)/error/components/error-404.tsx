'use client';

import { Button } from '~/src/components/ui/buttons/button';
import { ErrorImage } from './error-image';
import { Error404Props } from '~/src/interfaces/error';

export const Error404 = ({ router }: Error404Props) => {
  // buttons in all error paged could be removed and we can use the BackButton that was created
  const handleGoHome = () => {
    router?.push('/');
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-50'>
      <div className='p-8 flex flex-col items-center text-center'>
        {/* Error Text Section */}
        <div className='flex flex-col items-center mb-6'>
          <h1 className='text-6xl font-extrabold text-red-500 mb-2'>404</h1>
          <h5 className='text-2xl font-medium text-gray-700 mb-2'>Not Found ⚠️</h5>
        </div>

        {/* Error Image */}
        <ErrorImage src='/images/pages/404.png' alt='404 Page Not Found' width={200} height={200} />

        {/* Back to Home Button */}
        <Button onClick={handleGoHome} variant='default' size='default' className='px-6 py-3 bg-blue-600 text-white'>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Error404;
