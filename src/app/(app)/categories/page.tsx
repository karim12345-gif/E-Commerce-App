'use client';

import dynamic from 'next/dynamic';
import { BackButton } from '~/src/components/ui/buttons';
import { useGetListOfCategories } from '~/src/services/hooks/Categories/useGetListOfCategories';

// Lazy import components
const CategoriesList = dynamic(() => import('~/src/components/Categories').then(mod => mod.CategoriesList), {
  ssr: false,
});

const CategoriesSkeleton = dynamic(() => import('~/src/components/Categories').then(mod => mod.CategoriesSkeleton), {
  ssr: false,
});

export default function CategoriesPage() {
  const { data: categories, isLoading, isError } = useGetListOfCategories();

  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  if (isError) {
    return <div>Error loading categories. Please try again later.</div>;
  }

  return (
    <div className='min-h-screen flex items-center justify-center mt-6'>
      <div className='container mx-auto py-8 px-4'>
        <BackButton />
        <h1 className='text-3xl font-bold mb-8'>Product Categories List:</h1>
        {categories ? <CategoriesList categories={categories} /> : <div>No categories found.</div>}
      </div>
    </div>
  );
}
