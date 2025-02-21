// components/categories/CategoriesSkeleton.tsx
import { Card } from '@/components/ui/card';

export function CategoriesSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {[...Array(6)].map((_, i) => (
        <Card key={i} className='p-6'>
          <div className='h-6 bg-gray-200 rounded animate-pulse' />
        </Card>
      ))}
    </div>
  );
}
