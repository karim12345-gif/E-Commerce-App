// this is the listing page of all categories
'use client';

import { CategoriesList, CategoriesSkeleton } from '~/src/components/Categories';
import { ButtonIconLeft } from '~/src/components/ui/buttons/ButtonIcon';
import { useGetListOfCategories } from '~/src/services/hooks/Categories/useGetListOfCategories';
import { useRouter } from 'next/navigation';

export default function CategoriesPage() {
  const router = useRouter();
  const { data: categories, isLoading, isError } = useGetListOfCategories();

  // ** it redundant put it in utility folder and call it from there better --> later
  const onBack = () => {
    router.back();
  };

  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  if (isError) {
    return <div>Error loading categories. Please try again later.</div>;
  }

  return (
    <div className='min-h-screen flex items-center justify-center mt-6'>
      <div className='container mx-auto py-8 px-4'>
        <ButtonIconLeft variant='ghost' onClick={onBack} />
        <h1 className='text-3xl font-bold mb-8'>Product Categories List:</h1>
        {categories ? <CategoriesList categories={categories} /> : <div>No categories found.</div>}
      </div>
    </div>
  );
}
