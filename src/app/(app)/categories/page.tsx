'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useGetListOfCategories } from '~/src/services/hooks/Categories/useGetListOfCategories';

// Lazy import components
const CategoriesList = dynamic(() => import('~/src/components/Categories').then(mod => mod.CategoriesList), {
  ssr: false,
});

const CategoriesSkeleton = dynamic(() => import('~/src/components/Categories').then(mod => mod.CategoriesSkeleton), {
  ssr: false,
});

const BackButton = dynamic(() => import('~/src/components/ui/buttons').then(mod => mod.BackButton), {
  ssr: false,
});

export default function CategoriesPage() {
  // Hook
  const { data: categories, isLoading } = useGetListOfCategories();

  // if loading show skeleton
  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  return (
    <Suspense fallback={<CategoriesSkeleton />}>
      <div className='min-h-screen flex items-center justify-center mt-6'>
        <div className='container mx-auto py-8 px-4'>
          <BackButton />
          <h1 className='text-3xl font-bold mb-8'>Product Categories List:</h1>
          {categories ? <CategoriesList categories={categories} /> : <div>No categories found.</div>}
        </div>
      </div>
    </Suspense>
  );
}
