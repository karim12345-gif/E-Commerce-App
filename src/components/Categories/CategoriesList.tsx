import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ICategory } from '~/src/interfaces';

interface CategoriesListProps {
  categories: ICategory[];
}

export function CategoriesList({ categories }: CategoriesListProps) {
  // Ensure categories is always an array
  const categoryArray = Array.isArray(categories) ? categories : [];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {categoryArray.map(category => (
        <Link key={category.id} href={`/categories/${category.id}`}>
          <Card className='p-6 hover:bg-gray-50 transition-colors'>
            <h2 className='text-xl font-semibold'>{category.name}</h2>
            <p className='text-muted-foreground mt-2'>Browse all products in this category</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
