import { Card } from '~/src/components/ui/card/card';

export function CategoriesSkeleton() {
  return (
    <div className='min-h-screen flex items-center justify-center mt-6'>
      <div className='container mx-auto py-8 px-4'>
        {/* Page Title Skeleton */}
        <div className='mb-8 h-10 bg-gray-200 rounded w-64 animate-pulse' />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Body Skeleton */}
          {[...Array(5)].map((_, i) => (
            <Card key={i} className='p-6 hover:bg-gray-50 transition-colors'>
              <div className='h-6 bg-gray-200 rounded mb-2 animate-pulse w-3/4' />
              <div className='h-4 bg-gray-200 rounded animate-pulse w-full' />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
