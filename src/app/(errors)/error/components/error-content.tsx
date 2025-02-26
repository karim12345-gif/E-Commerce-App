'use client';

import { useSearchParams } from 'next/navigation';
import { ErrorContentProps } from '~/src/interfaces';
import dynamic from 'next/dynamic';

// Lazy load components
const Error404 = dynamic(() => import('./error-404').then(mod => mod.Error404), {
  ssr: false,
});
const Error500 = dynamic(() => import('./error-500').then(mod => mod.Error500), {
  ssr: false,
});
const Error400 = dynamic(() => import('./error-400').then(mod => mod.Error400), {
  ssr: false,
});

export function ErrorContent({ router }: ErrorContentProps) {
  const searchParams = useSearchParams();
  const errorType = searchParams.get('type');
  const errorMessage = searchParams.get('message');
  const returnUrl = searchParams.get('returnUrl') || '/';

  // Common props for all error components
  const errorProps = {
    router,
    message: errorMessage || undefined,
    returnUrl,
  };

  // if 400 route to the error page
  if (errorType === '400') {
    return <Error400 {...errorProps} />;
  }

  // if 404 route to the error page
  if (errorType === '404') {
    return <Error404 {...errorProps} />;
  }

  // else fallback to 500
  return <Error500 {...errorProps} />;
}
