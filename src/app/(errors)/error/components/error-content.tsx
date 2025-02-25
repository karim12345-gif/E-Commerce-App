'use client';

import { useSearchParams } from 'next/navigation';
import { Error400 } from './error-400';
import { Error500 } from './error-500';
import { ErrorContentProps } from '~/src/interfaces';
import Error404 from './error-404';

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
