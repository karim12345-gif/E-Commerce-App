import { Button } from '~/src/components/ui/buttons/button';
import { ErrorImage } from './error-image';
import { ErrorProps } from '~/src/types/app';

export function Error400({ goHome }: ErrorProps) {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-50'>
      <div className='p-8 flex flex-col items-center text-center'>
        <div className='flex flex-col items-center mb-6'>
          <h1 className='text-6xl font-extrabold text-red-500 mb-2'>400</h1>
          <h5 className='text-2xl font-medium text-gray-700 mb-2'>Bad Request 👨🏻‍💻</h5>
        </div>

        <ErrorImage src='/images/pages/500.png' alt='400 Bad Request Error' />

        <div className='space-x-4 mt-2 justify-center items-center'>
          <Button onClick={goHome} variant='destructive' size='default' className='px-6 py-3 bg-red-600 text-white'>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
