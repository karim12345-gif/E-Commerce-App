'use client';

import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorContent } from './components/error-content';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <Suspense fallback={<div className='flex items-center justify-center h-screen'>Loading...</div>}>
      <ErrorContent router={router} />
    </Suspense>
  );
}
