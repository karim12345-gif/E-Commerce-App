import dynamic from 'next/dynamic';
import { ProductPageSkeleton } from '../components/Product';

// Lazy load the ProductsPage component
// Set to false if you want to disable server-side rendering for this component
const ProductsPage = dynamic(() => import('./(app)/products/page'), {
  loading: () => <ProductPageSkeleton />,
  ssr: false,
});

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <ProductsPage />
      </main>
    </div>
  );
}
