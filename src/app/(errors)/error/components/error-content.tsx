'use client';

import { useSearchParams } from 'next/navigation';
import Error404 from './error-404';
import Error400 from './error-400';
import Error500 from './error-500';

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
