export function ProductPageSkeleton() {
  return (
    <div className='container mx-auto p-6'>
      <div className='h-8 w-64 bg-gray-200 rounded mb-6 animate-pulse'></div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[...Array(6)].map((_, index) => (
          <div key={index} className='bg-gray-100 rounded-lg overflow-hidden shadow-sm'>
            <div className='h-48 bg-gray-200 animate-pulse'></div>
            <div className='p-4'>
              <div className='h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse'></div>
              <div className='h-4 bg-gray-300 rounded w-1/2 animate-pulse'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
