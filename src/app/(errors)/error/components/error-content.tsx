'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const Error404 = dynamic(() => import('./error-404'), { ssr: false });
const Error400 = dynamic(() => import('./error-400'), { ssr: false });
const Error500 = dynamic(() => import('./error-500'), { ssr: false });

export function ErrorContent() {
  const searchParams = useSearchParams();
  const errorType = searchParams.get('type');

  // if 400 route to the error page
  if (errorType === '400') {
    return <Error400 />;
  }

  // if 404 route to the error page
  if (errorType === '404') {
    return <Error404 />;
  }

  // else fallback to 500
  return <Error500 />;
}
