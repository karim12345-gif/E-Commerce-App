'use client';

import { useSearchParams } from 'next/navigation';
import { Error400 } from './error-400';
import { Error500 } from './error-500';
import { ErrorContentProps } from '~/src/interfaces';

export function ErrorContent({ router }: ErrorContentProps) {
  const searchParams = useSearchParams();
  const errorType = searchParams.get('type');

  if (errorType === '400') {
    return <Error400 router={router} />;
  }

  return <Error500 router={router} />;
}
