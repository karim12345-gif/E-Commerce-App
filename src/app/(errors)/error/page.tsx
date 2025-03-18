'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ErrorContent = dynamic(() => import('./components/error-content').then(mod => mod.ErrorContent), {
  ssr: false,
});

export default function ErrorPage() {
  return (
    <Suspense fallback={<div className='flex items-center justify-center h-screen'>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
